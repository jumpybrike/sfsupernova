import Link from 'next/link';

export const metadata = {
  title: 'Reviews - SF Supernova',
  description: 'In-depth reviews of classic science fiction books, films, and radio dramas from the golden age.',
};

export default function ReviewsPage() {
  const reviews = [
    {
      id: '1',
      title: 'Foundation by Isaac Asimov',
      author: 'Isaac Asimov',
      decade: '1950s',
      category: 'Books',
      rating: 5,
      excerpt: 'Asimov\'s Foundation is more than just a novel—it\'s a vision of humanity\'s future spanning millennia. Through the lens of psychohistory, a mathematical science that can predict the future of large populations, we witness the fall of a galactic empire and the calculated effort to preserve knowledge...',
      date: '2024-10-15',
    },
    {
      id: '2',
      title: 'The Day the Earth Stood Still',
      author: 'Robert Wise',
      decade: '1950s',
      category: 'Film',
      rating: 5,
      excerpt: 'A masterpiece of thoughtful science fiction that transcends its era. When Klaatu and his robot companion Gort arrive on Earth with a message of peace, they encounter humanity at its most fearful and xenophobic. This Cold War parable remains startlingly relevant...',
      date: '2024-10-12',
    },
    {
      id: '3',
      title: 'Dimension X: The Outer Limit',
      author: 'NBC Radio',
      decade: '1950s',
      category: 'Audio',
      rating: 5,
      excerpt: 'This episode of Dimension X showcases the power of audio drama to transport listeners to alien worlds. The sound design, voice acting, and atmospheric music create an immersive experience that rivals any visual medium of its time...',
      date: '2024-10-10',
    },
    {
      id: '4',
      title: 'Dune by Frank Herbert',
      author: 'Frank Herbert',
      decade: '1960s',
      category: 'Books',
      rating: 5,
      excerpt: 'Herbert\'s sprawling epic combines desert ecology, feudal politics, and messianic prophecy into a rich tapestry that defined modern space opera. The world-building is meticulous, the characters complex, and the themes timeless...',
      date: '2024-10-08',
    },
    {
      id: '5',
      title: 'Forbidden Planet',
      author: 'Fred M. Wilcox',
      decade: '1950s',
      category: 'Film',
      rating: 4,
      excerpt: 'A landmark in science fiction cinema that brought Shakespearean themes to the stars. Robby the Robot became an icon, and the electronic score by Louis and Bebe Barron was revolutionary...',
      date: '2024-10-05',
    },
    {
      id: '6',
      title: 'X Minus One: A Logic Named Joe',
      author: 'NBC Radio',
      decade: '1950s',
      category: 'Audio',
      rating: 4,
      excerpt: 'A remarkably prescient story about networked computers with access to all human knowledge. Written in 1946, it essentially predicted the internet and some of its dangers...',
      date: '2024-10-03',
    },
  ];

  const categories = ['All', 'Books', 'Film', 'Audio'];

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl font-black mb-4 text-primary text-glow-strong"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            REVIEWS
          </h1>
          <p className="text-xl text-foreground/80" style={{ wordBreak: 'normal', maxWidth: '800px', margin: '0 auto' }}>
            Deep dives into the classics of science fiction's golden age. From pulp novels to silver screen masterpieces,
            we explore what made these works revolutionary.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 border-2 rounded font-bold transition-all duration-300 ${
                category === 'All'
                  ? 'bg-primary/20 border-primary text-primary neon-border'
                  : 'bg-dark-purple/50 border-retro-cyan/30 text-retro-cyan hover:border-retro-cyan hover:bg-retro-cyan/20'
              }`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-dark-purple/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg overflow-hidden hover:border-primary transition-all duration-300 flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
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

                <h3 className="text-xl font-bold mb-2 text-primary" style={{ wordBreak: 'normal' }}>
                  {review.title}
                </h3>

                <p className="text-sm text-retro-cyan mb-1" style={{ wordBreak: 'normal' }}>
                  by {review.author}
                </p>

                <p className="text-xs text-foreground/60 mb-4" style={{ wordBreak: 'normal' }}>
                  {review.decade} • {review.date}
                </p>

                <p className="text-foreground/80 mb-4 flex-1" style={{ wordBreak: 'normal' }}>
                  {review.excerpt}
                </p>

                <Link
                  href={`/reviews/${review.id}`}
                  className="text-primary hover:text-[#e63946] transition-colors inline-flex items-center font-bold"
                >
                  Read Full Review →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button
            className="px-8 py-3 bg-retro-cyan/20 border-2 border-retro-cyan text-retro-cyan font-bold rounded retro-button hover:bg-retro-cyan hover:text-background transition-all duration-300"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            LOAD MORE REVIEWS
          </button>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center py-12 bg-dark-purple/30 backdrop-blur-sm rounded-lg border-2 border-primary/30">
          <h3
            className="text-2xl font-bold mb-4 text-primary text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            NEVER MISS A REVIEW
          </h3>
          <p className="text-foreground/80 mb-6 max-w-4xl mx-auto" style={{ wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}>
            Subscribe to our newsletter and get weekly reviews, recommendations, and vintage sci-fi discoveries.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block px-8 py-3 bg-primary/20 border-2 border-primary text-primary font-bold rounded retro-button hover:bg-primary hover:text-background transition-all duration-300"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            SUBSCRIBE NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
