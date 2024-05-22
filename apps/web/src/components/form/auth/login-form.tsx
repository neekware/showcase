'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { Button } from '@repo/vendor-ui';

interface LoginFormProps {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    const result = await signIn('credentials', {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: '/dash',
    });

    // eslint-disable-next-line no-console
    console.log(result);
    if (result?.error) {
      // Handle login error
    } else {
      // Handle successful login
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Email"
              className={`border-1 rounded-lg p-2 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email ? (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="Password"
              className={`border-1 rounded-lg p-2 outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password ? (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            ) : null}
          </div>
        </fieldset>
        <Button type="submit" className="mt-4 w-full py-2">
          Login
        </Button>
      </form>
    </div>
  );
}
