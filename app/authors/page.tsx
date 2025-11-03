'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { authors } from './authorsData';

export default function AuthorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  // Get unique values for filters
  const eras = useMemo(() => {
    const allEras = authors.flatMap(author => author.era);
    const uniqueEras = Array.from(new Set(allEras)).sort();
    return ['all', ...uniqueEras];
  }, []);

  const genres = useMemo(() => {
    const allGenres = authors.flatMap(author => author.genres);
    const uniqueGenres = Array.from(new Set(allGenres)).sort();
    return ['all', ...uniqueGenres];
  }, []);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filter authors
  const filteredAuthors = useMemo(() => {
    return authors.filter(author => {
      const matchesSearch = searchQuery === '' ||
        author.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEra = selectedEra === 'all' || author.era.includes(selectedEra);
      const matchesGenre = selectedGenre === 'all' || author.genres.includes(selectedGenre);
      const matchesLetter = selectedLetter === 'all' || author.commonName.charAt(0).toUpperCase() === selectedLetter;

      return matchesSearch && matchesEra && matchesGenre && matchesLetter;
    }).sort((a, b) => a.commonName.localeCompare(b.commonName));
  }, [searchQuery, selectedEra, selectedGenre, selectedLetter]);

  // Featured authors for hero section
  const featuredAuthors = authors.filter(author => author.featured).slice(0, 4);

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl font-normal mb-6 text-[#ff6b35] glow-orange"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            VINTAGE SCI-FI AUTHORS
          </h1>
          <p
            className="text-xl text-[#c9d1d9] mb-8 max-w-4xl mx-auto leading-relaxed"
           
          >
            Explore the visionaries who shaped science fiction's golden age. From Jules Verne to Ursula K. Le Guin, discover the authors who imagined our future.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search authors by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-[#1a2332] border-2 border-[#2ec4b6] text-[#c9d1d9] rounded-md text-lg focus:outline-none focus:border-[#ff6b35] transition-colors"
               
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#2ec4b6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Era Filter */}
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="px-6 py-3 bg-[#1a2332] border-2 border-[#2ec4b6] text-[#2ec4b6] rounded-md font-medium transition-all duration-300 hover:bg-[#2ec4b6] hover:text-[#1a2332] cursor-pointer"
             
            >
              <option value="all">All Eras</option>
              {eras.filter(e => e !== 'all').map(era => (
                <option key={era} value={era}>{era}</option>
              ))}
            </select>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-6 py-3 bg-[#1a2332] border-2 border-[#2ec4b6] text-[#2ec4b6] rounded-md font-medium transition-all duration-300 hover:bg-[#2ec4b6] hover:text-[#1a2332] cursor-pointer"
             
            >
              <option value="all">All Genres</option>
              {genres.filter(g => g !== 'all').map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* A-Z Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => setSelectedLetter('all')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                selectedLetter === 'all'
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-[#1a2332] text-[#2ec4b6] hover:bg-[#2ec4b6] hover:text-[#1a2332]'
              }`}
             
            >
              All
            </button>
            {letters.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  selectedLetter === letter
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-[#1a2332] text-[#2ec4b6] hover:bg-[#2ec4b6] hover:text-[#1a2332]'
                }`}
               
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Result Count */}
          <p className="text-[#c9d1d9]/70 text-sm">
            Showing {filteredAuthors.length} of {authors.length} authors
          </p>
        </div>

        {/* Featured Authors Section */}
        {searchQuery === '' && selectedEra === 'all' && selectedGenre === 'all' && selectedLetter === 'all' && (
          <div className="mb-16">
            <h2
              className="text-3xl font-normal mb-8 text-center text-[#2ec4b6]"
              style={{ fontFamily: 'var(--font-audiowide)' }}
            >
              FEATURED AUTHORS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAuthors.map(author => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="bg-white border-2 border-[#c9d1d9]/20 rounded-lg p-6 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1a2332] to-[#2a3a4a] flex items-center justify-center">
                    <span className="text-4xl text-[#2ec4b6]" style={{ fontFamily: 'var(--font-audiowide)' }}>
                      {author.commonName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-1 text-[#1a2332]"
                   
                  >
                    {author.commonName}
                  </h3>
                  <p className="text-sm text-[#1a2332]/60 mb-2">
                    {author.birthYear}–{author.deathYear || 'Present'}
                  </p>
                  <p className="text-xs text-[#ff6b35] mb-3 font-medium" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                    {author.tagline}
                  </p>
                  <p className="text-sm text-[#1a2332]/70 mb-3 line-clamp-3">
                    {author.biographyExcerpt}
                  </p>
                  <p className="text-xs text-[#2ec4b6] font-semibold">
                    {author.workCount}+ works
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Authors Grid */}
        <div className="mb-12">
          <h2
            className="text-3xl font-normal mb-8 text-center text-[#2ec4b6]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            {searchQuery || selectedEra !== 'all' || selectedGenre !== 'all' || selectedLetter !== 'all'
              ? 'SEARCH RESULTS'
              : 'ALL AUTHORS'}
          </h2>

          {filteredAuthors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-[#c9d1d9]">
                No authors found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedEra('all');
                  setSelectedGenre('all');
                  setSelectedLetter('all');
                }}
                className="mt-6 px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-colors"
               
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuthors.map(author => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="bg-white border border-[#c9d1d9]/20 rounded-lg p-6 hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 flex-shrink-0 rounded-full bg-gradient-to-br from-[#1a2332] to-[#2a3a4a] flex items-center justify-center">
                      <span className="text-2xl text-[#2ec4b6]" style={{ fontFamily: 'var(--font-audiowide)' }}>
                        {author.commonName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg font-semibold mb-1 text-[#1a2332]"
                       
                      >
                        {author.commonName}
                      </h3>
                      <p className="text-xs text-[#1a2332]/60 mb-1">
                        {author.birthYear}–{author.deathYear || 'Present'} • {author.nationality}
                      </p>
                      <p className="text-xs text-[#ff6b35] mb-2 font-medium" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                        {author.tagline}
                      </p>
                      <p className="text-sm text-[#1a2332]/70 line-clamp-2 mb-2">
                        {author.biographyExcerpt}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {author.genres.slice(0, 3).map(genre => (
                          <span
                            key={genre}
                            className="text-xs px-2 py-1 bg-[#2ec4b6]/10 text-[#2ec4b6] rounded"
                           
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Browse by Era Section */}
        <section className="py-12 bg-[#1a2332] rounded-lg border-2 border-[#c9d1d9]/30">
          <h3
            className="text-2xl font-normal mb-6 text-[#ff6b35] text-center"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            BROWSE BY ERA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
            {eras.filter(e => e !== 'all').map(era => {
              const eraAuthors = authors.filter(a => a.era.includes(era));
              return (
                <button
                  key={era}
                  onClick={() => {
                    setSelectedEra(era);
                    setSelectedGenre('all');
                    setSelectedLetter('all');
                    setSearchQuery('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left p-4 bg-[#0d1117] rounded-lg border border-[#2ec4b6]/30 hover:border-[#2ec4b6] transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-[#2ec4b6] mb-2">
                    {era}
                  </h4>
                  <p className="text-sm text-[#c9d1d9]/70 mb-2">
                    {eraAuthors.length} {eraAuthors.length === 1 ? 'author' : 'authors'}
                  </p>
                  <p className="text-xs text-[#c9d1d9]/50">
                    {eraAuthors.slice(0, 3).map(a => a.commonName).join(', ')}
                    {eraAuthors.length > 3 && '...'}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
