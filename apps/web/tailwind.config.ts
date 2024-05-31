import type { Config } from 'tailwindcss';
import baseConfig from '@repo/tailwind-config';

const config: Config = {
  ...baseConfig,
  content: ['./src/app/**/*.{ts,tsx,html}', '../../libs/**/src/**/*.{ts,tsx,html}'],
};
export default config;
