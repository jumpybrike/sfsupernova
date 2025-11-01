import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/actions/auth'
import { getCdnImageUrl } from '@/lib/imageUrl'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function FolderDetailPage({ params }: PageProps) {
  const { slug } = await params
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

  // Get folder
  const { data: folder } = await supabase
    .from('folders')
    .select('*')
    .eq('slug', slug)
    .eq('user_id', user.id)
    .single()

  if (!folder) {
    notFound()
  }

  // Get folder images
  const { data: folderImages } = await supabase
    .from('folder_images')
    .select('*, images(*)')
    .eq('folder_id', folder.id)
    .order('position', { ascending: true })

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
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/vault/folders" className="text-[#00ffaa] hover:text-white font-['Space_Mono'] transition-colors">
              ← Back to Folders
            </Link>
          </div>

          {/* Folder Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">📁</span>
                  <h1 className="text-5xl font-['Orbitron'] font-bold text-[#00ffaa] [text-shadow:0_0_30px_rgba(0,255,170,0.5)]">
                    {folder.title}
                  </h1>
                </div>
                {folder.description && (
                  <p className="text-gray-400 font-['Space_Mono'] text-lg mb-4">
                    {folder.description}
                  </p>
                )}
                <div className="flex items-center gap-6 text-gray-500 font-['Space_Mono'] text-sm">
                  <span>📸 {folder.image_count} images</span>
                  <span>⭐ {folder.star_count} stars</span>
                  <span>
                    {folder.is_public ? '🌐 Public' : '🔒 Private'}
                  </span>
                  <span>
                    Updated {new Date(folder.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/vault/folders/${folder.slug}/edit`}
                  className="bg-transparent border-2 border-[#00ffaa]/50 text-[#00ffaa] font-['Orbitron'] font-bold py-2 px-6 rounded hover:border-[#00ffaa] hover:bg-[#00ffaa]/10 transition-all"
                >
                  EDIT
                </Link>
                <Link
                  href="/gallery"
                  className="bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-2 px-6 rounded hover:bg-[#00dd99] transition-all hover:shadow-[0_0_20px_rgba(0,255,170,0.5)]"
                >
                  + ADD IMAGES
                </Link>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          {folderImages && folderImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {folderImages.map((item: any) => (
                <ImageCard key={item.id} image={item.images} folderImageId={item.id} />
              ))}
            </div>
          ) : (
            <div className="border-2 border-[#00ffaa]/30 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🖼️</div>
              <h3 className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4">
                No images yet
              </h3>
              <p className="text-gray-400 font-['Space_Mono'] mb-6">
                Browse the gallery and add images to this folder!
              </p>
              <Link
                href="/gallery"
                className="inline-block bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-3 px-8 rounded hover:bg-[#00dd99] transition-all"
              >
                BROWSE GALLERY
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function ImageCard({ image, folderImageId }: { image: any; folderImageId: string }) {
  if (!image) return null

  return (
    <div className="group relative">
      <Link href={`/gallery/${image.catalog_number}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#00ffaa]/50 hover:border-[#00ffaa] transition-colors">
          {image.thumbnail_path ? (
            <img
              src={getCdnImageUrl(image.thumbnail_path)}
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
              {image.year && (
                <p className="text-gray-400 font-['Space_Mono'] text-xs mt-1">
                  {image.year}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
