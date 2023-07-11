const tailwindPreset = require('tailwind-config/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindPreset],
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
};

export default config;
