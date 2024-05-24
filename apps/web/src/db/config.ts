import { defineConfig } from 'drizzle-kit';
import { dbEnv } from '@repo/nx-env';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbEnv.DB_URL,
  },
  verbose: true,
  strict: true,
});
