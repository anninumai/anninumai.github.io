import type { Metadata } from 'next';
import { ProjectNav } from '../project-nav';
import './persol.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'PERSOL — AI転職体験のデザイン',
  description: '大規模AI転職サービスの文脈から、独立URL型AI面接、AIキャラクターとのインタラクション、将来構想までを扱ったプロダクトデザインのケーススタディ。',
};

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{n}</span><span>{children}</span></div>;
}

function Caption({ no, children }: { no: string; children: React.ReactNode }) {
  return <figcaption><span className="figure-no">FIG. {no}</span><span>{children}</span></figcaption>;
}

const credits = [
  '独立URL型AI面接のUX/UI検討・デザイン提案',
  '面接フロー、状態、正常系・例外系の整理',
  'ローディング、通知、発話状態の複数案制作',
  '親サービスのジャーニー分析・改善提案支援',
  'AIキャラクターとUIインタラクションの調査・提案',
  'ディレクター監修下でのブランドデザイン提案・制作',
  '将来のサービス・ブランド体験のコンセプト提案',
  '別AI面接サービスのリサーチ計画・資料制作・キャラクター方向性提案',
];

export default function PersolCase() {
  return <div className="persol-case">
    <a className="skip" href="#overview">本文へ移動</a>
    <header className="site-header" id="top">
      <a className="wordmark" href="/" aria-label="作品一覧へ戻る">Portfolio<span className="wordmark-dot">.</span></a>
      <span className="header-caption">PORTFOLIO / CASE STUDY</span>
      <a className="header-link" href="/x-couture">X couture <span aria-hidden="true">↗</span></a>
    </header>

    <main>
      <section className="hero wrap" aria-labelledby="project-title">
        <div className="eyebrow hero-eyebrow"><span>AI × CAREER EXPERIENCE</span><span>8 MONTHS</span></div>
        <div className="title-row">
          <h1 id="project-title">PERSOL<br/><em>AI転職サービス</em></h1>
          <div className="hero-category">UX/UI Design<br/>AI Interaction<span>RESEARCH · CONCEPT DESIGN</span></div>
        </div>
        <figure className="hero-figure persol-banner">
          <img src="/assets/persol/hero-together.webp" width="1672" height="941" fetchPriority="high" alt="We're in this together — あなたと、いつも、いつまでも一緒に。AIキャラクターMikaのブランドビジュアル" />
        </figure>
        <figure className="hero-figure project-map-figure" aria-labelledby="project-map-title">
          <div className="project-map">
            <div className="project-map-heading">
              <span>PROJECT STRUCTURE</span>
              <h2 id="project-map-title">プロジェクト全体の構成</h2>
              <p>約8カ月の中で関わった、4つの領域</p>
            </div>
            <div className="project-map-body">
              <div className="project-map-main">
                <div className="map-parent-title"><span>親サービス</span><strong>大規模AI転職サービス</strong></div>
                <div className="map-main-grid">
                  <div className="map-card map-card-core"><span>01 / MAIN</span><strong>独立URL型<br/>AI面接</strong><p>UX/UI・状態設計<br/>アクセシビリティ検討</p><b>デザイン担当</b></div>
                  <div className="map-card"><span>02 / SUPPORT</span><strong>親サービスの<br/>体験設計支援</strong><p>ジャーニー分析<br/>キャラクター×UI提案</p><b>リードデザイナーを支援</b></div>
                  <div className="map-card"><span>03 / VISION</span><strong>将来の<br/>サービス構想</strong><p>ブランド体験<br/>コンセプト提案</p><b>三者協業</b></div>
                </div>
              </div>
              <div className="map-separator" aria-hidden="true"><span>＋</span></div>
              <div className="map-card map-card-research"><span>04 / SEPARATE SERVICE</span><strong>別のAI面接<br/>サービス</strong><p>外見・振る舞いの調査<br/>キャラクター方向性の提案</p><b>リサーチ〜提案を担当</b></div>
            </div>
          </div>
          <Caption no="01">SCOPE — 親サービス、独立URL型AI面接、将来構想、別AI面接サービス。</Caption>
        </figure>
      </section>

      <section className="overview wrap section-grid" id="overview" aria-label="プロジェクト概要">
        <Label n="01">OVERVIEW</Label>
        <div>
          <p className="intro">大規模AI転職サービスに関連する複数の体験設計に、約8カ月間Product Designerとして参加。独立URL型AI面接ではデザイン担当として、接続確認から面接完了までのUX/UIを検討し、複数の選択肢と判断材料をつくりました。</p>
          <dl className="metadata">
            <div><dt>PERIOD</dt><dd>約8カ月</dd></div>
            <div><dt>ROLE</dt><dd>Product Designer<br/>UX/UI・提案</dd></div>
            <div><dt>TEAM</dt><dd>PERSOL Career<br/>社内外デザインチーム</dd></div>
            <div><dt>FIELD</dt><dd>AI Career<br/>Interaction Design</dd></div>
          </dl>
        </div>
      </section>

      <nav className="chapter-nav wrap" aria-label="ページ内の目次">
        <span className="eyebrow">IN THIS PROJECT</span>
        <div><a href="#aim">プロジェクトの目的</a><a href="#contributions">3つの取り組み</a><a href="#research">AI面接官研究</a><a href="#output">アウトプット</a><a href="#reflection">振り返り</a></div>
      </nav>

      <section className="aim wrap section-grid section-space" id="aim">
        <Label n="02">PROJECT AIM</Label>
        <div>
          <h2>親サービスとつながる、<br/>AI面接のUX/UIを設計する。</h2>
          <p className="body-copy lead-copy">仕様が変化する新規サービスにおいて、親サービスとの整合性を保ちながら、独立URL上で成立するAI面接体験を検討しました。</p>
          <p className="body-copy">面接は、接続や録画の失敗が選考に影響すると感じられやすい、失敗許容度の低い利用場面です。一つの完成案だけを示すのではなく、状態、アニメーション、通知方法などの選択肢を可視化し、意図と判断理由を説明しながら関係者と方向性を決めました。</p>
          <div className="condition-grid" aria-label="プロジェクトの条件">
            {['仕様が変化する新規サービス','親サービスと独立URLの整合','失敗許容度の低い面接体験','複数ステークホルダーとの協働'].map((item,i)=><div key={item}><span>0{i+1}</span><strong>{item}</strong></div>)}
          </div>
          <div className="mission"><span className="eyebrow">MY MISSION</span><p>接続確認、面接中の状態表示、待ち時間、通知のUI案を制作。各案の違いと意図を説明し、PERSOL CareerのPMやプロジェクトメンバーとのレビューを通じてデザインを具体化しました。</p></div>
        </div>
      </section>

      <section className="contributions" id="contributions">
        <div className="contribution-heading wrap"><span className="eyebrow">MY CONTRIBUTIONS</span><p>人とAIの関係をつくる、<br/><span>3つの設計領域。</span></p><span className="contribution-total">01 — 03</span></div>

        <article className="contribution wrap section-grid" id="interview">
          <div className="point-marker"><span className="point-number">01</span><span className="eyebrow">INTERVIEW<br/>EXPERIENCE</span></div>
          <div>
            <h2>AI面接のUX/UI設計</h2>
            <div className="copy-columns"><p>接続テストから複数の面接シナリオ、完了までに必要な画面と状態を整理。マイク、カメラ、発話、接続、録画、アップロードなど、AI面接特有の状態と例外をUIとして検討しました。</p><p>待ち時間にアニメーションを出すか、進行状態をどう示すか、通知をどこに表示するか。複数案を制作し、候補者の不安、情報の分かりやすさ、アクセシビリティ、親サービスとの整合性を説明しながら方向性を決めました。</p></div>

            <section className="accessibility-study" aria-labelledby="accessibility-title">
              <div className="accessibility-heading">
                <span className="eyebrow">UI / ACCESSIBILITY REVIEW</span>
                <h3 id="accessibility-title">UIとアクセシビリティの検討</h3>
                <p>現在地の分かりやすさ、読みやすさ、強調の強さ、親サービスとの統一感を軸に検討。配置や色の強弱、状態表示、アニメーションを具体的な案にし、レビューを通じて一つずつ決定しました。</p>
              </div>
              <article className="ui-decision ui-decision-main">
                <h4>01　進行状況と現在地の表示</h4>
                <p>カードの分け方、面の色、左側の進行ライン、完了マークを変えた案を比較しました。採用案では、矢印状のラインで工程の流れを示し、現在の工程を鮮やかなピンクで強調。完了した工程は強調を抑え、チェックマークを添えて、現在地と区別しました。</p>
                <p>注目してほしい工程に強調を絞り、次に進むボタンと合わせて、今取り組む内容を見つけやすくする意図です。</p>
                <div className="ui-evidence-pair">
                  <figure><a href="/assets/persol/interview-states.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/interview-states.webp" width="1948" height="1930" loading="lazy" alt="比較案 — カード構成、進行ライン、色の強弱を比較。"/></a><Caption no="02">比較案 — カード構成、進行ライン、色の強弱を比較。</Caption></figure>
                  <figure><a href="/assets/persol/interview-selected.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/interview-selected.webp" width="1546" height="1106" loading="lazy" alt="採用案 — 接続テストは完了、現在地は面接シナリオ1。"/></a><Caption no="02-B">採用案 — 接続テストは完了、現在地は面接シナリオ1。</Caption></figure>
                </div>
              </article>
              <article className="ui-decision ui-decision-main">
                <h4>02　接続待ちのアニメーション</h4>
                <p>接続時に約7秒の待ち時間が発生すると共有を受け、点のアニメーション、吹き出しに絵文字を出す案、横長のラインに沿ってアバターが進む案を制作しました。</p>
                <p>PC画面での見つけやすさと動きの伝わりやすさ、待っている間の退屈さへの配慮から、横長のラインを使う案を採用。アバターが素早く前へ進む動きと、笑顔でゆっくり歩く動きで、待機中にも変化と親しみやすさを持たせることを意図しました。</p>
                <figure><a href="/assets/persol/loading-states.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/loading-states.webp" width="2052" height="1750" loading="lazy" alt="待機表示の比較 — 赤枠の、横長のラインに沿ってアバターが進む案を採用。"/></a><Caption no="05">待機表示の比較 — 赤枠の、横長のラインに沿ってアバターが進む案を採用。</Caption></figure>
              </article>
              <div className="ui-support-group">
              <article className="ui-decision ui-decision-support">
                <h4>接続確認と発話状態の表示</h4>
                <p>本番前のマイク・カメラ確認と、面接中の発話可能・発話中・発話不可の表示を検討しました。マイクアイコンは、関連する注意書きと一緒に確認できるよう、画面中央の注意書き付近に配置。状態と説明を近くにまとめました。</p>
                <details className="ui-support-details"><summary>接続確認・発話状態の資料を見る</summary><div className="ui-evidence-pair">
                  <figure><a href="/assets/persol/device-check.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/device-check.webp" width="2940" height="876" loading="lazy" alt="接続確認 — マイクとカメラを本番前に確認する画面。"/></a><Caption no="03">接続確認 — マイクとカメラを本番前に確認する画面。</Caption></figure>
                  <figure><a href="/assets/persol/speaking-states.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/speaking-states.webp" width="2528" height="1304" loading="lazy" alt="発話状態 — マイクアイコンの状態と配置を検討。"/></a><Caption no="04">発話状態 — マイクアイコンの状態と配置を検討。</Caption></figure>
                </div></details>
              </article>
              <article className="ui-decision ui-decision-support">
                <h4>正常・エラー時の通知</h4>
                <p>接続完了、アップロード完了、接続中断など、正常時・エラー時の通知UIを提案しました。状態を簡潔に伝える構成とし、文言はPERSOL Careerに確認いただきながら調整しました。</p>
                <details className="ui-support-details"><summary>通知の資料を見る</summary><figure><a href="/assets/persol/notifications.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/notifications.webp" width="1946" height="1408" loading="lazy" alt="通知の提案 — 正常・エラー時の表示と文言を整理。"/></a><Caption no="06">通知の提案 — 正常・エラー時の表示と文言を整理。</Caption></figure></details>
              </article>
              </div>
              <article className="ui-decision ui-decision-foundations">
                <h4>共通の前提：カラートーンとデザインルール</h4>
                <p>情報の識別しやすさと、緊張や圧迫感を与えにくい見せ方を意図して、配色と強調の強さを比較しました。親サービスとの統一感も踏まえ、ディレクター監修下でカラー・タイポグラフィ・UIの提案と制作を行いました。</p>
                <details className="ui-support-details"><summary>配色の比較と共通ルールを見る</summary><figure><a href="/assets/persol/color-rationale.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/color-rationale.webp" width="1772" height="1378" loading="lazy" alt="カラートーン比較 — 情報の見やすさと画面の印象を検討。"/></a><Caption no="07">カラートーン比較 — 情報の見やすさと画面の印象を検討。</Caption></figure>
                <figure><a href="/assets/persol/brand-system.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/brand-system.webp" width="3140" height="1006" loading="lazy" alt="共通ルール — ネーミング、ロゴ、Mikaの造形は別担当。"/></a><Caption no="07-B">共通ルール — ネーミング、ロゴ、Mikaの造形は別担当。</Caption></figure>
                </details>
              </article>
            </section>
            <div className="review-note"><span className="eyebrow">MY ROLE / DESIGN REVIEW</span><p>私は比較案の制作、提案資料の作成、レビューでの説明、修正を担当。PERSOL CareerのPMやプロジェクトメンバーと各案を比較し、意見を受けて修正しながらデザインを具体化しました。</p><p>掲載内容は設計時の比較と判断です。アクセシビリティ基準への適合や離脱率の改善を実証したものではありません。待機アニメーションは正確な残り時間を示すものとしては掲載していません。正式な検証と開発への接続はPERSOL Career側が担当しました。</p></div>
            <div className="capabilities"><span>UX/UI DESIGN</span><span>STATE DESIGN</span><span>DESIGN RATIONALE</span></div>
          </div>
        </article>

        <article className="contribution wrap section-grid" id="agent">
          <div className="point-marker"><span className="point-number">02</span><span className="eyebrow">JOURNEY &amp;<br/>AI INTERACTION</span></div>
          <div>
            <h2>親サービスの体験設計支援</h2>
            <p className="body-copy">リードデザイナーが主導する親サービスの体験設計を支援。オンボーディングから選考、内定までを「任せられる」「痛みを減らす」「ワクワクを増やす」の感情軸で確認し、体験が弱くなる接点と改善案を整理しました。</p>
            <figure className="wide-evidence journey-evidence"><a href="/assets/persol/journey-map.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/journey-map.webp" width="2410" height="1800" loading="lazy" alt="親サービスの感情マップと画面提案"/></a><Caption no="08">JOURNEY ANALYSIS — 感情軸から体験の上下と改善機会を整理。</Caption></figure>
            <p className="body-copy">また、サービス内のAIキャラクターについて、登場場面、役割、発話・傾聴状態、UI上の位置やサイズを調査。キャラクターを装飾ではなく、案内、対話、状態伝達を担うプロダクト機能として提案しました。</p>
            <div className="paired-evidence">
              <figure><a href="/assets/persol/agent-directions.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/agent-directions.webp" width="3044" height="1706" loading="lazy" alt="AIキャラクターの複数の表現方向を比較した資料"/></a><Caption no="09">DIRECTIONS — AIとユーザーの関係性を複数方向で探索。</Caption></figure>
              <figure><a href="/assets/persol/agent-ui.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/agent-ui.webp" width="2822" height="1780" loading="lazy" alt="AIキャラクターをUIに展開した検討資料"/></a><Caption no="10">INTERACTION — キャラクターを具体的なUI状態へ展開。</Caption></figure>
            </div>
            <p className="credit-inline">親サービス全体の体験設計はリードデザイナーが主導。私はジャーニー分析、改善案、キャラクターとUIのインタラクション提案を担当しました。</p>
            <div className="capabilities"><span>JOURNEY ANALYSIS</span><span>AI INTERACTION</span><span>DESIGN SUPPORT</span></div>
          </div>
        </article>

        <article className="contribution wrap section-grid" id="future">
          <div className="point-marker"><span className="point-number">03</span><span className="eyebrow">FUTURE<br/>VISION</span></div>
          <div>
            <h2>将来のサービス・ブランド体験の提案</h2>
            <p className="ownership-statement">将来のサービス像とブランド体験のコンセプトを提案。</p>
            <p className="body-copy">現在のサービスを完成形ではなく中間地点として捉え、AIが転職活動を補助する存在から、自律的な代理人へ発展したときのサービスとブランド体験を構想しました。</p>
            <div className="future-grid">
              <figure><a href="/assets/persol/future-network.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/future-network.webp" width="1630" height="1430" loading="lazy" alt="自律型タレントディスカバリーネットワークの企画案"/></a><Caption no="11">自律型タレント・ディスカバリー・ネットワーク。</Caption></figure>
              <figure><a href="/assets/persol/future-career-park.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/future-career-park.webp" width="1302" height="1430" loading="lazy" alt="AIエージェントによる転職フェアの企画案"/></a><Caption no="12">doda A2A CAREER PARK 2027。</Caption></figure>
            </div>
            <div className="collaboration-map">
              <span className="eyebrow">THREE-PARTY COLLABORATION</span>
              <div><p><strong>PERSOL Career</strong><span>事業要件・意思決定</span></p><b>×</b><p><strong>所属会社 / 私</strong><span>将来像・ブランド体験</span></p><b>×</b><p><strong>外部UXパートナー</strong><span>体験設計・UX/UI具体化</span></p></div>
              <p>私はコンセプトと企画案を提案。三者でミーティングとレビューを重ね、外部UXパートナーが具体的な体験とUX/UIへ展開しました。</p>
            </div>
            <div className="capabilities"><span>FUTURE VISION</span><span>CONCEPT DESIGN</span><span>CROSS-COMPANY COLLABORATION</span></div>
          </div>
        </article>
      </section>

      <section className="research-section" id="research">
        <div className="wrap section-grid">
          <Label n="04">PLUS ALPHA / RESEARCH &amp; DESIGN</Label>
          <div>
            <span className="research-kicker">SEPARATE AI INTERVIEW SERVICE</span>
            <p className="english-heading">Designing the<br/><em>AI interviewer.</em></p>
            <h2>AI面接官を調査し、<br/>キャラクターとして提案する。</h2>
            <p className="body-copy lead-copy">前述の大規模AI転職サービスとは異なる、別のAI面接サービスにおける調査・提案です。AI面接官に適した外見と振る舞いについて、リサーチ計画の作成から、論文・事例調査、仮説整理、資料制作、キャラクター方向性の提案まで担当しました。</p>
            <div className="hypothesis-grid">
              <div><span>01</span><h3>Human-like</h3><strong>親近感と安心感</strong><p>期待：既存の面接に近い信頼感<br/>懸念：不気味の谷、監視感、属性バイアス</p></div>
              <div><span>02</span><h3>Robot / Agent</h3><strong>公平性と機能性</strong><p>期待：AIとしての透明性<br/>懸念：幼さ、面接の厳格さの低下</p></div>
              <div><span>03</span><h3>Abstract</h3><strong>属性バイアスの抑制</strong><p>期待：公平でフラットな体験<br/>懸念：傾聴されている感覚の不足</p></div>
            </div>
            <figure className="research-figure"><a href="/assets/persol/interviewer-hypotheses.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/interviewer-hypotheses.webp" width="1920" height="1080" loading="lazy" alt="人間型、ロボット型、抽象型のAI面接官を比較した仮説資料"/></a><Caption no="13">RESEARCH — 3つの表現方向について、期待する効果と懸念を仮説として整理。</Caption></figure>
            <div className="character-proposal-heading"><span className="research-kicker">CHARACTER DESIGN PROPOSAL</span><h3>調査をもとに、外見と表現の案をつくる。</h3><p className="body-copy">人間に近い3D、デフォルメしたキャラクター、ロボット、抽象的なドットや波形など、複数のデザイン案を制作・提案しました。外見だけでなく、表情や振る舞い、企業ごとの展開、面接画面での見え方も資料にまとめ、方向性を比較できる形にしました。</p></div>
            <figure className="research-figure character-proposal-figure"><a href="/assets/persol/interviewer-design-proposals.webp" target="_blank" rel="noreferrer"><img src="/assets/persol/interviewer-design-proposals.webp" width="2260" height="2034" loading="lazy" alt="AI面接官のデザイン提案一覧。人間型3D、デフォルメ、ロボット、ドット、波形の案と展開イメージ"/></a><Caption no="14">DESIGN PROPOSALS — リサーチをもとに制作したAI面接官のキャラクターデザイン案と展開イメージ。クリックで資料全体を拡大。</Caption></figure>
            <div className="research-deliverables" aria-label="AI面接官研究の担当範囲"><span>調査計画</span><span>論文・事例調査</span><span>仮説整理</span><span>キャラクター方向性</span><span>提案資料</span></div>
            <p className="body-copy research-conclusion">提案の軸は、外見に加えて、適切な間・傾聴・反応が話しやすさにどう関わるか。安心感と面接官としての信頼感のバランスを、検討すべき仮説として整理しました。</p>
            <div className="capabilities"><span>RESEARCH PLANNING</span><span>DESK RESEARCH</span><span>CHARACTER PROPOSAL</span><span>DOCUMENTATION</span></div>
          </div>
        </div>
      </section>

      <section className="output-section" id="output">
        <div className="wrap">
          <div className="output-heading"><Label n="05">OUTPUT</Label><div><h2>制作したもの</h2></div></div>
          <div className="output-summary">
            <div><h3>01　AI面接の画面デザイン</h3><p>接続確認から面接完了までの画面、発話状態、待機アニメーション、通知・エラーの比較案。カラーと文字の見やすさを検討した資料も制作しました。</p></div>
            <div><h3>02　親サービスの改善提案</h3><p>リードデザイナーと体験の課題を整理し、改善案を作成。AIキャラクターの登場場面や、画面上の動き・反応も提案しました。</p></div>
            <div><h3>03　将来のサービス企画</h3><p>AIが転職活動を代行するサービス像と、ブランド体験の企画資料を作成。外部UXパートナーが具体的なUX/UIへ展開しました。</p></div>
            <div><h3>04　AI面接官のデザイン提案</h3><p>別サービスで、外見・振る舞いのリサーチ資料とキャラクターデザイン案を制作。人間型、ロボット型、抽象表現などを比較して提案しました。</p></div>
          </div>
        </div>
      </section>

      <section className="reflection wrap section-grid section-space" id="reflection">
        <Label n="06">REFLECTION</Label>
        <div>
          <h2>関係者とのレビューを通じたデザインの検討</h2>
          <p className="body-copy">仕様が変化する新規サービスでは、最初から一つの正解を提示することはできません。約8カ月間、待ち時間、通知、発話状態、例外系などの選択肢を具体的なUIとして提示し、理由を説明しながら関係者と方向性を決めました。</p>
          <p className="body-copy">詳細なインターフェースを設計する力に加え、PM、リードデザイナー、ディレクター、外部パートナーと共通認識をつくり、不確実な構想を議論可能な形へ変える経験になりました。</p>
          <div className="reflection-line">From interface<br/><em>to relationship.</em></div>
        </div>
      </section>

      <section className="credits wrap section-grid">
        <Label n="07">ROLE / CREDITS</Label>
        <div>
          <div className="credits-heading"><h2>私の担当</h2><span>Product Designer / 約8カ月</span></div>
          <ul>{credits.map((credit,i)=><li key={credit}><span>{String(i+1).padStart(2,'0')}</span>{credit}</li>)}</ul>
          <div className="credit-breakdown">
            <p><strong>親サービス全体</strong><span>リードデザイナーが主導。私は体験分析と改善提案を支援。</span></p>
            <p><strong>独立URL型AI面接</strong><span>私がUX/UIの検討・提案を担当。正式な検証・開発接続はPERSOL Careerが担当。</span></p>
            <p><strong>ブランディング</strong><span>ディレクター監修下で提案・制作。ネーミング、ロゴ、AIアバターは別担当。</span></p>
            <p><strong>Future Vision</strong><span>私がコンセプトを提案。外部UXパートナーがUX/UIへ具体化。</span></p>
          </div>
          <p className="credit-note">掲載資料にはチームによる成果を含みます。各セクションで、私の担当、協働範囲、他担当者による制作を区別して記載しています。</p>
        </div>
      </section>
    </main>

    <ProjectNav current="/persol" />
    <footer className="wrap"><a href="#top" className="footer-title">PERSOL<span>AI CAREER</span></a><div><span>AI CAREER EXPERIENCE / CASE STUDY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
  </div>;
}
