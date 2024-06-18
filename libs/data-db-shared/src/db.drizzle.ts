import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

interface DatabaseConfig {
  quiteMode?: (notice: postgres.Notice) => void;
  maxConnection: number;
  dbUrl: string;
  logger: boolean;
}

const getDbConfig = (): DatabaseConfig => {
  const dbUrl = process.env.DB_URL;
  if (!dbUrl) {
    throw new Error('DB_URL environment variable is required');
  }

  return {
    quiteMode: process.env.DB_SEEDING
      ? (notice: postgres.Notice) => console.log(notice)
      : undefined,
    maxConnection: process.env.DB_MIGRATING || process.env.DB_SEEDING ? 1 : 5, // Default max connections
    dbUrl: `${dbUrl}${process.env.DB_SSL ? '?sslmode=require' : ''}`,
    logger: Boolean(process.env.DB_DEBUG),
  };
};

const getDbConnection = (cfg: DatabaseConfig) => {
  return postgres(cfg.dbUrl, {
    max: cfg.maxConnection,
    onnotice: cfg.quiteMode,
  });
};

const getDatabaseInfo = () => {
  const dbCfg = getDbConfig();
  const dbConnection = getDbConnection(dbCfg);
  const dbClient = drizzle(dbConnection, { logger: dbCfg.logger });
  return { dbConnection, dbClient };
};

let dbConnection: ReturnType<typeof getDbConnection>;
let dbClient: ReturnType<typeof drizzle>;

const initializeDatabase = () => {
  if (!dbConnection || !dbClient) {
    const dbInfo = getDatabaseInfo();
    dbConnection = dbInfo.dbConnection;
    dbClient = dbInfo.dbClient;
  }
  return { dbConnection, dbClient };
};

// Initialize database connection and client
const { dbConnection: conn, dbClient: client } = initializeDatabase();
type DbType = typeof client;

// Export database connection and client
export { conn as dbConnection, client as dbClient, type DbType };
