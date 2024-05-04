import { cn } from '@repo/util';
import { fontSans } from '@web/cfg/fonts';
import './styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          fontSans.variable,
          'bg-background min-h-screen font-sans antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
