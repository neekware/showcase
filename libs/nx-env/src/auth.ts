import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { type TypeOf, z } from 'zod';
import { getEnv } from './util';

const AuthEnvSchema = z.object({
  PASSWORD_MIN_LEN: z.number().default(8),
  FIRST_NAME_MIN_LEN: z.number().default(2),
  LAST_NAME_MIN_LEN: z.number().default(2),
});

export type AuthEnv = TypeOf<typeof AuthEnvSchema>;

expand(config());

export const authEnv = getEnv(AuthEnvSchema);
