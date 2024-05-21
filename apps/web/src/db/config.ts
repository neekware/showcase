import { defineConfig } from 'drizzle-kit';
// import { dbEnv } from '../env';

// console.log('DB URL:', dbEnv.DATABASE_URL); // Debug log

export const dbConfig = defineConfig({
  schema: './schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
});
