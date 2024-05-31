'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from '@repo/nx-ui-vendor';
import { useAuthState } from '@repo/nx-util';

interface LogoutProps {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function LogoutConfirmationDialog({ className, open, setOpen }: LogoutProps) {
  const router = useRouter();
  const [auth, setAuthState] = useAuthState();
  const [initialLoad, setInitialLoad] = useState(true);

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    // Fire and forget, let's log the user out and redirect
    setAuthState({ isLoggedIn: false, token: '' });
    setOpen(false);
  };

  useEffect(() => {
    if (!auth.isLoggedIn && !initialLoad) {
      router.push('/');
    } else {
      setInitialLoad(false);
    }
  }, [auth]);

  return (
    <div className={className}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Account Logout</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  );
}
