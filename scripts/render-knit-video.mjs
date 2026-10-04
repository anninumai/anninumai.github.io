// Bake the original stitch field and fabric into a seamless, silent loop.
// This runs on the author's machine, never in a visitor's browser.
import sharp from 'sharp';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'public/assets/knit');
await mkdir(output, { recursive: true });
const width = 1280, height = 1632, fps = 12, seconds = 12;
const columnGap = width * .72 / 1882 * 8.75;
// Use an exact number of rows and photo tiles so vertical repeats meet.
const rowGap = height / 272;
const n = value => Number(value.toFixed(2));
const svg = body => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${body}</svg>`);
const chevron = (x, y) => `M${n(x-columnGap*.36)} ${n(y-rowGap*.53)}L${n(x)} ${n(y+rowGap*.53)}L${n(x+columnGap*.36)} ${n(y-rowGap*.53)}`;
const random = seed => { const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
const stops = [[247,255,158],[192,187,255],[255,204,237]];
const colors = Array.from({ length: 12 }, (_, i) => {
  const scaled = (i+.5)/12*2, j = Math.min(1, Math.floor(scaled)), mix = scaled-j;
  return stops[j].map((v,k) => Math.round(v+(stops[j+1][k]-v)*mix)).join(',');
});

const texture = await sharp(resolve(output, 'white-stockinette-canvas.webp'))
  .resize(460, height/2, { fit:'fill' }).png().toBuffer();
const tiles = [];
for(let y=0;y<height;y+=height/2) for(let x=0;x<width;x+=460){
  const tileWidth = Math.min(460,width-x);
  tiles.push({ input:await sharp(texture).extract({left:0,top:0,width:tileWidth,height:height/2}).toBuffer(),left:x,top:y });
}
let stitches = '';
const cells = [];
for(let row=-1;row<=272;row++) for(let column=-1;column*columnGap<width+columnGap;column++){
  const x=column*columnGap,y=row*rowGap;
  const path=chevron(x,y);
  stitches+=path;
  const threshold=random(column*127.1+((row+272)%272)*311.7);
  if(threshold<=.24) cells.push({path,nx:x/width,ny:y/height,threshold});
}
const relief = svg(`<g fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".28"><path d="${stitches}" stroke="rgba(133,129,120,.14)" stroke-width="${n(columnGap*.46)}"/><path d="${stitches}" transform="translate(-.5,-.7)" stroke="rgba(255,255,253,.78)" stroke-width="${n(columnGap*.2)}"/></g>`);
const base = await sharp({create:{width,height,channels:3,background:'#f7f6f1'}})
  .composite([...tiles,{input:relief}]).png().toBuffer();

const destination = resolve(output,'background-loop.mp4');
const encoder = spawn('ffmpeg', ['-hide_banner','-loglevel','warning','-y',
  '-f','rawvideo','-pixel_format','rgb24','-video_size',`${width}x${height}`,'-framerate',String(fps),'-i','pipe:0',
  '-an','-c:v','libx264','-preset','slow','-crf','29','-pix_fmt','yuv420p','-profile:v','high','-level:v','4.0',
  '-movflags','+faststart','-g',String(fps*seconds),'-threads','2',destination], {stdio:['pipe','inherit','inherit']});
const encoded = once(encoder,'close');
encoder.stdin.on('error', error => { console.error(error); process.exitCode=1; });

for(let frame=0;frame<fps*seconds;frame++){
  const phase=frame/(fps*seconds)*Math.PI*2;
  const paths=colors.map(()=>[]);
  for(const {path,nx,ny,threshold} of cells){
    // Integer phase frequencies make both the time and vertical seams loop.
    const wave=Math.sin(nx*12+ny*Math.PI*2-phase)*.5
      +Math.cos(ny*Math.PI*4-nx*5+phase)*.3
      +Math.sin(nx*21-ny*Math.PI*6+phase)*.2;
    if(threshold>Math.max(0,wave-.12)*.28)continue;
    const field=.5+Math.sin(nx*5.1+ny*Math.PI*2+phase)*.2
      +Math.cos(ny*Math.PI*2-nx*1.2-phase)*.18
      +Math.sin(nx*7.2+ny*Math.PI*4+phase)*.09;
    paths[Math.min(11,Math.floor(Math.max(0,Math.min(1,field))*12))].push(path);
  }
  const overlay = svg(`<g opacity=".7" fill="none" stroke-width="${n(columnGap*.5)}" stroke-linecap="round" stroke-linejoin="round">${paths.map((p,i)=>`<path d="${p.join('')}" stroke="rgb(${colors[i]})"/>`).join('')}</g>`);
  const image = sharp(base).composite([{input:overlay}]);
  if(frame===0) await image.clone().webp({quality:84}).toFile(resolve(output,'background-loop-poster.webp'));
  const pixels=await image.removeAlpha().raw().toBuffer();
  if(!encoder.stdin.write(pixels))await once(encoder.stdin,'drain');
  if(frame%fps===0) console.log(`Baked ${frame/fps}/${seconds}s`);
}
encoder.stdin.end();
const [code] = await encoded;
if(code!==0)throw new Error(`ffmpeg exited with ${code}`);
console.log(`Rendered ${seconds}s / ${fps}fps / ${((await stat(destination)).size/1024/1024).toFixed(2)} MiB`);
