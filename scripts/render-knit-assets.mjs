// Build-time yarn rendering. Visitors download WebP instead of calculating
// thousands of stitches, colour samples and boundary intersections on arrival.
// Run `npm run assets:knit` after changing the source thumbnails.
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'public/assets/v2-knit');
await mkdir(output, { recursive: true });
const width = 780;
const height = 520;
const columnGap = width * 8.75 * .72 / (1882 * .39);
const rowGap = width * 12.25 * .72 / (1882 * .39);
const stitchWidth = columnGap * .72;
const stitchHeight = rowGap * 1.06;
const palette = [
  [245,239,226], [220,235,229], [187,224,217], [161,213,220],
  [140,196,220], [142,184,216], [120,158,199], [102,137,181],
  [207,211,237], [197,198,231], [181,174,216], [222,194,224],
  [231,181,207], [239,194,178], [211,222,177], [171,207,185],
];
const n = value => Number(value.toFixed(3));
const point = (x,y) => `${n(x)} ${n(y)}`;
const svg = (w,h,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const cell = (x,y) => `M${point(x-columnGap*.5,y-rowGap*.5)}L${point(x,y-rowGap*.34)}L${point(x+columnGap*.5,y-rowGap*.5)}L${point(x+columnGap*.5,y+rowGap*.5)}L${point(x,y+rowGap*.66)}L${point(x-columnGap*.5,y+rowGap*.5)}Z`;
const stitch = (x,y) => `M${point(x-stitchWidth*.5,y-stitchHeight*.5)}L${point(x,y+stitchHeight*.5)}L${point(x+stitchWidth*.5,y-stitchHeight*.5)}`;

function contains(points, x, y) {
  let inside = false;
  for (let i=0,j=points.length-1;i<points.length;j=i++) {
    const [xi,yi] = points[i], [xj,yj] = points[j];
    if ((yi>y)!==(yj>y) && x < (xj-xi)*(y-yi)/(yj-yi)+xi) inside = !inside;
  }
  return inside;
}

for (const file of (await readdir(resolve(root, 'public/assets/v2-thumbs'))).filter(file=>file.endsWith('.webp'))) {
  const src = `/assets/v2-thumbs/${file}`;
  const seed = [...src].reduce((value,c)=>((value*31)+c.charCodeAt(0))>>>0,2166136261);
  const noise = salt => { const v=Math.sin(seed*.0001+salt*78.233)*43758.5453; return v-Math.floor(v); };
  const corner = salt => ({
    x:Math.max(5,Math.round(width*(.05+noise(salt)*.1)/columnGap)),
    y:Math.max(4,Math.round(height*(.04+noise(salt+9)*.1)/rowGap)),
    steps:2+Math.floor(noise(salt+19)*3),
  });
  const tl=corner(1), tr=corner(2), br=corner(3), bl=corner(4);
  const left=columnGap*.62, right=width-columnGap*.62, top=rowGap*.7, bottom=height-rowGap*.7;
  const outline=[[left+tl.x*columnGap,top],[right-tr.x*columnGap,top]];
  for(let s=1;s<=tr.steps;s++){
    const x=right-tr.x*columnGap+Math.round(tr.x*s/tr.steps)*columnGap;
    outline.push([x-stitchWidth*.5,top+Math.round(tr.y*(s-1)/tr.steps)*rowGap],[x,top+Math.round(tr.y*s/tr.steps)*rowGap]);
  }
  outline.push([right,bottom-br.y*rowGap]);
  for(let s=1;s<=br.steps;s++){
    const y=bottom-br.y*rowGap+Math.round(br.y*s/br.steps)*rowGap;
    outline.push([right-Math.round(br.x*(s-1)/br.steps)*columnGap,y-stitchHeight*.5],[right-Math.round(br.x*s/br.steps)*columnGap,y]);
  }
  outline.push([left+bl.x*columnGap,bottom]);
  for(let s=1;s<=bl.steps;s++){
    const x=left+bl.x*columnGap-Math.round(bl.x*s/bl.steps)*columnGap;
    outline.push([x+stitchWidth*.5,bottom-Math.round(bl.y*(s-1)/bl.steps)*rowGap],[x,bottom-Math.round(bl.y*s/bl.steps)*rowGap]);
  }
  outline.push([left,top+tl.y*rowGap]);
  for(let s=1;s<=tl.steps;s++){
    const y=top+tl.y*rowGap-Math.round(tl.y*s/tl.steps)*rowGap;
    outline.push([left+Math.round(tl.x*(s-1)/tl.steps)*columnGap,y+stitchHeight*.5],[left+Math.round(tl.x*s/tl.steps)*columnGap,y]);
  }
  const choice=(row,col)=>{const v=Math.sin(seed*.00013+row*12.9898+col*78.233)*43758.5453;return v-Math.floor(v);};
  const boundary=(row,col,up,right,down,left)=>{
    const horizontal=up||down, position=horizontal?col:row, line=horizontal?row:col;
    const edge=up?1:right?2:down?3:left?4:0;
    const shifted=position+Math.floor(choice(line+edge*101,edge*37)*29);
    const cycle=Math.floor(shifted/29);
    let within=((shifted%29)+29)%29, run=0;
    for(const length of [10,15,4]){if(within<length)break;within-=length;run++;}
    return (Math.abs(cycle*3+run)%2===0)===(choice(line+edge*211,edge*73)>=.5);
  };
  const sampleWidth=Math.ceil(width/columnGap)+2, sampleHeight=Math.ceil(height/rowGap)+2;
  const pixels=await sharp(resolve(root,`public${src}`)).resize(sampleWidth,sampleHeight,{fit:'cover'}).removeAlpha().raw().toBuffer();
  const groups=palette.map(()=>({cells:'',stitches:''}));
  let mask='';
  for(let row=0;row*rowGap<height;row++)for(let col=0;col*columnGap<width;col++){
    const x=col*columnGap,y=row*rowGap;
    if(!contains(outline,x,y))continue;
    const up=!contains(outline,x,y-rowGap), right=!contains(outline,x+columnGap,y), down=!contains(outline,x,y+rowGap), left=!contains(outline,x-columnGap,y);
    if((up||right||down||left)&&!boundary(row,col,up,right,down,left))continue;
    const i=(Math.round(y/height*(sampleHeight-1))*sampleWidth+Math.round(x/width*(sampleWidth-1)))*3;
    const [r,g,b]=pixels.subarray(i,i+3);
    const density=Math.min(1,Math.max(0,Math.pow(1-(r*.2126+g*.7152+b*.0722)/255,.86)*1.12));
    const shade=1-density*.09;
    const pastel=[(r*.38+242*.62)*shade,(g*.38+238*.62)*shade,(b*.38+242*.62)*shade];
    let selected=0, distance=Infinity;
    palette.forEach((color,index)=>{const d=color.reduce((sum,v,j)=>sum+(v-pastel[j])**2,0);if(d<distance){distance=d;selected=index;}});
    const c=cell(x,y);
    mask+=c;
    groups[selected].cells+=c;
    groups[selected].stitches+=stitch(x,y);
  }
  const body=groups.map((paths,i)=>{
    const [r,g,b]=palette[i];
    return `<path d="${paths.cells}" fill="rgb(${r},${g},${b})"/><path d="${paths.stitches}" fill="none" stroke="rgb(${Math.max(28,r-14)},${Math.max(52,g-16)},${Math.max(86,b-12)})" stroke-opacity=".68" stroke-width="${n(columnGap*.42)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  await sharp(Buffer.from(svg(width,height,body))).resize(width*2,height*2).webp({quality:86,alphaQuality:100}).toFile(resolve(output,file));
  await sharp(Buffer.from(svg(width,height,body))).webp({quality:82,alphaQuality:100}).toFile(resolve(output,file.replace('.webp','-small.webp')));
  // The same silhouette masks the original photo during interaction.
  await sharp(Buffer.from(svg(width,height,`<path d="${mask}" fill="white"/>`))).webp({lossless:true}).toFile(resolve(output,file.replace('.webp','-mask.webp')));
  console.log(`Rendered ${file}`);
}

// Two frozen samples of the original pastel field. CSS gently crossfades
// their opacity; there is no full-screen JavaScript animation loop.
for(const [index,seconds] of [0,12].entries()){
  const w=1280,h=1600,cg=w*.72/1882*8.75,rg=w*.72/1882*12.25;
  const paths=Array.from({length:12},()=>[]);
  const random=seed=>{const v=Math.sin(seed*12.9898+78.233)*43758.5453;return v-Math.floor(v);};
  for(let row=-2;row<h/rg+3;row++)for(let col=-2;col<w/cg+3;col++){
    const x=col*cg,y=row*rg,nx=x/w,ny=y/w,threshold=random(col*127.1+row*311.7);
    if(threshold>.24)continue;
    const wave=Math.sin(nx*12+ny*6-seconds*.65)*.5+Math.cos(ny*13-nx*5+seconds*.42)*.3+Math.sin((nx-ny)*21+seconds*.28)*.2;
    if(threshold>Math.max(0,wave-.12)*.28)continue;
    const field=.5+Math.sin(nx*5.1+ny*1.7+seconds*.2)*.2+Math.cos(ny*4.3-nx*1.2-seconds*.15)*.18+Math.sin((nx+ny)*7.2+seconds*.11)*.09;
    const level=Math.min(11,Math.floor(Math.max(0,Math.min(1,field))*12));
    paths[level].push(`M${point(x-cg*.36,y-rg*.53)}L${point(x,y+rg*.53)}L${point(x+cg*.36,y-rg*.53)}`);
  }
  const stops=[[247,255,158],[192,187,255],[255,204,237]];
  const body=paths.map((path,i)=>{
    const scaled=(i+.5)/12*2,j=Math.min(1,Math.floor(scaled)),mix=scaled-j;
    const color=stops[j].map((v,k)=>Math.round(v+(stops[j+1][k]-v)*mix));
    return `<path d="${path.join('')}" fill="none" stroke="rgb(${color.join(',')})" stroke-width="${n(cg*.5)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  await sharp(Buffer.from(svg(w,h,body))).webp({quality:86,alphaQuality:100}).toFile(resolve(output,`field-${index+1}.webp`));
}
