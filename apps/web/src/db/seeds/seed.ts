import { getTableName, sql, type Table } from 'drizzle-orm';
import { PostgresError } from 'postgres';
import { connection, dB } from '@repo/ag-db';
import { dbEnv } from '@repo/nx-env';
import { user } from '../schema';
import { seedUser } from './seeder/user';

if (!dbEnv.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function resetTable(db: any, table: Table) {
  const tableName = getTableName(table);
  try {
    await dB.execute(sql.raw(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`));
  } catch (error: unknown) {
    if (error instanceof PostgresError && error.message.includes('does not exist')) {
      // eslint-disable-next-line no-console
      console.warn(`Table "${tableName}" does not exist. Skipping truncate.`);
    } else {
      throw error;
    }
  }
}

const seedAll = async () => {
  for (const table of [user]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(dB, table);
  }

  await seedUser();

  await connection.end();
};

seedAll().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
