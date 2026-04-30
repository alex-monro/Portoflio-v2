import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Add your WordPress hostname here when ready, e.g.:
      // { protocol: "https", hostname: "cms.yoursite.com" },
    ],
  },
};

export default nextConfig;
