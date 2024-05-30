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
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/nx-ui-vendor';
import { useAuthState } from '@repo/nx-util';

interface LogoutProps {
  className?: string;
}

export function LogoutComponent({ className }: LogoutProps) {
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };

  const router = useRouter();
  const [auth, setAuthState] = useAuthState();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    // fire and forget, let's log the user out and redirect
    setAuthState({ isLoggedIn: false, token: '' });
    setOpen(false);
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push('/');
    }
  }, [auth]);

  return (
    <div className={className}>
      <AlertDialog open={open} onOpenChange={setOpen} defaultOpen>
        <AlertDialogTrigger asChild>
          <span>Logout</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account Logout</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>{' '}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
