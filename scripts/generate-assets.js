const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/sequence');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// We will use canvas, but installing canvas on some environments is tricky.
// Let's create a minimal SVG and save it as webp? No, browsers might be picky.
// Actually, simple way: Create a 1920x1080 solid black SVG with the frame number text.
// Then rename it to .webp. 
// WAIT: Browsers won't render SVG if the extension is webp but content is SVG? Actually some might.
// Safest bet for "production-ready code" generator is to just ask the user to provide images,
// BUT for verification I should provide at least ONE real binary image.
// I will not try to generate real images. I will just create empty files? No, that breaks onload.
// I'll create a single valid 1x1 transparent WEBP base64 string and write it.

const ONE_PIXEL_WEBP = Buffer.from(
    'UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
    'base64'
);

// We'll just write this same file 120 times.
// It will look invisible, but it will load. 
// To make it visible, I really should use a text overlay, but without `canvas` pkg it's hard.
// I will just rely on the fact that it loads, and the text overlays (HTML) will provide the visual feedback
// that the scroll is working (the beats).
// The canvas will just stay transparent/empty.
// Ideally the user replaces these.

console.log('Generating 120 placeholder frames...');

for (let i = 0; i < 120; i++) {
    const filePath = path.join(OUTPUT_DIR, `frame_${i}.webp`);
    fs.writeFileSync(filePath, ONE_PIXEL_WEBP);
}

console.log('Done.');
