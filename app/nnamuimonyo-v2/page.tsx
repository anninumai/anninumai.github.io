import type { Metadata } from 'next';
import Image from 'next/image';
import { V2Header } from '../v2/v2-header';
import type { ReactNode } from 'react';
import { ProjectNavV2 } from '../project-nav-v2';
import { ProjectIntroV2 } from '../project-intro-v2';
import './knitted-display-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Knitted Display — 情報の手触りを感じられる、柔らかなディスプレイ',
  description:
    '触覚的視覚と編み地の構造を用い、柔らかな素材そのものが変化して情報や気配を伝える画面を探ったプロジェクト。',
};

const base = '/assets/nnamuimonyo/';

const sizes: Record<string, [number, number]> = {
  'display-texture.webp': [1206, 1650],
  'display-touch.webp': [2364, 1773],
  'display-hanging.webp': [1204, 1606],
  'display-visitors.webp': [2364, 1773],
  'exhibition-wide.webp': [2364, 1773],
  'requirements.webp': [1690, 1714],
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
    <figure className={`display-v2-photo ${className}`}>
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

export default function KnittedDisplayV2() {
  return (
    <div className="display-v2-case">
      <a className="skip" href="#overview">本文へ移動</a>

      <V2Header reserveSpace />

      <main>
        <section className="hero wrap display-v2-hero" aria-labelledby="project-title">
          <figure className="display-v2-hero-photo">
            <Image
              unoptimized
              src={`${base}exhibition-poster-full.webp`}
              alt="「暮らしの思想」展のポスター。濃紺とマゼンタの編み地を背景に、展示名と会期を記したビジュアル"
              width={1146}
              height={1428}
              priority
            />
          </figure>
          <ProjectIntroV2
            title={<h1 id="project-title">Knitted <em>Display</em></h1>}
            subtitle="情報の手触りを感じられる、柔らかなディスプレイ"
            summary="糸、編み目、陰影、変形によって情報が現れる「物質としての画面」のプロトタイプ。暮らしのなかにある柔らかな素材そのものが変化し、情報や気配を伝えるインターフェースを提案しました。"
            role={['マテリアルデザイン', 'テキスタイル', '触覚インターフェース', 'プロトタイプ']}
            period="2026.07.26–08.01"
            tools={['Knitting', 'Material Prototype']}
            team="4名共同制作"
            credits={[
              { label: 'コンセプト・ディレクション・レビュー', value: 'Aino Kishimoto' },
              { label: 'デザイン・進行管理', value: 'koichi ishi' },
              { label: 'ニッター', value: 'miq' },
              { label: 'テクニカル', value: 'shuhey koyama' },
            ]}
          />
        </section>

        <section className="wrap section-grid display-v2-inspiration" id="inspiration">
          <Label n="01">INSPIRATION</Label>
          <div>
            <p className="body-copy">
              人は素材に触れなくても、表面の凹凸や光の陰影、形の変化から、柔らかさや手触りを想像できます。本作では、この「触覚的視覚」に着目しました。
            </p>
            <p className="body-copy">
              情報は、視覚的な記号だけでなく、本来、素材の手触りや重さ、変形、身体との関わりを伴って受け取られるものではないか。ディスプレイを、情報から質感が切り離された状態のメタファとして扱い、一見すると画面に見えながら、近づくと糸と編み目からなる柔らかな物質だと気づく構造を考えました。
            </p>
            <p className="body-copy">
              画面内の情報と現実の物質を重ねることで、情報を視覚だけで読むのではなく、質感を伴って触覚的に受け取る体験を目指しました。
            </p>
            <div className="display-v2-pair display-v2-pair--touch">
              <Photo
                name="display-touch.webp"
                alt="展示された編みスクリーンに触れる来場者"
                caption="見る画面から、素材へ働きかける画面へ。"
              />
              <Photo
                name="display-hanging.webp"
                alt="壁から垂れる青と白の編みスクリーン"
                caption="生活空間に溶け込む、柔らかな表示面。"
              />
            </div>
          </div>
        </section>

        <section className="display-v2-system" id="system">
          <div className="wrap section-grid">
            <Label n="02">MATERIAL SYSTEM</Label>
            <div>
              <p className="body-copy">
                フィッシャーマンズリブの、畝と谷が連なる立体構造を利用しました。編み地を動かすことで畝の間が開き、谷側の色が現れる構造を考案。光で像を表示するのではなく、糸、編み目、陰影、変形によって、色や模様が立ち上がる画面を構想しました。
              </p>
              <Photo
                name="requirements.webp"
                alt="編みスクリーンの成立条件と構造を整理した資料"
                caption="見え方の仮説と、試作に必要な成立条件を整理。"
                className="display-v2-requirements"
              />
            </div>
          </div>
        </section>

        <section className="wrap section-grid display-v2-role" id="role">
          <Label n="03">MY ROLE / OUTCOME</Label>
          <div>
            <p className="body-copy">
              編みスクリーンのアイデア、見え方の仮説、成立条件を整理し、共同制作者へ制作を依頼。完成した試作が意図した表現につながっているかを確認し、素材条件と改善点を言語化しました。
            </p>
            <p className="body-copy">
              ニッター、テクニカル担当、デザイナーと4人で共同制作。試作では、狙った色の切り替わりを十分に表現することはできませんでした。
            </p>
            <p className="body-copy">
              一方で、素材から生まれた予想外の動きや反応に、新しい表現の可能性を発見しました。意図との差を失敗として終わらせず、展示表現と次の検証課題へ展開しました。
            </p>
            <Photo
              name="exhibition-wide.webp"
              alt="編みスクリーンと編み花を組み合わせた展示空間"
              caption="素材から生まれた反応を、4人による展示と次の問いへ展開。"
              className="display-v2-exhibition"
            />
          </div>
        </section>

        <ProjectNavV2 current="/v2/knitted-display" />
      </main>

    </div>
  );
}
