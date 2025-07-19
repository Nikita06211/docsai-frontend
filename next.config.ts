import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true, // This will skip ESLint during build
  },
  typescript: {
    ignoreBuildErrors: false, // Keep TypeScript checking
  }
};

export default nextConfig;