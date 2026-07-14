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
  title: "Volatility Regime Filtering in Futures Markets",
  description:
    "MSc thesis on EGARCH volatility-regime filtering as a risk and admissibility layer for intraday NQ and ES futures research.",
};

const tags = [
  "Financial econometrics",
  "EGARCH",
  "NQ futures",
  "ES futures",
  "Intraday data",
  "Risk filtering",
] as const;

const methodology = [
  {
    accent: "violet" as const,
    index: "01",
    items: [
      "EGARCH(1,1) with Student-t innovations",
      "Daily conditional-volatility estimates",
      "Percentile-based volatility-regime classification",
      "Asymmetric response to signed return shocks",
    ],
    title: "Volatility layer",
  },
  {
    accent: "blue" as const,
    index: "02",
    items: [
      "Five-minute intraday NQ and ES observations",
      "Daily regime labels aligned to intraday dates",
      "Trend-following and mean-reversion research modules",
      "Transaction-cost and risk-control assumptions",
    ],
    title: "Intraday layer",
  },
  {
    accent: "amber" as const,
    index: "03",
    items: [
      "EGARCH-filtered versus no-filter ablation",
      "Alternative volatility filters",
      "Walk-forward evaluation",
      "Bootstrap, subperiod, and market-level robustness",
    ],
    title: "Validation layer",
  },
] as const;

const architecture = [
  ["01", "Data", "Daily and five-minute NQ and ES futures observations"],
  ["02", "Volatility", "EGARCH conditional volatility and regime labels"],
  ["03", "Admissibility", "Volatility context governs whether exposure is considered"],
  ["04", "Direction", "Separate intraday logic handles directional hypotheses"],
  ["05", "Validation", "Ablation, robustness, and walk-forward comparisons"],
] as const;

const supported = [
  "The thesis reports that EGARCH conditioning contributed useful risk and admissibility context in the main academic setting.",
  "Ablation helps isolate the filter's contribution from the underlying intraday logic.",
  "Volatility models can be more useful as conditioning layers than as directional predictors.",
] as const;

const unsupported = [
  "EGARCH does not establish price direction.",
  "The evidence is not causal proof or a universal futures rule.",
  "Academic backtests do not provide live-trading permission or investment advice.",
] as const;

const limitations = [
  ["Sample dependence", "Findings remain specific to the studied samples, instruments, and research design."],
  ["Threshold choice", "Volatility-regime thresholds are design choices that require sensitivity checks."],
  ["Cost assumptions", "Transaction costs and risk controls materially shape intraday evaluation."],
  ["Walk-forward degradation", "Re-selection under realistic chronology can weaken apparent in-sample performance."],
  ["Market differences", "NQ and ES should be interpreted individually as well as together."],
  ["Academic boundary", "The framework is a thesis experiment, not an execution system."],
] as const;

const capabilities = [
  "Financial econometrics",
  "EGARCH volatility modeling",
  "Intraday futures data",
  "Ablation and robustness",
  "Walk-forward validation",
] as const;

