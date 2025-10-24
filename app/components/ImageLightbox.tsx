'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const image = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const readFreeUrl = image.inFreeLibrary
    ? `/free-library#${image.id}`
    : image.gutenbergUrl || `https://www.gutenberg.org/ebooks/${image.gutenbergId}`;

  const readFreeText = image.inFreeLibrary
    ? 'Read Free (Our Library)'
    : 'Read Free (Gutenberg)';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1a2332] opacity-95"></div>

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="bg-[#1a2332] flex items-center justify-center p-8">
              <img
                src={image.imageUrl}
                alt={`Cover art for ${image.title} by ${image.author} (${image.year})`}
                className="max-w-full max-h-[600px] object-contain rounded shadow-lg"
              />
            </div>

            {/* Details */}
            <div className="p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#1a2332] hover:text-[#ff6b35] transition-colors"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Book info */}
              <h2
                className="text-3xl font-normal mb-2 text-[#1a2332] pr-12"
                style={{ fontFamily: 'var(--font-audiowide)' }}
              >
                {image.title}
              </h2>

              <p
                className="text-lg text-[#1a2332]/70 mb-1"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                by {image.author}
              </p>

              <p
                className="text-sm text-[#ff6b35] mb-4 uppercase tracking-wide font-medium"
                style={{ fontFamily: 'var(--font-courier-prime)' }}
              >
                {image.year} {image.coverArtist && `• Art by ${image.coverArtist}`}
              </p>

              {/* Commentary */}
              <p
                className="text-base text-[#1a2332]/80 mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {image.commentary}
              </p>

              {/* Themes */}
              <div className="flex flex-wrap gap-2 mb-6">
                {image.themes.map((theme) => (
                  <span
                    key={theme}
                    className="text-xs font-semibold text-[#2ec4b6] px-3 py-1 bg-[#2ec4b6]/10 border border-[#2ec4b6]/30 rounded uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <a
                  href={readFreeUrl}
                  target={image.inFreeLibrary ? '_self' : '_blank'}
                  rel={image.inFreeLibrary ? '' : 'noopener noreferrer'}
                  className="px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {readFreeText}
                </a>

                {image.amazonUrl && (
                  <a
                    href={image.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#ff6b35] text-white font-semibold rounded-md hover:bg-[#e63946] transition-all duration-300 text-center shadow-lg hover:shadow-xl"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Buy Print Edition
                  </a>
                )}
              </div>

              {/* Attribution */}
              <p className="text-xs text-[#1a2332]/50 mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                Image courtesy of{' '}
                <a
                  href="https://www.gutenberg.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff6b35] hover:underline"
                >
                  Project Gutenberg
                </a>
              </p>

              {/* Social Share Buttons */}
              <div className="border-t border-[#c9d1d9]/20 pt-6">
                <p className="text-sm text-[#1a2332]/70 mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                  Share this cover:
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const text = `Check out this vintage sci-fi cover: ${image.title} by ${image.author}`;
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="px-4 py-2 bg-[#1da1f2] text-white rounded hover:bg-[#1da1f2]/90 transition-colors text-sm font-medium"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                    }}
                    className="px-4 py-2 bg-[#4267B2] text-white rounded hover:bg-[#4267B2]/90 transition-colors text-sm font-medium"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const description = `${image.title} by ${image.author} - ${image.commentary}`;
                      window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image.imageUrl)}&description=${encodeURIComponent(description)}`, '_blank');
                    }}
                    className="px-4 py-2 bg-[#E60023] text-white rounded hover:bg-[#E60023]/90 transition-colors text-sm font-medium"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Pinterest
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between items-center p-6 bg-[#f8f3e6] border-t border-[#c9d1d9]/20">
            <button
              onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#ff6b35]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <span className="text-[#1a2332]/70" style={{ fontFamily: 'var(--font-inter)' }}>
              {currentIndex + 1} of {images.length}
            </span>

            <button
              onClick={() => currentIndex < images.length - 1 && onNavigate(currentIndex + 1)}
              disabled={currentIndex === images.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#ff6b35]"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
