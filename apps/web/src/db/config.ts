import path from 'path';
import { defineConfig } from '@lib/data-db-shared';

// get db url or throw error
if (!process.env.DB_URL) {
  throw new Error('You must set DB_URL in your environment');
}

export default defineConfig({
  schema: [path.resolve(__dirname, '../../../../libs/**/*.schema.ts')],
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
