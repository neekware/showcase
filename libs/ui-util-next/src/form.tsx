import { FieldError, UseFormReturn } from 'react-hook-form';

export function transformForm<T>(form: UseFormReturn<T>) {
  return {
    control: form.control,
    register: form.register,
    trigger: form.trigger,
    formState: {
      ...form.formState,
      errors: Object.entries(form.formState.errors).reduce(
        (acc, [key, value]) => {
          acc[key] = {
            message: getErrorMessage(value as FieldError | undefined),
          };
          return acc;
        },
        {} as Record<string, { message: string }>
      ),
    },
  };
}

function getErrorMessage(error: FieldError | undefined): string {
  if (typeof error?.message === 'string') {
    return error.message;
  }
  return 'An error occurred';
}
