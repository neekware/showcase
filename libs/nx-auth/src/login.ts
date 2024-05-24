'use server';

import { AuthService } from './auth';
import { LoginFormDataSchema, LoginInputs } from './schema';

export async function loginServerFunction(data: LoginInputs) {
  const result = LoginFormDataSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }

  AuthService.login(result.data);
}
