'use client';

import { useState } from 'react';
import { ToolList } from '../tool-list';

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
            AI転職サービスの開発に約8カ月間参加し、面接のUX/UIとAIキャラクターとの体験を設計しました。聞かれたことに答えるだけでなく、雑談をしたり、無言でも隣にいたり。人の気持ちに寄り添う、等身大のAIバディとの関係性を探りました。
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
          <dt>期間</dt>
          <dd>約8カ月</dd>
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
              <span>PERSOL Career・STUDIO HOLIDAY</span>
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
          <dl className="persol-v2-credits-list">
            <div>
              <dt>ディレクション</dt>
              <dd>PERSOL Career<br />STUDIO HOLIDAY<br />imamura hirune</dd>
            </div>
            <div>
              <dt>面接官AI デザインリード</dt>
              <dd>Aino Kishimoto</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}
