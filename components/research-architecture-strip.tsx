import { ProvenanceBadge } from "@/components/provenance-badge";

const assets = [
  { label: "BTCUSDT Futures", provenance: "current-static-snapshot" as const },
  { label: "E-mini Nasdaq-100 Futures (NQ)", provenance: "academic-context" as const },
  { label: "E-mini S&P 500 Futures (ES)", provenance: "academic-context" as const },
  { label: "Crude Oil (CL) Futures", provenance: "academic-context" as const },
  { label: "Gold Futures (GC)", provenance: "planned-research" as const },
];

const models = ["GARCH(1,1)-t", "EGARCH(1,1)-t", "GJR-GARCH(1,1)-t", "HAR-RV"] as const;
const evidence = ["Fit Ledger", "State Ledger", "Forward Outcome Ledger"] as const;

const researchPassport = [
  ["Current program", "BTC Derivatives Context Research v1"],
  ["Research stage", "Official-source coverage assessment"],
  ["Evidence class", "Prespecified feasibility scope"],
  ["Current information set", "Funding · Premium · Mark · Index"],
  ["Execution authority", "None"],
  ["Next gate", "Minimum viable historical set feasible?"],
] as const;

const decisionLedger = [
  {
    index: "01",
    title: "DC-Retest Long v1",
    verdict: "Not supported",
    hypothesis: "Breakout retest continuation after a frozen Donchian setup.",
    survived: "A deterministic contract, immutable snapshot, and reproducible event ledger.",
    failed: "Gross expectancy was negative across every prespecified q variant.",
    lesson: "Wider risk floors converted stops into timeouts rather than durable continuation.",
  },
  {
    index: "02",
    title: "Sell-Climax Reclaim Long v1",
    verdict: "Not supported",
    hypothesis: "A sharp sell impulse followed by a rapid midpoint reclaim signals exhaustion.",
    survived: "The event count was sufficient for a mechanical discovery verdict.",
    failed: "The full reclaim rule underperformed the shock-only diagnostic at the primary horizon.",
    lesson: "A fast rebound was not reliable evidence that the original sell pressure had exhausted.",
  },
  {
    index: "03",
    title: "Buy-Impulse Acceptance Long v1",
    verdict: "Not supported",
    hypothesis: "A high-volume upside impulse with buy imbalance and a strong close persists.",
    survived: "Positive mean return and right-tail behavior appeared at the primary horizon.",
    failed: "The positive-rate and cross-year stability gates did not pass.",
    lesson: "A few large winners can lift the mean without creating stable promotion-grade evidence.",
  },
  {
    index: "04",
    title: "Volatility-Compression Expansion Long v1",
    verdict: "Not supported",
    hypothesis: "Compressed short-term volatility precedes a durable breakout expansion.",
    survived: "Buy imbalance improved one component comparison and the 12-hour diagnostic had a positive tail.",
    failed: "The frozen four-hour gate was negative and compression added no incremental value.",
    lesson: "Secondary-horizon strength was archived as a clue, not promoted after the result.",
  },
] as const;

const requiredFrontierFamilies = [
  { label: "Funding rate", detail: "Native event timestamps", status: "Coverage audit" },
  { label: "Premium index · 5m", detail: "Perpetual crowding context", status: "Coverage audit" },
  { label: "Mark price · 5m", detail: "Exchange reference pricing", status: "Coverage audit" },
  { label: "Index price · 5m", detail: "Underlying reference series", status: "Coverage audit" },
  { label: "Derived premium / basis", detail: "Publication-safe local derivation", status: "Blocked on inputs" },
] as const;

const optionalFrontierFamilies = [
  "Open interest",
  "Open-interest value",
  "Liquidation records",
] as const;

const frontierFlow = [
  "Official raw sources",
  "Coverage & provenance",
  "Immutable snapshot",
  "Publication-safe alignment",
  "Conditional research",
] as const;

