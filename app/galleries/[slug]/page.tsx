'use client';

import { useState } from 'react';
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
  '1950s-space-opera': {
    slug: '1950s-space-opera',
    title: 'Pulp Dreams: 1950s Space Opera Cover Art',
    description: 'When rockets were chrome and heroes were square-jawed, 1950s cover artists imagined futures of endless adventure. These covers captured an era\'s unbridled optimism about humanity among the stars—before the Cold War turned space dreams darker.',
    category: 'Era',
    images: [
      {
        id: 'skylark-space',
        title: 'The Skylark of Space',
        author: 'E.E. "Doc" Smith',
        year: 1928,
        imageUrl: 'https://via.placeholder.com/400x600/ff6b35/ffffff?text=Skylark+of+Space',
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
        imageUrl: 'https://via.placeholder.com/400x600/2ec4b6/ffffff?text=First+Men+in+Moon',
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
        imageUrl: 'https://via.placeholder.com/400x600/ffbe0b/000000?text=From+Earth+to+Moon',
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
        imageUrl: 'https://via.placeholder.com/400x600/e63946/ffffff?text=Princess+of+Mars',
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
        imageUrl: 'https://via.placeholder.com/400x600/1a2332/00d9ff?text=War+of+Worlds',
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
        imageUrl: 'https://via.placeholder.com/400x600/2a1f3e/ffbe0b?text=Time+Machine',
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

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const gallery = galleries[params.slug];
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

          <p className="text-[#c9d1d9]/70 text-sm mt-4" style={{ fontFamily: 'var(--font-inter)' }}>
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
              <div className="aspect-[2/3] bg-gradient-to-br from-[#ff6b35]/20 to-[#2ec4b6]/20 border border-[#c9d1d9]/20 rounded-lg overflow-hidden hover:border-[#ff6b35] transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col items-center justify-center p-4 text-center">
                <img
                  src={image.imageUrl}
                  alt={`Cover art for ${image.title} by ${image.author} (${image.year})`}
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                  onError={(e) => {
                    // Hide broken image and show fallback
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback content */}
                <div className="relative z-10 pointer-events-none">
                  <svg className="w-16 h-16 text-[#1a2332]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <p className="text-xs font-bold text-[#1a2332]/80 mb-1" style={{ fontFamily: 'var(--font-audiowide)' }}>
                    {image.title}
                  </p>
                  <p className="text-xs text-[#1a2332]/60" style={{ fontFamily: 'var(--font-inter)' }}>
                    {image.author}
                  </p>
                  <p className="text-xs text-[#ff6b35] mt-2 font-medium" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                    {image.year}
                  </p>
                </div>
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
