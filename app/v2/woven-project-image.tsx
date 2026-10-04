'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

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
      const x = (pointerX - bounds.left) / bounds.width * 100;
      const y = (pointerY - bounds.top) / bounds.height * 100;
      const cell = `${Math.round(x)}:${Math.round(y)}`;
      if (cell === previousCell) return;
      previousCell = cell;
      const center = 1 - Math.min(1, Math.max(Math.abs(x - 50), Math.abs(y - 50)) / 50);
      const full = Math.max(0, Math.min(1, (center - .62) / .25));
      const eased = full * full * (3 - 2 * full);
      const radius = 8 + center * 20 + eased * 120;
      // A small stepped polygon reveals the photo through whole yarn cells.
      // Only the hovered card updates, once per pointer frame. Idle work is zero.
      const points = Array.from({ length: 40 }, (_, i) => {
        const angle = i / 40 * Math.PI * 2;
        return `${Math.round((x + Math.cos(angle) * radius) / .86) * .86}% ${Math.round((y + Math.sin(angle) * radius * 1.5) / 1.8) * 1.8}%`;
      });
      frame.style.setProperty('--woven-reveal', `polygon(${points.join(',')})`);
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
