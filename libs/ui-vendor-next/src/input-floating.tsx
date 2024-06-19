import * as React from 'react';
import { cn } from '@lib/ui-util-next';
import { useFormField } from './form';

export type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const InputFloating = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ type = 'text', label, className, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const { error } = useFormField();

    // Combine external ref and local ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

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
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            { 'border-foreground-400': !error, 'border-danger': error }, // Change border color based on error state
            'peer w-full border-0 border-b-2 bg-transparent p-0 pb-2 pr-3 pt-4 text-sm focus:bg-transparent focus:outline-none',
            className
          )}
          ref={inputRef}
          onFocusCapture={handleFocus}
          onBlurCapture={handleBlur}
          onChangeCapture={handleChange}
          value={value}
          {...props}
        />
        <label
          className={cn(
            'text-md pointer-events-none absolute left-0 top-4 transition-all duration-200',
            {
              'text-primary': !error,
              'text-danger': error,
              '-top-1 left-0 text-xs font-bold': isFocused || value, // Adjust the position and style on focus or value
              'peer-placeholder-shown:text-md font-bold': !value && !isFocused, // Ensure it's visible if there's no value
            }
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

InputFloating.displayName = 'InputFloating';

export { InputFloating };
