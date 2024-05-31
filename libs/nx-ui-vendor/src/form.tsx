'use client';

import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider as Form,
  useFormContext,
} from 'react-hook-form';
import type * as LabelPrimitive from '@radix-ui/react-label';
import { mdiAlertOutline, mdiInformation } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Slot } from '@radix-ui/react-slot';
import { Label } from './label';
import { cn } from './util';

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }
  const itemContext = React.useContext(FormItemContext);
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

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('mb-3 space-y-1', className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = 'FormItem';

const FormItemLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return <Label ref={ref} className={className} htmlFor={formItemId} {...props} />;
});
FormItemLabel.displayName = 'FormItemLabel';

const FormItemControl = React.forwardRef<
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

const FormItemInfo = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { fixedHeight?: boolean }
>(({ className, children, fixedHeight = false, ...props }, ref) => {
  const { error, FormItemInfoId } = useFormField();

  if (error) {
    // if we have error, the error will display it, we don't need to display info
    return null;
  }

  if (!children && !fixedHeight) {
    return null;
  }

  return (
    <p className={cn('text-muted-foreground flex items-center gap-1', className)}>
      {children ? (
        <Icon path={mdiInformation} size={0.5} />
      ) : (
        <Icon path={mdiInformation} size={0.5} className="invisible" />
      )}
      <span ref={ref} id={FormItemInfoId} className="text-xs" {...props}>
        {children || (fixedHeight && <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />)}
      </span>
    </p>
  );
});
FormItemInfo.displayName = 'FormItemInfo';

const FormItemError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { fixedHeight?: boolean }
>(({ className, children, fixedHeight = false, ...props }, ref) => {
  const { error, FormItemErrorId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body && !fixedHeight) {
    return null;
  }

  return (
    <p className="text-danger flex items-center gap-1">
      <Icon path={mdiAlertOutline} size={0.5} className={cn(body ? 'block' : 'invisible')} />
      <span
        ref={ref}
        id={FormItemErrorId}
        className={cn('text-danger text-xs font-medium', className)}
        {...props}
      >
        {body || (fixedHeight && <span dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />)}
      </span>
    </p>
  );
});
FormItemError.displayName = 'FormItemError';

const FormError = React.forwardRef<
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
  FormItemError,
  FormError,
};
