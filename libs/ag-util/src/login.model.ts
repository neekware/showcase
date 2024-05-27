import { z } from 'zod';
import { PASSWORD_MIN_LEN } from '@repo/ag-dto';

export const LoginFormModel = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(PASSWORD_MIN_LEN, `Password must be ${PASSWORD_MIN_LEN}+ characters`),
});

export type LoginFormInputs = z.infer<typeof LoginFormModel>;
