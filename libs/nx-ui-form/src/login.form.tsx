'use client';

import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormInputs, LoginFormModel, loginServerAction } from '@repo/nx-auth';
import { Button, Input, Label } from '@repo/nx-ui-vendor';

export function LoginForm() {
  const [_data, setData] = useState<LoginFormInputs>();

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormModel),
  });

  const processForm: SubmitHandler<LoginFormInputs> = async (data: LoginFormInputs) => {
    console.log('data', data);

    const result = await loginServerAction(data);

    if (!result) {
      console.log('Something went wrong');
      return;
    }

    if (result.error) {
      console.log(result.error);
      return;
    }
    console.log('Login successful!', result);

    // reset();
    setData(result as LoginFormInputs);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(processForm)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
          {...register('email')}
        />
        {errors.email?.message ? (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="Enter a password"
          type="password"
          {...register('password')}
        />
        {errors.password?.message ? (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        ) : null}
      </div>
      <Button className="" type="submit">
        Login
      </Button>
    </form>
  );
}
