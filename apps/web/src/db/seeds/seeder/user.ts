import { type DbType } from '../../drizzle';
import { User, type UserType } from '../../schema';
import users from '../data/users.json';

export async function seedUser(dB: DbType) {
  await Promise.all(
    users.map(async (user) => {
      await dB
        .insert(User)
        .values(user as UserType)
        .returning();
    })
  );
}
