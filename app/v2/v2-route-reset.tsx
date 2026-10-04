'use client';

import { useEffect, useLayoutEffect, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';

let routeTransitionActive = false;
let routeTransitionStartedAt = 0;
const MINIMUM_LOADING_MS = 2000;

export function V2RouteReset() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(routeTransitionActive);
  const [transitionId, setTransitionId] = useState(0);

  useEffect(() => {
    const beginBackNavigation = () => {
      routeTransitionActive = true;
      routeTransitionStartedAt = Date.now();
      setLoading(true);
      setTransitionId((current) => current + 1);
    };
    window.addEventListener('popstate', beginBackNavigation);
    return () => {
      window.removeEventListener('popstate', beginBackNavigation);
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (!routeTransitionActive) {
      setLoading(false);
      return;
    }
    setLoading(true);
    if (!routeTransitionStartedAt) routeTransitionStartedAt = Date.now();

    let hideTimer = 0;
    let maxTimer = 0;
    const hide = () => {
      window.clearTimeout(hideTimer);
      const elapsed = Date.now() - routeTransitionStartedAt;
      const remaining = Math.max(0, MINIMUM_LOADING_MS - elapsed);
      hideTimer = window.setTimeout(() => {
        routeTransitionActive = false;
        routeTransitionStartedAt = 0;
        setLoading(false);
      }, remaining + 90);
    };

    if (pathname === '/v2') {
      let readyCount = 0;
      const onKnitReady = () => {
        readyCount += 1;
        if (readyCount >= 2) hide();
      };
      window.addEventListener('v2-knit-ready', onKnitReady);
      const elapsed = Date.now() - routeTransitionStartedAt;
      const remaining = Math.max(0, MINIMUM_LOADING_MS - elapsed);
      maxTimer = window.setTimeout(() => {
        window.clearTimeout(hideTimer);
        routeTransitionActive = false;
        routeTransitionStartedAt = 0;
        setLoading(false);
      }, remaining + 450);
      return () => {
        window.clearTimeout(hideTimer);
        window.clearTimeout(maxTimer);
        window.removeEventListener('v2-knit-ready', onKnitReady);
      };
    } else hide();

    return () => {
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
    <div className={`v2-route-loader${loading ? ' is-active' : ''}`} style={loaderStyle} aria-hidden={!loading}>
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
