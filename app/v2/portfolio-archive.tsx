import type { CSSProperties } from 'react';
import { WovenProjectImage } from './woven-project-image';
import { EmbroideredTitle } from './embroidered-title';

export type ArchiveProject = {
  title: string;
  image: string;
  href: string;
};

// Native document scrolling keeps every work reachable even before hydration,
// on slower devices, and when JavaScript is unavailable.
export function PortfolioArchive({ projects }: { projects: ArchiveProject[] }) {
  return (
    <main className="v2-archive-track" id="works" style={{
      '--archive-rows': Math.ceil(projects.length / 2),
      '--archive-count': projects.length,
    } as CSSProperties}>
      <div className="v2-archive-world">
        {projects.map((project, index) => (
          <article className={`v2-archive-card ${index % 2 === 0 ? 'is-left' : 'is-right'}`} key={project.href}
            style={{
              '--archive-card-desktop-top': `calc(var(--archive-start) + var(--archive-row-step) * ${Math.floor(index / 2)} + ${index % 2 === 0 ? '0px' : '6svh'})`,
              '--archive-card-mobile-top': `calc(var(--archive-start) + var(--archive-row-step) * ${index})`,
            } as CSSProperties}>
            <a href={`${project.href}/`}>
              <WovenProjectImage src={project.image} eager={index < 2} />
              <div className="v2-archive-copy">
                <EmbroideredTitle>{project.title}</EmbroideredTitle>
              </div>
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
