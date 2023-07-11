import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

import { themePlugin } from './theme.plugin';

export const themePreset = {
  content: [],
  darkMode: ['class'],
  themes: ['light', 'dark'],
  plugins: [animatePlugin, themePlugin],
} satisfies Config;
