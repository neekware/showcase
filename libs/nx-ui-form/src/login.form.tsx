import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AuthState, type ServerResponseType } from '@repo/ag-dto';
import { type LoginFormInputs, LoginFormModel } from '@repo/ag-util';
import { Button, Input, Label } from '@repo/nx-ui-vendor';
import { useAuthState } from '@repo/nx-util';

export function LoginForm() {
  const [auth, setAuthState] = useAuthState();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormModel),
  });

  const processForm: SubmitHandler<LoginFormInputs> = async (input: LoginFormInputs) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      setError('An error occurred. Please try again.');
    }

    const result = (await response.json()) as ServerResponseType;

    if (result.error) {
      setError(result.message || 'An error occurred. Please try again.');
    } else if (result.success) {
      setAuthState({ isLoggedIn: true, token: 'token' } satisfies AuthState);
    }
  };

  return (
    <form noValidate className="space-y-1" onSubmit={handleSubmit(processForm)}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter your email" type="email" {...register('email')} />
        <div className="flex w-full text-right">
          {errors.email?.message ? (
            <span className="text-danger text-xs opacity-90">{errors.email.message}</span>
          ) : (
            <span className="text-danger text-xs opacity-90">&nbsp;</span>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="Enter a password"
          type="password"
          {...register('password')}
        />
        <div className="flex w-full text-right">
          {errors.password?.message ? (
            <span className="text-danger text-xs opacity-90">{errors.password.message}</span>
          ) : (
            <span className="text-danger text-xs opacity-90">&nbsp;</span>
          )}
        </div>
      </div>
      <Button className="" type="submit">
        Login
      </Button>
      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </form>
  );
}
