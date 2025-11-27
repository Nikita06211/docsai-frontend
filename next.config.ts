import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    KINDE_SITE_URL:
      process.env.KINDE_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.CF_PAGES_URL),
    KINDE_POST_LOGIN_REDIRECT_URL:
      process.env.KINDE_POST_LOGIN_REDIRECT_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/dashboard`
        : process.env.CF_PAGES_URL
          ? `${process.env.CF_PAGES_URL}/dashboard`
          : undefined),
    KINDE_POST_LOGOUT_REDIRECT_URL:
      process.env.KINDE_POST_LOGOUT_REDIRECT_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.CF_PAGES_URL),
  },
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
