const fs = require('fs');
const path = require('path');

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Function to write sitemap index
function generateSitemapIndex(sitemaps) {
    const baseUrl = 'https://invisiblegrillsandsafetynets.in';
    const currentDate = new Date().toISOString();
    
    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    sitemaps.forEach(sitemap => {
        sitemapIndex += `
    <sitemap>
        <loc>${baseUrl}/${sitemap}</loc>
        <lastmod>${currentDate}</lastmod>
    </sitemap>`;
    });

    sitemapIndex += '\n</sitemapindex>';
    
    return sitemapIndex;
}

async function generateSitemaps() {
    const outDir = path.join(process.cwd(), 'out');
    const sitemaps = ['sitemap.xml', 'sitemap-services.xml', 'sitemap-images.xml'];
    
    // Ensure the output directory exists
    ensureDirectoryExists(outDir);
    
    // Generate sitemap index
    const sitemapIndex = generateSitemapIndex(sitemaps);
    
    // Write sitemap index to sitemap-index.xml
    fs.writeFileSync(
        path.join(outDir, 'sitemap-index.xml'),
        sitemapIndex
    );
    
    // Copy individual sitemaps from .next/server/app to out directory
    sitemaps.forEach(sitemap => {
        const sourcePath = path.join(process.cwd(), '.next/server/app', sitemap);
        const destPath = path.join(outDir, sitemap);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
        } else {
            console.warn(`Warning: ${sitemap} not found in .next/server/app`);
        }
    });
}

// Run the script
generateSitemaps().catch(console.error);