import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/actions/auth'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user's folders
  const { data: folders } = await supabase
    .from('folders')
    .select('*, folder_images(count)')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(6)

  // Get user's starred images
  const { data: starredImages } = await supabase
    .from('stars')
    .select('*, images(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(12)

  // Get user stats
  const { count: folderCount } = await supabase
    .from('folders')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { count: starCount } = await supabase
    .from('stars')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { count: commentCount } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Retro grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative">
        {/* Header */}
        <header className="border-b-2 border-[#00ffaa] bg-black/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa] [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
                  SF SUPERNOVA
                </Link>
                <nav className="hidden md:flex gap-6">
                  <Link href="/vault/dashboard" className="text-[#00ffaa] font-['Space_Mono'] hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/vault/folders" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                    My Folders
                  </Link>
                  <Link href="/gallery" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                    Browse Gallery
                  </Link>
                  {profile?.is_admin && (
                    <Link href="/vault/admin" className="text-[#ff6b6b] font-['Space_Mono'] hover:text-[#ff5252] transition-colors">
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 font-['Space_Mono'] text-sm">
                  {profile?.username || user.email}
                </span>
                <form action={signOut}>
                  <button className="text-gray-400 hover:text-[#00ffaa] font-['Space_Mono'] text-sm transition-colors">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <section className="mb-12">
            <h1 className="text-5xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4 [text-shadow:0_0_30px_rgba(0,255,170,0.5)]">
              WELCOME BACK, {profile?.username?.toUpperCase() || 'EXPLORER'}
            </h1>
            <p className="text-gray-400 font-['Space_Mono'] text-lg">
              Your personal vault for vintage sci-fi treasures
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard
              title="FOLDERS"
              value={folderCount || 0}
              icon="📁"
              link="/vault/folders"
            />
            <StatCard
              title="STARRED"
              value={starCount || 0}
              icon="⭐"
              link="/vault/stars"
            />
            <StatCard
              title="COMMENTS"
              value={commentCount || 0}
              icon="💬"
              link="/vault/activity"
            />
          </section>

          {/* Folders Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-['Orbitron'] font-bold text-[#00ffaa] [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
                YOUR FOLDERS
              </h2>
              <Link
                href="/vault/folders/new"
                className="bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-2 px-6 rounded hover:bg-[#00dd99] transition-all hover:shadow-[0_0_20px_rgba(0,255,170,0.5)]"
              >
                + NEW FOLDER
              </Link>
            </div>

            {folders && folders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {folders.map((folder: any) => (
                  <FolderCard key={folder.id} folder={folder} />
                ))}
              </div>
            ) : (
              <div className="border-2 border-[#00ffaa]/30 rounded-lg p-12 text-center">
                <p className="text-gray-400 font-['Space_Mono'] mb-4">
                  No folders yet. Create your first collection!
                </p>
                <Link
                  href="/vault/folders/new"
                  className="inline-block bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-2 px-6 rounded hover:bg-[#00dd99] transition-all"
                >
                  CREATE FOLDER
                </Link>
              </div>
            )}

            {folders && folders.length > 0 && (
              <div className="mt-6 text-center">
                <Link
                  href="/vault/folders"
                  className="text-[#00ffaa] hover:text-white font-['Space_Mono'] underline transition-colors"
                >
                  View all folders →
                </Link>
              </div>
            )}
          </section>

          {/* Starred Images Section */}
          <section>
            <h2 className="text-3xl font-['Orbitron'] font-bold text-[#00ffaa] mb-6 [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
              RECENTLY STARRED
            </h2>

            {starredImages && starredImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {starredImages.map((star: any) => (
                  <ImageCard key={star.id} image={star.images} />
                ))}
              </div>
            ) : (
              <div className="border-2 border-[#00ffaa]/30 rounded-lg p-12 text-center">
                <p className="text-gray-400 font-['Space_Mono']">
                  No starred images yet. Explore the gallery and save your favorites!
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, link }: { title: string; value: number; icon: string; link: string }) {
  return (
    <Link href={link} className="block group">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffaa] to-[#4facfe] rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative bg-black border-2 border-[#00ffaa] rounded-lg p-6 hover:border-white transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl">{icon}</span>
            <span className="text-5xl font-['Orbitron'] font-bold text-[#00ffaa] [text-shadow:0_0_20px_rgba(0,255,170,0.5)]">
              {value}
            </span>
          </div>
          <h3 className="text-gray-400 font-['Space_Mono'] text-sm">{title}</h3>
        </div>
      </div>
    </Link>
  )
}

function FolderCard({ folder }: { folder: any }) {
  const imageCount = folder.folder_images?.[0]?.count || 0

  return (
    <Link href={`/vault/folders/${folder.slug}`} className="block group">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffaa] to-[#4facfe] rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative bg-black border-2 border-[#00ffaa] rounded-lg p-6 hover:border-white transition-colors">
          <div className="flex items-start justify-between mb-4">
            <span className="text-4xl">📁</span>
            <span className="text-gray-400 font-['Space_Mono'] text-sm">
              {imageCount} images
            </span>
          </div>
          <h3 className="text-xl font-['Orbitron'] font-bold text-[#00ffaa] mb-2 [text-shadow:0_0_10px_rgba(0,255,170,0.3)]">
            {folder.title}
          </h3>
          {folder.description && (
            <p className="text-gray-400 font-['Space_Mono'] text-sm line-clamp-2">
              {folder.description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-4 text-gray-500 font-['Space_Mono'] text-xs">
            <span>⭐ {folder.star_count}</span>
            <span>
              {folder.is_public ? '🌐 Public' : '🔒 Private'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ImageCard({ image }: { image: any }) {
  if (!image) return null

  return (
    <Link href={`/gallery/${image.catalog_number}`} className="block group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#00ffaa]/50 hover:border-[#00ffaa] transition-colors">
        {image.thumbnail_path ? (
          <img
            src={image.thumbnail_path}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00ffaa]/20 to-[#4facfe]/20 flex items-center justify-center">
            <span className="text-4xl">🖼️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h4 className="text-white font-['Space_Mono'] text-xs font-bold line-clamp-2">
              {image.title}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  )
}
