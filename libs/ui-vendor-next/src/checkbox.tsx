'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Icon, mdiCheck } from '@lib/ui-icon-next';
import { cn } from '@lib/ui-vendor-next';

export interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  className?: string;
  error: boolean;
}

const Checkbox = ({ className, error, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    className={cn(
      'border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      { 'border-danger': error },
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Icon path={mdiCheck} className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
