import { hash } from 'bcryptjs';
import { dB } from '@repo/ag-db';
import { type CreateUser, UserTable } from '../../schema/user';
import users from '../data/users.json';

export async function seedUser() {
  await Promise.all(
    users.map(async (user) => {
      const password = await hash(user.password, 10);
      await dB
        .insert(UserTable)
        .values({
          ...user,
          password,
        } as CreateUser)
        .returning();
    })
  );
}
