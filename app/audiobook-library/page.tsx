'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Audiobook {
  id: string;
  title: string;
  author: string;
  year: number;
  decade: string;
  duration: string;
  durationMinutes: number;
  reader: string;
  themes: string[];
  rating: number;
  recommendation: string;
  librivoxUrl: string;
  coverImage: string;
  ebookId?: string; // Link to ebook library if exists
}

const audiobooks: Audiobook[] = [
  {
    id: "war-of-worlds-audio",
    title: "The War of the Worlds",
    author: "H.G. Wells",
    year: 1898,
    decade: "1890s",
    duration: "6h 30m",
    durationMinutes: 390,
    reader: "Multiple readers available",
    themes: ["Alien Encounters"],
    rating: 5,
    recommendation: "The audiobook brings Wells' Martian invasion to terrifying life. The narrator's measured tone makes the horror even more effective.",
    librivoxUrl: "https://librivox.org/the-war-of-the-worlds-by-hg-wells/",
    coverImage: "/covers/war-of-worlds.jpg",
    ebookId: "war-of-worlds"
  },
  {
    id: "time-machine-audio",
    title: "The Time Machine",
    author: "H.G. Wells",
    year: 1895,
    decade: "1890s",
    duration: "3h 30m",
    durationMinutes: 210,
    reader: "Multiple readers available",
    themes: ["Time Travel"],
    rating: 5,
    recommendation: "A perfect length for a weekend listen. Wells' time traveler's journey to humanity's far future is haunting in audio form.",
    librivoxUrl: "https://librivox.org/the-time-machine-by-h-g-wells/",
    coverImage: "/covers/time-machine.jpg",
    ebookId: "time-machine"
  },
  {
    id: "island-moreau-audio",
    title: "The Island of Doctor Moreau",
    author: "H.G. Wells",
    year: 1896,
    decade: "1890s",
    duration: "4h 45m",
    durationMinutes: 285,
    reader: "Multiple readers available",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "Wells' darkest novel. The horror of Moreau's experiments is even more disturbing when heard rather than read.",
    librivoxUrl: "https://librivox.org/the-island-of-doctor-moreau-by-hg-wells/",
    coverImage: "/covers/island-moreau.jpg",
    ebookId: "island-dr-moreau"
  },
  {
    id: "invisible-man-audio",
    title: "The Invisible Man",
    author: "H.G. Wells",
    year: 1897,
    decade: "1890s",
    duration: "5h 15m",
    durationMinutes: 315,
    reader: "Multiple readers available",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "Griffin's descent into madness plays perfectly in audio. A thriller that keeps you listening.",
    librivoxUrl: "https://librivox.org/the-invisible-man-by-hg-wells/",
    coverImage: "/covers/invisible-man.jpg",
    ebookId: "invisible-man"
  },
  {
    id: "first-men-moon-audio",
    title: "The First Men in the Moon",
    author: "H.G. Wells",
    year: 1901,
    decade: "1900s",
    duration: "7h 0m",
    durationMinutes: 420,
    reader: "Multiple readers available",
    themes: ["Space Adventures", "Alien Encounters"],
    rating: 5,
    recommendation: "Wells sends humans to the moon and finds an insect civilization inside. Wonderfully imaginative audio adventure.",
    librivoxUrl: "https://librivox.org/the-first-men-in-the-moon-by-hg-wells/",
    coverImage: "/covers/first-men-moon.jpg",
    ebookId: "first-men-in-moon"
  },
  {
    id: "when-sleeper-wakes-audio",
    title: "When the Sleeper Wakes",
    author: "H.G. Wells",
    year: 1899,
    decade: "1890s",
    duration: "9h 0m",
    durationMinutes: 540,
    reader: "Multiple readers available",
    themes: ["Dystopian"],
    rating: 5,
    recommendation: "A man sleeps 200 years and wakes to dystopia. Wells predicting surveillance society.",
    librivoxUrl: "https://librivox.org/when-the-sleeper-wakes-by-h-g-wells/",
    coverImage: "/covers/sleeper-wakes.jpg"
  },
  {
    id: "food-of-gods-audio",
    title: "The Food of the Gods",
    author: "H.G. Wells",
    year: 1904,
    decade: "1900s",
    duration: "9h 0m",
    durationMinutes: 540,
    reader: "Multiple readers available",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "Food makes everything grow giant. Wells exploring scientific hubris with his usual brilliance.",
    librivoxUrl: "https://librivox.org/the-food-of-the-gods-by-h-g-wells/",
    coverImage: "/covers/food-of-gods.jpg"
  },
  {
    id: "in-days-comet-audio",
    title: "In the Days of the Comet",
    author: "H.G. Wells",
    year: 1906,
    decade: "1900s",
    duration: "7h 15m",
    durationMinutes: 435,
    reader: "Multiple readers available",
    themes: ["Dystopian"],
    rating: 4,
    recommendation: "A comet transforms humanity into peaceful, rational beings. Utopian Wells asking big questions.",
    librivoxUrl: "https://librivox.org/in-the-days-of-the-comet-by-h-g-wells/",
    coverImage: "/covers/days-comet.jpg"
  },
  {
    id: "twenty-thousand-leagues-audio",
    title: "Twenty Thousand Leagues Under the Sea",
    author: "Jules Verne",
    year: 1870,
    decade: "1870s",
    duration: "12h 30m",
    durationMinutes: 750,
    reader: "Multiple readers available",
    themes: ["Lost Worlds", "Space Adventures"],
    rating: 5,
    recommendation: "Captain Nemo's underwater odyssey is epic in scope. Perfect for long commutes or road trips.",
    librivoxUrl: "https://librivox.org/twenty-thousand-leagues-under-the-sea-by-jules-verne/",
    coverImage: "/covers/twenty-thousand-leagues.jpg",
    ebookId: "twenty-thousand-leagues"
  },
  {
    id: "journey-center-earth-audio",
    title: "Journey to the Center of the Earth",
    author: "Jules Verne",
    year: 1864,
    decade: "1860s",
    duration: "7h 0m",
    durationMinutes: 420,
    reader: "Multiple readers available",
    themes: ["Lost Worlds"],
    rating: 5,
    recommendation: "Verne's subterranean adventure comes alive in audio. The explorers' descent into the impossible is thrilling.",
    librivoxUrl: "https://librivox.org/journey-to-the-center-of-the-earth-by-jules-verne/",
    coverImage: "/covers/journey-center-earth.jpg",
    ebookId: "journey-center-earth"
  },
  {
    id: "from-earth-moon-audio",
    title: "From the Earth to the Moon",
    author: "Jules Verne",
    year: 1865,
    decade: "1860s",
    duration: "5h 30m",
    durationMinutes: 330,
    reader: "Multiple readers available",
    themes: ["Space Adventures"],
    rating: 5,
    recommendation: "Verne dreamed of space travel a century early. Hearing this visionary tale reminds you why he's a master.",
    librivoxUrl: "https://librivox.org/from-the-earth-to-the-moon-by-jules-verne/",
    coverImage: "/covers/from-earth-moon.jpg",
    ebookId: "from-earth-moon"
  },
  {
    id: "around-world-eighty-days-audio",
    title: "Around the World in Eighty Days",
    author: "Jules Verne",
    year: 1872,
    decade: "1870s",
    duration: "7h 30m",
    durationMinutes: 450,
    reader: "Multiple readers available",
    themes: ["Space Adventures"],
    rating: 5,
    recommendation: "Not pure sci-fi, but Verne's globe-trotting adventure is perfectly paced for audio. Pure entertainment.",
    librivoxUrl: "https://librivox.org/around-the-world-in-eighty-days-by-jules-verne/",
    coverImage: "/covers/around-world.jpg"
  },
  {
    id: "princess-mars-audio",
    title: "A Princess of Mars",
    author: "Edgar Rice Burroughs",
    year: 1912,
    decade: "1910s",
    duration: "7h 45m",
    durationMinutes: 465,
    reader: "Multiple readers available",
    themes: ["Space Adventures", "Lost Worlds"],
    rating: 5,
    recommendation: "John Carter's swashbuckling adventures on Barsoom are pulp perfection in audio. Pure escapist fun.",
    librivoxUrl: "https://librivox.org/a-princess-of-mars-by-edgar-rice-burroughs/",
    coverImage: "/covers/princess-mars.jpg",
    ebookId: "princess-of-mars"
  },
  {
    id: "gods-mars-audio",
    title: "The Gods of Mars",
    author: "Edgar Rice Burroughs",
    year: 1913,
    decade: "1910s",
    duration: "7h 15m",
    durationMinutes: 435,
    reader: "Multiple readers available",
    themes: ["Space Adventures"],
    rating: 5,
    recommendation: "Carter returns to Mars for more action. Great for fans of planetary romance.",
    librivoxUrl: "https://librivox.org/the-gods-of-mars-by-edgar-rice-burroughs/",
    coverImage: "/covers/gods-mars.jpg",
    ebookId: "gods-of-mars"
  },
  {
    id: "warlord-mars-audio",
    title: "The Warlord of Mars",
    author: "Edgar Rice Burroughs",
    year: 1914,
    decade: "1910s",
    duration: "6h 30m",
    durationMinutes: 390,
    reader: "Multiple readers available",
    themes: ["Space Adventures"],
    rating: 5,
    recommendation: "The thrilling conclusion to the first Mars trilogy. Non-stop adventure.",
    librivoxUrl: "https://librivox.org/the-warlord-of-mars-by-edgar-rice-burroughs/",
    coverImage: "/covers/warlord-mars.jpg",
    ebookId: "warlord-of-mars"
  },
  {
    id: "at-earths-core-audio",
    title: "At the Earth's Core",
    author: "Edgar Rice Burroughs",
    year: 1914,
    decade: "1910s",
    duration: "5h 0m",
    durationMinutes: 300,
    reader: "Multiple readers available",
    themes: ["Lost Worlds"],
    rating: 5,
    recommendation: "Burroughs' hollow earth tale is wonderfully absurd. Perfect for listeners who want pure adventure.",
    librivoxUrl: "https://librivox.org/at-the-earths-core-by-edgar-rice-burroughs/",
    coverImage: "/covers/earths-core.jpg",
    ebookId: "at-earths-core"
  },
  {
    id: "frankenstein-audio",
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    decade: "1810s",
    duration: "8h 15m",
    durationMinutes: 495,
    reader: "Multiple readers available",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "The original science fiction novel. Shelley's tragic monster is even more eloquent in audio.",
    librivoxUrl: "https://librivox.org/frankenstein-by-mary-shelley/",
    coverImage: "/covers/frankenstein.jpg",
    ebookId: "frankenstein"
  },
  {
    id: "jekyll-hyde-audio",
    title: "The Strange Case of Dr Jekyll and Mr Hyde",
    author: "Robert Louis Stevenson",
    year: 1886,
    decade: "1880s",
    duration: "2h 30m",
    durationMinutes: 150,
    reader: "Multiple readers available",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "Short and intense. Stevenson's exploration of duality is perfect for an evening listen.",
    librivoxUrl: "https://librivox.org/strange-case-of-dr-jekyll-and-mr-hyde-by-robert-louis-stevenson/",
    coverImage: "/covers/jekyll-hyde.jpg",
    ebookId: "jekyll-hyde"
  },
  {
    id: "flatland-audio",
    title: "Flatland",
    author: "Edwin Abbott Abbott",
    year: 1884,
    decade: "1880s",
    duration: "3h 0m",
    durationMinutes: 180,
    reader: "Multiple readers available",
    themes: ["Space Adventures"],
    rating: 4,
    recommendation: "A square in a 2D world encounters the third dimension. Mathematical fable meets social satire.",
    librivoxUrl: "https://librivox.org/flatland-a-romance-of-many-dimensions-by-edwin-abbott-abbott/",
    coverImage: "/covers/flatland.jpg"
  },
  {
    id: "lost-world-audio",
    title: "The Lost World",
    author: "Arthur Conan Doyle",
    year: 1912,
    decade: "1910s",
    duration: "8h 0m",
    durationMinutes: 480,
    reader: "Multiple readers available",
    themes: ["Lost Worlds"],
    rating: 5,
    recommendation: "Professor Challenger finds dinosaurs in the Amazon. The grandfather of every 'lost dinosaur' story.",
    librivoxUrl: "https://librivox.org/the-lost-world-by-sir-arthur-conan-doyle/",
    coverImage: "/covers/lost-world.jpg"
  },
  {
    id: "connecticut-yankee-audio",
    title: "A Connecticut Yankee in King Arthur's Court",
    author: "Mark Twain",
    year: 1889,
    decade: "1880s",
    duration: "12h 0m",
    durationMinutes: 720,
    reader: "Multiple readers available",
    themes: ["Time Travel"],
    rating: 5,
    recommendation: "Twain sends a 19th-century engineer back to Camelot. Funny, sharp, and surprisingly deep.",
    librivoxUrl: "https://librivox.org/a-connecticut-yankee-in-king-arthur-s-court-by-mark-twain/",
    coverImage: "/covers/connecticut-yankee.jpg"
  },
  {
    id: "moon-pool-audio",
    title: "The Moon Pool",
    author: "A. Merritt",
    year: 1919,
    decade: "1910s",
    duration: "9h 30m",
    durationMinutes: 570,
    reader: "Multiple readers available",
    themes: ["Lost Worlds"],
    rating: 4,
    recommendation: "Merritt's lush prose describes an ancient race beneath the Pacific. Dreamlike and mesmerizing.",
    librivoxUrl: "https://librivox.org/the-moon-pool-by-a-merritt/",
    coverImage: "/covers/moon-pool.jpg"
  },
  {
    id: "metal-monster-audio",
    title: "The Metal Monster",
    author: "A. Merritt",
    year: 1920,
    decade: "1920s",
    duration: "8h 45m",
    durationMinutes: 525,
    reader: "Multiple readers available",
    themes: ["Alien Encounters"],
    rating: 4,
    recommendation: "Living metal entities in hidden Asia. Merritt's strangest and most imaginative tale.",
    librivoxUrl: "https://librivox.org/the-metal-monster-by-a-merritt/",
    coverImage: "/covers/metal-monster.jpg"
  },
  {
    id: "skylark-space-audio",
    title: "The Skylark of Space",
    author: "E.E. 'Doc' Smith",
    year: 1928,
    decade: "1920s",
    duration: "9h 0m",
    durationMinutes: 540,
    reader: "Multiple readers available",
    themes: ["Space Adventures"],
    rating: 4,
    recommendation: "Doc Smith invents space opera. Historic if rough around the edges. Where it all began.",
    librivoxUrl: "https://librivox.org/the-skylark-of-space-by-e-e-smith/",
    coverImage: "/covers/skylark-space.jpg"
  },
  {
    id: "looking-backward-audio",
    title: "Looking Backward: 2000-1887",
    author: "Edward Bellamy",
    year: 1888,
    decade: "1880s",
    duration: "8h 30m",
    durationMinutes: 510,
    reader: "Multiple readers available",
    themes: ["Dystopian"],
    rating: 4,
    recommendation: "A man from 1887 wakes in year 2000's socialist utopia. Fascinating time capsule of 19th-century futurism.",
    librivoxUrl: "https://librivox.org/looking-backward-2000-1887-by-edward-bellamy/",
    coverImage: "/covers/looking-backward.jpg"
  }
];

