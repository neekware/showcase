import { type NextRequest, NextResponse } from 'next/server';
import { AuthService, type LoginFormInputs, loginServerAction } from '@repo/nx-auth';

export async function POST(req: NextRequest) {
  const { body: credentials }: { body: LoginFormInputs } = await req.json();
  const result = await loginServerAction(credentials);

  if (result?.success) {
    const user = await AuthService.login(credentials);
    return NextResponse.json({ message: 'Login successful' });
  }
  return NextResponse.json({ error: result?.error }, { status: 401 });
}
