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
            <p className="text-sm text-[#c9d1d9]/80 leading-relaxed">
              Exploring the golden age of science fiction through vintage pulps, radio dramas, and classic covers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#c9d1d9]">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/decades/1950s"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                >
                  1950s Space Age
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                >
                  Latest Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/audio"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                >
                  Radio Dramas
                </Link>
              </li>
              <li>
                <Link
                  href="/galleries"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                >
                  Cover Galleries
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#c9d1d9]">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-[#c9d1d9]/80 hover:text-[#ff6b35] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <span className="text-[#c9d1d9]/50 text-sm">
                  Contact <span className="text-[#ff6b35]/60 text-xs">(Coming Soon)</span>
                </span>
              </li>
              <li>
                <span className="text-[#c9d1d9]/50 text-sm">
                  Privacy Policy <span className="text-[#ff6b35]/60 text-xs">(Coming Soon)</span>
                </span>
              </li>
              <li>
                <span className="text-[#c9d1d9]/50 text-sm">
                  Affiliate Disclosure <span className="text-[#ff6b35]/60 text-xs">(Coming Soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#c9d1d9]">
              Connect
            </h4>
            <p className="text-sm text-[#c9d1d9]/50 mb-6">
              Social Media <span className="text-[#ff6b35]/60 text-xs">(Coming Soon)</span>
            </p>
            <p className="text-xs text-[#c9d1d9]/60 leading-relaxed">
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
