import type { Metadata } from "next";
import { Audiowide, Inter, Courier_Prime, Abril_Fatface, Righteous, Bebas_Neue, Bungee, Merriweather, Oswald, Source_Sans_3, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import ScrollToTop from "./components/ScrollToTop";

// Approved Typography - Audiowide for display/headings
const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
});

// Inter for body text and UI
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Courier Prime for monospace/metadata
const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Decade-specific fonts
// 1930s-1940s Art Deco style
const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  subsets: ["latin"],
  weight: ["400"],
});

// 1960s Groovy/Psychedelic style
const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: ["400"],
});

// 1970s Bold/Experimental style
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

// Pulp Magazine fonts
const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: ["400"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["600"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

// Atomic Age fonts
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SF Supernova - Vintage Science Fiction Hub",
  description: "Explore the golden age of science fiction through vintage pulps, radio dramas, classic covers, and in-depth reviews of sci-fi's greatest works.",
  keywords: ["science fiction", "vintage sci-fi", "pulp fiction", "radio dramas", "sci-fi reviews", "classic covers"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${audiowide.variable} ${inter.variable} ${courierPrime.variable} ${abrilFatface.variable} ${righteous.variable} ${bebasNeue.variable} ${bungee.variable} ${merriweather.variable} ${oswald.variable} ${sourceSans.variable} ${poppins.variable} antialiased`}
      >
        <ScrollToTop />
        <Starfield />
        <Navigation />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
