import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import path from 'node:path';
import fs from 'node:fs';

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const db = drizzle(pool);

async function main() {
  const migrationsFolder = path.join(__dirname, 'migrations');
  const journalPath = path.join(migrationsFolder, '_journal.json');

  if (!fs.existsSync(journalPath)) {
    throw new Error(`Can't find ${journalPath} file`);
  }

  const start = Date.now();
  await migrate(db, { migrationsFolder });
  const end = Date.now();

  // eslint-disable-next-line no-console
  console.log(`✅ Migrations completed in ${(end - start).toString()}ms`);

  process.exit(0);
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error('❌ Migration failed', error);
  process.exit(1);
});
