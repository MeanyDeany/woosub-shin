import { metadataFor } from "@/lib/site-metadata";
import { CtaLink, EditorialSection, PageHero } from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata = metadataFor(
  "/projects",
  "Systems and Research Infrastructure",
  "Woosub Shin's research infrastructure, separate execution engineering, and read-only operational telemetry. Research findings confer no automatic execution authority.",
);

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="research-page">
        <PageHero
          eyebrow="Woosub Shin · Systems"
          title="Systems and research infrastructure"
          intro="Engineering supports reproducible research and dependable operations. Its evidence concerns transport, recovery, state consistency, and operational safety; scientific findings keep their own assessment and authority boundaries."
          actions={<><CtaLink href="/astra" kind="primary">Explore ASTRA</CtaLink><CtaLink href="/research">Inspect research findings</CtaLink></>}
          metadata={[{ label: "Research", value: "Hypothesis · Evidence · Validation" }, { label: "Execution systems", value: "Transport · Recovery · State consistency" }, { label: "Telemetry", value: "Read-only operational evidence" }]}
        />

        <EditorialSection id="research-infrastructure" eyebrow="01 · Research infrastructure" title="Experiments need an inspectable foundation" intro="ASTRA is the current research program. The existing Lab and BTC evidence system document its architectural lineage; this does not imply that every historical component is already an integrated ASTRA module.">
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

        <EditorialSection id="execution-gateway" eyebrow="02 · Separate execution engineering" title="Systematic Execution Gateway" intro="Transport, recovery, state consistency, and operational safety are engineering questions. They are assessed separately from hypotheses, forecast losses, and policy utility.">
          <div className="authority-boundary">
            <p className="research-kicker">RESEARCH — ASTRA</p>
            <p>Hypothesis · Evidence · Validation</p>
            <p><strong>NO AUTOMATIC EXECUTION AUTHORITY</strong></p>
            <p className="research-kicker">EXECUTION SYSTEMS</p>
            <p>Transport · Recovery · State consistency · Operational safety</p>
          </div>
          <p className="research-prose">Independent forecast confirmation provides risk information. The separate frozen policy test did not confirm its preregistered utility claim. Neither result grants directional-alpha, sizing, veto, trading, or execution authority.</p>
          <div className="research-actions"><CtaLink href="/build-log#pr41-boundary-digest">Read the historical verification constraint</CtaLink><CtaLink href="/projects/multi-asset-research-lab/claims">Inspect the claims ledger</CtaLink></div>
        </EditorialSection>

        <EditorialSection id="telemetry" eyebrow="03 · Operational evidence" title="Read-only telemetry" intro="The monitor displays sanitized execution-account positions and flow-adjusted performance. Feed freshness describes operations, not the efficacy of ASTRA or the retained EMA study.">
          <p className="research-prose">Position and performance panels retain their existing timestamps, stale and unavailable states, and accounting-method labels. Account performance is not attributed to H_PLUS_C, and operational observation is not independent policy confirmation.</p>
          <div className="research-actions"><CtaLink href="/projects/btc-futures-research/live-position" kind="primary">Open the read-only monitor</CtaLink><CtaLink href="/build-log">Read engineering history</CtaLink></div>
        </EditorialSection>
      </div>
    </PageShell>
  );
}
