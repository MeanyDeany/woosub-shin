import type { Metadata } from "next";
import {
  CtaLink,
  EditorialSection,
  EvidenceBand,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "BTC Final Research System V1",
  description:
    "The retained BTCUSDT Daily Dual EMA 50/200 research system, its retrospective validation result, disclosed limitations, and prospective forward-observation runtime.",
};

const primaryMetrics = [
  { label: "FULL return", value: "+165.92%" },
  { label: "CAGR", value: "+23.83%" },
  { label: "Sharpe", value: "0.769" },
  { label: "Max drawdown", value: "-29.37%" },
] as const;

const references = [
  {
    name: "Dual EMA 50/200 · retained",
    returnValue: "+165.92%",
    sharpe: "0.769",
    drawdown: "-29.37%",
    note: "5bp funding-adjusted research accounting",
  },
  {
    name: "BTC price-only buy & hold",
    returnValue: "+38.33%",
    sharpe: "0.394",
    drawdown: "-66.94%",
    note: "Exact-period reference",
  },
  {
    name: "BTC perpetual long · funding-adjusted",
    returnValue: "+2.27%",
    sharpe: "0.265",
    drawdown: "-68.12%",
    note: "Exact-period reference",
  },
] as const;

const validationFunnel = [
  ["01", "Frozen search", "Three low-turnover long/flat candidates were defined before the accepted-source search ran."],
  ["02", "Single survivor", "Daily Dual EMA 50/200 was the only candidate to pass all eight frozen search gates."],
  ["03", "Deep validation", "The retained candidate passed all thirteen frozen retention gates, including 10bp cost stress and neighborhood continuity."],
  ["04", "Strategy freeze", "EMA periods, warmup, daily aggregation, state mapping, and next-5m-open timing were frozen into a retained manifest."],
  ["05", "Forward handoff", "Historical state was bridged into the public-data runtime without publishing bridge bars as forward evidence."],
  ["06", "Prospective observation", "The first retained forward research observation was recorded from the 08:30 UTC bar on 22 Aug 2026."],
] as const;

const limitations = [
  "Only three completed primary trades exist in the retrospective sample.",
  "One long trend accounted for 97.4% of positive completed-trade log growth.",
  "Paired block-bootstrap Sharpe-difference intervals cross zero in both LATER and FULL partitions.",
  "The historical sample participated in research and candidate selection; this is retrospective post-selection evidence, not untouched OOS confirmation.",
  "Fixed transition friction does not include additional slippage or market impact.",
  "Forward observations are research-state records only. They are not orders, positions, entries, or a live performance track record.",
] as const;

const strategyRules = [
  "BTCUSDT · Binance USD-M · completed 5-minute factual bars",
  "Exact UTC-day aggregation with 365 completed UTC-day warmup",
  "EMA50 and EMA200, each SMA-seeded before recursive updates",
  "EMA50 > EMA200 → LONG_RESEARCH_STATE; otherwise FLAT_RESEARCH_STATE",
  "Daily decision becomes effective only at the next exact 5-minute open",
  "No short, leverage, position sizing, stop, take-profit, broker, or order surface",
] as const;

