import Link from "next/link";
import { ObservationField } from "@/components/observation-field";
import { HomeLiveTelemetry } from "@/components/home-live-telemetry";
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
    <section className="research-hero home-hero"><ObservationField /><div className="research-container research-split">
      <div>
        <p className="home-identity">WOOSUB SHIN</p>
        <p className="home-role">Quantitative Researcher</p>
        <h1 lang="en">Quantitative research in market risk, systematic trading, and market microstructure.</h1>
        <div className="home-program">
          <strong className="program-mark">ASRA</strong>
          <div><p>AI Systematic Research Architecture</p><p className="program-method">Observation / Test / Falsification</p></div>
        </div>
        <p className="research-prose">I build reproducible market studies using financial econometrics and research engineering. Current work focuses on BTC market microstructure, while earlier forecasting and strategy studies remain frozen with their original evidence boundaries.</p>
        <div className="research-actions">
          <Link className="research-button primary" href="/asra">Explore ASRA<span aria-hidden="true">→</span></Link>
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
    <HomeLiveTelemetry locale="en" />
    <section className="research-section research-section--surface" aria-labelledby="trader-behavior-ml-title" lang="en"><div className="research-container">
      <p className="research-kicker">Trader behavior ML</p>
      <div className="research-split">
        <div>
          <h2 id="trader-behavior-ml-title" className="research-heading">Can a model reproduce my LONG/SHORT decisions?</h2>
          <p className="research-prose">I reconstructed my futures trading history, froze pre-entry market and user-state features, and evaluated direction imitation on a chronological holdout. The result supports partial imitation, not profitable alpha.</p>
        </div>
        <div>
          <p className="research-prose">Across 689 complete episodes, gross win rate was 66.47%, but losses were concentrated: the worst 1% of episodes accounted for 50.20% of all losing PnL. Entry imitation and risk control are therefore evaluated separately.</p>
        </div>
      </div>
      <div className="home-systems-grid" aria-label="Trader behavior ML evidence">
        <div className="home-system-card"><p className="research-kicker">Dataset</p><h3>686</h3><p>ML-eligible episodes after public-data coverage checks.</p></div>
        <div className="home-system-card"><p className="research-kicker">Final holdout</p><h3>114</h3><p>Newest BTCUSDC episodes, kept out of fitting and parameter selection.</p></div>
        <div className="home-system-card"><p className="research-kicker">Direction accuracy</p><h3>71.05%</h3><p>HGB + user-state model on the final chronological holdout.</p></div>
        <div className="home-system-card"><p className="research-kicker">Balanced accuracy</p><h3>67.76%</h3><p>Final conditional LONG/SHORT imitation; MCC 0.353.</p></div>
      </div>
      <p className="research-note">Final entry-quality ROC-AUC was 0.5583 and tail-loss PR-AUC was 0.1364. These results do not establish a profitable-entry model or a reliable risk veto. A read-only observer now collects forward action and market-state evidence.</p>
      <div className="research-actions"><Link href="/research">Inspect the research framework <span aria-hidden="true">→</span></Link><Link href="/projects/volatility-regime-filtering">View the futures thesis</Link></div>
    </div></section>
    <section className="research-section research-section--surface home-primary-finding" aria-labelledby="strongest-finding" lang="en"><div className="research-container">
      <p className="research-kicker">Confirmed risk-forecasting result</p>
      <div className="evidence-heading"><h2 id="strongest-finding" className="research-heading">{forecast.title}</h2><EvidenceStatus evidenceClass={forecast.evidenceClass} /></div>
      <p className="research-prose">Context adds short-horizon BTC risk information beyond historical volatility persistence.</p>
      <EvidenceMetricGroup record={forecast} idPrefix="home-risk" />
      <div className="research-actions"><Link href={forecast.detailHref}>Inspect the independent assessment <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section id={historical.id} className="research-section home-historical" aria-labelledby="historical-performance-title"><div className="research-container">
      <div className="historical-performance-header">
        <div><p className="research-kicker">{historical.title}</p><h2 id="historical-performance-title" className="research-heading">Retained historical system and exact-period references</h2></div>
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
    <section className="research-section home-measurement" lang="en"><div className="research-container">
      <p className="research-kicker">ASRA research process</p>
      <div className="research-split"><h2 className="research-heading">Generate, test, challenge, and retain the result.</h2><p className="research-prose">ASRA separates candidate generation, measurement checks, validation, and claim boundaries. AI tools support implementation and review; research claims remain tied to explicit tests.</p></div>
      <ResearchPipeline />
      <div className="research-actions"><Link href="/asra#engine">Explore the research engine <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container research-split">
      <div><p className="research-kicker">Research progression</p><h2 className="research-heading">Measurement repairs changed the result.<br />Validation narrowed the claim.</h2><p className="research-prose">Return and risk studies answer different questions. V3 did not demonstrate incremental historical return transfer. Independent risk information survived, while the separate policy test did not confirm utility.</p><div className="research-actions"><Link href="/asra#timeline">Follow the research progression <span aria-hidden="true">→</span></Link></div></div>
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
      <p className="research-kicker">Selected research</p><h2 className="research-heading">Selected completed and retained research</h2>
      <div className="finding-list home-selected-list">{[researchEvidence.candidateGeneratorV3, researchEvidence.dailyEma, researchEvidence.futuresVolatilityThesis].map(record => <div key={record.id} id={record.id === "candidate-generator-v3" ? record.id : undefined}><ResearchFindingCard record={record} /></div>)}</div>
      <div className="research-actions"><Link href={researchEvidence.nonlinearSensorRecovery.detailHref}>Nonlinear sensor recovery</Link><Link href={researchEvidence.nativeHorizonSelection.detailHref}>Native-horizon selection</Link><Link href={researchEvidence.nativeScheduler.detailHref}>Completed scheduler robustness</Link><Link href={researchEvidence.riskBaselineChallenge.detailHref}>Risk baseline challenge</Link></div>
      <div className="research-actions"><Link className="research-button" href="/research">View all research findings <span aria-hidden="true">→</span></Link><Link href="/papers">Read the papers</Link></div>
    </div></section>
    <section className="research-section" lang="en"><div className="research-container"><p className="research-kicker">Current research</p><h2 className="research-heading">BTC market microstructure and low-latency systems</h2><CurrentResearch /></div></section>
    <section className="research-section home-systems"><div className="research-container">
      <div className="research-split"><div><p className="research-kicker">Systems & engineering</p><h2 className="research-heading">Research and execution systems are evaluated separately.</h2></div><p className="research-prose">Research infrastructure supports reproducible experiments. Execution systems cover transport, recovery, state consistency, and operational safety. Read-only telemetry reports account state.</p></div>
      <div className="home-systems-grid">{homeSystems.map(system => <Link key={system.href} href={system.href} className="home-system-card">
        <p className="research-kicker">{system.role}</p><h3>{system.title}</h3><p>{system.description}</p><span className="home-system-link">Inspect system <span aria-hidden="true">→</span></span>
      </Link>)}</div>
      <AuthorityBoundary><strong>NO AUTOMATIC EXECUTION AUTHORITY.</strong> Scientific findings and operational observations answer different questions.</AuthorityBoundary>
      <div className="research-actions"><Link href="/projects">Explore systems <span aria-hidden="true">→</span></Link></div>
    </div></section>
    <section className="research-section research-closing"><div className="research-container research-split">
      <div><p className="research-kicker">Background</p><h2 className="research-heading">Research background and technical work</h2></div>
      <div><p className="research-prose">MSc Economics from the University of Copenhagen, with work in financial econometrics, empirical asset pricing, and research engineering using Python, SQL, Git, and Linux.</p><div className="research-actions"><Link className="research-button primary" href="/resume">View resume</Link><Link href="/contact">Contact Woosub <span aria-hidden="true">→</span></Link></div></div>
    </div></section>
  </div></PageShell>;
}
