import * as dotenv from 'dotenv';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    SITE_URL: process.env.SITE_URL,
    DB_DEBUG: process.env.DB_DEBUG,
  },
};

export default nextConfig;
