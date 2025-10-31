import Link from 'next/link';
import { notFound } from 'next/navigation';

// Review data - in production this would come from a database
const reviews = [
  {
    id: '1',
    title: 'Foundation by Isaac Asimov',
    author: 'Isaac Asimov',
    decade: '1950s',
    category: 'Books',
    rating: 5,
    excerpt: 'A sweeping tale of galactic empire and psychohistory that defined the golden age of science fiction...',
    publishDate: '1951',
    reviewDate: 'October 15, 2024',
    coverImage: null,
    content: `
      <p>Isaac Asimov's <em>Foundation</em> is more than just a novel—it's a vision of humanity's future spanning millennia. Published in 1951, this masterwork synthesizes Asimov's earlier stories into a cohesive narrative that would define science fiction for generations to come.</p>

      <h2>The Premise</h2>
      <p>Through the lens of psychohistory, a mathematical science that can predict the future of large populations, we witness the fall of a galactic empire and the calculated effort to preserve knowledge through the coming dark age. Hari Seldon's plan to reduce 30,000 years of barbarism to a mere 1,000 is audacious in its scope and brilliant in its execution.</p>

      <h2>Why It Matters</h2>
      <p>What makes <em>Foundation</em> exceptional isn't just its grand vision—it's Asimov's ability to make the decline and fall of civilizations feel immediate and personal. Each chapter jumps forward in time, introducing new characters facing crises that test Seldon's predictions. The result is a narrative that feels both epic and intimate.</p>

      <h2>The Legacy</h2>
      <p>The influence of <em>Foundation</em> on science fiction cannot be overstated. From <em>Dune</em> to <em>Star Wars</em>, echoes of Asimov's vision ripple through the genre. The idea that mathematics and social science could predict and shape the future was revolutionary, and it remains thought-provoking today.</p>

      <h2>Final Thoughts</h2>
      <p>Reading <em>Foundation</em> today, what strikes you most is its optimism. Despite depicting the fall of civilization, Asimov believed in humanity's ability to preserve knowledge, adapt, and rebuild. In our current age of uncertainty, that message feels more relevant than ever.</p>

      <p><strong>Rating: 5/5 stars</strong> - An absolute masterpiece of science fiction that every fan of the genre should read.</p>
    `
  },
  {
    id: '2',
    title: 'The Day the Earth Stood Still',
    author: 'Robert Wise',
    decade: '1950s',
    category: 'Film',
    rating: 5,
    excerpt: 'A landmark film that brought thoughtful sci-fi to mainstream audiences with its message of peace...',
    publishDate: '1951',
    reviewDate: 'October 12, 2024',
    coverImage: null,
    content: `
      <p>When Klaatu and his robot companion Gort arrive on Earth with a message of peace, they encounter humanity at its most fearful and xenophobic. This 1951 masterpiece transcends its Cold War origins to deliver a timeless meditation on violence, fear, and the possibility of redemption.</p>

      <h2>A Film of Its Time, For All Time</h2>
      <p>Released during the height of Cold War paranoia, <em>The Day the Earth Stood Still</em> dared to suggest that humanity's greatest threat wasn't communism or capitalism—it was our own violent nature. Director Robert Wise crafted a film that worked as both thrilling entertainment and serious social commentary.</p>

      <h2>Performances That Endure</h2>
      <p>Michael Rennie's portrayal of Klaatu is remarkable in its restraint. He brings dignity and quiet authority to an alien who could easily have been played as either menacing or condescending. Patricia Neal matches him with a grounded performance that makes the fantastic believable.</p>

      <h2>The Message</h2>
      <p>"Klaatu barada nikto" has become iconic, but the film's real power lies in its central warning: join the interstellar community and abandon violence, or be destroyed as a threat to others. In an age of nuclear weapons, the stakes couldn't have been clearer—or more relevant today.</p>

      <h2>Technical Brilliance</h2>
      <p>Bernard Herrmann's theremin-heavy score creates an otherworldly atmosphere that still sounds fresh today. The spacecraft design is elegant and memorable, proving that effective science fiction doesn't require overwhelming spectacle.</p>

      <p><strong>Rating: 5/5 stars</strong> - A landmark film that proves science fiction can be both entertaining and profound.</p>
    `
  },
  {
    id: '3',
    title: 'Dimension X: The Outer Limit',
    author: 'NBC Radio',
    decade: '1950s',
    category: 'Audio',
    rating: 5,
    excerpt: 'Classic radio drama that transported listeners to the far reaches of space and imagination...',
    publishDate: '1950',
    reviewDate: 'October 10, 2024',
    coverImage: null,
    content: `
      <p>In an era before television dominated American living rooms, radio dramas like <em>Dimension X</em> used nothing but sound to transport millions of listeners to alien worlds. "The Outer Limit" episode showcases everything that made this series a masterpiece of audio storytelling.</p>

      <h2>Theater of the Mind</h2>
      <p>What radio drama proved was that the most powerful special effects happen in the listener's imagination. With carefully crafted sound design, voice acting, and musical scoring, <em>Dimension X</em> created worlds that rivaled—and often surpassed—the visual science fiction of its day.</p>

      <h2>The Sound Design</h2>
      <p>Every creak of a spaceship's hull, every alien communication, every blast of a ray gun was meticulously crafted by NBC's sound effects team. The result is an immersive experience that demonstrates the power of pure audio storytelling.</p>

      <h2>Literary Adaptations</h2>
      <p><em>Dimension X</em> adapted stories from the greatest science fiction writers of the era—Asimov, Bradbury, Heinlein. "The Outer Limit" is a perfect example of how these adaptations honored the source material while embracing the unique possibilities of radio.</p>

      <h2>A Lost Art</h2>
      <p>In our age of podcasts, we're rediscovering what <em>Dimension X</em> proved in 1950: audio storytelling has unique power. These recordings remain as engaging today as they were over 70 years ago, testament to the timeless craft of great radio drama.</p>

      <p><strong>Rating: 5/5 stars</strong> - Essential listening for anyone interested in science fiction history or the art of audio drama.</p>
    `
  }
];

