import type { Config } from 'tailwindcss';
import baseConfig from '@repo/tailwind-config';

const config: Config = {
  ...baseConfig,
  content: [
    './src/app/**/*.{ts,tsx,html}',
    '../../libs/nx-util/src/**/*.{ts,tsx,html}',
    '../../libs/nx-ui-vendor/src/**/*.{ts,tsx,html}',
    '../../libs/nx-ui/src/**/*.{ts,tsx,html}',
  ],
};
export default config;
