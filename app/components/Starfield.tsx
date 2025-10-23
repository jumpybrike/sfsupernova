'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starfieldRef.current) return;

    // Create 200 stars with random positions and sizes
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Random size (1-3px)
      const size = Math.random() * 2 + 1;

      // Random animation delay for twinkling effect
      const delay = Math.random() * 3;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;

      stars.push(star);
      starfieldRef.current.appendChild(star);
    }

    // Cleanup function to remove stars on unmount
    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);

  return <div ref={starfieldRef} className="starfield" />;
}
