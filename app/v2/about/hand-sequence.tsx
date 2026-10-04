'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import Image from 'next/image';

const paragraphs = [
  'オーストラリアでCommunication Designを学び、ブランディング、UX/UIデザインの実務を経験してきました。',
  'AIアバター、ヘルスケア、バーチャルファッションなど、人の感情や身体、自己表現と密接に関わるプロジェクトに携わり、デジタルプロダクトやサービスのコンセプト立案から、UX/UI設計、プロトタイプ制作まで一貫して取り組んでいます。',
  '感覚や身体性に寄り添う直感的なインターフェースに関心があります。また、人の知覚に働きかけ、世界の感じ方を豊かにするインターフェースを探っています。',
];

const frames = Array.from({ length: 14 }, (_, index) =>
  `/assets/about-v2/frame-${String(index + 1).padStart(2, '0')}.jpg`,
);

export function HandSequence() {
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(11);
  const [frame, setFrame] = useState(11);
  const [paragraph, setParagraph] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    frames.slice(1).forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = stageRef.current;
    const text = textRef.current;
    if (!stage || !text) return;
    const bounds = stage.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    const next = Math.min(frames.length - 1, Math.floor(x * frames.length));
    if (next !== frameRef.current) {
      frameRef.current = next;
      setFrame(next);
    }
    const sway = (x - .5) * 7;
    text.style.clipPath = `polygon(${8 + sway}% 0%, ${45 + sway / 2}% ${2 + y * 2}%, ${89 + sway / 2}% 0%, 100% ${14 + y * 5}%, ${98 - sway / 2}% 70%, ${88 + sway}% 100%, ${49 - sway / 2}% ${97 - y * 2}%, ${10 - sway}% 100%, 0% ${81 - y * 6}%, ${2 + sway / 2}% 27%)`;
    text.style.transform = `translate(calc(-50% + ${(x - .5) * 14}px), calc(-50% + ${(y - .5) * 10}px))`;
  }

  function reset() {
    if (!textRef.current) return;
    textRef.current.style.clipPath = '';
    textRef.current.style.transform = '';
  }

  return (
    <div className="about-v2-interactive">
      <div
        ref={stageRef}
        className="about-v2-stage"
        onPointerMove={move}
        onPointerLeave={reset}
        aria-label="手の動きとともに言葉の形が変わるポートレート"
      >
        <Image src={frames[frame]} width={1122} height={1402} alt="白いニットを着た岸本あいのの手元" draggable={false} unoptimized priority />
        <div ref={textRef} className="about-v2-formed-text">
          <span className="about-v2-text-index">0{paragraph + 1} / 03</span>
          <p key={paragraph}>{paragraphs[paragraph]}</p>
        </div>
        <span className="about-v2-stage-hint" aria-hidden="true">MOVE YOUR CURSOR / HANDS IN MOTION</span>
      </div>
      <div className="about-v2-copy-controls" aria-label="紹介文を選ぶ">
        {paragraphs.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`紹介文 ${index + 1}`}
            aria-pressed={paragraph === index}
            onClick={() => setParagraph(index)}
          >
            0{index + 1}
          </button>
        ))}
      </div>
      <div className="about-v2-full-text" aria-label="自己紹介の全文">
        {paragraphs.map((copy) => <p key={copy}>{copy}</p>)}
      </div>
    </div>
  );
}
