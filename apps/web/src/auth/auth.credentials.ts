import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { type User } from '../db/schema';
import { UserDbService } from '../db/services/user.service';

export default Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'Email' },
    password: { label: 'Password', type: 'password' },
  },

  async authorize(credentials) {
    const { email, password } = credentials;
    const user = await getUser(email as string, password as string);
    return user as User;
  },
});

const getUser = async (email: string, password: string) => {
  const user = await UserDbService.getUserByEmailQuery(email);

  if (user) {
    const isValid = await compare(password, user.password ?? '');
    if (isValid) {
      return user;
    }
  }

  return user;
};
