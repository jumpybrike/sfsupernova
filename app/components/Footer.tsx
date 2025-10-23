import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2332] border-t border-[#c9d1d9]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo/logo-mono-white.svg"
                alt="SF Supernova"
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-[#c9d1d9]/80 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              Exploring the golden age of science fiction through vintage pulps, radio dramas, and classic covers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#c9d1d9]" style={{ fontFamily: 'var(--font-inter)' }}>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/decades/1950s"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  1950s Space Age
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Latest Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/audio"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Radio Dramas
                </Link>
              </li>
              <li>
                <Link
                  href="/galleries"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Cover Galleries
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#c9d1d9]" style={{ fontFamily: 'var(--font-inter)' }}>
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Affiliate Disclosure
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#c9d1d9]" style={{ fontFamily: 'var(--font-inter)' }}>
              Connect
            </h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-[#c9d1d9] hover:text-[#ff6b35] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-[#c9d1d9]/60 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
              As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>

        <div className="border-t border-[#c9d1d9]/20 mt-12 pt-8">
          <p className="text-center text-sm text-[#c9d1d9]/60" style={{ fontFamily: 'var(--font-courier-prime)' }}>
            &copy; {currentYear} SF Supernova. All rights reserved. Built with love for vintage sci-fi fans.
          </p>
        </div>
      </div>
    </footer>
  );
}
