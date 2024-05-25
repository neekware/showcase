import { genSaltSync, hashSync } from 'bcryptjs';
import { eq, inArray, or } from 'drizzle-orm';
import { dB } from '@repo/ag-db';
import { CreateUser, User, UserTable } from '../schema/user';

export const UserDbService = {
  async getByIdQuery(userId: string): Promise<Partial<User> | undefined> {
    const users = await dB.select().from(UserTable).where(eq(UserTable.id, userId));
    return users?.length ? users[0] : undefined;
  },
  async getByEmailQuery(email: string): Promise<Partial<User> | undefined> {
    const users = await dB.select().from(UserTable).where(eq(UserTable.email, email));
    return users?.length ? users[0] : undefined;
  },
  async getByPhoneQuery(phone: string): Promise<Partial<User> | undefined> {
    const users = await dB.select().from(UserTable).where(eq(UserTable.phone, phone));
    return users?.length ? users[0] : undefined;
  },
  async getByPhoneOrEmailQuery(phone: string, email: string): Promise<Partial<User> | undefined> {
    const users = await dB
      .select()
      .from(UserTable)
      .where(or(eq(UserTable.phone, phone), eq(UserTable.email, email)));
    return users?.length ? users[0] : undefined;
  },
  async getByIdsQuery(userIds: string[]): Promise<Partial<User>[]> {
    return await dB.select().from(UserTable).where(inArray(UserTable.id, userIds));
  },
  async createUser(user: Partial<CreateUser>): Promise<Partial<CreateUser>> {
    const salt = genSaltSync(10);
    const password = hashSync(user.password, salt);

    const [newUser] = await dB
      .insert(UserTable)
      .values({ ...user, password } as CreateUser)
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
};
