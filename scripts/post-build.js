const fs = require('fs');
const path = require('path');

// Copy .htaccess to out directory
fs.copyFileSync(
  path.join(__dirname, '../.htaccess'),
  path.join(__dirname, '../out/.htaccess')
);

console.log('✅ .htaccess file copied to out directory');

// Validate XML sitemap files
function validateSitemapFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      console.error(`❌ Invalid sitemap format in ${filePath}`);
      return false;
    }
    return true;
  }
  return false;
}

// Check and validate sitemap files
const sitemapFiles = [
  'sitemap.xml',
  'sitemap-services.xml',
  'sitemap-images.xml',
  'sitemap-index.xml'
];

const outDir = path.join(__dirname, '../out');
sitemapFiles.forEach(file => {
  const filePath = path.join(outDir, file);
  if (validateSitemapFile(filePath)) {
    console.log(`✅ ${file} validated successfully`);
  } else {
    console.warn(`⚠️ ${file} not found or invalid`);
  }
});

// Ensure robots.txt has proper sitemap references
const robotsPath = path.join(outDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const baseUrl = 'https://invisiblegrillsandsafetynets.in';
  
  // Ensure all sitemaps are referenced
  const sitemapUrls = sitemapFiles.map(file => `Sitemap: ${baseUrl}/${file}`);
  const existingSitemaps = robotsContent.match(/Sitemap:.*/g) || [];
  
  // Add any missing sitemap references
  sitemapUrls.forEach(sitemapUrl => {
    if (!robotsContent.includes(sitemapUrl)) {
      robotsContent += `\n${sitemapUrl}`;
    }
  });
  
  fs.writeFileSync(robotsPath, robotsContent);
  console.log('✅ robots.txt updated with sitemap references');
}