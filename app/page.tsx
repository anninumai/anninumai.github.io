import type { Metadata } from 'next';
import { PortfolioHome } from './home-client';
import './home.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Aino Kishimoto — Portfolio',
  description: '岸本あいののポートフォリオ。UX/UI、リサーチ、インタラクション、クリエイティブテクノロジーのプロジェクトを紹介します。',
};

export default function Home() {
  return <PortfolioHome />;
}
