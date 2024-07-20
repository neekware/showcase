import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import { type LoginFormInputs, LoginFormModel } from '@lib/data-model-shared';
import { Icon, mdiEmail, mdiKey, mdiLock, mdiSync } from '@lib/ui-icon-next';
import { useDebounce } from '@lib/ui-util-next';
import { Button, DynamicFormField, Form, FormError } from '@lib/ui-vendor-next';

const useLoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormModel>>({
    resolver: zodResolver(LoginFormModel),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const oldFieldsValues = useRef(form.getValues());

  // catch all watch not available, so we need to watch each field
  const debouncedFormStates = useDebounce(form.watch(['email', 'password']), 500);

  return {
    form,
    oldFieldsValues,
    debouncedFormStates,
  };
};

interface LoginFormProps {
  onSubmit: (input: LoginFormInputs) => void;
  isLoading: boolean;
  error: string;
  clearError: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error, clearError }) => {
  const { form, oldFieldsValues, debouncedFormStates } = useLoginForm();

  useEffect(() => {
    if (error) {
      clearError();
    }
    for (const target of Object.keys(debouncedFormStates)) {
      if (debouncedFormStates?.[target] !== oldFieldsValues?.current?.[target]) {
        form.trigger(target as keyof LoginFormInputs);
      }
    }
  }, [...debouncedFormStates]);

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
