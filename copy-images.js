const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\youse\\.gemini\\antigravity-ide\\brain\\c5507a69-1fa9-4cb3-a493-69b01d7b11c4';
const destDir = path.join(__dirname, 'images');

// Ensure destination folder exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Map of generated filenames to project names
const imageMap = {
  'media__1780685930475.jpg': 'logo.png',
  'verona_tote_1780687089444.png': 'verona_tote.png',
  'milano_handbag_1780687967791.png': 'milano_handbag.png',
  'classic_beige_crossbody_1780687983123.png': 'classic_beige_crossbody.png',
  'signature_tote_1780687997787.png': 'signature_tote.png',
  'mini_monaco_1780688013820.png': 'mini_monaco.png',
  'serena_clutch_1780688029126.png': 'serena_clutch.png',
  'media__1780706351808.jpg': 'auth_campaign_bag.jpg'
};

console.log('Copying Valora Bags product images...');

Object.entries(imageMap).forEach(([srcName, destName]) => {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);

  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied ${srcName} -> ${destName}`);
    } catch (err) {
      console.error(`✗ Failed to copy ${srcName}:`, err.message);
    }
  } else {
    console.warn(`⚠ Source file not found: ${srcPath}`);
  }
});

console.log('Image copy process complete.');
