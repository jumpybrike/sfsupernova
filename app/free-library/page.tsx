'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  decade: string;
  themes: string[];
  rating: number;
  recommendation: string;
  gutenbergId: string;
  formats: {
    epub: string;
    kindle: string;
    html: string;
    pdf?: string;
  };
  hasAudiobook?: boolean;
  librivoxUrl?: string;
}

const books: Book[] = [
  // EARLY PIONEERS (1860s-1890s)
  {
    id: "journey-center-earth",
    title: "Journey to the Center of the Earth",
    author: "Jules Verne",
    year: 1864,
    decade: "1860s",
    themes: ["Lost Worlds"],
    rating: 5,
    recommendation: "Verne's subterranean adventure that sparked imaginations for generations. A professor, his nephew, and their guide descend into an Icelandic volcano and discover a world that shouldn't exist.",
    gutenbergId: "18857",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/18857.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/18857.kindle.images",
      html: "https://www.gutenberg.org/files/18857/18857-h/18857-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/journey-to-the-center-of-the-earth-by-jules-verne/",
  },
  {
    id: "from-earth-to-moon",
    title: "From the Earth to the Moon",
    author: "Jules Verne",
    year: 1865,
    decade: "1860s",
    themes: ["Space Adventures"],
    rating: 5,
    recommendation: "The book that dreamed of space travel a century before Apollo. Verne's Baltimore Gun Club builds a cannon to shoot men to the moon—absurd science, but visionary spirit.",
    gutenbergId: "83",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/83.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/83.kindle.images",
      html: "https://www.gutenberg.org/files/83/83-h/83-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/from-the-earth-to-the-moon-by-jules-verne/",
  },
  {
    id: "twenty-thousand-leagues",
    title: "Twenty Thousand Leagues Under the Sea",
    author: "Jules Verne",
    year: 1870,
    decade: "1870s",
    themes: ["Lost Worlds", "Mad Scientists"],
    rating: 5,
    recommendation: "Captain Nemo and the Nautilus defined the mysterious genius archetype. Still the definitive underwater adventure, blending wonder with dark obsession.",
    gutenbergId: "164",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/164.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/164.kindle.images",
      html: "https://www.gutenberg.org/files/164/164-h/164-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/twenty-thousand-leagues-under-the-sea-by-jules-verne/",
  },
  {
    id: "time-machine",
    title: "The Time Machine",
    author: "H.G. Wells",
    year: 1895,
    decade: "1890s",
    themes: ["Time Travel"],
    rating: 5,
    recommendation: "Wells invented the time machine and used it to explore humanity's distant future. The Eloi and Morlocks remain haunting symbols of class division taken to its extreme.",
    gutenbergId: "35",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/35.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/35.kindle.images",
      html: "https://www.gutenberg.org/files/35/35-h/35-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/the-time-machine-by-h-g-wells/",
  },
  {
    id: "war-of-worlds",
    title: "The War of the Worlds",
    author: "H.G. Wells",
    year: 1898,
    decade: "1890s",
    themes: ["Alien Encounters"],
    rating: 5,
    recommendation: "Wells' masterpiece that defined alien invasion stories. The Martian tripods still haunt readers over a century later. No one has done it better.",
    gutenbergId: "36",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/36.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/36.kindle.images",
      html: "https://www.gutenberg.org/files/36/36-h/36-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/the-war-of-the-worlds-by-h-g-wells/",
  },
  {
    id: "island-dr-moreau",
    title: "The Island of Doctor Moreau",
    author: "H.G. Wells",
    year: 1896,
    decade: "1890s",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "Wells' darkest novel. A shipwrecked man discovers an island where a scientist creates human-animal hybrids. Still disturbing, still relevant to debates about bioethics.",
    gutenbergId: "159",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/159.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/159.kindle.images",
      html: "https://www.gutenberg.org/files/159/159-h/159-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/the-island-of-doctor-moreau-by-hg-wells/",
  },
  {
    id: "invisible-man",
    title: "The Invisible Man",
    author: "H.G. Wells",
    year: 1897,
    decade: "1890s",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "Invisibility as a curse, not a gift. Wells explores how power without accountability corrupts. A scientist's descent into madness wrapped in a thrilling chase.",
    gutenbergId: "5230",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/5230.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/5230.kindle.images",
      html: "https://www.gutenberg.org/files/5230/5230-h/5230-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/the-invisible-man-by-hg-wells/",
  },
  // PLANETARY ROMANCE ERA (1910s-1920s)
  {
    id: "princess-of-mars",
    title: "A Princess of Mars",
    author: "Edgar Rice Burroughs",
    year: 1912,
    decade: "1910s",
    themes: ["Space Adventures", "Lost Worlds"],
    rating: 5,
    recommendation: "John Carter teleports to Mars and finds himself in a dying world of warring civilizations and beautiful princesses. Pulp perfection that influenced everything from Star Wars to Avatar.",
    gutenbergId: "62",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/62.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/62.kindle.images",
      html: "https://www.gutenberg.org/files/62/62-h/62-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/a-princess-of-mars-by-edgar-rice-burroughs/",
  },
  {
    id: "gods-of-mars",
    title: "The Gods of Mars",
    author: "Edgar Rice Burroughs",
    year: 1913,
    decade: "1910s",
    themes: ["Space Adventures"],
    rating: 5,
    recommendation: "Carter returns to Mars and challenges false gods. Burroughs at his swashbuckling best—pure adventure with bizarre creatures and death-defying escapes on every page.",
    gutenbergId: "64",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/64.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/64.kindle.images",
      html: "https://www.gutenberg.org/files/64/64-h/64-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/the-gods-of-mars-by-edgar-rice-burroughs/",
  },
  {
    id: "warlord-of-mars",
    title: "The Warlord of Mars",
    author: "Edgar Rice Burroughs",
    year: 1914,
    decade: "1910s",
    themes: ["Space Adventures"],
    rating: 5,
    recommendation: "The thrilling conclusion to the first Martian trilogy. Carter pursues his kidnapped princess across the red planet. Peak planetary romance.",
    gutenbergId: "68",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/68.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/68.kindle.images",
      html: "https://www.gutenberg.org/files/68/68-h/68-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/the-warlord-of-mars-by-edgar-rice-burroughs/",
  },
  {
    id: "at-earths-core",
    title: "At the Earth's Core",
    author: "Edgar Rice Burroughs",
    year: 1914,
    decade: "1910s",
    themes: ["Lost Worlds"],
    rating: 5,
    recommendation: "Burroughs takes the hollow earth theory and runs wild. A mechanical digger breaks through to Pellucidar, a savage world at the planet's core ruled by intelligent reptiles.",
    gutenbergId: "123",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/123.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/123.kindle.images",
      html: "https://www.gutenberg.org/files/123/123-h/123-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/at-the-earths-core-by-edgar-rice-burroughs/",
  },
  {
    id: "moon-pool",
    title: "The Moon Pool",
    author: "A. Merritt",
    year: 1919,
    decade: "1910s",
    themes: ["Lost Worlds"],
    rating: 4,
    recommendation: "Merritt's lush, dreamlike prose describes an ancient race living in ruins beneath the Pacific. Part adventure, part weird fantasy, completely mesmerizing.",
    gutenbergId: "23735",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/23735.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/23735.kindle.images",
      html: "https://www.gutenberg.org/files/23735/23735-h/23735-h.htm",
    }
  },
  // PULP ERA CLASSICS (1920s)
  {
    id: "metal-monster",
    title: "The Metal Monster",
    author: "A. Merritt",
    year: 1920,
    decade: "1920s",
    themes: ["Lost Worlds", "Alien Encounters"],
    rating: 4,
    recommendation: "Merritt's strangest tale. Living metal entities in a hidden Asian valley. His descriptions of the geometric beings are unlike anything else in early sci-fi.",
    gutenbergId: "59236",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/59236.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/59236.kindle.images",
      html: "https://www.gutenberg.org/cache/epub/59236/pg59236-images.html",
    }
  },
  {
    id: "skylark-of-space",
    title: "The Skylark of Space",
    author: "E.E. 'Doc' Smith",
    year: 1928,
    decade: "1920s",
    themes: ["Space Adventures"],
    rating: 4,
    recommendation: "Doc Smith invents space opera. The first book to imagine FTL travel and galactic civilizations. Rough around the edges but historically essential—this is where it all began.",
    gutenbergId: "20869",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/20869.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/20869.kindle.images",
      html: "https://www.gutenberg.org/files/20869/20869-h/20869-h.htm",
    }
  },
  {
    id: "moon-maid",
    title: "The Moon Maid",
    author: "Edgar Rice Burroughs",
    year: 1926,
    decade: "1920s",
    themes: ["Lost Worlds"],
    rating: 4,
    recommendation: "Burroughs' hollow moon hosts a civilization of beautiful moon people and monstrous creatures. Pure pulp imagination at its most uninhibited.",
    gutenbergId: "1397",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/1397.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/1397.kindle.images",
      html: "https://www.gutenberg.org/files/1397/1397-h/1397-h.htm",
    }
  },
  // CLASSIC WORKS (Pre-1920s)
  {
    id: "flatland",
    title: "Flatland",
    author: "Edwin A. Abbott",
    year: 1884,
    decade: "1880s",
    themes: ["Philosophical"],
    rating: 5,
    recommendation: "A square in a two-dimensional world encounters the third dimension. More mathematical fable than adventure, but a brilliant thought experiment that influenced sci-fi for generations.",
    gutenbergId: "201",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/201.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/201.kindle.images",
      html: "https://www.gutenberg.org/files/201/201-h/201-h.htm",
    }
  },
  {
    id: "first-men-in-moon",
    title: "The First Men in the Moon",
    author: "H.G. Wells",
    year: 1901,
    decade: "1900s",
    themes: ["Space Adventures", "Alien Encounters"],
    rating: 5,
    recommendation: "Wells sends humans to the moon and finds an insect civilization inside. His Selenites are genuinely alien—not just humans in costumes.",
    gutenbergId: "1013",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/1013.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/1013.kindle.images",
      html: "https://www.gutenberg.org/files/1013/1013-h/1013-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/the-first-men-in-the-moon-by-hg-wells/",
  },
  {
    id: "when-sleeper-wakes",
    title: "When the Sleeper Wakes",
    author: "H.G. Wells",
    year: 1899,
    decade: "1890s",
    themes: ["Time Travel"],
    rating: 4,
    recommendation: "A man sleeps for 200 years and wakes to find himself the richest person in a dystopian future London. Wells predicting our surveillance society decades early.",
    gutenbergId: "775",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/775.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/775.kindle.images",
      html: "https://www.gutenberg.org/files/775/775-h/775-h.htm",
    }
  },
  {
    id: "days-of-comet",
    title: "In the Days of the Comet",
    author: "H.G. Wells",
    year: 1906,
    decade: "1900s",
    themes: ["Apocalyptic"],
    rating: 4,
    recommendation: "A comet's passage transforms humanity into a peaceful, rational species. Utopian sci-fi from Wells, asking whether we can evolve beyond violence.",
    gutenbergId: "4279",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/4279.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/4279.kindle.images",
      html: "https://www.gutenberg.org/files/4279/4279-h/4279-h.htm",
    }
  },
  {
    id: "lost-world",
    title: "The Lost World",
    author: "Arthur Conan Doyle",
    year: 1912,
    decade: "1910s",
    themes: ["Lost Worlds"],
    rating: 5,
    recommendation: "Sherlock Holmes' creator sends Professor Challenger to the Amazon where dinosaurs still roam. The grandfather of every 'lost dinosaur' story, including Jurassic Park.",
    gutenbergId: "139",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/139.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/139.kindle.images",
      html: "https://www.gutenberg.org/files/139/139-h/139-h.htm",
    }
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    decade: "1810s",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "The original science fiction novel. Shelley asks: what do we owe our creations? Victor Frankenstein's monster is tragic, eloquent, and still haunting 200+ years later.",
    gutenbergId: "84",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/84.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/84.kindle.images",
      html: "https://www.gutenberg.org/files/84/84-h/84-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/frankenstein-by-mary-shelley/",
  },
  {
    id: "jekyll-hyde",
    title: "The Strange Case of Dr Jekyll and Mr Hyde",
    author: "Robert Louis Stevenson",
    year: 1886,
    decade: "1880s",
    themes: ["Mad Scientists"],
    rating: 5,
    recommendation: "Stevenson's dark exploration of the duality of human nature. A scientist's experiment unleashes his evil side. Short, intense, and unforgettable.",
    gutenbergId: "43",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/43.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/43.kindle.images",
      html: "https://www.gutenberg.org/files/43/43-h/43-h.htm",
    },
    hasAudiobook: true,
    librivoxUrl: "https://librivox.org/strange-case-of-dr-jekyll-and-mr-hyde-by-robert-louis-stevenson/",
  },
  {
    id: "looking-backward",
    title: "Looking Backward: 2000-1887",
    author: "Edward Bellamy",
    year: 1888,
    decade: "1880s",
    themes: ["Time Travel"],
    rating: 4,
    recommendation: "A man from 1887 wakes in the year 2000 to find a socialist utopia. Dated in many ways, but fascinating to see what the late 19th century thought the future would hold.",
    gutenbergId: "624",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/624.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/624.kindle.images",
      html: "https://www.gutenberg.org/files/624/624-h/624-h.htm",
    }
  },
  {
    id: "connecticut-yankee",
    title: "A Connecticut Yankee in King Arthur's Court",
    author: "Mark Twain",
    year: 1889,
    decade: "1880s",
    themes: ["Time Travel"],
    rating: 5,
    recommendation: "Twain sends a 19th-century engineer back to Camelot. Part comedy, part social satire, part thought experiment about technology and progress. Twain being brilliantly Twain.",
    gutenbergId: "86",
    formats: {
      epub: "https://www.gutenberg.org/ebooks/86.epub.images",
      kindle: "https://www.gutenberg.org/ebooks/86.kindle.images",
      html: "https://www.gutenberg.org/files/86/86-h/86-h.htm",
    }
  },
];

