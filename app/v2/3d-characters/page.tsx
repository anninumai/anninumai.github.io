import type { Metadata } from 'next';
import Image from 'next/image';
import { ExperimentCaseV2 } from '../../experiment-case-v2';
import './3d-characters.css';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: '3D Characters — Aino Kishimoto',
  description: 'Blenderで制作した3Dキャラクターと造形の自主制作。',
};

const images = [
  { file: 'moon-rabbit', alt: '地球と月を背景にした、白い耳の3Dキャラクター' },
  { file: 'two-hands', alt: '黄色と水色の手が重なる3Dビジュアル' },
];

export default function CharactersV2() {
  return <ExperimentCaseV2
    className="characters-v2-case"
    current="/v2/3d-characters"
    title={<h1 id="project-title">3D Characters</h1>}
    titleLabel="3D Characters"
    subtitle="3Dキャラクターと造形の自主制作"
    role={['3Dキャラクター', 'アニメーション']}
    tools={['Blender']}
    team="個人制作"
    hero={{
      src: '/assets/3d-characters/ghosts.webp',
      alt: '星空に浮かぶ、表情の異なる白い3Dキャラクターたち',
      caption: '3Dキャラクターのビジュアル。',
    }}
    sections={[{
      label: 'WORKS',
      paragraphs: [],
      gallery: <div className="characters-v2-gallery" aria-label="3Dキャラクターと造形の作品">
        <video
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/3d-characters/ghosts.webp"
          aria-label="星空に浮かぶ白いキャラクターたちのアニメーション"
        >
          <source src="/assets/3d-characters/ghosts.mp4" type="video/mp4" />
          <track kind="captions" src="/assets/3d-characters/ghosts.vtt" srcLang="ja" label="日本語" />
          お使いのブラウザでは動画を再生できません。
        </video>
        <a href="/assets/3d-characters/heart.webp" target="_blank" rel="noreferrer" aria-label="ハートを抱く3Dキャラクターを拡大">
          <Image unoptimized src="/assets/3d-characters/heart.webp" alt="ピンクのハートを抱く、白い3Dキャラクター" width={1920} height={1080} loading="lazy" />
        </a>
        <div className="characters-v2-pair">
          {images.map(({ file, alt }) => <a key={file} href={`/assets/3d-characters/${file}.webp`} target="_blank" rel="noreferrer" aria-label={`${alt}を拡大`}>
            <Image unoptimized src={`/assets/3d-characters/${file}.webp`} alt={alt} width={1920} height={1080} loading="lazy" />
          </a>)}
        </div>
      </div>,
    }]}
  />;
}
