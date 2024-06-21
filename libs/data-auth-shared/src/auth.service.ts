import {
  type DataRetrieval,
  type LoginFormInputs,
  type RegisterFormInputs,
} from '@lib/data-model-shared';
import { type User, UserService } from '@lib/data-user-shared';
import { compareSync } from '@lib/data-util-shared';

if (!process.env.AUTH_SECRET) {
  throw new Error('You must set AUTH_SECRET in your environment');
}

if (!process.env.AUTH_ISSUER) {
  throw new Error('You must set AUTH_ISSUER in your environment');
}

export const AuthService = {
  async login(data: LoginFormInputs): Promise<DataRetrieval<User>> {
    const result = await UserService.getByEmailQuery(data.email);
    if (!result?.success || !result.data) {
      return { success: false, message: `Invalid user or password` };
    }

    const { data: user } = result;
    const validPassword = compareSync(data.password, user.password);
    if (!validPassword) {
      return { success: false, message: `Invalid user or password` };
    }

    return { success: true, data: user };
  },
  async register(data: RegisterFormInputs): Promise<DataRetrieval<User>> {
    const result = await UserService.getByEmailQuery(data.email);
    if (!result?.success) return result;

    return await UserService.createUser({ ...data, isActive: true });
  },
};
