import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { dbEnv } from '../env';

export const connection = postgres(dbEnv.DATABASE_URL, {
  max: dbEnv.DB_MIGRATING || dbEnv.DB_SEEDING ? 1 : undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onnotice: dbEnv.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type DbType = typeof db;

export default db;
