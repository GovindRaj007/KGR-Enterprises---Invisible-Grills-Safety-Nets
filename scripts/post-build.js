const fs = require('fs');
const path = require('path');

// Copy .htaccess to out directory
fs.copyFileSync(
  path.join(__dirname, '../.htaccess'),
  path.join(__dirname, '../out/.htaccess')
);

console.log('✅ .htaccess file copied to out directory');