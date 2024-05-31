import { type NextRequest, NextResponse } from 'next/server';
import { type LoginFormInputs, LoginFormModel, validateForm } from '@repo/ag-util';
import { AuthService } from '@repo/nx-auth';

// POST /api/login
export async function POST(req: NextRequest) {
  const data = (await req.json()) as LoginFormInputs;
  const result = await validateForm<LoginFormInputs>(LoginFormModel, data);

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
    { success: true, data: userWithoutPassword, message: 'Login successful!' },
    { status: 200 }
  );
}
