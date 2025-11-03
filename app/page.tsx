import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';
import GalleryImage from './components/GalleryImage';
import { createClient } from '@/lib/supabase/server';
import { getCdnImageUrl } from '@/lib/imageUrl';

export default async function Home() {
  // Fetch featured images from database
  const supabase = await createClient();
  const { data: featuredImages, error: featuredError } = await supabase
    .from('images')
    .select('*')
    .order('year', { ascending: false })
    .limit(6);

  // Log error if database fetch fails
  if (featuredError) {
    console.error('Error fetching featured images:', featuredError.message);
  }
  const featuredReviews = [
    {
      title: 'Foundation by Isaac Asimov',
      decade: '1950s',
      excerpt: 'A sweeping tale of galactic empire and psychohistory that defined the golden age of science fiction...',
      category: 'Books',
      rating: 5,
    },
    {
      title: 'Dimension X: The Outer Limit',
      decade: '1950s',
      excerpt: 'Classic radio drama that transported listeners to the far reaches of space and imagination...',
      category: 'Audio',
      rating: 5,
    },
    {
      title: 'The Day the Earth Stood Still',
      decade: '1950s',
      excerpt: 'A landmark film that brought thoughtful sci-fi to mainstream audiences with its message of peace...',
      category: 'Film',
      rating: 5,
    },
  ];

  const decades = [
    { slug: '1930s-1940s', name: '1930s-1940s', subtitle: 'Golden Age', color: 'text-[#ffbe0b]', font: 'var(--font-abril-fatface)', hoverClass: 'decade-yellow' },
    { slug: '1950s', name: '1950s', subtitle: 'Space Age', color: 'text-[#2ec4b6]', font: 'var(--font-audiowide)', hoverClass: 'decade-teal' },
    { slug: '1960s', name: '1960s', subtitle: 'New Wave', color: 'text-[#e63946]', font: 'var(--font-righteous)', hoverClass: 'decade-red' },
    { slug: '1970s', name: '1970s', subtitle: 'Experimental Era', color: 'text-[#ff6b35]', font: 'var(--font-bebas-neue)', hoverClass: 'decade-orange' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#ff6b35]/20 via-transparent to-[#00d9ff]/20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Pulsing Starburst Logo */}
          <div className="mb-12 flex justify-center">
            <div className="relative" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
              <svg width="120" height="120" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'rotate 20s linear infinite' }}>
                <circle cx="40" cy="40" r="10" fill="#ff6b35"/>
                <polygon points="40,0 37,30 43,30" fill="url(#orangeGradient)"/>
                <polygon points="68.28,11.72 45.66,28.28 48.28,33.72" fill="url(#orangeGradient)"/>
                <polygon points="80,40 50,37 50,43" fill="url(#orangeGradient)"/>
                <polygon points="68.28,68.28 48.28,46.28 45.66,51.72" fill="url(#orangeGradient)"/>
                <polygon points="40,80 37,50 43,50" fill="url(#orangeGradient)"/>
                <polygon points="11.72,68.28 34.34,51.72 31.72,46.28" fill="url(#orangeGradient)"/>
                <polygon points="0,40 30,37 30,43" fill="url(#orangeGradient)"/>
                <polygon points="11.72,11.72 31.72,33.72 34.34,28.28" fill="url(#orangeGradient)"/>
                <circle cx="40" cy="40" r="15" fill="none" stroke="#ff6b35" strokeWidth="0.5" opacity="0.5"/>
                <circle cx="40" cy="40" r="20" fill="none" stroke="#ff6b35" strokeWidth="0.3" opacity="0.3"/>
                <defs>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ffbe0b', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-normal mb-12 text-[#ff6b35] glow-orange"
            style={{ fontFamily: 'var(--font-audiowide)', wordBreak: 'normal' }}
          >
            SF SUPERNOVA
          </h1>
          <p
            className="text-3xl sm:text-4xl mb-8 text-[#00d9ff] glow-cyan"
            style={{ wordBreak: 'normal' }}
          >
            Your Portal to Vintage Science Fiction
          </p>
          <p
            className="text-xl sm:text-2xl text-[#c9d1d9] mb-20 leading-relaxed"
            style={{ wordBreak: 'normal', maxWidth: '800px', margin: '0 auto 5rem' }}
          >
            Journey back to the golden age of tomorrow! Explore pulse-pounding pulp magazines,
            edge-of-your-seat radio adventures, and the daring visions that rocketed us into the future!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/decades/1950s"
              className="inline-block px-8 py-3 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-wider whitespace-nowrap badge-orange"
            >
              Explore the Space Age
            </Link>
            <Link
              href="/audio"
              className="inline-block px-8 py-3 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-wider whitespace-nowrap badge-orange"
            >
              Listen to Radio Dramas
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-normal text-center mb-12 text-[#1a2332]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            VINTAGE SCI-FI COVER ART
          </h2>

          {featuredError ? (
            <div className="text-center py-12">
              <p className="text-[#1a2332]/60 mb-2">Unable to load featured images at this time.</p>
              <p className="text-sm text-[#1a2332]/50">Please try refreshing the page or check back later.</p>
            </div>
          ) : featuredImages && featuredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {featuredImages.map((image: any) => (
                <Link
                  key={image.id}
                  href={`/gallery/${image.catalog_number}`}
                  className="group relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-[#c9d1d9]/20 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <GalleryImage
                    src={getCdnImageUrl(image.file_path)}
                    alt={image.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    priority={true}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-semibold line-clamp-2">
                        {image.title}
                      </p>
                      <p className="text-[#ffbe0b] text-xs mt-1" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                        {image.year}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#1a2332]/60">No featured images available yet.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-block px-8 py-3 bg-transparent border-2 border-[#2ec4b6] text-[#2ec4b6] font-semibold rounded-md hover:bg-[#2ec4b6] hover:text-white transition-all duration-300 uppercase tracking-wider"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Decades Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f3e6] border-t border-[#c9d1d9]/20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-normal text-center mb-12 text-[#1a2332]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            EXPLORE BY DECADE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {decades.map((decade) => (
              <Link
                key={decade.slug}
                href={`/decades/${decade.slug}`}
                className="group bg-white border border-[#c9d1d9]/20 rounded-lg p-6 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <h3
                  className={`text-2xl font-normal mb-2 ${decade.hoverClass}`}
                  style={{ fontFamily: decade.font }}
                >
                  {decade.name}
                </h3>
                <p
                  className="text-[#1a2332]/80 mb-4"
                >
                  {decade.subtitle}
                </p>
                <div className="text-[#ff6b35] group-hover:translate-x-2 transition-transform inline-flex items-center font-medium">
                  <span>Explore</span>
                  <span className="ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#c9d1d9]/20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-normal text-center mb-12 text-[#1a2332]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            FEATURED REVIEWS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.map((review, index) => (
              <article
                key={index}
                className="bg-white border border-[#c9d1d9]/20 rounded-lg p-6 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-semibold text-[#ffbe0b] px-3 py-1 bg-[#ffbe0b]/10 border border-[#ffbe0b]/30 rounded uppercase tracking-wider"
                  >
                    {review.category}
                  </span>
                  <div className="flex text-[#ffbe0b]">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <h3
                  className="text-xl font-semibold mb-2 text-[#1a2332]"
                >
                  {review.title}
                </h3>

                <p
                  className="text-sm text-[#ff6b35] mb-3 uppercase tracking-wide font-medium"
                  style={{ fontFamily: 'var(--font-courier-prime)' }}
                >
                  {review.decade}
                </p>

                <p
                  className="text-[#1a2332]/80 mb-4 leading-relaxed"
                >
                  {review.excerpt}
                </p>

                <Link
                  href="/reviews"
                  className="text-[#ff6b35] hover:text-[#e63946] transition-colors inline-flex items-center font-medium"
                >
                  Read full review <span className="ml-1">→</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-block px-8 py-3 bg-transparent border-2 border-[#2ec4b6] text-[#2ec4b6] font-semibold rounded-md hover:bg-[#2ec4b6] hover:text-white transition-all duration-300 uppercase tracking-wider"
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a2332]">
        <div className="max-w-7xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a2332]">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-normal mb-6 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            DISCOVER THE CLASSICS
          </h2>
          <p
            className="text-lg text-[#c9d1d9]/80 mb-8 leading-relaxed"
          >
            From Asimov to Zelazny, from pulp covers to radio plays, dive deep into the
            archives of science fiction&apos;s most influential era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="inline-block px-8 py-3 bg-[#ff6b35] text-white font-semibold rounded-md hover:bg-[#e63946] transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider"
            >
              Browse Gallery
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-transparent border-2 border-[#2ec4b6] text-[#2ec4b6] font-semibold rounded-md hover:bg-[#2ec4b6] hover:text-white transition-all duration-300 uppercase tracking-wider"
            >
              About SF Supernova
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
