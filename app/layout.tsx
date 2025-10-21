import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${spaceMono.variable} antialiased scanlines`}
        style={{ fontFamily: 'var(--font-space-mono), monospace' }}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
