import { Button } from '@repo/vendor-ui';
import { signOut } from '@web/auth';

export function SignOut({ ...props }: React.ComponentPropsWithRef<typeof Button>) {
  const handleSignOut = async () => {
    'use server';
    await signOut();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSignOut(); // Marking the promise as intentionally not awaited
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button {...props}>Sign Out</Button>
    </form>
  );
}
