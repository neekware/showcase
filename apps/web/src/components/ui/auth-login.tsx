import { Button } from '@repo/vendor-ui';
import { signIn } from '@web/auth';

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const handleSignIn = async () => {
    'use server';
    await signIn(provider);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSignIn(); // Marking the promise as intentionally not awaited
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button {...props}>Sign In</Button>
    </form>
  );
}
