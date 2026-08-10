/**
 * Plugin Hero Frames Optimizer
 * 
 * Usage:
 *   1. Extract your archived frames into /public/hero/frames/
 *   2. Run: npm run optimize-frames
 * 
 * This script:
 *   - Reads all image files from /public/hero/frames/
 *   - Creates optimized 1280px JPGs in /public/hero/frames/ (overwrite)
 *   - Creates 480px low-res WebP previews in /public/hero/frames-lowres/
 */

import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const FRAMES_DIR = path.join(process.cwd(), 'public', 'hero', 'frames');
const LOWRES_DIR = path.join(process.cwd(), 'public', 'hero', 'frames-lowres');

const FULL_RES_WIDTH = 1280;
const LOW_RES_WIDTH = 480;

async function optimizeFrames() {
  // Ensure directories exist
  if (!fs.existsSync(FRAMES_DIR)) {
    console.error(`\n❌ Frames directory not found: ${FRAMES_DIR}`);
    console.error('   Please extract your archived frames into /public/hero/frames/ first.\n');
    process.exit(1);
  }

  if (!fs.existsSync(LOWRES_DIR)) {
    fs.mkdirSync(LOWRES_DIR, { recursive: true });
  }

  // Get all image files
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'];
  const files = fs.readdirSync(FRAMES_DIR)
    .filter(f => extensions.includes(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.error('\n❌ No image files found in', FRAMES_DIR);
    process.exit(1);
  }

  console.log(`\n🔧 Plugin Hero Frame Optimizer`);
  console.log(`   Found ${files.length} frames to process\n`);

  let processed = 0;
  const batchSize = 10;

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (file) => {
      const inputPath = path.join(FRAMES_DIR, file);
      const baseName = path.parse(file).name;

      // Create optimized full-res JPG
      const fullResOutput = path.join(FRAMES_DIR, `${baseName}.jpg`);
      if (path.extname(file).toLowerCase() !== '.jpg' || true) {
        await sharp(inputPath)
          .resize(FULL_RES_WIDTH, undefined, { withoutEnlargement: true })
          .jpeg({ quality: 85, mozjpeg: true })
          .toFile(fullResOutput + '.tmp');
        
        // Replace original
        fs.renameSync(fullResOutput + '.tmp', fullResOutput);
      }

      // Create low-res WebP preview
      const lowResOutput = path.join(LOWRES_DIR, `${baseName}.webp`);
      await sharp(inputPath)
        .resize(LOW_RES_WIDTH, undefined, { withoutEnlargement: true })
        .webp({ quality: 70 })
        .toFile(lowResOutput);

      processed++;
    }));

    const pct = Math.round((Math.min(i + batchSize, files.length) / files.length) * 100);
    process.stdout.write(`\r   Processing: ${pct}% (${Math.min(i + batchSize, files.length)}/${files.length})`);
  }

  console.log(`\n\n✅ Optimization complete!`);
  console.log(`   Full-res (${FULL_RES_WIDTH}px JPG): ${FRAMES_DIR}`);
  console.log(`   Low-res  (${LOW_RES_WIDTH}px WebP): ${LOWRES_DIR}`);
  console.log(`   Total frames: ${processed}\n`);
}

optimizeFrames().catch((err) => {
  console.error('Error optimizing frames:', err);
  process.exit(1);
});
