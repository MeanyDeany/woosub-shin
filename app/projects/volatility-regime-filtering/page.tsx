import type { Metadata } from "next";
import { Card, PageSection, PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Volatility Regime Filtering in Futures Markets | Woosub Shin",
  description:
    "MSc thesis project on EGARCH-based volatility regime conditioning across equity index and commodity futures.",
};

const tags = [
  "Financial Econometrics",
  "Volatility Modeling",
  "EGARCH",
  "Intraday Futures",
  "Cross-Asset Futures",
  "Risk Management",
  "Python",
];

const studiedMarkets = [
  "E-mini Nasdaq-100 futures",
  "E-mini S&P 500 futures",
  "Crude Oil futures",
];

const dataFrequencyItems = [
  "Daily data used for EGARCH volatility estimation.",
  "5-minute intraday data used for strategy evaluation.",
  "Regular trading hours / intraday session filtering.",
  "Daily regime labels merged into intraday observations by date.",
  "Transaction costs and risk controls included in the framework.",
];

const methodologyGroups = [
  {
    title: "EGARCH Volatility Layer",
    items: [
      "EGARCH(1,1) model.",
      "Student's t innovations.",
      "Daily conditional volatility estimates.",
      "Volatility regimes classified using percentile thresholds.",
      "Asymmetry parameter interpreted as volatility response to negative shocks.",
    ],
  },
  {
    title: "Intraday Strategy Layer",
    items: [
      "Medium volatility: trend-following module.",
      "Low volatility: mean-reversion module.",
      "High volatility: no exposure / flat state.",
      "ATR-based risk controls.",
      "Same underlying intraday logic compared with and without EGARCH conditioning.",
    ],
  },
  {
    title: "Validation Layer",
    items: [
      "Ablation test comparing the EGARCH-filtered framework with an otherwise identical no-EGARCH framework.",
      "Alternative volatility filters considered.",
      "Walk-forward validation.",
      "Bootstrap / robustness checks.",
      "Subperiod and asset-level interpretation.",
    ],
  },
];

const architectureLayers = [
  {
    title: "Data Layer",
    detail: "Futures OHLCV and cleaned intraday session data.",
  },
  {
    title: "Volatility Layer",
    detail: "EGARCH conditional volatility and regime labels.",
  },
  {
    title: "Strategy Layer",
    detail: "Trend-following and mean-reversion modules.",
  },
  {
    title: "Validation Layer",
    detail: "Ablation tests, robustness checks, walk-forward evaluation, bootstrap tests.",
  },
];

const findings = [
  "The EGARCH-conditioned framework showed stronger risk-adjusted behavior than the corresponding no-filter version in the main research setting.",
  "The evidence is strongest when interpreted through ablation: removing the volatility filter weakens the framework.",
  "EGARCH was most useful as a volatility-regime admissibility layer, not as a direction predictor.",
  "Cross-asset results highlight that volatility conditioning is useful but not universally transferable without degradation.",
  "Robustness testing showed that model choice and sample design matter, so the result should be read as evidence for regime-filtering discipline rather than a universal trading rule.",
];

const supportedInterpretations = [
  "Volatility regime filters can improve the discipline of an intraday framework.",
  "EGARCH can be useful when treated as a permission layer.",
  "Ablation testing is essential for separating model contribution from entry-rule behavior.",
];

const unsupportedInterpretations = [
  "EGARCH does not predict direction.",
  "The framework is not a universal trading strategy.",
  "The results are not causal proof.",
  "The results are not live trading permission.",
  "The results are not investment advice.",
];

const limitations = [
  "Results are sample-specific.",
  "Regime thresholds are design choices.",
  "Transaction cost assumptions matter.",
  "Walk-forward degradation is expected in realistic re-selection.",
  "Cross-asset behavior can differ, especially between equity index futures and commodity futures.",
  "Academic backtests are not live trading systems.",
];

const lessons = [
  "Volatility models are often more useful as risk filters than as directional predictors.",
  "Ablation testing is essential for understanding whether a model contributes anything.",
  "Robustness checks can reduce overconfidence from a strong in-sample result.",
  "Walk-forward validation is important for measuring degradation under realistic re-selection.",
  "A trading framework should separate permission, direction, and execution logic.",
];

const skills = [
  "Financial econometrics",
  "EGARCH / GARCH-family volatility modeling",
  "Intraday futures data cleaning",
  "Cross-asset futures research",
  "Backtesting discipline",
  "Ablation testing",
  "Robustness testing",
  "Bootstrap inference",
  "Walk-forward validation",
  "Python research workflow",
  "Research communication",
];

const boundaryItems = [
  "This page describes an academic research project.",
  "It is not financial advice.",
  "It is not a live trading system.",
  "It does not provide trading signals.",
  "It does not approve leverage, shorting, or execution.",
];

export default function VolatilityRegimeFilteringPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <p className="mb-5 text-sm font-semibold uppercase text-emerald-300">
          MSc Economics thesis · University of Copenhagen
        </p>
        <h1 className="max-w-5xl text-4xl font-semibold text-white sm:text-5xl">
          Volatility Regime Filtering in Futures Markets
        </h1>
        <p className="mt-5 max-w-4xl text-xl text-neutral-300">
          An EGARCH-based intraday futures research framework for
          volatility-conditioned trade admissibility across equity index and
          commodity futures.
        </p>
        <p className="mt-5 max-w-4xl text-neutral-400">
          This academic project studies volatility permission separately from
          directional entry logic, with EGARCH used as a regime filter rather than
          a price-direction model.
        </p>
        <a
          href="/papers/volatility-regime-filtering-thesis.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          View Thesis PDF
        </a>
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <PageSection title="Overview">
        <Card>
          <div className="max-w-4xl space-y-5 text-neutral-300">
            <p>
              This MSc thesis studies whether daily EGARCH volatility regimes can
              improve the risk-adjusted profile of an intraday futures framework by
              acting as a trade admissibility layer. The model is not used to
              forecast price direction. Instead, EGARCH classifies the volatility
              environment, and the intraday strategy logic is allowed or restricted
              depending on the regime.
            </p>
            <p>
              The project connects financial econometrics with intraday market data
              engineering: daily volatility estimates are merged into 5-minute
              futures data, and the same underlying trading logic is compared with
              and without volatility conditioning.
            </p>
          </div>
        </Card>
      </PageSection>

      <PageSection title="Research Question">
        <Card>
          <h2 className="max-w-4xl text-2xl font-semibold text-white">
            Can an EGARCH-conditioned volatility regime filter improve the
            risk-adjusted performance of an otherwise identical intraday futures
            framework?
          </h2>
          <p className="mt-5 max-w-4xl text-neutral-400">
            The project evaluates regime conditioning and trade admissibility, not
            directional forecasting. EGARCH does not predict direction; it acts as a
            volatility-regime filter.
          </p>
        </Card>
      </PageSection>

      <PageSection title="Asset Universe">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <h2 className="text-lg font-semibold text-white">Studied Markets</h2>
            <ul className="mt-4 space-y-3 text-neutral-300">
              {studiedMarkets.map((market) => (
                <li key={market}>{market}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-neutral-300">
              The thesis focuses on liquid futures markets across equity index and
              commodity exposure. Equity index futures provide the main setting for
              the intraday framework, while crude oil futures add a cross-market
              commodity case for assessing whether volatility-regime behavior
              generalizes beyond equity indices.
            </p>
          </Card>
        </div>
      </PageSection>

      <PageSection title="Data and Frequency">
        <div className="grid gap-4 md:grid-cols-2">
          {dataFrequencyItems.map((item) => (
            <Card key={item}>
              <p className="text-neutral-300">{item}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Methodology">
        <div className="grid gap-4 lg:grid-cols-3">
          {methodologyGroups.map((group) => (
            <Card key={group.title}>
              <h2 className="text-lg font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3 text-neutral-300">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Research Design">
        <Card>
          <p className="max-w-4xl text-neutral-300">
            The central design choice is to separate permission, direction, and
            execution. EGARCH determines whether the volatility environment is
            suitable for exposure. Directional logic is handled by intraday
            indicators, while risk controls govern exits and drawdown behavior. This
            separation helps evaluate whether volatility modeling contributes
            information beyond the entry rules themselves.
          </p>
        </Card>
      </PageSection>

      <PageSection title="Framework Architecture">
        <div className="grid gap-4 md:grid-cols-2">
          {architectureLayers.map((layer) => (
            <Card key={layer.title}>
              <h2 className="text-lg font-semibold text-white">{layer.title}</h2>
              <p className="mt-3 text-neutral-400">{layer.detail}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Key Findings">
        <Card>
          <ul className="space-y-4">
            {findings.map((finding) => (
              <li
                key={finding}
                className="border-l border-emerald-300/40 pl-4 text-neutral-300"
              >
                {finding}
              </li>
            ))}
          </ul>
        </Card>
      </PageSection>

      <PageSection title="Results Interpretation">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-white">
              What the Thesis Supports
            </h2>
            <ul className="mt-4 space-y-3 text-neutral-300">
              {supportedInterpretations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-white">
              What the Thesis Does Not Support
            </h2>
            <ul className="mt-4 space-y-3 text-neutral-300">
              {unsupportedInterpretations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </PageSection>

      <PageSection title="Robustness and Limitations">
        <div className="grid gap-4 md:grid-cols-2">
          {limitations.map((item) => (
            <Card key={item}>
              <p className="text-neutral-300">{item}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="What I Learned">
        <Card>
          <ul className="space-y-4">
            {lessons.map((lesson) => (
              <li
                key={lesson}
                className="border-l border-emerald-300/40 pl-4 text-neutral-300"
              >
                {lesson}
              </li>
            ))}
          </ul>
        </Card>
      </PageSection>

      <PageSection title="Skills Demonstrated">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill}>
              <p className="text-neutral-300">{skill}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Safety / Research Boundary">
        <div className="grid gap-3 md:grid-cols-2">
          {boundaryItems.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-200"
            >
              {item}
            </div>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
