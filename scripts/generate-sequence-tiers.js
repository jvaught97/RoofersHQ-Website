#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const cliProgress = require('cli-progress');

// Configuration
const FRAME_COUNT = 192;
const SOURCE_DIR = path.join(__dirname, '../public/sequence');
const PARALLEL_LIMIT = 10;

// Quality tiers configuration
const TIERS = {
  thumb: { width: 400, height: 225, quality: 75, jpegQuality: 75 },
  medium: { width: 600, height: 338, quality: 80, jpegQuality: 80 },
  full: { width: 800, height: 450, quality: 85, jpegQuality: 85 },
};

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const skipExisting = args.includes('--skip-existing');

// Statistics
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  newSize: 0,
};

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Process a single frame for all tiers and formats
 */
async function processFrame(frameIndex, progressBar) {
  const sourceFile = path.join(SOURCE_DIR, `frame_${frameIndex}.jpg`);

  // Check if source file exists
  if (!fs.existsSync(sourceFile)) {
    stats.errors++;
    return;
  }

  const originalSize = getFileSize(sourceFile);
  stats.originalSize += originalSize;

  try {
    // Process each quality tier
    for (const [tierName, config] of Object.entries(TIERS)) {
      const tierDir = path.join(SOURCE_DIR, tierName);

      if (!isDryRun) {
        ensureDir(tierDir);
      }

      const webpPath = path.join(tierDir, `frame_${frameIndex}.webp`);
      const jpegPath = path.join(tierDir, `frame_${frameIndex}.jpg`);

      // Skip if files exist and --skip-existing is set
      if (skipExisting && fs.existsSync(webpPath) && fs.existsSync(jpegPath)) {
        stats.skipped++;
        continue;
      }

      if (isDryRun) {
        console.log(
          `Would create: ${tierName}/frame_${frameIndex}.webp and frame_${frameIndex}.jpg`
        );
        continue;
      }

      // Load image
      const image = sharp(sourceFile);

      // Generate WebP
      await image
        .clone()
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: config.quality })
        .toFile(webpPath);

      stats.newSize += getFileSize(webpPath);

      // Generate JPEG
      await image
        .clone()
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({ quality: config.jpegQuality })
        .toFile(jpegPath);

      stats.newSize += getFileSize(jpegPath);
    }

    stats.processed++;
  } catch (error) {
    console.error(`\nError processing frame ${frameIndex}:`, error.message);
    stats.errors++;
  }

  if (progressBar) {
    progressBar.increment();
  }
}

/**
 * Process frames in parallel batches
 */
async function processFramesInBatches() {
  const progressBar = new cliProgress.SingleBar(
    {
      format: 'Progress |{bar}| {percentage}% | {value}/{total} frames',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic
  );

  console.log(`\n🎬 Processing ${FRAME_COUNT} frames...`);
  console.log(`📊 Tiers: thumb (400x225), medium (600x338), full (800x450)`);
  console.log(`📁 Output: ${SOURCE_DIR}/{thumb,medium,full}/\n`);

  if (isDryRun) {
    console.log('🏃 DRY RUN - No files will be written\n');
  }

  progressBar.start(FRAME_COUNT, 0);

  // Process frames in parallel batches
  for (let i = 0; i < FRAME_COUNT; i += PARALLEL_LIMIT) {
    const batch = [];
    for (let j = i; j < Math.min(i + PARALLEL_LIMIT, FRAME_COUNT); j++) {
      batch.push(processFrame(j, progressBar));
    }
    await Promise.all(batch);
  }

  progressBar.stop();
}

/**
 * Main execution
 */
async function main() {
  console.log('\n✨ Sequence Tier Generator\n');

  // Verify source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Count existing frames
  const existingFrames = fs
    .readdirSync(SOURCE_DIR)
    .filter((f) => f.startsWith('frame_') && f.endsWith('.jpg')).length;

  console.log(`📸 Found ${existingFrames} source frames`);

  if (existingFrames === 0) {
    console.error('❌ No source frames found. Exiting.');
    process.exit(1);
  }

  const startTime = Date.now();

  await processFramesInBatches();

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print summary
  console.log('\n📈 Summary:');
  console.log(`   Processed: ${stats.processed} frames`);
  console.log(`   Skipped: ${stats.skipped} frames`);
  console.log(`   Errors: ${stats.errors} frames`);
  console.log(`   Duration: ${duration}s`);

  if (!isDryRun && stats.newSize > 0) {
    console.log(`\n💾 Storage:`);
    console.log(`   Original: ${formatBytes(stats.originalSize)}`);
    console.log(`   Generated: ${formatBytes(stats.newSize)}`);
    console.log(
      `   Total: ${formatBytes(stats.originalSize + stats.newSize)}`
    );
  }

  console.log('\n✅ Done!\n');
}

// Run
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