export default function VolatilityRegimeFilteringPage() {
  return (
    <PageShell>
      <PageHero
        accent="blue"
        eyebrow="MSc Economics thesis · University of Copenhagen"
        title="Volatility Regime Filtering in Futures Markets"
        intro="An intraday NQ and ES futures study using EGARCH as a volatility-regime risk and admissibility layer—not as a direction predictor."
        actions={
          <CtaLink
            href="/papers/volatility-regime-filtering-thesis.pdf"
            kind="primary"
            newTab
          >
            View thesis PDF
          </CtaLink>
        }
        metadata={[
          { label: "Markets", value: "NQ · ES" },
          { label: "Frequency", value: "Daily model · 5-minute evaluation" },
          { label: "Model role", value: "Risk and admissibility" },
          { label: "Context", value: "Academic research" },
        ]}
      />

      <EditorialSection
        accent="blue"
        eyebrow="Research scope"
        title="Volatility context without directional overreach"
        intro="The thesis asks whether an econometric volatility layer can improve the discipline of an otherwise comparable intraday research framework."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-16">
          <div>
            <p className="text-lg leading-8 text-[#B6C0CF]">
              Daily EGARCH estimates are aligned to five-minute futures observations.
              The regime classification determines whether the volatility environment
              is considered admissible for the academic framework; separate intraday
              logic carries the directional hypothesis.
            </p>
            <p className="mt-5 text-base leading-8 text-[#8996A8]">
              This separation makes the model&apos;s contribution testable. The same
              underlying intraday logic can be compared with and without EGARCH
              conditioning instead of crediting every result to the volatility model.
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#8CB5FF]">
              Research tags
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <ResearchTag key={tag}>{tag}</ResearchTag>
              ))}
            </div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Research question"
        title="Can an EGARCH filter add value without predicting direction?"
        tone="deep"
      >
        <EvidenceBand
          accent="blue"
          items={[
            { label: "Model input", value: "Daily futures returns" },
            { label: "Research output", value: "Conditional-volatility regime" },
            { label: "Intraday context", value: "Five-minute NQ and ES data" },
            { label: "Comparison", value: "Filtered versus no-filter framework" },
          ]}
        />
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Methodology"
        title="Three layers with separate responsibilities"
      >
        <ol className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 lg:grid-cols-3">
          {methodology.map((group) => (
            <li key={group.title} className="bg-[#0B0F16] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <StatusLabel accent={group.accent}>{group.title}</StatusLabel>
                <span className="font-mono text-[0.65rem] text-[#6F7D90]">{group.index}</span>
              </div>
              <ul className="mt-6 divide-y divide-[#7E8B9D]/12 border-y border-[#7E8B9D]/12">
                {group.items.map((item) => (
                  <li key={item} className="py-3 text-sm leading-6 text-[#A8B3C2]">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="cyan"
        eyebrow="Framework architecture"
        title="A traceable path from data to comparison"
        tone="deep"
      >
        <ol className="divide-y divide-[#7E8B9D]/15 border-y border-[#7E8B9D]/15">
          {architecture.map(([index, title, detail]) => (
            <li
              key={title}
              className="grid gap-3 py-5 sm:grid-cols-[3rem_minmax(8rem,0.55fr)_minmax(0,1.45fr)] sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-[0.68rem] text-[#67DFF7]">{index}</span>
              <h3 className="font-semibold text-[#F4F7FB]">{title}</h3>
              <p className="text-sm leading-7 text-[#8996A8]">{detail}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Results interpretation"
        title="What the evidence supports—and what it does not"
      >
        <div className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 lg:grid-cols-2">
          <div className="bg-[#0B0F16] p-6 sm:p-8">
            <StatusLabel accent="blue">Supported interpretation</StatusLabel>
            <ul className="mt-6 space-y-4">
              {supported.map((item) => (
                <li key={item} className="border-l border-[#4D8DFF]/45 pl-4 text-sm leading-7 text-[#B6C0CF]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0B0F16] p-6 sm:p-8">
            <StatusLabel accent="amber">Unsupported interpretation</StatusLabel>
            <ul className="mt-6 space-y-4">
              {unsupported.map((item) => (
                <li key={item} className="border-l border-[#FFB547]/45 pl-4 text-sm leading-7 text-[#B6C0CF]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Robustness"
        title="Limitations stay attached to the finding"
        tone="warm"
      >
        <dl className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 md:grid-cols-2 lg:grid-cols-3">
          {limitations.map(([term, detail]) => (
            <div key={term} className="bg-[#0D0C0B] p-5">
              <dt className="text-sm font-semibold text-[#F4F7FB]">{term}</dt>
              <dd className="mt-3 text-sm leading-6 text-[#8996A8]">{detail}</dd>
            </div>
          ))}
        </dl>
      </EditorialSection>

      <CapabilityBand items={capabilities} label="Capabilities demonstrated" />

      <EditorialSection
        accent="amber"
        eyebrow="Research boundary"
        title="Academic evidence, not execution permission"
        tone="deep"
      >
        <p className="max-w-4xl text-base leading-8 text-[#A8B3C2]">
          This page describes an academic research project. It is not a live trading
          system, does not provide signals or execution, and is not investment advice.
        </p>
      </EditorialSection>
    </PageShell>
  );
}
