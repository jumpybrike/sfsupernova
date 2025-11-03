interface ImageSkeletonProps {
  className?: string;
}

export default function ImageSkeleton({ className = '' }: ImageSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'shimmer 2s ease-in-out infinite',
      }}
    >
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
      `}</style>
    </div>
  );
}
