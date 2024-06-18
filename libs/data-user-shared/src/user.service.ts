import { dbClient, eq, inArray, or, sql } from '@lib/data-db-shared';
import type { DataRetrieval } from '@lib/data-model-shared';
import { genSaltSync, hashSync } from '@lib/data-util-shared';
import { type CreateUser, type User, UserTable } from './user.schema';

export const UserService = {
  async getByIdQuery(userId: string): Promise<DataRetrieval<User>> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, userId))
        .then((res) => res && res[0]);
      if (user) {
        return { success: true, data: user };
      }
    } catch (error) {
      console.error('Failed to fetch user by id', JSON.stringify(error));
      return { success: false, message: 'System error: Unable to fetch user by id.' };
    }
    return { success: true, message: 'User not found' };
  },
  async getByEmailQuery(email: string): Promise<DataRetrieval<User>> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(sql`LOWER(${UserTable.email}) = LOWER(${email})`)
        .then((res) => res && res[0]);
      if (user) {
        return { success: true, data: user };
      }
    } catch (error) {
      console.error('Failed to fetch user by email', JSON.stringify(error));
      return { success: false, message: 'System error: Unable to fetch user by email.' };
    }
    return { success: true, message: 'User not found' };
  },
  async getByPhoneQuery(phone: string): Promise<DataRetrieval<User>> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(eq(UserTable.phone, phone))
        .then((res) => res && res[0]);
      if (user) {
        return { success: true, data: user };
      }
    } catch (error) {
      console.error('Failed to fetch user by phone', JSON.stringify(error));
      return { success: false, message: 'System error: Unable to fetch user by phone.' };
    }
    return { success: true, message: 'User not found' };
  },
  async getByEmailOrPhoneQuery(email: string, phone: string): Promise<DataRetrieval<User>> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(or(sql`LOWER(${UserTable.email}) = LOWER(${email})`, eq(UserTable.phone, phone)))
        .then((res) => res && res[0]);
      if (user) {
        return { success: true, data: user };
      }
    } catch (error) {
      console.error('Failed to fetch user by email or phone', JSON.stringify(error));
      return { success: false, message: 'System error: Unable to fetch user by email or phone.' };
    }
    return { success: true, message: 'User not found' };
  },
  async getByIdsQuery(userIds: string[]): Promise<DataRetrieval<User[]>> {
    let users = undefined;
    try {
      users = await dbClient.select().from(UserTable).where(inArray(UserTable.id, userIds));
      if (users) {
        return { success: true, data: users };
      }
    } catch (error) {
      console.error('Failed to fetch user by ids', JSON.stringify(error));
      return { success: false, message: 'System error: Unable to fetch user by ids.' };
    }
    return { success: true, message: 'System error: Unable to fetch user by ids.' };
  },
  async createUser(data: Partial<CreateUser>): Promise<DataRetrieval<User>> {
    const result = await UserService.getByEmailQuery(data.email!);
    if (result.data) {
      return { success: false, message: 'Email is already in use' };
    }

    const salt = genSaltSync(10);
    const passwordHashed = hashSync(data.password!, salt);

    let insertedUser: User | undefined;
    try {
      insertedUser = await dbClient
        .insert(UserTable)
        .values({ ...data, password: passwordHashed } as User)
        .returning()
        .then((res) => res[0]);
    } catch (error) {
      console.error('Failed to create a user', JSON.stringify(error));
      return { success: false, message: 'System error: Unable to create user.' };
    }

    if (!insertedUser) {
      return { success: false, message: 'Failed to create a user' };
    }

    return { success: true, data: insertedUser };
  },
};
