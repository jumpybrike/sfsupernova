'use client';

import { useState, useMemo, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageLightbox from '../../components/ImageLightbox';

interface GalleryImage {
  id: string;
  title: string;
  author: string;
  year: number;
  coverArtist?: string;
  imageUrl: string;
  commentary: string;
  gutenbergId?: string;
  gutenbergUrl?: string;
  inFreeLibrary: boolean;
  decade: string;
  themes: string[];
  amazonUrl?: string;
}

interface Gallery {
  slug: string;
  title: string;
  description: string;
  category: string;
  images: GalleryImage[];
}

// Sample gallery data - in production this would come from Sanity CMS
const galleries: Record<string, Gallery> = {
  // DECADE GALLERIES
  'victorian-pioneers': {
    slug: 'victorian-pioneers',
    title: 'Victorian Era: The Pioneers (1860s-1890s)',
    description: 'Before "science fiction" had a name, visionaries like Jules Verne and H.G. Wells imagined futures of technological wonder. Victorian cover art combined adventure and scientific speculation in gorgeously illustrated editions. These pioneers created the foundation of everything that followed.',
    category: 'Decade',
    images: [
      {
        id: 'frankenstein',
        title: 'Frankenstein',
        author: 'Mary Shelley',
        year: 1818,
        imageUrl: '/covers/frankenstein.jpg',
        commentary: 'The original science fiction novel. Shelley\'s tragic monster asks what we owe our creations—a question still haunting us 200+ years later.',
        gutenbergId: '84',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/84',
        inFreeLibrary: true,
        decade: '1810s',
        themes: ['Mad Scientists'],
      },
      {
        id: 'from-earth-moon',
        title: 'From the Earth to the Moon',
        author: 'Jules Verne',
        year: 1865,
        imageUrl: '/covers/from-earth-moon.jpg',
        commentary: 'Verne dreamed of space travel a century early. His cannon-launch is absurd science but magnificent imagination.',
        gutenbergId: '83',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/83',
        inFreeLibrary: true,
        decade: '1860s',
        themes: ['Space Adventures'],
      },
      {
        id: 'journey-center-earth',
        title: 'Journey to the Center of the Earth',
        author: 'Jules Verne',
        year: 1864,
        imageUrl: '/covers/journey-center-earth.jpg',
        commentary: 'Verne\'s subterranean adventure. The explorers\' descent into the impossible captures Victorian fascination with Earth\'s mysteries.',
        gutenbergId: '18857',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/18857',
        inFreeLibrary: true,
        decade: '1860s',
        themes: ['Lost Worlds'],
      },
      {
        id: 'twenty-thousand-leagues',
        title: 'Twenty Thousand Leagues Under the Sea',
        author: 'Jules Verne',
        year: 1870,
        imageUrl: '/covers/twenty-thousand-leagues.jpg',
        commentary: 'Captain Nemo\'s Nautilus. Verne envisioned submarines before they dominated warfare—technological prophecy wrapped in adventure.',
        gutenbergId: '164',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/164',
        inFreeLibrary: true,
        decade: '1870s',
        themes: ['Lost Worlds', 'Space Adventures'],
      },
      {
        id: 'flatland',
        title: 'Flatland',
        author: 'Edwin Abbott Abbott',
        year: 1884,
        imageUrl: '/covers/flatland.jpg',
        commentary: 'A square in a 2D world encounters the third dimension. Mathematical fable meets Victorian social satire.',
        gutenbergId: '201',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/201',
        inFreeLibrary: true,
        decade: '1880s',
        themes: ['Space Adventures'],
      },
      {
        id: 'jekyll-hyde',
        title: 'The Strange Case of Dr Jekyll and Mr Hyde',
        author: 'Robert Louis Stevenson',
        year: 1886,
        imageUrl: '/covers/jekyll-hyde.jpg',
        commentary: 'Stevenson\'s dark exploration of duality. A scientist\'s experiment unleashes evil—proto-science fiction horror.',
        gutenbergId: '43',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/43',
        inFreeLibrary: true,
        decade: '1880s',
        themes: ['Mad Scientists'],
      },
      {
        id: 'looking-backward',
        title: 'Looking Backward: 2000-1887',
        author: 'Edward Bellamy',
        year: 1888,
        imageUrl: '/covers/looking-backward.jpg',
        commentary: 'A man from 1887 wakes in year 2000\'s socialist utopia. Fascinating time capsule of 19th-century futurism.',
        gutenbergId: '624',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/624',
        inFreeLibrary: true,
        decade: '1880s',
        themes: ['Dystopian'],
      },
      {
        id: 'connecticut-yankee',
        title: 'A Connecticut Yankee in King Arthur\'s Court',
        author: 'Mark Twain',
        year: 1889,
        imageUrl: '/covers/connecticut-yankee.jpg',
        commentary: 'Twain sends a 19th-century engineer back to Camelot. Funny, sharp social satire disguised as time travel.',
        gutenbergId: '86',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/86',
        inFreeLibrary: true,
        decade: '1880s',
        themes: ['Time Travel'],
      },
      {
        id: 'time-machine',
        title: 'The Time Machine',
        author: 'H.G. Wells',
        year: 1895,
        imageUrl: '/covers/time-machine.jpg',
        commentary: 'Wells invented time travel with this masterpiece. His vision of humanity\'s far future remains haunting.',
        gutenbergId: '35',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/35',
        inFreeLibrary: true,
        decade: '1890s',
        themes: ['Time Travel'],
      },
      {
        id: 'island-moreau',
        title: 'The Island of Doctor Moreau',
        author: 'H.G. Wells',
        year: 1896,
        imageUrl: '/covers/island-moreau.jpg',
        commentary: 'Wells\' darkest novel. Moreau\'s human-animal hybrids ask uncomfortable questions about bioethics that remain relevant today.',
        gutenbergId: '159',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/159',
        inFreeLibrary: true,
        decade: '1890s',
        themes: ['Mad Scientists'],
      },
      {
        id: 'invisible-man',
        title: 'The Invisible Man',
        author: 'H.G. Wells',
        year: 1897,
        imageUrl: '/covers/invisible-man.jpg',
        commentary: 'Invisibility as curse. Wells shows how power without accountability corrupts absolutely.',
        gutenbergId: '5230',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/5230',
        inFreeLibrary: true,
        decade: '1890s',
        themes: ['Mad Scientists'],
      },
      {
        id: 'war-worlds',
        title: 'The War of the Worlds',
        author: 'H.G. Wells',
        year: 1898,
        imageUrl: '/covers/war-of-worlds.jpg',
        commentary: 'Wells\' iconic Martian invasion. The tripod design became the definitive image of hostile aliens.',
        gutenbergId: '36',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/36',
        inFreeLibrary: true,
        decade: '1890s',
        themes: ['Alien Encounters'],
      },
    ],
  },
  '1920s-pulp-era': {
    slug: '1920s-pulp-era',
    title: '1920s-1930s: The Pulp Era Begins',
    description: 'The pulp magazine revolution! Amazing Stories, Astounding, and others brought lurid, colorful covers to newsstands. Bug-eyed monsters, ray guns, and damsels in distress defined the era. This is where sci-fi became its own genre, complete with dedicated magazines and passionate fans.',
    category: 'Decade',
    images: [
      {
        id: 'skylark-space',
        title: 'The Skylark of Space',
        author: 'E.E. "Doc" Smith',
        year: 1928,
        imageUrl: '/covers/skylark-space.jpg',
        commentary: 'Doc Smith invents space opera. Historic if rough around the edges—this is where it all began.',
        gutenbergId: '20869',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/20869',
        inFreeLibrary: true,
        decade: '1920s',
        themes: ['Space Adventures'],
      },
      {
        id: 'princess-mars',
        title: 'A Princess of Mars',
        author: 'Edgar Rice Burroughs',
        year: 1912,
        imageUrl: '/covers/princess-mars.jpg',
        commentary: 'John Carter on Barsoom. Planetary romance perfection that influenced everything from Star Wars to Avatar.',
        gutenbergId: '62',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/62',
        inFreeLibrary: true,
        decade: '1910s',
        themes: ['Space Adventures', 'Lost Worlds'],
      },
      {
        id: 'gods-mars',
        title: 'The Gods of Mars',
        author: 'Edgar Rice Burroughs',
        year: 1913,
        imageUrl: '/covers/gods-mars.jpg',
        commentary: 'Carter returns to Mars. Burroughs at his swashbuckling best—pure pulp adventure.',
        gutenbergId: '64',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/64',
        inFreeLibrary: true,
        decade: '1910s',
        themes: ['Space Adventures'],
      },
      {
        id: 'warlord-mars',
        title: 'The Warlord of Mars',
        author: 'Edgar Rice Burroughs',
        year: 1914,
        imageUrl: '/covers/warlord-mars.jpg',
        commentary: 'Thrilling conclusion to the first Mars trilogy. Peak planetary romance.',
        gutenbergId: '68',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/68',
        inFreeLibrary: true,
        decade: '1910s',
        themes: ['Space Adventures'],
      },
      {
        id: 'at-earths-core',
        title: 'At the Earth\'s Core',
        author: 'Edgar Rice Burroughs',
        year: 1914,
        imageUrl: '/covers/earths-core.jpg',
        commentary: 'Hollow Earth meets lost civilization. Burroughs\' wonderfully absurd Pellucidar adventure.',
        gutenbergId: '123',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/123',
        inFreeLibrary: true,
        decade: '1910s',
        themes: ['Lost Worlds'],
      },
      {
        id: 'moon-pool',
        title: 'The Moon Pool',
        author: 'A. Merritt',
        year: 1919,
        imageUrl: '/covers/moon-pool.jpg',
        commentary: 'Merritt\'s lush prose describes an ancient race beneath the Pacific. Dreamlike and mesmerizing.',
        gutenbergId: '23735',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/23735',
        inFreeLibrary: true,
        decade: '1910s',
        themes: ['Lost Worlds'],
      },
      {
        id: 'metal-monster',
        title: 'The Metal Monster',
        author: 'A. Merritt',
        year: 1920,
        imageUrl: '/covers/metal-monster.jpg',
        commentary: 'Living metal entities in hidden Asia. Merritt\'s strangest and most imaginative tale.',
        gutenbergId: '59236',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/59236',
        inFreeLibrary: true,
        decade: '1920s',
        themes: ['Alien Encounters'],
      },
      {
        id: 'lost-world',
        title: 'The Lost World',
        author: 'Arthur Conan Doyle',
        year: 1912,
        imageUrl: '/covers/lost-world.jpg',
        commentary: 'Professor Challenger finds dinosaurs. The grandfather of every "lost dinosaur" story.',
        gutenbergId: '139',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/139',
        inFreeLibrary: true,
        decade: '1910s',
        themes: ['Lost Worlds'],
      },
    ],
  },
  '1950s-space-opera': {
    slug: '1950s-space-opera',
    title: '1950s: Space Age Dreams',
    description: 'Chrome rockets, ray guns, and atomic optimism! The 1950s was sci-fi\'s most iconic decade. As the Space Race began, artists imagined sleek futures where humanity conquered the stars. This is the aesthetic most people think of when they hear "retro sci-fi." From Richard Powers\' abstract biomorphic art to Ed Emshwiller\'s dynamic compositions, this decade defined the visual language of tomorrow.',
    category: 'Decade',
    images: [
      {
        id: 'skylark-space',
        title: 'The Skylark of Space',
        author: 'E.E. "Doc" Smith',
        year: 1928,
        imageUrl: 'https://www.gutenberg.org/cache/epub/20869/pg20869.cover.medium.jpg',
        commentary: 'Doc Smith invents space opera with this gleaming rocket design. The chrome aesthetic and streamlined form capture the pre-war optimism about space travel.',
        gutenbergId: '20869',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/20869',
        inFreeLibrary: true,
        decade: '1920s',
        themes: ['Space Adventures'],
      },
      {
        id: 'first-men-moon',
        title: 'The First Men in the Moon',
        author: 'H.G. Wells',
        year: 1901,
        imageUrl: 'https://www.gutenberg.org/cache/epub/1013/pg1013.cover.medium.jpg',
        commentary: 'Wells\' lunar adventure features this striking vintage cover. The mysterious sphere speaks to the unknown wonders waiting on Earth\'s nearest neighbor.',
        gutenbergId: '1013',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/1013',
        inFreeLibrary: true,
        decade: '1900s',
        themes: ['Space Adventures', 'Alien Encounters'],
      },
      {
        id: 'from-earth-moon',
        title: 'From the Earth to the Moon',
        author: 'Jules Verne',
        year: 1865,
        imageUrl: 'https://www.gutenberg.org/cache/epub/83/pg83.cover.medium.jpg',
        commentary: 'Verne\'s visionary tale of lunar travel. This edition\'s cover shows the audacious cannon-based launch—absurd science, but magnificent imagination.',
        gutenbergId: '83',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/83',
        inFreeLibrary: true,
        decade: '1860s',
        themes: ['Space Adventures'],
      },
      {
        id: 'princess-mars',
        title: 'A Princess of Mars',
        author: 'Edgar Rice Burroughs',
        year: 1912,
        imageUrl: 'https://www.gutenberg.org/cache/epub/62/pg62.cover.medium.jpg',
        commentary: 'Burroughs takes us to Mars with John Carter. This cover hints at the exotic alien worlds and swashbuckling adventure that defined planetary romance.',
        gutenbergId: '62',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/62',
        inFreeLibrary: true,
        decade: '1910s',
        themes: ['Space Adventures', 'Lost Worlds'],
      },
      {
        id: 'war-worlds',
        title: 'The War of the Worlds',
        author: 'H.G. Wells',
        year: 1898,
        imageUrl: 'https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg',
        commentary: 'Wells\' iconic Martian invasion. The menacing tripod design became the definitive image of hostile aliens—still haunting over a century later.',
        gutenbergId: '36',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/36',
        inFreeLibrary: true,
        decade: '1890s',
        themes: ['Alien Encounters'],
      },
      {
        id: 'time-machine',
        title: 'The Time Machine',
        author: 'H.G. Wells',
        year: 1895,
        imageUrl: 'https://www.gutenberg.org/cache/epub/35/pg35.cover.medium.jpg',
        commentary: 'Wells invented time travel with this masterpiece. The vintage cover evokes the mystery of traveling to humanity\'s distant future.',
        gutenbergId: '35',
        gutenbergUrl: 'https://www.gutenberg.org/ebooks/35',
        inFreeLibrary: true,
        decade: '1890s',
        themes: ['Time Travel'],
      },
    ],
  },
};

export default function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const gallery = galleries[slug];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filterFree, setFilterFree] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'year' | 'title'>('featured');

  if (!gallery) {
    notFound();
  }

  // Filter images
  let filteredImages = gallery.images;
  if (filterFree) {
    filteredImages = filteredImages.filter(img => img.inFreeLibrary || img.gutenbergId);
  }

  // Sort images
  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return a.year - b.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0; // Featured order (original order)
    }
  });

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-[#ff6b35] hover:text-[#e63946] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Home
          </Link>
          <span className="text-[#c9d1d9] mx-2">/</span>
          <Link
            href="/galleries"
            className="text-[#ff6b35] hover:text-[#e63946] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Galleries
          </Link>
          <span className="text-[#c9d1d9] mx-2">/</span>
          <span className="text-[#c9d1d9]" style={{ fontFamily: 'var(--font-inter)' }}>
            {gallery.title}
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl sm:text-5xl font-normal mb-6 text-[#ff6b35] glow-orange"
            style={{ fontFamily: 'var(--font-audiowide)', wordBreak: 'normal' }}
          >
            {gallery.title.toUpperCase()}
          </h1>
          <p
            className="text-lg text-[#c9d1d9] mb-8 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            {gallery.description}
          </p>

          {/* Filter and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-[#c9d1d9] cursor-pointer" style={{ fontFamily: 'var(--font-inter)' }}>
                <input
                  type="checkbox"
                  checked={filterFree}
                  onChange={(e) => setFilterFree(e.target.checked)}
                  className="w-5 h-5 accent-[#2ec4b6]"
                />
                Available to Read Free
              </label>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'year' | 'title')}
              className="px-4 py-2 bg-[#1a2332] border-2 border-[#2ec4b6] text-[#2ec4b6] rounded-md font-medium transition-all duration-300 hover:bg-[#2ec4b6] hover:text-[#1a2332] cursor-pointer"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <option value="featured">Sort: Featured</option>
              <option value="year">Sort: Year</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>

          <p className="text-[#c9d1d9]/60 text-sm mt-4" style={{ fontFamily: 'var(--font-inter)' }}>
            Showing {sortedImages.length} of {gallery.images.length} covers
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-16">
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImageIndex(filteredImages.indexOf(image))}
            >
              <div className="aspect-[2/3] bg-white border border-[#c9d1d9]/20 rounded-lg overflow-hidden hover:border-[#ff6b35] transition-all duration-300 hover:shadow-lg hover:scale-105 relative">
                {/* Actual image */}
                <img
                  src={image.imageUrl}
                  alt={`Cover art for ${image.title} by ${image.author} (${image.year})`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Free badge */}
              {image.inFreeLibrary && (
                <div className="absolute top-2 right-2 bg-[#2ec4b6] text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  READ FREE
                </div>
              )}

              {/* Hover overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
                    {image.title}
                  </p>
                  <p className="text-white/80 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                    {image.author} ({image.year})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Gutenberg Attribution */}
        <section className="text-center py-12 bg-[#1a2332] rounded-lg border-2 border-[#c9d1d9]/30 mb-8">
          <h3
            className="text-2xl font-normal mb-4 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            COURTESY OF PROJECT GUTENBERG
          </h3>
          <p
            className="text-[#c9d1d9] mb-4 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            All cover art courtesy of{' '}
            <a
              href="https://www.gutenberg.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6b35] hover:text-[#e63946] transition-colors font-semibold"
            >
              Project Gutenberg
            </a>
            .
          </p>
          <p
            className="text-[#c9d1d9]/80 text-sm max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            These images are in the public domain in the United States.
          </p>
        </section>

        {/* Free Library CTA */}
        <section className="text-center py-12 bg-gradient-to-br from-[#ff6b35]/20 via-transparent to-[#2ec4b6]/20 rounded-lg border-2 border-[#2ec4b6]/30">
          <h3
            className="text-2xl font-normal mb-4 text-[#2ec4b6] glow-cyan"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            LOVE THESE COVERS? READ THE BOOKS FREE!
          </h3>
          <p
            className="text-[#c9d1d9] mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            Many of these books are available in our Free Library, ready to download in multiple formats.
          </p>
          <Link
            href="/free-library"
            className="inline-block px-8 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Browse Free Library
          </Link>
        </section>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <ImageLightbox
          images={sortedImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={(newIndex) => setSelectedImageIndex(newIndex)}
        />
      )}
    </div>
  );
}
