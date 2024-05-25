import { genSaltSync, hashSync } from 'bcryptjs';
import { eq, inArray, or } from 'drizzle-orm';
import { dB } from '@repo/ag-db';
import { CreateUser, UserTable } from '../schema/user';

export const UserDbService = {
  async geUserTableByIdQuery(userId: string) {
    return await dB.select().from(UserTable).where(eq(UserTable.id, userId));
  },
  async geUserTableByEmailQuery(email: string) {
    return await dB.select().from(UserTable).where(eq(UserTable.email, email));
  },
  async geUserTableByPhoneQuery(phone: string) {
    return await dB.select().from(UserTable).where(eq(UserTable.phone, phone));
  },
  async geUserTableByPhoneOrEmailQuery(phone: string, email: string) {
    return await dB
      .select()
      .from(UserTable)
      .where(or(eq(UserTable.phone, phone), eq(UserTable.email, email)));
  },
  async geUserTableByIdsQuery(userIds: string[]) {
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
