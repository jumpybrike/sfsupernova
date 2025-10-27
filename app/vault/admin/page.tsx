import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/actions/auth'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile and check admin status
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    redirect('/')
  }

  // Get stats
  const { count: imageCount } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })

  const { count: userCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  const { count: folderCount } = await supabase
    .from('folders')
    .select('*', { count: 'exact', head: true })

  const { count: flaggedCount } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('is_flagged', true)

  // Get recent images
  const { data: recentImages } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(12)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Retro grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,107,107,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,107,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b-2 border-[#ff6b6b] bg-black/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-2xl font-['Orbitron'] font-bold text-[#ff6b6b] [text-shadow:0_0_20px_rgba(255,107,107,0.5)]">
                  SF SUPERNOVA ADMIN
                </Link>
                <nav className="hidden md:flex gap-6">
                  <Link href="/vault/dashboard" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/vault/folders" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                    My Folders
                  </Link>
                  <Link href="/gallery" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                    Browse Gallery
                  </Link>
                  <Link href="/vault/admin" className="text-[#ff6b6b] font-['Space_Mono'] hover:text-[#ff5252] transition-colors">
                    Admin
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-['Space_Mono'] text-sm">
                  {profile?.username || user.email}
                </span>
                <form action={signOut}>
                  <button className="text-gray-400 hover:text-[#ff6b6b] font-['Space_Mono'] text-sm transition-colors">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <section className="mb-12">
            <h1 className="text-5xl font-['Orbitron'] font-bold text-[#ff6b6b] mb-4 [text-shadow:0_0_30px_rgba(255,107,107,0.5)]">
              ADMIN CONTROL CENTER
            </h1>
            <p className="text-gray-400 font-['Space_Mono'] text-lg">
              Manage images, users, and content
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="TOTAL IMAGES"
              value={imageCount || 0}
              icon="🖼️"
              color="blue"
            />
            <StatCard
              title="TOTAL USERS"
              value={userCount || 0}
              icon="👥"
              color="green"
            />
            <StatCard
              title="FOLDERS"
              value={folderCount || 0}
              icon="📁"
              color="purple"
            />
            <StatCard
              title="FLAGGED"
              value={flaggedCount || 0}
              icon="🚩"
              color="red"
            />
          </section>

          {/* Quick Actions */}
          <section className="mb-12">
            <h2 className="text-3xl font-['Orbitron'] font-bold text-[#ff6b6b] mb-6 [text-shadow:0_0_20px_rgba(255,107,107,0.5)]">
              QUICK ACTIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ActionCard
                title="Upload Image"
                description="Add new artwork to the gallery"
                icon="📤"
                href="/vault/admin/upload"
              />
              <ActionCard
                title="Manage Images"
                description="Edit or remove existing images"
                icon="⚙️"
                href="/vault/admin/images"
              />
              <ActionCard
                title="Flagged Comments"
                description="Review and moderate comments"
                icon="🚩"
                href="/vault/admin/comments"
                badge={flaggedCount || 0}
              />
            </div>
          </section>

          {/* Recent Images */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-['Orbitron'] font-bold text-[#ff6b6b] [text-shadow:0_0_20px_rgba(255,107,107,0.5)]">
                RECENT UPLOADS
              </h2>
              <Link
                href="/vault/admin/images"
                className="text-[#ff6b6b] hover:text-white font-['Space_Mono'] underline transition-colors"
              >
                View all →
              </Link>
            </div>

            {recentImages && recentImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {recentImages.map((image: any) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            ) : (
              <div className="border-2 border-[#ff6b6b]/30 rounded-lg p-12 text-center">
                <p className="text-gray-400 font-['Space_Mono']">
                  No images yet. Start by uploading your first image!
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  const colorMap = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    red: 'from-red-500 to-orange-500',
  }

  const gradient = colorMap[color as keyof typeof colorMap] || colorMap.blue

  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity`} />
      <div className="relative bg-black border-2 border-[#ff6b6b] rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-4xl">{icon}</span>
          <span className="text-5xl font-['Orbitron'] font-bold text-[#ff6b6b] [text-shadow:0_0_20px_rgba(255,107,107,0.5)]">
            {value}
          </span>
        </div>
        <h3 className="text-gray-400 font-['Space_Mono'] text-sm">{title}</h3>
      </div>
    </div>
  )
}

function ActionCard({ title, description, icon, href, badge }: { title: string; description: string; icon: string; href: string; badge?: number }) {
  return (
    <Link href={href} className="block group">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff6b6b] to-[#ff5252] rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative bg-black border-2 border-[#ff6b6b] rounded-lg p-6 hover:border-white transition-colors">
          <div className="flex items-start justify-between mb-4">
            <span className="text-5xl">{icon}</span>
            {badge !== undefined && badge > 0 && (
              <span className="bg-[#ff6b6b] text-black font-['Orbitron'] font-bold px-3 py-1 rounded-full text-sm">
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-xl font-['Orbitron'] font-bold text-[#ff6b6b] mb-2 [text-shadow:0_0_10px_rgba(255,107,107,0.3)]">
            {title}
          </h3>
          <p className="text-gray-400 font-['Space_Mono'] text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

function ImageCard({ image }: { image: any }) {
  return (
    <Link href={`/vault/admin/images/${image.catalog_number}`} className="block group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#ff6b6b]/50 hover:border-[#ff6b6b] transition-colors">
        {image.thumbnail_path ? (
          <img
            src={image.thumbnail_path}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#ff6b6b]/20 to-[#ff5252]/20 flex items-center justify-center">
            <span className="text-4xl">🖼️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="text-white font-['Space_Mono'] text-xs font-bold line-clamp-2">
              {image.title}
            </h4>
            <p className="text-gray-400 font-['Space_Mono'] text-xs mt-1">
              {image.catalog_number}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
