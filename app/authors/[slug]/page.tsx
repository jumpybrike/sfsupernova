import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authors } from '../authorsData';

// This data structure maps books to authors for cross-linking
// In a real CMS, this would be handled by references
const authorBibliography: { [key: string]: Array<{
  title: string;
  year: number;
  rating?: number;
  description: string;
  inFreeLibrary?: boolean;
  inAudioLibrary?: boolean;
  freeLibrarySlug?: string;
  decade?: string;
}> } = {
  'h-g-wells': [
    {
      title: 'The Time Machine',
      year: 1895,
      rating: 5,
      description: 'Wells invented the time machine and used it to explore humanity\'s distant future. The Eloi and Morlocks remain haunting symbols of class division taken to its extreme.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1890s',
    },
    {
      title: 'The War of the Worlds',
      year: 1898,
      rating: 5,
      description: 'Wells\' masterpiece that defined alien invasion stories. The Martian tripods still haunt readers over a century later. No one has done it better.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1890s',
    },
    {
      title: 'The Island of Doctor Moreau',
      year: 1896,
      rating: 5,
      description: 'Wells\' darkest novel. A shipwrecked man discovers an island where a scientist creates human-animal hybrids. Still disturbing, still relevant to debates about bioethics.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1890s',
    },
    {
      title: 'The Invisible Man',
      year: 1897,
      rating: 5,
      description: 'Invisibility as a curse, not a gift. Wells explores how power without accountability corrupts. A scientist\'s descent into madness wrapped in a thrilling chase.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1890s',
    },
    {
      title: 'The First Men in the Moon',
      year: 1901,
      rating: 5,
      description: 'Wells sends humans to the moon and finds an insect civilization inside. His Selenites are genuinely alien—not just humans in costumes.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1900s',
    },
    {
      title: 'When the Sleeper Wakes',
      year: 1899,
      rating: 4,
      description: 'A man sleeps for 200 years and wakes to find himself the richest person in a dystopian future London. Wells predicting our surveillance society decades early.',
      inFreeLibrary: true,
      decade: '1890s',
    },
    {
      title: 'In the Days of the Comet',
      year: 1906,
      rating: 4,
      description: 'A comet\'s passage transforms humanity into a peaceful, rational species. Utopian sci-fi from Wells, asking whether we can evolve beyond violence.',
      inFreeLibrary: true,
      decade: '1900s',
    },
  ],
  'jules-verne': [
    {
      title: 'Journey to the Center of the Earth',
      year: 1864,
      rating: 5,
      description: 'Verne\'s subterranean adventure that sparked imaginations for generations. A professor, his nephew, and their guide descend into an Icelandic volcano and discover a world that shouldn\'t exist.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1860s',
    },
    {
      title: 'From the Earth to the Moon',
      year: 1865,
      rating: 5,
      description: 'The book that dreamed of space travel a century before Apollo. Verne\'s Baltimore Gun Club builds a cannon to shoot men to the moon—absurd science, but visionary spirit.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1860s',
    },
    {
      title: 'Twenty Thousand Leagues Under the Sea',
      year: 1870,
      rating: 5,
      description: 'Captain Nemo and the Nautilus defined the mysterious genius archetype. Still the definitive underwater adventure, blending wonder with dark obsession.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1870s',
    },
  ],
  'edgar-rice-burroughs': [
    {
      title: 'A Princess of Mars',
      year: 1912,
      rating: 5,
      description: 'John Carter teleports to Mars and finds himself in a dying world of warring civilizations and beautiful princesses. Pulp perfection that influenced everything from Star Wars to Avatar.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1910s',
    },
    {
      title: 'The Gods of Mars',
      year: 1913,
      rating: 5,
      description: 'Carter returns to Mars and challenges false gods. Burroughs at his swashbuckling best—pure adventure with bizarre creatures and death-defying escapes on every page.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1910s',
    },
    {
      title: 'The Warlord of Mars',
      year: 1914,
      rating: 5,
      description: 'The thrilling conclusion to the first Martian trilogy. Carter pursues his kidnapped princess across the red planet. Peak planetary romance.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1910s',
    },
    {
      title: 'At the Earth\'s Core',
      year: 1914,
      rating: 5,
      description: 'Burroughs takes the hollow earth theory and runs wild. A mechanical digger breaks through to Pellucidar, a savage world at the planet\'s core ruled by intelligent reptiles.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1910s',
    },
    {
      title: 'The Moon Maid',
      year: 1926,
      rating: 4,
      description: 'Burroughs\' hollow moon hosts a civilization of beautiful moon people and monstrous creatures. Pure pulp imagination at its most uninhibited.',
      inFreeLibrary: true,
      decade: '1920s',
    },
  ],
  'mary-shelley': [
    {
      title: 'Frankenstein',
      year: 1818,
      rating: 5,
      description: 'The original science fiction novel. Shelley asks: what do we owe our creations? Victor Frankenstein\'s monster is tragic, eloquent, and still haunting 200+ years later.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1810s',
    },
  ],
  'robert-louis-stevenson': [
    {
      title: 'The Strange Case of Dr Jekyll and Mr Hyde',
      year: 1886,
      rating: 5,
      description: 'Stevenson\'s dark exploration of the duality of human nature. A scientist\'s experiment unleashes his evil side. Short, intense, and unforgettable.',
      inFreeLibrary: true,
      inAudioLibrary: true,
      decade: '1880s',
    },
  ],
  'arthur-conan-doyle': [
    {
      title: 'The Lost World',
      year: 1912,
      rating: 5,
      description: 'Sherlock Holmes\' creator sends Professor Challenger to the Amazon where dinosaurs still roam. The grandfather of every \'lost dinosaur\' story, including Jurassic Park.',
      inFreeLibrary: true,
      decade: '1910s',
    },
  ],
  'mark-twain': [
    {
      title: 'A Connecticut Yankee in King Arthur\'s Court',
      year: 1889,
      rating: 5,
      description: 'Twain sends a 19th-century engineer back to Camelot. Part comedy, part social satire, part thought experiment about technology and progress. Twain being brilliantly Twain.',
      inFreeLibrary: true,
      decade: '1880s',
    },
  ],
  'edwin-a-abbott': [
    {
      title: 'Flatland: A Romance of Many Dimensions',
      year: 1884,
      rating: 5,
      description: 'A square in a two-dimensional world encounters the third dimension. More mathematical fable than adventure, but a brilliant thought experiment that influenced sci-fi for generations.',
      inFreeLibrary: true,
      decade: '1880s',
    },
  ],
  'edward-bellamy': [
    {
      title: 'Looking Backward: 2000-1887',
      year: 1888,
      rating: 4,
      description: 'A man from 1887 wakes in the year 2000 to find a socialist utopia. Dated in many ways, but fascinating to see what the late 19th century thought the future would hold.',
      inFreeLibrary: true,
      decade: '1880s',
    },
  ],
  'a-merritt': [
    {
      title: 'The Moon Pool',
      year: 1919,
      rating: 4,
      description: 'Merritt\'s lush, dreamlike prose describes an ancient race living in ruins beneath the Pacific. Part adventure, part weird fantasy, completely mesmerizing.',
      inFreeLibrary: true,
      decade: '1910s',
    },
    {
      title: 'The Metal Monster',
      year: 1920,
      rating: 4,
      description: 'Merritt\'s strangest tale. Living metal entities in a hidden Asian valley. His descriptions of the geometric beings are unlike anything else in early sci-fi.',
      inFreeLibrary: true,
      decade: '1920s',
    },
  ],
  'e-e-doc-smith': [
    {
      title: 'The Skylark of Space',
      year: 1928,
      rating: 4,
      description: 'Doc Smith invents space opera. The first book to imagine FTL travel and galactic civilizations. Rough around the edges but historically essential—this is where it all began.',
      inFreeLibrary: true,
      decade: '1920s',
    },
  ],
};

