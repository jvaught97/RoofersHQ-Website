const fs = require('fs');
const path = require('path');

const SOURCE_DIR = '/Users/joey/Desktop/Zip archive 2';
const DEST_DIR = path.join(__dirname, '../public/sequence');

// Clean destination
if (fs.existsSync(DEST_DIR)) {
    fs.rmSync(DEST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DEST_DIR, { recursive: true });

// Get files
const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.match(/frame_\d+_delay/))
    .sort();

console.log(`Found ${files.length} frames.`);

files.forEach((file, index) => {
    const src = path.join(SOURCE_DIR, file);
    const dest = path.join(DEST_DIR, `frame_${index}.jpg`);
    fs.copyFileSync(src, dest);
});

console.log(`Imported ${files.length} frames to ${DEST_DIR}`);
