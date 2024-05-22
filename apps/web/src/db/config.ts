import { defineConfig } from 'drizzle-kit';
import { dbEnv } from '@web/env';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbEnv.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
