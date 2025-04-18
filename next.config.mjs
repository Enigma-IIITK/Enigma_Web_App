/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

export default {
    async rewrites() {
      return [
        {
          source: '/vishnu/:path*', // Match all paths under /vishnu
          destination: '/api/vishnu/:path*', // Forward to the proxy API route
        },
      ];
    },
  };