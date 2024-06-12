import * as dotenv from 'dotenv';
import { defineConfig } from '@lib/data-db-shared';

dotenv.config();

// get db url or throw error
if (!process.env.DB_URL) {
  throw new Error('You must set DB_URL in your environment');
}

export default defineConfig({
  schema: ['./node_modules/@repo/ag-user/src/schema'],
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