// Detailed biographies
const authorBiographies: { [key: string]: string } = {
  'h-g-wells': `Herbert George Wells (1866-1946) was an English author who pioneered science fiction as we know it today. Often called "the father of science fiction," Wells wrote classics that defined entire sub-genres: alien invasion (The War of the Worlds), time travel (The Time Machine), and mad science (The Island of Doctor Moreau).

Born in Bromley, Kent, to a working-class family, Wells won a scholarship to study biology under Thomas Henry Huxley. This scientific education profoundly influenced his writing, grounding fantastical concepts in scientific plausibility—what would later be called "hard science fiction."

Wells' early novels (1895-1901) remain his most influential. The Time Machine (1895) invented the time travel genre. The Island of Doctor Moreau (1896) explored bioethics decades before the term existed. The Invisible Man (1897) examined how power without accountability corrupts. The War of the Worlds (1898) created the alien invasion template still used today. The First Men in the Moon (1901) imagined space travel with remarkable prescience.

Unlike his contemporary Jules Verne, who emphasized technological possibility, Wells focused on social commentary. His stories used fantastic scenarios to critique Victorian society, imperialism, and class division. The Time Machine's Eloi and Morlocks represent his socialist concerns about class evolution. The War of the Worlds reversed colonial invasion, with humans experiencing what Britain inflicted on others.

Later in life, Wells turned to social and political writing, producing non-fiction about world government and education. His fiction output declined, but his early works secured his legacy as science fiction's founding father.

Wells' influence is immeasurable. Nearly every major sci-fi trope can be traced to his novels. Writers from Isaac Asimov to Margaret Atwood cite him as an inspiration. His works remain perpetually in print, having never fallen out of favor in over 125 years.`,

  'jules-verne': `Jules Gabriel Verne (1828-1905) was a French novelist who pioneered the genre of science fiction, often called scientific romance in his era. His meticulous research and boundless imagination produced some of literature's most enduring adventures.

Born in Nantes, France, Verne was sent to Paris to study law, but his passion for writing led him to abandon his legal career. He met publisher Pierre-Jules Hetzel, who would publish all of Verne's major works and encourage his combination of adventure and scientific accuracy.

Verne's works were characterized by extensive research. Before writing about submarines in Twenty Thousand Leagues Under the Sea, he studied naval engineering. His predictions were remarkably prescient: he imagined space travel (From the Earth to the Moon), electric submarines (Twenty Thousand Leagues), and global communication networks.

Unlike H.G. Wells, who used fantastic scenarios for social commentary, Verne focused on technological possibility and adventure. His heroes were explorers, engineers, and scientists pushing the boundaries of human knowledge. Captain Nemo remains one of literature's great mysterious geniuses.

Verne's influence extended beyond literature. His books inspired real-world explorers and inventors. Simon Lake, who built early submarines, said Verne inspired his career. The Apollo 11 astronauts acknowledged Verne's influence on their mission.

During his lifetime, Verne was France's best-selling author. He wrote over 60 novels in his "Voyages Extraordinaires" series, each combining exotic locations with scientific speculation. His works have never gone out of print and have been translated into over 140 languages.`,

  'edgar-rice-burroughs': `Edgar Rice Burroughs (1875-1950) was an American writer who created the planetary romance genre and became one of the most influential pulp authors. While best known for Tarzan, his science fiction works—particularly the Barsoom (Mars) and Pellucidar series—defined adventure science fiction.

Born in Chicago, Burroughs had an unsuccessful early career, trying and failing at various jobs including pencil sharpener wholesaling. At age 35, broke and desperate, he began writing pulp fiction. His first novel, A Princess of Mars, introduced John Carter and the dying world of Barsoom. It was an immediate success.

Burroughs' Mars novels created the planetary romance template: a Earth man transported to an exotic world, strange civilizations, beautiful princesses, sword fights, and wild adventures. The science was absurd (Carter "wills" himself to Mars), but the storytelling was irresistible. His influence on later science fiction is immense—Star Wars, Avatar, and countless others owe him a debt.

Unlike the "hard science fiction" of later writers like Asimov and Clarke, Burroughs wrote what would be called "soft" or "adventure" science fiction. Scientific accuracy mattered less than exotic settings and thrilling action. His hollow earth series (Pellucidar) and Venus novels continued this approach.

Burroughs was also a savvy businessman. He founded his own publishing company and was one of the first authors to incorporate himself. The town of Tarzana, California is named after his Tarzan character—he owned the land.

His prose was often criticized as purple and his science as nonsense, but his imagination and storytelling kept readers enthralled. Modern science fiction writers from Ray Bradbury to Michael Moorcock have cited him as a major influence. He proved that science fiction could be wildly popular.`,

  'mary-shelley': `Mary Wollstonecraft Shelley (1797-1851) was an English novelist who, at age 18, wrote what is widely considered the first science fiction novel: Frankenstein; or, The Modern Prometheus. Her exploration of scientific responsibility, the nature of humanity, and the consequences of playing God remains profoundly relevant 200+ years later.

Born to two revolutionary thinkers—feminist philosopher Mary Wollstonecraft and political philosopher William Godwin—Shelley grew up in an intellectually radical household. Her mother died shortly after her birth, but Mary was educated in her mother's feminist principles.

At 16, she eloped with the Romantic poet Percy Bysshe Shelley (already married). The summer of 1816, Mary and Percy were staying with Lord Byron near Geneva. During a period of bad weather, Byron proposed they each write a ghost story. Mary conceived Frankenstein during this "year without a summer."

Frankenstein was published anonymously in 1818 (with a preface by Percy, leading many to assume he wrote it). The novel is notable for its scientific rather than supernatural premise: Victor Frankenstein uses chemistry and biology to create life. This grounding in science, rather than magic, makes it the first true science fiction novel.

The novel explores themes that would become central to science fiction: the responsibility of the creator for their creation, the danger of unchecked scientific ambition, the meaning of humanity, and the consequences of isolation. The monster is not evil by nature but made so by society's rejection—a sophisticated exploration of nature versus nurture.

Shelley wrote other novels but none achieved Frankenstein's impact. She spent much of her later life editing and promoting her late husband's works (Percy drowned in 1822). Modern feminist scholars have rediscovered her other writings and her important place in literary history.

Frankenstein has never been out of print. It has inspired countless adaptations and remains a touchstone for discussions about scientific ethics, artificial intelligence, and what it means to be human.`,

  'isaac-asimov': `Isaac Asimov (1920-1992) was an American writer and biochemistry professor, one of the most prolific authors of all time with over 500 books published. Along with Robert Heinlein and Arthur C. Clarke, he formed the "Big Three" of Golden Age science fiction.

Born in Russia, Asimov immigrated to the United States at age three. He grew up in Brooklyn, where his parents owned a candy store that sold science fiction magazines. These pulps sparked his imagination and writing ambition.

Asimov's Foundation series, inspired by Edward Gibbon's The History of the Decline and Fall of the Roman Empire, imagined a future galactic empire and the science of psychohistory—using mathematics to predict societal trends. The series won a special Hugo Award as the "Best All-Time Series" in 1966.

His Robot stories established the Three Laws of Robotics, a framework for thinking about artificial intelligence that has influenced both fiction and real robotics research. The laws seem simple but Asimov explored their complex implications in dozens of stories.

Unlike many science fiction writers who focused on space opera or adventure, Asimov emphasized ideas and logic puzzles. His stories often featured scientists solving problems through reason rather than action. This made science fiction intellectually respectable.

Asimov had a PhD in biochemistry and taught at Boston University. His science writing made complex topics accessible to general readers. He wrote popular science books on nearly every scientific subject, plus mysteries, history, Shakespeare, and the Bible.

His influence on science fiction is incalculable. Concepts like positronic brains, psychohistory, and the Three Laws of Robotics have become part of the genre's vocabulary. Modern writers like Greg Bear and Greg Egan follow his tradition of idea-driven hard science fiction.`,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorPage(props: PageProps) {
  const params = await props.params;
  const author = authors.find((a) => a.slug === params.slug);

  if (!author) {
    notFound();
  }

  const bibliography = authorBibliography[author.slug] || [];
  const fullBiography = authorBiographies[author.slug] || author.biographyExcerpt;

  // Find related authors (same era or genre)
  const relatedAuthors = authors
    .filter(a => {
      if (a.id === author.id) return false;
      const sameEra = a.era.some(e => author.era.includes(e));
      const sameGenre = a.genres.some(g => author.genres.includes(g));
      return sameEra || sameGenre;
    })
    .slice(0, 4);

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-[#2ec4b6] hover:text-[#ff6b35] transition-colors">
            Home
          </Link>
          <span className="text-[#c9d1d9] mx-2">/</span>
          <Link href="/authors" className="text-[#2ec4b6] hover:text-[#ff6b35] transition-colors">
            Authors
          </Link>
          <span className="text-[#c9d1d9] mx-2">/</span>
          <span className="text-[#c9d1d9]">{author.commonName}</span>
        </nav>

        {/* Author Header */}
        <div className="bg-white rounded-lg border-2 border-[#c9d1d9]/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Portrait Placeholder */}
            <div className="w-48 h-48 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#1a2332] to-[#2a3a4a] flex items-center justify-center">
              <span className="text-6xl text-[#2ec4b6]" style={{ fontFamily: 'var(--font-audiowide)' }}>
                {author.commonName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <h1
                className="text-4xl font-normal mb-2 text-[#1a2332]"
                style={{ fontFamily: 'var(--font-audiowide)' }}
              >
                {author.commonName}
              </h1>
              {author.name !== author.commonName && (
                <p className="text-lg text-[#1a2332]/60 mb-2">
                  {author.name}
                </p>
              )}
              <p className="text-md text-[#1a2332]/60 mb-3">
                {author.birthYear}–{author.deathYear || 'Present'} ({author.deathYear ? author.deathYear - author.birthYear : 2025 - author.birthYear} years) • {author.nationality}
              </p>
              <p
                className="text-lg text-[#ff6b35] font-medium mb-4"
                style={{ fontFamily: 'var(--font-courier-prime)' }}
              >
                {author.tagline}
              </p>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {author.genres.map(genre => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-[#2ec4b6]/10 text-[#2ec4b6] text-sm rounded-md border border-[#2ec4b6]/30"
                   
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/free-library"
                  className="px-4 py-2 bg-[#ff6b35] text-white text-sm font-semibold rounded-md hover:bg-[#e63946] transition-colors"
                 
                >
                  Read Their Books
                </Link>
                <Link
                  href="/audiobook-library"
                  className="px-4 py-2 bg-[#2ec4b6] text-white text-sm font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-colors"
                 
                >
                  Listen Free
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <section className="bg-white rounded-lg border border-[#c9d1d9]/20 p-8 mb-8">
          <h2
            className="text-3xl font-normal mb-6 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            BIOGRAPHY
          </h2>
          <div
            className="text-[#1a2332] leading-relaxed space-y-4 text-lg whitespace-pre-line"
           
          >
            {fullBiography}
          </div>
        </section>

        {/* Notable Works Section */}
        {bibliography.length > 0 && (
          <section className="bg-white rounded-lg border border-[#c9d1d9]/20 p-8 mb-8">
            <h2
              className="text-3xl font-normal mb-6 text-[#ff6b35]"
              style={{ fontFamily: 'var(--font-audiowide)' }}
            >
              NOTABLE WORKS
            </h2>
            <div className="space-y-6">
              {bibliography.map((work, index) => (
                <div key={index} className="border-l-4 border-[#2ec4b6] pl-6 py-2">
                  <h3
                    className="text-xl font-semibold mb-2 text-[#1a2332]"
                   
                  >
                    {work.title} ({work.year})
                  </h3>
                  {work.rating && (
                    <div className="flex text-[#ffbe0b] mb-2">
                      {[...Array(work.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  )}
                  <p
                    className="text-[#1a2332]/80 mb-3 leading-relaxed"
                   
                  >
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {work.inFreeLibrary && (
                      <Link
                        href="/free-library"
                        className="text-sm text-[#ff6b35] hover:text-[#e63946] font-medium transition-colors"
                       
                      >
                        Read Free →
                      </Link>
                    )}
                    {work.inAudioLibrary && (
                      <Link
                        href="/audiobook-library"
                        className="text-sm text-[#2ec4b6] hover:text-[#2ec4b6] font-medium transition-colors"
                       
                      >
                        Listen Free →
                      </Link>
                    )}
                    {work.decade && (
                      <Link
                        href={`/galleries`}
                        className="text-sm text-[#1a2332]/60 hover:text-[#1a2332] font-medium transition-colors"
                       
                      >
                        View Cover Art →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {author.workCount > bibliography.length && (
              <p className="mt-6 text-center text-[#1a2332]/60">
                Plus {author.workCount - bibliography.length}+ more works
              </p>
            )}
          </section>
        )}

        {/* Themes & Style Section */}
        <section className="bg-white rounded-lg border border-[#c9d1d9]/20 p-8 mb-8">
          <h2
            className="text-3xl font-normal mb-6 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            THEMES & STYLE
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a2332]">
                Era
              </h3>
              <div className="flex flex-wrap gap-2">
                {author.era.map(e => (
                  <span
                    key={e}
                    className="px-3 py-1 bg-[#ff6b35]/10 text-[#ff6b35] text-sm rounded"
                   
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#1a2332]">
                Genres & Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {author.genres.map(g => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-[#2ec4b6]/10 text-[#2ec4b6] text-sm rounded"
                   
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Authors Section */}
        {relatedAuthors.length > 0 && (
          <section className="bg-white rounded-lg border border-[#c9d1d9]/20 p-8 mb-8">
            <h2
              className="text-3xl font-normal mb-6 text-[#ff6b35]"
              style={{ fontFamily: 'var(--font-audiowide)' }}
            >
              RELATED AUTHORS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedAuthors.map(relatedAuthor => (
                <Link
                  key={relatedAuthor.id}
                  href={`/authors/${relatedAuthor.slug}`}
                  className="flex items-center gap-4 p-4 border border-[#c9d1d9]/20 rounded-lg hover:border-[#2ec4b6] transition-all duration-300"
                >
                  <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gradient-to-br from-[#1a2332] to-[#2a3a4a] flex items-center justify-center">
                    <span className="text-xl text-[#2ec4b6]" style={{ fontFamily: 'var(--font-audiowide)' }}>
                      {relatedAuthor.commonName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1a2332] mb-1">
                      {relatedAuthor.commonName}
                    </h3>
                    <p className="text-sm text-[#1a2332]/60">
                      {relatedAuthor.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Explore More Section */}
        <section className="bg-[#1a2332] rounded-lg p-8 text-center">
          <h2
            className="text-3xl font-normal mb-6 text-[#ff6b35]"
            style={{ fontFamily: 'var(--font-audiowide)' }}
          >
            EXPLORE MORE
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/free-library"
              className="px-6 py-3 bg-[#ff6b35] text-white font-semibold rounded-md hover:bg-[#e63946] transition-colors"
             
            >
              Read {author.commonName} Free
            </Link>
            <Link
              href="/audiobook-library"
              className="px-6 py-3 bg-[#2ec4b6] text-white font-semibold rounded-md hover:bg-[#2ec4b6]/90 transition-colors"
             
            >
              Listen to Audiobooks
            </Link>
            <Link
              href="/galleries"
              className="px-6 py-3 bg-white text-[#1a2332] font-semibold rounded-md hover:bg-[#c9d1d9] transition-colors"
             
            >
              Browse Cover Art
            </Link>
            <Link
              href="/authors"
              className="px-6 py-3 bg-transparent border-2 border-[#2ec4b6] text-[#2ec4b6] font-semibold rounded-md hover:bg-[#2ec4b6] hover:text-[#1a2332] transition-colors"
             
            >
              All Authors
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

// Generate static params for all authors
export async function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

// Metadata for SEO
export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const author = authors.find((a) => a.slug === params.slug);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.commonName} - Biography & Works | SF Supernova`,
    description: author.biographyExcerpt,
    openGraph: {
      title: `${author.commonName} - ${author.tagline}`,
      description: author.biographyExcerpt,
      type: 'profile',
    },
  };
}
