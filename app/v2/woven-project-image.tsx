'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { COLUMN_GAP, ROW_GAP, WOVEN_HEIGHT, WOVEN_WIDTH, wovenRevealClip } from './woven-reveal';

type WovenProjectImageProps = { src: string; eager?: boolean };

export function WovenProjectImage({ src, eager = false }: WovenProjectImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const knit = src.replace('/v2-thumbs/', '/v2-knit/');
  const mask = knit.replace('.webp', '-mask.webp');

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let pending = 0;
    let pointerX = 0;
    let pointerY = 0;
    let previousCell = '';

    const paint = () => {
      pending = 0;
      const bounds = frame.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const column = Math.round((pointerX - bounds.left) / bounds.width * WOVEN_WIDTH / COLUMN_GAP);
      const row = Math.round((pointerY - bounds.top) / bounds.height * WOVEN_HEIGHT / ROW_GAP);
      const cell = `${column}:${row}`;
      if (cell === previousCell) return;
      previousCell = cell;
      const x = column * COLUMN_GAP / WOVEN_WIDTH * 100;
      const y = row * ROW_GAP / WOVEN_HEIGHT * 100;
      const center = 1 - Math.min(1, Math.max(Math.abs(x - 50), Math.abs(y - 50)) / 50);
      const full = Math.max(0, Math.min(1, (center - .62) / .25));
      const eased = full * full * (3 - 2 * full);
      const radius = 8 + center * 20 + eased * 120;
      // Reveal whole V-shaped stitches, never an interpolated edge through yarn.
      // Only the hovered card updates once per frame, and only on a new cell.
      frame.style.setProperty('--woven-reveal', wovenRevealClip(column * COLUMN_GAP, row * ROW_GAP, radius / 100 * WOVEN_WIDTH));
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      frame.classList.add('is-pointer-active');
      if (!pending) pending = requestAnimationFrame(paint);
    };
    const leave = () => {
      cancelAnimationFrame(pending);
      pending = 0;
      previousCell = '';
      frame.classList.remove('is-pointer-active');
      frame.style.removeProperty('--woven-reveal');
    };
    frame.addEventListener('pointermove', move, { passive: true });
    frame.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      leave();
      frame.removeEventListener('pointermove', move);
      frame.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
    };
  }, []);

  return (
    <div className="v2-woven-image" ref={frameRef} style={{ '--woven-mask': `url('${mask}')` } as CSSProperties}>
      <img className="v2-woven-knit" src={knit} width={1560} height={1040} alt="" aria-hidden="true"
        srcSet={`${knit.replace('.webp', '-small.webp')} 780w, ${knit} 1560w`}
        sizes="(max-width: 700px) 78vw, (max-width: 2240px) 39vw, 874px"
        loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'low'}
        onError={(event) => {
          event.currentTarget.removeAttribute('srcset');
          if (!event.currentTarget.src.endsWith(src)) event.currentTarget.src = src;
        }} />
      <div className="v2-woven-digital" aria-hidden="true">
        <img src={src} width={780} height={520} alt="" loading="lazy" decoding="async" fetchPriority="low" />
      </div>
    </div>
  );
}
