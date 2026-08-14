import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper Vercel deployment
  output: 'standalone',
  // Enable trailing slashes to match routes
  trailingSlash: false,
  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
