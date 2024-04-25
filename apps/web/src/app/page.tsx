import { log } from '@repo/logger';
import { CounterButton, Link } from '@repo/ui';
import { Button } from '@repo/vendor-ui';

export const metadata = {
  title: 'Store | Showcase',
};

export default function Store(): JSX.Element {
  log('Hey! This is the Store page.');

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <Button>Hello You</Button>
      <CounterButton />
      <p className="description">
        Built With{' '}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {' & '}
        <Link href="https://nextjs.org/" newTab>
          Next.js
        </Link>
      </p>
    </div>
  );
}
