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
  const pages = [
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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
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
</sitemapindex>`;

fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-index.xml'), sitemapIndex);