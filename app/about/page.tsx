import Link from 'next/link';

export const metadata = {
  title: 'About - SF Supernova',
  description: 'Learn about SF Supernova, our mission to preserve and celebrate the golden age of science fiction.',
};

export default function AboutPage() {
  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl font-black mb-4 text-primary text-glow-strong"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            ABOUT SF SUPERNOVA
          </h1>
          <p className="text-xl text-retro-cyan text-glow" style={{ wordBreak: 'normal' }}>
            Preserving the Golden Age of Science Fiction
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="bg-dark-purple/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-8 neon-border">
            <h2
              className="text-3xl font-bold mb-6 text-primary text-glow"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              OUR MISSION
            </h2>

            <p className="text-lg text-foreground/90 mb-4 leading-relaxed" style={{ wordBreak: 'normal' }}>
              SF Supernova is dedicated to celebrating and preserving the golden age of science fiction—a
              period spanning from the 1930s through the 1970s when visionary authors, artists, and
              creators imagined futures that would shape our understanding of technology, society, and
              humanity itself.
            </p>

            <p className="text-lg text-foreground/90 mb-4 leading-relaxed" style={{ wordBreak: 'normal' }}>
              Through in-depth reviews, curated galleries, and preserved audio dramas, we explore the
              works that defined the genre: from the pulp magazines that birthed modern sci-fi to the
              radio dramas that captivated millions, from the groundbreaking novels that challenged
              conventions to the films that brought impossible worlds to life.
            </p>

            <p className="text-lg text-foreground/90 leading-relaxed" style={{ wordBreak: 'normal' }}>
              We believe these works are more than historical artifacts—they're living testaments to
              human imagination, and their themes remain startlingly relevant today.
            </p>
          </div>
        </section>

        {/* What We Cover */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-8 text-retro-cyan text-glow text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            WHAT WE EXPLORE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-blue/30 backdrop-blur-sm border-2 border-retro-cyan/30 rounded-lg p-6">
              <div className="text-retro-cyan text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2 text-primary" style={{ wordBreak: 'normal' }}>Classic Literature</h3>
              <p className="text-foreground/80" style={{ wordBreak: 'normal' }}>
                From Asimov's Foundation to Herbert's Dune, we review and analyze the novels and
                short stories that defined the genre.
              </p>
            </div>

            <div className="bg-dark-blue/30 backdrop-blur-sm border-2 border-retro-pink/30 rounded-lg p-6">
              <div className="text-retro-pink text-3xl mb-3">🎬</div>
              <h3 className="text-xl font-bold mb-2 text-primary" style={{ wordBreak: 'normal' }}>Classic Films</h3>
              <p className="text-foreground/80" style={{ wordBreak: 'normal' }}>
                Exploring the movies that brought sci-fi to mainstream audiences, from The Day the
                Earth Stood Still to Star Wars.
              </p>
            </div>

            <div className="bg-dark-blue/30 backdrop-blur-sm border-2 border-retro-green/30 rounded-lg p-6">
              <div className="text-retro-green text-3xl mb-3">📻</div>
              <h3 className="text-xl font-bold mb-2 text-primary" style={{ wordBreak: 'normal' }}>Radio Dramas</h3>
              <p className="text-foreground/80" style={{ wordBreak: 'normal' }}>
                Preserving and celebrating classic radio series like Dimension X and X Minus One that
                brought sci-fi to millions of homes.
              </p>
            </div>

            <div className="bg-dark-blue/30 backdrop-blur-sm border-2 border-accent/30 rounded-lg p-6">
              <div className="text-accent text-3xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-primary" style={{ wordBreak: 'normal' }}>Cover Art</h3>
              <p className="text-foreground/80" style={{ wordBreak: 'normal' }}>
                Showcasing the vibrant, imaginative artwork that graced pulp magazines and paperback
                covers through the decades.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-8 text-retro-pink text-glow text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            THE GOLDEN AGE TIMELINE
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-accent pl-6 pb-6">
              <h3 className="text-2xl font-bold text-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                1930s-1940s: The Golden Age
              </h3>
              <p className="text-foreground/80">
                The birth of modern science fiction through pulp magazines. Hugo Gernsback's Amazing
                Stories and John W. Campbell's Astounding Science Fiction established the genre's
                foundations.
              </p>
            </div>

            <div className="border-l-4 border-retro-cyan pl-6 pb-6">
              <h3 className="text-2xl font-bold text-retro-cyan mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                1950s: The Space Age
              </h3>
              <p className="text-foreground/80">
                Sci-fi explodes into mainstream culture. The atomic age and space race fuel
                imaginations. Classic films and radio dramas bring the genre to millions.
              </p>
            </div>

            <div className="border-l-4 border-retro-pink pl-6 pb-6">
              <h3 className="text-2xl font-bold text-retro-pink mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                1960s: The New Wave
              </h3>
              <p className="text-foreground/80">
                Literary experimentation and social commentary transform the genre. Authors push
                boundaries, exploring psychology, philosophy, and counterculture themes.
              </p>
            </div>

            <div className="border-l-4 border-retro-green pl-6">
              <h3 className="text-2xl font-bold text-retro-green mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                1970s: The Experimental Era
              </h3>
              <p className="text-foreground/80">
                Sci-fi matures with darker, more complex narratives. Cyberpunk emerges, environmental
                themes dominate, and special effects revolutionize film.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Community */}
        <section className="mb-16">
          <div className="bg-dark-purple/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-8">
            <h2
              className="text-3xl font-bold mb-6 text-primary text-glow text-center"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              JOIN OUR COMMUNITY
            </h2>

            <p className="text-lg text-foreground/90 mb-6 text-center">
              SF Supernova is more than a website—it's a community of enthusiasts who share a passion
              for vintage science fiction. Whether you're a longtime fan or just discovering these
              classics, we welcome you to join the conversation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#newsletter"
                className="px-8 py-3 bg-primary/20 border-2 border-primary text-primary font-bold rounded retro-button hover:bg-primary hover:text-background transition-all duration-300 text-center"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                SUBSCRIBE TO NEWSLETTER
              </Link>
              <a
                href="mailto:contact@sfsupernova.com"
                className="px-8 py-3 bg-retro-cyan/20 border-2 border-retro-cyan text-retro-cyan font-bold rounded retro-button hover:bg-retro-cyan hover:text-background transition-all duration-300 text-center"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                CONTACT US
              </a>
            </div>
          </div>
        </section>

        {/* Disclosure */}
        <section className="border-t-2 border-primary/20 pt-8">
          <h3 className="text-lg font-bold mb-4 text-retro-cyan">
            Affiliate Disclosure
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            SF Supernova is a participant in the Amazon Services LLC Associates Program and other
            affiliate advertising programs designed to provide a means for sites to earn advertising
            fees by advertising and linking to featured products. When you purchase through our
            links, we may earn a small commission at no additional cost to you. This helps support
            our mission to preserve and celebrate vintage science fiction. All opinions and reviews
            remain our own.
          </p>
        </section>
      </div>
    </div>
  );
}
