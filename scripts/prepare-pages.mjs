import { copyFile, mkdir, readdir } from 'node:fs/promises';

const outputDir = new URL('../dist/client/', import.meta.url);
const entries = await readdir(outputDir, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
  if (entry.name === 'index.html' || entry.name === '404.html') continue;

  const routeName = entry.name.slice(0, -'.html'.length);
  const routeDir = new URL(`./${routeName}/`, outputDir);
  await mkdir(routeDir, { recursive: true });
  await copyFile(
    new URL(entry.name, outputDir),
    new URL('index.html', routeDir),
  );
}

console.log('Prepared extensionless route directories for GitHub Pages.');
