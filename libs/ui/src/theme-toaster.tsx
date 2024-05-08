import React from 'react';
import { useTheme } from 'next-themes';
import { type ThemeMode, type ToasterProps } from '@repo/dto';
import { Toaster } from 'sonner';

function ThemeToaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme();

  return (
    <Toaster
      theme={theme as ThemeMode}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}

export { ThemeToaster };
