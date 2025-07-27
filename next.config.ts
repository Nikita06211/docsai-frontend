import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove output: 'export' to enable SSR and API routes
  trailingSlash: true,
  images: {
    unoptimized: true, // opt out of Next.js Image optimization
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
