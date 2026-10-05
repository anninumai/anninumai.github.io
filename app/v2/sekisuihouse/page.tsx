import type { Metadata } from 'next';
import Image from 'next/image';
import { ExperimentCaseV2 } from '../../experiment-case-v2';
import './sekisuihouse.css';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: '積水ハウス — イノベーション施設 キービジュアル提案',
  description: '積水ハウスとAddrecによるイノベーション施設のキービジュアル提案。異なる色や形が有機的に重なり合う3Dビジュアル。',
};

const studies = [
  { file: 'sketch-01', height: 1100, alt: '異なる色と有機的な形を持つパーツの検討', caption: '個々の形の検討。' },
  { file: 'sketch-02', height: 1113, alt: '色と形の異なるパーツが集まり、一つの立体になるラフ', caption: 'パーツがつながる立体構成。' },
  { file: 'sketch-03', height: 1134, alt: '同じ立体を異なる角度から見た構成の比較', caption: '視点と奥行きの検討。' },
  { file: 'sketch-04', height: 1266, alt: 'キービジュアルの動きとWebページへの展開を検討したラフ', caption: 'アニメーションとWebへの展開案。' },
  { file: 'visual-study', height: 1058, alt: '多彩な有機的パーツを立体的に重ねたビジュアルの検討案', caption: 'コンセプトをもとにしたビジュアルの調整。' },
];

export default function SekisuiHouseV2() {
  return <ExperimentCaseV2
    className="sekisui-v2-case"
    current="/v2/sekisuihouse"
    title={<h1 id="project-title">積水ハウス</h1>}
    titleLabel="積水ハウス イノベーション施設 キービジュアル提案"
    subtitle="イノベーション施設 キービジュアル提案"
    summary="積水ハウスとAddrecによる、「暮らしと住まい」をテーマとしたイノベーション施設のキービジュアル提案において、3Dビジュアルとアニメーションを担当しました。"
    role={['コンセプト設計', '3Dグラフィック', 'アニメーション']}
    period="2024.12"
    tools={['Blender']}
    team="STUDIO HOLIDAY"
    credits={[
      { label: 'Art Direction', value: 'Mayu Ishikawa' },
      { label: 'Concept / 3D / Animation Design', value: 'Aino Kishimoto' },
    ]}
    hero={{
      src: '/assets/sekisuihouse/hero.webp',
      alt: '異なる色と有機的な形が奥行きのある空間に重なる3Dキービジュアル',
      caption: 'キービジュアル提案。',
    }}
    sections={[
      {
        label: 'CONCEPT',
        paragraphs: ['異なる個性がつながり、知恵が広がっていく様子を、異なる色や形が有機的に重なり合う表現として提案しました。立体的な配置と空間の奥行きを用い、個々のつながりが広がっていく様子を視覚化しています。'],
        gallery: (
          <div className="sekisui-v2-studies" aria-label="キービジュアルのラフ案">
            {studies.map((study) => (
              <figure key={study.file}>
                <a href={`/assets/sekisuihouse/${study.file}.webp`} target="_blank" rel="noreferrer" aria-label={`${study.alt}を拡大`}>
                  <Image unoptimized src={`/assets/sekisuihouse/${study.file}.webp`} alt={study.alt} width={1920} height={study.height} loading="lazy" />
                </a>
                <figcaption>{study.caption}</figcaption>
              </figure>
            ))}
          </div>
        ),
      },
    ]}
  />;
}
