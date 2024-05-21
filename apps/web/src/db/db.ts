import { drizzle } from 'drizzle-orm/pg';
import { Client } from 'pg';
import * as schema from './schema';

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Add this if you have a custom port
});

await client.connect();

export const db = drizzle(client, { schema });
