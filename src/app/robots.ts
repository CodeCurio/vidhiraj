import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Yandexbot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      { userAgent: 'NaverBot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
    ],
    sitemap: [
      'https://vidhirajglobalimpex.com/sitemap.xml',
    ],
    host: 'https://vidhirajglobalimpex.com',
  };
}
