import { dbClient, eq, inArray, or, sql } from '@lib/data-db-shared';
import { genSaltSync, hashSync } from '@lib/data-util-shared';
import { type CreateUser, type User, UserTable } from './user.schema';

export const UserService = {
  async getByIdQuery(userId: string): Promise<Partial<User> | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, userId))
        .then((res) => res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by id.');
    }
    return user;
  },
  async getByEmailQuery(email: string): Promise<Partial<User> | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(sql`LOWER(${UserTable.email}) = LOWER(${email})`)
        .then((res) => res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by email.');
    }
    return user;
  },
  async getByPhoneQuery(phone: string): Promise<Partial<User> | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(eq(UserTable.phone, phone))
        .then((res) => res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by phone.');
    }
    return user;
  },
  async getByPhoneOrEmailQuery(phone: string, email: string): Promise<Partial<User> | undefined> {
    let user = undefined;
    try {
      user = await dbClient
        .select()
        .from(UserTable)
        .where(or(eq(UserTable.phone, phone), sql`LOWER(${UserTable.email}) = LOWER(${email})`))
        .then((res) => res[0]);
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error('System error: Unable to fetch user by phone.');
    }
    return user;
  },
  async getByIdsQuery(userIds: string[]): Promise<Partial<User>[]> {
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
  async createUser(user: Partial<CreateUser>): Promise<Partial<CreateUser>> {
    const salt = genSaltSync(10);
    const password = hashSync(user.password ?? '', salt);

    const [newUser] = await dbClient
      .insert(UserTable)
      .values({ ...user, password } as CreateUser)
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser as CreateUser;
    return userWithoutPassword;
  },
};
