'use client';

import { useEffect, useRef } from 'react';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { type RegisterFormInputs, RegistrationFormModel } from '@lib/data-model-shared';
import {
  Icon,
  mdiAccount,
  mdiAccountGroupOutline,
  mdiEmail,
  mdiKey,
  mdiPhone,
  mdiSync,
} from '@lib/ui-icon-next';
import { transformForm, useDebounce } from '@lib/ui-util-next';
import { Button, DynamicFormField, Form, FormError } from '@lib/ui-vendor-next';

const useRegisterForm = () => {
  const form = useForm<z.infer<typeof RegistrationFormModel>>({
    resolver: zodResolver(RegistrationFormModel),
    mode: 'all',
  });

  const values = useWatch({ control: form.control });
  const debouncedValues = useDebounce(values, 500);

  return {
    form,
    values,
    debouncedValues,
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
  const { form, values, debouncedValues } = useRegisterForm();

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [values]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="mb-2">
        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-2">
          <DynamicFormField
            form={transformForm(form)}
            name="firstName"
            type="text"
            label="First Name"
            error={!!form.formState.errors.firstName}
            infoText="Your first name"
            icon={mdiAccount}
          />
          <DynamicFormField
            form={transformForm(form)}
            name="lastName"
            type="text"
            label="Last Name"
            error={!!form.formState.errors.lastName}
            infoText="Your last name"
            icon={mdiAccountGroupOutline}
          />
        </div>
        <DynamicFormField
          form={transformForm(form)}
          name="email"
          type="email"
          label="Email"
          error={!!form.formState.errors.email}
          infoText="Your account email address"
          icon={mdiEmail}
        />
        <DynamicFormField
          form={transformForm(form)}
          name="phone"
          type="tel"
          label="Phone"
          error={!!form.formState.errors.phone}
          infoText="Your phone number (+1234567890)"
          icon={mdiPhone}
        />
        <DynamicFormField
          form={transformForm(form)}
          name="password"
          type="password"
          label="Password"
          error={!!form.formState.errors.password}
          infoText="Your account password"
          icon={mdiKey}
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
