import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Showcase',
    short_name: 'ShowU',
    description: 'Showcase You',
    start_url: '/',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/images/icons/icon-192x192.png',
        sizes: '192x192',
      },
      {
        src: '/images/icons/icon-256x256.png',
        sizes: '256x256',
      },
      {
        src: '/images/icons/icon-384x384.png',
        sizes: '384x384',
      },
      {
        src: '/images/icons/icon-512x512.png',
        sizes: '512x512',
      },
      {
        src: '/images/icons/favicon.png',
        sizes: '32x32 16x16',
      },
    ],
    display: 'standalone',
  };
}
