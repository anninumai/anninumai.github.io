'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const LOOP_SECONDS = 12;
const POSTER = '/assets/knit/background-loop-poster.webp';
const MOVIE = '/assets/knit/background-loop.mp4';

function KnitVideoTile({ index, playing }: { index: number; playing: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playing) {
      video?.pause();
      return;
    }
    let inView = false;
    let disposed = false;
    const update = () => {
      if (disposed) return;
      if (!inView || document.hidden) {
        video.pause();
        return;
      }
      if (!video.hasAttribute('src')) {
        video.src = MOVIE;
        video.load();
      }
      if (video.readyState < 1) return;
      // Synchronise only when entering view/resuming, never scrub on scroll.
      const time = (performance.now() / 1000) % LOOP_SECONDS;
      if (Math.abs(video.currentTime - time) > .25) video.currentTime = time;
      video.play().catch(() => {
        // Autoplay may be denied in low-power mode. Keep the fabric poster.
        if (!disposed) video.classList.remove('is-playing');
      });
    };
    const ready = () => video.classList.add('is-playing');
    const failed = () => video.classList.remove('is-playing');
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { rootMargin: '160px 0px' });
    observer.observe(video);
    video.addEventListener('loadedmetadata', update);
    video.addEventListener('playing', ready);
    video.addEventListener('error', failed);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      disposed = true;
      observer.disconnect();
      video.pause();
      video.removeEventListener('loadedmetadata', update);
      video.removeEventListener('playing', ready);
      video.removeEventListener('error', failed);
      document.removeEventListener('visibilitychange', update);
    };
  }, [playing]);

  return (
    <video ref={videoRef} className="v2-knit-video" style={{ top: `calc(var(--knit-tile-height) * ${index})` }}
      poster={POSTER} width={1280} height={1632} muted loop playsInline preload="none"
      disablePictureInPicture disableRemotePlayback tabIndex={-1} />
  );
}

// Ordinary document positioning makes fabric and work travel together.
// Only nearby tiles decode video; no canvas or perpetual JS render loop.
export function KnitBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState(1);
  const [allowMotion, setAllowMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const background = backgroundRef.current;
    const page = background?.parentElement;
    if (!background || !page) return;
    const measure = () => {
      const tileHeight = Math.max(768, page.clientWidth) * 1632 / 1280;
      background.style.setProperty('--knit-tile-height', `${tileHeight}px`);
      setTiles(Math.max(1, Math.ceil(page.offsetHeight / tileHeight)));
    };
    const resize = new ResizeObserver(measure);
    resize.observe(page);
    measure();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const preference = () => setAllowMotion(!motion.matches && !connection?.saveData);
    preference();
    motion.addEventListener('change', preference);
    return () => {
      resize.disconnect();
      motion.removeEventListener('change', preference);
    };
  }, []);

  return (
    <>
      <div ref={backgroundRef} className="v2-knit-background" aria-hidden="true"
        style={{ '--knit-tile-height': 'calc(max(768px, 100vw) * 1.275)' } as CSSProperties}>
        {Array.from({ length: tiles }, (_, index) => <KnitVideoTile key={index} index={index} playing={allowMotion && !paused} />)}
      </div>
      {allowMotion && <button type="button" className="v2-background-motion" aria-pressed={paused}
        aria-label={paused ? '背景の動画を再生する' : '背景の動画を一時停止する'} onClick={() => setPaused(!paused)}>
        BACKGROUND {paused ? 'PLAY ▷' : 'PAUSE Ⅱ'}
      </button>}
    </>
  );
}
