'use client';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { type LoginFormInputs, LoginFormModel } from '@lib/data-model-shared';
import { Icon, mdiEmail, mdiKey, mdiSync } from '@lib/ui-icon-next';
import { useDebounce } from '@lib/ui-util-next';
import { Button, DynamicFormField, Form, FormError } from '@lib/ui-vendor-next';

const useLoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormModel>>({
    resolver: zodResolver(LoginFormModel),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control });
  const debouncedValues = useDebounce(values, 500);

  return {
    form,
    values,
    debouncedValues,
  };
};

interface LoginFormProps {
  onSubmit: (input: LoginFormInputs) => void;
  isLoading: boolean;
  error: string;
  clearError: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error, clearError }) => {
  const { form, values, debouncedValues } = useLoginForm();

  console.log('LoginForm render');
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [values]);

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="mb-2">
        <DynamicFormField
          form={form}
          name="email"
          type="email"
          label="Email"
          infoText="Your account email address"
          icon={mdiEmail}
        />
        <DynamicFormField
          form={form}
          name="password"
          type="password"
          label="Password"
          infoText="Your account password"
          icon={mdiKey}
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
