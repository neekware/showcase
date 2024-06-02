/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    '@repo/ag-dto',
    '@repo/ag-db',
    '@repo/ag-logger',
    '@repo/ag-user',
    '@repo/ag-util',
    '@repo/nx-auth',
    '@repo/nx-util',
    '@repo/nx-ui-form',
    '@repo/nx-ui',
    '@repo/nx-ui-vendor',
  ],
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve = {
  //       ...config.resolve,
  //       fallback: {
  //         net: false,
  //         dns: false,
  //         tls: false,
  //         assert: false,
  //         path: false,
  //         fs: false,
  //         events: false,
  //         process: false,
  //         perf_hooks: false,
  //       },
  //     };
  //   }
  //   return config;
  // },
};
