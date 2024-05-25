/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@repo/ag-env',
    '@repo/ag-db',
    '@repo/ag-dto',
    '@repo/ag-user',
    '@repo/ag-logger',
    '@repo/ag-store',
    '@repo/nx-auth',
    '@repo/nx-ui',
    '@repo/nx-ui-vendor',
    '@repo/nx-util',
  ],
};
