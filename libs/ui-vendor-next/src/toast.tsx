'use client';

import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { Icon, mdiClose } from '@lib/ui-icon-next';
import { cn, cva, type VariantProps } from './util';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Viewport>) => (
  <ToastPrimitives.Viewport
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:w-[376px] sm:flex-col',
      className
    )}
    {...props}
  />
);

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        info: 'info group border-info bg-info text-info-foreground',
        success: 'success group border-success bg-success text-success-foreground',
        warning: 'warning group border-warning bg-warning text-warning-foreground',
        danger: 'danger group border-danger bg-danger text-danger-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const Toast = ({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>) => {
  return <ToastPrimitives.Root className={cn(toastVariants({ variant }), className)} {...props} />;
};

Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Action>) => (
  <ToastPrimitives.Action
    className={cn(
      'ring-offset-background hover:bg-secondary focus:ring-ring',
      'group-[.info]:border-muted/40 group-[.info]:hover:border-info/30 group-[.info]:hover:bg-info group-[.info]:hover:text-info-foreground group-[.info]:focus:ring-info',
      'group-[.success]:border-muted/40 group-[.success]:hover:border-success/30 group-[.success]:hover:bg-success group-[.success]:hover:text-success-foreground group-[.success]:focus:ring-success',
      'group-[.warning]:border-muted/40 group-[.warning]:hover:border-warning/30 group-[.warning]:hover:bg-warning group-[.warning]:hover:text-warning-foreground group-[.warning]:focus:ring-warning',
      'group-[.danger]:border-muted/40 group-[.danger]:hover:border-danger/30 group-[.danger]:hover:bg-danger group-[.danger]:hover:text-danger-foreground group-[.danger]:focus:ring-danger',
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
);

ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Close>) => (
  <ToastPrimitives.Close
    className={cn(
      'text-foreground/50 hover:text-foreground absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
      'group-[.info]:text-red-300 group-[.info]:hover:text-red-50 group-[.info]:focus:ring-red-400 group-[.info]:focus:ring-offset-red-600',
      'group-[.success]:text-red-300 group-[.success]:hover:text-red-50 group-[.success]:focus:ring-red-400 group-[.success]:focus:ring-offset-red-600',
      'group-[.warning]:text-red-300 group-[.warning]:hover:text-red-50 group-[.warning]:focus:ring-red-400 group-[.warning]:focus:ring-offset-red-600',
      'group-[.danger]:text-red-300 group-[.danger]:hover:text-red-50 group-[.danger]:focus:ring-red-400 group-[.danger]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <Icon path={mdiClose} className="size-4" />
  </ToastPrimitives.Close>
);

ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Title>) => (
  <ToastPrimitives.Title className={cn('text-sm font-semibold', className)} {...props} />
);

ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Description>) => (
  <ToastPrimitives.Description className={cn('text-sm opacity-90', className)} {...props} />
);

ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentProps<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
