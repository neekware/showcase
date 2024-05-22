import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './db';
import { dbEnv } from '../env';
import config from './config';

if (!dbEnv.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

async function main() {
  await migrate(db, { migrationsFolder: config.out ?? './src/db/migrations' });
  await connection.end();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
