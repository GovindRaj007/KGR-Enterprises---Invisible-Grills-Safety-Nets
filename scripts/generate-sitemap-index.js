const fs = require('fs');
const path = require('path');

function generateSitemapIndex() {
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  const currentDate = new Date().toISOString();
  const sitemaps = [
    'sitemap.xml',
    'sitemap-services.xml',
    'sitemap-images.xml'
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${baseUrl}/${sitemap}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  // Ensure the out directory exists
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Write the sitemap index
  fs.writeFileSync(path.join(outDir, 'sitemap-index.xml'), xmlContent);
}

// Generate the sitemap index file
generateSitemapIndex();