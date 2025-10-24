import Link from 'next/link';

export const metadata = {
  title: 'Galleries - SF Supernova',
  description: 'Explore our curated collections of vintage science fiction cover art, pulp magazine illustrations, and classic movie posters.',
};

export default function GalleriesPage() {
  const galleries = [
    {
      id: '1',
      title: 'Pulp Magazine Covers of the 1950s',
      decade: '1950s',
      imageCount: 48,
      description: 'Vibrant, imaginative cover art from the golden age of pulp sci-fi magazines. Featuring work from legendary artists like Chesley Bonestell and Frank R. Paul.',
      color: 'border-retro-cyan',
      textColor: 'text-retro-cyan',
    },
    {
      id: '2',
      title: 'Classic Film Posters 1950-1960',
      decade: '1950s',
      imageCount: 32,
      description: 'Original movie posters from the era that brought science fiction to the silver screen. From The Day the Earth Stood Still to Forbidden Planet.',
      color: 'border-primary',
      textColor: 'text-primary',
    },
    {
      id: '3',
      title: 'Amazing Stories Golden Age',
      decade: '1930s-1940s',
      imageCount: 56,
      description: 'The covers that started it all. Hugo Gernsback\'s Amazing Stories brought sci-fi to the masses with stunning cover illustrations.',
      color: 'border-accent',
      textColor: 'text-accent',
    },
    {
      id: '4',
      title: 'Astounding Science Fiction Collection',
      decade: '1940s-1950s',
      imageCount: 64,
      description: 'John W. Campbell\'s Astounding Science Fiction magazine covers, featuring iconic imagery that defined the genre.',
      color: 'border-retro-pink',
      textColor: 'text-retro-pink',
    },
    {
      id: '5',
      title: 'Space Age Book Covers',
      decade: '1960s',
      imageCount: 40,
      description: 'Paperback cover art from the New Wave era, showcasing psychedelic and experimental design approaches.',
      color: 'border-retro-green',
      textColor: 'text-retro-green',
    },
    {
      id: '6',
      title: 'Robot & AI Imagery Through the Decades',
      decade: '1930s-1970s',
      imageCount: 52,
      description: 'A thematic collection exploring how robots and artificial intelligence were visualized across four decades.',
      color: 'border-retro-orange',
      textColor: 'text-retro-orange',
    },
  ];

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl font-black mb-4 text-primary text-glow-strong"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            GALLERIES
          </h1>
          <p className="text-xl text-foreground/80" style={{ wordBreak: 'normal', maxWidth: '800px', margin: '0 auto' }}>
            Immerse yourself in the visual artistry of vintage science fiction. From lurid pulp covers
            to iconic movie posters, these images defined how generations imagined the future.
          </p>
        </div>

        {/* Featured Gallery Highlight */}
        <section className="mb-16">
          <div className="bg-dark-purple/50 backdrop-blur-sm border-2 border-primary rounded-lg overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-bold text-accent px-3 py-1 bg-accent/20 border border-accent/50 rounded inline-block mb-4">
                    FEATURED COLLECTION
                  </span>

                  <h2
                    className="text-4xl font-bold mb-4 text-primary text-glow"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Pulp Magazine Covers of the 1950s
                  </h2>

                  <p className="text-lg text-foreground/80 mb-6">
                    The 1950s were the golden age of pulp science fiction magazines. These covers,
                    with their bold colors, dramatic compositions, and imaginative alien worlds,
                    captured the optimism and wonder of the Space Age.
                  </p>

                  <div className="flex gap-4">
                    <Link
                      href="/galleries/1"
                      className="px-8 py-3 bg-primary/20 border-2 border-primary text-primary font-bold rounded retro-button hover:bg-primary hover:text-background transition-all duration-300"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      VIEW GALLERY
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  {/* Placeholder for gallery preview */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-[2/3] bg-gradient-to-br from-primary/20 to-retro-cyan/20 border-2 border-primary/30 rounded-lg flex items-center justify-center hover:border-primary transition-all"
                      >
                        <svg className="w-16 h-16 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Galleries */}
        <section>
          <h2
            className="text-3xl font-bold mb-8 text-retro-cyan text-glow text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            ALL COLLECTIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                href={`/galleries/${gallery.id}`}
                className={`group bg-dark-blue/30 backdrop-blur-sm border-2 ${gallery.color}/30 rounded-lg overflow-hidden hover:${gallery.color} transition-all duration-300`}
              >
                {/* Gallery Preview */}
                <div className="aspect-video bg-gradient-to-br from-dark-purple to-dark-blue border-b-2 border-inherit flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4 opacity-50">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className={`bg-gradient-to-br from-${gallery.textColor}/20 to-transparent border border-${gallery.textColor}/20 rounded`}
                      ></div>
                    ))}
                  </div>

                  <svg className="w-20 h-20 text-foreground/20 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>

                  <div className="absolute top-4 right-4 bg-background/80 px-3 py-1 rounded text-sm font-bold text-foreground">
                    {gallery.imageCount} images
                  </div>
                </div>

                {/* Gallery Info */}
                <div className="p-6">
                  <span className={`text-xs font-bold ${gallery.textColor} px-3 py-1 bg-${gallery.textColor}/20 border border-${gallery.textColor}/50 rounded inline-block mb-3`}>
                    {gallery.decade}
                  </span>

                  <h3 className={`text-xl font-bold mb-2 ${gallery.textColor} group-hover:text-glow transition-all`}>
                    {gallery.title}
                  </h3>

                  <p className="text-foreground/80 mb-4">
                    {gallery.description}
                  </p>

                  <div className={`${gallery.textColor} group-hover:translate-x-2 transition-transform inline-flex items-center font-bold`}>
                    View Gallery →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center py-12 bg-dark-purple/30 backdrop-blur-sm rounded-lg border-2 border-primary/30">
          <h3
            className="text-2xl font-bold mb-4 text-retro-pink text-glow"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            CONTRIBUTE TO OUR COLLECTION
          </h3>
          <p className="text-foreground/80 mb-6 max-w-4xl mx-auto" style={{ wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}>
            Have vintage sci-fi cover art or posters to share? We're always looking to expand our galleries
            with high-quality scans from collectors and enthusiasts.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-3 bg-retro-pink/20 border-2 border-retro-pink text-retro-pink font-bold rounded retro-button hover:bg-retro-pink hover:text-background transition-all duration-300"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            GET IN TOUCH
          </Link>
        </section>
      </div>
    </div>
  );
}
