import type { Config } from 'tailwindcss';

import { themePreset } from './theme.preset';

const config: Config = {
  presets: [themePreset],
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
};

export default config;
