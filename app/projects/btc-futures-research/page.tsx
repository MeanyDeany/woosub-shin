import {
  BoundaryList,
  Card,
  MetricCard,
  PageSection,
  PageShell,
} from "@/components/site-shell";
import { EvidenceMaturity } from "@/components/evidence-maturity";
import { ModelResponseExplorer } from "@/components/model-response-explorer";
import { MonteCarloVisual } from "@/components/monte-carlo-visual";
import { MultiAssetLineage } from "@/components/multi-asset-lineage";
import { ProvenanceBadge } from "@/components/provenance-badge";
import { RealizedVolatilityMap } from "@/components/realized-volatility-map";
import { VolatilitySurfaceLoader } from "@/components/volatility-surface-loader";
import {
  architectureStages,
  boundaryItems,
  demonstratedCapabilities,
  ledgerProperties,
  operationalSnapshot,
  schedulerControls,
  schedulerJobs,
  shadowModels,
} from "@/lib/content";

const overviewPrinciples = [
  "Not a market-direction predictor or entry-signal generator",
  "Records model forecasts, realized outcomes, and operational integrity separately",
  "Makes research evidence reproducible, auditable, and resistant to retrospective rewriting",
  "Separates factual evidence generation from later strategy interpretation",
] as const;

const heroBoundaries = [
  "Research-only",
  "No live or paper trading approval",
  "No exchange, broker, or order-routing connection",
  "No entry, short-permission, or strategy-approval role",
] as const;

const roleItems = [
  "Designed the research-only evidence architecture",
  "Implemented and integrated GARCH, EGARCH, GJR-GARCH, and HAR-RV workflows",
  "Built deterministic fit, state, and forward-outcome ledgers",
  "Implemented anti-lookahead outcome validation",
  "Implemented source provenance and content hashing",
  "Engineered cron scheduling",
  "Engineered process locks and append locks",
  "Implemented health checks and integrity blockers",
  "Separated research evidence from trading execution",
  "Designed the architecture for future multi-asset reuse",
] as const;

const priorBenchmarks = [
  "EWMA volatility",
  "ATR volatility",
  "Parkinson volatility",
  "Garman-Klass volatility",
] as const;

