import type { Metadata } from 'next';
import Image from 'next/image';
import { ProjectNavV2 } from '../../project-nav-v2';
import { V2Header } from '../v2-header';
import './3d-characters.css';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: '3D Characters — Aino Kishimoto',
  description: 'Blenderで制作した3Dキャラクターと造形の自主制作。',
};

const images = [
  { file: 'heart', alt: 'ピンクのハートを抱く、白い3Dキャラクター' },
  { file: 'moon-rabbit', alt: '地球と月を背景にした、白い耳の3Dキャラクター' },
  { file: 'two-hands', alt: '黄色と水色の手が重なる3Dビジュアル' },
];

export default function CharactersV2() {
  return <div className="characters-v2-case">
    <a className="skip" href="#overview">本文へ移動</a>
    <V2Header reserveSpace />
    <main>
      <section className="characters-v2-hero" aria-labelledby="project-title">
        <Image
          unoptimized
          src="/assets/3d-characters/ghosts.webp"
          alt="星空に浮かぶ、表情の異なる白い3Dキャラクターたち"
          width={1920}
          height={1057}
          priority
        />
      </section>

      <section className="characters-v2-intro wrap" id="overview">
        <p className="characters-v2-eyebrow">PERSONAL WORK / BLENDER</p>
        <h1 id="project-title">3D Characters</h1>
        <p className="characters-v2-summary">Blenderで制作した3Dキャラクターと造形の自主制作。表情や質感、かたちの違いを通して、それぞれの存在感を描きました。</p>
      </section>

      <div className="characters-v2-gallery wrap" aria-label="3Dキャラクターと造形の作品">
        <video
          controls
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
          <Image unoptimized src="/assets/3d-characters/heart.webp" alt={images[0].alt} width={1920} height={1080} loading="lazy" />
        </a>
        <div className="characters-v2-pair">
          {images.slice(1).map(({ file, alt }) => <a key={file} href={`/assets/3d-characters/${file}.webp`} target="_blank" rel="noreferrer" aria-label={`${alt}を拡大`}>
            <Image unoptimized src={`/assets/3d-characters/${file}.webp`} alt={alt} width={1920} height={1080} loading="lazy" />
          </a>)}
        </div>
      </div>

      <ProjectNavV2 current="/v2/3d-characters" />
    </main>
  </div>;
}
