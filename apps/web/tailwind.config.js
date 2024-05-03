import baseConfig from '@repo/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    'src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
