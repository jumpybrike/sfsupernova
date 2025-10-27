import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function GalleryPage() {
  const supabase = await createClient()

  // Get all images
  const { data: images } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  // Get user if logged in
  const { data: { user } } = await supabase.auth.getUser()
  let profile = null

  if (user) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

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
                  <Link href="/" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                    Home
                  </Link>
                  <Link href="/gallery" className="text-[#00ffaa] font-['Space_Mono'] hover:text-white transition-colors">
                    Gallery
                  </Link>
                  {user && (
                    <>
                      <Link href="/vault/dashboard" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                        Dashboard
                      </Link>
                      <Link href="/vault/folders" className="text-gray-400 font-['Space_Mono'] hover:text-[#00ffaa] transition-colors">
                        My Folders
                      </Link>
                      {profile?.is_admin && (
                        <Link href="/vault/admin" className="text-[#ff6b6b] font-['Space_Mono'] hover:text-[#ff5252] transition-colors">
                          Admin
                        </Link>
                      )}
                    </>
                  )}
                </nav>
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <Link
                    href="/vault/dashboard"
                    className="text-[#00ffaa] hover:text-white font-['Space_Mono'] text-sm transition-colors"
                  >
                    {profile?.username || user.email}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-400 hover:text-[#00ffaa] font-['Space_Mono'] text-sm transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-[#00ffaa] text-black font-['Orbitron'] font-bold py-2 px-4 rounded hover:bg-[#00dd99] transition-all text-sm"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <section className="mb-12">
            <h1 className="text-5xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4 [text-shadow:0_0_30px_rgba(0,255,170,0.5)]">
              VINTAGE SCI-FI GALLERY
            </h1>
            <p className="text-gray-400 font-['Space_Mono'] text-lg">
              Explore our collection of classic science fiction artwork from the Golden Age
            </p>
          </section>

          {/* Filter Bar */}
          <section className="mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[300px]">
                <input
                  type="search"
                  placeholder="Search images..."
                  className="w-full bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all"
                />
              </div>
              <select className="bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all">
                <option value="">All Decades</option>
                <option value="1930">1930s</option>
                <option value="1940">1940s</option>
                <option value="1950">1950s</option>
                <option value="1960">1960s</option>
                <option value="1970">1970s</option>
              </select>
              <select className="bg-black border-2 border-[#00ffaa]/50 rounded px-4 py-3 text-white font-['Space_Mono'] focus:border-[#00ffaa] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="year-asc">Year (Ascending)</option>
                <option value="year-desc">Year (Descending)</option>
              </select>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-8">
            <p className="text-gray-400 font-['Space_Mono']">
              Showing <span className="text-[#00ffaa] font-bold">{images?.length || 0}</span> images
            </p>
          </section>

          {/* Images Grid */}
          {images && images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {images.map((image: any) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          ) : (
            <div className="border-2 border-[#00ffaa]/30 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🖼️</div>
              <h3 className="text-2xl font-['Orbitron'] font-bold text-[#00ffaa] mb-4">
                No images yet
              </h3>
              <p className="text-gray-400 font-['Space_Mono']">
                Check back soon for vintage sci-fi artwork!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function ImageCard({ image }: { image: any }) {
  return (
    <Link href={`/gallery/${image.catalog_number}`} className="block group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#00ffaa]/50 hover:border-[#00ffaa] transition-colors">
        {image.thumbnail_path || image.file_path ? (
          <img
            src={image.thumbnail_path || image.file_path}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00ffaa]/20 to-[#4facfe]/20 flex items-center justify-center">
            <span className="text-4xl">🖼️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h4 className="text-white font-['Space_Mono'] text-sm font-bold line-clamp-2 mb-2">
              {image.title}
            </h4>
            <div className="flex items-center justify-between text-xs text-gray-400 font-['Space_Mono']">
              {image.year && <span>{image.year}</span>}
              <div className="flex items-center gap-3">
                <span>⭐ {image.star_count}</span>
                <span>💬 {image.comment_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
