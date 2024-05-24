import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq, inArray, or } from 'drizzle-orm';
import { dB } from '@repo/ag-db';
import { type User, user } from '../schema';

export const UserDbService = {
  async getUserByIdQuery(userId: string) {
    return await dB.select().from(user).where(eq(user.id, userId));
  },
  async getUserByEmailQuery(email: string) {
    return await dB.select().from(user).where(eq(user.email, email));
  },
  async getUserByPhoneQuery(phone: string) {
    return await dB.select().from(user).where(eq(user.phone, phone));
  },
  async getUserByPhoneOrEmailQuery(phone: string, email: string) {
    return await dB
      .select()
      .from(user)
      .where(or(eq(user.phone, phone), eq(user.email, email)));
  },
  async getUserByIdsQuery(userIds: string[]) {
    return await dB.select().from(user).where(inArray(user.id, userIds));
  },
  async createUser(u: Partial<User>): Promise<Partial<User>> {
    const salt = genSaltSync(10);
    const password = hashSync(u.password, salt);

    const [newUser] = await dB
      .insert(user)
      .values({ ...u, password } as User)
      .returning();

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
};