export default function BtcFinalSystemPage() {
  return (
    <PageShell>
      <PageHero
        accent="cyan"
        eyebrow="BTC Final Research System V1"
        title="A frozen BTC research system now has both a historical result and a forward clock."
        intro="Daily Dual EMA 50/200 was selected from a frozen search, survived a separate deep-validation contract, and was then handed into an append-only public-data runtime. The historical result is strong enough to study and uncertain enough to keep in its lane."
        actions={
          <>
            <CtaLink href="#result" kind="primary">See the historical result</CtaLink>
            <CtaLink href="#forward">See the forward boundary</CtaLink>
          </>
        }
        metadata={[
          { label: "Status", value: "Retained research system" },
          { label: "Forward state", value: "Prospective observation active" },
          { label: "Trading authority", value: "None" },
          { label: "Strategy", value: "Daily Dual EMA 50/200 · long/flat" },
        ]}
      />

      <EditorialSection
        id="result"
        eyebrow="Retrospective result"
        title="The research engine finally produced something falsifiable"
        intro="FULL covers 1 Jan 2022 through 30 Jul 2026 under 5bp per transition side and exact authenticated funding. These are research metrics, not a live track record."
        tone="elevated"
      >
        <EvidenceBand accent="emerald" items={primaryMetrics} />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {references.map((item, index) => (
            <article key={item.name} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#087E9B]">0{index + 1}</span>
                {index === 0 ? <StatusLabel accent="emerald">Retained</StatusLabel> : <StatusLabel accent="blue">Reference</StatusLabel>}
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] text-[#111A2E]">{item.name}</h3>
              <dl className="mt-7 divide-y divide-[#7187AB]/14 border-y border-[#7187AB]/14">
                {[
                  ["Return", item.returnValue],
                  ["Sharpe", item.sharpe],
                  ["MaxDD", item.drawdown],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-xs uppercase tracking-[0.1em] text-[#77839A]">{label}</dt>
                    <dd className="font-mono text-sm font-semibold text-[#111A2E]">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-6 text-[#657189]">{item.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["10bp stress", "+165.12%", "Sharpe 0.767 · MaxDD -29.37%"],
            ["Ex-2024 return", "+35.56%", "Strongest full calendar year neutralized"],
            ["EMA neighborhood", "8 / 8 positive", "6 / 8 also beat B&H Sharpe in LATER and FULL"],
          ].map(([label, value, detail]) => (
            <article key={label} className="glass-panel rounded-[1.75rem] p-6">
              <p className="text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-[#77839A]">{label}</p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#111A2E]">{value}</p>
              <p className="mt-3 text-sm leading-6 text-[#657189]">{detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Validation funnel"
        title="The result had to survive a sequence, not a screenshot"
        intro="Search, validation, freeze, and runtime handoff were separated so later layers could not rewrite earlier evidence after seeing the outcome."
        tone="deep"
      >
        <ol className="grid gap-4 lg:grid-cols-2">
          {validationFunnel.map(([index, title, detail]) => (
            <li key={index} className="glass-panel rounded-[1.75rem] p-6 sm:p-7">
              <div className="flex gap-5">
                <span className="font-mono text-xs text-[#7251C8]">{index}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#111A2E]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#657189]">{detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        id="forward"
        accent="cyan"
        eyebrow="Prospective forward boundary"
        title="The historical system crossed into a new clock on 22 Aug 2026"
        intro="The handoff preserved causal strategy state while preventing historical bridge bars from being relabeled as prospective evidence."
        tone="elevated"
      >
        <EvidenceBand
          accent="cyan"
          items={[
            { label: "Activated", value: "22 Aug 2026 · 08:29:51 UTC" },
            { label: "Bridge", value: "6,626 completed 5m bars" },
            { label: "First forward bar", value: "08:30:00 UTC" },
            { label: "First effective state", value: "FLAT · from 08:35 UTC" },
          ]}
        />

        <div className="mt-8 glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusLabel accent="emerald">Research only</StatusLabel>
            <ResearchTag>Append-only forward ledger</ResearchTag>
            <ResearchTag>Checkpoint-backed state</ResearchTag>
            <ResearchTag>No retroactive forward rows</ResearchTag>
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-4">
            {[
              ["Historical seed", "30 Jul · 08:10", "Immutable retained state"],
              ["Bootstrap context", "22 Aug · 08:20", "Public completed bars only"],
              ["Handoff context", "22 Aug · 08:25", "Not forward evidence"],
              ["Forward", "22 Aug · 08:30", "Effective from 08:35"],
            ].map(([label, time, detail]) => (
              <div key={label} className="rounded-[1.35rem] border border-[#7187AB]/16 bg-white/42 p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#087E9B]">{label}</p>
                <p className="mt-3 font-mono text-sm font-semibold text-[#111A2E]">{time}</p>
                <p className="mt-2 text-sm leading-6 text-[#657189]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Frozen strategy"
        title="Simple rule, heavy evidence plumbing"
        intro="The retained strategy itself is intentionally interpretable. Most of the engineering exists to make the input clock, state history, accounting, and handoff auditable."
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#111A2E]">Scientific definition</h3>
            <ul className="mt-6 divide-y divide-[#7187AB]/14 border-y border-[#7187AB]/14">
              {strategyRules.map((item) => (
                <li key={item} className="py-4 text-sm leading-6 text-[#5F6C82]">{item}</li>
              ))}
            </ul>
          </article>
          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#111A2E]">What remains uncertain</h3>
            <ul className="mt-6 space-y-4">
              {limitations.map((item, index) => (
                <li key={item} className="flex gap-4 text-sm leading-6 text-[#5F6C82]">
                  <span className="font-mono text-[0.65rem] text-[#A85D08]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Interpretation"
        title="A retained research system is still not a trading approval"
        intro="The strongest public claim is narrow: one frozen BTC research system produced an attractive retrospective result and is now accumulating prospective research-state observations under an explicit forward boundary."
        tone="warm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
            <StatusLabel accent="emerald">Supported</StatusLabel>
            <p className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111A2E]">
              Historical evidence, exact accounting, explicit robustness tests, frozen state, and prospective observation are all operational.
            </p>
          </article>
          <article className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
            <StatusLabel accent="amber">Not authorized</StatusLabel>
            <p className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111A2E]">
              No broker, order routing, entry permission, short permission, leverage, sizing, paper trading, or live trading exists in this system.
            </p>
          </article>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CtaLink href="/projects/btc-futures-research">Open the underlying BTC evidence system</CtaLink>
          <CtaLink href="/projects/multi-asset-research-lab/claims">Read the claims ledger</CtaLink>
          <CtaLink href="/build-log">Read the build log</CtaLink>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
