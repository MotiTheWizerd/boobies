import type { NextConfig } from "next";
import path from "path"; // Import path module

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add Webpack configuration for alias
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}), // Preserve existing aliases
      "@": path.resolve(__dirname), // Map @ to project root
    };
    return config;
  },
};

export default nextConfig;
