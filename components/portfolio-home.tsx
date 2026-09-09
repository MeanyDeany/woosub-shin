import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { AuthorityBoundary, CurrentResearch, EvidenceMetricGroup, EvidenceStatus, PolicySummary, ResearchFindingCard, ResearchPipeline } from "@/components/research-ui";
import { researchEvidence } from "@/lib/research-evidence";

const progression = [
  ["Directional hypotheses", "Weak / cost-fragile evidence"],
  ["Synthetic positive-control failure", "Measurement blind spots discovered"],
  ["Nonlinear sensor repair", "Detection recovered in controls"],
  ["Native-horizon selection repair", "Methodological power recovered"],
  ["Risk baseline challenge", "Development evidence survived"],
  ["Independent assessment", "Risk information confirmed"],
] as const;

export function PortfolioHome({ locale = "en" }: { locale?: "en" | "ko" }) {
  const ko = locale === "ko";
  const forecast = researchEvidence.independentRiskForecast;
  return <PageShell locale={locale}><div className="research-page">
    <section className="research-hero home-hero"><div className="research-container research-split">
      <div>
        <p className="home-identity">WOOSUB SHIN</p>
        <p className="home-role">Quantitative Researcher</p>
        <h1 lang="en">Quantitative research built to survive falsification.</h1>
        <p className="home-program"><strong>ASTRA</strong> · <span lang="en">AI-augmented systematic research architecture</span></p>
        <p className="research-prose">{ko ? "시장에 대한 질문을 재현 가능한 실험으로 만들고, 측정과 비교를 검증하며, 증거가 지지하는 범위를 설명합니다." : "I turn market questions into reproducible experiments, challenge the measurement, and explain what survives."}</p>
        <div className="research-actions">
          <Link className="research-button primary" href="/astra">{ko ? "ASTRA 살펴보기 (English)" : "Explore ASTRA"}<span aria-hidden="true">→</span></Link>
          <Link className="research-button" href="/research">{ko ? "연구 보기 (English)" : "View Research"}</Link>
          <Link href="/resume">{ko ? "이력서 (English)" : "Resume"}</Link><a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <dl className="home-background" lang="en">
        <dt>MSc Economics</dt><dd>University of Copenhagen</dd>
        <dt>Research foundation</dt><dd>Financial econometrics<br />Empirical asset pricing</dd>
        <dt>Research engineering</dt><dd>Python · SQL · Git · Linux</dd>
        <dt>Based in</dt><dd>Seoul, South Korea</dd>
      </dl>
    </div></section>
    <section className="research-section research-section--surface" aria-labelledby="strongest-finding" lang="en"><div className="research-container">
      {ko && <p lang="ko" className="research-note">아래 연구 기록의 원문과 상세 페이지는 영어로 제공됩니다.</p>}
      <p className="research-kicker">Strongest confirmed finding</p>
      <div className="evidence-heading"><h2 id="strongest-finding" className="research-heading">{forecast.title}</h2><EvidenceStatus evidenceClass={forecast.evidenceClass} /></div>
      <p className="research-prose">Context adds short-horizon BTC risk information beyond historical volatility persistence.</p>
      <EvidenceMetricGroup record={forecast} idPrefix="home-risk" />
      <div className="research-actions"><Link href={forecast.detailHref}>Inspect the independent assessment <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container">
      <p className="research-kicker">How ASTRA works</p>
      <div className="research-split"><h2 className="research-heading">A research architecture that makes weak evidence useful.</h2><p className="research-prose">Generate candidates, test the measurement, challenge the result, and repair what failed. AI tools support implementation and review; claims remain tied to explicit tests and human responsibility.</p></div>
      <ResearchPipeline />
      <div className="research-actions"><Link href="/astra#engine">Explore the research engine <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container research-split">
      <div><p className="research-kicker">What changed</p><h2 className="research-heading">Failure changed the measurement.<br />Evidence narrowed the claim.</h2><p className="research-prose">The progression led to risk information, followed by a separate policy test. The completed scheduler study also supports a simpler architecture within its synthetic domain.</p><div className="research-actions"><Link href="/astra#timeline">Follow the research progression <span aria-hidden="true">→</span></Link></div></div>
      <div><ol className="progression-list">{progression.map(([stage, finding]) => <li key={stage}><span>{stage}</span><span aria-hidden="true">→</span><span>{finding}</span></li>)}</ol><p className="progression-continuation">Independent forecast confirmation → policy translation tested → policy utility not confirmed → turnover / opportunity-cost mechanism isolated.</p></div>
    </div></section>
    <section className="research-section research-section--surface" lang="en"><div className="research-container research-split">
      <div><p className="research-kicker">Policy translation test</p><h2 className="research-heading">Forecast information survived.<br />Policy utility was not confirmed.</h2></div>
      <PolicySummary />
    </div></section>
    <section className="research-section" lang="en"><div className="research-container">
      <p className="research-kicker">Selected research</p><h2 className="research-heading">Results, repairs, and retained systems.</h2>
      <div className="finding-list">{[researchEvidence.nativeScheduler, researchEvidence.dailyEma, researchEvidence.futuresVolatilityThesis].map(record => <ResearchFindingCard key={record.id} record={record} />)}</div>
      <div className="research-actions"><Link href={researchEvidence.nonlinearSensorRecovery.detailHref}>Nonlinear sensor recovery</Link><Link href={researchEvidence.nativeHorizonSelection.detailHref}>Native-horizon selection</Link><Link href={researchEvidence.riskBaselineChallenge.detailHref}>Risk baseline challenge</Link></div>
      <div className="research-actions"><Link className="research-button" href="/research">View all research findings <span aria-hidden="true">→</span></Link><Link href={ko ? "/ko/papers" : "/papers"}>Read the papers</Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container"><p className="research-kicker">Current / next</p><h2 className="research-heading">What the evidence asks next.</h2><CurrentResearch /></div></section>
    <section className="research-section" lang="en"><div className="research-container research-split">
      <div><p className="research-kicker">Systems & engineering</p><h2 className="research-heading">Research evidence.<br />Separate execution engineering.</h2></div>
      <div><p className="research-prose">Research infrastructure supports reproducible experiments. Execution systems concern transport, recovery, state consistency and operational safety. Read-only telemetry documents operations.</p><AuthorityBoundary>No automatic execution authority. Scientific findings and operational observations answer different questions.</AuthorityBoundary><div className="research-actions"><Link href={ko ? "/ko/projects" : "/projects"}>Explore systems <span aria-hidden="true">→</span></Link></div></div>
    </div></section>
    <section className="research-section research-closing"><div className="research-container research-split">
      <div><p className="research-kicker">{ko ? "연구 · 커리어 · 연락" : "Research to desk"}</p><h2 className="research-heading">{ko ? "시장에 대한 질문에서 검토 가능한 증거까지." : "From a market question to evidence a desk can inspect."}</h2></div>
      <div><p className="research-prose">{ko ? "코펜하겐대학교 경제학 석사 과정에서 금융계량경제학과 실증 자산가격을 공부했습니다. Python, SQL, Git, Linux를 바탕으로 연구와 검증을 구현합니다." : "An Economics MSc from the University of Copenhagen, a background in financial econometrics and empirical asset pricing, and practical research engineering with Python, SQL, Git and Linux."}</p><div className="research-actions"><Link className="research-button primary" href="/resume">{ko ? "이력서 (English)" : "View resume"}</Link><Link href={ko ? "/ko/contact" : "/contact"}>{ko ? "신우섭에게 연락" : "Contact Woosub"} <span aria-hidden="true">→</span></Link></div></div>
    </div></section>
  </div></PageShell>;
}
