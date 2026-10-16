'use client';

import { useState } from 'react';
import { ToolList } from '../tool-list';

const creditGroups = [
  {
    title: '制作体制',
    entries: [
      { role: 'Client', names: ['PERSOL Career'] },
      { role: 'Creative Direction', names: ['STUDIO HOLIDAY / 堀内'] },
    ],
  },
  {
    title: 'Dawn / Polaris',
    entries: [
      { role: 'UX/UI Design', names: ['今村'] },
      { role: 'UX/UI Design Lead — Dawn内の面接画面〈TS〉', names: ['Aino Kishimoto'] },
      { role: 'UX/UI Design Support & Experience Proposals', names: ['Aino Kishimoto'] },
      { role: 'Brand Planning & Coordination — WiTTO', names: ['Hitomi Tokuma'] },
      { role: 'Naming — WiTTO', names: ['船橋草太朗'] },
    ],
  },
  {
    title: 'PAIM — マッチング体験の検討',
    entries: [
      { role: 'Experience Direction', names: ['堀内〈個人体験〉', '北村和久〈法人体験〉', '牛久保〈A2A対話〉'] },
      { role: 'Experience Planning & Concept Proposals', names: ['Aino Kishimoto'] },
      { role: 'Project Coordination', names: ['江畑潤'] },
      { role: 'UX Design & Prototyping', names: ['FUTUREK'] },
    ],
  },
  {
    title: 'AI面接官 — アバターの調査・デザイン提案',
    entries: [
      { role: 'Project Coordination & Review', names: ['安武祐太'] },
      { role: 'Avatar Research & Design Proposals', names: ['Aino Kishimoto'] },
      { role: 'Avatar Design Review', names: ['安藤'] },
    ],
  },
  {
    title: '協業パートナー',
    entries: [
      { role: 'Design & Development Partners', names: ['MCD', 'FUTUREK', 'Preferred Networks'] },
    ],
  },
];

export function PersolIntro() {
  const [teamOpen, setTeamOpen] = useState(false);

  return (
    <div className="persol-v2-intro-grid" id="overview">
      <div className="persol-v2-title-copy">
        <h1 id="project-title">PERSOL <em>AI Interview</em></h1>
        <p className="persol-v2-project-subtitle">
          <strong>等身大のAIバディと一緒に進める、対話型面接サービス</strong>
        </p>
        <div className="persol-v2-summary">
          <p>
            面接のUX/UIとAIキャラクターとの体験の提案・制作を担当しました。聞かれたことに答えるだけでなく、雑談をしたり、無言でも隣にいたり。人の気持ちに寄り添う、等身大のAIバディとの関係性を探りました。
          </p>
        </div>
      </div>

      <dl className="persol-v2-project-facts" aria-label="プロジェクト情報">
        <div>
          <dt>担当カテゴリ</dt>
          <dd className="v2-project-tags">
            {['UX/UI', 'キャラクターインタラクション', 'アクセシビリティ', 'AI'].map((item) => (
              <span key={item}>#{item}</span>
            ))}
          </dd>
        </div>
        <div>
          <dt>関与期間</dt>
          <dd>2024.05–2026.03</dd>
        </div>
        <div>
          <dt>使用ツール</dt>
          <dd><ToolList tools={['Figma', 'Miro']} /></dd>
        </div>
        <div className="persol-v2-fact-action">
          <dt>チーム</dt>
          <dd>
            <button
              type="button"
              aria-expanded={teamOpen}
              aria-controls="persol-team-detail"
              onClick={() => setTeamOpen((current) => !current)}
            >
              <span>PERSOL Career・STUDIO HOLIDAY ほか</span>
              <span className="persol-v2-disclosure-icon" aria-hidden="true">
                {teamOpen ? '−' : '+'}
              </span>
            </button>
          </dd>
        </div>
      </dl>

      {teamOpen && (
        <section className="persol-v2-disclosure-panel persol-v2-credits-panel" id="persol-team-detail" aria-label="プロジェクトクレジット">
          <p className="persol-v2-panel-label">プロジェクトクレジット</p>
          {creditGroups.map((group) => (
            <section className="persol-v2-credit-group" key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              <dl className="persol-v2-credits-list">
                {group.entries.map((entry) => (
                  <div key={entry.role}>
                    <dt>{entry.role}</dt>
                    <dd>{entry.names.map((name) => <span className="persol-v2-credit-name" key={name}>{name}</span>)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
          <p className="persol-v2-credits-note">
            複数の関連プロジェクトでの取り組みを掲載しています。各メンバー・パートナーの参画範囲はプロジェクトにより異なります。
          </p>
        </section>
      )}
    </div>
  );
}
