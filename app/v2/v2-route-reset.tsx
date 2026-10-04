'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';

const MINIMUM_LOADING_MS = 900;
const MAXIMUM_LOADING_MS = 2500;

export function V2RouteReset() {
  const pathname = usePathname();
  // Render the loader into the exported HTML, including direct/native navigation.
  const [loading, setLoading] = useState(true);
  const [transitionId, setTransitionId] = useState(0);
  const departing = useRef(false);

  useEffect(() => {
    let navigationTimer = 0;
    let recoveryTimer = 0;
    const clearNavigation = () => {
      window.clearTimeout(navigationTimer);
      window.clearTimeout(recoveryTimer);
      departing.current = false;
    };
    const onLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || !/^\/v2(?:\/|$)/.test(destination.pathname)) return;
      const currentPath = window.location.pathname.replace(/\/$/, '');
      const nextPath = destination.pathname.replace(/\/$/, '');
      // Keep in-page anchors, image links, and new-tab actions native.
      if ((currentPath === nextPath && destination.search === window.location.search) || /\.[^/]+$/.test(nextPath)) return;

      event.preventDefault();
      if (departing.current) return;
      departing.current = true;
      setLoading(true);
      // Paint the outgoing loader before starting the full-document navigation.
      // Explicit navigation avoids a re-render cancelling the anchor's default action.
      destination.pathname = `${nextPath}/`;
      navigationTimer = window.setTimeout(() => window.location.assign(destination.href), 300);
      recoveryTimer = window.setTimeout(() => {
        clearNavigation();
        setLoading(false);
      }, 10000);
    };
    const onPageShow = (event: PageTransitionEvent) => {
      // A back/forward-cache restore reuses the existing React component.
      if (event.persisted) {
        clearNavigation();
        setTransitionId((current) => current + 1);
      }
    };
    document.addEventListener('click', onLinkClick);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      clearNavigation();
      document.removeEventListener('click', onLinkClick);
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
      if (disposed || departing.current) return;
      setLoading(false);
    };
    // A failed image or renderer must never leave navigation blocked.
    const maxTimer = window.setTimeout(finish, MAXIMUM_LOADING_MS);
    let assetsReady = false;
    const checkReady = () => {
      if (disposed || hideTimer || !assetsReady) return;
      const remaining = Math.max(0, MINIMUM_LOADING_MS - (Date.now() - startedAt));
      hideTimer = window.setTimeout(() => {
        window.clearTimeout(maxTimer);
        finish();
      }, remaining);
    };

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
    pointerEvents: 'none',
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
    <div className={`v2-route-loader${loading ? ' is-active' : ''}${departing.current ? ' is-departing' : ''}`} style={loaderStyle} role="status" aria-label="ページを読み込み中" aria-hidden={!loading}>
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
