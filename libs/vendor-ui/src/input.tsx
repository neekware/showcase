import * as React from 'react';
import { cn } from '@repo/util';

// Utility to combine class names.

// TypeScript type for props that extends standard HTML input attributes.
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  customStyle?: string; // Optional prop for additional custom styles.
};

// Input component defined with forward ref to access the DOM input element.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', customStyle, ...props }, ref) => {
    return (
      <input
        type={type} // Default type is 'text' if not specified.
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          className,
          customStyle // Apply custom styles if provided.
        )}
        ref={ref}
        {...props} // Spread all other props to the input element.
      />
    );
  }
);

Input.displayName = 'Input'; // Set display name for debugging purposes.

export { Input }; // Export the Input component for use in other parts of the application.
