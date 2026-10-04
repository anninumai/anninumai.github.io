'use client';

import { useEffect, useRef } from 'react';

const PHOTO_WIDTH = 1882;
const PHOTO_HEIGHT = 3344;
const PHOTO_DISPLAY_SCALE = 0.72;
const PHOTO_BACKGROUND_WIDTH = 0.36;
// The photographic texture repeats every two visible loops. Use the
// single-loop interval so the procedural layer follows the actual knit.
const SOURCE_COLUMN_GAP = 8.75;
const SOURCE_ROW_GAP = 12.25;

export function KnitBackground() {
  const photoRef = useRef<HTMLDivElement>(null);
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorShadowRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gradientCanvas = gradientCanvasRef.current;
    const photo = photoRef.current;
    if (!canvas || !gradientCanvas || !photo) return;
    const context = canvas.getContext('2d');
    const gradientContext = gradientCanvas.getContext('2d');
    if (!context || !gradientContext) return;
    let resizeFrame = 0;
    let currentCamera = 0;
    let lastCursorCell = '';
    let lastShadowPosition: { x: number; y: number } | null = null;
    let lastShadowScale = 0;
    let gradientFrame = 0;
    let lastGradientPaint = -Infinity;
    let gradientColumnGap = 1;
    let gradientRowGap = 1;
    let gradientRatio = 1;
    const cursorShadowSource = document.createElement('canvas');
    const random = (seed: number) => {
      const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    const gradientStops = [
      [247, 255, 158],
      [192, 187, 255],
      [255, 204, 237],
    ];

    const gradientColor = (amount: number) => {
      const scaled = Math.max(0, Math.min(1, amount)) * 2;
      const index = Math.min(1, Math.floor(scaled));
      const mix = scaled - index;
      const from = gradientStops[index];
      const to = gradientStops[index + 1];
      return `rgb(${Math.round(from[0] + (to[0] - from[0]) * mix)} ${Math.round(from[1] + (to[1] - from[1]) * mix)} ${Math.round(from[2] + (to[2] - from[2]) * mix)})`;
    };

    const drawCursorShadow = (columnGap: number, rowGap: number) => {
      const cursorShadow = cursorShadowRef.current;
      if (!cursorShadow) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = columnGap * 7;
      const height = rowGap * 8;
      cursorShadow.width = Math.ceil(width * ratio);
      cursorShadow.height = Math.ceil(height * ratio);
      cursorShadow.style.width = `${width}px`;
      cursorShadow.style.height = `${height}px`;
      const shadowContext = cursorShadow.getContext('2d');
      if (!shadowContext) return;
      shadowContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      shadowContext.clearRect(0, 0, width, height);

      // First make a conventional soft shadow. Then shift each knit-height band
      // by a fraction of one loop. This keeps it recognisably a shadow while its
      // contour catches on the fabric instead of remaining geometrically clean.
      const source = cursorShadowSource;
      source.width = cursorShadow.width;
      source.height = cursorShadow.height;
      const sourceContext = source.getContext('2d');
      if (!sourceContext) return;
      sourceContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      sourceContext.filter = `blur(${Math.max(1.1, columnGap * 0.3)}px)`;
      sourceContext.fillStyle = 'rgba(8, 16, 22, .17)';
      sourceContext.beginPath();
      sourceContext.moveTo(columnGap * 1.15, rowGap * 0.65);
      sourceContext.lineTo(columnGap * 1.15, rowGap * 6.15);
      sourceContext.lineTo(columnGap * 2.35, rowGap * 5.05);
      sourceContext.lineTo(columnGap * 3.55, rowGap * 7.15);
      sourceContext.lineTo(columnGap * 4.5, rowGap * 6.62);
      sourceContext.lineTo(columnGap * 3.25, rowGap * 4.52);
      sourceContext.lineTo(columnGap * 5.55, rowGap * 4.52);
      sourceContext.closePath();
      sourceContext.fill();

      const bandHeight = rowGap * 0.5;
      const bandOffsets = [0.08, -0.12, 0.16, -0.04, 0.2, -0.16, 0.1, -0.08];
      shadowContext.imageSmoothingEnabled = true;
      for (let band = 0; band * bandHeight < height; band += 1) {
        const y = band * bandHeight;
        const sliceHeight = Math.min(bandHeight, height - y);
        const offset = bandOffsets[band % bandOffsets.length] * columnGap;
        shadowContext.globalAlpha = band % 3 === 0 ? 0.9 : 1;
        shadowContext.drawImage(
          source,
          0,
          y * ratio,
          source.width,
          sliceHeight * ratio,
          offset,
          y,
          width,
          sliceHeight,
        );
      }
      shadowContext.globalAlpha = 1;
    };

    const onPointerMove = (event: PointerEvent) => {
      const cursorShadow = cursorShadowRef.current;
      if (!cursorShadow || event.pointerType === 'touch') return;
      const photoScale = (window.innerWidth * PHOTO_DISPLAY_SCALE) / PHOTO_WIDTH;
      const columnGap = SOURCE_COLUMN_GAP * photoScale;
      const rowGap = SOURCE_ROW_GAP * photoScale;
      // The drawn arrow has internal padding. Pull its canvas back toward the
      // pointer so the visible shadow overlaps it with only a small down-right offset.
      const shadowX = Math.round((event.clientX - columnGap * 0.35) / columnGap) * columnGap;
      const shadowY = Math.round((event.clientY - rowGap * 0.25) / rowGap) * rowGap;
      const cursorCell = `${shadowX}:${shadowY}`;
      if (cursorCell !== lastCursorCell) {
        lastCursorCell = cursorCell;
        lastShadowPosition = { x: shadowX, y: shadowY };
        if (Math.abs(lastShadowScale - columnGap) > 0.01) {
          drawCursorShadow(columnGap, rowGap);
          lastShadowScale = columnGap;
        }
        cursorShadow.style.transform = `translate3d(${shadowX}px, ${shadowY}px, 0)`;
      }
      cursorShadow.classList.add('is-visible');
    };

    const onPointerLeave = () => {
      cursorShadowRef.current?.classList.remove('is-visible');
    };

    const positionTexture = (camera: number) => {
      const photoTileHeight = PHOTO_HEIGHT * ((window.innerWidth * PHOTO_BACKGROUND_WIDTH) / PHOTO_WIDTH);
      const rowGap = SOURCE_ROW_GAP * ((window.innerWidth * PHOTO_DISPLAY_SCALE) / PHOTO_WIDTH);
      photo.style.top = `${-photoTileHeight}px`;
      photo.style.height = `${window.innerHeight + photoTileHeight * 2}px`;
      photo.style.transform = `translate3d(0, ${-(camera % photoTileHeight)}px, 0)`;
      gradientCanvas.style.transform = `translate3d(0, ${-(camera % rowGap)}px, 0)`;
      canvas.style.transform = `translate3d(0, ${-(camera % rowGap)}px, 0)`;
    };

    const paintMovingGradient = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight + gradientRowGap * 2;
      const columnGap = gradientColumnGap;
      const rowGap = gradientRowGap;
      const ratio = gradientRatio;
      const stitchWidth = columnGap * 0.72;
      const stitchHeight = rowGap * 1.06;
      const paletteSteps = 12;
      const paths = Array.from({ length: paletteSteps }, () => new Path2D());
      const seconds = time * 0.001;
      const firstWorldRow = Math.floor(currentCamera / rowGap) - 1;
      // Use world-space stitch coordinates shared with the knit texture.
      // A loop is either present or absent; changing the number of visible
      // loops creates the soft motion without tinting the whole photograph.
      const spatialScale = Math.max(width, 1);

      for (let row = -2; row < height / rowGap + 3; row += 1) {
        const y = row * rowGap;
        const worldRow = firstWorldRow + row;
        const ny = worldRow * rowGap / spatialScale;
        for (let column = -2; column < width / columnGap + 3; column += 1) {
          const x = column * columnGap;
          const nx = x / spatialScale;
          const threshold = random(column * 127.1 + worldRow * 311.7);
          // Most loops stay white. Skip them before evaluating the moving field.
          if (threshold > 0.24) continue;
          const wave =
            Math.sin(nx * 12 + ny * 6 - seconds * 0.65) * 0.5 +
            Math.cos(ny * 13 - nx * 5 + seconds * 0.42) * 0.3 +
            Math.sin((nx - ny) * 21 + seconds * 0.28) * 0.2;
          const density = Math.max(0, wave - 0.12) * 0.28;
          if (threshold > density) continue;
          const field =
            0.5 +
            Math.sin(nx * 5.1 + ny * 1.7 + seconds * 0.2) * 0.2 +
            Math.cos(ny * 4.3 - nx * 1.2 - seconds * 0.15) * 0.18 +
            Math.sin((nx + ny) * 7.2 + seconds * 0.11) * 0.09;
          const amount = Math.max(0, Math.min(1, field));
          const paletteIndex = Math.min(paletteSteps - 1, Math.floor(amount * paletteSteps));
          const path = paths[paletteIndex];
          path.moveTo(x - stitchWidth * 0.5, y - stitchHeight * 0.5);
          path.lineTo(x, y + stitchHeight * 0.5);
          path.lineTo(x + stitchWidth * 0.5, y - stitchHeight * 0.5);
        }
      }

      gradientContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      gradientContext.clearRect(0, 0, width, height);
      gradientContext.lineCap = 'round';
      gradientContext.lineJoin = 'round';
      gradientContext.lineWidth = Math.max(1.35, columnGap * 0.5);
      for (let index = 0; index < paletteSteps; index += 1) {
        gradientContext.strokeStyle = gradientColor((index + 0.5) / paletteSteps);
        gradientContext.stroke(paths[index]);
      }
    };

    const animateGradient = (time: number) => {
      if (document.hidden) {
        gradientFrame = 0;
        return;
      }
      if (time - lastGradientPaint >= 90) {
        lastGradientPaint = time;
        paintMovingGradient(time);
      }
      gradientFrame = requestAnimationFrame(animateGradient);
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onVisibilityChange = () => {
      if (!document.hidden && !gradientFrame && !reducedMotion.matches) {
        gradientFrame = requestAnimationFrame(animateGradient);
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const photoScale = (width * PHOTO_DISPLAY_SCALE) / PHOTO_WIDTH;
      const columnGap = SOURCE_COLUMN_GAP * photoScale;
      const rowGap = SOURCE_ROW_GAP * photoScale;
      const height = window.innerHeight + rowGap * 2;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.top = `${-rowGap}px`;
      gradientCanvas.width = Math.round(width * ratio);
      gradientCanvas.height = Math.round(height * ratio);
      gradientCanvas.style.width = `${width}px`;
      gradientCanvas.style.height = `${height}px`;
      gradientCanvas.style.top = `${-rowGap}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const stitchWidth = columnGap * 0.72;
      const stitchHeight = rowGap * 1.06;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      const stitches = new Path2D();

      for (let row = -2; row < height / rowGap + 3; row += 1) {
        for (let column = -2; column < width / columnGap + 3; column += 1) {
          const x = column * columnGap;
          const y = row * rowGap;
          stitches.moveTo(x - stitchWidth * 0.5, y - stitchHeight * 0.5);
          stitches.lineTo(x, y + stitchHeight * 0.5);
          stitches.lineTo(x + stitchWidth * 0.5, y - stitchHeight * 0.5);
        }
      }

      context.strokeStyle = 'rgba(133, 129, 120, .14)';
      context.lineWidth = Math.max(1.25, columnGap * 0.46);
      context.stroke(stitches);

      context.save();
      context.translate(-0.5, -0.7);
      context.strokeStyle = 'rgba(255, 255, 253, .78)';
      context.lineWidth = Math.max(0.7, columnGap * 0.2);
      context.stroke(stitches);
      context.restore();
      gradientColumnGap = columnGap;
      gradientRowGap = rowGap;
      gradientRatio = ratio;
      paintMovingGradient(performance.now());
      positionTexture(currentCamera);
      if (lastShadowPosition) {
        drawCursorShadow(columnGap, rowGap);
        lastShadowScale = columnGap;
        cursorShadowRef.current!.style.transform = `translate3d(${lastShadowPosition.x}px, ${lastShadowPosition.y}px, 0)`;
      }
    };

    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(draw);
    };

    const onCamera = (event: Event) => {
      currentCamera = (event as CustomEvent<{ camera?: number }>).detail?.camera || 0;
      positionTexture(currentCamera);
    };

    draw();
    if (!reducedMotion.matches) {
      gradientFrame = requestAnimationFrame(animateGradient);
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('resize', onResize);
    window.addEventListener('v2-archive-camera', onCamera as EventListener);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    return () => {
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(gradientFrame);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('v2-archive-camera', onCamera as EventListener);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="v2-knit-background" aria-hidden="true">
      <div className="v2-knit-photo" ref={photoRef} />
      <canvas className="v2-knit-gradient-overlay" ref={gradientCanvasRef} />
      <canvas className="v2-knit-stitch-overlay" ref={canvasRef} />
      <canvas className="v2-knit-cursor-shadow" ref={cursorShadowRef} />
    </div>
  );
}
