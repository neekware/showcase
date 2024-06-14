import * as dotenv from 'dotenv';
import path from 'path';
import config from '@web/db/config';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function doMigrate() {
  const { dbClient, dbConnection, migrate } = await import('@lib/data-db-shared');

  await migrate(dbClient, { migrationsFolder: config.out ?? '' });
  await dbConnection.end();
}

doMigrate().catch((error) => {
  console.error('Migration error:', error);
  throw error;
});
