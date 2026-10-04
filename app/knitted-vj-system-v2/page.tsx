import type { Metadata } from 'next';
import Image from 'next/image';
import { V2Header } from '../v2/v2-header';
import type { ReactNode } from 'react';
import { ProjectNavV2 } from '../project-nav-v2';
import { ProjectIntroV2 } from '../project-intro-v2';
import './knitted-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Knitted VJ System — 身体知を計算機表現へ編み直すライブパフォーマンス',
  description:
    '触覚・運動感覚・素材経験・感覚間の連想を、音と映像が応答するライブシステムへ展開した作品。',
};

const base = '/assets/knitted/';

const sizes: Record<string, [number, number]> = {
  'live-original.jpg': [4000, 6000],
  'material.jpg': [2000, 1333],
  'skin.jpg': [844, 562],
  'hands.jpg': [1333, 2000],
  'interface.jpg': [2000, 1824],
  'system.jpg': [2000, 1333],
  'touchdesigner.jpg': [2000, 1187],
  'exhibition.jpg': [1500, 2000],
};

function Label({ children }: { n: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

function Photo({
  name,
  alt,
  caption,
  priority = false,
  className = '',
}: {
  name: string;
  alt: string;
  caption: string;
  priority?: boolean;
  className?: string;
}) {
  const [width, height] = sizes[name];
  return (
    <figure className={`knitted-v2-photo ${className}`}>
      <a href={`${base}${name}`} target="_blank" rel="noreferrer" aria-label={`${alt}を拡大`}>
        <Image
          unoptimized
          src={`${base}${name}`}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
        />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function KnittedVJSystemV2() {
  return (
    <div className="knitted-v2-case">
      <a className="skip" href="#overview">
        本文へ移動
      </a>

      <V2Header reserveSpace />

      <main>
        <section className="hero wrap knitted-v2-hero" aria-labelledby="project-title">
          <figure className="knitted-v2-hero-photo">
            <Image
              unoptimized
              src={`${base}live-original.jpg`}
              alt="白いニットをまとい、糸を張った装置を操作する演者と生成映像"
              width={4000}
              height={6000}
              priority
            />
            <figcaption>
              Knitted VJ System — Scratch&amp;Build at TOKYO NODE
            </figcaption>
          </figure>
          <ProjectIntroV2
            title={<h1 id="project-title">Knitted <em>VJ System</em></h1>}
            subtitle="身体知を計算機表現へ編み直す、探索的ライブパフォーマンス"
            summary="『攻殻機動隊』の世界観と「未来のクラフト」をテーマに、編む行為から表現を生み出すライブパフォーマンスを制作。衣服を身体の経験や動きを受け取るもう一つの身体として捉え、蓄積された身体知を計算機表現へ編み直すことを試みました。"
            role={['ジェネラティブグラフィックス', 'VJ', 'インタラクティブアート']}
            period="2026.03.22・制作期間1週間"
            tools={['TouchDesigner', 'Sensor System']}
            team="4名共同制作"
            credits={[
              { label: '映像生成・VJ', value: 'Aino Kishimoto' },
              { label: '機材・入力システム', value: 'Shuhey Koyama' },
              { label: '衣装', value: 'TackT' },
              { label: 'DJ', value: 'jungjieyun' },
            ]}
          />
        </section>

        <section className="wrap section-grid knitted-v2-inspiration" id="inspiration">
          <Label n="01">INSPIRATION</Label>
          <div>
            <p className="knitted-v2-kicker">EMBODIED KNOWLEDGE</p>
            <p className="body-copy">
              身体には、触れたときの感覚、手を動かすリズム、素材の抵抗や柔らかさの記憶、ある感覚から別の感覚を呼び起こす連想が蓄積されています。
            </p>
            <p className="body-copy">
              編むという行為では、糸の張力や抵抗を感じ取りながら、手の力や動きを調整し、形や構造をつくっていきます。そこには、画面上の操作や言葉だけでは捉えにくい、<strong>身体を使って判断しながらつくる知</strong>があります。
            </p>
            <p className="body-copy">
              そこで本作では、触覚・運動感覚・素材とのやり取りを計算機への入力として扱い、<strong>身体を使って探る過程そのものから、映像表現やインタラクションを生み出せないか</strong>と考えました。
            </p>
            <p className="knitted-v2-system-summary">
              糸を引く、張る、ほどくといった操作によるテンションを計測し、その値を映像の位置や大きさへ反映。その反応を見た演者の動きが再び変化する、触覚・視覚・聴覚と身体の動きが循環するライブパフォーマンスを設計しました。
            </p>
            <p className="knitted-v2-intent">
              触れて感じること、身体を通して世界と関わること。この作品が、そこから得られる豊かさについて改めて考えるきっかけになればと願っています。
            </p>
            <div className="knitted-v2-sensory-pair">
              <Photo
                name="hands.jpg"
                alt="糸の張力を感じながら編む演者の手"
                caption="糸の抵抗を感じ、手の力と動きを調整する。"
              />
              <Photo
                name="interface.jpg"
                alt="衣装、演者の手、糸、センサーがつながる装置"
                caption="身体と素材、計算機が接する場所。"
              />
            </div>
          </div>
        </section>

        <section className="knitted-v2-role" id="role">
          <div className="wrap section-grid">
            <Label n="02">MY ROLE</Label>
            <div>
              <p className="knitted-v2-kicker">FROM CONCEPT TO LIVE</p>
              <p className="body-copy">
                コンセプト、インタラクション、映像の振る舞いを構想し、TouchDesignerによる映像生成の実装と、本番のVJを担当しました。
              </p>
              <p className="body-copy">
                また、作品の実現に必要な機材・センサー、衣装、音楽を担う専門家へ自ら協力を依頼。約1週間でチームを編成し、限られた時間のなかで実現可能な体験を判断しました。
              </p>
              <p className="body-copy">
                当初は糸の張力の強弱を連続的に映像へ反映する仕組みを検討していましたが、本番での安定性と演者の操作の分かりやすさを優先し、一定の閾値を超えたときに映像を生成する方式へ変更しました。構想、試作、映像制作、協働、本番運用まで一貫して進めました。
              </p>
              <div className="knitted-v2-tech-pair">
                <Photo
                  name="touchdesigner.jpg"
                  alt="映像生成を実装したTouchDesignerの制作画面"
                  caption="映像の生成・連なり・変形・消失をTouchDesignerで実装。"
                />
                <Photo
                  name="system.jpg"
                  alt="糸とセンサーを取り付けたライブ用の操作機材"
                  caption="約1週間で試作し、本番運用したライブシステム。"
                />
              </div>
            </div>
          </div>
        </section>

        <ProjectNavV2 current="/v2/knitted-vj-system" />
      </main>

    </div>
  );
}
