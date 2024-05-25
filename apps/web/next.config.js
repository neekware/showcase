/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@repo/ag-db',
    '@repo/ag-dto',
    '@repo/ag-logger',
    '@repo/ag-store',
    '@repo/nx-auth',
    '@repo/nx-env',
    '@repo/nx-ui',
    '@repo/nx-ui-vendor',
    '@repo/nx-util',
  ],
};
