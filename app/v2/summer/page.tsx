import type { Metadata } from 'next';
import { ExperimentCaseV2 } from '../../experiment-case-v2';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: '夏の存在証明 — 自分だけの夏の音を、いつでも、どこでも。',
  description: '夏を想起させる音を選び、重ね、組み合わせることで、自分の夏をつくる体験。',
};

export default function SummerV2() {
  return <ExperimentCaseV2
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
      src: '/assets/summer/screen.png',
      alt: '青空と雲を背景に音の操作画面を表示したタブレット',
      caption: '夏の存在証明 — タブレットでの展示。',
    }}
    sections={[
      {
        label: '着眼点・体験',
        title: '音の組み合わせから、一人ひとりの夏をつくる。',
        paragraphs: ['夏には決まった形がありません。それでも音を聴くと、光、温度、場所、過去の記憶まで思い浮かぶことがあります。音を選ぶ、重ねる、組み合わせて聴くという操作によって、鑑賞者自身の記憶から夏が立ち上がるインタラクションを構想しました。'],
        figure: {
          src: '/assets/summer/screen.png',
          alt: 'タブレット上で夏を想起させる音を組み合わせる操作画面',
          caption: '画面を操作し、複数の音を組み合わせて聴く。',
        },
      },
    ]}
  />;
}
