import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Reviews - SF Supernova',
  description: 'In-depth reviews of classic science fiction books, films, and radio dramas from the golden age.',
};

export default async function ReviewsPage() {
  // Fetch all reviews from database
  const supabase = await createClient();
  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .order('review_date', { ascending: false });

  // Log error if database fetch fails
  if (reviewsError) {
    console.error('Error fetching reviews:', reviewsError.message);
  }

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
        {reviewsError ? (
          <div className="text-center py-12 mb-12">
            <p className="text-foreground/60 mb-2">Unable to load reviews at this time.</p>
            <p className="text-sm text-foreground/40">Please try refreshing the page or check back later.</p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review: any) => (
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
                    {review.decade} • {review.review_date}
                  </p>

                  <p className="text-foreground/80 mb-4 flex-1" style={{ wordBreak: 'normal' }}>
                    {review.excerpt}
                  </p>

                  <Link
                    href={`/reviews/${review.slug || review.id}`}
                    className="text-primary hover:text-[#e63946] transition-colors inline-flex items-center font-bold"
                  >
                    Read Full Review →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-12">
            <p className="text-foreground/60">No reviews available yet.</p>
          </div>
        )}

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
