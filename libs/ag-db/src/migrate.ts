import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { dbEnv } from '@repo/nx-env';
import config from './config';
import { connection, dB } from './engine';

if (!dbEnv.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

async function main() {
  await migrate(dB, { migrationsFolder: config.out });
  await connection.end();
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
