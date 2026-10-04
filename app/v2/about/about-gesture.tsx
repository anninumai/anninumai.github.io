'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const frames = [
  '/assets/about-v2/gesture-01.webp',
  '/assets/about-v2/gesture-02.webp',
  '/assets/about-v2/gesture-03.webp',
  '/assets/about-v2/gesture-04.webp',
  '/assets/about-v2/gesture-05.webp',
];

export function AboutGesture() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(4);

  useEffect(() => {
    frames.forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });

    const section = imageRef.current?.closest('.about-v2-records');
    if (!section) return;

    const onPointerMove = (event: Event) => {
      const pointer = event as PointerEvent;
      const bounds = section.getBoundingClientRect();
      const position = Math.max(0, Math.min(1, (pointer.clientX - bounds.left) / bounds.width));
      setFrame(Math.round(position * (frames.length - 1)));
    };
    const onKeyDown = (event: Event) => {
      const key = event as KeyboardEvent;
      if (key.key === 'ArrowLeft' || key.key === 'ArrowRight') {
        key.preventDefault();
        setFrame((current) => Math.max(0, Math.min(frames.length - 1, current + (key.key === 'ArrowRight' ? 1 : -1))));
      }
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('keydown', onKeyDown);
    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return <>
    <div className="about-v2-gesture" ref={imageRef} aria-hidden="true">
      <Image src={frames[frame]} alt="" width={1122} height={1402} priority unoptimized />
    </div>
    <div className="about-v2-profile-copy" style={{ width: 180 + frame * 110, '--about-frame': frame } as CSSProperties}>
      <p>オーストラリアでCommunication Designを学び、ブランディング、UX/UIデザインの実務を経験してきました。</p>
      <p>AIアバター、ヘルスケア、バーチャルファッションなど、人の感情や身体、自己表現と密接に関わるプロジェクトに携わり、デジタルプロダクトやサービスのコンセプト立案から、UX/UI設計、プロトタイプ制作まで一貫して取り組んでいます。</p>
      <p>感覚や身体性に寄り添う直感的なインターフェースに関心があります。また、人の知覚に働きかけ、世界の感じ方を豊かにするインターフェースを探っています。</p>
    </div>
  </>;
}
