import Link from "next/link";
import { HomeLiveTelemetry } from "@/components/home-live-telemetry";
import { PageShell } from "@/components/site-shell";
import { ResearchConnections } from "@/components/portfolio-editorial";
import { portfolioStudies } from "@/lib/portfolio-content";

export function PortfolioHome() {
  return <PageShell><div className="folio">
    <section className="folio-hero home-hero folio-wrap" aria-labelledby="portfolio-title">
      <div className="folio-hero-main">
        <p className="folio-eyebrow">WOOSUB SHIN / Independent work</p>
        <h1 id="portfolio-title">Futures trader.<br /><em>Quantitative researcher.</em></h1>
        <p className="folio-lead">I trade futures and study the decisions behind them. My work connects financial econometrics, trading-behavior analysis, and market microstructure.</p>
        <div className="folio-links"><Link className="folio-primary" href="/trading">Explore my trading record <span aria-hidden="true">↗</span></Link><Link href="#selected-work">Read selected research <span aria-hidden="true">↓</span></Link></div>
      </div>
      <aside className="folio-margin" aria-label="Background and current focus">
        <p className="folio-eyebrow">Currently building</p><Link className="folio-current-link" href="/research/microstructure">Multi-venue market data<br />and deterministic replay <span aria-hidden="true">↗</span></Link>
        <p>C++ systems and Python research for short-horizon execution questions.</p>
        <dl><dt>Background</dt><dd>MSc Economics<br />University of Copenhagen</dd><dt>Based in</dt><dd>Seoul, South Korea</dd></dl>
        <Link href="/resume">About me and résumé <span aria-hidden="true">↗</span></Link>
      </aside>
    </section>
    <div className="folio-wrap"><ResearchConnections /></div>
    <section className="folio-account" aria-labelledby="personal-record-title">
      <div className="folio-wrap folio-section-heading"><div><p className="folio-eyebrow">Personal trading</p><h2 id="personal-record-title">The account record.</h2></div><div><p>Actual account observations, separate from backtests and model evaluations.</p><Link href="/trading">Performance, calendar, and data coverage <span aria-hidden="true">↗</span></Link></div></div>
      <HomeLiveTelemetry locale="en" />
    </section>
    <section id="selected-work" className="folio-wrap folio-section" aria-labelledby="selected-work-title">
      <div className="folio-section-heading"><div><p className="folio-eyebrow">Selected research</p><h2 id="selected-work-title">Questions behind the trades.</h2></div><p>What I asked, what I built, and what the evidence actually supports.</p></div>
      <div className="folio-studies">{portfolioStudies.map(study => <article className="folio-study" key={study.id}>
        <div><p className="folio-eyebrow">{study.category}</p><h3><Link href={study.href}>{study.title}<span aria-hidden="true">↗</span></Link></h3><p>{study.question}</p><p className="folio-study-contribution">{study.contribution}</p><p className="folio-finding">{study.finding}</p><Link className="folio-text-link" href={study.href}>Read the case study <span aria-hidden="true">→</span></Link></div>
        <aside className="folio-study-aside"><strong>{study.metric}</strong><p>{study.metricLabel}</p><p className="folio-connection-note">{study.connection}</p></aside>
      </article>)}</div>
      <div className="folio-related"><p>Earlier strategy studies, measurement repairs, and negative results remain in the research archive. Historical strategy returns are not personal account returns.</p><div className="folio-links"><Link href="/research">Full research archive ↗</Link><Link href="/projects/btc-final-system">Retained historical EMA study ↗</Link></div></div>
    </section>
    <section className="folio-build-band" aria-labelledby="current-build-title"><div className="folio-wrap folio-build-grid">
      <div><p className="folio-eyebrow">Current work / Market microstructure</p><h2 id="current-build-title">From bars to<br /><em>market mechanics.</em></h2><p className="folio-lead">A signal can look useful and still fail at the point of execution. I am studying order flow, fill uncertainty, and what prices do after a hypothetical fill.</p><div className="folio-links"><Link className="folio-primary" href="/research/microstructure">Inside the current research ↗</Link><Link href="/projects">The supporting systems ↗</Link></div></div>
      <div className="folio-stack" aria-label="Research workflow, not an execution route"><div><span>Observe</span><strong>Public market-data capture</strong><p>Trades and order-book updates from multiple venues.</p></div><div><span>Reconstruct</span><strong>C++ deterministic replay</strong><p>Sequence discipline, state checks, and reproducible event streams.</p></div><div><span>Evaluate</span><strong>Python research and diagnostics</strong><p>Fill proxies, adverse selection, markouts, and cost-aware tests.</p></div></div>
      <p className="folio-build-note">Research workflow, not a live order route. Local compute benchmarks are not exchange latency, and hypothetical fills are not realized PnL.</p>
    </div></section>
    <section className="folio-wrap folio-section folio-about-grid" aria-labelledby="working-method-title">
      <div><p className="folio-eyebrow">How I work</p><h2 id="working-method-title">One researcher.<br />A connected body of work.</h2><p className="folio-lead">My academic training is in economics and financial econometrics. Trading gives me questions; research helps me test them; engineering makes those tests repeatable.</p></div>
      <div><h3>ASRA</h3><p className="folio-subtitle">AI Systematic Research Architecture</p><p>I use AI-assisted development and review to implement experiments and challenge assumptions. I remain responsible for the question, the validation design, and the interpretation.</p><p>A better forecast, a successful replay, and a profitable trade are different claims. I keep their evidence separate rather than presenting every project as one working trading algorithm.</p><div className="folio-links"><Link href="/asra">Research process ↗</Link><Link href="/papers">Academic papers ↗</Link></div></div>
    </section>
    <section className="folio-wrap folio-contact"><div><p className="folio-eyebrow">Get in touch</p><h2>Let’s talk about markets<br />and the systems behind them.</h2></div><div className="folio-links"><Link className="folio-primary" href="/contact">Contact Woosub ↗</Link><Link href="/resume">Résumé ↗</Link><a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer">GitHub ↗</a></div></section>
  </div></PageShell>;
}