export async function generateMetadata({ params }: { params: { id: string } }) {
  const review = reviews.find(r => r.id === params.id);

  if (!review) {
    return {
      title: 'Review Not Found - SF Supernova',
    };
  }

  return {
    title: `${review.title} - Review - SF Supernova`,
    description: review.excerpt,
  };
}

export default function ReviewPage({ params }: { params: { id: string } }) {
  const review = reviews.find(r => r.id === params.id);

  if (!review) {
    notFound();
  }

  return (
    <div className="relative">
      {/* Breadcrumb Navigation */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-[#1a2332] border-b border-[#c9d1d9]/20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
            <Link href="/" className="text-[#c9d1d9]/60 hover:text-[#ff6b35] transition-colors">
              Home
            </Link>
            <span className="text-[#c9d1d9]/40">→</span>
            <Link href="/reviews" className="text-[#c9d1d9]/60 hover:text-[#ff6b35] transition-colors">
              Reviews
            </Link>
            <span className="text-[#c9d1d9]/40">→</span>
            <span className="text-[#c9d1d9]">{review.title}</span>
          </nav>
        </div>
      </section>

      {/* Review Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f8f3e6]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-semibold text-[#ffbe0b] px-3 py-1 bg-[#ffbe0b]/10 border border-[#ffbe0b]/30 rounded uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {review.category}
            </span>
            <div className="flex text-[#ffbe0b]">
              {[...Array(review.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-normal mb-4 text-[#1a2332]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            {review.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 text-[#1a2332]/70">
            <p
              className="text-lg font-medium"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              by {review.author}
            </p>
            <span className="hidden sm:inline text-[#1a2332]/40">•</span>
            <p
              className="text-sm"
              style={{ fontFamily: 'var(--font-courier-prime)' }}
            >
              {review.decade} • Published {review.publishDate}
            </p>
          </div>

          <p
            className="text-xl text-[#1a2332]/80 leading-relaxed italic border-l-4 border-[#ff6b35] pl-4"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {review.excerpt}
          </p>
        </div>
      </section>

      {/* Review Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <div
            className="text-[#1a2332] leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
        </article>
      </section>

      {/* Review Metadata Footer */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#f8f3e6] border-t border-[#c9d1d9]/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-sm text-[#1a2332]/60 mb-4 sm:mb-0"
              style={{ fontFamily: 'var(--font-courier-prime)' }}
            >
              Review published: {review.reviewDate}
            </p>
            <Link
              href="/reviews"
              className="inline-flex items-center text-[#ff6b35] hover:text-[#e63946] transition-colors font-medium"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              ← Back to All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Related Reviews CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a2332]">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-normal mb-6 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            EXPLORE MORE REVIEWS
          </h2>
          <p
            className="text-lg text-[#c9d1d9]/80 mb-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Discover more classic science fiction books, films, and radio dramas from the golden age.
          </p>
          <Link
            href="/reviews"
            className="inline-block px-8 py-3 text-white font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-wider badge-orange"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            View All Reviews
          </Link>
        </div>
      </section>
    </div>
  );
}
