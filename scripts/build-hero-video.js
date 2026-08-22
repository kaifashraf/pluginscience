const { execSync } = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs');

const framesDir = path.join(__dirname, '../public/hero/frames');
const outputVideo = path.join(__dirname, '../public/hero/workshop.webm');
const outputMp4 = path.join(__dirname, '../public/hero/workshop.mp4');
const listFile = path.join(framesDir, 'frames_list.txt');

console.log('Compiling frames into video...');

// Get all jpg frames, sort them, and write to list file
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg')).sort();
const fileContent = files.map(f => `file '${f}'`).join('\n');
fs.writeFileSync(listFile, fileContent);

try {
  console.log('Building MP4...');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i frames_list.txt -framerate 30 -c:v libx264 -pix_fmt yuv420p -crf 23 -preset fast "../workshop.mp4"`, {
    cwd: framesDir,
    stdio: 'inherit'
  });
  
  console.log('Building WebM...');
  execSync(`"${ffmpegPath}" -y -f concat -safe 0 -i frames_list.txt -framerate 30 -c:v libvpx-vp9 -b:v 0 -crf 30 -pix_fmt yuva420p "../workshop.webm"`, {
    cwd: framesDir,
    stdio: 'inherit'
  });
  
  console.log('Video compilation complete!');
  fs.unlinkSync(listFile);
  process.exit(0);
} catch (error) {
  console.error('Error generating videos:', error);
  process.exit(1);
}