// Map book IDs to cover image filenames
const coverImages: { [key: string]: string } = {
  "war-of-worlds": "/covers/war-of-worlds.jpg",
  "time-machine": "/covers/time-machine.jpg",
  "island-dr-moreau": "/covers/island-moreau.jpg",
  "invisible-man": "/covers/invisible-man.jpg",
  "first-men-in-moon": "/covers/first-men-moon.jpg",
  "sleeper-wakes": "/covers/sleeper-wakes.jpg",
  "in-days-comet": "/covers/days-comet.jpg",
  "food-of-gods": "/covers/food-of-gods.jpg",
  "twenty-thousand-leagues": "/covers/twenty-thousand-leagues.jpg",
  "journey-center-earth": "/covers/journey-center-earth.jpg",
  "from-earth-moon": "/covers/from-earth-moon.jpg",
  "around-world-eighty-days": "/covers/around-world.jpg",
  "princess-of-mars": "/covers/princess-mars.jpg",
  "gods-of-mars": "/covers/gods-mars.jpg",
  "warlord-of-mars": "/covers/warlord-mars.jpg",
  "at-earths-core": "/covers/earths-core.jpg",
  "moon-maid": "/covers/moon-maid.jpg",
  "moon-pool": "/covers/moon-pool.jpg",
  "metal-monster": "/covers/metal-monster.jpg",
  "skylark-space": "/covers/skylark-space.jpg",
  "frankenstein": "/covers/frankenstein.jpg",
  "jekyll-hyde": "/covers/jekyll-hyde.jpg",
  "flatland": "/covers/flatland.jpg",
  "connecticut-yankee": "/covers/connecticut-yankee.jpg",
  "lost-world": "/covers/lost-world.jpg",
  "looking-backward": "/covers/looking-backward.jpg",
};

