import type { Metadata } from 'next';
import Image from 'next/image';
import { ExperimentCaseV2 } from '../../experiment-case-v2';
import './summer.css';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: '夏の存在証明 — 自分だけの夏の音を、いつでも、どこでも。',
  description: '夏を想起させる音を選び、重ね、組み合わせることで、自分の夏をつくる体験。',
};

export default function SummerV2() {
  return <ExperimentCaseV2
    className="summer-v2-case"
    current="/v2/summer"
    title={<h1 id="project-title">夏の存在証明</h1>}
    titleLabel="夏の存在証明"
    subtitle="自分だけの夏の音を、いつでも、どこでも。"
    summary="夏を想起させる音を自分で選び、重ね、組み合わせて聴くことで、用意された『夏』を鑑賞するのではなく、一人ひとりが自分の夏の存在感をつくる体験を設計しました。"
    role={['サウンド', 'インタラクション', 'UX/UI']}
    period="2025.08"
    tools={['Figma', 'Claude Code']}
    team="2名共同制作"
    credits={[
      { label: 'アイデア・UI/UXデザイン', value: 'Aino Kishimoto' },
      { label: '実装', value: 'Shuhey Koyama' },
    ]}
    hero={{
      src: '/assets/summer/interaction.webp',
      alt: '青空と雲を背景に音の操作画面を表示したタブレット',
      caption: '夏の存在証明 — タブレットでの展示。',
    }}
    sections={[
      {
        label: '着眼点・体験',
        paragraphs: ['夏には決まった形がありません。それでも音を聴くと、光、温度、場所、過去の記憶まで思い浮かぶことがあります。音を選ぶ、重ねる、組み合わせて聴くという操作によって、鑑賞者自身の記憶から夏が立ち上がるインタラクションを構想しました。'],
        gallery: <div className="summer-v2-gallery" aria-label="夏の存在証明の展示写真">
          <Image unoptimized src="/assets/summer/exhibition.webp" alt="夏の存在証明を展示したタブレットと作品紹介" width={1920} height={1747} loading="lazy" />
          <Image unoptimized src="/assets/summer/visitors.webp" alt="展示会場で夏の存在証明を体験する来場者" width={1920} height={1464} loading="lazy" />
        </div>,
      },
    ]}
  />;
}
