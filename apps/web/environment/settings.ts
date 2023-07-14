import { Metadata } from 'next';

import { NavItem, SiteConfig } from '@showcase/components';

export const siteConfig: SiteConfig = {
  name: 'Showcase',
  description:
    'Showcase is a multi-tenant that allows political individual or party to create their own websites.',
  url: 'https://showcase.io',
  ogImage: 'https://showcase.io/og.jpg',
  links: {
    twitter: 'https://twitter.com/showcase-io',
    github: 'https://github.com/showcase-io',
  },
};

export const leftNavItems: NavItem[] = [
  {
    title: 'Features',
    href: '/#features',
  },
  {
    title: 'Pricing',
    href: '/pricing',
    disabled: true,
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Documentation',
    href: '/docs',
  },
];

export const siteMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['showcase', 'showcase.io', 'multi-tenant', 'political'],
  authors: [
    {
      name: 'Neekware Inc.',
      url: 'https://neekware.com ',
    },
  ],
  creator: 'Neekware Inc.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@neekware',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};
