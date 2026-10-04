'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ToolList } from './tool-list';

type CreditItem = {
  label: string;
  value: string;
};

type ProjectIntroV2Props = {
  title: ReactNode;
  subtitle: string;
  summary: string;
  role: string[];
  period: string;
  tools: string[];
  team: string;
  periodLabel?: string;
  credits?: CreditItem[];
};

export function ProjectIntroV2({
  title,
  subtitle,
  summary,
  role,
  period,
  tools,
  team,
  periodLabel = '期間',
  credits = [],
}: ProjectIntroV2Props) {
  const [teamOpen, setTeamOpen] = useState(false);
  const hasTeamDetail = credits.length > 0;

  return (
    <div className="v2-project-intro" id="overview">
      <div className="v2-project-intro-copy">
        {title}
        <p className="v2-project-intro-subtitle"><strong>{subtitle}</strong></p>
        <p className="v2-project-intro-summary">{summary}</p>
      </div>

      <dl className="v2-project-facts" aria-label="プロジェクト情報">
        <div>
          <dt>担当カテゴリ</dt>
          <dd className="v2-project-tags">
            {role.map((item) => <span key={item}>#{item}</span>)}
          </dd>
        </div>
        <div><dt>{periodLabel}</dt><dd>{period}</dd></div>
        {tools.length > 0 && <div><dt>使用ツール</dt><dd><ToolList tools={tools} /></dd></div>}
        <div className={hasTeamDetail ? 'v2-project-fact-action' : undefined}>
          <dt>チーム</dt>
          <dd>
            {hasTeamDetail ? (
              <button
                type="button"
                aria-expanded={teamOpen}
                aria-controls="v2-team-detail"
                onClick={() => setTeamOpen((current) => !current)}
              >
                <span>{team}</span><span className="v2-project-disclosure-icon" aria-hidden="true">{teamOpen ? '−' : '+'}</span>
              </button>
            ) : team}
          </dd>
        </div>
      </dl>

      {teamOpen && (
        <section className="v2-project-detail-panel v2-project-credits-panel" id="v2-team-detail" aria-label="プロジェクトクレジット">
          <p className="v2-project-panel-label">プロジェクトクレジット</p>
          <dl className="v2-project-credits-list">
            {credits.map((item) => <div key={`${item.label}-${item.value}`}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
        </section>
      )}
    </div>
  );
}
