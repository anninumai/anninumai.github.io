import type { ReactNode } from 'react';
import { V2RouteReset } from './v2-route-reset';

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <V2RouteReset />
      <noscript><style>{'.v2-route-loader{display:none!important}'}</style></noscript>
      {children}
    </>
  );
}
