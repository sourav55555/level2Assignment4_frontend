import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tastyc.bslthemes.com",   // ← corrected
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",   // ← corrected
      },
    ],
  },
};

export default nextConfig;
