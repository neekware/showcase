import { hash } from 'bcrypt-ts';
import { dB } from '@repo/ag-db';
import { type CreateUser, user } from '../../schema/user';
import users from '../data/users.json';

export async function seedUser() {
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
