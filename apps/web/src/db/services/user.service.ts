import { eq, inArray, or } from 'drizzle-orm';
import { dB } from '../drizzle';
import { user } from '../schema';

export const UserDbService = {
  getUserByIdQuery(userId: string) {
    return dB.query.user.findFirst({
      where: eq(user.id, userId),
    });
  },
  getUserByEmailQuery(email: string) {
    return dB.query.user.findFirst({
      where: eq(user.email, email),
    });
  },
  getUserByPhoneQuery(phone: string) {
    return dB.query.user.findFirst({
      where: eq(user.phone, phone),
    });
  },
  getUserByPhoneOrEmailQuery(phone: string, email: string) {
    return dB.query.user.findFirst({
      where: or(eq(user.phone, phone), eq(user.email, email)),
    });
  },
  getUserByIdsQuery(userIds: string[]) {
    return dB.query.user.findMany({
      where: inArray(user.id, userIds),
    });
  },
};
