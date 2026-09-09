import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import { AuthorityBoundary, CurrentResearch, EvidenceMetricGroup, EvidenceStatus, PolicySummary, ResearchFindingCard, ResearchPipeline } from "@/components/research-ui";
import { historicalResearchPerformance, researchEvidence, researchTimelineLanes } from "@/lib/research-evidence";

const homeProgressionStages = new Set([
  "positive-control-failure", "nonlinear-sensor-repair", "native-horizon-repair",
  "fixed-native-sufficient", "v3-historical-transfer", "v3-no-finalists",
  "strong-baseline-challenge", "independent-confirmation", "policy-translation-tested", "policy-utility-not-confirmed",
]);

const homeSystems = [
  { title: "Read-only positions & performance", role: "Operational observation", href: "/projects/btc-futures-research/live-position", description: "Inspect the monitor, its observation window and operational boundaries." },
  { title: "Retained historical system", role: "Historical research", href: "/projects/btc-final-system", description: "Daily EMA rules, frozen historical comparisons and selection caveats." },
  { title: "Research infrastructure", role: "Reproducible experiments", href: "/projects/multi-asset-research-lab", description: "Experiment records, research controls and reproducible evaluation." },
  { title: "Execution engineering", role: "Operational systems", href: "/projects#execution-gateway", description: "Transport, recovery, state consistency and operational safety." },
] as const;

