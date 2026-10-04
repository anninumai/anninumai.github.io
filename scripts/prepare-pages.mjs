import { copyFile, mkdir, readdir } from 'node:fs/promises';

const outputDir = new URL('../dist/client/', import.meta.url);

async function prepareRoutes(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      await prepareRoutes(new URL(`./${entry.name}/`, directory));
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    if (entry.name === 'index.html' || entry.name === '404.html') continue;

    const routeName = entry.name.slice(0, -'.html'.length);
    const routeDir = new URL(`./${routeName}/`, directory);
    await mkdir(routeDir, { recursive: true });
    await copyFile(new URL(entry.name, directory), new URL('index.html', routeDir));
  }
}

await prepareRoutes(outputDir);
console.log('Prepared extensionless route directories for GitHub Pages.');
