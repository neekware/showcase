import { type NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@lib/data-auth-shared';
import { type RegisterFormInputs, RegistrationFormModel } from '@lib/data-model-shared';
import type { User } from '@lib/data-user-shared';
import { validateForm } from '@lib/data-util-shared';

// POST /api/register
export async function POST(req: NextRequest) {
  const data = (await req.json()) as RegisterFormInputs;
  const validated = await validateForm<RegisterFormInputs>(RegistrationFormModel, data);
  if (!validated.success) return NextResponse.json(validated);

  const result = await AuthService.register(data);
  if (!result.success) return NextResponse.json(result);

  const { data: user } = result;

  const { password, ...userWithoutPassword } = user as User;

  return NextResponse.json({ success: true, data: userWithoutPassword });
}
