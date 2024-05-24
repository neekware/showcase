import { hash } from 'bcrypt-ts';
import { type DbType } from '@repo/ag-db';
import { type CreateUser, user } from '../../schema/user';
import users from '../data/users.json';

export async function seedUser(dB: DbType) {
  await Promise.all(
    users.map(async (u) => {
      const password = await hash(u.password, 10);
      await dB
        .insert(user)
        .values({
          ...u,
          password,
        } as CreateUser)
        .returning();
    })
  );
}
