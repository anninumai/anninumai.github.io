'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, type CSSProperties } from 'react';
import { advanceGesture, initialGestureState, gestureFrameAt, gestureFrames, gestureOpenness, gestureShowsProfile } from './gesture-sequence';
import { aboutStories } from './about-stories';

export function AboutGesture() {
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLElement>(null);
  const animationTimers = useRef<number[]>([]);
  const isAnimating = useRef(false);
  const [{ frame, story }, dispatch] = useReducer(
    (state: typeof initialGestureState, action: { type: 'frame'; frame: number } | { type: 'story'; story: number }) => {
      if (action.type === 'story') return { frame: state.frame, story: action.story, closedSinceOpen: false };
      return advanceGesture(state, action.frame, aboutStories.length);
    },
    initialGestureState,
  );
  const openness = gestureOpenness(frame);

  const showFrame = useCallback((nextFrame: number) => dispatch({ type: 'frame', frame: nextFrame }), []);
  const transitionToStory = useCallback((targetStory: number) => {
    if (targetStory === story || isAnimating.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dispatch({ type: 'story', story: targetStory });
      showFrame(0);
      return;
    }
    isAnimating.current = true;
    animationTimers.current.forEach(window.clearTimeout);
    animationTimers.current = [];
    const closing = [1, 2, 3, 4];
    const opening = [3, 2, 1, 0];
    closing.forEach((nextFrame, index) => {
      animationTimers.current.push(window.setTimeout(() => showFrame(nextFrame), index * 55));
    });
    const changeAt = closing.length * 55;
    animationTimers.current.push(window.setTimeout(() => dispatch({ type: 'story', story: targetStory }), changeAt));
    opening.forEach((nextFrame, index) => {
      animationTimers.current.push(window.setTimeout(() => {
        showFrame(nextFrame);
        if (index === opening.length - 1) isAnimating.current = false;
      }, changeAt + 35 + index * 55));
    });
  }, [showFrame, story]);

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
    let touchStart: { x: number; y: number } | null = null;
    const onPointerDown = (pointer: PointerEvent) => {
      if (pointer.pointerType === 'touch') touchStart = { x: pointer.clientX, y: pointer.clientY };
    };
    const onPointerUp = (pointer: PointerEvent) => {
      if (pointer.pointerType !== 'touch' || !touchStart) return;
      const deltaX = pointer.clientX - touchStart.x;
      const deltaY = pointer.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(deltaX) < 44 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.15) return;
      const direction = deltaX < 0 ? 1 : -1;
      transitionToStory((story + direction + aboutStories.length) % aboutStories.length);
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
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    section.addEventListener('keydown', onKeyDown);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      preloadedImages.length = 0;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      section.removeEventListener('keydown', onKeyDown);
    };
  }, [showFrame, story, transitionToStory]);

  useEffect(() => () => {
    animationTimers.current.forEach(window.clearTimeout);
    animationTimers.current = [];
  }, []);

  useLayoutEffect(() => {
    const copy = copyRef.current;
    const section = imageRef.current?.closest<HTMLElement>('.about-v2-records');
    const records = section?.querySelector<HTMLElement>('.about-v2-record-grid');
    if (!copy || !section || !records || !gestureShowsProfile(frame)) return;

    const fitCopy = () => {
      section.style.removeProperty('--about-copy-bottom');
      copy.style.removeProperty('--about-fitted-font-size');
      if (window.matchMedia('(max-width: 760px)').matches) {
        // Keep every mobile story at the same size as the longest
        // (CCさくら) story instead of enlarging shorter entries.
        copy.style.setProperty('--about-fitted-font-size', 'calc(12 * var(--v2-px, 1px))');
        section.style.setProperty('--about-copy-bottom', `${copy.offsetTop + copy.offsetHeight + 40}px`);
        return;
      }
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
    <article className="about-v2-profile-copy" ref={copyRef} data-story={story + 1} data-compact={aboutStories[story].paragraphs.length > 8} aria-live="polite" style={{ width: `calc(${180 + openness * 110} * var(--v2-px, 1px))`, '--about-openness': openness } as CSSProperties}>
      <div className="about-v2-profile-body" aria-label={`自己紹介と好きなもの ${story + 1} / ${aboutStories.length}`} aria-hidden={!gestureShowsProfile(frame)} data-visible={gestureShowsProfile(frame)}>
        {aboutStories[story].paragraphs.map((paragraph, index) => <p key={`${aboutStories[story].id}-${index}`}>{paragraph}</p>)}
      </div>
      <nav className="about-v2-story-pagination" aria-label="自己紹介文を選ぶ">
        {aboutStories.map((item, index) => <button key={item.id} type="button" aria-label={`${index + 1}番目の文章を表示`} aria-current={index === story ? 'true' : undefined} onClick={() => transitionToStory(index)}><span /></button>)}
      </nav>
    </article>
  </>;
}
