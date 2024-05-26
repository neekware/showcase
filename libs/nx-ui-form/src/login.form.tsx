'use client';

import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormInputs, LoginFormModel } from '@repo/nx-auth';
import { Button, Input, Label } from '@repo/nx-ui-vendor';

export function LoginForm() {
  const [data, setData] = useState<LoginFormInputs>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormModel),
  });

  const processForm: SubmitHandler<LoginFormInputs> = async (input: LoginFormInputs) => {
    console.log('data', input, data);

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log('Something went wrong');
      return;
    }

    if (result.error) {
      console.log(result.error);
      return;
    }
    console.log('Login successful!', result);

    setData(result.data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(processForm)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter your email" type="email" {...register('email')} />
        {errors.email?.message ? (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
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
