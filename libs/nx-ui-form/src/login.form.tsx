import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mdiSync } from '@mdi/js';
import { Icon } from '@mdi/react';
import { type z } from 'zod';
import { type AuthState, type ServerResponseType } from '@repo/ag-dto';
import { type LoginFormInputs, LoginFormModel } from '@repo/ag-util';
import {
  Button,
  Form,
  FormError,
  FormField,
  FormItem,
  FormItemControl,
  FormItemError,
  FormItemInfo,
  FormItemLabel,
  Input,
} from '@repo/nx-ui-vendor';
import { useAuthState } from '@repo/nx-util';

export function LoginForm() {
  const [_, setAuthState] = useAuthState();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginFormModel>>({
    resolver: zodResolver(LoginFormModel),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange', // This enables the form to be validated on each change
  });

  const { watch, formState } = form;

  // Watch all fields
  const email = watch('email');
  const password = watch('password');
  const { isValid } = formState; // Extract isValid from formState

  // React to changes using useEffect
  useEffect(() => {
    setError('');
  }, [email, password]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (input: LoginFormInputs) => {
    setIsLoading(true);
    try {
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="mb-2">
        <FormField
          control={form.control}
          name="email"
          render={(field) => (
            <FormItem>
              <FormItemLabel>Email</FormItemLabel>
              <FormItemControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Your email address"
                  {...form.register('email')}
                  onBlur={() => form.trigger('email')}
                />
              </FormItemControl>
              <FormItemInfo className="flex w-full justify-end text-right">
                Your account email address
              </FormItemInfo>
              <FormItemError />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={(field) => (
            <FormItem>
              <FormItemLabel>Password</FormItemLabel>
              <FormItemControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Your account password"
                  {...form.register('password')}
                  onBlur={() => form.trigger('password')}
                />
              </FormItemControl>
              <FormItemError fixedHeight />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-between">
          <Button type="submit" disabled={!isValid || isLoading}>
            Login
          </Button>
          {isLoading ? (
            <Icon path={mdiSync} size={1} className="text-primary animate-spin" />
          ) : null}
        </div>
      </form>
      <FormError fixedHeight>{error}</FormError>
    </Form>
  );
}
