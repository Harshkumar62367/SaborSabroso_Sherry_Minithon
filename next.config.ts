import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [new URL('https://myawsbucket79403825.s3.eu-north-1.amazonaws.com/sherry1.png')],
  },
};

export default nextConfig;
