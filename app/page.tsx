import { Film } from './film';

const intro = '3DCGを用いたバーチャルファッションプロジェクトに、CGインターンチーム10人のProject Managerとして参画。チーム内の複数グループの制作進行、技術情報の整備、制作課題の共有、3DCGアセット管理を担い、Fashion Weekでの公開に向けた制作を推進しました。';
const roles = ['CGインターンチーム10人のプロジェクトマネジメント', 'チーム分け・リーダー制の考案', '会議の目的・ルール・進行の設計', 'Notionによる情報共有基盤の構築', '技術ラボの新設・技術情報の整理', '3DCGアセット管理', '3DCG・画像合成の一部制作支援'];
function Label({ n, children }: { n: string; children: React.ReactNode }) { return <div className="section-label"><span>{n}</span><span>{children}</span></div>; }
function Caption({ children, no }: { children: React.ReactNode; no: string }) { return <figcaption><span className="figure-no">FIG. {no}</span><span>{children}</span></figcaption>; }

export default function Home() {
 return <>
  <a className="skip" href="#overview">本文へ移動</a>
  <header className="site-header" id="top">
   <a className="wordmark" href="#top" aria-label="X couture ページの先頭">X<span>couture</span><span className="wordmark-dot">.</span></a>
   <span className="header-caption">PORTFOLIO / CASE STUDY</span>
   <a className="header-link" href="#contributions">私の取り組み <span aria-hidden="true">↘</span></a>
  </header>
  <main>
   <section className="hero wrap" aria-labelledby="project-title">
    <div className="eyebrow hero-eyebrow"><span>FASHION × TECHNOLOGY</span><span>2021 — 2022</span></div>
    <div className="title-row"><h1 id="project-title">X <em>couture</em></h1><div className="hero-category">Virtual Fashion<br/>Production<span>PROJECT MANAGEMENT</span></div></div>
    <figure className="hero-figure"><div className="hero-picture"><img src="/assets/runway.png" alt="yoshiokuboのショー。赤い照明と映像が交差する空間をモデルが歩く" width="2226" height="1260" fetchPriority="high"/><a href="#output" className="hero-film-link"><span className="play-small" aria-hidden="true">▶</span><span>SHOW FILM</span><span aria-hidden="true">↗</span></a></div><Caption no="01">yoshiokubo × X couture — Rakuten Fashion Week TOKYO 2022 A/W</Caption></figure>
   </section>
   <section className="overview wrap section-grid" id="overview" aria-label="プロジェクト概要">
    <Label n="01">OVERVIEW</Label>
    <div><p className="intro">{intro}</p><dl className="metadata"><div><dt>PERIOD</dt><dd>2021.11–2022.02</dd></div><div><dt>ROLE</dt><dd>CGインターンチームのPM<br/>一部制作支援</dd></div><div><dt>TEAM</dt><dd>全体 約20人<br/>担当 CGインターン生10人</dd></div><div><dt>FIELD</dt><dd>Virtual Fashion<br/>3DCG / 画像合成</dd></div></dl></div>
   </section>
   <nav className="chapter-nav wrap" aria-label="ページ内の目次"><span className="eyebrow">IN THIS PROJECT</span><div><a href="#aim">プロジェクトの目的</a><a href="#contributions">3つの取り組み</a><a href="#output">アウトプット</a><a href="#reflection">振り返り</a></div></nav>
   <section className="aim wrap section-grid section-space" id="aim">
    <Label n="02">PROJECT AIM</Label>
    <div><p className="english-heading">Beyond the<br/><em>physical garment.</em></p><h2>デジタル技術で、<br/>ファッション表現を拡張する。</h2><p className="body-copy lead-copy">デジタル技術によってファッション表現を拡張し、3DCGや画像合成を通して、現実の衣服だけでは成立しない身体・衣服・空間表現を生み出すプロジェクト。</p><p className="body-copy">自社では、購入者の写真にデジタルドレスを合成して届けるサービスを展開。Rakuten Fashion Week TOKYO 2022 A/Wでは、yoshiokuboとのデジタルファッションコラボレーションにおいて、3DCG・画像合成などの技術を提供しました。</p><div className="mission"><span className="eyebrow">MY MISSION</span><p>新規事業の立ち上げに参画し、CGインターンチームの運営体制を一から考案しました。役割分担、制作進行、情報共有、技術学習の仕組みを整え、チームの制作活動を支えました。</p></div></div>
   </section>
   <div className="process-pair wrap"><figure><img src="/assets/blender.png" width="2260" height="1222" loading="lazy" alt="Blenderで写真に合わせてデジタルドレスを調整している制作工程"/><Caption no="02">3DCG — チームの制作工程</Caption></figure><figure><img src="/assets/compositing.png" width="2258" height="1244" loading="lazy" alt="Photoshopで人物写真とデジタルドレスを合成している制作工程"/><Caption no="03">COMPOSITING — チームの制作工程</Caption></figure></div>
   <section className="contributions" id="contributions">
    <div className="contribution-heading wrap"><span className="eyebrow">MY CONTRIBUTIONS</span><p>制作を支える、<br/><span>3つの仕組み。</span></p><span className="contribution-total">01 — 03</span></div>
    <article className="contribution wrap section-grid" id="structure">
     <div className="point-marker"><span className="point-number">01</span><span className="eyebrow">PRODUCTION<br/>STRUCTURE</span></div>
     <div><h2>チームが動く、<br/>役割と情報の流れをつくる。</h2><div className="copy-columns"><p>10人のCGインターン生を複数のグループに分け、各グループにリーダーを置く体制を考案しました。グループごとのMTGとリーダーMTGを設け、制作状況や課題を共有する流れをつくりました。</p><p>Notionには、チーム編成、議事録、制作に必要な情報を集約。各グループの活動を共通の場所で確認できるように整理しました。</p></div>
      <figure className="structure-figure"><div className="structure-diagram"><div className="diagram-context"><span>PROJECT TEAM</span><span>制作体制 全体約20人</span></div><div className="managed-team"><div className="managed-heading"><span>MY SCOPE</span><strong>CGインターンチーム <b>10</b>人</strong><span>Project Manager</span></div><div className="team-grid">{['A','B','C'].map(team=><div className="team-column" key={team}><span className="team-name">TEAM {team}</span><span>メンバー</span><span className="team-line" aria-hidden="true"/><strong>チームリーダー</strong><span className="team-meeting">グループMTG</span></div>)}</div><div className="meeting-bridge"><span aria-hidden="true">↓</span><strong>リーダーMTG</strong><span>進捗・制作課題・技術知見の共有</span></div></div><div className="notion-band"><span className="notion-mark" aria-hidden="true">N</span><strong>Notion</strong><span>チーム編成 / 議事録 / 技術情報</span></div></div><Caption no="04">担当範囲と情報共有の流れ。チーム構成・活動記録をもとに再構成。</Caption></figure>
      <div className="capabilities"><span>TEAM LEADERSHIP</span><span>PRODUCTION DESIGN</span><span>INFORMATION SHARING</span></div>
     </div>
    </article>
    <article className="contribution wrap section-grid" id="meetings">
     <div className="point-marker"><span className="point-number">02</span><span className="eyebrow">MEETINGS<br/>INTO ACTION</span></div>
     <div><h2>会議を、<br/>次の行動につなげる。</h2><p className="body-copy">会議の目的・進め方・記録方法を設計しました。活動報告や議題は事前に記入し、会議では前週の行動確認、制作上の課題、技術知見を共有。次に取り組む内容は、担当者と期限を合わせて決めるルールにしました。</p><figure className="meeting-evidence"><div className="meeting-document"><div className="document-header"><span className="document-icon" aria-hidden="true">↳</span><span>2021-11-09<br/><strong>チームリーダーMTG</strong></span><span className="document-tag">議事録より抜粋</span></div><div className="document-body"><div><span className="document-label">MTGの目的</span><p>合成の速度と質を上げるための知見共有</p><p>目標の合成数と現状の合成数の差から、各自の合成数と期限を決める</p><p>合成の速度と質を上げるために困っていることの共有と解決</p></div><div className="document-rule"><span className="document-label">MTGのRule</span><p>報告はできるだけ短く、結論から話すことを心がける</p><p>次週までにやることは<strong>「誰がやるか」</strong>と<strong>「いつまでにやるか」</strong>もセットで決める。</p></div></div></div><Caption no="05">会議の目的・ルールを明文化した実際の記録。個人情報を除いて抜粋。</Caption></figure><ol className="meeting-flow"><li><span>01</span>事前記入</li><li><span>02</span>活動・進捗の確認</li><li><span>03</span>課題と知見の共有</li><li><span>04</span>行動・担当・期限の決定</li></ol><p className="body-copy">実際の議事録には、テクスチャの扱い、元画像を加工する範囲、役割分担など、制作中の具体的な論点が残っています。</p><div className="capabilities"><span>FACILITATION</span><span>PROBLEM SHARING</span><span>NEXT ACTION</span></div></div>
    </article>
    <article className="contribution wrap section-grid" id="learning">
     <div className="point-marker"><span className="point-number">03</span><span className="eyebrow">LEARNING<br/>THROUGH MAKING</span></div>
     <div><h2>自ら技術に触れ、<br/>学びを共有する。</h2><p className="body-copy">制作を支えるためには、自分自身も技術に触れ、作業を理解する必要があると考えました。3DCG・画像合成の制作を一部支援し、色調整やドレスの柄・形状の調整などに取り組みました。</p><p className="body-copy">活動報告では、画像素材を探す手間や、ポージングの細かな調整の難しさも共有しています。</p><div className="knowledge-layout"><figure className="knowledge-figure"><img src="/assets/knowledge.png" width="1200" height="1230" loading="lazy" alt="新設したNotionの技術ラボ。CG基礎、光の使い方、衣服モデリング、クロスシミュレーションなどの学習資料が並ぶ"/><Caption no="06">Blender・Photoshopを中心に、基礎知識から制作手法までを整理した「技術ラボ」。</Caption></figure><div className="knowledge-text"><span className="eyebrow">TECHNICAL KNOWLEDGE BASE</span><h3>制作の学びを、<br/>共通の資源に。</h3><p>制作に関連する学習資料をまとめた「技術ラボ」を新設。CGの基礎、ライティング、衣服のモデリング、クロスシミュレーション、Photoshopでの画像合成などの情報を整理しました。</p><div className="learning-note"><span className="eyebrow">MY PRODUCTION NOTES</span><p>色調整・柄・形状の調整<br/>素材探索とポージングの難しさ</p><span>自身の活動報告より要約</span></div></div></div><div className="capabilities"><span>TECHNICAL LITERACY</span><span>KNOWLEDGE SHARING</span><span>HANDS-ON LEARNING</span></div></div>
    </article>
   </section>
   <section className="output-section" id="output"><div className="wrap"><div className="output-heading"><Label n="06">OUTPUT</Label><div><p className="english-heading">From digital.<br/><em>To expression.</em></p><h2>デジタルファッションを、届ける。</h2></div></div><div className="output-intro"><span className="eyebrow">01 / COLLABORATION</span><div><h3>yoshiokubo × X couture</h3><p>Rakuten Fashion Week TOKYO 2022 A/Wにおいて、X coutureとして3DCG・画像合成などの技術を提供しました。</p></div></div><Film/><div className="output-caption"><span>Rakuten Fashion Week TOKYO 2022 A/W</span><a href="https://rakutenfashionweektokyo.com/jp/brands/detail/yoshio-kubo/" target="_blank" rel="noreferrer">公式ブランドページ <span aria-hidden="true">↗</span></a></div><div className="service-output"><div><span className="eyebrow">02 / DIGITAL FASHION SERVICE</span><h3>自分の写真で、<br/>デジタルの衣服を着る。</h3><p>購入者の写真にデジタルドレスを合成し、デジタルファッションを身にまとうビジュアルとして提供しました。</p><span className="service-caption">写真 × 3DCG × 画像合成</span></div><figure><img src="/assets/compositing.png" width="2258" height="1244" loading="lazy" alt="人物写真にデジタルドレスを合成するPhotoshopの制作画面"/><Caption no="07">自社サービスに関連する画像合成の制作工程。チーム制作。</Caption></figure></div></div></section>
   <section className="reflection wrap section-grid section-space" id="reflection"><Label n="07">REFLECTION</Label><div><h2>制作を理解し、<br/>協働する環境を考える。</h2><p className="body-copy">制作を前進させるには、スケジュールだけでなく、メンバーが役割を把握し、学び、課題を共有できる環境を整える必要があると学びました。</p><p className="body-copy">また、自ら制作に触れることで、作業の難しさを具体的に理解する機会を得ました。仕組みを考えることと、現場で手を動かすこと。その両方から、チームの制作を支える経験になりました。</p><div className="reflection-line">Designing the conditions<br/><em>for a creative team to move.</em></div></div></section>
   <section className="credits wrap section-grid"><Label n="08">ROLE / CREDITS</Label><div><div className="credits-heading"><h2>私の担当</h2><span>CGインターンチーム10人のPM</span></div><ul>{roles.map((role,i)=><li key={role}><span>{String(i+1).padStart(2,'0')}</span>{role}</li>)}</ul><p className="credit-note">掲載する作品・映像はチームによる成果です。Blender・Photoshopの画面はチームの制作工程として掲載し、私自身の制作支援については活動報告に基づいて記載しています。</p></div></section>
  </main><footer className="wrap"><a className="footer-title" href="#top">X <em>couture</em><span aria-hidden="true">↑</span></a><div><span>VIRTUAL FASHION / 2021–2022</span><a href="#top">ページの先頭へ ↑</a></div></footer>
 </>;
}
