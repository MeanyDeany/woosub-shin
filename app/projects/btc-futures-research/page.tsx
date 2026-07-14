import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  BoundaryList,
  Card,
  MetricCard,
  PageShell,
} from "@/components/site-shell";
import { EvidenceMaturity } from "@/components/evidence-maturity";
import { ModelResponseExplorer } from "@/components/model-response-explorer";
import { MonteCarloVisual } from "@/components/monte-carlo-visual";
import { MultiAssetLineage } from "@/components/multi-asset-lineage";
import { ProvenanceBadge } from "@/components/provenance-badge";
import { RealizedVolatilityMap } from "@/components/realized-volatility-map";
import { ResearchArchitectureStrip } from "@/components/research-architecture-strip";
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

export const metadata: Metadata = {
  title: "BTC Futures Research Assistant",
  description:
    "A public research-infrastructure showcase for immutable BTCUSDT volatility forecasts, time-respecting forward outcomes, provenance, and integrity monitoring.",
};

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

const identityRows = [
  "Multi-asset research direction",
  "Immutable evidence ledgers",
  "Initial shadow-model baseline",
  "Research-only operation",
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

const sectionTones = {
  amber: "bg-[#0D0C0B]",
  base: "bg-[#07090D]",
  black: "bg-[#050608]",
  deep: "bg-[#080B11]",
  elevated: "bg-[#0B0F16]",
  neutral: "bg-[#0A0D12]",
  violet: "bg-[#090811]",
} as const;

function ResearchSection({
  children,
  eyebrow,
  intro,
  title,
  tone = "base",
}: {
  children: ReactNode;
  eyebrow: string;
  intro?: string;
  title: string;
  tone?: keyof typeof sectionTones;
}) {
  return (
    <section className={`border-t border-[#7E8B9D]/12 ${sectionTones[tone]}`}>
      <div className="mx-auto max-w-[1260px] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-9 max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-normal text-[#42D7F5]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-[#F4F7FB] sm:text-4xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#7E8B9D]">{intro}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function BtcFuturesResearchPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-[#07090D]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(66,215,245,0.045),transparent_28%,transparent_70%,rgba(155,108,255,0.055))]"
        />
        <div className="relative mx-auto max-w-[1520px] px-5 py-10 sm:py-12 lg:px-8 xl:px-10">
          <div className="grid min-w-0 gap-10 xl:grid-cols-12 xl:items-center xl:gap-7">
            <div className="min-w-0 xl:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-normal text-[#42D7F5]">
                Quant research infrastructure
              </p>
              <h1 className="mt-5 text-[42px] font-semibold leading-[1.02] tracking-normal text-[#F4F7FB] sm:text-[52px] xl:text-[64px] 2xl:text-[72px]">
                BTC Futures Research Assistant
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#B6C0CF]">
                Research infrastructure for immutable volatility forecasts, factual
                forward outcome validation, and operational integrity monitoring.
              </p>
              <div className="mt-8 border-t border-[#7E8B9D]/15">
                {identityRows.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-[#7E8B9D]/10 py-3 text-sm text-[#7E8B9D]"
                  >
                    <span className="font-mono text-[10px] text-[#42D7F5]">
                      0{index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0 xl:col-span-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
                  Discrete model surface
                </p>
                <span className="font-mono text-[10px] text-[#475466]">NORMALIZED · ILLUSTRATIVE</span>
              </div>
              <VolatilitySurfaceLoader />
            </div>

            <aside className="grid min-w-0 gap-4 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-1">
              <div className="rounded-lg border border-[#7E8B9D]/15 bg-[#0B0F16]/90 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-normal text-[#B6C0CF]">
                  Research context
                </p>
                <div className="mt-4 space-y-4">
                  <ContextRow asset="BTCUSDT" provenance="current-static-snapshot" />
                  <ContextRow asset="NQ" provenance="academic-context" />
                  <ContextRow asset="ES" provenance="academic-context" />
                  <ContextRow asset="GC" provenance="planned-research" />
                </div>
              </div>

              <div className="rounded-lg border border-[#FFB547]/20 bg-[#0D0C0B]/90 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-normal text-[#B6C0CF]">
                  Initial public evidence snapshot
                </p>
                <dl className="mt-4 divide-y divide-[#7E8B9D]/12">
                  {[
                    ["Shadow models at baseline", "4"],
                    ["Initial outcome rows", "8"],
                    ["Baseline maturity", "BOOTSTRAP"],
                    ["Reviewable threshold", "168+"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-xs text-[#7E8B9D]">{label}</dt>
                      <dd className="font-mono text-xs font-semibold text-[#F4F7FB]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-4">
            {heroBoundaries.map((item) => (
              <p key={item} className="bg-[#080B11] px-4 py-4 text-sm leading-6 text-[#B6C0CF]">
                {item}
              </p>
            ))}
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-[#7E8B9D]">
            Model outputs remain descriptive research evidence. They are never presented as strategy approval.
          </p>
        </div>
      </section>

      <ResearchArchitectureStrip />

      <ResearchSection eyebrow="Purpose and contribution" title="Evidence infrastructure, not a strategy layer" tone="base">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h3 className="text-xl font-semibold text-[#F4F7FB]">Project Overview</h3>
            <p className="mt-5 text-lg leading-8 text-[#B6C0CF]">
              The system preserves factual research history so forecasts, realized outcomes,
              and operational checks can be reproduced and audited without rewriting prior evidence.
            </p>
            <p className="mt-5 leading-7 text-[#7E8B9D]">
              Its role ends at evidence generation. Strategy interpretation and execution sit outside the system boundary.
            </p>
            <ul className="mt-8 divide-y divide-[#7E8B9D]/12 border-y border-[#7E8B9D]/12">
              {overviewPrinciples.map((item) => (
                <li key={item} className="py-4 text-sm leading-6 text-[#B6C0CF]">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#F4F7FB]">My Role</h3>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {roleItems.map((item, index) => (
                <li key={item} className="flex gap-3 border-b border-[#7E8B9D]/12 py-4 text-sm leading-6 text-[#B6C0CF]">
                  <span className="font-mono text-[10px] text-[#42D7F5]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ResearchSection>

      <ResearchSection eyebrow="Research lineage" title="Multi-asset research progression" tone="deep">
        <MultiAssetLineage />
      </ResearchSection>

      <ResearchSection
        eyebrow="Public snapshot forecast category"
        title="Baseline forecast models"
        intro="The initial public snapshot records four statistical specifications producing comparable raw next-hour decimal variance evidence."
        tone="elevated"
      >
        <ProvenanceBadge provenance="current-static-snapshot" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {shadowModels.map((model, index) => (
            <Card key={model.name} className="relative overflow-hidden">
              <span className="absolute inset-y-6 left-0 w-px bg-[#9B6CFF]/70" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                <span className="font-mono text-[10px] text-[#7E8B9D]">0{index + 1}</span>
              </div>
              <p className="mt-3 leading-7 text-[#7E8B9D]">{model.description}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 border-l border-[#3DDC97]/45 pl-5 text-sm leading-7 text-[#B6C0CF]">
          Their outputs are not market regimes, direction forecasts, entry signals, vetoes, sizing instructions, leverage decisions, or trading permissions.
        </p>

        <div className="mt-20 border-t border-[#7E8B9D]/12 pt-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-normal text-[#42D7F5]">Feature ecosystem</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#F4F7FB] sm:text-3xl">
              Realized-volatility research map
            </h3>
          </div>
          <RealizedVolatilityMap />
        </div>
      </ResearchSection>

      <ResearchSection eyebrow="Conceptual mechanics" title="Model response explorer" tone="base">
        <ModelResponseExplorer />
        <div className="mt-16 border-t border-[#7E8B9D]/12 pt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-normal text-[#42D7F5]">Historical research context</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F4F7FB]">Prior benchmarks and challengers</h3>
            </div>
            <ProvenanceBadge provenance="academic-context" />
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-4">
            {priorBenchmarks.map((model) => (
              <div key={model} className="bg-[#080B11] px-5 py-5">
                <p className="font-semibold text-[#F4F7FB]">{model}</p>
                <p className="mt-2 text-[10px] uppercase tracking-normal text-[#7E8B9D]">Prior benchmark research</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[#7E8B9D]">
            These are historical benchmark contexts, not shadow models recorded in the initial public baseline. No comparative performance claim is presented.
          </p>
        </div>
      </ResearchSection>

      <ResearchSection eyebrow="Uncertainty" title="Monte Carlo variance uncertainty" tone="violet">
        <MonteCarloVisual />
      </ResearchSection>

      <ResearchSection eyebrow="Evidence discipline" title="Evidence maturity" tone="amber">
        <EvidenceMaturity />
      </ResearchSection>

      <ResearchSection
        eyebrow="Evidence pipeline"
        title="System architecture"
        intro="A deterministic path from completed market data to inspectable model evidence and operational health."
        tone="neutral"
      >
        <ProvenanceBadge provenance="current-static-snapshot" />
        <ol className="mt-7 divide-y divide-[#7E8B9D]/12 border-y border-[#7E8B9D]/12">
          {architectureStages.map((stage, index) => (
            <li key={stage.title} className="grid gap-5 py-7 md:grid-cols-[3.5rem_0.8fr_1.2fr] md:items-start">
              <span className="font-mono text-sm text-[#42D7F5]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold text-[#F4F7FB]">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#7E8B9D]">{stage.description}</p>
              </div>
              <ul className="grid gap-2 text-sm leading-6 text-[#B6C0CF] sm:grid-cols-2">
                {stage.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </ResearchSection>

      <ResearchSection eyebrow="Auditability" title="Immutable event architecture" tone="deep">
        <ProvenanceBadge provenance="current-static-snapshot" />
        <div className="mt-7 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center" aria-label="Fit ledger to state ledger to forward outcome ledger">
          {["Fit Ledger", "State Ledger", "Forward Outcome Ledger"].map((ledger, index) => (
            <div key={ledger} className="contents">
              {index > 0 ? <span aria-hidden="true" className="hidden text-center text-[#475466] md:block">→</span> : null}
              <div className="rounded-lg border border-[#FFB547]/20 bg-[#0E131C] px-5 py-6 text-center">
                <p className="text-sm font-semibold text-[#F4F7FB]">{ledger}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-3">
          {ledgerProperties.map((property) => (
            <div key={property} className="bg-[#080B11] px-4 py-3 text-sm leading-6 text-[#B6C0CF]">{property}</div>
          ))}
        </div>
        <p className="mt-7 max-w-4xl leading-7 text-[#7E8B9D]">
          The ledger chain makes provenance, concurrency decisions, and failure states inspectable. Historical evidence stays immutable as research interpretation evolves.
        </p>
      </ResearchSection>

      <ResearchSection eyebrow="Research operations" title="Operational scheduler" tone="neutral">
        <ProvenanceBadge provenance="current-static-snapshot" />
        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-normal text-[#7E8B9D]">Seven scheduled jobs</p>
            <ol className="mt-4 divide-y divide-[#7E8B9D]/12 border-y border-[#7E8B9D]/12">
              {schedulerJobs.map((job, index) => (
                <li key={job} className="flex gap-4 py-3 text-sm text-[#B6C0CF]">
                  <span className="font-mono text-[10px] text-[#42D7F5]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{job}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-normal text-[#7E8B9D]">Operating controls</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {schedulerControls.map((control) => (
                <li key={control} className="border-l border-[#3DDC97]/40 pl-4 text-sm leading-6 text-[#B6C0CF]">{control}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 rounded-lg border border-[#7E8B9D]/15 bg-[#080B11] px-5 py-4 text-sm leading-6 text-[#B6C0CF]">
          Operational health is research infrastructure evidence, not a trading signal.
        </p>

        <div className="mt-20 border-t border-[#7E8B9D]/12 pt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-normal text-[#42D7F5]">Public showcase baseline · 2026-07-13 UTC</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F4F7FB] sm:text-3xl">Initial public operational snapshot</h3>
            </div>
            <ProvenanceBadge provenance="current-static-snapshot" />
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operationalSnapshot.map((item) => <MetricCard key={item.label} label={item.label} value={item.value} />)}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-6 text-[#7E8B9D]">
            Fixed portfolio baseline for the initial public showcase. It does not refresh, does not represent a production server, and is not a live monitor, model ranking, strategy approval, or trading-readiness indicator.
          </p>
        </div>
      </ResearchSection>

      <ResearchSection eyebrow="Engineering scope" title="What this project demonstrates" tone="base">
        <div className="grid gap-px overflow-hidden rounded-lg border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-3">
          {demonstratedCapabilities.map((capability) => (
            <div key={capability} className="bg-[#0E131C] px-5 py-5 text-sm leading-6 text-[#B6C0CF]">{capability}</div>
          ))}
        </div>
        <div className="mt-8 border-l border-[#42D7F5]/45 pl-5">
          <p className="text-xs font-semibold uppercase tracking-normal text-[#42D7F5]">BTC research system stack</p>
          <p className="mt-4 text-lg leading-8 text-[#DCE3EC]">
            Python · pandas · NumPy · arch · SQLite · CSV event ledgers · Linux · cron · flock · GitHub · AWS Lightsail
          </p>
        </div>
      </ResearchSection>

      <ResearchSection eyebrow="Non-negotiable constraints" title="Research boundaries" tone="black">
        <BoundaryList items={[...boundaryItems]} />
      </ResearchSection>
    </PageShell>
  );
}

function ContextRow({
  asset,
  provenance,
}: {
  asset: string;
  provenance: "academic-context" | "current-static-snapshot" | "planned-research";
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="font-mono text-xs font-semibold text-[#F4F7FB]">{asset}</span>
      <ProvenanceBadge provenance={provenance} />
    </div>
  );
}
