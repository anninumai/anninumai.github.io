'use client';

import { useEffect, useMemo, useState } from 'react';

type Category = 'client' | 'practice' | 'experiments';
type Project = { category: Category; title: string; meta: string; image?: string; href?: string };

const projects: Project[] = [
  { category: 'client', title: 'PERSOL AI Career', meta: 'UX/UI · AI Interaction', image: '/assets/persol/hero-together.png', href: '/persol' },
  { category: 'client', title: '東大制作展 Web', meta: 'Design Lead · In progress' },
  { category: 'client', title: 'Focus on', meta: 'Research · UX/UI', image: '/assets/focus-on/hero-onomatopoeia.png', href: '/focus-on' },
  { category: 'client', title: 'X couture', meta: 'Project Management · CG', image: '/assets/runway.png', href: '/x-couture' },
  { category: 'practice', title: 'Knitted VJ System', meta: 'Interaction · TouchDesigner', image: '/assets/knitted/live-original.jpg', href: '/knitted-vj-system' },
  { category: 'practice', title: '編みスクリーン', meta: 'Material · Installation', image: '/assets/nnamuimonyo/display-visitors.jpg', href: '/nnamuimonyo' },
  { category: 'practice', title: 'Lens', meta: 'Research · Service Design', image: '/assets/lens/1.png', href: '/lens' },
  { category: 'experiments', title: '夏の存在証明', meta: 'Sound · Interaction', image: '/assets/summer/screen.png', href: '/summer' },
  { category: 'experiments', title: 'Ryusei Wave', meta: 'Creative Coding · Installation', image: '/assets/ryusei-wave/exhibition-original.png', href: '/ryusei-wave' },
  { category: 'experiments', title: '雨粒時計', meta: 'Creative Coding · Clock', image: '/assets/rain-clock/hero-leaf-4x.png', href: '/rain-clock' },
];

const categories: Array<{ id: Category; label: string }> = [
  { id: 'client', label: 'CLIENT WORK' },
  { id: 'practice', label: 'RESEARCH & PRACTICE' },
  { id: 'experiments', label: 'EXPERIMENTS' },
];

const frame = (set: string, index: number) => `/assets/hands/${set}/frame-${String(index).padStart(3, '0')}.png`;

export function PortfolioHome() {
  const [category, setCategory] = useState<Category>('client');
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [handFrame, setHandFrame] = useState(1);
  const [gestureFrame, setGestureFrame] = useState(0);
  const [gesture, setGesture] = useState(false);

  useEffect(() => {
    const savedCategory = sessionStorage.getItem('portfolio-category') as Category | null;
    if (savedCategory && categories.some((item) => item.id === savedCategory)) setCategory(savedCategory);
    if (sessionStorage.getItem('portfolio-open') === 'true') setOpened(true);
  }, []);

  const visibleProjects = useMemo(() => projects.filter((project) => project.category === category), [category]);

  function animate(from: number, to: number, duration: number, setter: (value: number) => void) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setter(Math.round(from + (to - from) * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function openWorks() {
    setOpening(true);
    animate(1, 8, 520, setHandFrame);
    window.setTimeout(() => {
      setOpened(true);
      sessionStorage.setItem('portfolio-open', 'true');
      requestAnimationFrame(() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' }));
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 900);
  }

  function selectCategory(next: Category) {
    if (next === category) return;
    setCategory(next);
    sessionStorage.setItem('portfolio-category', next);
    if (opened) {
      setGesture(false);
      setGestureFrame(0);
      requestAnimationFrame(() => {
        setGesture(true);
        animate(0, 12, 650, setGestureFrame);
        window.setTimeout(() => setGesture(false), 760);
      });
    }
  }

  return <div className="work-index" id="top">
    <a className="skip" href="#works">作品一覧へ移動</a>
    <header className="work-header">
      <a className="work-wordmark" href="#top">Portfolio</a>
      <span>Work</span>
      <a href="/about">ABOUT ↗</a>
    </header>

    <nav className={`work-tabs ${opened ? 'is-open' : ''}`} aria-label="作品カテゴリー" role="tablist">
      {categories.map((item) => <button
        key={item.id}
        type="button"
        role="tab"
        aria-selected={category === item.id}
        tabIndex={category === item.id ? 0 : -1}
        onClick={() => selectCategory(item.id)}
      >{item.label}</button>)}
    </nav>

    {!opened && <section className={`work-intro ${opening ? 'is-opening' : ''}`} aria-label="作品一覧を開く">
      <div className="work-deck" aria-hidden="true">
        {visibleProjects.slice(0, 4).map((project) => <div className="work-deck-card" key={project.title}>
          {project.image && <img src={project.image} alt="" />}
          <span>{project.title}</span>
        </div>)}
      </div>
      <img className="work-hand" src={frame('01-hand-open', handFrame)} alt="" aria-hidden="true" />
      <p>手がカードを広げ、作品一覧へつなぎます。</p>
      <button type="button" onClick={openWorks}>OPEN WORKS ↑</button>
    </section>}

    <main className={`work-gallery ${opened ? 'is-visible' : ''}`} id="works" tabIndex={-1}>
      <div className="work-grid">
        {visibleProjects.map((project) => {
          const content = <>
            <div className="work-image">{project.image ? <img src={project.image} alt="" loading="lazy" /> : <span>CASE STUDY<br/>COMING SOON</span>}</div>
            <div className="work-copy"><h2>{project.title}</h2><p>{project.meta}</p></div>
          </>;
          return project.href
            ? <a className="work-card" href={project.href} key={project.title}>{content}</a>
            : <article className="work-card is-unpublished" key={project.title}>{content}</article>;
        })}
      </div>
    </main>

    <div className={`work-gesture ${gesture ? 'is-playing' : ''}`} aria-hidden="true">
      <img src={frame('02-fingers-spread', gestureFrame)} alt="" />
    </div>

    <footer className="work-footer">
      <span>Selected works / 2021–2026</span>
      <span><a href="/about">ABOUT ↗</a><a href="#top">BACK TO TOP ↑</a></span>
    </footer>
  </div>;
}
