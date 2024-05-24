import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { type TypeOf, z } from 'zod';
import { getEnv, stringBoolean } from './util';

const DbEnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('user'),
  DB_PASSWORD: z.string().default('password'),
  DB_NAME: z.string().default('database'),
  DB_PORT: z.coerce.number().default(5432),
  DB_URL: z.string().default(''),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
});

export type DbEnv = TypeOf<typeof DbEnvSchema>;

expand(config());

export const dbEnv = getEnv(DbEnvSchema);
