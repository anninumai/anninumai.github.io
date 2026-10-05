import type { Metadata } from 'next';
import { ExperimentCaseV2 } from '../../experiment-case-v2';
import './koho-tokyo.css';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: '広報東京都 2023年9月号 — 表紙企画・デザイン',
  description: '「広報東京都」2023年9月号の表紙企画・デザイン。企画からラフ制作、ビジュアルデザインまでを紹介します。',
};

export default function KohoTokyoV2() {
  return <ExperimentCaseV2
    className="koho-tokyo-v2-case"
    current="/v2/koho-tokyo"
    title={<h1 id="project-title">広報東京都 <em>2023.09</em></h1>}
    titleLabel="広報東京都 2023年9月号"
    subtitle="「ブルーピリオド」とともに、東京のアートへ。"
    summary="「広報東京都」2023年9月号の表紙企画・デザインを、STUDIO HOLIDAYのチームで担当しました。『ブルーピリオド』の絵と東京のアートを重ね、企画からラフ制作、表紙のビジュアルデザインまで携わりました。"
    role={['企画', 'ラフ制作', 'ビジュアルデザイン']}
    period="2023.06–08"
    tools={['Figma', 'Illustrator', 'Photoshop']}
    team="STUDIO HOLIDAY"
    hero={{
      src: '/assets/koho-tokyo/cover.webp',
      alt: 'ブルーピリオドの絵を額縁と重ねた「広報東京都」2023年9月号の表紙',
      caption: '「広報東京都」2023年9月号の表紙。',
    }}
    sections={[
      {
        label: 'CONCEPT / ROUGH',
        paragraphs: ['原画を額縁に収め、アート作品が並ぶ空間に入り込むような表紙を構想しました。鑑賞する視点や絵の配置をラフで検討しています。'],
        figure: {
          src: '/assets/koho-tokyo/rough-02.webp',
          alt: '鑑賞者の視点を探った手描きのラフと表紙構成案',
          caption: '構図と見せ方を検討したラフ。',
        },
      },
      {
        label: 'VISUAL DESIGN',
        paragraphs: ['複数の原画と主人公を重ね、アートの世界に誘う表紙ビジュアルにまとめました。'],
        figure: {
          src: '/assets/koho-tokyo/presentation.webp',
          alt: '広報東京都2023年9月号の表紙と誌面を見せた完成イメージ',
          caption: '完成した表紙の展開。',
        },
      },
    ]}
  />;
}
