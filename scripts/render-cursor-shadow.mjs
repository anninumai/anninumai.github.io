import sharp from 'sharp';

// Bake the former canvas shadow once; the browser only moves this small image.
const offsets = [0.08, -0.12, 0.16, -0.04, 0.2, -0.16, 0.1, -0.08];
const bands = Array.from({ length: 16 }, (_, index) => {
  const x = offsets[index % offsets.length] * 10;
  const opacity = index % 3 === 0 ? 0.9 : 1;
  return `<g clip-path="url(#band-${index})" opacity="${opacity}"><use href="#arrow" x="${x}" /></g>`;
});
const clips = Array.from({ length: 16 }, (_, index) =>
  `<clipPath id="band-${index}"><rect width="70" height="7" y="${index * 7}" /></clipPath>`,
);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="224" viewBox="0 0 70 112">
  <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
    <path id="arrow" d="M11.5 9.1 V86.1 L23.5 70.7 L35.5 100.1 L45 92.68 L32.5 63.28 H55.5 Z" fill="#081016" fill-opacity=".17" filter="url(#soft)" />
    ${clips.join('')}
  </defs>
  ${bands.join('')}
</svg>`;

await sharp(Buffer.from(svg)).webp({ lossless: true }).toFile('public/assets/knit/cursor-shadow.webp');
