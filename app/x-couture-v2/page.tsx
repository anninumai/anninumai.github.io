import type { Metadata } from 'next';
import Image from 'next/image';
import { V2Header } from '../v2/v2-header';
import type { ReactNode } from 'react';
import { ProjectNavV2 } from '../project-nav-v2';
import { ProjectIntroV2 } from '../project-intro-v2';
import './x-couture-v2.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'X couture — デジタルとフィジカルを横断し、ファッションの新しい可能性をひらくプロジェクト',
  description:
    '約10人のCGインターンチームのPMとして、制作体制をゼロから構築し、二つのデジタルファッション制作を進行。',
};

const sizes: Record<string, [number, number]> = {
  '/assets/runway.png': [2226, 1260],
  '/assets/blender.png': [2260, 1222],
  '/assets/compositing.png': [2258, 1244],
  '/assets/team-management.png': [3346, 1966],
  '/assets/team-management-detail.png': [2103, 1063],
  '/assets/technical-report-detail.png': [2140, 605],
  '/assets/knowledge.png': [1200, 1230],
  '/assets/fashion-week-team.png': [1986, 1478],
};

function Label({ children }: { n: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span>{children}</span>
    </div>
  );
}

function Photo({
  src,
  alt,
  caption,
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  const [width, height] = sizes[src];
  return (
    <figure className={`x-v2-photo ${className}`}>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`${alt}を拡大`}>
        <Image
          unoptimized
          src={src}
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

export default function XCoutureV2() {
  return (
    <div className="x-v2-case">
      <a className="skip" href="#overview">本文へ移動</a>

      <V2Header reserveSpace />

      <main>
        <section className="hero wrap x-v2-hero" aria-labelledby="project-title">
          <Photo
            src="/assets/runway.png"
            alt="赤い照明と映像のなかをモデルが歩くyoshiokuboのショー"
            priority
            className="x-v2-hero-photo"
          />
          <ProjectIntroV2
            title={<h1 id="project-title">X <em>couture</em></h1>}
            subtitle="デジタルとフィジカルを横断し、ファッションの新しい可能性をひらくプロジェクト"
            summary="購入者の写真へ3Dドレスを合成するデジタルファッション制作。Rakuten Fashion Week TOKYO 2022 A/Wに向けたyoshiokuboとのプロジェクトを含む、二つの実制作を約3〜4カ月、約10人のチームで進行しました。"
            role={['デジタルファッション', '3DCG', 'チームビルディング']}
            period="2021.11–2022.02"
            tools={['Notion', 'Blender', 'Photoshop']}
            team="X couture・CGインターンチーム"
            credits={[
              { label: 'プロジェクト', value: 'X couture' },
              { label: 'ファッション協業', value: 'yoshiokubo' },
              { label: 'チーム', value: 'CGインターンチーム・約10名' },
              { label: 'CGインターンチームPM', value: 'Aino Kishimoto' },
            ]}
          />
        </section>
        <section className="wrap section-grid x-v2-collaboration" id="collaboration">
          <Label n="01">COLLABORATION</Label>
          <div>
            <p className="body-copy">
              CGは、当時の私にとって未知の技術領域でした。分からないことを曖昧にしたまま進めるのではなく、プロジェクトマネジメントに加えて自分も制作へ参加し、知らない技術でも面白がって学びながら、メンバーとの対話に必要な共通言語を獲得しました。得た知識を共有し、専門の異なるメンバー同士をつなぐことで、PMがすべてを理解して指示するのではなく、互いの分からなさや困りごとを共有し、それぞれの得意を持ち寄って目標へ進めるチームを目指しました。
            </p>
            <div className="x-v2-production-pair">
              <Photo
                src="/assets/blender.png"
                alt="Blenderで写真に合わせてデジタルドレスを調整する制作工程"
                caption="3DCGによるドレスの調整。"
              />
              <Photo
                src="/assets/compositing.png"
                alt="Photoshopで人物写真とデジタルドレスを合成する制作工程"
                caption="人物写真と3Dドレスの合成。"
              />
            </div>
            <div className="x-v2-learning-pair">
              <Photo
                src="/assets/technical-report-detail.png"
                alt="3DCGと画像合成の作業内容と課題を記録した活動報告"
                caption="自分も制作へ参加し、作業内容と課題を共有。"
              />
              <Photo
                src="/assets/knowledge.png"
                alt="CG基礎や衣服モデリングの学習資料を集約した技術ラボ"
                caption="制作で得た知識を、チームで再利用できる形へ。"
              />
            </div>
          </div>
        </section>

        <section className="x-v2-system" id="system">
          <div className="wrap section-grid">
            <Label n="02">TEAM SYSTEM / OWNERSHIP</Label>
            <div>
              <p className="body-copy">
                CGインターン約10人のPMを一人で担当し、メンバーをグループに分け、各グループにリーダーを置く進行体制を考案しました。会議、情報共有、課題をエスカレーションする方法を設計するとともに、一人ひとりの進捗、余力、困りごとを把握し、作業量や得意分野に応じて分担を調整しました。制作体制が整っていない状態から、チームで判断しながら進められる仕組みを構築しました。
              </p>
              <Photo
                src="/assets/team-management.png"
                alt="情報共有と作業ルール、メンバー編成、面談・技術レビューの予定をまとめたNotionの全体画面"
                caption="Notionに情報共有のルールと、面談・技術レビューの流れを集約。"
                className="x-v2-management"
              />
              <Photo
                src="/assets/team-management-detail.png"
                alt="CGインターン約10人の編成と予定を整理した管理表"
                caption="チーム編成、面談、技術レビューを一つの管理表で共有。"
                className="x-v2-management"
              />
            </div>
          </div>
        </section>

        <section className="wrap section-grid x-v2-outcome" id="outcome">
          <Label n="03">MY ROLE / OUTCOME</Label>
          <div>
            <p className="body-copy">
              構築した制作体制によって、約3〜4カ月にわたる二つのデジタルファッション制作を進行。うち一つを、Rakuten Fashion Week TOKYO 2022 A/Wに向けたyoshiokuboとの実制作として完成させました。
            </p>
            <figure className="x-v2-runway-film">
              <iframe
                src="https://www.youtube-nocookie.com/embed/PF7KoWcs-2U?start=23"
                title="yoshiokubo 2022 A/W Collection | Rakuten Fashion Week TOKYO 2022 A/W"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <figcaption>
                yoshiokubo 2022 A/W Collectionのショー映像。
                <a href="https://www.youtube.com/watch?v=PF7KoWcs-2U&t=23s" target="_blank" rel="noreferrer">YouTubeで見る ↗</a>
              </figcaption>
            </figure>
            <Photo
              src="/assets/fashion-week-team.png"
              alt="Rakuten Fashion Week TOKYOでのチーム集合写真"
              caption="Rakuten Fashion Week TOKYO 2022 A/Wでのチーム。"
              className="x-v2-team-photo"
            />
          </div>
        </section>

        <ProjectNavV2 current="/v2/x-couture" />
      </main>

    </div>
  );
}
