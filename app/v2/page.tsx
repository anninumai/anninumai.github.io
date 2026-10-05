import type { Metadata } from 'next';
import '../home.css';
import './v2-home.css';
import { KnitBackground } from './knit-background';
import { PortfolioArchive } from './portfolio-archive';
import { V2Header } from './v2-header';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Aino Kishimoto — Portfolio',
  description: '岸本あいののポートフォリオ。サイバーエージェント応募向けに再編集したケーススタディです。',
};

const projects = [
  { title: 'PERSOL AI Interview', image: '/assets/v2-thumbs/persol.webp', href: '/v2/persol' },
  { title: 'Focus on', image: '/assets/v2-thumbs/focus-on.webp', href: '/v2/focus-on' },
  { title: 'X couture', image: '/assets/v2-thumbs/x-couture.webp', href: '/v2/x-couture' },
  { title: 'Knitted VJ System', image: '/assets/v2-thumbs/knitted-vj.webp', href: '/v2/knitted-vj-system' },
  { title: 'Lens — Memory Maker', image: '/assets/v2-thumbs/lens.webp', href: '/v2/lens' },
  { title: '編みスクリーン', image: '/assets/v2-thumbs/knitted-display.webp', href: '/v2/knitted-display' },
  { title: 'Ryusei Wave', image: '/assets/v2-thumbs/ryusei-wave.webp', href: '/v2/ryusei-wave' },
  { title: '雨粒時計', image: '/assets/v2-thumbs/rain-clock.webp', href: '/v2/rain-clock' },
  { title: '夏の存在証明', image: '/assets/v2-thumbs/summer.webp', href: '/v2/summer' },
  { title: '積水ハウス — Key Visual', image: '/assets/v2-thumbs/sekisuihouse.webp', href: '/v2/sekisuihouse' },
  { title: '広報東京都', image: '/assets/v2-thumbs/koho-tokyo.webp', href: '/v2/koho-tokyo' },
  { title: '3D Characters', image: '/assets/v2-thumbs/3d-characters.webp', href: '/v2/3d-characters' },
];

export default function PortfolioV2Home() {
  return (
    <div className="work-index v2-index" id="top">
      <KnitBackground />
      <a className="skip" href="#works">作品一覧へ移動</a>
      <V2Header />

      <PortfolioArchive projects={projects} />
    </div>
  );
}
