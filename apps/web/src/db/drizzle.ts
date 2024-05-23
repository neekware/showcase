import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { dbEnv } from '@web/env';
import * as schema from './schema';

const DEBUG = false;

// if in migration or seeding mode, only allow one connection, otherwise use the default
const maxConnection = dbEnv.DB_MIGRATING || dbEnv.DB_SEEDING ? 1 : undefined;
// if in seeding mode, suppress notices
// eslint-disable-next-line @typescript-eslint/no-empty-function
const quiteMode = dbEnv.DB_SEEDING ? () => {} : undefined;

export const connection = postgres(`${dbEnv.DB_URL}?sslmode=require`, {
  max: maxConnection,
  onnotice: quiteMode,
});

// create a new instance of Drizzle
export const dB = drizzle(connection, {
  schema,
  logger: DEBUG,
});

// export the database object type
export type DbType = typeof dB;
