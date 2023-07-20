import { MetadataRoute } from 'next';

function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}

export default robots;
