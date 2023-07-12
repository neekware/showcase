const animatePlugin = require('tailwindcss-animate');
const themePlugin = require('theme.plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: ['class'],
  themes: ['light', 'dark'],
  plugins: [animatePlugin, themePlugin],
};
