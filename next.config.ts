import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",

  output: "export",

  images: {
    unoptimized: true,
  },

  trailingSlash: false,
};

export default nextConfig;
