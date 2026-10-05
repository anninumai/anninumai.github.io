import type { ReactNode } from 'react';
import { V2RouteReset } from './v2-route-reset';
import './v2-scale.css';

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="v2-site">
      <link rel="preload" href="/fonts/zen-kaku-gothic-new/about-bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <V2RouteReset />
      <noscript><style>{'.v2-route-loader{display:none!important}'}</style></noscript>
      {children}
    </div>
  );
}
