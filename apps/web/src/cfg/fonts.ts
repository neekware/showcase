// Inter is a variable font and doesn't need weight
import {
  JetBrains_Mono as FontMono,
  Roboto as FontRoboto,
  Inter as FontSans,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontRoboto = FontRoboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
