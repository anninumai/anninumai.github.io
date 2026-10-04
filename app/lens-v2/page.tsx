import type { Metadata } from 'next';
import Image from 'next/image';
import { V2Header } from '../v2/v2-header';
import { ProjectNavV2 } from '../project-nav-v2';
import { ProjectIntroV2 } from '../project-intro-v2';
import '../lens/lens.css';
import './lens-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Lens ~ Memory Maker — 記憶提供サービス',
  description:
    '存在しない人生の記憶をデザインしてくれるサービス、Memory Maker。',
};

function Label({ children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

function LensImage({
  id,
  alt,
  caption,
  eager = false,
}: {
  id: string;
  alt: string;
  caption?: string;
  eager?: boolean;
}) {
  const dimensions: Record<string, { width: number; height: number }> = {
    '1': { width: 2048, height: 576 },
    '2': { width: 7680, height: 4320 },
    '4': { width: 2048, height: 1152 },
  };
  const { width, height } = dimensions[id];

  return (
    <figure className="lens-v2-image">
      <a
        href={`/assets/lens/${id}.png`}
        target="_blank"
        rel="noreferrer"
        aria-label={`${alt}を拡大`}
      >
        <Image
          src={`/assets/lens/${id}.png`}
          alt={alt}
          width={width}
          height={height}
          priority={eager}
        />
      </a>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export default function LensV2() {
  return (
    <div className="lens-v2-case">
      <a className="skip" href="#overview">
        本文へ移動
      </a>

      <V2Header reserveSpace />

      <main>
        <section className="hero wrap lens-v2-hero" aria-labelledby="project-title">
          <LensImage
            id="2"
            alt="Lensの提案資料。生成された情景と、その体験に近づく行動を表示する画面"
            eager
          />
          <ProjectIntroV2
            title={<h1 id="project-title">Lens~<strong>Memory Maker</strong></h1>}
            subtitle="存在しない人生の記憶をデザインしてくれるサービス"
            summary="存在しない人生の情景を、写真と日記によって本人の記憶として成立させるサービスプロトタイプ。生成された情景だけでなく、届くまでの時間、選ぶ操作、アルバムへの蓄積まで、記憶が自分のものとして受け取られる前後の体験を設計しました。"
            role={['サービスデザイン', 'UX/UI', '生成AI', 'プロトタイプ']}
            periodLabel="採択プログラム"
            period="QWSチャレンジ第22期"
            tools={['Figma', 'Claude Code', 'Generative Image', 'Prototype']}
            team="Project Lens"
            credits={[
              { label: 'プロジェクト', value: 'Project Lens' },
              { label: 'リサーチ・コンセプト・体験設計', value: 'Aino Kishimoto' },
              { label: '採択プログラム', value: 'QWSチャレンジ第22期' },
            ]}
          />
        </section>

        <section className="wrap section-grid lens-v2-background" id="background">
          <Label n="02">BACKGROUND</Label>
          <div>
            <p className="lens-v2-kicker">WHY MEMORY, WHY NOW</p>
            <p className="body-copy">
              デジタル上では大量の情報に触れられる一方、画面の中の情報が切り替わっても、自分がいる場所や身体は変わりません。そのため、異なる環境に身を置いたときのように感覚が揺さぶられ、普段とは違う自分が引き出される実感は生まれにくい。自分の感覚に向き合うことは、自分自身や身の回りの世界を新鮮に捉え直すきっかけになります。
            </p>
            <p className="lens-v2-background-bridge">
              そこでLensは、まだ存在しない人生を情報として説明するのではなく、その場の空気や感情まで想像できる「記憶」として届けることで、自分自身の可能性を実感を伴って感じられないか、という問いから始まりました。
            </p>
          </div>
        </section>

        <section className="wrap section-grid lens-v2-mechanism" id="mechanism">
          <Label n="03">INTERFACE</Label>
          <div>
            <p className="lens-v2-kicker">HOW THE MEMORY IS FORMED</p>
            <p className="body-copy lens-v2-section-intro">
              生成された情景の記憶としての実在感を高め、自分自身の経験として知覚させるために、インターフェースには二つの仕組みを用いています。
            </p>

            <ol className="lens-v2-principles">
              <li>
                <span>01</span>
                <h3>写真アルバムのメンタルモデル</h3>
                <p>
                  写真アルバムの経験した出来事を記憶として残すメンタルモデルによって、提示された情景をすでに起きた「自分の記録」として受け取らせる。
                </p>
              </li>
              <li>
                <span>02</span>
                <h3>描かれていない物語の補完</h3>
                <p>
                  断片的な写真と日記から、描かれていない前後の出来事を本人に想像させる。
                </p>
              </li>
            </ol>

            <p className="lens-v2-statement">
              本人が余白を補完することで、自分だけの記憶として情景を立ち上げる設計です。
            </p>

            <LensImage
              id="1"
              alt="Lensの写真日記、アルバム、行動提案のUI"
              caption="写真日記・アルバム・行動提案のUI。生成された情景を選び、記憶として蓄積する。"
            />

            <aside className="lens-v2-inspiration">
              <span className="eyebrow">INSPIRATION</span>
              <p>
                『カイバ』に描かれる、記憶をデータとして保存し、売買できる世界観に着想を得ています。作中では、記憶は円錐形のデータチップに保存され、頭部に差し込むことで、その人の記憶として働きます。Lensでは、外部から与えられた情景が自分の記憶として働くという仕組みを、まだ選んでいない人生の記憶を生成し、受け取る体験へ置き換えました。
              </p>
              <a
                href="https://www.bunka.go.jp/j-mediaarts-festival/award/single/kaiba/index.html"
                target="_blank"
                rel="noreferrer"
              >
                『カイバ』作品情報 ↗
              </a>
            </aside>
          </div>
        </section>

        <section className="lens-v2-role-section" id="role">
          <div className="wrap section-grid">
            <Label n="04">MY ROLE</Label>
            <div>
              <p className="lens-v2-kicker">FROM QUESTION TO EXPERIENCE</p>
              <p className="body-copy">
                問題設定、先行研究、コンセプト立案から、体験設計、UI・UX、CI・VI、プロトタイプ制作、探索的なユーザー確認までを一貫して担当しました。
              </p>
              <p className="body-copy">
                生成画像だけでなく、写真日記が届くまでの時間、情景を選ぶ操作、アルバムへの蓄積まで、記憶が生成され、自分のものとして受け取られる前後の体験を設計しました。
              </p>
            </div>
          </div>
        </section>

        <section className="wrap section-grid lens-v2-outcome" id="outcome">
          <Label n="05">OUTCOME / NEXT</Label>
          <div>
            <p className="lens-v2-kicker">PROTOTYPE 01–02 / APPROX. 10 PEOPLE</p>
            <p className="body-copy">
              QWSチャレンジ第22期に採択され、二つのプロトタイプを制作。約10人に試作を体験してもらい、専門家からもフィードバックを得ました。
            </p>

            <LensImage
              id="4"
              alt="QWSチャレンジ期間に行った二つのプロトタイプとフィードバックの記録"
              caption="QWSチャレンジ期間の活動。Prototype 01・02の制作と、専門家からのフィードバック。"
            />

            <div className="lens-v2-finding">
              <span className="eyebrow">FINDING / LIMITATION</span>
              <p>
                画像だけでは自分の記憶として受け取りにくいという反応から、本作が実際に記憶を形成し、さらに行動を変化させたことは検証できていません。しかし、自分であり自分でないというずれによって現在の自分から少し距離を取り、別の可能性を客観視できる可能性を発見できました。
              </p>
            </div>

            <blockquote className="lens-v2-next">
              <span className="eyebrow">POSSIBLE APPLICATION</span>
              <p>
                このプロトタイプは、例えば、長く続く親密な関係のなかで、自分や相手に対する固定された像から距離を取り、互いの変化や可能性を捉え直す体験へ応用できるのではないかと考えています。
              </p>
            </blockquote>
          </div>
        </section>

        <ProjectNavV2 current="/v2/lens" />
      </main>

    </div>
  );
}
