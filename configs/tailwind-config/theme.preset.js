/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: ['class'],
  themes: ['light', 'dark'],
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('./theme.plugin'),
  ],
};
