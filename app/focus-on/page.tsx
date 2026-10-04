import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ProjectNav } from '../project-nav';
import './focus.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Focus on — 疲れの記録・共有を見直すUX/UI改善',
  description: '既存ユーザーへのリサーチから、機能の優先順位、画面遷移、UIとプロトタイプまで。既存アプリのUX/UI改善提案。',
};
const base = '/assets/focus-on/';
function Label({ n, children }: { n: string; children: ReactNode }) {
  return <div className="section-label"><span>{n}</span><span>{children}</span></div>;
}
function Crop({ src, alt, box }: { src: string; alt: string; box: [number, number, number, number] }) {
  const [x,y,w,h] = box;
  return <div className="focus-crop" style={{aspectRatio: `${w}/${h}`}}><img src={base+src} alt={alt} loading="lazy" style={{width:`${2048/w*100}%`,left:`${-x/w*100}%`,top:`${-y/h*100}%`}} /></div>;
}
function Evidence({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="focus-evidence">{children}<figcaption>{caption}</figcaption></figure>;
}
const chapters = [['direction','プロジェクトの目的'],['research','リサーチ'],['design','3つの取り組み'],['output','アウトプット'],['validation','実装状況と担当範囲'],['reflection','振り返り']];
export default function FocusOn() {
 return <div className="focus-case">
  <a className="skip" href="#overview">本文へ移動</a>
  <header className="site-header" id="top"><a className="wordmark" href="/">Portfolio<span className="wordmark-dot">.</span></a><span className="header-caption">PORTFOLIO / CASE STUDY 08</span><a className="header-link" href="/lens">07 — Lens ↗</a></header>
  <main>
   <section className="hero wrap" aria-labelledby="project-title">
    <div className="eyebrow hero-eyebrow"><span>HEALTHCARE × COMMUNICATION</span><span>2023</span></div>
    <div className="title-row"><h1 id="project-title">Focus <em>on</em></h1><div className="hero-category">Healthcare App<span>UX/UI DESIGN</span></div></div>
    <figure className="hero-figure"><div className="hero-picture"><img src={base+'hero-onomatopoeia.webp'} alt="Focus onのキャラクターと、疲れの記録・振り返り・共有画面" width="2238" height="1254" fetchPriority="high" /></div><figcaption><span className="figure-no">FIG. 01</span><span>Focus on — 疲れの記録・共有を支えるUX/UI改善提案。</span></figcaption></figure>
   </section>
   <section className="overview wrap section-grid" id="overview" aria-label="プロジェクト概要">
    <Label n="01">OVERVIEW</Label>
    <div><p className="intro">日々の疲れを記録し、信頼できる相手へ共有するアプリ「Focus on」のUX/UI改善を担当しました。</p><p className="body-copy">事前調査と既存ユーザーへのヒアリングから、疲れを認識・言語化することに加え、周囲へ共有することにも大きなハードルがあると整理。代表と機能をA・B・Dに分類し、共有を始めるための機能群を優先度Aとして設計しました。優先度Aの機能群は実装済みです。</p>
    <div className="focus-award"><span className="eyebrow">AWARD</span><a href="https://cvg.nikkan.co.jp/osaka/oosaka_backnumber_2022" target="_blank" rel="noreferrer">第24回キャンパスベンチャーグランプリ大阪<br /><strong>最優秀賞受賞</strong> <span aria-hidden="true">↗</span></a><p>「発達障害児者支援アプリFocus on」の事業プランとしてチームで受賞。</p></div>
    <dl className="metadata"><div><dt>PERIOD</dt><dd>2023.06–12</dd></div><div><dt>ROLE</dt><dd>ユーザーリサーチ<br />UX・UI設計</dd></div><div><dt>RESEARCH</dt><dd>既存ユーザーへの<br />ヒアリング</dd></div><div><dt>STATUS</dt><dd>共有を支える機能を実装済み<br />掲載資料は設計時のもの</dd></div></dl></div>
   </section>
   <section className="focus-logic wrap" aria-labelledby="focus-logic-title">
    <div className="focus-logic-heading"><span className="eyebrow">DECISION FLOW</span><h2 id="focus-logic-title">調査から、優先順位と実装へ。</h2></div>
    <ol>
     <li><span>01 / 調査</span><strong>疲れを伝えるまでの行動を調べる</strong><p>事前調査と既存ユーザーへのヒアリングから、利用状況と困りごとを整理。</p></li>
     <li><span>02 / 発見</span><strong>「共有」まで進めないハードルを特定</strong><p>疲れに気づき、言葉にし、相手へ伝えるまでの各段階に負担があると捉えた。</p></li>
     <li><span>03 / 判断</span><strong>共有を支える機能群を、優先度Aに</strong><p>代表と機能をA・B・Dに分類。短い投稿や共有相手の選択などを優先した。</p></li>
     <li className="focus-logic-result"><span>04 / 結果</span><strong>優先度Aの機能群を実装</strong><p>私はリサーチ、優先順位づけ、サイトマップ、UIとプロトタイプを担当。コード実装はチームが担当した。</p></li>
    </ol>
   </section>
   <nav className="chapter-nav wrap" aria-label="ページ内の目次"><span className="eyebrow">IN THIS PROJECT</span><div>{chapters.map(([id,title],i)=><a key={id} href={'#'+id}>{String(i+1).padStart(2,'0')} {title}</a>)}</div></nav>
   <section className="focus-direction" id="direction"><div className="wrap section-grid"><Label n="02">PROJECT AIM</Label><div>
    <h2>「詳しく記録してから共有する」から、<br />「言葉が整う前でも共有できる」へ。</h2>
    <p className="body-copy">記録を詳細にするだけでは、言語化や共有のハードルは残ります。そこで、従来の記録フローに加え、短い言葉でも状態を残せる分報を提案。入力・振り返り・共有のそれぞれで、ユーザーに求める負担を見直しました。</p>
    <ol className="focus-principles"><li><span>入力</span>正確な感情名を求めず、感覚に近い表現から選ぶ。</li><li><span>振り返り</span>最初から詳細を見せず、全体像から伝える。</li><li><span>共有</span>内容の完成度より、本人が伝えられることを優先する。</li></ol>
    <details className="focus-details"><summary>体験フローと機能の優先順位を見る</summary><Evidence caption="疲れの入力から共有、反応の受け取りまでをカスタマージャーニーで整理。"><Crop src="journey.webp" alt="カスタマージャーニー" box={[593,418,747,193]} /></Evidence><Evidence caption="ユーザー課題を機能要件に展開し、優先順位を整理。"><Crop src="requirements.webp" alt="機能の優先順位" box={[176,463,778,510]} /></Evidence></details>
   </div></div></section>
   <section className="wrap section-grid focus-section" id="research"><Label n="03">RESEARCH</Label><div>
    <h2>疲れを記録するまでにも、<br />誰かへ伝えるまでにも、ハードルがあった。</h2>
    <p className="body-copy">代表の「自分の疲れが分からない人がいる」という問題意識を起点に、文献やユーザー投稿を調べ、疲れの認識・言語化・共有・自己管理のハードルを整理しました。既存ユーザーにはアプリの利用状況や困りごとを聞き、機能案やUIへの意見も集めました。</p>
    <div className="focus-findings">
     <div><span>01</span><h3>気づきにくい</h3><p>眠気やイライラなどの変化を、疲れとして自覚しにくい。</p></div>
     <div><span>02</span><h3>言葉にしにくい</h3><p>「つらい」「しんどい」以外の表現が浮かばず、入力をためらう。</p></div>
     <div><span>03</span><h3>伝えにくい</h3><p>送るタイミングや内容に自信が持てず、支援者への共有をためらう。</p></div>
    </div>
    <p className="focus-insight">詳しく説明できることよりも、<br /><strong>言葉にならない状態を、誰かに受け止めてほしい。</strong></p>
    <p className="focus-note">事前調査、ユーザーヒアリング、代表との対話を踏まえた設計上の解釈です。発言の直接引用や、すべての利用者への一般化ではありません。</p>
    <Evidence caption="背景の整理：本人が感じるつらさと、周囲から見える困りごとのズレ。既存ポートフォリオ掲載資料より。"><Crop src="context-gap.webp" alt="本人の痛みと周囲の認識のズレを図解したリサーチ背景" box={[1028,16,1020,578]} /></Evidence>
    <div className="focus-research-proof">
     <h3>事前調査をもとに、聞く内容と進め方を準備。</h3>
     <div className="focus-research-documents">
      <Evidence caption="事前調査・アイデア整理：疲れの背景を調べ、支援の方向性と機能案を書き出した検討資料。医学的な結論や推奨を示すものではありません。"><a href={base+'research-fatigue.webp'} target="_blank" rel="noreferrer" aria-label="疲れの背景に関する検討資料を拡大"><img src={base+'research-fatigue.webp'} width="1768" height="1442" loading="lazy" alt="感覚、思考、運動に関する疲れの背景と、支援・機能のアイデアを整理した資料" /></a></Evidence>
      <Evidence caption="課題の分解：自己認識・言語化・共有・自己管理のハードルと、想定する利用者像を整理。資料中の中高生は検討対象の記述であり、ヒアリング参加者全員の属性ではありません。"><a href={base+'research-barriers.webp'} target="_blank" rel="noreferrer" aria-label="課題と利用者像の整理資料を拡大"><img src={base+'research-barriers.webp'} width="2002" height="1856" loading="lazy" alt="疲れに関する4つのハードルと利用者像を整理した資料" /></a></Evidence>
     </div>
     <p className="body-copy">疲れとはどのような状態か、何が記録や共有の妨げになるかを調べ、質問項目を整理しました。既存アプリがどのように使われているか、求められる機能的・情緒的な価値は何かを確かめることを、ヒアリングの目的に置きました。</p>
     <ul className="focus-interview-method"><li>質問の数と、後からテキストでも回答できることを事前に共有。</li><li>回答の負担が大きい場合は、優先する質問に絞る。</li><li>答えに詰まったら、別の質問に移るか、後日回答する方法を提示。</li><li>誘導しすぎないよう、追加質問はオープンな聞き方を意識。</li></ul>
     <Evidence caption="ヒアリングの準備資料：目的、質問の進め方、回答方法の選択肢を事前に整理。"><a href={base+'interview-guidelines.webp'} target="_blank" rel="noreferrer" aria-label="ヒアリングの目的と進め方の資料を拡大"><img src={base+'interview-guidelines.webp'} width="1284" height="418" loading="lazy" alt="ヒアリングの目的と、後日回答や質問の切り替えなどの進行ルール" /></a></Evidence>
    </div>
    <div className="focus-research-proof">
     <h3>機能とUIを見せながら、意見を聞く。</h3>
     <p className="body-copy">既存アプリの利用状況や不便な点を聞くとともに、機能案とヒアリング用プロトタイプを提示。記録・共有・ログ・カレンダーなどの画面を用いて、必要な機能や見せ方について意見を聞きました。</p>
     <p className="body-copy">ラフ画面を代表と確認しながら、スピードを重視して設計を具体化しました。操作課題の達成率を測る比較テストではなく、機能・UIへの意見を聞き、方針を検討するためのプロトタイプです。</p>
     <Evidence caption="ヒアリング用プロトタイプ。機能の説明を添え、画面を使って意見を聞くために制作。"><img src={base+'hearing-prototype.webp'} alt="トップ、共有、ログ、カレンダーの画面と機能説明" width="1988" height="1072" loading="lazy" /></Evidence>
    </div>
    <div className="focus-research-proof">
     <h3>共有を支える機能群を、優先度Aに。</h3>
     <p className="body-copy">調査から、疲れを認識するだけでなく、言葉にして周囲へ伝えることにもハードルがあると整理しました。そこで、十分に説明できなくても共有を始められることを重視。代表と機能をA・B・Dに分類し、短い記録・投稿・共有に関わる機能群を優先度Aとしました。</p>
     <Evidence caption="共有を重視して機能の優先順位を整理し、サイトマップへ展開。資料のAは実装済みの機能群。"><Crop src="requirements.webp" alt="A・B・Dに分類した機能の優先順位" box={[176,463,778,510]} /></Evidence>
    </div>
   </div></section>
   <section className="wrap focus-section" id="design">
    <div className="focus-design-heading"><Label n="04">MY CONTRIBUTIONS</Label><h2>リサーチを、3つのUI改善へ。</h2></div>
    <div className="focus-decision-summary" aria-label="課題とUI改善の対応">
     <h3>何を変え、なぜ変えたか</h3>
     <dl>
      <div><dt>言葉にする負担</dt><dd>文章や感情名での入力だけに頼らず、感覚に近いオノマトペを選べるUIへ。</dd></div>
      <div><dt>グラフの読み取りにくさ</dt><dd>複数の感情を並列に見せる構成から、疲れの総量を先に見せ、内訳を切り替える構成へ。</dd></div>
      <div><dt>共有へのためらい</dt><dd>詳しい記録に加え、一言から投稿できる分報と、投稿ごとに共有相手を選ぶ導線を提案。</dd></div>
     </dl>
     <p className="focus-note">インタビューと既存UIの課題整理に基づく設計判断です。以下に、各改善案の画面と意図を示します。</p>
    </div>
    <article className="section-grid focus-design-item"><div className="point-marker"><span className="point-number">01</span><span className="eyebrow">INPUT</span></div><div>
     <h2>感情の名前が分からなくても、入力できる。</h2><p className="body-copy">「疲れ」「悲しみ」といった感情名に当てはめる代わりに、「ずーん」「もやもや」「むかむか」など、感じた状態に近いオノマトペを選ぶUIを設計しました。文章を組み立てる前でも入力を始められることを狙っています。</p>
     <div className="focus-input-layout"><Evidence caption="そのときの感覚に近い言葉をタップして選択。"><img src={base+'onomatopoeia.webp'} alt="オノマトペを選択する画面" loading="lazy" /></Evidence><div className="focus-design-note"><span className="eyebrow">DESIGN DECISION</span><h3>「説明する」前に、<br />「選ぶ」から始める。</h3><p>感情の言語化にかかる負担を考慮し、入力の手がかりを画面上に用意しました。</p><p className="focus-note">認知的な負担に配慮した設計意図であり、アクセシビリティ基準への適合を検証したものではありません。</p></div></div>
    </div></article>
    <article className="section-grid focus-design-item"><div className="point-marker"><span className="point-number">02</span><span className="eyebrow">REFLECTION</span></div><div>
     <h2>疲れているときに、<br />読み解く情報を増やさない。</h2><p className="body-copy">従来の感情グラフは、複数の感情が並び、何を見ればよいかが分かりにくい状態でした。まず疲れの総量を示し、必要なときだけ内訳に切り替える構成へ変更。日ごとの気分と合わせて、自分の傾向を振り返れる画面を提案しました。</p>
     <div className="focus-compare">
      <Evidence caption="従来画面：複数の感情を並列に表示。"><span className="focus-image-label">BEFORE</span><Crop src="information-hierarchy.webp" alt="従来の感情グラフ" box={[674,659,309,326]} /></Evidence>
      <Evidence caption="改善案：最初は疲れの総量を表示。"><span className="focus-image-label">AFTER / 全体</span><Crop src="information-hierarchy.webp" alt="改善案の疲れの総量グラフ" box={[1174,643,375,312]} /></Evidence>
      <Evidence caption="改善案：知りたいときに内訳へ切り替え。"><span className="focus-image-label">AFTER / 詳細</span><Crop src="information-hierarchy.webp" alt="改善案の疲れの内訳グラフ" box={[1570,643,377,312]} /></Evidence>
     </div>
    </div></article>
    <article className="section-grid focus-design-item"><div className="point-marker"><span className="point-number">03</span><span className="eyebrow">SHARING</span></div><div>
     <h2>「疲れた」の一言から、共有を始められる。</h2><p className="body-copy">SNSのように短い言葉を残せる分報を設計。気持ちを詳しく説明できない段階でも投稿でき、投稿ごとに共有する相手を本人が選べるフローにしました。</p>
     <div className="focus-share-pair"><Evidence caption="短文で状態を残せる分報。コメントはダブルタップで内容を確認する設計。"><Crop src="sharing-insight.webp" alt="分報の投稿と支援者のコメント" box={[1057,578,410,553]} /></Evidence><Evidence caption="共有相手を投稿ごとに選び、伝える範囲を本人が決める。"><Crop src="share-flow.webp" alt="共有相手の選択画面" box={[70,49,840,1775]} /></Evidence></div>
     <div className="focus-feedback"><h3>共有した後の、反応を待つ時間にも配慮。</h3><p>支援者がすぐに反応できない場合を想定し、Focusくんからの声かけを用意。支援者も長い文章や大きな反応を求められず、スタンプで応答できる仕組みを提案しました。</p></div>
     <div className="focus-alert"><h3>助けを求めたいときは、選択式で伝える。</h3><p>ユーザー自身がアラートを出す場面では、理由・希望する対応・共有相手を順に選ぶフローを設計。文章で説明する余裕がないときにも、意思を伝えられることを目指しました。</p><div className="focus-alert-grid">{[[75,'理由を選ぶ'],[584,'希望する対応を選ぶ'],[1094,'共有相手を選ぶ'],[1603,'完了を確認する']].map(([x,title],i)=><Evidence key={String(title)} caption={`0${i+1} ${title}`}><Crop src="alert-flow.webp" alt={String(title)} box={[Number(x),250,404,875]} /></Evidence>)}</div><p className="focus-note">ユーザーが開始するアラートの設計案です。投稿から危険な状態を自動検知する機能を示すものではありません。</p></div>
    </div></article>
   </section>
   <section className="output-section focus-output" id="output"><div className="wrap"><div className="section-grid"><Label n="05">OUTPUT</Label><div><h2>個別の改善を、<br />アプリ全体の画面と導線へつなぐ。</h2><p className="body-copy">入力・振り返り・共有の改善を、トップ、ログ、カレンダー、記録、共有、アラートなどの画面へ展開。画面構成と遷移フローを整理し、プロトタイプとしてまとめました。</p></div></div><Evidence caption="主要画面の一覧。記録から共有までの一連の体験を設計。"><Crop src="screens.webp" alt="基本登録、ホーム、カレンダー、ログ、記録、アラートの主要画面一覧" box={[551,479,1421,526]} /></Evidence><details className="focus-details"><summary>画面構成と機能要件の資料を見る</summary><Evidence caption="機能要件を画面構成と遷移に落とし込んだサイトマップ。"><Crop src="requirements.webp" alt="アプリのサイトマップ" box={[1040,444,864,683]} /></Evidence><a className="focus-source-link" href={base+'annotated-prototype.webp'} target="_blank" rel="noreferrer">機能要件を記載したプロトタイプ資料を開く ↗</a></details></div></section>
   <section className="wrap section-grid focus-section" id="validation"><Label n="06">STATUS / SCOPE</Label><div><h2>優先度Aの機能群を、実装へ。</h2><p className="body-copy">調査で見つけた共有のハードルをもとに、状態を十分に説明できなくても周囲へ伝えられる機能群を優先度Aとして設計。短い記録・投稿・共有を支える機能は、チームによって実装されました。私は、事前調査、ヒアリング、機能の検討と優先順位づけ、サイトマップ・UI・プロトタイプの制作を担当しています。</p><p className="focus-note">掲載画像は設計時の資料です。現在の実装画面との完全一致や、B・Dの実装状況を示すものではありません。また、実装後の利用率・継続率や心理的な効果の検証結果は掲載していません。</p></div></section>
   <section className="wrap section-grid focus-section focus-reflection" id="reflection"><Label n="07">REFLECTION</Label><div><h2>ユーザーが表現できる範囲から、<br />体験を組み立てる。</h2><p className="body-copy">詳細な記録を求めることが、必ずしも使いやすさにつながるわけではありません。今回のリサーチでは、言語化の難しさに加え、共有へのためらいや反応を待つ不安まで捉え、設計で扱う必要があると考えました。</p><p className="body-copy">入力方法、情報の見せ方、共有相手の選択、共有後の応答を一続きの体験として設計したことが、このプロジェクトでの私の取り組みです。</p></div></section>
   <section className="credits wrap section-grid"><Label n="08">ROLE / CREDITS</Label><div><div className="credits-heading"><h2>私の担当</h2><span>UX/UI DESIGNER</span></div><ul>{['文献・ユーザー投稿の分析','既存ユーザーへのヒアリング','課題・インサイトの整理','カスタマージャーニーの作成','機能提案・優先順位づけ','サイトマップ・画面遷移の設計','主要画面のUI制作','機能・UIのヒアリング'].map((role,i)=><li key={role}><span>{String(i+1).padStart(2,'0')}</span>{role}</li>)}</ul><p className="credit-note">機能の優先順位は代表と共同で検討しました。コード実装は私の担当範囲には含めていません。</p></div></section>
   <ProjectNav current="/focus-on" />
  </main><footer className="wrap"><a className="footer-title" href="/lens">Lens ↗</a><div><span>PREVIOUS PROJECT / 07</span><a href="#top">ページの先頭へ ↑</a></div></footer>
 </div>;
}
