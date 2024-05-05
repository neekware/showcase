import baseConfig from '@repo/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    '../../libs/util/src/**/*.{ts,tsx}',
    '../../libs/vendor-ui/src/**/*.{ts,tsx}',
    '../../libs/ui/src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
};
