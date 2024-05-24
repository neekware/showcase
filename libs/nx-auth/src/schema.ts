import { z } from 'zod';
import { authEnv } from '@repo/nx-env';

export const LoginFormDataSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(authEnv.PASSWORD_MIN_LEN, `Password must be ${authEnv.PASSWORD_MIN_LEN}+ characters`),
});

export type LoginInputs = z.infer<typeof LoginFormDataSchema>;

export const RegisterFormDataSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(
      authEnv.FIRST_NAME_MIN_LEN,
      `First name must be ${authEnv.FIRST_NAME_MIN_LEN}+ characters`
    ),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(authEnv.LAST_NAME_MIN_LEN, `Last name must be ${authEnv.LAST_NAME_MIN_LEN}+ characters`),

  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\(?([2-9][0-9]{2})\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/, 'Invalid phone number'), // NANP format
  password: z
    .string()
    .min(1, 'Password is required')
    .min(authEnv.PASSWORD_MIN_LEN, `Password must be ${authEnv.PASSWORD_MIN_LEN}+ characters`),
});

export type RegisterInputs = z.infer<typeof RegisterFormDataSchema>;