export function ResearchArchitectureStrip() {
  return (
    <section className="border-y border-[#7E8B9D]/15 bg-[#0B0F16]">
      <div className="mx-auto max-w-[1520px] px-5 py-10 lg:px-8 lg:py-14 xl:px-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)] xl:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
              Research architecture
            </p>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight text-[#F4F7FB] sm:text-3xl">
              From asset context to evidence, verdict, and the next information frontier
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#7E8B9D] sm:text-base">
              The public system is organized around explicit provenance and mechanical research decisions.
              Unsupported hypotheses are archived instead of cosmetically rescued after results.
            </p>
          </div>

          <aside className="border border-[#42D7F5]/20 bg-[#080B11] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-[#7E8B9D]/15 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-normal text-[#42D7F5]">
                  Research passport
                </p>
                <p className="mt-2 text-sm text-[#B6C0CF]">Current public program identity</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#42D7F5] shadow-[0_0_20px_rgba(66,215,245,0.65)]" aria-hidden="true" />
            </div>
            <dl className="divide-y divide-[#7E8B9D]/12">
              {researchPassport.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
                    {label}
                  </dt>
                  <dd className={`text-sm leading-6 ${label === "Execution authority" ? "text-[#B6C0CF]" : "text-[#F4F7FB]"}`}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-10 grid gap-6 border-t border-[#7E8B9D]/15 pt-8 lg:grid-cols-[1.2fr_1fr_0.9fr] lg:gap-0">
          <ArchitectureLayer label="Asset layer" color="#42D7F5">
            <div className="grid grid-cols-2 gap-2">
              {assets.map((asset) => (
                <div
                  key={asset.label}
                  className={`min-w-0 border bg-[#080B11] px-3 py-3 ${
                    asset.provenance === "planned-research"
                      ? "border-dashed border-[#FFB547]/35"
                      : asset.provenance === "current-static-snapshot"
                        ? "border-[#3DDC97]/35"
                        : "border-[#4D8DFF]/25"
                  }`}
                >
                  <p className="text-xs font-semibold leading-5 text-white">{asset.label}</p>
                  <div className="mt-2">
                    <ProvenanceBadge provenance={asset.provenance} />
                  </div>
                </div>
              ))}
            </div>
          </ArchitectureLayer>

          <ArchitectureLayer label="Model layer" color="#9B6CFF">
            <div className="grid grid-cols-2 gap-2">
              {models.map((model) => (
                <div
                  key={model}
                  className="border border-[#9B6CFF]/25 bg-[#080B11] px-3 py-3 font-mono text-xs text-[#DCE3EC]"
                >
                  {model}
                </div>
              ))}
            </div>
          </ArchitectureLayer>

          <ArchitectureLayer label="Evidence layer" color="#FFB547" last>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {evidence.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border border-[#FFB547]/20 bg-[#080B11] px-3 py-3"
                >
                  <span className="font-mono text-[10px] text-[#FFB547]">0{index + 1}</span>
                  <span className="text-sm text-[#DCE3EC]">{item}</span>
                </div>
              ))}
            </div>
          </ArchitectureLayer>
        </div>

        <div className="mt-14 border-t border-[#7E8B9D]/15 pt-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-normal text-[#FFB547]">
                Research decision ledger
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F4F7FB] sm:text-3xl">
                Four hypotheses entered. None crossed the frozen promotion gate.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#7E8B9D]">
              Open a record to inspect what survived, what failed, and what the next design learned without rewriting the original contract.
            </p>
          </div>

          <div className="mt-8 grid border-y border-[#7E8B9D]/15 lg:grid-cols-4">
            {decisionLedger.map((decision, index) => (
              <DecisionRecord
                key={decision.title}
                decision={decision}
                last={index === decisionLedger.length - 1}
              />
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-l-2 border-[#FFB547]/55 bg-[#0D0C0B] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-normal text-[#FFB547]">
                Sequence verdict
              </p>
              <p className="mt-1 text-sm font-semibold text-[#F4F7FB]">
                Standalone OHLCV + taker-share long-entry search closed
              </p>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[#7E8B9D]">
              The next program changes the information set instead of turning the same thresholds into a fifth candidate.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-[#7E8B9D]/15 pt-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] xl:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#9B6CFF]" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-normal text-[#9B6CFF]">
                  Current research frontier
                </p>
              </div>
              <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#F4F7FB] sm:text-3xl">
                Derivatives context before another candidate contract
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#7E8B9D] sm:text-base">
                The next question is not which candle shape wins. It is whether positioning and crowding context explain which impulses persist.
              </p>

              <div className="mt-7 border border-[#9B6CFF]/25 bg-[#090811] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-normal text-[#B6C0CF]">
                  Locked research boundary
                </p>
                <p className="mt-3 text-lg font-semibold text-[#F4F7FB]">No candidate contract yet</p>
                <p className="mt-2 text-sm leading-6 text-[#7E8B9D]">
                  Coverage, timestamp semantics, provenance, and immutable source identities must be frozen first.
                </p>
              </div>
            </div>

            <div>
              <div className="grid gap-px overflow-hidden border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 xl:grid-cols-5">
                {frontierFlow.map((step, index) => (
                  <div key={step} className="relative min-h-28 bg-[#080B11] px-4 py-4">
                    <span className="font-mono text-[10px] text-[#9B6CFF]">0{index + 1}</span>
                    <p className="mt-5 text-sm font-semibold leading-5 text-[#DCE3EC]">{step}</p>
                    {index < frontierFlow.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute right-3 top-4 text-sm text-[#475466] xl:right-[-5px] xl:top-1/2 xl:z-10 xl:-translate-y-1/2"
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {requiredFrontierFamilies.map((family) => (
                  <div key={family.label} className="border-b border-[#7E8B9D]/15 bg-[#0B0F16] px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#F4F7FB]">{family.label}</p>
                        <p className="mt-1 text-xs leading-5 text-[#7E8B9D]">{family.detail}</p>
                      </div>
                      <span className="shrink-0 border border-[#42D7F5]/20 bg-[#42D7F5]/[0.05] px-2 py-1 font-mono text-[9px] uppercase text-[#8EEBFC]">
                        {family.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[10px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
                  Optional only after coverage proof
                </span>
                {optionalFrontierFamilies.map((family) => (
                  <span
                    key={family}
                    className="border border-dashed border-[#7E8B9D]/25 px-3 py-2 text-xs text-[#7E8B9D]"
                  >
                    {family}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureLayer({
  children,
  color,
  label,
  last = false,
}: {
  children: React.ReactNode;
  color: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div className={`relative lg:px-6 ${last ? "" : "lg:border-r lg:border-[#7E8B9D]/15"}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-7" style={{ backgroundColor: color }} aria-hidden="true" />
        <h3 className="text-xs font-semibold uppercase tracking-normal text-[#B6C0CF]">{label}</h3>
      </div>
      {children}
    </div>
  );
}

function DecisionRecord({
  decision,
  last,
}: {
  decision: (typeof decisionLedger)[number];
  last: boolean;
}) {
  return (
    <details className={`group bg-[#080B11] ${last ? "" : "border-b border-[#7E8B9D]/15 lg:border-b-0 lg:border-r"}`}>
      <summary className="cursor-pointer list-none px-5 py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#42D7F5] [&::-webkit-details-marker]:hidden">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-[#FFB547]">{decision.index}</span>
          <span className="border border-[#FFB547]/25 bg-[#FFB547]/[0.05] px-2 py-1 font-mono text-[9px] uppercase text-[#FFCF88]">
            {decision.verdict}
          </span>
        </div>
        <h4 className="mt-6 text-lg font-semibold leading-6 text-[#F4F7FB]">{decision.title}</h4>
        <p className="mt-3 text-sm leading-6 text-[#7E8B9D]">{decision.hypothesis}</p>
        <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-normal text-[#B6C0CF]">
          <span>Inspect record</span>
          <span className="transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">
            +
          </span>
        </div>
      </summary>
      <div className="border-t border-[#7E8B9D]/12 px-5 py-5">
        <DecisionLine label="What survived" value={decision.survived} color="#42D7F5" />
        <DecisionLine label="What failed" value={decision.failed} color="#FFB547" />
        <DecisionLine label="Research lesson" value={decision.lesson} color="#9B6CFF" last />
      </div>
    </details>
  );
}

function DecisionLine({
  color,
  label,
  last = false,
  value,
}: {
  color: string;
  label: string;
  last?: boolean;
  value: string;
}) {
  return (
    <div className={`grid gap-2 py-3 ${last ? "" : "border-b border-[#7E8B9D]/10"}`}>
      <div className="flex items-center gap-2">
        <span className="h-px w-4" style={{ backgroundColor: color }} aria-hidden="true" />
        <p className="text-[9px] font-semibold uppercase tracking-normal text-[#7E8B9D]">{label}</p>
      </div>
      <p className="text-xs leading-5 text-[#B6C0CF]">{value}</p>
    </div>
  );
}
