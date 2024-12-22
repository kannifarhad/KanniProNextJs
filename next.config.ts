import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
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
