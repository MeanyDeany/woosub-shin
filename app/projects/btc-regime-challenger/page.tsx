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
  title: "BTC Selective Regime Challenger C4",
  description:
    "Post-selection historical stress audit of a BTC long/flat selective-regime challenger combining Momentum90, EMA 50/180, and RSI2/EMA200 sleeves.",
};

const tags = [
  "BTCUSDT",
  "Systematic trading research",
  "Regime conditioning",
  "Momentum",
  "Dual EMA",
  "RSI2",
  "Cost stress",
  "Bootstrap",
] as const;

const sleeveRows = [
  {
    id: "S1",
    regime: "TREND_UP",
    strategy: "Momentum90",
    rule: "Long when the completed daily close is above the close 90 days earlier; otherwise flat.",
  },
  {
    id: "S2",
    regime: "TREND_DOWN",
    strategy: "EMA 50/180",
    rule: "Long when daily EMA50 is above EMA180; otherwise flat. TREND_DOWN does not imply a short position.",
  },
  {
    id: "S3",
    regime: "NORMAL_VOL__TRANSITION",
    strategy: "RSI2 + EMA200",
    rule: "Long state enters above EMA200 with RSI2 below 10 and exits at or below EMA200 or when RSI2 rises above 70.",
  },
] as const;

const validationRows = [
  ["5bp / side", "+182.29%", "1.100", "-25.25%", "88"],
  ["10bp / side", "+158.50%", "—", "—", "88"],
  ["20bp / side", "+116.72%", "0.850", "Worse than 5bp case", "88"],
] as const;

const limitations = [
  "C4 was selected after inspecting earlier historical tournament results, so this is not independent validation.",
  "The 2022 to July 2026 sample is historical and the 2026 terminal period is partial.",
  "At 20bp per transition side, C4 becomes year-concentrated under the frozen >50% positive-log-growth rule.",
  "Bootstrap frequencies are retrospective path-rearrangement diagnostics, not forecast probabilities.",
  "No leverage, position sizing, stop-loss, take-profit, short exposure, or execution logic is included in these results.",
] as const;

