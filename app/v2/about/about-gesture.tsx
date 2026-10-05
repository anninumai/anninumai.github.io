'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useReducer, useRef, type CSSProperties } from 'react';
import { advanceGesture, initialGestureState, gestureFrameAt, gestureFrames, gestureOpenness, gestureShowsProfile } from './gesture-sequence';
import { aboutStories } from './about-stories';

export function AboutGesture() {
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLElement>(null);
  const [{ frame, story }, showFrame] = useReducer(
    (state: typeof initialGestureState, nextFrame: number) => advanceGesture(state, nextFrame, aboutStories.length),
    initialGestureState,
  );
  const openness = gestureOpenness(frame);

  useEffect(() => {
    const section = imageRef.current?.closest('.about-v2-records');
    if (!section) return;

    let position = 0;
    let requestedFrame = 0;
    let animationFrame = 0;
    let disposed = false;
    const decodedFrames = new Set<number>();

    const showRequestedFrame = () => {
      // Keep the previous photo until the requested one is decoded: no blank flash.
      if (!disposed && decodedFrames.has(requestedFrame)) showFrame(requestedFrame);
    };
    const preloadedImages = gestureFrames.map((src, index) => {
      const image = new window.Image();
      image.src = src;
      void image.decode().then(() => {
        decodedFrames.add(index);
        showRequestedFrame();
      }).catch(() => { /* Retain the available photo if a frame cannot load. */ });
      return image;
    });

    const updatePosition = (nextPosition: number) => {
      position = Math.max(0, Math.min(1, nextPosition));
      requestedFrame = gestureFrameAt(position);
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        showRequestedFrame();
      });
    };
    const onPointerMove = (pointer: PointerEvent) => {
      // Do not turn an ordinary vertical touch scroll into a hand animation.
      if (pointer.pointerType === 'touch') return;
      updatePosition(pointer.clientX / window.innerWidth);
    };
    const onPointerDown = (pointer: PointerEvent) => {
      if (pointer.pointerType === 'touch') updatePosition(pointer.clientX / window.innerWidth);
    };
    const onKeyDown = (event: Event) => {
      const key = event as KeyboardEvent;
      if (key.target !== section) return;
      if (key.key === 'ArrowLeft' || key.key === 'ArrowRight') {
        key.preventDefault();
        updatePosition(position + (key.key === 'ArrowRight' ? 1 : -1) / 8);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    section.addEventListener('keydown', onKeyDown);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      preloadedImages.length = 0;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      section.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    const copy = copyRef.current;
    const section = imageRef.current?.closest<HTMLElement>('.about-v2-records');
    const records = section?.querySelector<HTMLElement>('.about-v2-record-grid');
    if (!copy || !section || !records || !gestureShowsProfile(frame)) return;

    const fitCopy = () => {
      section.style.removeProperty('--about-copy-bottom');
      copy.style.removeProperty('--about-fitted-font-size');
      const maximum = Number.parseFloat(getComputedStyle(copy).fontSize);
      // Prefer fitting above the fold, but never make the whole essay illegibly
      // tiny just to force it into a short phone viewport. No clipped text.
      const available = Math.max(200, window.innerHeight - copy.offsetTop - 24);
      let low = 12;
      let high = Math.max(low, maximum);
      copy.style.setProperty('--about-fitted-font-size', `${low}px`);
      if (copy.offsetHeight <= available) {
        for (let step = 0; step < 7; step++) {
          const middle = (low + high) / 2;
          copy.style.setProperty('--about-fitted-font-size', `${middle}px`);
          if (copy.offsetHeight <= available) low = middle;
          else high = middle;
        }
      }
      copy.style.setProperty('--about-fitted-font-size', `${Math.floor(low * 10) / 10}px`);
      section.style.setProperty('--about-copy-bottom', `${copy.offsetTop + copy.offsetHeight + 40}px`);
    };

    fitCopy();
    // Only remeasure on a real viewport/container width change, not on scrolling
    // or every pointer event. Width changes are discrete; there is no idle loop.
    let sectionWidth = section.clientWidth;
    const observer = new ResizeObserver(() => {
      if (section.clientWidth === sectionWidth) return;
      sectionWidth = section.clientWidth;
      fitCopy();
    });
    observer.observe(section);
    window.addEventListener('resize', fitCopy);
    let active = true;
    void document.fonts.ready.then(() => { if (active) fitCopy(); });
    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener('resize', fitCopy);
    };
  }, [frame, story]);

  return <>
    <div className="about-v2-gesture" ref={imageRef} aria-hidden="true" data-frame={frame + 1}>
      <Image src={gestureFrames[frame]} alt="" width={1122} height={1402} draggable={false} priority unoptimized />
    </div>
    <article className="about-v2-profile-copy" ref={copyRef} data-story={story + 1} data-compact={aboutStories[story].paragraphs.length > 8} aria-label={`自己紹介と好きなもの ${story + 1} / ${aboutStories.length}`} hidden={!gestureShowsProfile(frame)} style={{ width: `calc(${180 + openness * 110} * var(--v2-px, 1px))`, '--about-openness': openness } as CSSProperties}>
      {aboutStories[story].paragraphs.map((paragraph, index) => <p key={`${aboutStories[story].id}-${index}`}>{paragraph}</p>)}
    </article>
  </>;
}
