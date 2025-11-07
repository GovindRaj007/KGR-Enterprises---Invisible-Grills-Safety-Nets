const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://invisiblegrillsandsafetynets.in';
const LANGUAGES = ['en', 'hi', 'te', 'ta', 'kn'];

function generateHreflangSitemap(pages) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page}</loc>
    ${LANGUAGES.map(lang => 
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${page}" />`
    ).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${page}" />
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'out', 'sitemap-hreflang.xml'), sitemap);
}

// Update sitemap index to include the new hreflang sitemap
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

module.exports = { generateHreflangSitemap };