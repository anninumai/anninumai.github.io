import { ProjectNav } from '../project-nav';
import type { Metadata } from 'next';
import './lens.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Lens — 未来の写真日記',
  description: 'まだ知らない選択肢を、自分に関係する未来として想像し、最初の行動へつなげるサービスプロトタイプ。',
};

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{n}</span><span>{children}</span></div>;
}

function Record({ id, alt, children }: { id: string; alt: string; children: React.ReactNode }) {
  return <figure className="lens-record"><a href={`/assets/lens/${id}.png`} target="_blank" rel="noreferrer" aria-label={`${alt}を拡大`}><img src={`/assets/lens/${id}.png`} alt={alt} loading="lazy" /></a><figcaption>{children}</figcaption></figure>;
}

const roles = ['リサーチ・問いの設定', 'コンセプト立案', '体験設計', '写真アルバムのメンタルモデルを用いたUI構造の設計', '写真日記が届くまでの時間設計', 'Prototype 1・2の企画と検証', 'UI・UXデザイン', 'CI・VIデザイン'];

export default function Lens() {
  return <div className="lens-case">
    <a className="skip" href="#overview">本文へ移動</a>
    <header className="site-header" id="top">
      <a className="wordmark" href="/">Portfolio<span className="wordmark-dot">.</span></a>
      <span className="header-caption">PORTFOLIO / CASE STUDY 07</span>
      <a className="header-link" href="/summer">06 — 夏の存在証明 ↗</a>
    </header>
    <main>
      <section className="hero wrap" aria-labelledby="project-title">
        <div className="eyebrow hero-eyebrow"><span>AI × POSSIBLE SELVES</span><span>QWS CHALLENGE / SELECTED PROJECT</span></div>
        <div className="title-row"><h1 id="project-title">Lens</h1><p className="lens-tagline">未来の写真日記から、<br />まだ知らない選択肢に出会う。</p></div>
        <figure className="lens-hero"><img src="/assets/lens/2.png" width={7680} height={4320} alt="Lensの提案資料。未来の情景と、それに近づく行動を表示する画面" fetchPriority="high" /><figcaption>未来の体験画像と、そこへ近づく行動を同じ画面で提示する提案資料。</figcaption></figure>
      </section>

      <section className="overview wrap section-grid" id="overview" aria-label="プロジェクト概要">
        <Label n="01">OVERVIEW</Label>
        <div><p className="intro">自分の写真や関心を手がかりに、まだ経験していない体験を「未来の写真日記」として描き、そこへ近づく行動を提案するサービスプロトタイプです。</p><p className="body-copy">私はリサーチ、コンセプト立案、体験設計、UI・UX、CI・VIを担当。可能性を診断や推薦として示すのではなく、自分に関係する情景として受け取り、選び、行動へ移せるインターフェースを検討しました。</p><dl className="metadata"><div><dt>ROLE</dt><dd>Research / Concept<br />Experience Design / UI・UX</dd></div><div><dt>TEAM</dt><dd>Project Lens</dd></div><div><dt>CONTEXT</dt><dd>QWSチャレンジ<br />第22期 採択</dd></div><div><dt>TYPE</dt><dd>Service Design<br />Prototype</dd></div></dl></div>
      </section>

      <nav className="chapter-nav wrap" aria-label="ページ内の目次"><span className="eyebrow">IN THIS PROJECT</span><div><a href="#aim">プロジェクトの目的</a><a href="#contributions">3つの取り組み</a><a href="#output">アウトプット</a><a href="#reflection">振り返り</a></div></nav>

      <section className="aim wrap section-grid section-space" id="aim">
        <Label n="02">PROJECT AIM</Label>
        <div><p className="english-heading">From possibility.<br /><em>To a personal future.</em></p><h2>情報として知ることと、<br />自分の未来として受け取ることの間を考える。</h2><p className="body-copy lead-copy">人は実際の経験だけでなく、本、映画、他者との会話からも、知らない世界を想像できます。一方で、そこで知った可能性を、自分にも起こり得る未来として受け取れるとは限りません。</p><p className="body-copy">起点になったのは、自分が写った写真と子どもの自己認識の関係を紹介する記事でした。過去の経験を目に見える形で残すことは、自分の可能性の捉え方にどう関わるのか。そこから、まだ経験していない可能性を、自分に関係する未来として想像する方法へ関心を広げました。</p><blockquote className="lens-question"><span className="eyebrow">PROJECT QUESTION</span><p>まだ知らない選択肢を、どうすれば自分に関係する未来として想像し、試すところまで近づけられるか。</p></blockquote><div className="mission"><span className="eyebrow">MY MISSION</span><p>先行研究を手がかりに、未知の選択肢を「未来の写真日記」として提示する体験を構想する。プロトタイプを通して受け取られ方を確かめ、体験を成立させる条件を探りました。</p></div><details className="research-note"><summary>RESEARCH NOTE — 写真と自己効力感をどう扱ったか</summary><div><p>AmmermanとFryrearは小学4年生を対象にセルフフォト活動を行い、行動面の自尊感情には向上が見られた一方、本人が回答する主観的な自尊感情には変化がなかったと報告しています。この研究は、写真を飾るだけで自己効力感が高まることを示したものではなく、自尊感情と自己効力感も異なる概念です。</p><p>Lensでは効果を断定せず、写真と自己認識の関係が着想の起点だったこと、自己効力感は制作を始めた問題関心だったことを区別しています。</p><ul><li><a href="https://doi.org/10.1002/1520-6807%28197507%2912%3A3%3C319%3A%3AAID-PITS2310120315%3E3.0.CO%3B2-X" target="_blank" rel="noreferrer">Ammerman &amp; Fryrear, 1975 ↗</a></li><li><a href="https://doi.org/10.1037/0033-295X.84.2.191" target="_blank" rel="noreferrer">Bandura, 1977 ↗</a></li></ul></div></details></div>
      </section>

      <section className="contributions lens-contributions" id="contributions">
        <div className="contribution-heading wrap"><span className="eyebrow">MY CONTRIBUTIONS</span><p>可能性を体験へ変える、<br /><span>3つの取り組み。</span></p><span className="contribution-total">01 — 03</span></div>

        <article className="contribution wrap section-grid">
          <div className="point-marker"><span className="point-number">01</span><span className="eyebrow">RESEARCH<br />FRAMING</span></div>
          <div><h2>経験の代わりではなく、<br />可能性との距離を変える。</h2><p className="body-copy">本や物語も、経験していない世界を想像する入口になります。そこでLensの目的を、経験そのものの代替ではなく、出会った可能性と自分との心理的な距離を近づけることとして整理しました。</p><p className="body-copy">将来なり得る自分についての表象を扱うPossible Selvesと、自分の未来に起こり得る出来事を具体的に想像するEpisodic Future Thinkingを参照。一般的な体験の推薦を、自分が登場する未来の一場面へ変換する設計仮説にしました。</p><div className="lens-mapping"><span>可能な未来を考える</span><i>↓</i><span>自分に関係する一場面として描く</span><i>↓</i><strong>未来の写真日記として受け取る</strong></div><details className="research-note"><summary>RESEARCH NOTE — Possible Selvesと未来の経験</summary><div><p>Possible Selvesは、将来なり得る姿についての表象を、現在の自己認識や動機と結びつけて捉える考え方です。Episodic Future Thinkingは、自分の未来に起こり得る具体的な経験を想像・シミュレーションする働きを指します。</p><p>これらはLensの効果を証明するものではなく、可能性を自分に関係する情景へ変換する設計の足場として参照しました。</p><ul><li><a href="https://doi.org/10.1037/0003-066X.41.9.954" target="_blank" rel="noreferrer">Markus &amp; Nurius, “Possible Selves,” 1986 ↗</a></li><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5675579/" target="_blank" rel="noreferrer">Schacter, Benoit &amp; Szpunar, 2017 ↗</a></li></ul></div></details><div className="capabilities"><span>RESEARCH</span><span>PROBLEM FRAMING</span><span>CONCEPT DEVELOPMENT</span></div></div>
        </article>

        <article className="contribution wrap section-grid">
          <div className="point-marker"><span className="point-number">02</span><span className="eyebrow">EXPERIENCE<br />DESIGN</span></div>
          <div><h2>写真アルバムのメンタルモデルを、<br />未来探索へ転用する。</h2><p className="body-copy">写真アルバムは、残したい出来事を選び、時間の蓄積として見返すための身近な形式です。Lensでは、この既知のメンタルモデルを未来探索へ転用しました。</p><p className="body-copy">過去の写真を保存する代わりに、まだ経験していない未来の情景を並べる。写真を開くと、その出来事を振り返るような短い日記と、現在からできる行動が現れます。「過去を記録する」という日常行為の時間軸を反転させ、「これから経験したい未来を選び、蓄積する」というInteraction Principleへ変換しました。</p><div className="lens-example"><span className="eyebrow">AIの生成結果ではなく、その前後の体験を設計する</span><p>入力の直後に結果を表示するのではなく、未来の写真日記が届くまでの時間も体験の一部として設計しました。また、生成された情景を次々に流し見るのではなく、本人が惹かれた未来を選び、アルバムへ残し、後から見返せる構造にしています。</p></div><ol className="lens-flow lens-flow-seven"><li><span className="eyebrow">01 / INPUT</span><h3>入力する</h3><p>写真や関心を手がかりとして入力する。</p></li><li><span className="eyebrow">02 / WAIT</span><h3>届くまで待つ</h3><p>待ち時間を、未来から記録が届く時間として扱う。</p></li><li><span className="eyebrow">03 / RECEIVE</span><h3>受け取る</h3><p>未来の情景を、写真と短い日記として受け取る。</p></li><li><span className="eyebrow">04 / INTERPRET</span><h3>解釈する</h3><p>惹かれるか、少し違うかを感じながら自分とのつながりを考える。</p></li><li><span className="eyebrow">05 / SELECT</span><h3>選ぶ</h3><p>生成された候補から、残したい未来を選ぶ。</p></li><li><span className="eyebrow">06 / ACT</span><h3>行動を知る</h3><p>その体験に近づくために、現在からできることを見る。</p></li><li><span className="eyebrow">07 / REVISIT</span><h3>蓄積して見返す</h3><p>アルバムへ残し、自分が何に惹かれているかを振り返る。</p></li></ol><Record id="1" alt="Lensの写真アルバムと写真日記の利用イメージ">写真アルバムと未来の写真日記の詳細画面。待つ、受け取る、選ぶ、行動する、見返すまでを設計。</Record><blockquote className="lens-question"><span className="eyebrow">DESIGN PRINCIPLE</span><p>過去を保存するアルバムを、これから経験したい未来を待ち、選び、蓄積するインターフェースへ。</p></blockquote><div className="lens-example"><span className="eyebrow">画面案の具体例</span><h3>温泉の情景から、訪れる準備へ。</h3><p>温泉を調べる → 場所を選ぶ → 撮影や旅のプランを考える → 友人に相談する</p></div><details className="research-note"><summary>RESEARCH NOTE — 未来画像と行動提案を並べた理由</summary><div><p>未来自己の画像、Possible Selvesと方略の接続、理想化された未来の空想に関する研究を参照し、未来を魅力的に描くだけで終わらず、自分とのつながりと具体的な行動を同時に設計しました。各研究は貯蓄や教育など限定された文脈のものであり、Lensへの効果を直接示すものではありません。</p><ul><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3949005/" target="_blank" rel="noreferrer">Hershfield et al., 2011 ↗</a></li><li><a href="https://pubmed.ncbi.nlm.nih.gov/16834488/" target="_blank" rel="noreferrer">Oyserman, Bybee &amp; Terry, 2006 ↗</a></li><li><a href="https://doi.org/10.1016/j.jesp.2011.02.003" target="_blank" rel="noreferrer">Kappes &amp; Oettingen, 2011 ↗</a></li></ul></div></details><div className="capabilities"><span>MENTAL MODEL</span><span>INTERACTION DESIGN</span><span>EXPERIENCE ARCHITECTURE</span></div></div>
        </article>

        <article className="contribution wrap section-grid">
          <div className="point-marker"><span className="point-number">03</span><span className="eyebrow">PROTOTYPING<br />&amp; REFRAMING</span></div>
          <div><h2>受け取られ方を確かめ、<br />設計を更新する。</h2><div className="prototype-block"><span className="eyebrow">PROTOTYPE 01 / APPROX. 10 PEOPLE</span><p>名前と写真を入力してもらい、生成した未来の場面を見て、その体験を試してみたいと思うかを確認しました。反応は分かれ、人物が本人に十分似ていない、現実には起こりにくい場面が出ると、自分の未来として結びつけにくいケースがありました。</p><ul><li>画像があるだけでは、自分の未来として受け取られるとは限らない</li><li>本人との類似や場面の現実らしさが、受け取り方に関わる可能性がある</li><li>「やってみたいか」だけでは、反応の理由を十分に切り分けられない</li><li>生成結果だけでなく、選び、残し、見返す過程まで設計する必要がある</li></ul></div><div className="prototype-block"><span className="eyebrow">PROTOTYPE 02</span><p>写真だけで未来を推測する構造を見直し、本人が入力する将来像や好みの言葉を加える方向へ変更。さらに、未来の画像だけで終わらせず、その体験に近づく行動を提案する構成へ更新しました。</p></div><Record id="4" alt="QWSチャレンジ期間の活動記録">Prototype 1・2、コンセプト整理、フィードバックの制作記録。</Record><div className="next-hypothesis"><span className="eyebrow">FROM INDIVIDUAL IMAGINATION TO DIALOGUE</span><h3>個人の想像から、他者との対話へ。</h3><p>専門家からのフィードバックを受け、未来を現実とつながったものとして捉えるには、他者との関係も必要ではないかと考えました。友人が写真日記に登場する、互いの日記を交換する、描かれた出来事を一緒に試す。これは未実装・未検証の発展的な設計仮説です。</p></div><details className="research-note"><summary>RESEARCH NOTE — 他者との共有とShared Reality</summary><div><p>Shared Realityは、ある対象について他者と内的な状態を共有していると感じる経験です。Lensでは、未来の写真日記の共有が、個人の想像を社会的な文脈へつなぐかを考える足場として参照しました。</p><ul><li><a href="https://doi.org/10.1111/j.1745-6924.2009.01161.x" target="_blank" rel="noreferrer">Echterhoff, Higgins &amp; Levine, 2009 ↗</a></li></ul></div></details><div className="capabilities"><span>PROTOTYPING</span><span>EVALUATION</span><span>REFRAMING</span></div></div>
        </article>
      </section>

      <section className="output-section lens-output" id="output"><div className="wrap"><div className="output-heading"><Label n="06">OUTPUT</Label><div><p className="english-heading">From an unknown option.<br /><em>To a possible experience.</em></p><h2>QWSで提案・検証した、<br />未来の写真日記のプロトタイプ。</h2></div></div><p className="lens-output-copy">QWSチャレンジ第22期に採択され、Prototype 1・2の制作、約10人への探索的な検証、専門家からのフィードバックを行いました。未来の写真日記、その詳細、行動提案、複数の未来を蓄積するアルバム画面を設計。効果を実証した完成サービスではなく、未来の可能性を自分との関係として受け取る条件を検討したプロトタイプです。</p><div className="lens-output-grid"><Record id="1" alt="Lensの画面設計">未来の写真日記、行動提案、アルバムの画面設計。</Record><Record id="4" alt="Lensの制作プロセス">試作、検証、フィードバックの記録。</Record></div></div></section>

      <section className="reflection wrap section-grid section-space" id="reflection"><Label n="07">REFLECTION</Label><div><h2>未来の生成ではなく、<br />受け取り方を設計する。</h2><p className="body-copy">生成された画像があるだけでは、その未来を自分のこととして受け取れるとは限りません。本人との類似、場面の現実らしさ、入力する言葉、写真日記が届くまでの時間。未来と現在の間には、受け取り方を左右する複数の条件がありました。</p><p className="body-copy">Lensでは、AIによる画像生成の前後に、待つ、受け取る、選ぶ、行動を知る、アルバムへ残す、見返すという体験を設計しました。</p><p className="body-copy">写真アルバムという既知のメンタルモデルを未来探索へ転用することで、生成された未来を一度見るだけの情報ではなく、自分がこれから経験したいことを選び、蓄積する対象として扱ったプロジェクトです。</p></div></section>

      <section className="credits wrap section-grid"><Label n="08">ROLE / CREDITS</Label><div><div className="credits-heading"><h2>私の担当</h2><span>Project Lens</span></div><ul>{roles.map((role, i) => <li key={role}><span>{String(i + 1).padStart(2, '0')}</span>{role}</li>)}</ul><p className="credit-note">掲載している効果は実証結果ではありません。先行研究は設計仮説の根拠、約10人への試作は受け取られ方を探る探索的な検証として記載しています。</p></div></section>
      <ProjectNav current="/lens" />
    </main>
    <footer className="wrap"><a className="footer-title" href="/summer">夏の存在証明<span aria-hidden="true">↗</span></a><div><span>PREVIOUS PROJECT / 06</span><a href="#top">ページの先頭へ ↑</a></div></footer>
  </div>;
}
