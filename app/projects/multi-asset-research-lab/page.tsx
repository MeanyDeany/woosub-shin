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
    "A systematic trading research platform spanning evidence contracts, deterministic replay and PnL, frozen strategy search, deep validation, and prospective forward observation before any execution authority exists.",
};

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
    title: "Frozen final-system search",
    detail:
      "Candidate definitions, costs, partitions, benchmarks, and gates are frozen before accepted-source execution so losers cannot be rescued after results appear.",
    status: "Completed V1",
    accent: "emerald" as const,
  },
  {
    index: "04",
    title: "Deep validation and strategy freeze",
    detail:
      "The sole V1 survivor is stress-tested for costs, parameter neighborhood continuity, calendar concentration, attribution, and uncertainty before a retained manifest is issued.",
    status: "Completed V1",
    accent: "emerald" as const,
  },
  {
    index: "05",
    title: "Forward research runtime",
    detail:
      "Historical strategy state is checkpointed, bridged through public completed bars, and activated behind an explicit prospective boundary with append-only research observations.",
    status: "Active",
    accent: "cyan" as const,
  },
  {
    index: "06",
    title: "Prospective evidence accumulation",
    detail:
      "New state observations now arrive after the freeze. The useful unit is not raw row count alone, but clean continuity plus genuinely new trend episodes and state transitions.",
    status: "Accumulating",
    accent: "blue" as const,
  },
  {
    index: "07",
    title: "Paper or live execution",
    detail:
      "Not part of the current system. A research result, retained strategy, or forward state never creates broker authority, sizing, leverage, or an order.",
    status: "Not approved",
    accent: "amber" as const,
  },
] as const;

const proofPoints = [
  { label: "Retained systems", value: "1 BTC research system" },
  { label: "Retrospective FULL return", value: "+165.92%" },
  { label: "FULL Sharpe / MaxDD", value: "0.769 / -29.37%" },
  { label: "Forward boundary", value: "22 Aug 2026" },
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
  "No live trading",
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
        title="The proof system now reaches a frozen strategy and a forward clock."
        intro="The Lab began as research infrastructure: prove the data, freeze the question, and keep evidence separate from execution. It now also contains deterministic replay and PnL, a frozen final-system search, deep validation, one retained BTC research system, and an explicit prospective observation boundary."
        actions={
          <>
            <CtaLink href="/projects/btc-final-system" kind="primary">
              Open BTC Final System V1
            </CtaLink>
            <CtaLink href="/projects/multi-asset-research-lab/claims">
              Read the claims ledger
            </CtaLink>
          </>
        }
        metadata={[
          { label: "Current phase", value: "Retained system · prospective observation" },
          { label: "Concrete implementation", value: "BTCUSDT 5m / Daily EMA 50/200" },
          { label: "Multi-asset status", value: "Architecture under expansion" },
          { label: "Execution authority", value: "None" },
        ]}
      />

      <CapabilityBand
        label="What the Lab now demonstrates"
        items={[
          "Verified evidence",
          "Deterministic replay",
          "Funding-adjusted PnL",
          "Frozen validation",
          "Prospective observation",
        ]}
      />

      <EditorialSection
        eyebrow="Current proof"
        title="Infrastructure is no longer the endpoint"
        intro="The strongest public result is intentionally narrow: the research stack produced one retained BTC system with an attractive retrospective result, then carried the exact frozen strategy state into a separate prospective runtime."
        tone="elevated"
      >
        <EvidenceBand accent="emerald" items={proofPoints} />
        <div className="mt-8 glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusLabel accent="emerald">Retained research system</StatusLabel>
            <ResearchTag>Daily EMA 50/200</ResearchTag>
            <ResearchTag>Long / flat</ResearchTag>
            <ResearchTag>Funding-adjusted</ResearchTag>
            <ResearchTag>Forward observation active</ResearchTag>
          </div>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-[#5F6C82]">
            The retained BTC system returned +165.92% over the FULL retrospective validation period with a 0.769 Sharpe and -29.37% maximum drawdown under the frozen 5bp Funding-adjusted accounting convention. The result survived 10bp cost stress and all thirteen deep-validation gates, but it remains post-selection historical evidence with only three completed primary trades.
          </p>
          <div className="mt-7">
            <CtaLink href="/projects/btc-final-system" kind="text">See the result, diagnostics, and forward handoff</CtaLink>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        id="architecture"
        accent="violet"
        eyebrow="System progression"
        title="Seven layers, one-way authority"
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
        intro="The program has moved further than the old infrastructure-only phase. The trading boundary has not moved with it."
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
