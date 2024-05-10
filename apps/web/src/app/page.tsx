import Link from 'next/link';
import { log } from '@repo/logger';
import { Button } from '@repo/vendor-ui';

export const metadata = {
  title: 'Home | Showcase',
};

export default function Home(): JSX.Element {
  log('Hey! This is the Store page.');

  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome to Showcase UI
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We are a leading provider of innovative solutions for political
              individuals of all levels. Explore our products and services to
              see how we can help your campaign thrive.
            </p>
            <div className="flex justify-start gap-4">
              <Link href="/more">
                <Button variant="default">Login</Button>
              </Link>
              <Link href="/products">
                <Button variant="destructive">Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
