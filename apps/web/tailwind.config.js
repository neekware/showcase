const tailwindPreset = require('tailwind-config/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindPreset],
  content: ['../../packages/**/*.{tx,tsx}', '../**/*.{ts,tsx}'],
};
