import bcrypt from 'bcrypt';
import { dB } from '../db/drizzle';
import { User, type UserType } from '../db/schema';

export const getUser = async (email: string, password: string) => {
  // Fetch user by email
  const [user] = await dB.select(users).where(users.email.eq(email)).execute();

  if (!user) {
    throw new Error('User not found');
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return user as UserType;
};
