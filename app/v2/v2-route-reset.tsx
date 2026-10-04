'use client';

import { useEffect, useLayoutEffect, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';

const MINIMUM_LOADING_MS = 2000;
const MAXIMUM_LOADING_MS = 6000;

export function V2RouteReset() {
  const pathname = usePathname();
  // Render the loader into the exported HTML, including direct/native navigation.
  const [loading, setLoading] = useState(true);
  const [transitionId, setTransitionId] = useState(0);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      // A back/forward-cache restore reuses the existing React component.
      if (event.persisted) setTransitionId((current) => current + 1);
    };
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  useLayoutEffect(() => {
    if (transitionId === 0 && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
    setLoading(true);
    const startedAt = Date.now();
    let disposed = false;
    let hideTimer = 0;
    const finish = () => {
      if (disposed) return;
      setLoading(false);
    };
    // A failed image or renderer must never leave navigation blocked.
    const maxTimer = window.setTimeout(finish, MAXIMUM_LOADING_MS);
    const isArchive = pathname.replace(/\/$/, '') === '/v2';
    let assetsReady = false;
    const checkReady = () => {
      if (disposed || hideTimer || !assetsReady) return;
      if (isArchive && document.querySelectorAll('.is-woven-ready').length < 2) return;
      const remaining = Math.max(0, MINIMUM_LOADING_MS - (Date.now() - startedAt));
      hideTimer = window.setTimeout(() => {
        window.clearTimeout(maxTimer);
        finish();
      }, remaining);
    };
    window.addEventListener('v2-knit-ready', checkReady);

    const firstImages = [...document.images].filter((image) => {
      const bounds = image.getBoundingClientRect();
      return image.loading !== 'lazy' || (bounds.bottom > 0 && bounds.top < window.innerHeight);
    });
    Promise.allSettled([
      document.fonts.ready,
      ...firstImages.map((image) => image.decode()),
    ]).then(() => {
      assetsReady = true;
      checkReady();
    });

    return () => {
      disposed = true;
      window.clearTimeout(hideTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener('v2-knit-ready', checkReady);
    };
  }, [pathname, transitionId]);

  const loaderStyle: CSSProperties = {
    position: 'fixed',
    zIndex: 1000,
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    background: "#f7f6f1 url('/assets/knit/white-stockinette-canvas.webp') 0 0 / 36vw auto repeat",
    opacity: loading ? 1 : 0,
    visibility: loading ? 'visible' : 'hidden',
    pointerEvents: loading ? 'auto' : 'none',
    transition: 'opacity 140ms ease',
  };

  const pixelStyle: CSSProperties = {
    display: 'block',
    width: 5,
    height: 7,
    background: '#006fc7',
    clipPath: 'polygon(0 0,50% 28%,100% 0,100% 72%,50% 100%,0 72%)',
  };

  return (
    <div className={`v2-route-loader${loading ? ' is-active' : ''}`} style={loaderStyle} role="status" aria-label="ページを読み込み中" aria-hidden={!loading}>
      <div
        className="v2-route-loader-mark"
        style={{ display: 'grid', justifyItems: 'center', gap: 15, color: '#006fc7', fontSize: 11, fontWeight: 600, letterSpacing: '.16em' }}
      >
        <span>LOADING</span>
        <span className="v2-route-loader-pixels" style={{ display: 'flex', alignItems: 'center', gap: 5, height: 9 }} aria-hidden="true">
          <i style={pixelStyle} /><i style={pixelStyle} /><i style={pixelStyle} /><i style={pixelStyle} /><i style={pixelStyle} />
        </span>
      </div>
    </div>
  );
}
