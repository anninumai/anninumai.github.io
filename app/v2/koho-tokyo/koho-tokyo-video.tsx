'use client';

import Image from 'next/image';
import { useState } from 'react';

export function KohoTokyoVideo() {
  const [playing, setPlaying] = useState(false);

  return <div className="koho-tokyo-v2-video">
    {playing ? (
      <iframe
        src="https://www.youtube-nocookie.com/embed/bqbNr9kTxFM?autoplay=1&rel=0"
        title="広報東京都 2023年9月号の映像"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ) : (
      <button type="button" onClick={() => setPlaying(true)} aria-label="広報東京都の映像を再生">
        <Image unoptimized src="/assets/koho-tokyo/cover.webp" alt="" width={1920} height={1948} loading="lazy" />
        <span aria-hidden="true">▶</span>
      </button>
    )}
  </div>;
}
