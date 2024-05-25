import { defineConfig } from 'drizzle-kit';
import { dbEnv } from '@repo/ag-env';

export default defineConfig({
  schema: ['./node_modules/@repo/ag-user/src/schema'],
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbEnv.DB_URL,
  },
  verbose: true,
  strict: true,
});
