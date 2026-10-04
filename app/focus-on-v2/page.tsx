import type { Metadata } from 'next';
import Image from 'next/image';
import { V2Header } from '../v2/v2-header';
import type { ReactNode } from 'react';
import { ProjectNavV2 } from '../project-nav-v2';
import { ProjectIntroV2 } from '../project-intro-v2';
import './focus-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Focus on — 名前がない感情を伝え、受け止めてもらう体験',
  description:
    '疲れにまだ名前がなくても、伝え、受け止めてもらえる。Focus onのUX/UI・キャラクター体験設計。',
};

const base = '/assets/focus-on/';

function Label({ children }: { n: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

function ProjectImage({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`focus-v2-figure ${className}`}>
      <a href={`${base}${src}`} target="_blank" rel="noreferrer" aria-label={`${alt}を拡大`}>
        <Image
          src={`${base}${src}`}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
        />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export default function FocusOnV2() {
  return (
    <div className="focus-v2-case">
      <a className="skip" href="#overview">
        本文へ移動
      </a>

      <V2Header reserveSpace />

      <main>
        <section className="hero wrap focus-v2-hero" aria-labelledby="project-title">
          <ProjectImage
            src="hero-onomatopoeia.png"
            alt="Focus onのキャラクターと、疲れの記録・振り返り・共有画面"
            width={1676}
            height={939}
            priority
            className="focus-v2-hero-image"
          />
          <ProjectIntroV2
            title={<h1 id="project-title">Focus <em>on</em></h1>}
            subtitle="名前がない感情でも、伝え、受け止めてもらえる感覚共有アプリ"
            summary="言葉にしにくい疲れを記録し、信頼できる相手へ共有するアプリのUX/UIとキャラクター体験を設計しました。既存ユーザーへのヒアリングと論文調査から、曖昧な身体感覚と説明の間をつなぐオノマトペや、投稿を受け止めるキャラクター「Focusくん」を提案しました。"
            role={['UX/UI', 'キャラクターデザイン', 'リサーチ']}
            period="2023.06–12"
            tools={['Figma', 'Illustrator', 'Prototype']}
            team="Focus on チーム"
            credits={[
              { label: '企画・事業', value: 'Focus on チーム' },
              { label: 'UX/UI・キャラクター体験', value: 'Aino Kishimoto' },
              { label: '実装', value: 'Focus on 開発チーム' },
            ]}
          />
        </section>

        <section className="wrap section-grid focus-v2-insight" id="insight">
          <Label n="02">INSIGHT / INPUT</Label>
          <div>
            <p className="focus-v2-kicker">A LANGUAGE BEFORE EXPLANATION</p>
            <h2>オノマトペを、身体感覚と説明をつなぐ「中間言語」に。</h2>
            <p className="body-copy">
              疲れていても、自分の状態を「疲れ」「悲しみ」「怒り」といった決まった感情名へ当てはめられるとは限りません。一方、文章で詳しく説明することも、疲れているときには負担になります。
            </p>
            <p className="body-copy">
              そこで、「ずーん」「もやもや」「むかむか」のようなオノマトペを、曖昧な身体感覚と、他者へ説明する言葉の間にある「中間言語」として活用しました。正確な言葉を探す前でも、そのときの感覚に近い表現を選ぶことから、記録と共有を始められる設計です。
            </p>
            <div className="focus-v2-input-showcase">
              <ProjectImage
                src="onomatopoeia.png"
                alt="その時の気持ちに近いオノマトペを選択する画面"
                caption="説明を組み立てる前に、感覚に近いオノマトペを選ぶ。"
                width={2225}
                height={2400}
              />
              <div className="focus-v2-input-note">
                <span className="eyebrow">DESIGN INTENTION</span>
                <p>
                  正しい感情名を答えることではなく、言葉になる前の状態から入力を始められることを優先しました。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="focus-v2-character" id="character">
          <div className="wrap section-grid">
            <Label n="03">CHARACTER</Label>
            <div>
              <p className="focus-v2-kicker">A FLEXIBLE, UNHURRIED COMPANION</p>
              <h2>何者にでもなれる、自由気ままなFocusくん。</h2>
              <p className="body-copy">
                Focusくんは、決まった姿や役割に縛られず、さまざまな存在へ変化できるキャラクターとして考案しました。着想のひとつは、メタモンの「何者にでもなれる可変性」と、ゴンベの「自由気ままでマイペースな佇まい」です。
              </p>
              <p className="body-copy">
                ユーザーを管理したり、回復へ急かしたりするのではなく、自分のペースで旅をしながら、ときどき投稿に反応する。ユーザーが自分の感情や状態を重ねられる余白と、健康管理サービスの緊張感を和らげる親しみやすさの両立を目指しました。
              </p>
              <p className="focus-v2-character-statement">
                投稿を受け止めるインターフェースであると同時に、サービスとの継続的な関係をつくるブランドキャラクターとして設計。
              </p>
              <div className="focus-v2-character-visual">
                <Image
                  src={`${base}hero-onomatopoeia.png`}
                  alt="形を変えながらユーザーに寄り添うFocusくん"
                  fill
                  sizes="(max-width: 760px) 100vw, 70vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="wrap section-grid focus-v2-experience" id="experience">
          <Label n="04">EXPERIENCE</Label>
          <div>
            <p className="focus-v2-kicker">PRIORITY A</p>
            <h2>「伝えられた・受け止めてもらえた」と実感できること。</h2>
            <p className="body-copy">
              調査から、疲れに気づくことや言語化することだけでなく、誰かに伝えること、共有後の反応を待つことにも負担があると整理。入力から共有後の反応までを、一続きの体験として設計しました。
            </p>
            <div className="focus-v2-ux-scope">
              <span className="eyebrow">MY SCOPE / UX・UI</span>
              <p>
                Focus onのUX/UI設計を一貫して担当しました。調査から得た課題をもとに、入力、振り返り、共有相手の選択、投稿、共有後の反応までの体験を設計。カスタマージャーニー、サイトマップ、画面遷移、情報設計、UIデザイン、プロトタイプまでを制作しました。
              </p>
            </div>
            <p className="focus-v2-priority-note">
              調査結果をもとに代表と機能の優先順位を検討。「伝えられた・受け止めてもらえた」という実感につながる体験を優先度Aとし、短い記録・投稿・共有を支える機能群を実装へ接続しました。
            </p>
            <ProjectImage
              src="sharing-insight.png"
              alt="投稿から共有、支援者からの反応までの画面"
              caption="投稿、共有範囲の選択、共有後の反応までを一続きに設計。"
              width={2400}
              height={1350}
            />
          </div>
        </section>

        <section className="wrap section-grid focus-v2-outcome" id="outcome">
          <Label n="05">OUTCOME / STATUS</Label>
          <div>
            <aside className="focus-v2-award">
              <p>
                「発達障害児者支援アプリFocus on」の事業プランとして、チームで第24回キャンパスベンチャーグランプリ大阪の<strong>最優秀賞</strong>を受賞しました。
              </p>
              <a
                href="https://cvg.nikkan.co.jp/osaka/oosaka_backnumber_2022"
                target="_blank"
                rel="noreferrer"
              >
                受賞情報を見る ↗
              </a>
            </aside>
          </div>
        </section>

        <ProjectNavV2 current="/v2/focus-on" />
      </main>

    </div>
  );
}
