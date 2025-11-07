const fs = require('fs');
const path = require('path');
const servicesDataPath = path.join(process.cwd(), 'data', 'servicesData.ts');

// Read and parse the TypeScript file
const servicesDataContent = fs.readFileSync(servicesDataPath, 'utf8');

// Extract the servicesData object using regex
const servicesDataMatch = servicesDataContent.match(/export const servicesData = ({[\s\S]*?});/);
if (!servicesDataMatch) {
  throw new Error('Could not find servicesData in the file');
}

// Evaluate the servicesData object
const servicesData = eval('(' + servicesDataMatch[1] + ')');

const BASE_URL = 'https://invisiblegrillsandsafetynets.in';
const LOCATIONS = ['hyderabad', 'bangalore', 'chennai', 'vijayawada', 'visakhapatnam'];

function generateSitemap() {
  const mainPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/gallery', priority: '0.9', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'daily' }
  ];

  const locationPages = LOCATIONS.map(loc => ({
    url: `/locations/${loc}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const servicePages = Object.keys(servicesData).map(slug => ({
    url: `/services/${slug}`,
    priority: '0.9',
    changefreq: 'weekly'
  }));

  const serviceLocationPages = Object.keys(servicesData).flatMap(slug => 
    LOCATIONS.map(loc => ({
      url: `/services/${slug}/${loc}`,
      priority: '0.8',
      changefreq: 'weekly'
    }))
  );

  const allPages = [...mainPages, ...locationPages, ...servicePages, ...serviceLocationPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${['hi', 'te', 'ta', 'kn'].map(lang => 
      `<xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${page.url}" />`
    ).join('\n    ')}
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${page.url}" />
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap.xml'), sitemap);
}

function generateImageSitemap() {
  const entries = Object.entries(servicesData).map(([slug, service]) => ({
    url: `${BASE_URL}/services/${slug}`,
    images: [
      {
        loc: `${BASE_URL}${service.image}`,
        title: service.title,
        caption: service.description
      },
      ...(service.images || []).map(img => ({
        loc: `${BASE_URL}${img}`,
        title: `${service.title} - Installation Example`
      }))
    ]
  }));

  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
${entry.images.map(img => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      ${img.caption ? `<image:caption>${img.caption}</image:caption>` : ''}
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-images.xml'), imageSitemap);
}

function generateServicesSitemap() {
  const entries = Object.keys(servicesData).flatMap(slug => [
    {
      url: `${BASE_URL}/services/${slug}`,
      priority: 0.9
    },
    ...LOCATIONS.map(location => ({
      url: `${BASE_URL}/services/${slug}/${location}`,
      priority: 0.8
    }))
  ]);

  const servicesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-services.xml'), servicesSitemap);
}

// Generate all sitemaps
generateSitemap();
generateImageSitemap();
generateServicesSitemap();

// Generate hreflang sitemap
const { generateHreflangSitemap } = require('./generate-hreflang-sitemap');
const allPages = [
  '',
  '/about',
  '/contact',
  '/gallery',
  '/services',
  ...LOCATIONS.map(loc => `/locations/${loc}`),
  ...Object.keys(servicesData).map(slug => `/services/${slug}`),
  ...Object.keys(servicesData).flatMap(slug => 
    LOCATIONS.map(loc => `/services/${slug}/${loc}`)
  )
];
generateHreflangSitemap(allPages);

// Generate sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-hreflang.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-index.xml'), sitemapIndex);