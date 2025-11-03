import Link from 'next/link';
import { notFound } from 'next/navigation';

const decades: Record<string, {
  name: string;
  subtitle: string;
  description: string;
  highlights: string[];
  color: string;
  borderColor: string;
}> = {
  '1930s-1940s': {
    name: '1930s-1940s',
    subtitle: 'The Golden Age',
    description: 'The birth of modern science fiction. This era saw the rise of pulp magazines like Amazing Stories and Astounding Science Fiction, introducing legendary authors like Isaac Asimov, Robert Heinlein, and Arthur C. Clarke.',
    highlights: [
      'Foundation series begins (Asimov, 1942)',
      'Slan by A.E. van Vogt (1940)',
      'The War of the Worlds radio broadcast (1938)',
      'Buck Rogers and Flash Gordon serials',
    ],
    color: 'text-accent',
    borderColor: 'border-accent',
  },
  '1950s': {
    name: '1950s',
    subtitle: 'The Space Age',
    description: 'Science fiction exploded into mainstream culture. The atomic age and space race fueled imaginations, while authors explored deeper themes of humanity, technology, and society.',
    highlights: [
      'The Day the Earth Stood Still (1951)',
      'Fahrenheit 451 by Ray Bradbury (1953)',
      'Foundation trilogy completed',
      'Dimension X and X Minus One radio dramas',
      'Forbidden Planet (1956)',
    ],
    color: 'text-retro-cyan',
    borderColor: 'border-retro-cyan',
  },
  '1960s': {
    name: '1960s',
    subtitle: 'The New Wave',
    description: 'A revolutionary period that brought literary experimentation and social commentary to sci-fi. Authors pushed boundaries, exploring psychology, philosophy, and counterculture themes.',
    highlights: [
      'Dune by Frank Herbert (1965)',
      'Stranger in a Strange Land by Heinlein (1961)',
      'The Twilight Zone (1959-1964)',
      'Star Trek debut (1966)',
      'Do Androids Dream of Electric Sheep? by Philip K. Dick (1968)',
    ],
    color: 'text-retro-pink',
    borderColor: 'border-retro-pink',
  },
  '1970s': {
    name: '1970s',
    subtitle: 'The Experimental Era',
    description: 'Science fiction matured with darker, more complex narratives. Cyberpunk emerged, environmental themes dominated, and special effects revolutionized film.',
    highlights: [
      'The Left Hand of Darkness by Ursula K. Le Guin (1969-70)',
      'Rendezvous with Rama by Clarke (1973)',
      'Star Wars (1977)',
      'Close Encounters of the Third Kind (1977)',
      'The Lathe of Heaven by Le Guin (1971)',
    ],
    color: 'text-retro-green',
    borderColor: 'border-retro-green',
  },
};

export async function generateStaticParams() {
  return Object.keys(decades).map((slug) => ({
    slug: slug,
  }));
}

export default async function DecadePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decade = decades[slug];

  if (!decade) {
    notFound();
  }

  // Sample content for the decade
  const sampleReviews = [
    {
      title: 'Foundation',
      author: 'Isaac Asimov',
      type: 'Novel',
      rating: 5,
      excerpt: 'A masterwork of galactic empire and psychohistory...',
    },
    {
      title: 'The Day the Earth Stood Still',
      author: 'Robert Wise (Director)',
      type: 'Film',
      rating: 5,
      excerpt: 'A landmark in thoughtful science fiction cinema...',
    },
    {
      title: 'Dimension X',
      author: 'NBC Radio',
      type: 'Radio Drama',
      rating: 5,
      excerpt: 'Bringing classic sci-fi stories to life through audio...',
    },
  ];

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-primary hover:text-retro-cyan transition-colors inline-flex items-center mb-6"
          >
            ← Back to Home
          </Link>

          <h1
            className={`text-5xl sm:text-6xl font-black mb-4 ${decade.color} text-glow-strong`}
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            {decade.name}
          </h1>
          <p className="text-2xl text-foreground/80 mb-6" style={{ wordBreak: 'normal' }}>
            {decade.subtitle}
          </p>

          <div className={`border-l-4 ${decade.borderColor} pl-6 py-4 bg-dark-purple/30 backdrop-blur-sm rounded-r-lg`}>
            <p className="text-lg text-foreground/80" style={{ wordBreak: 'normal' }}>
              {decade.description}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-6 text-primary text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            DECADE HIGHLIGHTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {decade.highlights.map((highlight, index) => (
              <div
                key={index}
                className={`bg-dark-blue/30 backdrop-blur-sm border-2 ${decade.borderColor}/30 rounded-lg p-4 hover:${decade.borderColor} transition-all duration-300`}
              >
                <div className="flex items-start">
                  <span className={`${decade.color} text-2xl font-bold mr-3`}>
                    {index + 1}
                  </span>
                  <p className="text-foreground/80 pt-1" style={{ wordBreak: 'normal' }}>
                    {highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Content */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-6 text-retro-cyan text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            FEATURED CONTENT FROM THIS ERA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleReviews.map((review, index) => (
              <article
                key={index}
                className="bg-dark-purple/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-accent px-3 py-1 bg-accent/20 border border-accent/50 rounded">
                    {review.type}
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
                  by {review.author}
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
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-dark-purple/30 backdrop-blur-sm rounded-lg border-2 border-primary/30">
          <h3
            className="text-2xl font-bold mb-4 text-primary text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            EXPLORE MORE FROM THE {decade.name.toUpperCase()}
          </h3>
          <p className="text-foreground/80 mb-6 max-w-4xl mx-auto" style={{ wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}>
            Dive deeper into this incredible era of science fiction with our comprehensive reviews,
            galleries, and audio archives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reviews"
              className={`px-8 py-3 bg-${decade.color}/20 border-2 ${decade.borderColor} ${decade.color} font-bold rounded retro-button hover:bg-primary hover:text-background transition-all duration-300`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ALL REVIEWS
            </Link>
            <Link
              href="/galleries"
              className="px-8 py-3 bg-retro-pink/20 border-2 border-retro-pink text-retro-pink font-bold rounded retro-button hover:bg-retro-pink hover:text-background transition-all duration-300"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              VIEW GALLERIES
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
