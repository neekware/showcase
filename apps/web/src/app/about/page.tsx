import Link from 'next/link';
import { log } from '@repo/logger';

export const metadata = {
  title: 'Home | Showcase',
};

export default function About(): JSX.Element {
  log('Hey! This is the Store page.');

  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Showcase UI
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We are a leading provider of innovative solutions for political
              individuals of all levels. Explore our products and services to
              see how we can help your campaign thrive.
            </p>
            <div className="flex justify-start gap-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="/"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
