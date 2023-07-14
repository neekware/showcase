import Link from 'next/link';

import { Footer, LeftNav } from '@showcase/components';
import { buttonVariants } from '@showcase/ui';
import { cn } from '@showcase/utils';

import { leftNavItems, siteConfig } from '../../environment/settings';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <LeftNav items={leftNavItems} siteConfig={siteConfig} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'px-4'
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer siteConfig={siteConfig} />
    </div>
  );
}
