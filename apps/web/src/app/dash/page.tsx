import { log } from '@repo/logger';

export const metadata = {
  title: 'Dash | Showcase',
};

export default function Dash(): JSX.Element {
  log('Hey! This is the Store page.');

  return (
    <div className="flex min-h-screen flex-col items-center space-y-2 p-2">
      <div className="mx-auto flex max-w-5xl gap-2 text-2xl">
        <div>Dashboard</div>
      </div>
    </div>
  );
}
