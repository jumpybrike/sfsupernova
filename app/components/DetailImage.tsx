'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageSkeleton from './ImageSkeleton';

interface DetailImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function DetailImage({
  src,
  alt,
  className = '',
  priority = true
}: DetailImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`w-full aspect-[2/3] bg-gradient-to-br from-[#00ffaa]/20 to-[#4facfe]/20 flex flex-col items-center justify-center ${className}`}>
        <svg
          className="w-16 h-16 mb-4 text-[#00ffaa]/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-[#00ffaa] font-['Space_Mono'] text-sm">Image unavailable</p>
        <p className="text-gray-500 font-['Space_Mono'] text-xs mt-2">Failed to load image</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {isLoading && <ImageSkeleton className="absolute inset-0 w-full h-full" />}
      <Image
        src={src}
        alt={alt}
        width={800}
        height={1200}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
