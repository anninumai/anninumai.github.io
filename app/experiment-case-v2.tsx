import type { ReactNode } from 'react';
import { ProjectIntroV2 } from './project-intro-v2';
import { ProjectNavV2 } from './project-nav-v2';
import { V2Header } from './v2/v2-header';
import './experiment-case-v2.css';

type Credit = { label: string; value: string };
type Figure = { src: string; alt: string; caption: string };
type Section = { label: string; title?: string; paragraphs: string[]; figure?: Figure };

type ExperimentCaseV2Props = {
  current: string;
  title: ReactNode;
  titleLabel: string;
  subtitle: string;
  summary: string;
  role: string[];
  period: string;
  tools: string[];
  team: string;
  credits?: Credit[];
  hero: Figure;
  sections: Section[];
};

export function ExperimentCaseV2({
  current,
  title,
  titleLabel,
  subtitle,
  summary,
  role,
  period,
  tools,
  team,
  credits = [],
  hero,
  sections,
}: ExperimentCaseV2Props) {
  return (
    <div className="experiment-v2-case">
      <a className="skip" href="#overview">本文へ移動</a>
      <V2Header reserveSpace />
      <main>
        <section className="hero wrap experiment-v2-hero" aria-label={titleLabel}>
          <figure className="experiment-v2-hero-figure">
            <a href={hero.src} target="_blank" rel="noreferrer" aria-label={`${hero.alt}を拡大`}>
              <img src={hero.src} alt={hero.alt} fetchPriority="high" />
            </a>
            <figcaption>{hero.caption}</figcaption>
          </figure>
          <ProjectIntroV2
            title={title}
            subtitle={subtitle}
            summary={summary}
            role={role}
            period={period}
            tools={tools}
            team={team}
            credits={credits}
          />
        </section>

        {sections.map((section, index) => (
          <section className="wrap section-grid experiment-v2-section" key={section.label}>
            <div className="section-label"><span>{section.label}</span></div>
            <div>
              {section.title && <h2>{section.title}</h2>}
              {section.paragraphs.map((paragraph) => <p className="body-copy" key={paragraph}>{paragraph}</p>)}
              {section.figure && (
                <figure className="experiment-v2-detail">
                  <a href={section.figure.src} target="_blank" rel="noreferrer" aria-label={`${section.figure.alt}を拡大`}>
                    <img src={section.figure.src} alt={section.figure.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                  </a>
                  <figcaption>{section.figure.caption}</figcaption>
                </figure>
              )}
            </div>
          </section>
        ))}
        <ProjectNavV2 current={current} />
      </main>
    </div>
  );
}
