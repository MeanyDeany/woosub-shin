import type { Metadata } from "next";
import {
  CapabilityBand,
  CtaLink,
  EditorialSection,
  EvidenceBand,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Multi-Asset Research Lab",
  description:
    "An asset-neutral quantitative research framework for deterministic contracts, controlled market-data evidence, canonical normalization, persistent run bundles, and offline verification.",
};

const architecture = [
  {
    index: "01",
    title: "Research contracts",
    detail:
      "Immutable declarations define assets, sessions, bar schemas, costs, datasets, code revisions, environments, slices, parameters, and randomness before execution exists.",
    status: "Complete foundation",
  },
  {
    index: "02",
    title: "Controlled data boundary",
    detail:
      "A provider-neutral HTTPS transport admits only bounded, allowlisted public GET requests. The first concrete lifecycle is fixed to historical BTCUSDT five-minute bars.",
    status: "Narrow concrete adapter",
  },
  {
    index: "03",
    title: "Canonical evidence",
    detail:
      "Raw response bytes, normalized CSV, manifests, receipts, and observations use deterministic identities so equivalent evidence remains byte-stable across machines and paths.",
    status: "Verified lifecycle",
  },
  {
    index: "04",
    title: "Persistent research runs",
    detail:
      "Completed evidence is published atomically into immutable run bundles with exact-tree verification, completion markers, bounded rollback, and relocation-safe identity.",
    status: "Offline verifiable",
  },
] as const;

const lifecycle = [
  {
    label: "Declare",
    detail: "Bind the exact asset, interval, dataset, code, environment, and research boundary.",
  },
  {
    label: "Plan",
    detail: "Construct the request and expected artifact graph without network or filesystem mutation.",
  },
  {
    label: "Capture",
    detail: "Store exact public response bytes through a bounded no-retry HTTPS boundary.",
  },
  {
    label: "Normalize",
    detail: "Convert the admitted raw structure into canonical CSV and independently verify it.",
  },
  {
    label: "Publish",
    detail: "Create one deterministic run bundle only after all source evidence reconciles.",
  },
  {
    label: "Reload and verify",
    detail: "Reconstruct the fixed graph from untrusted disk JSON and delegate to the authoritative verifier.",
  },
] as const;

const milestones = [
  "Asset-neutral core contracts",
  "Deterministic DatasetManifest and ExperimentManifest identity",
  "Synthetic fixture verification and controlled local ingestion",
  "Bounded provider-neutral HTTPS response capture",
  "Fixed Binance USD-M BTCUSDT raw snapshot adapter",
  "Raw kline to canonical CSV normalization",
  "Atomic persistent research-run bundles",
  "Safe planning and acknowledged publication CLI",
  "Sanitized transport failure diagnostics",
  "Bounded run deserialization and offline verify-run CLI",
] as const;

const boundaries = [
  "No experiment execution yet",
  "No feature or model runner",
  "No strategy selection or approval",
  "No freezer-state mutation",
  "No paper or live trading",
  "No position, sizing, leverage, or order API",
  "No credentials or private exchange endpoints",
  "No automatic retries or alternate providers",
  "No database, scheduler, server, or deployment requirement",
  "No dependency on the separate BTC research repository",
] as const;

const nextSteps = [
  {
    title: "Experiment run identity",
    detail:
      "Bind one exact ExperimentManifest to declared dataset-observation identities without executing code.",
  },
  {
    title: "Typed result evidence",
    detail:
      "Record deterministic research metrics while keeping evidence separate from model or strategy approval.",
  },
  {
    title: "Synthetic-only runner",
    detail:
      "Only after the run and result contracts are frozen, add a tightly bounded in-memory execution proof using synthetic data.",
  },
] as const;

