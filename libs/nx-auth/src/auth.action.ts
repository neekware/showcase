'use server';

import { LoginFormInputs, LoginFormModel } from './login.model';

export async function loginServerAction(data: LoginFormInputs) {
  const result = LoginFormModel.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
