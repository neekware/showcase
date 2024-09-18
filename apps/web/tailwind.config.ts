import type { Config } from 'tailwindcss';
import baseConfig from '../../cfgs/tailwind';

const config: Config = {
  ...baseConfig,
  content: [
    './src/**/*.{ts,tsx}',
    '../../libs/ui-auth-next/src/**/*.tsx',
    '../../libs/ui-layout-next/src/**/*.{ts,tsx}',
    '../../libs/ui-vendor-next/src/**/*.{ts,tsx}',
  ],
};
export default config;
