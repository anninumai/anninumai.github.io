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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motifCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorShadowRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const motifCanvas = motifCanvasRef.current;
    const photo = photoRef.current;
    if (!canvas || !motifCanvas || !photo) return;
    const context = canvas.getContext('2d');
    const motifContext = motifCanvas.getContext('2d');
    if (!context || !motifContext) return;
    let resizeFrame = 0;
    let currentCamera = 0;
    let lastCursorCell = '';
    let lastShadowPosition: { x: number; y: number } | null = null;
    let lastShadowScale = 0;
    let motifFrame = 0;
    let lastMotifPaint = -Infinity;
    let motifWidth = window.innerWidth;
    let motifColumnGap = 1;
    let motifRowGap = 1;
    let motifRatio = 1;
    const cursorShadowSource = document.createElement('canvas');
    const motifTemplates: Array<Array<[number, number]>> = [
      [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [-2, 0], [2, 0], [0, -2], [0, 2]],
      [[0, -3], [-1, -2], [1, -2], [-2, -1], [2, -1], [-3, 0], [3, 0], [-2, 1], [2, 1], [-1, 2], [1, 2], [0, 3]],
      [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [-2, -2], [2, -2], [-2, 2], [2, 2], [0, -3], [0, 3], [-3, 0], [3, 0]],
      [[0, -3], [-1, -2], [1, -2], [-2, -1], [2, -1], [-3, 0], [3, 0], [-2, 1], [2, 1], [-1, 2], [1, 2], [0, 3], [0, 0]],
    ];
    const motifColors = ['#006fc7', '#f06480', '#36a978', '#7558c5'];
    const motifAccents = ['#f3a400', '#006fc7', '#f06480', '#36a978'];
    const random = (seed: number) => {
      const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return value - Math.floor(value);
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
      canvas.style.transform = `translate3d(0, ${-(camera % rowGap)}px, 0)`;
    };

    const resizeMotifCanvas = (width: number, columnGap: number, rowGap: number, ratio: number) => {
      motifWidth = width;
      motifColumnGap = columnGap;
      motifRowGap = rowGap;
      motifRatio = ratio;
      motifCanvas.width = Math.round(width * ratio);
      motifCanvas.height = Math.round(window.innerHeight * ratio);
      motifCanvas.style.width = `${width}px`;
      motifCanvas.style.height = `${window.innerHeight}px`;
    };

    const paintMotifs = (time: number) => {
      const width = motifWidth;
      const columnGap = motifColumnGap;
      const rowGap = motifRowGap;
      const ratio = motifRatio;
      const height = window.innerHeight;
      motifContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      motifContext.clearRect(0, 0, width, height);
      motifContext.lineCap = 'round';
      motifContext.lineJoin = 'round';
      motifContext.lineWidth = Math.max(1.35, columnGap * 0.5);
      const columnCount = width / columnGap;
      const motifCount = Math.max(5, Math.round(width / 240));
      const motifTileHeight = rowGap * 150;
      const stitchWidth = columnGap * 0.72;
      const stitchHeight = rowGap * 1.06;

      for (let motif = 0; motif < motifCount; motif += 1) {
        const period = 2600 + random(motif * 23 + 5) * 1800;
        const shiftedTime = time + random(motif * 29 + 9) * period;
        const cycle = Math.floor(shiftedTime / period);
        const progress = (shiftedTime % period) / period;
        if (progress >= 0.74) continue;
        const fadeIn = Math.min(1, progress / 0.2);
        const fadeOut = Math.min(1, (0.74 - progress) / 0.22);
        const visiblePixelRatio = Math.min(fadeIn, fadeOut);
        const seed = motif * 97 + cycle * 131 + 17;
        const baseColumn = 8 + random(seed * 3) * Math.max(1, columnCount - 16);
        const baseRow = 8 + random(seed * 7) * 134;
        const template = motifTemplates[Math.floor(random(seed * 11) * motifTemplates.length)];
        const spacing = random(seed * 13) > 0.72 ? 2 : 1;
        const colorIndex = Math.floor(random(seed * 19) * motifColors.length);
        const coreColor = motifColors[colorIndex];
        const accentColor = motifAccents[colorIndex];
        let screenBaseY = baseRow * rowGap - (currentCamera % motifTileHeight);
        while (screenBaseY < -motifTileHeight * 0.25) screenBaseY += motifTileHeight;
        while (screenBaseY > height + motifTileHeight * 0.25) screenBaseY -= motifTileHeight;
        const copies = [screenBaseY - motifTileHeight, screenBaseY, screenBaseY + motifTileHeight];
        motifContext.globalAlpha = 1;

        for (const copyY of copies) {
          if (copyY < -rowGap * 8 || copyY > height + rowGap * 8) continue;
          for (let pixel = 0; pixel < template.length; pixel += 1) {
            // Each knit loop is binary: fully coloured or absent. Different
            // thresholds make the motif appear to dissolve softly as a whole.
            const threshold = random(seed * 31 + pixel * 17 + 3);
            if (threshold > visiblePixelRatio) continue;
            const [offsetX, offsetY] = template[pixel];
            const x = Math.round(baseColumn + offsetX * spacing) * columnGap;
            const y = copyY + offsetY * spacing * rowGap;
            const distance = Math.abs(offsetX) + Math.abs(offsetY);
            motifContext.strokeStyle = distance >= 3 ? accentColor : coreColor;
            motifContext.beginPath();
            motifContext.moveTo(x - stitchWidth * 0.5, y - stitchHeight * 0.5);
            motifContext.lineTo(x, y + stitchHeight * 0.5);
            motifContext.lineTo(x + stitchWidth * 0.5, y - stitchHeight * 0.5);
            motifContext.stroke();
          }
        }
      }
      motifContext.globalAlpha = 1;
    };

    const animateMotifs = (time: number) => {
      if (time - lastMotifPaint >= 32) {
        lastMotifPaint = time;
        paintMotifs(time);
      }
      motifFrame = requestAnimationFrame(animateMotifs);
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
      resizeMotifCanvas(width, columnGap, rowGap, ratio);
      paintMotifs(performance.now());
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
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      motifFrame = requestAnimationFrame(animateMotifs);
    }
    window.addEventListener('resize', onResize);
    window.addEventListener('v2-archive-camera', onCamera as EventListener);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    return () => {
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(motifFrame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('v2-archive-camera', onCamera as EventListener);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="v2-knit-background" aria-hidden="true">
      <div className="v2-knit-photo" ref={photoRef} />
      <canvas className="v2-knit-stitch-overlay" ref={canvasRef} />
      <canvas className="v2-knit-motif-overlay" ref={motifCanvasRef} />
      <canvas className="v2-knit-cursor-shadow" ref={cursorShadowRef} />
    </div>
  );
}
