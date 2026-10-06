const projects = [
  ['/v2/persol', 'PERSOL AI Interview'],
  ['/v2/sekisuihouse', '積水ハウス — Key Visual'],
  ['/v2/knitted-vj-system', 'Knitted VJ System'],
  ['/v2/x-couture', 'X couture'],
  ['/v2/koho-tokyo', '広報東京都'],
  ['/v2/focus-on', 'Focus on'],
  ['/v2/lens', 'Lens'],
  ['/v2/ryusei-wave', 'Ryusei Wave'],
  ['/v2/octomorph', 'OCTOMORPH'],
  ['/v2/3d-characters', '3D Characters'],
  ['/v2/knitted-display', 'Knitted Display'],
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
