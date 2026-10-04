import { metadataFor } from "@/lib/site-metadata";
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

export const metadata = metadataFor(
  "/projects/multi-asset-research-lab",
  "Multi-Asset Research Lab",
  "Research-infrastructure lineage: data contracts, deterministic replay, frozen comparisons, historical validation, and explicit research-only authority boundaries.",
);

const progression = [
  {
    index: "01",
    title: "Research contracts and evidence identity",
    detail:
      "Source provenance, timestamps, immutable manifests, canonical hashes, and failure boundaries define what a later research claim is allowed to depend on.",
    status: "Operational",
    accent: "emerald" as const,
  },
  {
    index: "02",
    title: "Deterministic replay and PnL",
    detail:
      "A shared strategy contract replays completed BTCUSDT bars with explicit next-open timing, authenticated Funding, transaction costs, deterministic outputs, and independent reconciliation.",
    status: "Operational",
    accent: "emerald" as const,
  },
  {
    index: "03",
    title: "R15 signal and payoff research",
    detail:
      "A raw-return reference connects multi-timeframe predictors to a 15-minute target under explicit timing and hypothetical zero-friction accounting.",
    status: "Retained",
    accent: "emerald" as const,
  },
  {
    index: "04",
    title: "Volatility-aware and ensemble model development",
    detail:
      "Target normalization and scale-aligned signal blending produced positive gross results. Fixed paired comparisons kept model selection separate from headline returns.",
    status: "Completed",
    accent: "emerald" as const,
  },
  {
    index: "05",
    title: "Bound source-role runtime",
    detail:
      "R15 is bound behind a WSS-primary, mandatory asynchronous REST-audit contract with fail-closed quarantine and deterministic replay.",
    status: "Offline validated",
    accent: "cyan" as const,
  },
  {
    index: "06",
    title: "Prospective validation",
    detail:
      "The 3 Oct 2026 checkpoint records readiness for separately governed observation, with zero forward-valid origins at that checkpoint and no live-trading approval.",
    status: "Not yet passed",
    accent: "blue" as const,
  },
  {
    index: "07",
    title: "Paper or live execution",
    detail:
      "Outside this research system. A research result, retained strategy, or forward state never creates broker authority, sizing, leverage, or an order.",
    status: "Not approved",
    accent: "amber" as const,
  },
] as const;

const proofPoints = [
  { label: "Retained candidate", value: "R15_RAW_1X" },
  { label: "FULL zero-friction gross return", value: "+1,463.45%" },
  { label: "RECENT gross return / Sharpe", value: "+108.63% / 1.719" },
  { label: "Source-role checkpoint", value: "3 Oct 2026 / offline verified" },
] as const;

const principles = [
  {
    title: "Freeze before looking",
    detail:
      "Scientific definitions, source identities, cost assumptions, partitions, and decision gates are frozen before the accepted run begins.",
  },
  {
    title: "One accounting engine",
    detail:
      "Historical strategy comparisons share the same causal timing, Funding convention, cost treatment, benchmarks, and reconciliation surface.",
  },
  {
    title: "Failures stay visible",
    detail:
      "Discarded features and failed strategy archetypes remain part of the research history instead of disappearing after a survivor emerges.",
  },
  {
    title: "Forward means after activation",
    detail:
      "Historical and bridge context cannot be relabeled as prospective evidence. Forward observation begins only after an explicit authenticated handoff boundary.",
  },
] as const;

const boundaries = [
  "No live trading in the research runtime",
  "No paper trading approval",
  "No private Binance or broker integration",
  "No order submission, cancellation, or routing",
  "No entry or short permission",
  "No leverage or position sizing",
  "No automatic strategy approval from historical performance",
  "No claim that retrospective return is a live track record",
  "No claim that one forward observation validates future profitability",
] as const;

