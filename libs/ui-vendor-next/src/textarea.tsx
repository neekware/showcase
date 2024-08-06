import * as React from 'react';
import { cn } from '@lib/ui-vendor-next';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = ({ className, error, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex min-h-[80px] w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        { 'border-danger': error },
        className
      )}
      {...props}
    />
  );
};

Textarea.displayName = 'Textarea';

export { Textarea };
