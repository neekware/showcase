'use client';

import { cn } from '@lib/ui-vendor-next';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';
import { useToast } from './toast-hook';

interface ToasterProps {
  className?: string;
  classNameViewPort?: string;
}

export function Toaster({ className, classNameViewPort }: ToasterProps): JSX.Element {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className={cn('grid gap-1', className)}>
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className={classNameViewPort} />
    </ToastProvider>
  );
}
