import { ProjectNav } from './project-nav';
import { Evidence } from './evidence';
import { Film } from './film';

export const dynamic = 'force-static';

const intro = '新しく立ち上がったCGインターンチームで、10人のPMを一人で担当。グループ編成、会議、情報共有、技術学習の仕組みを一から整え、約3〜4か月にわたって2つの制作を進行しました。';
const roles = ['CGインターンチーム10人のプロジェクトマネジメント（PMを一人で担当）', 'チーム分け・リーダー制の考案', '会議の目的・ルール・進行の設計', 'Notionによる情報共有基盤の構築', '技術ラボの新設・技術情報の整理', '3DCGアセット管理', '3DCG・画像合成の一部制作支援'];
function Label({ n, children }: { n: string; children: React.ReactNode }) { return <div className="section-label"><span>{n}</span><span>{children}</span></div>; }
function Caption({ children, no }: { children: React.ReactNode; no: string }) { return <figcaption><span className="figure-no">FIG. {no}</span><span>{children}</span></figcaption>; }

export default function Home() {
 return <>
  <a className="skip" href="#overview">本文へ移動</a>
  <header className="site-header" id="top">
   <a className="wordmark" href="#top" aria-label="X couture ページの先頭">X<span>couture</span><span className="wordmark-dot">.</span></a>
   <span className="header-caption">PORTFOLIO / CASE STUDY</span>
   <a className="header-link" href="/knitted-vj-system">02 — Knitted VJ <span aria-hidden="true">↗</span></a>
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
    <div><p className="english-heading">Building a team<br/><em>from zero.</em></p><h2>新しい制作チームが、<br/>自分たちで前進できる状態をつくる。</h2><p className="body-copy lead-copy">CGインターンを迎える段階では、役割、会議、情報共有の方法がまだ定まっていませんでした。私は10人の担当PMとして、制作を始めるための体制そのものを設計しました。</p><p className="body-copy">チームが担当したのは、購入者の写真に3Dドレスを合成するサービス制作と、Rakuten Fashion Week TOKYO 2022 A/Wに向けたyoshiokuboとの制作です。私は進捗と技術課題を把握し、必要な判断を全体PMへつなぎました。</p><div className="mission"><span className="eyebrow">MY MISSION</span><p>各メンバーの状況を把握し、役割・情報・判断の流れを整える。10人が一つの制作チームとして進める運営基盤をつくること。</p></div></div>
   </section>
   <div className="process-pair wrap"><figure><img src="/assets/blender.png" width="2260" height="1222" loading="lazy" alt="Blenderで写真に合わせてデジタルドレスを調整している制作工程"/><Caption no="02">3DCG — チームの制作工程</Caption></figure><figure><img src="/assets/compositing.png" width="2258" height="1244" loading="lazy" alt="Photoshopで人物写真とデジタルドレスを合成している制作工程"/><Caption no="03">COMPOSITING — チームの制作工程</Caption></figure></div>
   <section className="contributions" id="contributions">
    <div className="contribution-heading wrap"><span className="eyebrow">MY CONTRIBUTIONS</span><p>制作を支える、<br/><span>3つの仕組み。</span></p><span className="contribution-total">01 — 03</span></div>
    <article className="contribution wrap section-grid" id="structure">
     <div className="point-marker"><span className="point-number">01</span><span className="eyebrow">PRODUCTION<br/>STRUCTURE</span></div>
     <div><h2>制作体制を、<br/>一から設計する。</h2><p className="ownership-statement">CGインターン生10人のPMを、私一人で担当。</p><div className="copy-columns"><p>10人を複数のグループに分け、各グループにリーダーを置く体制を考案しました。グループMTGとリーダーMTGを設け、制作状況や課題が担当チーム内だけに留まらない流れをつくりました。</p><p>各メンバーの進捗、困りごと、稼働できる量を確認し、必要に応じて作業を分担。チームが対応できる制作量は全体PMへ共有し、現実的な進行判断につなげました。</p></div>
      <div className="management-proof"><div className="evidence-intro"><span className="eyebrow">ORIGINAL RECORD / TEAM MANAGEMENT</span><h3>10人の運営を支えた、実際の管理画面。</h3><p>面談スケジュールと技術レビューの時間も、同じ管理表で確認できるようにしました。</p></div><Evidence src="/assets/team-management-detail.png" full="/assets/team-management.png" width={2103} height={1063} alt="CGインターン生10人の管理表。チーム編成、面談担当の岸本、技術レビューの時間を確認できる" no="04">当時のNotion管理表。担当欄の「岸本」は私。メンバーの氏名・連絡先と他の担当者名を伏せ、原文を保持して掲載。</Evidence></div>
      <details className="evidence-fold"><summary>担当範囲と情報共有の流れを図で見る</summary><figure className="structure-figure"><div className="structure-diagram"><div className="diagram-context"><span>PROJECT TEAM</span><span>制作体制 全体約20人</span></div><div className="managed-team"><div className="managed-heading"><span>MY SCOPE</span><strong>CGインターンチーム <b>10</b>人</strong><span>Project Manager</span></div><div className="team-grid">{['A','B','C'].map(team=><div className="team-column" key={team}><span className="team-name">TEAM {team}</span><span>メンバー</span><span className="team-line" aria-hidden="true"/><strong>チームリーダー</strong><span className="team-meeting">グループMTG</span></div>)}</div><div className="meeting-bridge"><span aria-hidden="true">↓</span><strong>リーダーMTG</strong><span>進捗・制作課題・技術知見の共有</span></div></div><div className="notion-band"><span className="notion-mark" aria-hidden="true">N</span><strong>Notion</strong><span>チーム編成 / 議事録 / 技術情報</span></div></div><Caption no="05">担当範囲と情報共有の流れ。チーム構成・活動記録をもとに再構成。</Caption></figure></details>
      <div className="capabilities"><span>TEAM MANAGEMENT</span><span>PRODUCTION DESIGN</span><span>CAPACITY PLANNING</span></div>
     </div>
    </article>
    <article className="contribution wrap section-grid" id="meetings">
     <div className="point-marker"><span className="point-number">02</span><span className="eyebrow">MEETINGS<br/>INTO ACTION</span></div>
     <div><h2>課題を早く見つけ、<br/>判断につなぐ。</h2><p className="body-copy">活動報告や議題を事前に記入し、会議では進捗、制作上の課題、技術的な迷いを確認しました。次の行動・担当者・期限を決め、チーム内で解決することと全体会議へ持ち込むことを切り分けました。</p><Evidence className="meeting-evidence" src="/assets/leader-meeting-detail.png" full="/assets/leader-meeting.png" width={2326} height={1019} alt="2021年11月9日のチームリーダーMTG。技術知見の共有、担当者と期限の決定、事前記入のルールを記載した実際のNotion画面" no="06">2021.11.09 チームリーダーMTGの実際の記録。私が設計した目的・ルール・進行を抜粋。拡大表示では個人情報を伏せた資料全体を確認できます。</Evidence><ol className="meeting-flow"><li><span>01</span>事前記入</li><li><span>02</span>進捗・余力の確認</li><li><span>03</span>課題と判断先の整理</li><li><span>04</span>行動・担当・期限の決定</li></ol><p className="body-copy">最終的な商品、生成物の品質、チーム全体に関わる意思決定は全体PMが担当しました。私は判断に必要な状況と論点を整理し、早い段階で共有する役割を担いました。</p><div className="capabilities"><span>FACILITATION</span><span>ISSUE MANAGEMENT</span><span>ESCALATION</span></div></div>
    </article>
    <article className="contribution wrap section-grid" id="learning">
     <div className="point-marker"><span className="point-number">03</span><span className="eyebrow">LEARNING<br/>THROUGH MAKING</span></div>
     <div><h2>制作知識を、<br/>チームで再利用できる形にする。</h2><p className="body-copy">技術的な相談を具体的に扱えるよう、自分でも3DCG・画像合成に触れ、色調整やドレスの柄・形状の調整を一部支援しました。制作中に得た知識は、個人の経験で終わらないよう記録しました。</p><div className="technical-proof"><div className="evidence-intro"><span className="eyebrow">ORIGINAL RECORD / MY TECHNICAL WORK</span><h3>制作支援の内容と課題を記録する。</h3><p>首元の色調整、はみ出した部分の処理、ドレスの柄・太さの調整。試した方法と、素材探しやポージングで困った点を共有しました。</p></div><Evidence src="/assets/technical-report-detail.png" full="/assets/technical-report.png" width={2140} height={605} alt="私自身を指すあいのの活動報告。色調整、画像処理、Blenderのマッピングや形状調整の作業と課題を記録" no="07">各チームの活動報告より、自身の担当部分を抜粋。「あいの」は私。作業内容と課題の原文をそのまま掲載。</Evidence></div><div className="knowledge-layout"><figure className="knowledge-figure"><img src="/assets/knowledge.png" width="1200" height="1230" loading="lazy" alt="新設したNotionの技術ラボ。CG基礎、光の使い方、衣服モデリング、クロスシミュレーションなどの学習資料が並ぶ"/><Caption no="08">Blender・Photoshopを中心に、基礎知識から制作手法までを整理した「技術ラボ」。</Caption></figure><div className="knowledge-text"><span className="eyebrow">TECHNICAL KNOWLEDGE BASE</span><h3>制作の学びを、<br/>共通の資源に。</h3><p>CGの基礎、ライティング、衣服のモデリング、クロスシミュレーション、Photoshopでの画像合成など、制作に関連する資料を集約した「技術ラボ」をNotionに新設しました。</p></div></div><div className="capabilities"><span>TECHNICAL LITERACY</span><span>KNOWLEDGE MANAGEMENT</span><span>PRODUCTION SUPPORT</span></div></div>
    </article>
   </section>
   <section className="output-section" id="output"><div className="wrap"><div className="output-heading"><Label n="06">OUTPUT</Label><div><p className="english-heading">Two production<br/><em>streams.</em></p><h2>10人のチームで、<br/>2つの制作を進める。</h2></div></div><div className="output-intro"><span className="eyebrow">01 / FASHION WEEK</span><div><h3>yoshiokubo × X couture</h3><p>Rakuten Fashion Week TOKYO 2022 A/Wに向け、衣服の3D表現と写真上での表現を検討・制作。私はCGインターンチームの進捗管理と技術課題の整理を担当しました。</p></div></div><Film/><div className="output-caption"><span>Rakuten Fashion Week TOKYO 2022 A/W</span><a href="https://rakutenfashionweektokyo.com/jp/brands/detail/yoshio-kubo/" target="_blank" rel="noreferrer">公式ブランドページ <span aria-hidden="true">↗</span></a></div><figure className="fashion-week-team"><a className="team-photo-link" href="/assets/fashion-week-team.png" target="_blank" rel="noreferrer" aria-label="Rakuten Fashion Weekのチーム写真を拡大"><img src="/assets/fashion-week-team.png" width="1986" height="1478" loading="lazy" alt="Rakuten Fashion Week TOKYOでのチーム集合写真"/></a><Caption no="09">Rakuten Fashion Week TOKYO 2022 A/Wでのチーム集合写真。</Caption></figure><div className="service-output"><div><span className="eyebrow">02 / DIGITAL FASHION SERVICE</span><h3>写真に、<br/>3Dドレスを合成する。</h3><p>購入者の写真に用意された3Dドレスを合わせ、形状調整、画像合成、レタッチを行う制作です。私はチームの進行と課題解決を支え、一部の制作にも参加しました。</p><span className="service-caption">3D調整 × 画像合成 × レタッチ</span></div><figure><img src="/assets/compositing.png" width="2258" height="1244" loading="lazy" alt="人物写真にデジタルドレスを合成するPhotoshopの制作画面"/><Caption no="10">購入者向けサービスに関連する画像合成の制作工程。チーム制作。</Caption></figure></div></div></section>
   <section className="reflection wrap section-grid section-space" id="reflection"><Label n="07">REFLECTION</Label><div><h2>進捗だけでなく、<br/>判断できる状態をつくる。</h2><p className="body-copy">約3〜4か月の運用では、大きな納期問題を起こさず制作を進めました。ただし、これは体制だけの効果として断定せず、チーム全体の取り組みによる結果として捉えています。</p><p className="body-copy">PMとして重視したのは、各メンバーの余力と困りごとを早めに把握し、分担できる課題はチーム内で動かし、最終判断が必要な論点は全体PMへ渡すことでした。制作知識を持つことも、課題を具体化して判断につなげるために役立ちました。</p><div className="reflection-line">Making progress visible,<br/><em>and decisions possible.</em></div></div></section>
   <section className="credits wrap section-grid"><Label n="08">ROLE / CREDITS</Label><div><div className="credits-heading"><h2>私の担当</h2><span>CGインターンチーム10人のPM</span></div><ul>{roles.map((role,i)=><li key={role}><span>{String(i+1).padStart(2,'0')}</span>{role}</li>)}</ul><p className="credit-note">掲載する作品・映像はチームによる成果です。私はCGインターンチームの進行、技術課題の整理、情報共有基盤、一部制作を担当。商品、最終品質、チーム全体に関わる最終判断は全体PMが担当しました。</p></div></section>
  <section className="project-switch wrap"><span className="eyebrow">NEXT PROJECT / 02</span><a href="/knitted-vj-system"><span>Knitted <em>VJ System</em></span><span aria-hidden="true">↗</span></a><p>計算機に、人間のやわらかさを。<br/>構想からTOKYO NODEでの本番運用まで、約1週間。</p></section><ProjectNav current="/"/></main><footer className="wrap"><a className="footer-title" href="#top">X <em>couture</em><span aria-hidden="true">↑</span></a><div><span>VIRTUAL FASHION / 2021–2022</span><a href="#top">ページの先頭へ ↑</a></div></footer>
 </>;
}
