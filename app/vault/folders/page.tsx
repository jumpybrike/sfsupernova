import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/actions/auth'

export default async function FoldersPage() {
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

  // Get all user's folders
  const { data: folders } = await supabase
    .from('folders')
    .select('*, folder_images(count)')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

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
                  <Link href="/vault/dashboard" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/vault/folders" className="text-[#00ffaa] font-['Space_Mono'] hover:text-white transition-colors">
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
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-5xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4 [text-shadow:0_0_30px_rgba(0,255,170,0.5)]">
                YOUR FOLDERS
              </h1>
              <p className="text-gray-400 font-['Space_Mono'] text-lg">
                Organize your vintage sci-fi collection
              </p>
            </div>
            <Link
              href="/vault/folders/new"
              className="bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-3 px-8 rounded hover:bg-[#00dd99] transition-all hover:shadow-[0_0_20px_rgba(0,255,170,0.5)]"
            >
              + NEW FOLDER
            </Link>
          </div>

          {/* Folders Grid */}
          {folders && folders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {folders.map((folder: any) => (
                <FolderCard key={folder.id} folder={folder} />
              ))}
            </div>
          ) : (
            <div className="border-2 border-[#00ffaa]/30 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4">
                No folders yet
              </h3>
              <p className="text-gray-400 font-['Space_Mono'] mb-6">
                Create your first collection to organize your favorite vintage sci-fi art!
              </p>
              <Link
                href="/vault/folders/new"
                className="inline-block bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-3 px-8 rounded hover:bg-[#00dd99] transition-all"
              >
                CREATE YOUR FIRST FOLDER
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
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
            <div className="text-right">
              <div className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa] [text-shadow:0_0_10px_rgba(0,255,170,0.3)]">
                {imageCount}
              </div>
              <div className="text-gray-400 font-['Space_Mono'] text-xs">
                images
              </div>
            </div>
          </div>
          <h3 className="text-xl font-['Orbitron'] font-bold text-[#00ffaa] mb-2 [text-shadow:0_0_10px_rgba(0,255,170,0.3)]">
            {folder.title}
          </h3>
          {folder.description && (
            <p className="text-gray-400 font-['Space_Mono'] text-sm line-clamp-3 mb-4">
              {folder.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-gray-500 font-['Space_Mono'] text-xs">
            <span>⭐ {folder.star_count}</span>
            <span>
              {folder.is_public ? '🌐 Public' : '🔒 Private'}
            </span>
            <span className="text-gray-600">
              {new Date(folder.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
