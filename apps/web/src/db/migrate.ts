import { connection, dB, migrate } from '@lib/data-db-shared';
import { dotEnvConfig } from '@lib/data-util-shared';
import config from '@web/db/config';

dotEnvConfig();

if (!process.env.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

async function main() {
  await migrate(dB, { migrationsFolder: config.out ?? '' });
  await connection.end();
}

main().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
