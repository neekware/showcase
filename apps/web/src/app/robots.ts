import type { MetadataRoute } from 'next';
import { siteSettings } from '@web/cfg';

const { url } = siteSettings;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/auth', '/_next', '/_error', '/404', '/500'],
    },
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
