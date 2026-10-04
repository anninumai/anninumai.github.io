import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist/client');
const remote = process.argv.includes('--remote');
const origin = 'https://anninumai.github.io';
async function walk(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(entry =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)
  ))).flat();
}
const files = await walk(root);
const images = new Map();
const failures = [];
for (const file of files.filter(f => /\.(html|css)$/.test(f))) {
  const text = await readFile(file, 'utf8');
  const refs = [
    ...[...text.matchAll(/<(?:img|source)\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(m => m[1]),
    ...[...text.matchAll(/\bsrcset=["']([^"']+)["']/gi)].flatMap(m => m[1].split(',').map(s => s.trim().split(/\s+/)[0])),
    ...[...text.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map(m => m[1]).filter(s => /\.(webp|png|jpe?g|svg)(?:[?#]|$)/i.test(s)),
  ];
  for (let ref of refs) {
    ref = ref.replaceAll('&amp;', '&');
    if (ref.startsWith('data:')) continue;
    if (/localhost|127\.0\.0\.1|file:|\/Users\/|\/_next\/image/.test(ref)) failures.push({file,ref,error:'Non-static image URL'});
    const url = new URL(ref, `${origin}/${path.relative(root,file)}`);
    if (/\.(mp4|webm|mov)$/i.test(url.pathname)) continue;
    images.set(url.href, file);
    if (url.origin === origin) {
      try { await access(path.join(root, decodeURIComponent(url.pathname))); }
      catch { failures.push({file,ref,error:'Missing published file'}); }
    }
  }
}
// Include client-side animation frames and textures, even when absent in initial HTML.
for (const file of files.filter(f => /\.webp$/i.test(f))) images.set(new URL(path.relative(root,file), `${origin}/`).href, 'public asset');
if (remote) {
  const queue = [...images];
  await Promise.all(Array.from({length:8}, async () => {
    while (queue.length) {
      const [url,file] = queue.pop();
      try {
        const response = await fetch(url, {signal:AbortSignal.timeout(30000)});
        const bytes = new Uint8Array(await response.arrayBuffer());
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`HTTP ${response.status} ${response.headers.get('content-type')}`);
        if (url.endsWith('.webp') && String.fromCharCode(...bytes.slice(8,12)) !== 'WEBP') throw new Error('Invalid WebP response');
      } catch (error) { failures.push({file,url,error:String(error)}); }
    }
  }));
}
console.log(JSON.stringify({pages:files.filter(f=>f.endsWith('.html')).length,images:images.size,remote,failures}, null, 2));
if (failures.length) process.exitCode = 1;
