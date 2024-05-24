import { defineConfig } from 'drizzle-kit';
import { dbEnv } from '@repo/nx-env';

export default defineConfig({
  schema: `${dbEnv.DB_DIR}/schema/index.ts`,
  out: `${dbEnv.DB_DIR}/migrations`,
  dialect: 'postgresql',
  dbCredentials: {
    url: dbEnv.DB_URL,
  },
  verbose: true,
  strict: true,
});
