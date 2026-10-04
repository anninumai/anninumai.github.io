'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { WovenProjectImage } from './woven-project-image';
import { EmbroideredTitle } from './embroidered-title';

const ARCHIVE_SCROLL_SPEED = 1.18;

export type ArchiveProject = {
  title: string;
  image: string;
  href: string;
};

export function PortfolioArchive({ projects }: { projects: ArchiveProject[] }) {
  const trackRef = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const track = trackRef.current;
    const world = worldRef.current;
    if (!track || !world) return;

    let target = 0;
    let scrollMaximum = 0;
    let trackTop = 0;
    let frame = 0;

    const measure = () => {
      trackTop = track.getBoundingClientRect().top + window.scrollY;
      scrollMaximum = Math.max(0, track.offsetHeight - window.innerHeight);
    };

    const measureTarget = () => {
      target = Math.min(scrollMaximum, Math.max(0, window.scrollY - trackTop));
    };

    const paint = () => {
      frame = 0;
      const camera = Math.round(target * ARCHIVE_SCROLL_SPEED);
      world.style.transform = `translate3d(0, ${-camera}px, 0)`;
      window.dispatchEvent(new CustomEvent('v2-archive-camera', { detail: { camera } }));
    };

    const requestPaint = () => {
      measureTarget();
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    const onResize = () => {
      measure();
      requestPaint();
    };

    measure();
    measureTarget();
    paint();
    window.addEventListener('scroll', requestPaint, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestPaint);
      window.removeEventListener('resize', onResize);
    };
  }, [projects.length]);

  const focusProject = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const isMobile = window.matchMedia('(max-width: 700px)').matches;
    const worldPosition = isMobile ? index * 0.78 : Math.floor(index / 2) * 0.6;
    const position = worldPosition / ARCHIVE_SCROLL_SPEED;
    const destination = trackTop + window.innerHeight * (position + 0.08);
    window.scrollTo({ top: destination, behavior: 'smooth' });
  };

  const rows = Math.ceil(projects.length / 2);
  const trackStyle = {
    '--archive-desktop-height': `${rows * 51 + 80}svh`,
    '--archive-mobile-height': `${projects.length * 66 + 90}svh`,
  } as CSSProperties;

  return (
    <main className="v2-archive-track" id="works" ref={trackRef} style={trackStyle}>
      <div className="v2-archive-viewport">
        <div className="v2-archive-world" ref={worldRef}>
          {projects.map((project, index) => (
            <article
              className={`v2-archive-card ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
              key={project.href}
              ref={(node) => { cardRefs.current[index] = node; }}
              style={{
                '--archive-card-desktop-top': `${14 + Math.floor(index / 2) * 60 + (index % 2 === 0 ? 0 : 6)}svh`,
                '--archive-card-mobile-top': `${18 + index * 78}svh`,
              } as CSSProperties}
            >
              <Link href={project.href} onFocus={() => focusProject(index)}>
                <WovenProjectImage src={project.image} eager={index < 2} />
                <div className="v2-archive-copy">
                  <EmbroideredTitle>{project.title}</EmbroideredTitle>
                </div>
              </Link>
            </article>
          ))}
          <p
            className="v2-archive-end"
            style={{
              '--archive-end-desktop-top': `${rows * 60 + 18}svh`,
              '--archive-end-mobile-top': `${projects.length * 78 + 18}svh`,
            } as CSSProperties}
          >
            END OF ARCHIVE
          </p>
        </div>
      </div>
    </main>
  );
}
