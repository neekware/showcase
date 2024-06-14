import * as dotenv from 'dotenv';
import { dbClient, dbConnection, migrate } from '@lib/data-db-shared';
import config from '@web/db/config';

dotenv.config();

if (!process.env.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

async function doMigrate() {
  await migrate(dbClient, { migrationsFolder: config.out ?? '' });
  await dbConnection.end();
}

doMigrate().catch((error) => {
  console.error('Migration error:', error);
  throw error;
});
