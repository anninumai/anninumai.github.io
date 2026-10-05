'use client';

import { useEffect, useRef } from 'react';

export function KnitCursorShadow() {
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shadow = shadowRef.current;
    if (!shadow) return;

    const preference = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let columnGap = 1;
    let rowGap = 1;
    let pointer: { x: number; y: number } | null = null;
    let previousPosition = '';

    const paint = () => {
      frame = 0;
      if (!pointer || !preference.matches || document.hidden) return;
      const x = Math.round((pointer.x - columnGap * 0.35) / columnGap) * columnGap;
      const y = Math.round((pointer.y - rowGap * 0.25) / rowGap) * rowGap;
      const position = `translate3d(${x}px, ${y}px, 0)`;
      if (position !== previousPosition) {
        shadow.style.transform = position;
        previousPosition = position;
      }
      shadow.classList.add('is-visible');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const hide = () => {
      pointer = null;
      cancelAnimationFrame(frame);
      frame = 0;
      shadow.classList.remove('is-visible');
    };
    const measure = () => {
      const scale = Math.min(window.innerWidth, 2240) * 0.72 / 1882;
      columnGap = 8.75 * scale;
      rowGap = 12.25 * scale;
      shadow.style.width = `${columnGap * 7}px`;
      shadow.style.height = `${rowGap * 8}px`;
      if (pointer) schedule();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !preference.matches) {
        hide();
        return;
      }
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };

    measure();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', hide);
    preference.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', measure);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', hide);
      preference.removeEventListener('change', hide);
    };
  }, []);

  return <div ref={shadowRef} className="v2-knit-cursor-shadow" aria-hidden="true" />;
}
