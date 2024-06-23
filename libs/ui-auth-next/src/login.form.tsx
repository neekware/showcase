import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormInputs, LoginFormModel } from '@lib/data-model-shared';
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

  // catch all watch not available, so we need to watch each field
  const debouncedFormStates = useDebounce(form.watch(['email', 'password']), 500);

  return {
    form,
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
  const { form, debouncedFormStates } = useLoginForm();

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [...debouncedFormStates]);

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
