import type { Config } from 'tailwindcss';
import baseConfig from '@repo/tailwind-config';

const config: Config = {
  ...baseConfig,
  content: [
    '../../libs/util/src/**/*.{ts,tsx}',
    '../../libs/vendor-ui/src/**/*.{ts,tsx}',
    '../../libs/ui/src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
};
export default config;
