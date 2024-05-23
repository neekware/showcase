/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/nx-util', '@repo/nx-ui', '@repo/ag-logger', '@repo/vendor-ui'],
};
