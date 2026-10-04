'use client';

import { useEffect, useRef } from 'react';

type WovenProjectImageProps = {
  src: string;
  eager?: boolean;
};

const PHOTO_WIDTH = 1882;
const PHOTO_DISPLAY_SCALE = 0.72;
const SOURCE_COLUMN_GAP = 8.75;
const SOURCE_ROW_GAP = 12.25;
const PASTEL_YARN_PALETTE = [
  [245, 239, 226],
  [220, 235, 229],
  [187, 224, 217],
  [161, 213, 220],
  [140, 196, 220],
  [142, 184, 216],
  [120, 158, 199],
  [102, 137, 181],
  [207, 211, 237],
  [197, 198, 231],
  [181, 174, 216],
  [222, 194, 224],
  [231, 181, 207],
  [239, 194, 178],
  [211, 222, 177],
  [171, 207, 185],
] as const;

const WOVEN_PREVIEW_CACHE = new Map<string, HTMLCanvasElement>();
const WOVEN_PREVIEW_CACHE_LIMIT = 12;

export function WovenProjectImage({ src, eager = false }: WovenProjectImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const digitalCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const digitalCanvas = digitalCanvasRef.current;
    if (!frame || !canvas || !digitalCanvas) return;

    let disposed = false;
    let image: HTMLImageElement | null = null;
    let resizeFrame = 0;
    let revealFrame = 0;
    let idleDraw = 0;
    let fullDrawComplete = false;
    let pendingRevealX = 0;
    let pendingRevealY = 0;
    let currentCenterAmount = 0;
    let revealStarted = false;
    let lastRevealKey = '';
    let drawDigitalReveal: ((x: number, y: number, centerAmountOverride?: number) => void) | null = null;

    const draw = (forceFullDraw = false) => {
      if (!image || disposed) return;
      const article = frame.closest<HTMLElement>('.v2-archive-card');
      const context = canvas.getContext('2d');
      const digitalContext = digitalCanvas.getContext('2d');
      if (!article || !context || !digitalContext) return;

      const width = Math.max(1, Math.round(frame.clientWidth));
      const height = Math.max(1, Math.round(frame.clientHeight));
      const worldLeft = article.offsetLeft;
      const worldTop = article.offsetTop;
      const photoScale = (window.innerWidth * PHOTO_DISPLAY_SCALE) / PHOTO_WIDTH;
      const columnGap = SOURCE_COLUMN_GAP * photoScale;
      const rowGap = SOURCE_ROW_GAP * photoScale;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.15);
      const cacheKey = `${src}:${width}:${height}:${Math.round(worldLeft)}:${Math.round(worldTop)}:${ratio}:${window.innerWidth}`;
      const cachedPreview = WOVEN_PREVIEW_CACHE.get(cacheKey);

      if (cachedPreview && !forceFullDraw) {
        canvas.width = cachedPreview.width;
        canvas.height = cachedPreview.height;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(cachedPreview, 0, 0);
        frame.classList.add('is-woven-ready');
        window.dispatchEvent(new CustomEvent('v2-knit-ready'));
        if (!fullDrawComplete && !idleDraw) {
          idleDraw = window.setTimeout(() => {
            idleDraw = 0;
            draw(true);
          }, 180);
        }
        return;
      }

      const sourceRatio = image.naturalWidth / image.naturalHeight;
      const targetRatio = width / height;
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;

      if (sourceRatio > targetRatio) {
        sourceWidth = image.naturalHeight * targetRatio;
        sourceX = (image.naturalWidth - sourceWidth) / 2;
      } else {
        sourceHeight = image.naturalWidth / targetRatio;
        sourceY = (image.naturalHeight - sourceHeight) / 2;
      }

      const projectTexture = document.createElement('canvas');
      projectTexture.width = width;
      projectTexture.height = height;
      const projectContext = projectTexture.getContext('2d');
      if (!projectContext) return;
      projectContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);

      // Colour sampling only needs one value per stitch. Reading a full-size
      // image delayed the knit preview on return navigation, so sample from a
      // small grid while retaining the full image for the hover reveal.
      const sampleWidth = Math.max(2, Math.ceil(width / columnGap) + 2);
      const sampleHeight = Math.max(2, Math.ceil(height / rowGap) + 2);
      const sampleTexture = document.createElement('canvas');
      sampleTexture.width = sampleWidth;
      sampleTexture.height = sampleHeight;
      const sampleContext = sampleTexture.getContext('2d');
      if (!sampleContext) return;
      sampleContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sampleWidth, sampleHeight);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      digitalCanvas.width = Math.round(width * ratio);
      digitalCanvas.height = Math.round(height * ratio);
      digitalContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      digitalContext.clearRect(0, 0, width, height);

      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const stitchWidth = columnGap * 0.72;
      const stitchHeight = rowGap * 1.06;
      const firstRow = Math.floor(worldTop / rowGap) - 1;
      const lastRow = Math.ceil((worldTop + height) / rowGap) + 1;
      const firstColumn = Math.floor(worldLeft / columnGap) - 1;
      const lastColumn = Math.ceil((worldLeft + width) / columnGap) + 1;
      const appendKnitStitch = (path: Path2D, x: number, y: number) => {
        path.moveTo(x - stitchWidth * 0.5, y - stitchHeight * 0.5);
        path.lineTo(x, y + stitchHeight * 0.5);
        path.lineTo(x + stitchWidth * 0.5, y - stitchHeight * 0.5);
      };
      const appendKnitCell = (path: Path2D, x: number, y: number) => {
        const chevron = rowGap * 0.16;
        path.moveTo(x - columnGap * 0.5, y - rowGap * 0.5);
        path.lineTo(x, y - rowGap * 0.5 + chevron);
        path.lineTo(x + columnGap * 0.5, y - rowGap * 0.5);
        path.lineTo(x + columnGap * 0.5, y + rowGap * 0.5);
        path.lineTo(x, y + rowGap * 0.5 + chevron);
        path.lineTo(x - columnGap * 0.5, y + rowGap * 0.5);
        path.closePath();
      };
      context.lineCap = 'round';
      context.lineJoin = 'round';

      // Thousands of individual fill/stroke calls caused a hitch whenever a
      // new card entered the viewport. Quantise the yarn into a small palette
      // and paint each colour as one combined path instead.
      const yarnGroups = PASTEL_YARN_PALETTE.map(() => ({
        cells: new Path2D(),
        stitches: new Path2D(),
      }));

      for (let globalRow = firstRow; globalRow <= lastRow; globalRow += 1) {
        const localY = globalRow * rowGap - worldTop;

        for (let globalColumn = firstColumn; globalColumn <= lastColumn; globalColumn += 1) {
          const localX = globalColumn * columnGap - worldLeft;
          if (localX < 0 || localX >= width || localY < 0 || localY >= height) continue;
          const sampleX = Math.max(0, Math.min(sampleWidth - 1, Math.round(localX / width * (sampleWidth - 1))));
          const sampleY = Math.max(0, Math.min(sampleHeight - 1, Math.round(localY / height * (sampleHeight - 1))));
          const pixel = (sampleY * sampleWidth + sampleX) * 4;
          const sourceRed = pixels[pixel];
          const sourceGreen = pixels[pixel + 1];
          const sourceBlue = pixels[pixel + 2];
          const luminance = (sourceRed * 0.2126 + sourceGreen * 0.7152 + sourceBlue * 0.0722) / 255;
          const density = Math.min(1, Math.max(0, Math.pow(1 - luminance, 0.86) * 1.12));
          const shade = 1 - density * 0.09;
          const pastelRed = (sourceRed * 0.38 + 242 * 0.62) * shade;
          const pastelGreen = (sourceGreen * 0.38 + 238 * 0.62) * shade;
          const pastelBlue = (sourceBlue * 0.38 + 242 * 0.62) * shade;
          let paletteIndex = 0;
          let nearestDistance = Number.POSITIVE_INFINITY;
          for (let index = 0; index < PASTEL_YARN_PALETTE.length; index += 1) {
            const yarn = PASTEL_YARN_PALETTE[index];
            const redDistance = pastelRed - yarn[0];
            const greenDistance = pastelGreen - yarn[1];
            const blueDistance = pastelBlue - yarn[2];
            const distance = redDistance * redDistance + greenDistance * greenDistance + blueDistance * blueDistance;
            if (distance < nearestDistance) {
              nearestDistance = distance;
              paletteIndex = index;
            }
          }
          appendKnitCell(yarnGroups[paletteIndex].cells, localX, localY);
          appendKnitStitch(yarnGroups[paletteIndex].stitches, localX, localY);
        }
      }

      for (let level = 0; level < PASTEL_YARN_PALETTE.length; level += 1) {
        const [yarnRed, yarnGreen, yarnBlue] = PASTEL_YARN_PALETTE[level];
        context.fillStyle = `rgb(${yarnRed}, ${yarnGreen}, ${yarnBlue})`;
        context.fill(yarnGroups[level].cells);
        context.strokeStyle = `rgba(${Math.max(28, yarnRed - 14)}, ${Math.max(52, yarnGreen - 16)}, ${Math.max(86, yarnBlue - 12)}, .68)`;
        context.lineWidth = Math.max(0.9, columnGap * 0.42);
        context.stroke(yarnGroups[level].stitches);
      }

      // Cut a bold, stepped silhouette from the global knit grid. Each work
      // receives stable corner depths, while every step stays on a stitch.
      const seed = Array.from(src).reduce((value, character) => ((value * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
      const noise = (salt: number) => {
        const value = Math.sin(seed * 0.0001 + salt * 78.233) * 43758.5453;
        return value - Math.floor(value);
      };
      const firstColumnCenter = Math.ceil(worldLeft / columnGap) * columnGap - worldLeft;
      const lastColumnCenter = Math.floor((worldLeft + width) / columnGap) * columnGap - worldLeft;
      const firstRowCenter = Math.ceil(worldTop / rowGap) * rowGap - worldTop;
      const lastRowCenter = Math.floor((worldTop + height) / rowGap) * rowGap - worldTop;
      // Keep the outermost stitch fully inside the canvas. Otherwise its V tip
      // is clipped by the rectangular bitmap edge and becomes a straight line.
      const left = Math.max(columnGap * 0.62, firstColumnCenter - stitchWidth * 0.55);
      const right = Math.min(width - columnGap * 0.62, lastColumnCenter + stitchWidth * 0.55);
      const top = Math.max(rowGap * 0.7, firstRowCenter - stitchHeight * 0.55);
      const bottom = Math.min(height - rowGap * 0.7, lastRowCenter + stitchHeight * 0.55);
      const corner = (salt: number) => ({
        xCells: Math.max(5, Math.round(width * (0.05 + noise(salt) * 0.1) / columnGap)),
        yCells: Math.max(4, Math.round(height * (0.04 + noise(salt + 9) * 0.1) / rowGap)),
        steps: 2 + Math.floor(noise(salt + 19) * 3),
      });
      const topLeft = corner(1);
      const topRight = corner(2);
      const bottomRight = corner(3);
      const bottomLeft = corner(4);
      const steppedShape = new Path2D();

      steppedShape.moveTo(left + topLeft.xCells * columnGap, top);
      steppedShape.lineTo(right - topRight.xCells * columnGap, top);
      for (let step = 1; step <= topRight.steps; step += 1) {
        const x = right - topRight.xCells * columnGap + Math.round(topRight.xCells * step / topRight.steps) * columnGap;
        const yBefore = top + Math.round(topRight.yCells * (step - 1) / topRight.steps) * rowGap;
        const yAfter = top + Math.round(topRight.yCells * step / topRight.steps) * rowGap;
        steppedShape.lineTo(x - stitchWidth * 0.5, yBefore);
        steppedShape.lineTo(x, yAfter);
      }

      steppedShape.lineTo(right, bottom - bottomRight.yCells * rowGap);
      for (let step = 1; step <= bottomRight.steps; step += 1) {
        const y = bottom - bottomRight.yCells * rowGap + Math.round(bottomRight.yCells * step / bottomRight.steps) * rowGap;
        const xBefore = right - Math.round(bottomRight.xCells * (step - 1) / bottomRight.steps) * columnGap;
        const xAfter = right - Math.round(bottomRight.xCells * step / bottomRight.steps) * columnGap;
        steppedShape.lineTo(xBefore, y - stitchHeight * 0.5);
        steppedShape.lineTo(xAfter, y);
      }

      steppedShape.lineTo(left + bottomLeft.xCells * columnGap, bottom);
      for (let step = 1; step <= bottomLeft.steps; step += 1) {
        const x = left + bottomLeft.xCells * columnGap - Math.round(bottomLeft.xCells * step / bottomLeft.steps) * columnGap;
        const yBefore = bottom - Math.round(bottomLeft.yCells * (step - 1) / bottomLeft.steps) * rowGap;
        const yAfter = bottom - Math.round(bottomLeft.yCells * step / bottomLeft.steps) * rowGap;
        steppedShape.lineTo(x + stitchWidth * 0.5, yBefore);
        steppedShape.lineTo(x, yAfter);
      }

      steppedShape.lineTo(left, top + topLeft.yCells * rowGap);
      for (let step = 1; step <= topLeft.steps; step += 1) {
        const y = top + topLeft.yCells * rowGap - Math.round(topLeft.yCells * step / topLeft.steps) * rowGap;
        const xBefore = left + Math.round(topLeft.xCells * (step - 1) / topLeft.steps) * columnGap;
        const xAfter = left + Math.round(topLeft.xCells * step / topLeft.steps) * columnGap;
        steppedShape.lineTo(xBefore, y + stitchHeight * 0.5);
        steppedShape.lineTo(xAfter, y);
      }
      steppedShape.closePath();

      const stitchMask = document.createElement('canvas');
      stitchMask.width = width;
      stitchMask.height = height;
      const stitchMaskContext = stitchMask.getContext('2d');
      if (!stitchMaskContext) return;
      stitchMaskContext.fillStyle = '#000';
      const stitchChoice = (row: number, column: number) => {
        const value = Math.sin(seed * 0.00013 + row * 12.9898 + column * 78.233) * 43758.5453;
        return value - Math.floor(value);
      };
      const boundaryRuns = [10, 15, 4] as const;
      const boundaryRunTotal = boundaryRuns.reduce((total, run) => total + run, 0);
      const groupedBoundaryChoice = (
        row: number,
        column: number,
        outsideTop: boolean,
        outsideRight: boolean,
        outsideBottom: boolean,
        outsideLeft: boolean,
      ) => {
        // Follow the edge rather than deciding stitch by stitch. A run keeps
        // 10, 15 or 4 adjacent stitches in the same yarn, while its starting
        // point and first colour shift for each row/column of the silhouette.
        const followsHorizontalEdge = outsideTop || outsideBottom;
        const position = followsHorizontalEdge ? column : row;
        const line = followsHorizontalEdge ? row : column;
        const edge = outsideTop ? 1 : outsideRight ? 2 : outsideBottom ? 3 : outsideLeft ? 4 : 0;
        const phase = Math.floor(stitchChoice(line + edge * 101, edge * 37) * boundaryRunTotal);
        const shifted = position + phase;
        const cycle = Math.floor(shifted / boundaryRunTotal);
        let withinCycle = ((shifted % boundaryRunTotal) + boundaryRunTotal) % boundaryRunTotal;
        let runIndex = 0;
        for (let index = 0; index < boundaryRuns.length; index += 1) {
          if (withinCycle < boundaryRuns[index]) {
            runIndex = index;
            break;
          }
          withinCycle -= boundaryRuns[index];
        }
        const firstRunUsesImage = stitchChoice(line + edge * 211, edge * 73) >= 0.5;
        const alternatingRun = Math.abs(cycle * boundaryRuns.length + runIndex) % 2 === 0;
        return alternatingRun === firstRunUsesImage;
      };
      const visibleStitchCells = new Path2D();
      for (let globalRow = firstRow; globalRow <= lastRow; globalRow += 1) {
        const localY = globalRow * rowGap - worldTop;
        for (let globalColumn = firstColumn; globalColumn <= lastColumn; globalColumn += 1) {
          const localX = globalColumn * columnGap - worldLeft;
          if (!stitchMaskContext.isPointInPath(steppedShape, localX, localY)) continue;
          const outsideLeft = !stitchMaskContext.isPointInPath(steppedShape, localX - columnGap, localY);
          const outsideRight = !stitchMaskContext.isPointInPath(steppedShape, localX + columnGap, localY);
          const outsideTop = !stitchMaskContext.isPointInPath(steppedShape, localX, localY - rowGap);
          const outsideBottom = !stitchMaskContext.isPointInPath(steppedShape, localX, localY + rowGap);
          const overlapsBoundary = outsideLeft || outsideRight || outsideTop || outsideBottom;
          // A boundary stitch is indivisible. Neighbouring stitches now switch
          // yarn as larger runs, rather than producing fine-grained noise.
          if (!overlapsBoundary || groupedBoundaryChoice(
            globalRow,
            globalColumn,
            outsideTop,
            outsideRight,
            outsideBottom,
            outsideLeft,
          )) {
            appendKnitCell(visibleStitchCells, localX, localY);
          }
        }
      }
      stitchMaskContext.fill(visibleStitchCells);

      context.save();
      context.globalCompositeOperation = 'destination-in';
      context.drawImage(stitchMask, 0, 0);
      context.restore();

      // Cache the fully revealed photograph once. Hover then only applies a
      // tiny one-pixel-per-stitch mask instead of rebuilding large Path2D
      // objects across the full-resolution canvas.
      const digitalSource = document.createElement('canvas');
      digitalSource.width = width;
      digitalSource.height = height;
      const digitalSourceContext = digitalSource.getContext('2d');
      if (!digitalSourceContext) return;
      digitalSourceContext.drawImage(projectTexture, 0, 0);
      digitalSourceContext.globalCompositeOperation = 'destination-in';
      digitalSourceContext.drawImage(stitchMask, 0, 0);

      const maskColumnCount = lastColumn - firstColumn + 1;
      const maskRowCount = lastRow - firstRow + 1;
      const stitchGridMask = document.createElement('canvas');
      stitchGridMask.width = maskColumnCount;
      stitchGridMask.height = maskRowCount;
      const stitchGridContext = stitchGridMask.getContext('2d');
      if (!stitchGridContext) return;
      const stitchGridImage = stitchGridContext.createImageData(maskColumnCount, maskRowCount);
      const stitchGridPixels = new Uint32Array(stitchGridImage.data.buffer);
      const maskLeft = firstColumn * columnGap - worldLeft - columnGap * 0.5;
      const maskTop = firstRow * rowGap - worldTop - rowGap * 0.5;

      // Reveal the source photograph only through whole stitches. Near an edge
      // it begins as a small round window; toward the centre it grows while
      // its perimeter becomes softly irregular rather than perfectly circular.
      drawDigitalReveal = (pointerX: number, pointerY: number, centerAmountOverride?: number) => {
        const distanceFromCenter = Math.min(1, Math.max(
          Math.abs(pointerX - width * 0.5) / (width * 0.5),
          Math.abs(pointerY - height * 0.5) / (height * 0.5),
        ));
        const centerAmount = centerAmountOverride ?? (1 - distanceFromCenter);
        const revealKey = `${Math.round(pointerX / columnGap)}:${Math.round(pointerY / rowGap)}:${Math.round(centerAmount * 100)}`;
        if (revealKey === lastRevealKey) return;
        lastRevealKey = revealKey;
        // Preserve a recognisable circle while letting its perimeter become
        // gently irregular as it grows toward the centre of the image.
        const organicRadius = 40 + centerAmount * Math.min(width, height) * 0.3;
        const fullRevealProgress = Math.max(0, Math.min(1, (centerAmount - 0.62) / 0.25));
        const easedFullReveal = fullRevealProgress * fullRevealProgress * (3 - 2 * fullRevealProgress);
        const fullImageRadius = Math.hypot(width, height) * 0.75;
        const circleRadius = organicRadius + (fullImageRadius - organicRadius) * easedFullReveal;
        const deformationAmount = centerAmount * 0.14 * (1 - easedFullReveal);
        frame.style.setProperty('--digital-hover-opacity', String(0.88 + easedFullReveal * 0.12));

        digitalContext.setTransform(1, 0, 0, 1, 0, 0);
        digitalContext.clearRect(0, 0, digitalCanvas.width, digitalCanvas.height);
        digitalContext.setTransform(ratio, 0, 0, ratio, 0, 0);

        if (easedFullReveal > 0.995) {
          digitalContext.drawImage(digitalSource, 0, 0, width, height);
          return;
        }

        const revealReach = circleRadius * (1 + deformationAmount) + Math.max(columnGap, rowGap);
        const pointerWorldX = worldLeft + pointerX;
        const pointerWorldY = worldTop + pointerY;
        const revealFirstColumn = Math.floor((pointerWorldX - revealReach) / columnGap);
        const revealLastColumn = Math.ceil((pointerWorldX + revealReach) / columnGap);
        const revealFirstRow = Math.floor((pointerWorldY - revealReach) / rowGap);
        const revealLastRow = Math.ceil((pointerWorldY + revealReach) / rowGap);
        stitchGridPixels.fill(0);

        for (let globalRow = revealFirstRow; globalRow <= revealLastRow; globalRow += 1) {
          if (globalRow < firstRow || globalRow > lastRow) continue;
          const localY = globalRow * rowGap - worldTop;
          for (let globalColumn = revealFirstColumn; globalColumn <= revealLastColumn; globalColumn += 1) {
            if (globalColumn < firstColumn || globalColumn > lastColumn) continue;
            const localX = globalColumn * columnGap - worldLeft;
            const deltaX = localX - pointerX;
            const deltaY = localY - pointerY;
            const cellHash = ((globalRow * 73856093) ^ (globalColumn * 19349663) ^ seed) >>> 0;
            const cellVariation = cellHash / 4294967295 - 0.5;
            const organicEdge = 1 + deformationAmount * cellVariation * 1.15;
            const cellRadius = circleRadius * organicEdge;
            if (deltaX * deltaX + deltaY * deltaY <= cellRadius * cellRadius) {
              const maskX = globalColumn - firstColumn;
              const maskY = globalRow - firstRow;
              stitchGridPixels[maskY * maskColumnCount + maskX] = 0xffffffff;
            }
          }
        }

        stitchGridContext.putImageData(stitchGridImage, 0, 0);
        digitalContext.drawImage(digitalSource, 0, 0, width, height);
        digitalContext.save();
        digitalContext.globalCompositeOperation = 'destination-in';
        digitalContext.imageSmoothingEnabled = false;
        digitalContext.drawImage(
          stitchGridMask,
          maskLeft,
          maskTop,
          maskColumnCount * columnGap,
          maskRowCount * rowGap,
        );
        digitalContext.restore();
      };

      fullDrawComplete = true;
      const preview = document.createElement('canvas');
      preview.width = canvas.width;
      preview.height = canvas.height;
      preview.getContext('2d')?.drawImage(canvas, 0, 0);
      WOVEN_PREVIEW_CACHE.delete(cacheKey);
      WOVEN_PREVIEW_CACHE.set(cacheKey, preview);
      if (WOVEN_PREVIEW_CACHE.size > WOVEN_PREVIEW_CACHE_LIMIT) {
        const oldestKey = WOVEN_PREVIEW_CACHE.keys().next().value;
        if (oldestKey) WOVEN_PREVIEW_CACHE.delete(oldestKey);
      }
      frame.classList.add('is-woven-ready');
      window.dispatchEvent(new CustomEvent('v2-knit-ready'));
    };

    const load = () => {
      if (image || disposed) return;
      image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        draw();
        if (frame.classList.contains('is-pointer-active')) {
          drawDigitalReveal?.(pendingRevealX, pendingRevealY, currentCenterAmount);
        }
      };
      image.src = src;
    };

    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => draw());
    };
    const onPointerMove = (event: MouseEvent) => {
      frame.classList.add('is-pointer-active');
      const bounds = frame.getBoundingClientRect();
      pendingRevealX = event.clientX - bounds.left;
      pendingRevealY = event.clientY - bounds.top;
      load();
      if (revealFrame) return;
      if (!revealStarted) {
        currentCenterAmount = 0;
        revealStarted = true;
      }
      const animateReveal = () => {
        const distanceFromCenter = Math.min(1, Math.max(
          Math.abs(pendingRevealX - frame.clientWidth * 0.5) / (frame.clientWidth * 0.5),
          Math.abs(pendingRevealY - frame.clientHeight * 0.5) / (frame.clientHeight * 0.5),
        ));
        const targetCenterAmount = 1 - distanceFromCenter;
        currentCenterAmount += (targetCenterAmount - currentCenterAmount) * 0.08;
        drawDigitalReveal?.(pendingRevealX, pendingRevealY, currentCenterAmount);
        if (Math.abs(targetCenterAmount - currentCenterAmount) > 0.004) {
          revealFrame = requestAnimationFrame(animateReveal);
        } else {
          currentCenterAmount = targetCenterAmount;
          drawDigitalReveal?.(pendingRevealX, pendingRevealY, currentCenterAmount);
          revealFrame = 0;
        }
      };
      revealFrame = requestAnimationFrame(animateReveal);
    };
    const onPointerLeave = () => {
      cancelAnimationFrame(revealFrame);
      revealFrame = 0;
      lastRevealKey = '';
      revealStarted = false;
      currentCenterAmount = 0;
      frame.classList.remove('is-pointer-active');
      frame.style.removeProperty('--digital-hover-opacity');
      const leaveContext = digitalCanvas.getContext('2d');
      leaveContext?.setTransform(1, 0, 0, 1, 0, 0);
      leaveContext?.clearRect(0, 0, digitalCanvas.width, digitalCanvas.height);
    };

    let observer: IntersectionObserver | null = null;
    if (eager || !('IntersectionObserver' in window)) {
      load();
    } else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          observer?.disconnect();
        }
      }, { rootMargin: '35% 0px' });
      observer.observe(frame);
    }

    window.addEventListener('resize', onResize);
    frame.addEventListener('mousemove', onPointerMove, { passive: true });
    frame.addEventListener('mouseleave', onPointerLeave);
    return () => {
      disposed = true;
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(revealFrame);
      window.clearTimeout(idleDraw);
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
      frame.removeEventListener('mousemove', onPointerMove);
      frame.removeEventListener('mouseleave', onPointerLeave);
      frame.classList.remove('is-pointer-active');
    };
  }, [eager, src]);

  return (
    <div className="v2-woven-image" ref={frameRef}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'low'}
      />
      <canvas className="v2-woven-knit" ref={canvasRef} aria-hidden="true" />
      <canvas className="v2-woven-digital" ref={digitalCanvasRef} aria-hidden="true" />
    </div>
  );
}
