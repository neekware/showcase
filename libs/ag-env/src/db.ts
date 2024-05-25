import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { type TypeOf, z } from 'zod';
import { getEnv, stringBoolean } from './util';

const DbEnvSchema = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('user'),
  DB_PASSWORD: z.string().default('password'),
  DB_NAME: z.string().default('database'),
  DB_PORT: z.coerce.number().default(5432),
  DB_URL: z.string().default(''),
  DB_SSL: stringBoolean,
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
  DB_DEBUG: stringBoolean,
});

export type DbEnv = TypeOf<typeof DbEnvSchema>;

expand(config());

export const dbEnv = getEnv(DbEnvSchema);
