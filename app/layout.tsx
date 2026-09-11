import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Aino Kishimoto — Portfolio',
 description: '岸本あいののポートフォリオ。UX/UI、リサーチ、インタラクション、クリエイティブテクノロジーのプロジェクトを紹介します。',
 robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }
