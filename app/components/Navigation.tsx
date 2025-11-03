'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function Navigation() {
  const [decadesOpen, setDecadesOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const libraryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const decades = [
    { slug: '1930s-1940s', name: '1930s-1940s (Golden Age)' },
    { slug: '1950s', name: '1950s (Space Age)' },
    { slug: '1960s', name: '1960s (New Wave)' },
    { slug: '1970s', name: '1970s (Experimental Era)' },
  ];

  const libraryLinks = [
    { href: '/free-library', name: 'Ebook Library', icon: '📖' },
    { href: '/audiobook-library', name: 'Audiobook Library', icon: '🎧' },
  ];

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDecadesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDecadesOpen(false);
    }, 300); // 300ms delay before closing
  };

  const handleLibraryMouseEnter = () => {
    if (libraryTimeoutRef.current) {
      clearTimeout(libraryTimeoutRef.current);
      libraryTimeoutRef.current = null;
    }
    setLibraryOpen(true);
  };

  const handleLibraryMouseLeave = () => {
    libraryTimeoutRef.current = setTimeout(() => {
      setLibraryOpen(false);
    }, 300); // 300ms delay before closing
  };

  return (
    <nav className="bg-[#1a2332] sticky top-0 z-50 border-b border-[#c9d1d9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo-compact.svg"
              alt="SF Supernova"
              width={200}
              height={60}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium text-base"
            >
              Home
            </Link>

            {/* Decades Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 flex items-center font-medium text-base"
                >
                Decades
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {decadesOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-[#1a2332] border border-white/20 rounded-md shadow-lg overflow-hidden animate-[slideDown_0.3s_ease-out]">
                  {decades.map((decade) => (
                    <Link
                      key={decade.slug}
                      href={`/decades/${decade.slug}`}
                      className="block px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#ff6b35]/20 hover:text-[#ff6b35] transition-colors duration-200"
                            >
                      {decade.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/reviews"
              className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium text-base"
            >
              Reviews
            </Link>
            <Link
              href="/audio"
              className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium text-base"
            >
              Audio
            </Link>
            <Link
              href="/galleries"
              className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium text-base"
            >
              Galleries
            </Link>
            <Link
              href="/authors"
              className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium text-base"
            >
              Authors
            </Link>

            {/* Free Library Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleLibraryMouseEnter}
              onMouseLeave={handleLibraryMouseLeave}
            >
              <button
                className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 flex items-center font-medium text-base"
                >
                Free Library
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {libraryOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-[#1a2332] border border-white/20 rounded-md shadow-lg overflow-hidden animate-[slideDown_0.3s_ease-out]">
                  {libraryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#ff6b35]/20 hover:text-[#ff6b35] transition-colors duration-200"
                            >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium text-base"
            >
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#ff6b35] hover:text-[#e63946] transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#c9d1d9]/20 mt-2">
            <Link
              href="/"
              className="block py-3 text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <div className="py-2">
              <button
                onClick={() => setDecadesOpen(!decadesOpen)}
                className="w-full text-left text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 flex items-center justify-between font-medium"
                >
                Decades
                <svg className={`w-4 h-4 transform transition-transform ${decadesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {decadesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {decades.map((decade) => (
                    <Link
                      key={decade.slug}
                      href={`/decades/${decade.slug}`}
                      className="block py-2 text-sm text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200"
                            >
                      {decade.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/reviews"
              className="block py-3 text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium"
            >
              Reviews
            </Link>
            <Link
              href="/audio"
              className="block py-3 text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium"
            >
              Audio
            </Link>
            <Link
              href="/galleries"
              className="block py-3 text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium"
            >
              Galleries
            </Link>
            <Link
              href="/authors"
              className="block py-3 text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium"
            >
              Authors
            </Link>

            {/* Free Library Dropdown - Mobile */}
            <div className="py-2">
              <button
                onClick={() => setLibraryOpen(!libraryOpen)}
                className="w-full text-left text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 flex items-center justify-between font-medium"
                >
                Free Library
                <svg className={`w-4 h-4 transform transition-transform ${libraryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {libraryOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {libraryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-2 text-sm text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200"
                            >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="block py-3 text-[#c9d1d9] hover:text-[#ff6b35] transition-colors duration-200 font-medium"
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
