import type { Config } from 'tailwindcss';
import baseConfig from '../../cfgs/tailwind/tailwind.config';

const config: Config = {
  ...baseConfig,
  content: [
    './src/app/www/src/**/*.{ts,tsx}',
    '../../libs/util/src/**/*.{ts,tsx}',
    '../../libs/vendor-ui/src/**/*.{ts,tsx}',
    '../../libs/ui/src/**/*.{ts,tsx}',
  ],
};
export default config;
