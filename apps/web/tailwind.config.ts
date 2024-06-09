import type { Config } from 'tailwindcss';
import baseConfig from '../../cfgs/tailwind';

const config: Config = {
  ...baseConfig,
  content: ['./src/**/*.{ts,tsx}', '../../libs/**/src/**/*.{ts,tsx}'],
};
export default config;
