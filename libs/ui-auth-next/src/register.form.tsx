import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AuthState,
  type RegisterFormInputs,
  RegistrationFormModel,
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
  FormItemError,
  FormItemInfo,
  FormItemLabel,
  Input,
} from '@lib/ui-vendor-next';
import { type z } from 'zod';

export const RegisterForm: React.FC = () => {
  const [_, setAuthState] = useAuthState();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegistrationFormModel>>({
    resolver: zodResolver(RegistrationFormModel),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
    mode: 'onChange', // This enables the form to be validated on each change
  });

  const { watch, formState } = form;

  // Watch all fields with debouncing
  // const debouncedForm = useDebounce(watch(), 500);

  const { isValid } = formState; // Extract isValid from formState

  // // React to changes using useEffect
  // useEffect(() => {
  //   setError('');
  // }, [debouncedForm]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (input: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/register', {
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

      if (!result.success) {
        setError(result.message || 'An error occurred. Please try again.');
      } else if (result.success) {
        setAuthState({ isLoggedIn: true, token: 'token' } as AuthState);
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
          control={form.control}
          name="firstName"
          render={(field) => (
            <FormItem>
              <FormItemLabel>First Name</FormItemLabel>
              <FormItemControl>
                <Input
                  {...field}
                  type="firstName"
                  placeholder="Your first name"
                  {...form.register('firstName')}
                  onBlur={() => form.trigger('firstName')}
                />
              </FormItemControl>
              <FormItemError />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={(field) => (
            <FormItem>
              <FormItemLabel>Last Name</FormItemLabel>
              <FormItemControl>
                <Input
                  {...field}
                  type="lastName"
                  placeholder="Your last name"
                  {...form.register('lastName')}
                  onBlur={() => form.trigger('lastName')}
                />
              </FormItemControl>
              <FormItemError />
            </FormItem>
          )}
        />
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
              <FormItemInfo className="flex w-full">Your account email address</FormItemInfo>
              <FormItemError />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={(field) => (
            <FormItem>
              <FormItemLabel>Phone</FormItemLabel>
              <FormItemControl>
                <Input
                  {...field}
                  type="phone"
                  placeholder="Your phone number"
                  {...form.register('phone')}
                  onBlur={() => form.trigger('phone')}
                />
              </FormItemControl>
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
            Register
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
