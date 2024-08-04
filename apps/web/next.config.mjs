import * as dotenv from 'dotenv';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // bundlePagesRouterDependencies: true,
  // serverExternalPackages: ['@mdi/js'],
  experimental: {
    reactCompiler: true,
    after: true,
  },
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_ISSUER: process.env.AUTH_ISSUER,
    SITE_URL: process.env.SITE_URL,
    DB_DEBUG: process.env.DB_DEBUG,
  },
};

export default nextConfig;
