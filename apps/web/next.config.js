/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@repo/ag-dto',
    '@repo/ag-env',
    '@repo/ag-db',
    '@repo/ag-logger',
    '@repo/ag-user',
    '@repo/ag-store',
    '@repo/nx-auth',
    '@repo/nx-util',
    '@repo/nx-ui-form',
    '@repo/nx-ui',
    '@repo/nx-ui-vendor',
  ],
};
