import * as dotenv from 'dotenv';
import {
  dbClient,
  dbConnection,
  getTableName,
  postgres,
  sql,
  type Table,
} from '@lib/data-db-shared';
import { UserTable } from '@lib/data-user-shared';
import { seedUser } from './seeder/user';

dotenv.config();

if (!process.env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function resetTable(db: any, table: Table) {
  const tableName = getTableName(table);
  try {
    await dbClient.execute(sql.raw(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`));
  } catch (error: unknown) {
    if (error instanceof postgres.PostgresError && error.message.includes('does not exist')) {
      // eslint-disable-next-line no-console
      console.warn(`Table "${tableName}" does not exist. Skipping truncate.`);
    } else {
      throw error;
    }
  }
}

const seedAll = async () => {
  for (const table of [UserTable]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(dbClient, table);
  }

  await seedUser();

  await dbConnection.end();
};

seedAll().catch((error) => {
  console.error('Seeding error:', error);
  throw error;
});
