'use client';

import React, { createContext, forwardRef, useContext, useId } from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider as Form,
  useFormContext,
} from 'react-hook-form';
import type * as LabelPrimitive from '@radix-ui/react-label';
import { Icon, mdiAlertOutline, mdiInformation } from '@lib/ui-icon-next';
import { cn } from '@lib/ui-util-next';
import { Slot } from '@radix-ui/react-slot';
import { Label } from './label';

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, ...props }: ControllerProps<TFieldValues, TName> & { className?: string }) {
  return (
    <div className={className}>
      <FormFieldContext.Provider value={{ name: props.name }}>
        <Controller {...props} />
      </FormFieldContext.Provider>
    </div>
  );
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    FormItemInfoId: `${id}-form-item-description`,
    FormItemErrorId: `${id}-form-item-message`,
    ...fieldState,
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('mb-1 space-y-1', className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = 'FormItem';

const FormItemLabel = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return <Label ref={ref} className={className} htmlFor={formItemId} {...props} />;
});
FormItemLabel.displayName = 'FormItemLabel';

const FormItemControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, FormItemInfoId, FormItemErrorId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? FormItemInfoId : `${FormItemInfoId} ${FormItemErrorId}`}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
});
FormItemControl.displayName = 'FormItemControl';

const FormItemInfo = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { end?: boolean }
>(({ className, children, end = false, ...props }, ref) => {
  const { error, FormItemInfoId } = useFormField();
  const errorMessage = error ? String(error.message) : null;

  if (!children && !errorMessage) {
    return null;
  }

  return (
    <p
      className={cn(
        { 'text-muted-foreground': !error, 'text-danger': error, 'justify-end': end },
        'flex items-center gap-1',
        className
      )}
      {...props}
    >
      <Icon
        path={error ? mdiAlertOutline : mdiInformation}
        size={0.5}
        className={!children && !errorMessage ? 'invisible' : ''}
      />
      <span ref={ref} id={FormItemInfoId} className="text-xs">
        {errorMessage ? (
          errorMessage
        ) : children ? (
          children
        ) : (
          <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
        )}
      </span>
    </p>
  );
});

FormItemInfo.displayName = 'FormItemInfo';

const FormError = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { fixedHeight?: boolean }
>(({ className, children, fixedHeight = false }, ref) => {
  if (!children && !fixedHeight) {
    return null;
  }

  return (
    <p ref={ref} className={cn('text-danger mt-1 text-xs font-medium', className)}>
      <span className="flex items-center gap-1">
        <Icon path={mdiAlertOutline} size={0.5} className={cn(children ? 'block' : 'invisible')} />
        {children || (fixedHeight && <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />)}
      </span>
    </p>
  );
});
FormError.displayName = 'FormError';

export {
  Form,
  FormField,
  useFormField,
  FormItem,
  FormItemLabel,
  FormItemControl,
  FormItemInfo,
  FormError,
};
