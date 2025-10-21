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
    { slug: '1930s-1940s', name: '1930s-1940s', subtitle: 'Golden Age', color: 'text-accent' },
    { slug: '1950s', name: '1950s', subtitle: 'Space Age', color: 'text-retro-cyan' },
    { slug: '1960s', name: '1960s', subtitle: 'New Wave', color: 'text-retro-pink' },
    { slug: '1970s', name: '1970s', subtitle: 'Experimental Era', color: 'text-retro-green' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-primary text-glow-strong"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              SF SUPERNOVA
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-retro-cyan text-glow">
              Your Portal to Vintage Science Fiction
            </p>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
              Explore the golden age of sci-fi through pulp magazines, classic radio dramas,
              and the visionary works that shaped our futures past.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/decades/1950s"
                className="px-8 py-4 bg-primary/20 border-2 border-primary text-primary font-bold rounded retro-button hover:bg-primary hover:text-background transition-all duration-300"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                EXPLORE THE SPACE AGE
              </Link>
              <Link
                href="/audio"
                className="px-8 py-4 bg-retro-cyan/20 border-2 border-retro-cyan text-retro-cyan font-bold rounded retro-button hover:bg-retro-cyan hover:text-background transition-all duration-300"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                LISTEN TO RADIO DRAMAS
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-retro-cyan/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Decades Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-purple/20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-retro-cyan text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            EXPLORE BY DECADE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {decades.map((decade) => (
              <Link
                key={decade.slug}
                href={`/decades/${decade.slug}`}
                className="group bg-dark-purple/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 hover:border-primary transition-all duration-300 neon-border"
              >
                <h3
                  className={`text-2xl font-bold mb-2 ${decade.color} group-hover:text-glow transition-all`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {decade.name}
                </h3>
                <p className="text-foreground/70 group-hover:text-foreground transition-colors">
                  {decade.subtitle}
                </p>
                <div className="mt-4 text-primary group-hover:translate-x-2 transition-transform">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-retro-pink text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            FEATURED REVIEWS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <article
                key={index}
                className="bg-dark-blue/30 backdrop-blur-sm border-2 border-retro-cyan/30 rounded-lg p-6 hover:border-retro-cyan transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-accent px-3 py-1 bg-accent/20 border border-accent/50 rounded">
                    {review.category}
                  </span>
                  <div className="flex text-accent">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-primary">
                  {review.title}
                </h3>

                <p className="text-sm text-retro-cyan mb-3">
                  {review.decade}
                </p>

                <p className="text-foreground/80 mb-4">
                  {review.excerpt}
                </p>

                <Link
                  href="/reviews"
                  className="text-primary hover:text-retro-cyan transition-colors inline-flex items-center"
                >
                  Read full review →
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-block px-8 py-3 bg-retro-pink/20 border-2 border-retro-pink text-retro-pink font-bold rounded retro-button hover:bg-retro-pink hover:text-background transition-all duration-300"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              VIEW ALL REVIEWS
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-purple/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6 text-retro-green text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            DISCOVER THE CLASSICS
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            From Asimov to Zelazny, from pulp covers to radio plays, dive deep into the
            archives of science fiction's most influential era.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/galleries"
              className="px-8 py-3 bg-retro-green/20 border-2 border-retro-green text-retro-green font-bold rounded retro-button hover:bg-retro-green hover:text-background transition-all duration-300"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              BROWSE GALLERIES
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 bg-accent/20 border-2 border-accent text-accent font-bold rounded retro-button hover:bg-accent hover:text-background transition-all duration-300"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ABOUT SF SUPERNOVA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
