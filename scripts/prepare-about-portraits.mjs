import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

// Pass the five supplied photos in order, from open hands to closed hands.
const sources = process.argv.slice(2);
if (sources.length !== 5) throw new Error('Provide five portrait paths in open-to-closed order.');
const output = new URL('../public/assets/about-v2/', import.meta.url);
await mkdir(output, { recursive: true });

for (const [index, source] of sources.entries()) {
  const metadata = await sharp(source).metadata();
  if (metadata.width !== 1122 || metadata.height !== 1402) {
    throw new Error(`Expected a 1122 × 1402 portrait: ${source}`);
  }
  const target = new URL(`portrait-${String(index + 1).padStart(2, '0')}.webp`, output);
  const result = await sharp(source).webp({ quality: 84, effort: 6 }).toFile(target.pathname);
  console.log(`${target.pathname}: ${result.size} bytes`);
}
