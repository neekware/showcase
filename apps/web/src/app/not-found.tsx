import Link from 'next/link';
import { Button } from '@lib/ui-vendor-next';

export default function NotFound() {
  return (
    <div className="mt-24 flex flex-col items-center p-2">
      <h1>404 - Page Not Found</h1>
      <p className="mb-10 mt-3">The page you are looking for does not exist.</p>
      <Link href="/">
        <Button variant="default">HOME</Button>
      </Link>
    </div>
  );
}
