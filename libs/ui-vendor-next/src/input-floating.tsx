import * as React from 'react';
import { Icon } from '@lib/ui-icon-next';
import { cn } from './util';

export type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: string;
  error?: boolean;
};

const InputFloating = ({
  type = 'text',
  label,
  className,
  icon,
  error,
  ...props
}: FloatingLabelInputProps) => {
  const [value, setValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // Update value state to trigger placeholder position update
    setValue(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={cn('relative flex w-full items-center border-0 border-b-2', {
        'border-danger': error,
      })}
    >
      <input
        type={type}
        className={cn(
          'text-md peer w-full bg-transparent p-0 pb-2 pr-1 pt-4 outline-none transition-all duration-1000 focus:bg-transparent focus:outline-none',
          className
        )}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        onChangeCapture={handleChange}
        value={value}
        {...props}
      />
      <label
        className={cn(
          'text-md pointer-events-none absolute top-4 opacity-70 transition-all duration-300',
          {
            '-top-1 text-sm font-bold': isFocused || value, // Adjust the position and style on focus or value
            'peer-placeholder-shown:text-md font-bold': !value && !isFocused, // Ensure it's visible if there's no value
          }
        )}
      >
        {label}
      </label>
      {icon && <Icon path={icon} className="text-primary -mb-2.5 size-6 opacity-70" />}
    </div>
  );
};

InputFloating.displayName = 'InputFloating';

export { InputFloating };