export default function MultiAssetResearchLabPage() {
  return (
    <PageShell>
      <PageHero
        accent="cyan"
        eyebrow="Flagship research infrastructure"
        title="Multi-Asset Research Lab"
        intro="An asset-neutral framework that defines identity, provenance, failure boundaries, and reproducibility before experiment execution. The current implementation proves one narrow public-data lifecycle from controlled bytes to an independently verifiable research run."
        actions={
          <>
            <CtaLink href="#architecture" kind="primary">
              Inspect the architecture
            </CtaLink>
            <CtaLink href="/projects/btc-futures-research" kind="secondary">
              Open the separate BTC system
            </CtaLink>
          </>
        }
        metadata={[
          { label: "Phase", value: "Foundation and evidence lifecycle" },
          { label: "Design", value: "Asset-neutral contracts" },
          { label: "Concrete source", value: "BTCUSDT 5m public historical bars" },
          { label: "Execution", value: "Not implemented" },
        ]}
      />

      <CapabilityBand
        label="Current build"
        items={[
          "Immutable contracts",
          "Canonical identities",
          "Controlled acquisition",
          "Persistent evidence",
          "Offline verification",
        ]}
      />

      <EditorialSection
        id="architecture"
        eyebrow="System architecture"
        title="Build the proof system before the research engine"
        intro="The lab deliberately starts with contracts and evidence mechanics. A future model runner will inherit these boundaries rather than inventing them after results appear."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {architecture.map((layer) => (
            <article key={layer.index} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#087E9B]">{layer.index}</span>
                <StatusLabel accent="cyan">{layer.status}</StatusLabel>
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-[#111A2E] sm:text-3xl">
                {layer.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-[#657189]">{layer.detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        id="evidence-lifecycle"
        accent="blue"
        eyebrow="Evidence lifecycle"
        title="One bounded chain from declaration to offline verification"
        intro="Each step narrows what may happen next. A later stage cannot silently repair or reinterpret an earlier stage."
        tone="deep"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <ol className="overflow-hidden rounded-[2rem] border border-[#7187AB]/15 bg-white/34">
            {lifecycle.map((step, index) => (
              <li
                key={step.label}
                className="grid gap-4 border-b border-[#7187AB]/14 p-6 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-7"
              >
                <span className="font-mono text-xs text-[#2563C9]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-[#111A2E]">{step.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#657189]">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#2563C9]">
              Evidence properties
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Exact bytes",
                "Path-free identity",
                "No ambient clock",
                "No silent overwrite",
                "No retry",
                "Relocation safe",
                "Fail closed",
                "Read-only reload",
              ].map((item) => (
                <ResearchTag key={item}>{item}</ResearchTag>
              ))}
            </div>
            <p className="mt-8 text-base leading-7 text-[#657189]">
              The first provider-specific implementation is intentionally narrow. It
              demonstrates the architecture without pretending to be a general market-data
              platform or production trading system.
            </p>
          </aside>
        </div>
      </EditorialSection>

      <EditorialSection
        id="current-state"
        accent="emerald"
        eyebrow="Current state"
        title="The foundation now reaches verified offline runs"
        intro="The implementation has progressed from pure declarations to a complete, bounded evidence lifecycle while keeping experiment execution outside the repository."
        tone="elevated"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <StatusLabel accent="emerald">Foundation operational</StatusLabel>
            <p className="mt-7 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111A2E]">
              Data evidence can be planned, captured, normalized, published, reloaded, and
              independently verified.
            </p>
            <p className="mt-5 text-base leading-7 text-[#657189]">
              That statement concerns research evidence only. It does not establish provider
              truth, research fitness, model validity, strategy approval, or execution
              authority.
            </p>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2">
            {milestones.map((milestone, index) => (
              <li key={milestone} className="glass-panel flex gap-4 rounded-2xl p-5">
                <span className="font-mono text-[0.65rem] text-[#08765A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-6 text-[#5F6C82]">{milestone}</span>
              </li>
            ))}
          </ol>
        </div>
      </EditorialSection>

      <EditorialSection
        id="repository-separation"
        accent="violet"
        eyebrow="Repository boundary"
        title="The framework and the BTC freezer remain separate systems"
        intro="The new lab is not a rename or migration of the existing BTC research assistant. It establishes reusable contracts and evidence boundaries without inheriting operational behavior by accident."
      >
        <EvidenceBand
          accent="violet"
          items={[
            { label: "Multi-asset lab", value: "Contracts, data evidence, run identity, verification" },
            { label: "BTC system", value: "Volatility models, freezer observations, operational validation" },
            { label: "Shared principle", value: "Evidence is not execution authority" },
            { label: "Integration", value: "Future validated artifact boundary only" },
          ]}
        />
      </EditorialSection>

      <EditorialSection
        id="boundaries"
        accent="amber"
        eyebrow="Hard boundaries"
        title="What the lab cannot authorize"
        intro="The absence of an execution layer is a design requirement, not an unfinished trading feature."
        tone="warm"
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {boundaries.map((boundary) => (
            <li key={boundary} className="glass-panel rounded-2xl px-5 py-4 text-sm leading-6 text-[#5F6C82]">
              {boundary}
            </li>
          ))}
        </ul>
      </EditorialSection>

      <EditorialSection
        id="next"
        accent="blue"
        eyebrow="Next build"
        title="Move from evidence identity toward synthetic experiment proof"
        intro="The next increments remain declaration-first. Results will gain deterministic identities before any real experiment runner is introduced."
        tone="deep"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <article key={step.title} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <span className="font-mono text-xs text-[#2563C9]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] text-[#111A2E]">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#657189]">{step.detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>
    </PageShell>
  );
}
