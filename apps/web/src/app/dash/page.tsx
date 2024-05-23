import Link from 'next/link';
import { log } from '@repo/ag-logger';
import { Button } from '@repo/vendor-ui';

export const metadata = {
  title: 'Dash | Showcase',
};

export default function Dash(): JSX.Element {
  log('Hey! This is the Dash page.');

  return (
    <div className="flex min-h-screen flex-col items-center space-y-2 p-2">
      <div className="mx-auto flex max-w-5xl gap-2 text-2xl">
        <div>Dashboard</div>
        <Link href="/auth/login">
          <Button variant="default">Login</Button>
        </Link>
        <Link href="/products">
          <Button variant="danger">Products</Button>
        </Link>
      </div>
    </div>
  );
}
