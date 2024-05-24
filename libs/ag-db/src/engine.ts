import { drizzle as dbEngine, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { dbEnv } from '@repo/nx-env';

// if in migration or seeding mode, only allow one connection, otherwise use the default
const maxConnection = dbEnv.DB_MIGRATING || dbEnv.DB_SEEDING ? 1 : undefined;
// if in seeding mode, suppress notices
// eslint-disable-next-line @typescript-eslint/no-empty-function
const quiteMode = dbEnv.DB_SEEDING ? () => {} : undefined;

export const connection = postgres(`${dbEnv.DB_URL}${dbEnv.DB_SSL ? '?sslmode=require' : ''}`, {
  max: maxConnection,
  onnotice: quiteMode,
});

// A promise to handle the dynamic import and database client initialization
const initializeDbClient = async (): Promise<PostgresJsDatabase<Record<string, unknown>>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let schema: any;
  try {
    const module = await import(dbEnv.DB_DIR);
    schema = module.default;
    console.log(schema);
  } catch (error) {
    console.error(`Failed to import module from path ${dbEnv.DB_DIR}:`, error);
  }

  // create a new instance of Drizzle
  return dbEngine(connection, {
    schema,
    logger: dbEnv.DB_DEBUG,
  });
};

// Immediately-invoked function to handle async initialization and export synchronously
let dbClient: PostgresJsDatabase<Record<string, unknown>>;
(async () => {
  dbClient = await initializeDbClient();
})();

export const dB = dbClient;

export type DbType = typeof dB;
