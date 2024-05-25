'use server';

import { AuthService } from './auth';
import { LoginFormDataSchema, LoginInputs } from './schema';

export async function loginServerFunction(data: LoginInputs) {
  console.log('Login data:', data.email, data.password);
  const result = LoginFormDataSchema.safeParse(data);

  if (result.error) {
    return { success: false, error: result.error.format() };
  }

  return AuthService.login(result.data);
}
