import type { Metadata } from 'next';
import Image from 'next/image';
import { ProjectIntroV2 } from '../../project-intro-v2';
import { ProjectNavV2 } from '../../project-nav-v2';
import { V2Header } from '../v2-header';
import './octomorph.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'OCTOMORPH — ライブVJとオーバーレイシステム',
  description: 'メディア芸術祭アフターイベント「OCTOMORPH」で制作・演奏した、二人で同時にVJできるオーバーレイシステム。',
};

const base = '/assets/octomorph/';

export default function OctomorphV2() {
  return (
    <div className="experiment-v2-case octomorph-v2-case">
      <a className="skip" href="#overview">本文へ移動</a>
      <V2Header reserveSpace />

      <main>
        <section className="hero wrap octomorph-v2-hero" aria-labelledby="project-title">
          <figure className="octomorph-v2-hero-media">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={`${base}live-poster.webp`}
              aria-label="OCTOMORPHの会場で二人が行ったライブVJ"
            >
              <source src={`${base}live-at-venue.mp4`} type="video/mp4" />
              <track kind="captions" src={`${base}live-at-venue.vtt`} srcLang="ja" label="映像の説明" />
              お使いのブラウザでは動画を再生できません。
            </video>
            <figcaption>OCTOMORPH — 渋谷サクラステージ 4F・404 Not Found</figcaption>
          </figure>

          <ProjectIntroV2
            title={<h1 id="project-title">OCTOMORPH</h1>}
            subtitle="メディア芸術祭アフターイベント｜渋谷サクラステージ 4F・404 Not Found"
            summary="メディア芸術祭アフターイベントにて、チームたこくりのもう一人のVJ担当とライブVJを行いました。二人の映像を重ねて同時に操作できるシステムを設計・制作し、映像制作も担当しました。"
            role={['VJシステム設計・制作', '映像制作', 'ライブVJ']}
            tools={['TouchDesigner']}
            team="チームたこくり"
          />
        </section>

        <section className="wrap section-grid octomorph-v2-section" id="system">
          <div className="section-label"><span>SYSTEM</span></div>
          <div>
            <p className="body-copy">
              TouchDesignerで、背景、図形、タコのモチーフ、グリッチ、文字などをレイヤーごとに操作できるように構成。二人の映像をオーバーレイし、ライブ中に重なり方を変えられる仕組みを作りました。
            </p>
            <figure className="octomorph-v2-output">
              <video
                controls
                loop
                playsInline
                preload="metadata"
                poster={`${base}vj-poster.webp`}
                aria-label="制作したOCTOMORPHのVJ映像"
              >
                <source src={`${base}vj-output.mp4`} type="video/mp4" />
                <track kind="captions" src={`${base}vj-output.vtt`} srcLang="ja" label="映像の説明" />
                お使いのブラウザでは動画を再生できません。
              </video>
              <figcaption>制作したVJ映像。</figcaption>
            </figure>
            <figure className="octomorph-v2-interface">
              <a href={`${base}system-interface.webp`} target="_blank" rel="noreferrer" aria-label="TouchDesignerの操作画面を拡大">
                <Image
                  unoptimized
                  src={`${base}system-interface.webp`}
                  alt="背景、図形、タコ、グリッチ、文字をレイヤーごとに操作するTouchDesignerの画面"
                  width={1600}
                  height={1072}
                  loading="lazy"
                />
              </a>
              <figcaption>映像のレイヤーを操作するための画面。</figcaption>
            </figure>
          </div>
        </section>

        <ProjectNavV2 current="/v2/octomorph" />
      </main>
    </div>
  );
}
