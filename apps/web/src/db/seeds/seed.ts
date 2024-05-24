import { getTableName, sql, type Table } from 'drizzle-orm';
import { PostgresError } from 'postgres';
import { dbEnv } from '@repo/nx-env';
import { connection, dB, type DbType } from '../drizzle';
import { user } from '../schema';
import { seedUser } from './seeder/user';

if (!dbEnv.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: DbType, table: Table) {
  const tableName = getTableName(table);
  try {
    await db.execute(sql.raw(`TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`));
  } catch (error: unknown) {
    if (error instanceof PostgresError && error.message.includes('does not exist')) {
      // eslint-disable-next-line no-console
      console.warn(`Table "${tableName}" does not exist. Skipping truncate.`);
    } else {
      throw error;
    }
  }
}

const seedAll = async (db: DbType) => {
  for (const table of [user]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seedUser(db);

  await connection.end();
};

seedAll(dB).catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
