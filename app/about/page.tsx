import type { Metadata } from 'next';
import { ProjectNav } from '../project-nav';
import './about.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About — Aino Kishimoto / 岸本あいの',
  description: '人の感じ方を起点に、媒体を横断して体験をつくるProduct & Experience Designer、岸本あいののプロフィール。',
};

const experience = [
  { year: '2024', title: 'UI/UX Research & Design', place: 'STUDIO HOLIDAY', logo: '/assets/about/studio-holiday.webp' },
  { year: '2022', title: 'UX/UI Design Internship', place: 'SEESAW', logo: '/assets/about/seesaw.webp' },
  { year: '2021', title: 'Communication Design Internship', place: 'Landor Tokyo', logo: '/assets/about/landor.webp' },
];

const recognition = [
  { year: '2026', title: '電通テクノロジーとアイデアの学校', note: 'Silver Award' },
  { year: '2025', title: 'Lens', note: 'SHIBUYA QWS 第22期採択', href: '/lens' },
  { year: '2022', title: 'Focus on', note: 'キャンパスベンチャーグランプリ大阪 最優秀賞・日刊工業新聞社賞', href: '/focus-on' },
];

const exhibitions = [
  {
    year: '2026',
    title: 'OCTOMORPH',
    place: 'メディア芸術祭アフターイベント｜渋谷サクラステージ 4F・404 Not Found',
  },
  { year: '2026', title: 'Knitted VJ System', place: '攻殻機動隊展 Ghost and the Shell × TOKYO NODE', href: '/knitted-vj-system' },
  { year: '2026', title: '編みスクリーン', place: 'んあむぃむぉにょ展「暮らしの思想」', href: '/nnamuimonyo' },
  { year: '2025', title: 'Ryusei Wave', place: '二子玉川ライズ', href: '/ryusei-wave' },
  { year: '2022', title: 'X couture', place: 'Rakuten Fashion Week TOKYO 2022 A/W', href: '/x-couture' },
];

function ProfileList({ items }: { items: Array<{ year: string; title: string; place?: string; note?: string; href?: string; logo?: string }> }) {
  return <div className="about-list">{items.map((item) => {
    const content = <><span className="about-list-year">{item.year}</span>{item.logo && <span className="about-list-logo" aria-hidden="true"><img src={item.logo} alt="" /></span>}<span className="about-list-main"><strong>{item.title}</strong><span>{item.place ?? item.note}</span></span><span className="about-list-arrow" aria-hidden="true">{item.href ? '↗' : ''}</span></>;
    return item.href
      ? <a className={item.logo ? 'has-logo' : undefined} key={`${item.year}-${item.title}`} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>{content}</a>
      : <div className={item.logo ? 'has-logo' : undefined} key={`${item.year}-${item.title}`}>{content}</div>;
  })}</div>;
}

export default function AboutPage() {
  return <div className="about-page">
    <a className="skip" href="#profile">本文へ移動</a>
    <header className="site-header" id="top">
      <a className="wordmark" href="/">Aino Kishimoto<span className="wordmark-dot">.</span></a>
      <span className="header-caption">PORTFOLIO / ABOUT</span>
      <a className="header-link" href="/">WORKS <span aria-hidden="true">↗</span></a>
    </header>

    <main id="profile">
      <section className="about-hero wrap">
        <div className="about-page-heading">
          <span className="eyebrow">01 / PROFILE</span>
          <h1>About</h1>
        </div>
        <div className="about-profile-grid">
          <figure className="about-profile-visual">
            <div className="about-profile-image"><img src="/assets/knitted/material.webp" width="2000" height="1333" alt="毛羽立った白いニットの袖から現れる手と編み針" /></div>
            <figcaption><span className="figure-no">MATERIAL / COMPUTATION</span><span>身体と素材から、デジタルの体験を考える。</span></figcaption>
          </figure>
          <div className="about-profile-copy">
            <span className="eyebrow">AINO KISHIMOTO / 岸本あいの</span>
            <p className="about-role">Product &amp; Experience Designer</p>
            <p className="about-fields">Research / UX・UI / Creative Technology</p>
            <div className="about-prose">
              <p>オーストラリアでCommunication Designを学び、ブランディング、UX/UIデザインの実務を経験してきました。</p>
              <p>AIアバター、ヘルスケア、バーチャルファッションなど、人の感情や身体、自己表現と密接に関わるプロジェクトに携わり、デジタルプロダクトやサービスのコンセプト立案から、UX/UI設計、プロトタイプ制作まで一貫して取り組んでいます。</p>
              <p>感覚や身体性に寄り添う直感的なインターフェースに関心があります。また、人の知覚に働きかけ、世界の感じ方を豊かにするインターフェースを探っています。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-records wrap" aria-label="経歴と活動">
        <article>
          <div className="about-section-heading"><span>02</span><h2>Experience</h2></div>
          <ProfileList items={experience} />
        </article>
        <article>
          <div className="about-section-heading"><span>03</span><h2>Awards / Selected</h2></div>
          <ProfileList items={recognition} />
        </article>
        <article className="about-record-wide">
          <div className="about-section-heading"><span>04</span><h2>Exhibitions / Performance</h2></div>
          <ProfileList items={exhibitions} />
        </article>
        <article className="about-education">
          <div className="about-section-heading"><span>05</span><h2>Education</h2></div>
          <div className="about-education-content">
            <p><strong>Billy Blue College of Design,<br/>Torrens University Australia</strong><span>Bachelor of Communication Design</span></p>
            <p><strong>Chiba Prefectural Kohnodai High School</strong></p>
          </div>
        </article>
      </section>

      <ProjectNav current="/about" />
    </main>

    <footer className="wrap about-footer">
      <a className="footer-title" href="/">Selected <em>work</em><span aria-hidden="true">↗</span></a>
      <div><span>AINO KISHIMOTO / PORTFOLIO</span><a href="#top">ページの先頭へ ↑</a></div>
    </footer>
  </div>;
}
