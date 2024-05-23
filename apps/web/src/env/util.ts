/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type TypeOf, z, ZodError, type ZodSchema } from 'zod';

export const stringBoolean = z.coerce
  .string()
  .transform((val) => val === 'true')
  .default('false');

export const getEnv = <T extends ZodSchema>(schema: T): TypeOf<T> => {
  try {
    return schema.parse(process.env) as TypeOf<T>;
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
    return schema.parse({}) as TypeOf<T>;
  }
};
