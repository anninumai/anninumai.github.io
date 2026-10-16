'use client';

import { useState } from 'react';
import { ToolList } from '../tool-list';

const credits = [
  { role: '事業・サービス開発、ブランド企画・制作連携', names: ['PERSOL CAREER'] },
  { role: 'クリエイティブディレクション、キャラクターデザイン', names: ['Hirochika Horiuchi'] },
  { role: 'プロジェクトディレクション・進行', names: ['Kazuhisa Kitamura', 'Dan Ushikubo', 'Jun Ebata', 'Yuta Yasutake'] },
  { role: 'UX/UIディレクション・デザインリード', names: ['Hirune Imamura', 'Aino Kishimoto'] },
  { role: '将来UX企画/キャラクターリサーチ・デザイン', names: ['Aino Kishimoto'] },
  { role: 'ネーミング', names: ['Sotaro Funahashi'] },
  { role: 'デザイン・開発協力', names: ['MCD', 'FUTUREK', 'Preferred Networks'] },
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
              <span>PERSOL CAREER・STUDIO HOLIDAY ほか</span>
              <span className="persol-v2-disclosure-icon" aria-hidden="true">
                {teamOpen ? '−' : '+'}
              </span>
            </button>
          </dd>
        </div>
      </dl>

      {teamOpen && (
        <section className="persol-v2-disclosure-panel persol-v2-credits-panel" id="persol-team-detail" aria-label="プロジェクトクレジット">
          <p className="persol-v2-panel-label">クレジット</p>
          <dl className="persol-v2-credits-list">
            {credits.map((entry) => (
              <div key={entry.role}>
                <dt>{entry.role}</dt>
                <dd>{entry.names.map((name) => <span className="persol-v2-credit-name" key={name}>{name}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