export default function BtcRegimeChallengerPage() {
  return (
    <PageShell>
      <PageHero
        accent="cyan"
        eyebrow="BTC systematic research · Post-selection historical challenger"
        title="C4: a sparse regime router that beat the retained baseline on historical risk-adjusted performance"
        intro="C4 combines three mutually exclusive long/flat sleeves: Momentum90 in TREND_UP, EMA 50/180 in TREND_DOWN, and an EMA200-filtered RSI2 reversal state in NORMAL_VOL__TRANSITION. Every other regime is flat."
        actions={
          <>
            <CtaLink href="/projects/btc-final-system" kind="primary">
              View retained BTC baseline
            </CtaLink>
            <CtaLink href="/research">Read research methodology</CtaLink>
          </>
        }
        metadata={[
          { label: "Historical period", value: "2022-01-01 to 2026-07-30 partial" },
          { label: "Primary cost", value: "5bp per transition side" },
          { label: "Exposure", value: "Long / flat only" },
          { label: "Evidence class", value: "Post-selection historical stress audit" },
        ]}
      />

      <EditorialSection
        accent="cyan"
        eyebrow="Headline evidence"
        title="Performance is interesting. The label matters more."
        intro="The figures below are frozen historical research results, not a live or paper track record."
      >
        <EvidenceBand
          accent="cyan"
          items={[
            { label: "5bp return", value: "+182.29%" },
            { label: "5bp Sharpe", value: "1.100" },
            { label: "5bp MaxDD", value: "-25.25%" },
            { label: "Completed trades", value: "88" },
          ]}
        />
        <div className="mt-7 flex flex-wrap gap-2">
          <StatusLabel accent="cyan">Historical challenger</StatusLabel>
          <StatusLabel accent="amber">Not independent OOS</StatusLabel>
          <StatusLabel accent="blue">No execution authority</StatusLabel>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Strategy structure"
        title="Three sleeves, mutually exclusive by market regime"
        tone="deep"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {sleeveRows.map((row) => (
            <article key={row.id} className="rounded-[1.6rem] border border-[#7E8B9D]/15 bg-[#0B0F16] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#67DFF7]">{row.id}</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#7F8DA3]">{row.regime}</span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.035em] text-[#F4F7FB]">{row.strategy}</h3>
              <p className="mt-4 text-sm leading-7 text-[#A8B3C2]">{row.rule}</p>
            </article>
          ))}
        </div>
        <p className="mt-7 max-w-4xl border-l-2 border-[#67DFF7]/45 pl-5 text-sm leading-7 text-[#8996A8]">
          C4 is the union of S1, S2, and S3. Unexpected simultaneous sleeve eligibility fails closed. If none of the three frozen sleeve conditions produces long exposure, C4 remains flat.
        </p>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Cost stress"
        title="The edge weakened as turnover became more expensive, but did not disappear"
      >
        <div className="overflow-x-auto rounded-[1.5rem] border border-[#7E8B9D]/15">
          <table className="w-full min-w-[700px] border-collapse text-left text-sm">
            <thead className="bg-[#0E1522] text-[#8FA0B7]">
              <tr>
                <th className="px-5 py-4 font-semibold">Cost assumption</th>
                <th className="px-5 py-4 font-semibold">Total return</th>
                <th className="px-5 py-4 font-semibold">Sharpe</th>
                <th className="px-5 py-4 font-semibold">Drawdown note</th>
                <th className="px-5 py-4 font-semibold">Trades</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7E8B9D]/12 bg-[#0B0F16] text-[#B6C0CF]">
              {validationRows.map(([cost, totalReturn, sharpe, drawdown, trades]) => (
                <tr key={cost}>
                  <td className="px-5 py-4 font-semibold text-[#F4F7FB]">{cost}</td>
                  <td className="px-5 py-4">{totalReturn}</td>
                  <td className="px-5 py-4">{sharpe}</td>
                  <td className="px-5 py-4">{drawdown}</td>
                  <td className="px-5 py-4">{trades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm leading-7 text-[#657189]">
          At 20bp per transition side, C4 still exceeded the retained EMA 50/200 baseline on Sharpe in the historical comparison, but no longer dominated it on return, drawdown, and Calmar simultaneously.
        </p>
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Why it survived the audit"
        title="C4 diversified the historical edge across more trades and more than one sleeve"
        tone="deep"
      >
        <EvidenceBand
          accent="blue"
          items={[
            { label: "Largest trade share", value: "18.80%" },
            { label: "Largest year share", value: "47.50%" },
            { label: "Time long", value: "21.48%" },
            { label: "Transition sides", value: "176" },
          ]}
        />
        <p className="mt-7 max-w-4xl text-sm leading-7 text-[#8996A8]">
          Under the frozen 5bp concentration rule, C4 was not trade-concentrated and remained below the 50% year-concentration threshold. Its severe-cost case is less clean, which is why the next meaningful evidence must come from a non-overlapping forward period rather than additional historical rescue.
        </p>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Limitations"
        title="What this page does not claim"
      >
        <ul className="grid gap-3 md:grid-cols-2">
          {limitations.map((item) => (
            <li key={item} className="rounded-2xl border border-[#7E8B9D]/15 bg-[#0B0F16] p-5 text-sm leading-7 text-[#A8B3C2]">
              {item}
            </li>
          ))}
        </ul>
      </EditorialSection>

      <CapabilityBand
        label="Methods demonstrated"
        items={[
          "Regime-conditioned strategy research",
          "Deterministic replay",
          "Transaction-cost stress",
          "Trade/year concentration diagnostics",
          "Leave-out robustness",
          "Block resampling",
        ]}
      />

      <EditorialSection
        accent="cyan"
        eyebrow="Current status"
        title="A challenger worth observing, not a strategy approved for trading"
        tone="deep"
      >
        <div className="max-w-4xl">
          <p className="text-base leading-8 text-[#A8B3C2]">
            C1 and C4 were the two formal survivors of the frozen historical stress gate. C1 is the cleaner concentration candidate; C4 is the stronger performance candidate. The next research step is to freeze both definitions and observe genuinely new data without changing the historical rules.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <ResearchTag key={tag}>{tag}</ResearchTag>
            ))}
          </div>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
