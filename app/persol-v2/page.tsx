import type { Metadata } from 'next';
import Image from 'next/image';
import { V2Header } from '../v2/v2-header';
import type { ReactNode } from 'react';
import { ProjectNavV2 } from '../project-nav-v2';
import { PersolIntro } from './persol-intro';
import './persol-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'PERSOL AI Interview — 等身大のAIバディと一緒に進める、対話型面接サービス',
  description:
    'AIキャラクターと対話する面接サービスにおいて、候補者が安心して選考を進められるUX/UIとキャラクター体験を設計。',
};

const base = '/assets/persol/';

const sizes: Record<string, [number, number]> = {
  'hero-together.png': [1672, 941],
  'agent-directions.png': [3044, 1706],
  'agent-ui.png': [2822, 1780],
  'interview-selected.png': [1546, 1106],
  'device-check.png': [2940, 876],
  'notifications.png': [1946, 1408],
  'loading-states.png': [2052, 1750],
  'interview-states.png': [1948, 1930],
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
    <figure className={`persol-v2-photo ${className}`}>
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

export default function PersolV2() {
  return (
    <div className="persol-v2-case">
      <a className="skip" href="#overview">本文へ移動</a>

      <V2Header reserveSpace />

      <main>
        <section className="hero wrap persol-v2-hero" aria-labelledby="project-title">
          <figure className="persol-v2-hero-visual">
            <Image
              unoptimized
              src={`${base}hero-together.png`}
              alt="AIキャラクターMikaと、We're in this togetherのメッセージ"
              width={1672}
              height={941}
              priority
            />
          </figure>
          <PersolIntro />
        </section>

        <section className="wrap section-grid persol-v2-character" id="character">
          <Label n="01">CHARACTER INTERACTION</Label>
          <div>
            <p className="body-copy">
              AIキャラクターを単なる装飾や案内役ではなく、候補者と同じ目線に立ちながら、少し見守りたくなるパートナーとして捉えました。
            </p>
            <p className="body-copy">
              キャラクターの性格や振る舞いを損なわず、候補者が迷わず操作できるインタラクションを検討。サービスの世界観と、面接に必要な分かりやすさの両立を図りました。
            </p>
            <div className="persol-v2-pair">
              <Photo
                name="agent-directions.png"
                alt="AIキャラクターと候補者の関係性を比較した資料"
                caption="候補者とAIの関係性を複数の方向から検討。"
              />
              <Photo
                name="agent-ui.png"
                alt="AIキャラクターの振る舞いをUIへ展開した資料"
                caption="キャラクターの役割と振る舞いを具体的なUIへ展開。"
              />
            </div>
          </div>
        </section>

        <section className="persol-v2-accessibility" id="accessibility">
          <div className="wrap section-grid">
            <Label n="02">UI / ACCESSIBILITY</Label>
            <div>
              <p className="body-copy">
                AI面接では、接続や録画の失敗が選考結果への不安に直結します。そこで、現在地、マイク・カメラの状態、待ち時間、正常・エラー通知を整理し、配色、可読性、情報の強弱など、アクセシビリティの観点を含めてUIを検討しました。候補者が「いま何が起きているか」「次に何をすればよいか」を判断できる状態設計を目指しました。各状態に対して複数のUI案を制作し、それぞれの違いと判断理由を資料化したうえで、デザイナーとしてレビューの場で提案・説明しました。仕様が変化するなかでも継続的にレビューを重ね、フィードバックを受けて案を具体化しながら、それぞれの専門性を持ち寄り、チームで体験を設計しました。
              </p>
              <div className="persol-v2-ui-grid">
                <Photo
                  name="interview-selected.png"
                  alt="現在地と完了状態を示すAI面接画面"
                  caption="現在地と、完了した工程の情報の強弱を整理。"
                />
                <Photo
                  name="device-check.png"
                  alt="マイクとカメラの接続確認画面"
                  caption="面接前にマイク・カメラの状態を確認。"
                />
                <Photo
                  name="loading-states.png"
                  alt="接続待ち時間の複数のUI案"
                  caption="待ち時間にも状態と変化が伝わる表示を比較。"
                />
                <Photo
                  name="notifications.png"
                  alt="正常時とエラー時の通知UI案"
                  caption="正常・エラー状態を簡潔に伝える通知を検討。"
                />
              </div>
              <Photo
                name="interview-states.png"
                alt="複数のAI面接UI案を比較した資料"
                caption="各状態に対する選択肢と判断理由を資料化し、レビューで提案。"
                className="persol-v2-review"
              />
            </div>
          </div>
        </section>

        <ProjectNavV2 current="/v2/persol" />
      </main>

    </div>
  );
}
