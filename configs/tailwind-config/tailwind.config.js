/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '../../apps/web/**/*.{ts,tsx,mdx}',
    '../../packages/**/*.{ts,tsx,mdx}',
  ],
  themes: ['light', 'dark'],
  plugins: [],
};
