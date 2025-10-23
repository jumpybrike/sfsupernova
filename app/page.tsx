import Link from 'next/link';
import NewsletterSignup from './components/NewsletterSignup';

export default function Home() {
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
    { slug: '1930s-1940s', name: '1930s-1940s', subtitle: 'Golden Age', color: 'text-[#ffbe0b]' },
    { slug: '1950s', name: '1950s', subtitle: 'Space Age', color: 'text-[#2ec4b6]' },
    { slug: '1960s', name: '1960s', subtitle: 'New Wave', color: 'text-[#e63946]' },
    { slug: '1970s', name: '1970s', subtitle: 'Experimental Era', color: 'text-[#ff6b35]' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a2332] to-[#f8f3e6]">
        <div className="max-w-7xl mx-auto">
          <div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 text-[#ff6b35]"
              style={{ fontFamily: 'var(--font-audiowide)' }}
            >
              SF SUPERNOVA
            </h1>
            <p
              className="text-xl sm:text-2xl mb-4 text-[#c9d1d9]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Your Portal to Vintage Science Fiction
            </p>
            <p
              className="text-base sm:text-lg text-[#c9d1d9]/80 max-w-3xl mb-10 leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Journey back to the golden age of tomorrow! Explore pulse-pounding pulp magazines,
              edge-of-your-seat radio adventures, and the daring visions that rocketed us into the future!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/decades/1950s"
                className="inline-block px-8 py-4 bg-[#ff6b35] text-white font-semibold rounded-md hover:bg-[#e63946] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-wider text-center"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Explore the Space Age
              </Link>
              <Link
                href="/audio"
                className="inline-block px-8 py-4 bg-transparent border-2 border-[#2ec4b6] text-[#c9d1d9] font-semibold rounded-md hover:bg-[#2ec4b6] hover:text-white transition-all duration-300 uppercase tracking-wider text-center"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Listen to Radio Dramas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decades Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f3e6]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-normal mb-12 text-[#1a2332]"
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
                  className={`text-2xl font-normal mb-2 ${decade.color} group-hover:text-[#ff6b35] transition-colors`}
                  style={{ fontFamily: 'var(--font-audiowide)' }}
                >
                  {decade.name}
                </h3>
                <p
                  className="text-[#1a2332]/70 mb-4"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {decade.subtitle}
                </p>
                <div className="text-[#ff6b35] group-hover:translate-x-2 transition-transform inline-flex items-center font-medium">
                  <span style={{ fontFamily: 'var(--font-inter)' }}>Explore</span>
                  <span className="ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-normal mb-12 text-[#1a2332]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            FEATURED REVIEWS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <article
                key={index}
                className="bg-white border border-[#c9d1d9]/20 rounded-lg p-6 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-semibold text-[#ffbe0b] px-3 py-1 bg-[#ffbe0b]/10 border border-[#ffbe0b]/30 rounded uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-inter)' }}
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
                  style={{ fontFamily: 'var(--font-inter)' }}
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
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {review.excerpt}
                </p>

                <Link
                  href="/reviews"
                  className="text-[#ff6b35] hover:text-[#e63946] transition-colors inline-flex items-center font-medium"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Read full review <span className="ml-1">→</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/reviews"
              className="inline-block px-8 py-3 bg-transparent border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f3e6]">
        <div className="max-w-7xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a2332]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-normal mb-6 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            DISCOVER THE CLASSICS
          </h2>
          <p
            className="text-lg text-[#c9d1d9]/80 mb-8 leading-relaxed max-w-3xl"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            From Asimov to Zelazny, from pulp covers to radio plays, dive deep into the
            archives of science fiction&apos;s most influential era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/galleries"
              className="inline-block px-8 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider text-center"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Browse Galleries
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-transparent border-2 border-[#ffbe0b] text-[#ffbe0b] font-semibold rounded-md hover:bg-[#ffbe0b] hover:text-[#1a2332] transition-all duration-300 uppercase tracking-wider text-center"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              About SF Supernova
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
