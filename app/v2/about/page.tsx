import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { V2Header } from '../v2-header';
import { HandSequence } from './hand-sequence';
import './about-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'annin | Aino Kishimoto',
  description: '岸本あいののプロフィール、経歴、展示・受賞歴。',
};

const experience = [
  { year: '2024', title: 'UI/UX Research & Design', detail: 'STUDIO HOLIDAY', logo: '/assets/about/studio-holiday.jpeg' },
  { year: '2022', title: 'UX/UI Design Internship', detail: 'SEESAW', logo: '/assets/about/seesaw.jpg' },
  { year: '2021', title: 'Communication Design Internship', detail: 'Landor Tokyo', logo: '/assets/about/landor.jpeg' },
];

const recognition = [
  { year: '2026', title: '電通テクノロジーとアイデアの学校', detail: 'Silver Award' },
  { year: '2025', title: 'Lens', detail: 'SHIBUYA QWS 第22期採択', href: '/v2/lens' },
  { year: '2022', title: 'Focus on', detail: 'キャンパスベンチャーグランプリ大阪 最優秀賞・日刊工業新聞社賞', href: '/v2/focus-on' },
];

const exhibitions = [
  { year: '2026', title: 'OCTOMORPH', detail: 'メディア芸術祭アフターイベント｜渋谷サクラステージ 4F・404 Not Found' },
  { year: '2026', title: 'Knitted VJ System', detail: '攻殻機動隊展 Ghost and the Shell × TOKYO NODE', href: '/v2/knitted-vj-system' },
  { year: '2026', title: '編みスクリーン', detail: 'んあむぃむぉにょ展「暮らしの思想」', href: '/v2/knitted-display' },
  { year: '2025', title: 'Ryusei Wave', detail: '二子玉川ライズ', href: '/v2/ryusei-wave' },
  { year: '2022', title: 'X couture', detail: 'Rakuten Fashion Week TOKYO 2022 A/W', href: '/v2/x-couture' },
];

type Entry = { year: string; title: string; detail: string; href?: string; logo?: string };

function RecordList({ items }: { items: Entry[] }) {
  return <div className="about-v2-record-list">{items.map((item) => {
    const content = <>
      <span className="about-v2-record-year">{item.year}</span>
      {item.logo && <Image className="about-v2-record-logo" src={item.logo} alt="" width={48} height={48} unoptimized />}
      <span className="about-v2-record-description"><strong>{item.title}</strong><small>{item.detail}</small></span>
      <span className="about-v2-record-arrow" aria-hidden="true">{item.href ? '↗' : ''}</span>
    </>;
    return item.href
      ? <Link key={`${item.year}-${item.title}`} href={item.href}>{content}</Link>
      : <div key={`${item.year}-${item.title}`}>{content}</div>;
  })}</div>;
}

export default function AboutV2Page() {
  return <div className="about-v2-page">
    <a className="skip" href="#about-v2-main">本文へ移動</a>
    <V2Header />
    <main id="about-v2-main">
      <section className="about-v2-hands" aria-label="手の動きと自己紹介">
        <HandSequence />
      </section>

      <section className="about-v2-records wrap" aria-label="経歴と活動">
        <div className="about-v2-introduction">
          <span className="about-v2-eyebrow">PROFILE / 02</span>
          <p>感覚や身体性に寄り添い、<br />世界の感じ方を豊かにする体験を探る。</p>
          <span>Research / UX・UI / Creative Technology</span>
        </div>
        <div className="about-v2-record-grid">
          <section>
            <h2><span>03</span>Experience</h2>
            <RecordList items={experience} />
          </section>
          <section>
            <h2><span>04</span>Awards / Selected</h2>
            <RecordList items={recognition} />
          </section>
          <section>
            <h2><span>05</span>Exhibitions / Performance</h2>
            <RecordList items={exhibitions} />
          </section>
          <section>
            <h2><span>06</span>Education</h2>
            <div className="about-v2-education">
              <p><strong>Billy Blue College of Design,<br />Torrens University Australia</strong><small>Bachelor of Communication Design</small></p>
              <p><strong>Chiba Prefectural Kohnodai High School</strong></p>
            </div>
          </section>
        </div>
      </section>
    </main>
    <footer className="about-v2-footer wrap">
      <Link href="/v2">Selected work <span aria-hidden="true">↗</span></Link>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  </div>;
}
