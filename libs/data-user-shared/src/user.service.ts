import { dbClient, eq, inArray, or, sql } from '@lib/data-db-shared';
import { genSaltSync, hashSync } from '@lib/data-util-shared';
import { type CreateUser, type User, UserTable } from './user.schema';

export const UserService = {
  async getByIdQuery(userId: string): Promise<User | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, userId))
        .then((res) => res && res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by id.');
    }
    return user;
  },
  async getByEmailQuery(email: string): Promise<User | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(sql`LOWER(${UserTable.email}) = LOWER(${email})`)
        .then((res) => res && res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by email.');
    }
    return user;
  },
  async getByPhoneQuery(phone: string): Promise<User | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(eq(UserTable.phone, phone))
        .then((res) => res && res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by phone.');
    }
    return user;
  },
  async getByEmailOrPhoneQuery(email: string, phone: string): Promise<User | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(or(sql`LOWER(${UserTable.email}) = LOWER(${email})`, eq(UserTable.phone, phone)))
        .then((res) => res && res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by phone.');
    }
    return user;
  },
  async getByIdsQuery(userIds: string[]): Promise<User[] | undefined> {
    let users = undefined;
    try {
      users = await dbClient.select().from(UserTable).where(inArray(UserTable.id, userIds));
      if (users) {
        return users;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by phone.');
    }
    return users;
  },
  async createUser(data: Partial<CreateUser>): Promise<CreateUser | undefined> {
    console.log('Creating user', data);

    try {
      const user = await UserService.getByEmailQuery(data.email!);
      if (user) {
        throw new Error('Email is already in use');
      }
    } catch (error) {
      throw new Error('System Error: Unable to create user.');
    }

    try {
      const user = await UserService.getByPhoneQuery(data.phone!);
      if (user) {
        throw new Error('Phone is already in use');
      }
    } catch (error) {
      throw new Error('System Error: Unable to create user.');
    }

    const salt = genSaltSync(10);
    const passwordHashed = hashSync(data.password!, salt);

    console.log('Creating user', data);

    let insertedUser: User | undefined;
    try {
      insertedUser = await dbClient
        .insert(UserTable)
        .values({ ...data, password: passwordHashed } as User)
        .returning()
        .then((res) => res[0]);
    } catch (error) {
      console.error('Failed to create a user', error);
      throw new Error('System error: Unable to create user.');
    }

    if (!insertedUser) {
      throw new Error(' Unable to create user.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = insertedUser;
    return userWithoutPassword;
  },
};
