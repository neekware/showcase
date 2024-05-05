import baseConfig from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

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