export default function FreeLibraryPage() {
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [showDownloadMenu, setShowDownloadMenu] = useState<string | null>(null);

  // Get unique values for filters
  const decades = useMemo(() => {
    const uniqueDecades = Array.from(new Set(books.map(book => book.decade))).sort();
    return ['all', ...uniqueDecades];
  }, []);

  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(books.map(book => book.author))).sort();
    return ['all', ...uniqueAuthors];
  }, []);

  const themes = useMemo(() => {
    const allThemes = books.flatMap(book => book.themes);
    const uniqueThemes = Array.from(new Set(allThemes)).sort();
    return ['all', ...uniqueThemes];
  }, []);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesDecade = selectedDecade === 'all' || book.decade === selectedDecade;
      const matchesAuthor = selectedAuthor === 'all' || book.author === selectedAuthor;
      const matchesTheme = selectedTheme === 'all' || book.themes.includes(selectedTheme);
      return matchesDecade && matchesAuthor && matchesTheme;
    });
  }, [selectedDecade, selectedAuthor, selectedTheme]);

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl font-normal mb-6 text-[#ff6b35] glow-orange"
            style={{ fontFamily: 'var(--font-audiowide)', wordBreak: 'normal' }}
          >
            FREE VINTAGE SCI-FI LIBRARY
          </h1>
          <p
            className="text-xl text-[#c9d1d9] mb-8 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            Discover the golden age of science fiction with our curated library of 25 classic ebooks.
            All legally free, thanks to Project Gutenberg. Read the books that shaped the genre.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Decade Filter */}
            <div className="relative">
              <select
                value={selectedDecade}
                onChange={(e) => setSelectedDecade(e.target.value)}
                className="px-6 py-3 bg-[#1a2332] border-2 border-[#2ec4b6] text-[#2ec4b6] rounded-md font-medium transition-all duration-300 hover:bg-[#2ec4b6] hover:text-[#1a2332] cursor-pointer"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <option value="all">All Decades</option>
                {decades.filter(d => d !== 'all').map(decade => (
                  <option key={decade} value={decade}>{decade}</option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div className="relative">
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="px-6 py-3 bg-[#1a2332] border-2 border-[#2ec4b6] text-[#2ec4b6] rounded-md font-medium transition-all duration-300 hover:bg-[#2ec4b6] hover:text-[#1a2332] cursor-pointer"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <option value="all">All Authors</option>
                {authors.filter(a => a !== 'all').map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>

            {/* Theme Filter */}
            <div className="relative">
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="px-6 py-3 bg-[#1a2332] border-2 border-[#2ec4b6] text-[#2ec4b6] rounded-md font-medium transition-all duration-300 hover:bg-[#2ec4b6] hover:text-[#1a2332] cursor-pointer"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <option value="all">All Themes</option>
                {themes.filter(t => t !== 'all').map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Count */}
          <p className="text-[#c9d1d9]/70 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
            Showing {filteredBooks.length} of {books.length} books
          </p>
        </div>

        {/* Cross-Promotion Banner */}
        <div className="bg-[#2ec4b6] py-4 rounded-lg mb-12 shadow-lg">
          <p
            className="text-center text-white text-lg"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            🎧 Prefer audiobooks?{' '}
            <Link href="/audiobook-library" className="font-bold underline hover:text-[#1a2332] transition-colors">
              Visit our Audiobook Library
            </Link>
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredBooks.map((book) => {
            const coverImage = coverImages[book.id];

            return (
            <article
              key={book.id}
              className="bg-white border border-[#c9d1d9]/20 rounded-lg overflow-hidden hover:border-[#ff6b35] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              {/* Book Cover Image */}
              <div className="aspect-[2/3] border-b-2 border-[#c9d1d9]/30 relative overflow-hidden bg-gradient-to-br from-[#1a2332] to-[#2a3a4a]">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={`Cover of ${book.title} by ${book.author} (${book.year})`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative z-10">
                      <p className="text-white/60 text-[9px] uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                        Vintage Classic
                      </p>
                      <h4 className="text-white font-normal text-base leading-tight mb-4" style={{ fontFamily: 'var(--font-audiowide)' }}>
                        {book.title}
                      </h4>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-courier-prime)' }}>
                        {book.year}
                      </p>
                      <p className="text-white/80 text-xs mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                        {book.author}
                      </p>
                    </div>
                  </div>
                )}

                {/* Audiobook Badge */}
                {book.hasAudiobook && (
                  <div className="absolute top-2 right-2 bg-[#ffbe0b] text-[#1a2332] p-1.5 rounded-full shadow-lg z-20" title="Audiobook available">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Book Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3
                  className="text-lg font-semibold mb-2 text-[#1a2332]"
                  style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal' }}
                >
                  {book.title}
                </h3>

                <p
                  className="text-sm text-[#1a2332]/70 mb-1"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  by {book.author}
                </p>

                <p
                  className="text-xs text-[#ff6b35] mb-3 uppercase tracking-wide font-medium"
                  style={{ fontFamily: 'var(--font-courier-prime)' }}
                >
                  {book.decade}
                </p>

                {/* Star Rating */}
                <div className="flex text-[#ffbe0b] mb-3">
                  {[...Array(book.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Recommendation */}
                <p
                  className="text-sm text-[#1a2332]/80 mb-4 flex-1 leading-relaxed line-clamp-4"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {book.recommendation}
                </p>

                {/* Listen Free Button (if audiobook available) */}
                {book.hasAudiobook && book.librivoxUrl && (
                  <a
                    href={book.librivoxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-7.072a5 5 0 00-1.414 1.414m7.072-7.072a9 9 0 0110.607 0" />
                    </svg>
                    Listen Free
                  </a>
                )}

                {/* Download Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowDownloadMenu(showDownloadMenu === book.id ? null : book.id)}
                    className="w-full px-6 py-3 bg-[#ff6b35] text-white font-semibold rounded-md hover:bg-[#e63946] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Download
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Download Menu */}
                  {showDownloadMenu === book.id && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border-2 border-[#ff6b35] rounded-md shadow-xl overflow-hidden z-10">
                      <a
                        href={book.formats.epub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-[#1a2332] hover:bg-[#ff6b35] hover:text-white transition-colors border-b border-[#c9d1d9]/20"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        📱 EPUB
                      </a>
                      <a
                        href={book.formats.kindle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-[#1a2332] hover:bg-[#ff6b35] hover:text-white transition-colors border-b border-[#c9d1d9]/20"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        📖 Kindle
                      </a>
                      <a
                        href={book.formats.html}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-[#1a2332] hover:bg-[#ff6b35] hover:text-white transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        🌐 Read Online (HTML)
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
          })}
        </div>

        {/* Project Gutenberg & LibriVox Attribution */}
        <section className="text-center py-12 bg-[#1a2332] rounded-lg border-2 border-[#c9d1d9]/30">
          <h3
            className="text-2xl font-normal mb-4 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            COURTESY OF PROJECT GUTENBERG & LIBRIVOX
          </h3>
          <p
            className="text-[#c9d1d9] mb-4 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            All ebooks courtesy of{' '}
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
            className="text-[#c9d1d9] mb-4 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            Audiobooks courtesy of{' '}
            <a
              href="https://librivox.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2ec4b6] hover:text-[#2ec4b6]/80 transition-colors font-semibold"
            >
              LibriVox
            </a>
            .
          </p>
          <p
            className="text-[#c9d1d9]/80 text-sm max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)', wordBreak: 'normal', whiteSpace: 'normal', overflowWrap: 'normal' }}
          >
            These books are in the public domain in the United States and may be freely downloaded and shared.
          </p>
        </section>
      </div>
    </div>
  );
}
