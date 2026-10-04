import type { Metadata } from 'next';
import { ExperimentCaseV2 } from '../../experiment-case-v2';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Ryusei Wave — 星にも、魚の群れにも見える波',
  description: '点の集まりと曖昧な動きによって、見る人の知覚が像を補完する映像作品。',
};

export default function RyuseiWaveV2() {
  return <ExperimentCaseV2
    current="/v2/ryusei-wave"
    title={<h1 id="project-title">Ryusei <em>Wave</em></h1>}
    titleLabel="Ryusei Wave"
    subtitle="星にも、魚の群れにも見える波。"
    summary="点の集まりが形を変え続けることで、空の星にも、海を泳ぐ魚の群れにも見える映像を制作しました。具体的な形を描き切らず、動きと配置に曖昧さを残すことで、見る人の知覚が像を補完する表現を探りました。"
    role={['ジェネラティブグラフィックス', 'クリエイティブコーディング', '映像']}
    period="2025.08"
    tools={['p5.js', 'ChatGPT', 'Visual Studio Code']}
    team="個人制作"
    hero={{
      src: '/assets/ryusei-wave/exhibition-original.png',
      alt: '夜の二子玉川ライズに設置された3連LEDキューブの映像展示',
      caption: 'Ryusei Wave — 二子玉川ライズでの展示風景。',
    }}
    sections={[
      {
        label: '着眼点・表現',
        paragraphs: ['点の配置と動きに曖昧さを残し、星空と魚群のどちらにも見える状態をつくりました。見る人の経験や注意によって像が変化する、視覚的な補完そのものを表現として扱っています。'],
        figure: {
          src: '/assets/ryusei-wave/work.png',
          alt: '昼夜の3連LEDキューブと映像の展示記録',
          caption: 'p5.jsで映像を実装し、3連LEDキューブへ展開。',
        },
      },
      {
        label: '展示',
        paragraphs: ['2025年8月、二子玉川ライズの3連LEDキューブで展示しました。異なる面と距離から見ても一つの運動として感じられるよう、複数画面へ映像を展開しました。'],
      },
    ]}
  />;
}
