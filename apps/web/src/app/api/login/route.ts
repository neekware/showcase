import { type NextRequest, NextResponse } from 'next/server';
import { AuthService, type LoginFormInputs, loginServerAction } from '@repo/nx-auth';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await loginServerAction(data);

  if (result?.error) {
    // input data validation error
    return NextResponse.json({ error: result?.error });
  }

  const user = await AuthService.login(data);
  if (!user) {
    // no such user or invalid password
    return NextResponse.json({ error: true, message: 'No such user, or invalid password' });
  }

  // remove password from the response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  return NextResponse.json(
    { data: userWithoutPassword, message: 'Login successful!' },
    { status: 200 }
  );
}
