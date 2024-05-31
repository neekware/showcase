// import { compare } from 'bcrypt-ts';
// import { type User } from '../db/schema';
// import { UserDbService } from '../db/services/user.service';

// export default Credentials({
//   name: 'Credentials',
//   credentials: {
//     email: { label: 'Email', type: 'email', placeholder: 'Email' },
//     password: { label: 'Password', type: 'password' },
//   },

//   async authorize(credentials) {
//     const { email, password } = credentials;
//     const user = await geUserTable(email as string, password as string);
//     return user as User;
//   },
// });

// const geUserTable = async (email: string, password: string) => {
//   const user = await UserDbService.geUserTableByEmailQuery(email);

//   if (user) {
//     const isValid = await compare(password, user.password ?? '');
//     if (isValid) {
//       return user;
//     }
//   }

//   return user;
// };
