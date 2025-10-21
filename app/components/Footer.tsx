import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-primary/30 bg-dark-purple/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-primary" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SF SUPERNOVA
            </h4>
            <p className="text-sm text-foreground/70">
              Exploring the golden age of science fiction through vintage pulps, radio dramas, and classic covers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-retro-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/decades/1950s" className="text-foreground/70 hover:text-primary transition-colors">
                  1950s Space Age
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-foreground/70 hover:text-primary transition-colors">
                  Latest Reviews
                </Link>
              </li>
              <li>
                <Link href="/audio" className="text-foreground/70 hover:text-primary transition-colors">
                  Radio Dramas
                </Link>
              </li>
              <li>
                <Link href="/galleries" className="text-foreground/70 hover:text-primary transition-colors">
                  Cover Galleries
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-retro-pink" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  Affiliate Disclosure
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Credits */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Connect
            </h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-foreground/50">
              As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {currentYear} SF Supernova. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Dedicated to preserving and celebrating the golden age of science fiction.
          </p>
        </div>
      </div>
    </footer>
  );
}
