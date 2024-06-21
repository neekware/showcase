import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AuthState,
  type LoginFormInputs,
  LoginFormModel,
  type ServerResponseType,
} from '@lib/data-model-shared';
import { useAuthState } from '@lib/data-store-next';
import { Icon, mdiSync } from '@lib/ui-icon-next';
import { useDebounce } from '@lib/ui-util-next';
import {
  Button,
  Form,
  FormError,
  FormField,
  FormItem,
  FormItemControl,
  FormItemInfo,
  InputFloating,
} from '@lib/ui-vendor-next';
import { type z } from 'zod';

const useLoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormModel>>({
    resolver: zodResolver(LoginFormModel),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const debouncedEmail = useDebounce(form.watch('email'), 500);
  const debouncedPassword = useDebounce(form.watch('password'), 500);

  return {
    form,
    debouncedEmail,
    debouncedPassword,
  };
};

const loginUser = async (input: z.infer<typeof LoginFormModel>) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return response;
};

export interface LoginFormProps {
  redirect?: (path: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ redirect }) => {
  const [_, setAuthState] = useAuthState();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { form, debouncedEmail, debouncedPassword } = useLoginForm();

  useEffect(() => {
    setError('');
  }, [debouncedEmail, debouncedPassword]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (input: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const response = await loginUser(input);
      if (!response.ok) {
        setError('An error occurred. Please try again.');
      }

      const result = (await response.json()) as ServerResponseType<{
        accessToken: string;
        nextUrl: string;
      }>;

      if (!result.success) {
        setError(result.message || 'An error occurred. Please try again.');
      } else if (result.success) {
        setAuthState({ isLoggedIn: true, accessToken: result.data?.accessToken } as AuthState);
        console.log('Login successful', result.data?.nextUrl);
        redirect && redirect(result.data?.nextUrl || '/');
      }
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
          className="mb-2"
          control={form.control}
          name="email"
          render={(field) => (
            <FormItem>
              <FormItemControl>
                <InputFloating
                  {...field}
                  type="email"
                  label="Email"
                  {...form.register('email')}
                  onBlur={() => form.trigger('email')}
                />
              </FormItemControl>
              <FormItemInfo end={true} className="flex w-full">
                Your account email address
              </FormItemInfo>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={(field) => (
            <FormItem>
              <FormItemControl>
                <InputFloating
                  {...field}
                  type="password"
                  label="Password"
                  {...form.register('password')}
                  onBlur={() => form.trigger('password')}
                />
              </FormItemControl>
              <FormItemInfo end={true} className="flex w-full">
                Your account password
              </FormItemInfo>
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-between">
          <Button
            className="font-bold"
            type="submit"
            disabled={!form.formState.isValid || isLoading}
          >
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
};