export function PortfolioHome() {
  const forecast = researchEvidence.independentRiskForecast;
  const historical = historicalResearchPerformance;
  return <PageShell><div className="research-page">
    <section className="research-hero home-hero"><div className="research-container research-split">
      <div>
        <p className="home-identity">WOOSUB SHIN</p>
        <p className="home-role">Quantitative Researcher</p>
        <h1 lang="en">Quantitative research built to survive falsification.</h1>
        <p className="home-program"><strong>ASTRA</strong> · <span lang="en">AI-augmented systematic research architecture</span></p>
        <p className="research-prose">I turn market questions into reproducible experiments, challenge the measurement, and explain what survives.</p>
        <div className="research-actions">
          <Link className="research-button primary" href="/astra">Explore ASTRA<span aria-hidden="true">→</span></Link>
          <Link className="research-button" href="/research">View Research</Link>
          <Link href="/resume">Resume</Link><a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <dl className="home-background" lang="en">
        <dt>MSc Economics</dt><dd>University of Copenhagen</dd>
        <dt>Research foundation</dt><dd>Financial econometrics<br />Empirical asset pricing</dd>
        <dt>Research engineering</dt><dd>Python · SQL · Git · Linux</dd>
        <dt>Based in</dt><dd>Seoul, South Korea</dd>
      </dl>
    </div></section>
    <section className="research-section research-section--surface home-primary-finding" aria-labelledby="strongest-finding" lang="en"><div className="research-container">
      <p className="research-kicker">Strongest confirmed finding</p>
      <div className="evidence-heading"><h2 id="strongest-finding" className="research-heading">{forecast.title}</h2><EvidenceStatus evidenceClass={forecast.evidenceClass} /></div>
      <p className="research-prose">Context adds short-horizon BTC risk information beyond historical volatility persistence.</p>
      <EvidenceMetricGroup record={forecast} idPrefix="home-risk" />
      <div className="research-actions"><Link href={forecast.detailHref}>Inspect the independent assessment <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section id={historical.id} className="research-section home-historical" aria-labelledby="historical-performance-title"><div className="research-container">
      <div className="historical-performance-header">
        <div><p className="research-kicker">{historical.title}</p><h2 id="historical-performance-title" className="research-heading">A retained system, beside its references.</h2></div>
        <EvidenceStatus evidenceClass={historical.evidenceClass} />
      </div>
      <p id="historical-performance-context" className="historical-performance-context">{historical.context}</p>
      <p className="historical-scroll-hint">Scroll horizontally to compare all columns.</p>
      <div className="historical-performance-scroll" role="region" aria-label="Historical research comparison" tabIndex={0}>
        <table className="historical-performance-table" aria-describedby="historical-performance-context historical-performance-caveats">
          <caption>Frozen historical research and exact-period BTC references</caption>
          <thead><tr><th scope="col">System</th><th scope="col">Return</th><th scope="col">Sharpe</th><th scope="col">MaxDD</th><th scope="col">Evidence</th></tr></thead>
          <tbody>{historical.rows.map(row => <tr key={row.id} data-role={row.role}>
            <th scope="row"><span className="historical-system-name">{row.name}</span><span className="historical-system-role">{row.roleLabel}</span><span className="historical-system-note">{row.note}</span></th>
            <td>{row.returnValue}</td><td>{row.sharpe}</td><td>{row.maxDrawdown}</td><td><span className="historical-evidence">{historical.evidenceClass}</span></td>
          </tr>)}</tbody>
        </table>
      </div>
      <ul id="historical-performance-caveats" className="historical-performance-caveats">{historical.caveats.map(caveat => <li key={caveat}>{caveat}</li>)}</ul>
      <div className="research-actions"><Link href={historical.detailHref}>Inspect the retained historical system <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container">
      <p className="research-kicker">How ASTRA works</p>
      <div className="research-split"><h2 className="research-heading">A research architecture that makes weak evidence useful.</h2><p className="research-prose">Generate candidates, test the measurement, challenge the result, and repair what failed. AI tools support implementation and review; claims remain tied to explicit tests and human responsibility.</p></div>
      <ResearchPipeline />
      <div className="research-actions"><Link href="/astra#engine">Explore the research engine <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container research-split">
      <div><p className="research-kicker">What changed</p><h2 className="research-heading">Failure changed the measurement.<br />Evidence narrowed the claim.</h2><p className="research-prose">The return and risk lanes ask different questions. Repaired measurement did not demonstrate incremental historical return transfer in V3. Independent risk information survived, while a separate policy test did not confirm utility.</p><div className="research-actions"><Link href="/astra#timeline">Follow the research progression <span aria-hidden="true">→</span></Link></div></div>
      <div className="home-progression-lanes">{researchTimelineLanes.map(lane => <section className="home-progression-lane" key={lane.id} aria-labelledby={`home-lane-${lane.id}`}>
        <h3 id={`home-lane-${lane.id}`}>{lane.title}</h3>
        <ol className="home-progression-stages">{lane.stages.filter(stage => homeProgressionStages.has(stage.id)).map(stage => <li key={stage.id}>{stage.title}</li>)}</ol>
        <p className="research-note">NEXT QUESTION: <Link href={lane.nextQuestion.detailHref}>{lane.nextQuestion.title}</Link></p>
      </section>)}</div>
    </div></section>
    <section className="research-section research-section--surface" lang="en"><div className="research-container research-split">
      <div><p className="research-kicker">Policy translation test</p><h2 className="research-heading">Forecast information survived.<br />Policy utility was not confirmed.</h2></div>
      <PolicySummary />
    </div></section>
    <section className="research-section" lang="en"><div className="research-container">
      <p className="research-kicker">Selected research</p><h2 className="research-heading">Results, repairs, and retained systems.</h2>
      <div className="finding-list home-selected-list">{[researchEvidence.candidateGeneratorV3, researchEvidence.dailyEma, researchEvidence.futuresVolatilityThesis].map(record => <div key={record.id} id={record.id === "candidate-generator-v3" ? record.id : undefined}><ResearchFindingCard record={record} /></div>)}</div>
      <div className="research-actions"><Link href={researchEvidence.nonlinearSensorRecovery.detailHref}>Nonlinear sensor recovery</Link><Link href={researchEvidence.nativeHorizonSelection.detailHref}>Native-horizon selection</Link><Link href={researchEvidence.nativeScheduler.detailHref}>Completed scheduler robustness</Link><Link href={researchEvidence.riskBaselineChallenge.detailHref}>Risk baseline challenge</Link></div>
      <div className="research-actions"><Link className="research-button" href="/research">View all research findings <span aria-hidden="true">→</span></Link><Link href="/papers">Read the papers</Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container"><p className="research-kicker">Current / next</p><h2 className="research-heading">What the evidence asks next.</h2><CurrentResearch /></div></section>
    <section className="research-section home-systems"><div className="research-container">
      <div className="research-split"><div><p className="research-kicker">Systems & engineering</p><h2 className="research-heading">Research evidence.<br />Separate execution engineering.</h2></div><p className="research-prose">Research infrastructure supports reproducible experiments. Execution systems concern transport, recovery, state consistency and operational safety. Read-only telemetry documents operations.</p></div>
      <div className="home-systems-grid">{homeSystems.map(system => <Link key={system.href} href={system.href} className="home-system-card">
        <p className="research-kicker">{system.role}</p><h3>{system.title}</h3><p>{system.description}</p><span className="home-system-link">Inspect system <span aria-hidden="true">→</span></span>
      </Link>)}</div>
      <AuthorityBoundary><strong>NO AUTOMATIC EXECUTION AUTHORITY.</strong> Scientific findings and operational observations answer different questions.</AuthorityBoundary>
      <div className="research-actions"><Link href="/projects">Explore systems <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section className="research-section research-closing"><div className="research-container research-split">
      <div><p className="research-kicker">Research to desk</p><h2 className="research-heading">From a market question to evidence a desk can inspect.</h2></div>
      <div><p className="research-prose">An Economics MSc from the University of Copenhagen, a background in financial econometrics and empirical asset pricing, and practical research engineering with Python, SQL, Git and Linux.</p><div className="research-actions"><Link className="research-button primary" href="/resume">View resume</Link><Link href="/contact">Contact Woosub <span aria-hidden="true">→</span></Link></div></div>
    </div></section>
  </div></PageShell>;
}
