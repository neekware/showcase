import Link from 'next/link';
import { log } from '@repo/ag-logger';
import { Button } from '@repo/nx-ui-vendor';

export const metadata = {
  title: 'More | Showcase',
};

export default function More(): JSX.Element {
  log('Hey! This is the More page.');

  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Showcase UI
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We are a premier provider of innovative solutions tailored for political figures at
              all levels. Our extensive range of products and services is designed to empower your
              campaign with advanced web presence capabilities and comprehensive outreach tools.
            </p>
            <p>
              By partnering with us, you gain access to user-friendly websites that showcase your
              political platform, integrated communication tools for email, SMS, and mail campaigns,
              and customizable forms that allow supporters to subscribe for updates.
            </p>
            <p>
              Additionally, our secure forms can collect vital supporter information, save it, and
              seamlessly redirect users to your official party website. We also offer robust
              functionalities to accept donations, making it easier for your campaign to garner
              financial support. Explore our offerings to see how we can elevate your
              campaign&apos;s effectiveness and reach.
            </p>
            <div className="flex justify-start gap-4">
              <Link href="/">
                <Button variant="default">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
