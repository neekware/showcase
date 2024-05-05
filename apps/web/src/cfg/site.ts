import { mdiGithub, mdiTwitter } from '@mdi/js';
import { type SiteSettings } from '@repo/ui';

export const siteSettings: SiteSettings = {
  name: 'Showcase UI',
  url: 'https://showcase.io',
  ogImage: 'https://showcase.io/og.jpg',
  description: 'Showcase your political self beautify on a unified portal.',
  socials: [
    {
      title: 'X',
      href: 'https://twitter.com/',
      icon: mdiTwitter,
    },
    {
      title: 'GitHub',
      href: 'https://github.com/neekware',
      icon: mdiGithub,
    },
  ],
};
