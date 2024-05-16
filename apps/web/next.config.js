/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/util', '@repo/ui', '@repo/logger', '@repo/vendor-ui'],
};
