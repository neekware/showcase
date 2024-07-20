'use client';

import { useEffect, useRef } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { type RegisterFormInputs, RegistrationFormModel } from '@lib/data-model-shared';
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

const useRegisterForm = () => {
  const form = useForm<z.infer<typeof RegistrationFormModel>>({
    resolver: zodResolver(RegistrationFormModel),
    mode: 'all',
  });

  // catch all watch not available, so we need to watch each field
  const debouncedFormStates = useDebounce(
    form.watch(['firstName', 'lastName', 'email', 'phone', 'password']),
    500
  );

  return {
    form,
    debouncedFormStates,
  };
};

interface RegisterFormProps {
  onSubmit: SubmitHandler<RegisterFormInputs>;
  isLoading: boolean;
  error: string;
  clearError: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading,
  error,
  clearError,
}) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { form, debouncedFormStates } = useRegisterForm();

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [...debouncedFormStates]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="mb-2">
        <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 sm:gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="-mb-3">
                <FormItemControl>
                  <InputFloating
                    {...field}
                    type="text"
                    label="First Name"
                    {...form.register('firstName')}
                    onBlur={() => form.trigger('firstName')}
                    ref={emailInputRef}
                  />
                </FormItemControl>
                <FormItemInfo end={true} className="flex w-full">
                  Your first name
                </FormItemInfo>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormItemControl>
                  <InputFloating
                    {...field}
                    type="text"
                    label="Last Name"
                    {...form.register('lastName')}
                    onBlur={() => form.trigger('lastName')}
                  />
                </FormItemControl>
                <FormItemInfo end={true} className="flex w-full">
                  Your last name
                </FormItemInfo>
              </FormItem>
            )}
          />
        </div>
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
                Your email address
              </FormItemInfo>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormItemControl>
                <InputFloating
                  {...field}
                  type="tel"
                  label="Phone"
                  {...form.register('phone')}
                  onBlur={() => form.trigger('phone')}
                />
              </FormItemControl>
              <FormItemInfo end={true} className="flex w-full">
                Your phone number (+1234567890)
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
