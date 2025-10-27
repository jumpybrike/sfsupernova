import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Galleries - SF Supernova',
  description: 'Explore our curated collections of vintage science fiction cover art, pulp magazine illustrations, and classic movie posters.',
};

export default async function GalleriesPage() {
  // Fetch all images from database
  const supabase = await createClient();
  const { data: allImages } = await supabase
    .from('images')
    .select('*')
    .order('year', { ascending: true });

  // Group images by decade
  const imagesByDecade = {
    '1890s-1910s': allImages?.filter(img => img.year && img.year < 1920) || [],
    '1920s': allImages?.filter(img => img.year && img.year >= 1920 && img.year < 1930) || [],
    '1930s': allImages?.filter(img => img.year && img.year >= 1930 && img.year < 1940) || [],
    '1940s': allImages?.filter(img => img.year && img.year >= 1940 && img.year < 1950) || [],
    '1950s': allImages?.filter(img => img.year && img.year >= 1950 && img.year < 1960) || [],
    '1960s': allImages?.filter(img => img.year && img.year >= 1960 && img.year < 1970) || [],
    '1970s': allImages?.filter(img => img.year && img.year >= 1970 && img.year < 1980) || [],
  };

  const decadeInfo = [
    {
      decade: '1890s-1910s',
      title: 'Victorian Era: The Pioneers',
      description: 'Before "science fiction" had a name. Jules Verne, H.G. Wells, and Mary Shelley imagined futures of technological wonder.',
      color: 'text-[#ffbe0b]',
      borderColor: 'border-[#ffbe0b]',
    },
    {
      decade: '1920s',
      title: '1920s: The Pulp Era Begins',
      description: 'Amazing Stories launches in 1926, creating the first magazine dedicated entirely to science fiction.',
      color: 'text-[#ff6b35]',
      borderColor: 'border-[#ff6b35]',
    },
    {
      decade: '1930s',
      title: '1930s: Golden Age Begins',
      description: 'The Golden Age dawns with Astounding Science Fiction and iconic pulp cover artists like Frank R. Paul.',
      color: 'text-[#2ec4b6]',
      borderColor: 'border-[#2ec4b6]',
    },
    {
      decade: '1940s',
      title: '1940s: Wartime Sci-Fi',
      description: 'World War II brings new technologies and anxieties, reflected in darker, more realistic science fiction.',
      color: 'text-[#e63946]',
      borderColor: 'border-[#e63946]',
    },
    {
      decade: '1950s',
      title: '1950s: Space Age Dreams',
      description: 'Chrome rockets and atomic optimism! The most iconic decade of retro-futuristic aesthetics.',
      color: 'text-[#00d9ff]',
      borderColor: 'border-[#00d9ff]',
    },
    {
      decade: '1960s',
      title: '1960s: New Wave',
      description: 'Psychedelic and experimental design approaches reflect the counterculture and space race era.',
      color: 'text-[#9d4edd]',
      borderColor: 'border-[#9d4edd]',
    },
    {
      decade: '1970s',
      title: '1970s: Space Colony Dreams',
      description: "NASA's vision of humanity's future in space. O'Neill Cylinders, Stanford Torus, and Bernal Spheres illustrated by Don Davis and Rick Guidice for the 1975 NASA Space Settlement Studies.",
      color: 'text-[#4facfe]',
      borderColor: 'border-[#4facfe]',
    },
  ];

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl font-black mb-4 text-[#ff6b35]"
            style={{ fontFamily: 'Orbitron, sans-serif', wordBreak: 'normal' }}
          >
            GALLERIES
          </h1>
          <p className="text-xl text-[#c9d1d9]/80" style={{ wordBreak: 'normal', maxWidth: '800px', margin: '0 auto' }}>
            Immerse yourself in the visual artistry of vintage science fiction. From lurid pulp covers
            to iconic movie posters, these images defined how generations imagined the future.
          </p>
        </div>

        {/* Decade Galleries */}
        {decadeInfo.map((info) => {
          const images = imagesByDecade[info.decade as keyof typeof imagesByDecade];
          if (!images || images.length === 0) return null;

          return (
            <section key={info.decade} className="mb-16">
              <div className="mb-6">
                <h2
                  className={`text-3xl font-bold mb-2 ${info.color}`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {info.title}
                </h2>
                <p className="text-lg text-[#c9d1d9]/70">
                  {info.description}
                </p>
                <p className="text-sm text-[#c9d1d9]/50 mt-2">
                  {images.length} images
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {images.map((image: any) => (
                  <Link
                    key={image.id}
                    href={`/gallery/${image.catalog_number}`}
                    className={`group relative aspect-[2/3] overflow-hidden rounded-lg border-2 ${info.borderColor}/30 hover:${info.borderColor} transition-all duration-300 shadow-sm hover:shadow-lg`}
                  >
                    <img
                      src={image.file_path}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-xs font-semibold line-clamp-2">
                          {image.title}
                        </p>
                        <p className="text-[#ffbe0b] text-xs mt-1">
                          {image.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* View All CTA */}
        <section className="mt-16 text-center py-12 bg-[#1a2332]/50 backdrop-blur-sm rounded-lg border-2 border-[#ff6b35]/30">
          <h3
            className="text-2xl font-bold mb-4 text-[#00d9ff]"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            EXPLORE THE FULL COLLECTION
          </h3>
          <p className="text-[#c9d1d9]/80 mb-6 max-w-4xl mx-auto">
            Browse all {allImages?.length || 0} vintage sci-fi images in our collection
          </p>
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 bg-[#ff6b35] text-white font-bold rounded hover:bg-[#e63946] transition-all duration-300"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            VIEW FULL GALLERY
          </Link>
        </section>
      </div>
    </div>
  );
}
