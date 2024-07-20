'use client';

import { useEffect, useRef } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { type RegisterFormInputs, RegistrationFormModel } from '@lib/data-model-shared';
import { Icon, mdiSync } from '@lib/ui-icon-next';
import { useDebounce } from '@lib/ui-util-next';
import { Button, DynamicFormField, Form, FormError } from '@lib/ui-vendor-next';

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
          <DynamicFormField
            form={form}
            name="firstName"
            type="text"
            label="First Name"
            infoText="Your first name"
          />
          <DynamicFormField
            form={form}
            name="lastName"
            type="text"
            label="Last Name"
            infoText="Your last name"
          />
        </div>
        <DynamicFormField
          form={form}
          name="email"
          type="email"
          label="Email"
          infoText="Your account email address"
        />
        <DynamicFormField
          form={form}
          name="phone"
          type="tel"
          label="Phone"
          infoText="Your phone number (+1234567890)"
        />
        <DynamicFormField
          form={form}
          name="password"
          type="password"
          label="Password"
          infoText="Your account password"
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