// Helper function to convert author names to slugs for linking
function getAuthorSlug(authorName: string): string {
  const slugMap: { [key: string]: string } = {
    'Jules Verne': 'jules-verne',
    'H.G. Wells': 'h-g-wells',
    'Edgar Rice Burroughs': 'edgar-rice-burroughs',
    'A. Merritt': 'a-merritt',
    'E.E. \'Doc\' Smith': 'e-e-doc-smith',
    'Edwin Abbott Abbott': 'edwin-a-abbott',
    'Arthur Conan Doyle': 'arthur-conan-doyle',
    'Mary Shelley': 'mary-shelley',
    'Robert Louis Stevenson': 'robert-louis-stevenson',
    'Edward Bellamy': 'edward-bellamy',
    'Mark Twain': 'mark-twain',
  };
  return slugMap[authorName] || authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function AudiobookLibrary() {
  const [decadeFilter, setDecadeFilter] = useState<string>('all');
  const [authorFilter, setAuthorFilter] = useState<string>('all');
  const [lengthFilter, setLengthFilter] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

  // Get unique decades and authors for filters
  const decades = useMemo(() => {
    const uniqueDecades = Array.from(new Set(audiobooks.map(book => book.decade))).sort();
    return uniqueDecades;
  }, []);

  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(audiobooks.map(book => book.author))).sort();
    return uniqueAuthors;
  }, []);

  // Filter audiobooks based on selected filters
  const filteredAudiobooks = useMemo(() => {
    return audiobooks.filter(book => {
      const matchesDecade = decadeFilter === 'all' || book.decade === decadeFilter;
      const matchesAuthor = authorFilter === 'all' || book.author === authorFilter;

      let matchesLength = true;
      if (lengthFilter !== 'all') {
        const duration = book.durationMinutes;
        if (lengthFilter === 'short') matchesLength = duration < 180;
        else if (lengthFilter === 'medium') matchesLength = duration >= 180 && duration < 480;
        else if (lengthFilter === 'long') matchesLength = duration >= 480 && duration < 900;
        else if (lengthFilter === 'epic') matchesLength = duration >= 900;
      }

      return matchesDecade && matchesAuthor && matchesLength;
    });
  }, [decadeFilter, authorFilter, lengthFilter]);

  const toggleDropdown = (bookId: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8f3e6]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1a2332] to-[#2a3a4a] text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <svg className="w-20 h-20 text-[#2ec4b6]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <h1
              className="text-5xl md:text-6xl font-normal mb-6 text-[#ff6b35] tracking-wide"
              style={{ fontFamily: 'var(--font-audiowide)' }}
            >
              FREE VINTAGE SCI-FI AUDIOBOOK LIBRARY
            </h1>
            <div className="w-32 h-1 bg-[#2ec4b6] mx-auto mb-8"></div>
            <p
              className="text-lg md:text-xl text-[#c9d1d9] mb-6 max-w-4xl mx-auto leading-relaxed"
             
            >
              Listen to the golden age of science fiction. All these classic audiobooks are read by volunteers and freely
              available from LibriVox. Perfect for commutes, workouts, or relaxing with the timeless stories that shaped sci-fi.
            </p>
            <p
              className="text-[#2ec4b6] text-xl mb-8"
             
            >
              🎧 {audiobooks.length} hours of vintage sci-fi adventure • All FREE
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {/* Decade Filter */}
              <div className="relative">
                <select
                  value={decadeFilter}
                  onChange={(e) => setDecadeFilter(e.target.value)}
                  className="px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 cursor-pointer appearance-none pr-12"
                 
                >
                  <option value="all">All Decades</option>
                  {decades.map(decade => (
                    <option key={decade} value={decade}>{decade}</option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Author Filter */}
              <div className="relative">
                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 cursor-pointer appearance-none pr-12"
                 
                >
                  <option value="all">All Authors</option>
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Length Filter */}
              <div className="relative">
                <select
                  value={lengthFilter}
                  onChange={(e) => setLengthFilter(e.target.value)}
                  className="px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 cursor-pointer appearance-none pr-12"
                 
                >
                  <option value="all">All Lengths</option>
                  <option value="short">Short (Under 3 hours)</option>
                  <option value="medium">Medium (3-8 hours)</option>
                  <option value="long">Long (8-15 hours)</option>
                  <option value="epic">Epic (15+ hours)</option>
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Results Count */}
            <p
              className="text-[#c9d1d9] mt-6 text-sm"
             
            >
              Showing {filteredAudiobooks.length} of {audiobooks.length} audiobooks
            </p>
          </div>
        </div>
      </div>

      {/* Cross-Promotion Banner */}
      <div className="bg-[#2ec4b6] py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <p
            className="text-center text-white text-lg"
           
          >
            📖 Prefer reading?{' '}
            <Link href="/free-library" className="font-bold underline hover:text-[#1a2332] transition-colors">
              Visit our Ebook Library
            </Link>
          </p>
        </div>
      </div>

      {/* Audiobook Grid */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAudiobooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#c9d1d9]/20 hover:border-[#2ec4b6] overflow-hidden"
            >
              {/* Cover Image */}
              <div className="relative">
                <div className="aspect-[2/3] bg-gradient-to-br from-[#1a2332] to-[#2a3a4a] overflow-hidden">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={`Cover of ${book.title} by ${book.author} (${book.year}) - audiobook`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-8">
                        <p
                          className="text-[#ff6b35] text-2xl font-bold mb-2"
                          style={{ fontFamily: 'var(--font-audiowide)' }}
                        >
                          {book.title}
                        </p>
                        <p
                          className="text-[#c9d1d9] text-lg"
                         
                        >
                          {book.author}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Audiobook Badge */}
                <div className="absolute top-2 right-2 bg-[#2ec4b6] text-white p-2 rounded-full shadow-lg" title="Audiobook available">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Title & Author */}
                <h3
                  className="text-xl font-semibold text-[#1a2332] mb-2 line-clamp-2"
                 
                >
                  {book.title}
                </h3>
                <p
                  className="text-[#c9d1d9]/60 text-sm mb-3"

                >
                  <Link
                    href={`/authors/${getAuthorSlug(book.author)}`}
                    className="hover:text-[#ff6b35] transition-colors"
                  >
                    {book.author}
                  </Link> • {book.year}
                </p>

                {/* Duration & Reader */}
                <div className="mb-3 space-y-1">
                  <p
                    className="text-[#2ec4b6] text-sm font-mono flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-courier)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                    {book.duration}
                  </p>
                  <p
                    className="text-[#c9d1d9]/60 text-xs"

                  >
                    Read by {book.reader}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < book.rating ? 'text-[#ffbe0b]' : 'text-[#c9d1d9]/30'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Recommendation */}
                <p
                  className="text-[#1a2332] text-sm mb-4 line-clamp-3 leading-relaxed"
                 
                >
                  {book.recommendation}
                </p>

                {/* Buttons */}
                <div className="space-y-2">
                  {/* Listen Free Dropdown Button */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(book.id)}
                      className="w-full px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                     
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-7.072a5 5 0 00-1.414 1.414m7.072-7.072a9 9 0 0110.607 0" />
                      </svg>
                      Listen Free
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {dropdownOpen[book.id] && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-[#c9d1d9]/20">
                        <a
                          href={book.librivoxUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-[#1a2332] hover:bg-[#f8f3e6] transition-colors"
                         
                        >
                          Stream on LibriVox
                        </a>
                        <a
                          href={book.librivoxUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-[#1a2332] hover:bg-[#f8f3e6] transition-colors"
                         
                        >
                          Download MP3
                        </a>
                        <a
                          href="https://librivox.org/pages/about-librivox/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-[#1a2332] hover:bg-[#f8f3e6] transition-colors border-t border-[#c9d1d9]/20"
                         
                        >
                          About LibriVox
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Read Book Button */}
                  {book.ebookId ? (
                    <Link
                      href={`/free-library#${book.ebookId}`}
                      className="block w-full px-6 py-3 bg-transparent border-2 border-[#ff6b35] text-[#ff6b35] font-semibold rounded-md hover:bg-[#ff6b35] hover:text-white transition-all duration-300 text-center"
                     
                    >
                      Read Book
                    </Link>
                  ) : (
                    <span
                      className="block w-full px-6 py-3 bg-transparent border-2 border-[#c9d1d9]/30 text-[#c9d1d9]/50 font-semibold rounded-md text-center cursor-not-allowed"
                     
                    >
                      Ebook coming soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LibriVox Attribution Footer */}
      <section className="bg-[#1a2332] py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h3
            className="text-2xl font-normal mb-4 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            COURTESY OF LIBRIVOX
          </h3>
          <p
            className="text-[#c9d1d9] mb-6 max-w-4xl mx-auto leading-relaxed"
           
          >
            All audiobooks courtesy of{' '}
            <a
              href="https://librivox.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6b35] hover:text-[#e63946] transition-colors font-semibold"
            >
              LibriVox
            </a>
            . LibriVox volunteers have recorded thousands of public domain books as free audiobooks.
            These recordings are in the public domain and may be freely used and shared.
          </p>
          <Link
            href="/free-library"
            className="inline-block px-8 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
           
          >
            Want to read instead of listen? Check out our Ebook Library →
          </Link>
        </div>
      </section>
    </div>
  );
}
