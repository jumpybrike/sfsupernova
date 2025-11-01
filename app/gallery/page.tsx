import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { getCdnImageUrl } from '@/lib/imageUrl'

export default async function GalleryPage() {
  const supabase = await createClient()

  // Get all images
  const { data: images } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        {/* Main Content */}
        <main className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <section className="mb-12 text-center">
              <h1 className="text-5xl sm:text-6xl font-black mb-4 text-[#ff6b35]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                VINTAGE SCI-FI GALLERY
              </h1>
              <p className="text-xl text-[#1a2332]/80 max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
                Explore our collection of classic science fiction artwork from the Golden Age
              </p>
            </section>

            {/* Stats */}
            <section className="mb-8 text-center">
              <p className="text-[#1a2332]/70" style={{ fontFamily: 'var(--font-inter)' }}>
                Showing <span className="text-[#ff6b35] font-bold">{images?.length || 0}</span> vintage sci-fi magazine covers
              </p>
            </section>

            {/* Images Grid */}
            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((image: any) => (
                  <Link
                    key={image.id}
                    href={`/gallery/${image.catalog_number}`}
                    className="group relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#c9d1d9]/20 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <img
                      src={getCdnImageUrl(image.file_path)}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white text-xs font-semibold line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
                          {image.title}
                        </h4>
                        {image.year && (
                          <p className="text-[#ffbe0b] text-xs mt-1" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                            {image.year}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
                          <span>⭐ {image.star_count}</span>
                          <span>💬 {image.comment_count}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border-2 border-[#c9d1d9]/20 rounded-lg p-12 text-center bg-[#f8f3e6]">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-2xl font-bold text-[#ff6b35] mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  No images yet
                </h3>
                <p className="text-[#1a2332]/70" style={{ fontFamily: 'var(--font-inter)' }}>
                  Check back soon for vintage sci-fi artwork!
                </p>
              </div>
            )}

            {/* Navigation */}
            <section className="mt-12 text-center">
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-transparent border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                ← Back to Home
              </Link>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
