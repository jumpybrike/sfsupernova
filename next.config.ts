import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.networklayer.co.uk',
        pathname: '/SFSupernova/images/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'nss.org',
        pathname: '/settlement/nasa/**',
      },
      {
        protocol: 'https',
        hostname: 'lon1.digitaloceanspaces.com',
        pathname: '/networklayer-cdn/SFSupernova/**',
      },
    ],
  },
};

export default nextConfig;
