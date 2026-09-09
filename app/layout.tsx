import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'X couture — デジタルファッションと制作体制のデザイン',
 description: 'CGインターンチーム10人のPMとして、チーム体制・会議・技術情報の共有をゼロから設計。X coutureの制作プロセスを紹介するポートフォリオケーススタディ。',
 robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ja"><body>{children}</body></html>; }
