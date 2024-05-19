'use client';

import { Button } from '@repo/vendor-ui';
import { signOut } from '@web/auth';

export function LogoutForm() {
  const onSubmit = async () => {
    await signOut({
      redirect: true,
      redirectTo: '/',
    });
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={onSubmit}>
        <Button type="submit" className="mt-4 w-full py-2">
          Logout
        </Button>
      </form>
    </div>
  );
}
