import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

export const AUTH_MIN_LEN_PASSWORD = 6;
export const AUTH_MIN_LEN_FIRST_NAME = 2;
export const AUTH_MIN_LEN_LAST_NAME = 2;

const validatePhoneNumber = (value: string | undefined) => {
  if (!value) return true; // Allow empty value
  const phoneNumber = parsePhoneNumberFromString(value);

  // Fallback regex for more inclusive validation
  const fallbackRegex = /^\(?([2-9][0-9]{2})\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/;

  return phoneNumber?.isValid() || fallbackRegex.test(value);
};

export const LoginFormModel = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(AUTH_MIN_LEN_PASSWORD, `Password must be ${AUTH_MIN_LEN_PASSWORD}+ characters`),
});

export type LoginFormInputs = z.infer<typeof LoginFormModel>;

export const RegistrationFormModel = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(AUTH_MIN_LEN_FIRST_NAME, `First name must be ${AUTH_MIN_LEN_FIRST_NAME}+ characters`),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(AUTH_MIN_LEN_LAST_NAME, `Last name must be ${AUTH_MIN_LEN_LAST_NAME}+ characters`),

  email: z.string().min(1, 'Email is required').email('Invalid email address'),

  phone: z.string().optional().refine(validatePhoneNumber, { message: 'Invalid phone number' }),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(AUTH_MIN_LEN_PASSWORD, `Password must be ${AUTH_MIN_LEN_PASSWORD}+ characters`),
});

export type RegisterFormInputs = z.infer<typeof RegistrationFormModel>;
