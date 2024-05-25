import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { type TypeOf, z } from 'zod';
import { getEnv } from './util';

const SysEnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  AUTH_SECRET: z.string(),
});

export type SysEnv = TypeOf<typeof SysEnvSchema>;

expand(config());

export const sysEnv = getEnv(SysEnvSchema);
