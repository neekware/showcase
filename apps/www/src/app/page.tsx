import Link from 'next/link';
import { log } from '@repo/logger';
import { CounterButton } from '@repo/ui';
import { Button } from '@repo/vendor-ui';

export const metadata = {
  title: 'Home | Showcase',
};

export default function Home(): JSX.Element {
  log('Hey! This is the Store page.');

  return (
    <div className="flex min-h-screen flex-col items-center space-y-2 p-2">
      <div className="mx-auto flex max-w-5xl gap-2 text-2xl">
        <div>
          <Button variant="destructive">Test</Button>
          <CounterButton />
          <Link href="/auth/login">
            <Button variant="default">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
