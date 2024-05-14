import type { Config } from 'tailwindcss';
import baseConfig from '@repo/tailwind-config';

const config: Config = {
  ...baseConfig,
  content: [
    './src/app/**/*.{ts,tsx,html}',
    '../../libs/util/src/**/*.{ts,tsx,html}',
    '../../libs/vendor-ui/src/**/*.{ts,tsx,html}',
    '../../libs/ui/src/**/*.{ts,tsx,html}',
  ],
};
export default config;
