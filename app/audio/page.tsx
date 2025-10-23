'use client';

export default function AudioPage() {
  const audioContent = [
    {
      id: '1',
      title: 'Dimension X: The Outer Limit',
      series: 'Dimension X',
      date: 'April 29, 1950',
      duration: '28:45',
      description: 'An expedition to Mars encounters an inexplicable barrier preventing them from landing. A tense exploration of the unknown that showcases the best of radio drama sound design.',
      archiveUrl: 'https://archive.org/details/OTRR_Dimension_X_Singles',
      decade: '1950s',
    },
    {
      id: '2',
      title: 'X Minus One: A Logic Named Joe',
      series: 'X Minus One',
      date: 'January 3, 1956',
      duration: '25:30',
      description: 'A remarkably prescient tale about networked computers with access to all human knowledge. This 1946 story essentially predicted the internet and some of its dangers.',
      archiveUrl: 'https://archive.org/details/OTRR_X_Minus_One_Singles',
      decade: '1950s',
    },
    {
      id: '3',
      title: 'Escape: Mars Is Heaven',
      series: 'Escape',
      date: 'October 24, 1948',
      duration: '30:00',
      description: 'Based on Ray Bradbury\'s story, this episode follows astronauts who land on Mars and find a perfect recreation of small-town America. But is it too perfect?',
      archiveUrl: 'https://archive.org/details/OTRR_Escape_Singles',
      decade: '1940s',
    },
    {
      id: '4',
      title: 'Dimension X: To the Future',
      series: 'Dimension X',
      date: 'June 24, 1950',
      duration: '29:15',
      description: 'Time travel adventure that explores the consequences of seeing the future. Excellent voice acting and atmospheric sound effects.',
      archiveUrl: 'https://archive.org/details/OTRR_Dimension_X_Singles',
      decade: '1950s',
    },
    {
      id: '5',
      title: 'X Minus One: The Veldt',
      series: 'X Minus One',
      date: 'July 31, 1955',
      duration: '27:00',
      description: 'Another Bradbury adaptation about a high-tech nursery that creates any environment the children imagine. A chilling exploration of technology and parenting.',
      archiveUrl: 'https://archive.org/details/OTRR_X_Minus_One_Singles',
      decade: '1950s',
    },
    {
      id: '6',
      title: 'Dimension X: The Embassy',
      series: 'Dimension X',
      date: 'May 27, 1950',
      duration: '28:30',
      description: 'First contact with aliens takes an unexpected turn when Earth\'s ambassador must navigate complex interstellar politics.',
      archiveUrl: 'https://archive.org/details/OTRR_Dimension_X_Singles',
      decade: '1950s',
    },
  ];

  const series = [
    {
      name: 'Dimension X',
      years: '1950-1951',
      episodes: 50,
      description: 'NBC\'s groundbreaking science fiction radio series that adapted classic sci-fi stories for audio.',
      color: 'text-primary',
    },
    {
      name: 'X Minus One',
      years: '1955-1958',
      episodes: 127,
      description: 'The spiritual successor to Dimension X, featuring more sophisticated productions and adaptations.',
      color: 'text-retro-cyan',
    },
    {
      name: 'Escape',
      years: '1947-1954',
      episodes: 230,
      description: 'Adventure anthology series that frequently featured science fiction and fantasy stories.',
      color: 'text-retro-pink',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl font-black mb-4 text-primary text-glow-strong"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            AUDIO DRAMAS
          </h1>
          <p className="text-xl text-foreground/80" style={{ wordBreak: 'normal', maxWidth: '800px', margin: '0 auto' }}>
            Experience the golden age of radio science fiction. Before television, these audio dramas
            transported listeners to alien worlds through nothing but sound, voice, and imagination.
          </p>
        </div>

        {/* Radio Series */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-8 text-retro-cyan text-glow text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            CLASSIC SERIES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {series.map((s) => (
              <div
                key={s.name}
                className="bg-dark-purple/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-6 hover:border-primary transition-all duration-300"
              >
                <h3
                  className={`text-2xl font-bold mb-2 ${s.color} text-glow`}
                  style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
                >
                  {s.name}
                </h3>
                <p className="text-sm text-foreground/60 mb-4" style={{ wordBreak: 'normal' }}>
                  {s.years} • {s.episodes} episodes
                </p>
                <p className="text-foreground/80" style={{ wordBreak: 'normal' }}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Episodes */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-8 text-retro-pink text-glow text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            FEATURED EPISODES
          </h2>

          <div className="space-y-6">
            {audioContent.map((audio) => (
              <article
                key={audio.id}
                className="bg-dark-blue/30 backdrop-blur-sm border-2 border-retro-cyan/30 rounded-lg overflow-hidden hover:border-retro-cyan transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-accent px-3 py-1 bg-accent/20 border border-accent/50 rounded">
                          {audio.decade}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {audio.duration}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-1 text-primary">
                        {audio.title}
                      </h3>

                      <p className="text-sm text-retro-cyan mb-2">
                        {audio.series} • {audio.date}
                      </p>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <a
                        href={audio.archiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-primary/20 border-2 border-primary text-primary font-bold rounded retro-button hover:bg-primary hover:text-background transition-all duration-300"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        LISTEN NOW
                      </a>
                    </div>
                  </div>

                  <p className="text-foreground/80">
                    {audio.description}
                  </p>

                  {/* Placeholder for audio player - would integrate with actual player */}
                  <div className="mt-4 p-4 bg-background/30 border border-primary/20 rounded">
                    <div className="flex items-center gap-4">
                      <button className="w-10 h-10 rounded-full bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-background transition-all">
                        <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>

                      <div className="flex-1">
                        <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                          <div className="h-full w-0 bg-primary rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs text-foreground/60 mt-1">
                          <span>0:00</span>
                          <span>{audio.duration}</span>
                        </div>
                      </div>

                      <button className="text-foreground/60 hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="text-center py-12 bg-dark-purple/30 backdrop-blur-sm rounded-lg border-2 border-primary/30">
          <h3
            className="text-2xl font-bold mb-4 text-retro-green text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            EXPLORE THE ARCHIVES
          </h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            These classic radio dramas are preserved at the Internet Archive. Visit their collections
            to discover hundreds more episodes from the golden age of radio science fiction.
          </p>
          <a
            href="https://archive.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-retro-green/20 border-2 border-retro-green text-retro-green font-bold rounded retro-button hover:bg-retro-green hover:text-background transition-all duration-300"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            VISIT INTERNET ARCHIVE
          </a>
        </section>
      </div>
    </div>
  );
}
