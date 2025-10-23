import type { Metadata } from "next";
import { Audiowide, Inter, Courier_Prime } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";

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
    <html lang="en">
      <body
        className={`${audiowide.variable} ${inter.variable} ${courierPrime.variable} antialiased`}
      >
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
