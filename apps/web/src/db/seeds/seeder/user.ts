import { dbClient } from '@lib/data-db-shared';
import { type CreateUser, UserTable } from '@lib/data-user-shared';
import { hash } from '@lib/data-util-shared';
import users from '../data/users.json';

export async function seedUser() {
  await Promise.all(
    users.map(async (user) => {
      const password = await hash(user.password, 10);
      await dbClient
        .insert(UserTable)
        .values({
          ...user,
          password,
        } as CreateUser)
        .returning();
    })
  );
}
