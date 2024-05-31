import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config();

if (!process.env.DB_URL) {
  throw new Error(`DB_URL environment variable is required ${process.env}`);
}

// if in migration or seeding mode, only allow one connection, otherwise use the default
const maxConnection = process.env.DB_MIGRATING || process.env.DB_SEEDING ? 1 : undefined;
// if in seeding mode, suppress notices
// eslint-disable-next-line @typescript-eslint/no-empty-function
const quiteMode = process.env.DB_SEEDING ? () => {} : undefined;

export const connection = postgres(
  `${process.env.DB_URL}${process.env.DB_SSL ? '?sslmode=require' : ''}`,
  {
    max: maxConnection,
    onnotice: quiteMode,
  }
);

// create a new instance of Drizzle
export const dB = drizzle(connection, {
  logger: !!process.env.DB_DEBUG,
});

export type DbType = typeof dB;
