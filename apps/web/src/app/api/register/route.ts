import { type NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@lib/data-auth-shared';
import { type RegisterFormInputs, RegistrationFormModel } from '@lib/data-model-shared';
import { validateForm } from '@lib/data-util-shared';

// POST /api/register
export async function POST(req: NextRequest) {
  console.log('POST /api/register');
  const data = (await req.json()) as RegisterFormInputs;
  const result = await validateForm<RegisterFormInputs>(RegistrationFormModel, data);

  if (!result?.success) {
    return NextResponse.json({ error: result?.message });
  }

  let user;
  try {
    user = await AuthService.register(data);
  } catch (error) {
    console.error('Failed to create a user', error);
    return NextResponse.json({ error: true, message: error });
  }

  if (!user) {
    return NextResponse.json({ error: true, message: 'Failed to create a user' });
  }

  const { password, ...userWithoutPassword } = user;

  return NextResponse.json(
    { success: true, data: userWithoutPassword, message: 'Registration successful!' },
    { status: 200 }
  );
}
