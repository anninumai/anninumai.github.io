'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gestureFrameAt, gestureFrames, gestureOpenness, gestureShowsProfile } from './gesture-sequence';

export function AboutGesture() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const openness = gestureOpenness(frame);

  useEffect(() => {
    const section = imageRef.current?.closest('.about-v2-records');
    if (!section) return;

    let position = 0;
    let requestedFrame = 0;
    let animationFrame = 0;
    let disposed = false;
    const decodedFrames = new Set<number>();

    const showRequestedFrame = () => {
      // Keep the previous photo until the requested one is decoded: no blank flash.
      if (!disposed && decodedFrames.has(requestedFrame)) setFrame(requestedFrame);
    };
    const preloadedImages = gestureFrames.map((src, index) => {
      const image = new window.Image();
      image.src = src;
      void image.decode().then(() => {
        decodedFrames.add(index);
        showRequestedFrame();
      }).catch(() => { /* Retain the available photo if a frame cannot load. */ });
      return image;
    });

    const updatePosition = (nextPosition: number) => {
      position = Math.max(0, Math.min(1, nextPosition));
      requestedFrame = gestureFrameAt(position);
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        showRequestedFrame();
      });
    };
    const onPointerMove = (pointer: PointerEvent) => {
      // Do not turn an ordinary vertical touch scroll into a hand animation.
      if (pointer.pointerType === 'touch') return;
      updatePosition(pointer.clientX / window.innerWidth);
    };
    const onPointerDown = (pointer: PointerEvent) => {
      if (pointer.pointerType === 'touch') updatePosition(pointer.clientX / window.innerWidth);
    };
    const onKeyDown = (event: Event) => {
      const key = event as KeyboardEvent;
      if (key.target !== section) return;
      if (key.key === 'ArrowLeft' || key.key === 'ArrowRight') {
        key.preventDefault();
        updatePosition(position + (key.key === 'ArrowRight' ? 1 : -1) / 8);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    section.addEventListener('keydown', onKeyDown);
    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      preloadedImages.length = 0;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      section.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return <>
    <div className="about-v2-gesture" ref={imageRef} aria-hidden="true" data-frame={frame + 1}>
      <Image src={gestureFrames[frame]} alt="" width={1122} height={1402} draggable={false} priority unoptimized />
    </div>
    <div className="about-v2-profile-copy" hidden={!gestureShowsProfile(frame)} style={{ width: `calc(${180 + openness * 110} * var(--v2-px, 1px))`, '--about-openness': openness } as CSSProperties}>
      <p>オーストラリアでCommunication Designを学び、ブランディング、UX/UIデザインの実務を経験してきました。</p>
      <p>AIアバター、ヘルスケア、バーチャルファッションなど、人の感情や身体、自己表現と密接に関わるプロジェクトに携わり、デジタルプロダクトやサービスのコンセプト立案から、UX/UI設計、プロトタイプ制作まで一貫して取り組んでいます。</p>
      <p>感覚や身体性に寄り添う直感的なインターフェースに関心があります。また、人の知覚に働きかけ、世界の感じ方を豊かにするインターフェースを探っています。</p>
    </div>
  </>;
}
