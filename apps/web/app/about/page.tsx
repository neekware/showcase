import React from 'react';

import Link from 'next/link';

import { buttonVariants } from '@web/components/ui/button';

import { log } from '@showcase/logger';

export default function About() {
  log('Hey! This is About Us.');
  return (
    <div>
      <h1>About Us</h1>
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        Home
      </Link>
    </div>
  );
}
