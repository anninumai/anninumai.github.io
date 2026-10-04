import type { Metadata } from 'next';
import { ExperimentCaseV2 } from '../../experiment-case-v2';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: '雨粒時計 — 空を身近に感じられる、雨の時計',
  description: '雨粒が雲から地上へ届くまでの距離を時間として表したWebプロトタイプ。',
};

export default function RainClockV2() {
  return <ExperimentCaseV2
    current="/v2/rain-clock"
    title={<h1 id="project-title">雨粒時計</h1>}
    titleLabel="雨粒時計"
    subtitle="空を身近に感じられる、雨の時計"
    summary="雨粒が身体に触れたとき、遠くにある空が急に近く感じられた経験から、雨粒が雲から地上へ届くまでの距離を『時間』として表すWebプロトタイプを制作しました。"
    role={['Web', 'インタラクション', 'UI/UX']}
    period="2022.06"
    tools={['STUDIO']}
    team="個人制作"
    hero={{
      src: '/assets/rain-clock/hero-leaf.png',
      alt: '葉の上の水滴に白い円と水平線を重ねた雨粒時計のビジュアル',
      caption: '雨粒時計のために制作したビジュアル。',
    }}
    sections={[
      {
        label: '着眼点・体験',
        title: '目に見えない距離を、身体に届く時間へ。',
        paragraphs: ['雨粒が落ちる時間へ変換することで、普段は意識しない空との距離を、身体に関係するスケールとして捉え直しました。情報を読むのではなく、時間の経過を眺めながら距離を感じる体験を目指しています。'],
        figure: {
          src: '/assets/rain-clock/02.png',
          alt: '条件の説明を開いた雨粒時計の画面',
          caption: '制作時に設定した高さや表示条件を確認できる画面。',
        },
      },
    ]}
  />;
}
