'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [decadesOpen, setDecadesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const decades = [
    { slug: '1930s-1940s', name: '1930s-1940s (Golden Age)' },
    { slug: '1950s', name: '1950s (Space Age)' },
    { slug: '1960s', name: '1960s (New Wave)' },
    { slug: '1970s', name: '1970s (Experimental Era)' },
  ];

  return (
    <nav className="border-b-2 border-primary/30 bg-background/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary text-glow-strong" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SF SUPERNOVA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors duration-200">
              Home
            </Link>

            {/* Decades Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDecadesOpen(true)}
              onMouseLeave={() => setDecadesOpen(false)}
            >
              <button className="text-foreground hover:text-primary transition-colors duration-200 flex items-center">
                Decades
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {decadesOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-dark-purple/95 backdrop-blur-sm border-2 border-primary/50 rounded shadow-lg neon-border">
                  {decades.map((decade) => (
                    <Link
                      key={decade.slug}
                      href={`/decades/${decade.slug}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                    >
                      {decade.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/reviews" className="text-foreground hover:text-primary transition-colors duration-200">
              Reviews
            </Link>
            <Link href="/audio" className="text-foreground hover:text-primary transition-colors duration-200">
              Audio
            </Link>
            <Link href="/galleries" className="text-foreground hover:text-primary transition-colors duration-200">
              Galleries
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors duration-200">
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/" className="block py-2 text-foreground hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <div className="py-2">
              <button
                onClick={() => setDecadesOpen(!decadesOpen)}
                className="w-full text-left text-foreground hover:text-primary transition-colors duration-200 flex items-center justify-between"
              >
                Decades
                <svg className={`w-4 h-4 transform ${decadesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {decadesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {decades.map((decade) => (
                    <Link
                      key={decade.slug}
                      href={`/decades/${decade.slug}`}
                      className="block py-1 text-sm text-foreground hover:text-primary transition-colors duration-200"
                    >
                      {decade.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/reviews" className="block py-2 text-foreground hover:text-primary transition-colors duration-200">
              Reviews
            </Link>
            <Link href="/audio" className="block py-2 text-foreground hover:text-primary transition-colors duration-200">
              Audio
            </Link>
            <Link href="/galleries" className="block py-2 text-foreground hover:text-primary transition-colors duration-200">
              Galleries
            </Link>
            <Link href="/about" className="block py-2 text-foreground hover:text-primary transition-colors duration-200">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
