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
  'hero-together.webp': [1672, 941],
  'agent-directions.webp': [3044, 1706],
  'agent-ui.webp': [2822, 1780],
  'interview-selected.webp': [1546, 1106],
  'device-check.webp': [2940, 876],
  'notifications.webp': [1946, 1408],
  'loading-states.webp': [2052, 1750],
  'interview-states.webp': [1948, 1930],
  'brand-system.webp': [3140, 1006],
  'color-rationale.webp': [1772, 1362],
  'future-network.webp': [1168, 1388],
  'future-career-park.webp': [1108, 1394],
  'interviewer-hypotheses.webp': [1918, 1008],
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
              src={`${base}hero-together.webp`}
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
              候補者と同じ目線に立ちながら、少し見守りたくなるパートナーであり、キャラクターの性格や振る舞いを損なわず、候補者が迷わず操作できるインターフェースやインタラクションを検討
            </p>
            <div className="persol-v2-pair">
              <Photo
                name="agent-directions.webp"
                alt="AIキャラクターと候補者の関係性を比較した資料"
                caption="候補者とAIの関係性を複数の方向から検討。"
              />
              <Photo
                name="agent-ui.webp"
                alt="AIキャラクターの振る舞いをUIへ展開した資料"
                caption="キャラクターの役割と振る舞いを具体的なUIへ展開。"
              />
            </div>
            <figure className="persol-v2-film">
              {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- The supplied source has no caption track. */}
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={`${base}hero-together.webp`}
                aria-label="WITTOのコンセプトムービー"
              >
                <source src={`${base}character-interaction.mp4`} type="video/mp4" />
                お使いのブラウザーでは動画を再生できません。
              </video>
              <figcaption>WITTOのコンセプトムービー。</figcaption>
            </figure>
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
                  name="interview-selected.webp"
                  alt="現在地と完了状態を示すAI面接画面"
                  caption="現在地と、完了した工程の情報の強弱を整理。"
                />
                <Photo
                  name="device-check.webp"
                  alt="マイクとカメラの接続確認画面"
                  caption="面接前にマイク・カメラの状態を確認。"
                />
                <Photo
                  name="loading-states.webp"
                  alt="接続待ち時間の複数のUI案"
                  caption="待ち時間にも状態と変化が伝わる表示を比較。"
                />
                <Photo
                  name="notifications.webp"
                  alt="正常時とエラー時の通知UI案"
                  caption="正常・エラー状態を簡潔に伝える通知を検討。"
                />
              </div>
              <Photo
                name="brand-system.webp"
                alt="WITTOのネーミング、カラー、書体、ロゴ、UI、AIキャラクターを整理したFigmaのデザインルール"
                caption="Figmaで整理したネーミング、カラー、書体、ロゴ、UIとキャラクターのデザインルール。"
                className="persol-v2-design-reference"
              />
              <Photo
                name="color-rationale.webp"
                alt="複数の配色案と選定理由を比較したトンマナ検討資料"
                caption="配色の候補を比較し、目指すトンマナと選定理由を整理。"
                className="persol-v2-design-reference"
              />
              <Photo
                name="interview-states.webp"
                alt="複数のAI面接UI案を比較した資料"
                caption="各状態に対する選択肢と判断理由を資料化し、レビューで提案。"
                className="persol-v2-review"
              />
            </div>
          </div>
        </section>

        <section className="wrap section-grid persol-v2-additional" id="additional-proposals">
          <Label n="03">FUTURE VISION / AVATAR RESEARCH</Label>
          <div>
            <p className="body-copy">
              将来の体験設計として、AIが自律的な代理人として発展した場合を想定し、タレント・ディスカバリー・ネットワークやAIエージェントによる転職フェアのコンセプトを構想。
            </p>
            <p className="body-copy">
              AIアバターの外見と振る舞いについて論文や事例調査も行いました。
            </p>
            <p className="body-copy">
              こうした検討は、現在の<a href="https://openai.com/index/introducing-dots/" target="_blank" rel="noopener noreferrer">OpenAIのdots</a>や<a href="https://x.ai/bot" target="_blank" rel="noopener noreferrer">xAIのGrok Bot</a>に見られる、文脈を理解し、自律的に動くAIの方向性とも重なると考えています。人がAIとどんな距離感で関わり、何を任せられるのか。目の前の使いやすさだけでなく、その先の関係性まで視野に入れた取り組みとなりました。
            </p>
            <div className="persol-v2-proposal-pair">
              <Photo
                name="future-network.webp"
                alt="自律型タレント・ディスカバリー・ネットワークのコンセプト資料"
                caption="将来の体験案：自律型タレント・ディスカバリー・ネットワーク。"
              />
              <Photo
                name="future-career-park.webp"
                alt="AIエージェントによる転職フェアのコンセプト資料"
                caption="将来の体験案：AIエージェントによる転職フェア。"
              />
            </div>
            <Photo
              name="interviewer-hypotheses.webp"
              alt="人間型、ロボット型、抽象型のAI面接官を比較した仮説資料"
              caption="アバター表現の3つの方向性を比較。"
              className="persol-v2-research-evidence"
            />
          </div>
        </section>

        <ProjectNavV2 current="/v2/persol" />
      </main>

    </div>
  );
}
