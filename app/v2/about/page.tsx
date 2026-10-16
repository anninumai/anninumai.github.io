import type { Metadata } from 'next';
import Image from 'next/image';
import { V2Header } from '../v2-header';
import { AboutGesture } from './about-gesture';
import './about-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'annin | Aino Kishimoto',
  description: '岸本あいののプロフィール、経歴、展示・受賞歴。',
};

const experience = [
  { year: '2023–2026', title: 'UX/UI Research & Design', detail: 'STUDIO HOLIDAY', logo: '/assets/about/studio-holiday.webp' },
  { year: '2021–2022', title: 'UX/UI Design Internship', detail: 'SEESAW', logo: '/assets/about/seesaw.webp' },
  { year: '2021', title: 'Communication Design Internship', detail: 'Landor Tokyo', logo: '/assets/about/landor.webp' },
];

const recognition = [
  { year: '2026', title: '電通テクノロジーとアイデアの学校', detail: 'Silver Award' },
  { year: '2025', title: 'Lens — Memory Maker', detail: 'SHIBUYA QWS 第22期採択', href: '/v2/lens' },
  { year: '2022', title: 'Focus on', detail: 'キャンパスベンチャーグランプリ大阪 最優秀賞', href: '/v2/focus-on' },
];

const exhibitions = [
  { year: '2026', title: 'OCTOMORPH', detail: 'メディア芸術祭アフターイベント｜渋谷サクラステージ 4F・404 Not Found' },
  { year: '2026', title: 'Knitted VJ System', detail: '攻殻機動隊展 Ghost and the Shell × TOKYO NODE', href: '/v2/knitted-vj-system' },
  { year: '2026', title: 'Knitted Display', detail: 'んあむぃむぉにょ展「暮らしの思想」', href: '/v2/knitted-display' },
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
      ? <a key={`${item.year}-${item.title}`} href={`${item.href}/`}>{content}</a>
      : <div key={`${item.year}-${item.title}`}>{content}</div>;
  })}</div>;
}

export default function AboutV2Page() {
  return <div className="about-v2-page">
    <a className="skip" href="#about-v2-main">本文へ移動</a>
    <V2Header />
    <main id="about-v2-main">
      <section className="about-v2-records wrap" aria-label="経歴と活動" tabIndex={0}>
        <AboutGesture />
        <div className="about-v2-record-grid">
          <section className="about-v2-experience">
            <h2>Experience</h2>
            <RecordList items={experience} />
          </section>
          <section>
            <h2>Awards / Selected</h2>
            <RecordList items={recognition} />
          </section>
          <section>
            <h2>Exhibitions / Performance</h2>
            <RecordList items={exhibitions} />
          </section>
          <section>
            <h2>Education</h2>
            <dl className="about-v2-education">
              <div>
                <dt><time dateTime="2019">2019</time><span>–</span><time dateTime="2022">2022</time></dt>
                <dd><strong>Billy Blue College of Design / Torrens University Australia</strong><small>Bachelor of Communication Design（中退）</small></dd>
              </div>
              <div>
                <dt><time dateTime="2015">2015</time><span>–</span><time dateTime="2018">2018</time></dt>
                <dd><strong>Chiba Prefectural Kohnodai High School</strong></dd>
              </div>
            </dl>
          </section>
        </div>
      </section>
    </main>
  </div>;
}
