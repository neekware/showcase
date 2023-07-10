import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

import { themePlugin } from './theme.plugin';

export const themePreset = {
  content: [],
  darkMode: ['class'],
  plugins: [animatePlugin, themePlugin],
} satisfies Config;