export default function BtcFuturesResearchPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
        <p className="mb-5 text-sm font-semibold uppercase text-emerald-300">
          Quant research infrastructure
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-5xl">
          BTC Futures Research Assistant
        </h1>
        <p className="mt-5 max-w-4xl text-xl leading-8 text-neutral-300">
          Research infrastructure for immutable volatility forecasts, factual
          forward outcome validation, and operational integrity monitoring.
        </p>
        <div className="mt-9 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {heroBoundaries.map((item) => (
            <p key={item} className="bg-neutral-950 px-4 py-4 text-sm leading-6 text-neutral-300">
              {item}
            </p>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-neutral-500">
          Model outputs remain descriptive research evidence. They are never presented as strategy approval.
        </p>
      </section>

      <PageSection eyebrow="Purpose" title="Project Overview">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <p className="text-lg leading-8 text-neutral-300">
              The system preserves factual research history so forecasts, realized outcomes,
              and operational checks can be reproduced and audited without rewriting prior evidence.
            </p>
            <p className="mt-5 leading-7 text-neutral-400">
              Its role ends at evidence generation. Strategy interpretation and execution sit outside the system boundary.
            </p>
          </Card>
          <Card>
            <ul className="space-y-4">
              {overviewPrinciples.map((item) => (
                <li key={item} className="border-l border-emerald-300/40 pl-4 text-neutral-300">{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </PageSection>

      <PageSection eyebrow="Contribution" title="My Role">
        <Card>
          <ul className="grid gap-4 md:grid-cols-2">
            {roleItems.map((item) => (
              <li key={item} className="border-l border-emerald-300/40 pl-4 leading-7 text-neutral-300">{item}</li>
            ))}
          </ul>
        </Card>
      </PageSection>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase text-cyan-200">Interactive research view</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Volatility Forecast Surface</h2>
            <p className="mt-4 leading-7 text-neutral-400">
              Four discrete model ribbons map an illustrative time index against normalized variance.
              The model axis represents separate statistical specifications, not a continuous mathematical dimension.
            </p>
          </div>
          <VolatilitySurfaceLoader />
          <p className="mt-6 max-w-5xl text-sm leading-7 text-neutral-500">
            Conceptual normalized surface generated from deterministic illustrative data. It does not represent historical or production forecasts.
          </p>
        </div>
      </section>

      <PageSection eyebrow="Research lineage" title="Multi-Asset Research Lineage">
        <MultiAssetLineage />
      </PageSection>

      <PageSection eyebrow="Current forecast category" title="Active Forecast Models">
        <ProvenanceBadge provenance="current-static-snapshot" />
        <p className="mt-5 max-w-4xl leading-7 text-neutral-400">
          These models produce comparable raw next-hour decimal variance forecasts for research evidence.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {shadowModels.map((model) => (
            <Card key={model.name}>
              <h3 className="text-lg font-semibold text-white">{model.name}</h3>
              <p className="mt-3 leading-7 text-neutral-400">{model.description}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 rounded-lg border border-emerald-300/30 bg-emerald-300/[0.05] px-5 py-5 text-sm leading-7 text-neutral-200">
          Their outputs are not market regimes, direction forecasts, entry signals, vetoes, sizing instructions, leverage decisions, or trading permissions.
        </p>
      </PageSection>

      <PageSection eyebrow="Feature ecosystem" title="Realized-Volatility Research Map">
        <RealizedVolatilityMap />
      </PageSection>

      <PageSection eyebrow="Historical research context" title="Prior Benchmarks and Challengers">
        <ProvenanceBadge provenance="academic-context" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {priorBenchmarks.map((model) => (
            <div key={model} className="rounded-lg border border-white/10 px-4 py-4">
              <p className="font-semibold text-neutral-100">{model}</p>
              <p className="mt-2 text-xs uppercase text-neutral-500">Prior benchmark research</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-neutral-500">
          These are historical benchmark contexts, not current operational shadow models. No comparative performance claim is presented.
        </p>
      </PageSection>

      <PageSection eyebrow="Conceptual mechanics" title="Model Response Explorer">
        <ModelResponseExplorer />
      </PageSection>

      <PageSection eyebrow="Uncertainty" title="Monte Carlo Variance Uncertainty">
        <MonteCarloVisual />
      </PageSection>

      <PageSection eyebrow="Evidence discipline" title="Evidence Maturity">
        <EvidenceMaturity />
      </PageSection>

      <PageSection eyebrow="Evidence pipeline" title="System Architecture">
        <ProvenanceBadge provenance="current-static-snapshot" />
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {architectureStages.map((stage, index) => (
            <Card key={stage.title} className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                <span className="font-mono text-sm text-neutral-500">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-3 leading-7 text-neutral-400">{stage.description}</p>
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm leading-6 text-neutral-300">
                {stage.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="Auditability" title="Immutable Event Architecture">
        <ProvenanceBadge provenance="current-static-snapshot" />
        <div className="mt-5 rounded-lg border border-white/10 bg-neutral-900 p-5 sm:p-6">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center" aria-label="Fit ledger to state ledger to forward outcome ledger">
            {["Fit Ledger", "State Ledger", "Forward Outcome Ledger"].map((ledger, index) => (
              <div key={ledger} className="contents">
                {index > 0 ? <span aria-hidden="true" className="hidden text-center text-neutral-600 md:block">→</span> : null}
                <div className="rounded-lg border border-white/10 bg-neutral-950 px-5 py-5 text-center">
                  <p className="text-sm font-semibold text-neutral-100">{ledger}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ledgerProperties.map((property) => (
            <div key={property} className="rounded-lg border border-white/10 px-4 py-3 text-sm leading-6 text-neutral-300">{property}</div>
          ))}
        </div>
        <p className="mt-6 max-w-4xl leading-7 text-neutral-400">
          The ledger chain makes provenance, concurrency decisions, and failure states inspectable. Historical evidence stays immutable as research interpretation evolves.
        </p>
      </PageSection>

      <PageSection eyebrow="Research operations" title="Operational Scheduler">
        <ProvenanceBadge provenance="current-static-snapshot" />
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase text-neutral-500">Seven scheduled jobs</p>
            <ol className="mt-5 space-y-3">
              {schedulerJobs.map((job, index) => (
                <li key={job} className="flex gap-4 text-neutral-300">
                  <span className="font-mono text-sm text-neutral-500">{String(index + 1).padStart(2, "0")}</span>
                  <span>{job}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase text-neutral-500">Operating controls</p>
            <ul className="mt-5 space-y-3">
              {schedulerControls.map((control) => (
                <li key={control} className="border-l border-emerald-300/40 pl-4 text-neutral-300">{control}</li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="mt-6 rounded-lg border border-white/10 bg-neutral-900 px-5 py-4 text-sm leading-6 text-neutral-300">
          Operational health is research infrastructure evidence, not a trading signal.
        </p>
      </PageSection>

      <PageSection eyebrow="2026-07-13 UTC" title="Static Operational Snapshot">
        <ProvenanceBadge provenance="current-static-snapshot" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {operationalSnapshot.map((item) => <MetricCard key={item.label} label={item.label} value={item.value} />)}
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-6 text-neutral-500">
          Static portfolio snapshot. This is not a live server monitor, model ranking, strategy approval, or trading-readiness indicator.
        </p>
      </PageSection>

      <PageSection eyebrow="Engineering scope" title="What This Project Demonstrates">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {demonstratedCapabilities.map((capability) => (
            <div key={capability} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-neutral-300">{capability}</div>
          ))}
        </div>
        <Card className="mt-6">
          <p className="text-sm font-semibold uppercase text-emerald-300">BTC research system stack</p>
          <p className="mt-4 text-lg leading-8 text-neutral-200">
            Python · pandas · NumPy · arch · SQLite · CSV event ledgers · Linux · cron · flock · GitHub · AWS Lightsail
          </p>
        </Card>
      </PageSection>

      <PageSection eyebrow="Non-negotiable constraints" title="Research Boundaries">
        <BoundaryList items={[...boundaryItems]} />
      </PageSection>
    </PageShell>
  );
}
