import Link from "next/link";
import { metadataFor } from "@/lib/site-metadata";
import { CtaLink, EditorialSection, PageHero } from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata = metadataFor(
  "/projects",
  "Trading Research and Systems",
  "Trading research infrastructure, market-data systems, execution engineering, and read-only account telemetry by Woosub Shin. Research findings confer no automatic execution authority.",
);

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="research-page systems-page">
        <PageHero
          eyebrow="Woosub Shin / Systems"
          title="Trading research and systems"
          intro="Systems supporting market research, market data, execution engineering, and operational telemetry. Research findings and execution authority remain separate."
          actions={<><CtaLink href="/asra" kind="primary">Explore ASRA</CtaLink><CtaLink href="/research">Inspect research findings</CtaLink></>}
          metadata={[{ label: "Research", value: "Hypothesis / Evidence / Validation" }, { label: "Execution systems", value: "Transport / Recovery / State consistency" }, { label: "Telemetry", value: "Read-only operational evidence" }]}
        />

        <nav className="systems-directory research-container" aria-label="Systems directory">
          <Link href="/projects/btc-futures-research/live-position"><span>Operational evidence</span><strong>Read-only positions &amp; performance <span aria-hidden="true">↗</span></strong></Link>
          <Link href="/projects/btc-final-system"><span>Retained historical system</span><strong>Daily EMA 50/200 <span aria-hidden="true">↗</span></strong></Link>
          <Link href="#research-infrastructure"><span>Research infrastructure</span><strong>Data, artifacts &amp; replay <span aria-hidden="true">↓</span></strong></Link>
          <Link href="#execution-gateway"><span>Execution engineering</span><strong>Transport, recovery &amp; state <span aria-hidden="true">↓</span></strong></Link>
        </nav>

        <EditorialSection id="research-infrastructure" eyebrow="Research infrastructure" title="Reproducible market research" intro="ASRA and the retained BTC research systems provide data contracts, replay, provenance, and frozen evaluation records. Historical components are not presented as fully integrated ASRA modules.">
          <div className="research-grid">
            <article className="research-card">
              <h3>Multi-Asset Research Lab</h3>
              <p className="research-prose">Data contracts, provenance, immutable artifacts, deterministic replay, frozen comparisons, and explicit historical-to-forward boundaries. The demonstrated BTC implementation remains distinct from the asset-neutral architecture.</p>
              <CtaLink href="/projects/multi-asset-research-lab">Inspect research infrastructure</CtaLink>
            </article>
            <article className="research-card">
              <h3>BTC research evidence system</h3>
              <p className="research-prose">Volatility evidence stores, forward outcomes, failure handling, and a descriptive research observatory. Conceptual exhibits and historical snapshots retain their original provenance.</p>
              <CtaLink href="/projects/btc-futures-research#observatory">Open the research observatory</CtaLink>
            </article>
          </div>
        </EditorialSection>

        <EditorialSection id="execution-gateway" eyebrow="Execution engineering" title="Systematic Execution Gateway" intro="Transport, recovery, state consistency, and operational safety are assessed separately from trading research and model evidence.">
          <div className="authority-boundary">
            <p className="research-kicker">RESEARCH — ASRA</p>
            <p>Hypothesis · Evidence · Validation</p>
            <p><strong>NO AUTOMATIC EXECUTION AUTHORITY</strong></p>
            <p className="research-kicker">EXECUTION SYSTEMS</p>
            <p>Transport · Recovery · State consistency · Operational safety</p>
          </div>
          <p className="research-prose">Independent forecast confirmation provides risk information. The separate frozen policy test did not confirm its preregistered utility claim. Neither result grants directional-alpha, sizing, veto, trading, or execution authority.</p>
          <div className="research-actions"><CtaLink href="/build-log#pr41-boundary-digest">Read the historical verification constraint</CtaLink><CtaLink href="/projects/multi-asset-research-lab/claims">Inspect the claims ledger</CtaLink></div>
        </EditorialSection>

        <EditorialSection id="telemetry" eyebrow="Operational telemetry" title="Read-only account telemetry" intro="The monitor displays sanitized execution-account positions and flow-adjusted performance. Feed freshness describes operations, not the efficacy of ASRA or the retained EMA study.">
          <p className="research-prose">Position and performance panels retain their existing timestamps, stale and unavailable states, and accounting-method labels. Account performance is not attributed to H_PLUS_C, and operational observation is not independent policy confirmation.</p>
          <div className="research-actions"><CtaLink href="/projects/btc-futures-research/live-position" kind="primary">Open the read-only monitor</CtaLink><CtaLink href="/build-log">Read engineering history</CtaLink></div>
        </EditorialSection>
      </div>
    </PageShell>
  );
}
