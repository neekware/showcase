import Link from 'next/link';
import { Button } from '@lib/ui-vendor-next';
import { siteSettings } from '@web/cfg';
import buildInfo from '@web/cfg/config.json';

export const metadata = {
  title: 'Dash | Showcase',
};

const { urls } = siteSettings;

export default function Dash(): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container !px-1 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Dashboard - Showcase UI
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We are a leading provider of innovative solutions for political individuals of all
              levels. Explore our products and services to see how we can help your campaign thrive.
            </p>

            <div>{JSON.stringify(buildInfo, null, 2)}</div>

            <div className="flex gap-2">
              <Link href={urls.site.auth.login}>
                <Button variant="default">Login</Button>
              </Link>
              <Link href="/products">
                <Button variant="danger">Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
