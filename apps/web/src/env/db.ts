import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z, ZodError } from 'zod';

const stringBoolean = z.coerce
  .string()
  .transform((val) => val === 'true')
  .default('false');

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('user'),
  DB_PASSWORD: z.string().default('password'),
  DB_NAME: z.string().default('database'),
  DB_PORT: z.coerce.number().default(5432),
  DATABASE_URL: z.string().default(''),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
});

type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

const getDbEnv = (): EnvSchema => {
  try {
    return EnvSchema.parse(process.env);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = 'Missing required values in .env:\n';
      error.issues.forEach((issue) => {
        message += `${String(issue.path[0])}\n`;
      });
      const e = new Error(message);
      e.stack = '';
      // eslint-disable-next-line no-console
      console.error(e);
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    // Return default values if parsing fails
    return EnvSchema.parse({});
  }
};

export const dbEnv = getDbEnv();
