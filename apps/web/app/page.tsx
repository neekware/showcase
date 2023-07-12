import 'tailwind-config/globals.css';

import Link from 'next/link';

import { Button, buttonVariants } from '@showcase/ui';
import { Header } from '@showcase/ui';

export default function Page() {
  return (
    <>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <Header text="Web" />
        <Button>Button</Button>
        <Button variant="ghost">Ghost</Button>
        <Link href="/about" className={buttonVariants({ variant: 'outline' })}>
          About
        </Link>
        <Button variant="secondary" className="animate-in zoom-in duration-500">
          Secondary
        </Button>
      </div>
    </>
  );
}
