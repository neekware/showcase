import React from 'react';
import { Toaster } from 'sonner';
import { type ToasterProps } from '@repo/dto';
import { useThemeState } from '@repo/util';

function ThemeToaster({ ...props }: ToasterProps) {
  const [theme] = useThemeState();

  return (
    <Toaster
      theme={theme.mode}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

export { ThemeToaster };
