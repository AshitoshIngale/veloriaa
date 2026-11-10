import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel-ready: no standalone output, no database, no extra config needed. */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  devIndicators: false,
  images: {
    /* Serve modern formats to every supporting browser — noticeably smaller
       than the source JPEGs at identical visual quality. */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
