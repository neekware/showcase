import * as dotenv from 'dotenv';
import { dbClient, dbConnection, migrate } from '@lib/data-db-shared';
import config from '@web/db/config';

dotenv.config();

async function doMigrate() {
  await migrate(dbClient, { migrationsFolder: config.out ?? '' });
  await dbConnection.end();
}

doMigrate().catch((error) => {
  console.error('Migration error:', error);
  throw error;
});
