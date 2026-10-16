'use client';

import { useState } from 'react';
import { ToolList } from '../tool-list';

const credits = [
  { role: '事業・サービス開発', names: ['PERSOL CAREER'] },
  { role: 'クリエイティブディレクション', names: ['Hirochika Horiuchi（STUDIO HOLIDAY）'] },
  { role: 'UX/UIディレクション・デザインリード', scope: 'Dawn・Polaris', names: ['Hirune Imamura'] },
  { role: 'UX/UIディレクション・デザインリード', scope: 'Dawn_TS', names: ['Aino Kishimoto'] },
  { role: 'UX/UIデザイン', scope: 'Dawn・Polaris', names: ['Aino Kishimoto'] },
  { role: 'ブランド企画・制作連携', scope: 'WiTTO', names: ['Hitomi Tokuma'] },
  { role: 'ネーミング', scope: 'WiTTO', names: ['Sotaro Funahashi'] },
  { role: '体験設計ディレクション', scope: 'PAIM', names: ['Hirochika Horiuchi〈個人体験〉', 'Kazuhisa Kitamura〈法人体験〉', 'Dan Ushikubo〈A2A対話〉'] },
  { role: 'UX企画・コンセプト提案', scope: 'PAIM', names: ['Aino Kishimoto'] },
  { role: 'プロジェクト進行', scope: 'PAIM', names: ['Jun Ebata'] },
  { role: 'UXデザイン・プロトタイピング', scope: 'PAIM', names: ['FUTUREK'] },
  { role: '進行・レビュー', scope: 'AI面接官', names: ['Yuta Yasutake'] },
  { role: 'アバター調査・デザイン', scope: 'AI面接官', names: ['Aino Kishimoto'] },
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
              <div key={`${entry.role}-${entry.scope ?? ''}`}>
                <dt>{entry.role}{entry.scope && <span className="persol-v2-credit-scope">（{entry.scope}）</span>}</dt>
                <dd>{entry.names.map((name) => <span className="persol-v2-credit-name" key={name}>{name}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
