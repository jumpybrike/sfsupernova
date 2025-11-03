import Link from 'next/link'
import GalleryImage from '@/app/components/GalleryImage'
import { getCdnImageUrl } from '@/lib/imageUrl'

// Static image data from CDN
const images = [
  {
    id: 'wheel-001',
    catalog_number: 'SCI-FI-WHEEL-001',
    title: 'Space Wheel',
    year: 1950,
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/wheel.jpg',
    description: 'Vintage space wheel illustration',
    artist: 'Unknown',
  },
  {
    id: 'moon-001',
    catalog_number: 'SCI-FI-MOON-001',
    title: 'Lunar Surface',
    year: 1952,
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/moon.jpg',
    description: 'Classic moon surface artwork',
    artist: 'Unknown',
  },
  {
    id: 'twoheaded-001',
    catalog_number: 'SCI-FI-TWOHEADED-001',
    title: 'Two-Headed Creature',
    year: 1955,
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/twoheaded.jpg',
    description: 'Classic two-headed alien illustration',
    artist: 'Unknown',
  },
  {
    id: 'moon-002',
    catalog_number: 'SCI-FI-MOON-002',
    title: 'Moon',
    year: 1960,
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/moon.jpg',
    description: 'Vintage moon illustration',
    artist: 'Unknown',
  },
  {
    id: 'floating-001',
    catalog_number: 'SCI-FI-FLOATING-001',
    title: 'Floating in Space',
    year: 1958,
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/floating.jpg',
    description: 'Vintage space floating illustration',
    artist: 'Unknown',
  },
  {
    id: 'usaf-001',
    catalog_number: 'SCI-FI-USAF-001',
    title: 'USAF Space Program',
    year: 1962,
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/usaf.jpg',
    description: 'Vintage USAF space program illustration',
    artist: 'Unknown',
  },
  {
    id: 'rocket-001',
    catalog_number: 'SCI-FI-ROCKET-001',
    title: 'Rocket Launch',
    year: 1956,
    file_path: 'https://lon1.digitaloceanspaces.com/networklayer-cdn/SFSupernova/images/rocket.jpg',
    description: 'Vintage rocket launch illustration',
    artist: 'Unknown',
  },
]

export default function GalleryPage() {

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
              <p className="text-xl text-[#1a2332]/80 max-w-4xl mx-auto">
                Explore our collection of classic science fiction artwork from the Golden Age
              </p>
            </section>

            {/* Stats */}
            <section className="mb-8 text-center">
              <p className="text-[#1a2332]/70">
                Showing <span className="text-[#ff6b35] font-bold">{images.length}</span> vintage sci-fi images
              </p>
            </section>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((image) => (
                  <Link
                    key={image.id}
                    href={`/gallery/${image.catalog_number}`}
                    className="group relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#c9d1d9]/20 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <GalleryImage
                      src={getCdnImageUrl(image.file_path)}
                      alt={image.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white text-xs font-semibold line-clamp-2">
                          {image.title}
                        </h4>
                        {image.year && (
                          <p className="text-[#ffbe0b] text-xs mt-1" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                            {image.year}
                          </p>
                        )}
                        {image.artist && (
                          <p className="text-gray-400 text-xs mt-1">
                            {image.artist}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            {/* Navigation */}
            <section className="mt-12 text-center">
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-transparent border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 uppercase tracking-wider"
               
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
