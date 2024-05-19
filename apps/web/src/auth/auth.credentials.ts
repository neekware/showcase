import { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'Email' },
    password: { label: 'Password', type: 'password' },
  },

  async authorize(credentials): Promise<User | null> {
    const { email, password } = credentials;
    const user = await getUser(email, password);
    return user;
  },
});

const getUser = async (email: unknown, password: unknown) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  if (email === 'mike@tyson.com' && password === 'pass') {
    return { id: '1', name: 'Mike Tyson', email: 'mike@tyson.com' };
  }

  return null;
};
