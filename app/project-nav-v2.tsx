const projects = [
  ['/v2/persol', 'PERSOL AI Interview'],
  ['/v2/focus-on', 'Focus on'],
  ['/v2/x-couture', 'X couture'],
  ['/v2/knitted-vj-system', 'Knitted VJ System'],
  ['/v2/lens', 'Lens'],
  ['/v2/knitted-display', '編みスクリーン'],
  ['/v2/ryusei-wave', 'Ryusei Wave'],
  ['/v2/rain-clock', '雨粒時計'],
  ['/v2/summer', '夏の存在証明'],
];

export function ProjectNavV2({ current }: { current: string }) {
  return (
    <nav className="case-project-nav wrap" aria-label="V2の作品を選ぶ">
      <span className="eyebrow">PORTFOLIO / SELECTED WORKS</span>
      <div>
        {projects.map(([href, name]) => (
          <a key={href} href={`${href}/`} aria-current={href === current ? 'page' : undefined}>{name}</a>
        ))}
      </div>
    </nav>
  );
}
