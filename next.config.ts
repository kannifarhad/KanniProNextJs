import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  transpilePackages: ["next-mdx-remote"],
  experimental: {
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    // domains:[]
  },
};

export default nextConfig;