export default function MultiAssetResearchLabPage() {
  return (
    <PageShell>
      <PageHero
        accent="cyan"
        eyebrow="Multi-Asset Research Lab"
        title="Research infrastructure and its historical lineage."
        intro="The Lab documents data contracts, deterministic replay, frozen comparisons, R15 gross-candidate validation, and the source-role runtime now waiting for prospective evidence. ASRA is the current research program; historical findings and execution authority remain separate."
        actions={
          <>
            <CtaLink href="/asra" kind="primary">
              Explore ASRA
            </CtaLink>
            <CtaLink href="/projects/multi-asset-research-lab/claims">
              Read the claims ledger
            </CtaLink>
          </>
        }
        metadata={[
          { label: "Historical scope", value: "R15 exposed historical development" },
          { label: "Concrete implementation", value: "BTCUSDT / R15 15-minute payoff research" },
          { label: "Multi-asset scope", value: "Asset-neutral architecture; BTC implementation" },
          { label: "Execution authority", value: "None" },
        ]}
      />

      <CapabilityBand
        label="What this infrastructure demonstrates"
        items={[
          "Verified evidence",
          "Deterministic replay",
          "Funding-adjusted PnL",
          "Frozen validation",
          "Prospective observation",
        ]}
      />

      <EditorialSection
        eyebrow="R15 model development"
        title="From signal design to comparative validation"
        intro="R15 brings raw-return prediction, volatility-aware targets and ensemble design into a shared research framework. Results are hypothetical and before all trading frictions; they are distinct from the personal account record."
        tone="elevated"
      >
        <EvidenceBand accent="emerald" items={proofPoints} />
        <div className="mt-8 glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusLabel accent="blue">Historical model research</StatusLabel>
            <ResearchTag>R15_RAW_1X</ResearchTag>
            <ResearchTag>Long / short / pass</ResearchTag>
            <ResearchTag>Zero-friction gross</ResearchTag>
            <ResearchTag>Source-role runtime</ResearchTag>
          </div>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-[#5F6C82]">
            R15_RAW_1X returned +1,463.45% over the FULL zero-friction replay with a 1.955 daily Sharpe and -46.03% minute-open maximum drawdown. RECENT returned +108.63% with a 1.719 Sharpe and -27.55% MDD. Commission, spread, slippage, and funding are zero in these cited payoff results, so this remains exposed historical development rather than execution-confirmed profitability.
          </p>
          <div className="mt-7">
            <CtaLink href="/projects/btc-final-system" kind="text">See the R15 result, diagnostics, and runtime boundary</CtaLink>
            <div className="mt-4"><CtaLink href="/research/risk-forecasting#independent-assessment">Inspect independent risk forecast confirmation</CtaLink></div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        id="architecture"
        accent="violet"
        eyebrow="System progression"
        title="Research progression with a separate execution boundary"
        intro="Each layer can add evidence or operational discipline. None can silently grant the authority of the layer after it."
        tone="deep"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {progression.map((layer) => (
            <article key={layer.index} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#7251C8]">{layer.index}</span>
                <StatusLabel accent={layer.accent}>{layer.status}</StatusLabel>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] text-[#111A2E]">
                {layer.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[#657189]">{layer.detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Research operating rules"
        title="The result matters because the path to it is inspectable"
        intro="Simple trading logic is not the differentiator. The harder part is proving what data, timing, costs, state, and decisions actually produced the result."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map((item, index) => (
            <article key={item.title} className="glass-panel rounded-[1.75rem] p-6 sm:p-7">
              <span className="font-mono text-xs text-[#2563C9]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#111A2E]">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#657189]">{item.detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        id="boundaries"
        accent="amber"
        eyebrow="Non-negotiable boundary"
        title="Research state is still not execution authority"
        intro="These restrictions apply to the research Lab and retained research runtime. Separate execution-system telemetry does not grant research findings automatic authority."
        tone="warm"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {boundaries.map((item, index) => (
            <div key={item} className="glass-panel rounded-[1.5rem] p-5">
              <span className="font-mono text-[0.65rem] text-[#A85D08]">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm leading-6 text-[#5F6C82]">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CtaLink href="/projects/multi-asset-research-lab/claims">Read claim-by-claim boundaries</CtaLink>
          <CtaLink href="/build-log">Read the build history</CtaLink>
          <CtaLink href="/projects/btc-futures-research">Open the underlying BTC evidence system</CtaLink>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
