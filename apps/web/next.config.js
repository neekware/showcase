// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  reactStrictMode: true,
  transpilePackages: ['@repo/util', '@repo/ui', '@repo/logger', '@repo/vendor-ui'],
});
