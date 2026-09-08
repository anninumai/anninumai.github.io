'use client';
import { useState } from 'react';
export function Film() {
 const [playing,setPlaying]=useState(false);
 return <div className="film">{playing ? <iframe src="https://www.youtube-nocookie.com/embed/PF7KoWcs-2U?autoplay=1&start=23&rel=0" title="yoshiokubo — Rakuten Fashion Week TOKYO 2022 A/W" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/> : <button className="film-poster" onClick={()=>setPlaying(true)} aria-label="yoshiokuboのショー映像を再生"><img src="/assets/runway.png" width="2226" height="1260" loading="lazy" alt=""/><span className="film-play"><span aria-hidden="true">▶</span>映像を再生</span><span className="film-poster-label">YOSHIOKUBO / 2022 A/W</span></button>}<a className="video-fallback" href="https://www.youtube.com/watch?v=PF7KoWcs-2U&t=23s" target="_blank" rel="noreferrer">YouTubeで見る ↗</a></div>;
}
