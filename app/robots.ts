import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // NOTE: /_next/static/ must stay crawlable. It holds the CSS and JS
          // bundles; blocking it stops Google rendering the pages at all.
          '/api/',
          '/admin/',
          '/private/',
          // Tracking-parameter URLs duplicate real pages.
          '/*?*utm_source=',
          '/*?*utm_medium=',
          '/*?*utm_campaign=',
        ],
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      // Slow down aggressive commercial crawlers.
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        crawlDelay: 10,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap-index.xml`,
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-services.xml`,
      `${baseUrl}/sitemap-images.xml`,
    ],
  };
}
