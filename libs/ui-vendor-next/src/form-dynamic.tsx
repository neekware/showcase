'use client';

import * as React from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues,
  type UseFormRegister,
  type UseFormTrigger,
} from 'react-hook-form';
import { Checkbox } from './checkbox';
import { FormField, FormItem, FormItemControl, FormItemInfo } from './form';
import { InputFloating } from './input-floating';
import { Textarea } from './textarea';

interface DynamicFormFieldProps<TFieldValues extends FieldValues> {
  form: {
    control: Control<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    trigger: UseFormTrigger<TFieldValues>;
  };
  name: FieldPath<TFieldValues>;
  type: 'text' | 'textarea' | 'email' | 'tel' | 'password' | 'checkbox';
  label: string;
  icon?: string;
  infoText: string;
  className?: string;
}

const DynamicFormField = <TFieldValues extends FieldValues>({
  form,
  name,
  type,
  label,
  infoText,
  icon,
  className,
}: DynamicFormFieldProps<TFieldValues>) => {
  const renderField = (field: any) => {
    switch (type) {
      case 'tel':
      case 'text':
      case 'email':
      case 'password':
        return (
          <InputFloating
            type={type}
            label={label}
            {...field}
            {...form.register(name)}
            onBlur={() => form.trigger(name)}
            icon={icon}
          />
        );
      case 'textarea':
        return (
          <Textarea
            {...field}
            {...form.register(name)}
            onBlur={() => form.trigger(name)}
            icon={icon}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            {...field}
            type="checkbox"
            {...form.register(name)}
            onBlur={() => form.trigger(name)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      className={className}
      render={(field) => (
        <FormItem>
          <FormItemControl>{renderField(field)}</FormItemControl>
          <FormItemInfo end={true} className="flex w-full">
            {infoText}
          </FormItemInfo>
        </FormItem>
      )}
    />
  );
};

export { DynamicFormField };
