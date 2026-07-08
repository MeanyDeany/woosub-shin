import type { Metadata } from "next";
import { Card, PageSection, PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Volatility Regime Filtering in Futures Markets | Woosub Shin",
  description:
    "MSc thesis project on EGARCH-based volatility regime conditioning for intraday futures research.",
};

const tags = [
  "Financial Econometrics",
  "Volatility Modeling",
  "EGARCH",
  "Intraday Futures",
  "Risk Management",
  "Python",
];

const methodologyItems = [
  "Daily EGARCH(1,1) model with Student's t innovations.",
  "Volatility regime classification using percentile thresholds.",
  "5-minute intraday futures data during regular trading hours.",
  "Strategy modules conditioned on volatility regime.",
  "Transaction costs and ATR-based risk controls included.",
  "Comparison against no-EGARCH and alternative volatility filters.",
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
  "Removing the volatility filter weakened the framework's risk-adjusted profile.",
  "The strongest evidence came from ablation and robustness comparisons.",
  "EGARCH performed well as a volatility-regime filter, but it should not be interpreted as a universal trading rule.",
  "Statistical evidence supported the usefulness of volatility conditioning, while robustness tests showed that model choice uncertainty remains important.",
];

const limitations = [
  "Results are sample-specific.",
  "This is not causal proof.",
  "Parameter selection and regime thresholds require care.",
  "Performance can decay under walk-forward validation.",
  "Volatility filtering is useful for risk control, but not sufficient for trade direction.",
  "Academic research results should not be treated as live trading permission.",
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
  "Intraday data cleaning",
  "Backtesting discipline",
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
          MSc thesis project on EGARCH-based volatility regime conditioning for
          intraday futures research.
        </p>
        <p className="mt-5 max-w-4xl text-neutral-400">
          An EGARCH-based intraday futures research framework for
          volatility-conditioned trade admissibility. The project treats volatility
          permission as separate from directional entry logic.
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

      <PageSection title="Research Context">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-white">Assets</h2>
            <ul className="mt-4 space-y-3 text-neutral-300">
              <li>E-mini Nasdaq-100 futures</li>
              <li>E-mini S&amp;P 500 futures</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-white">Regime Use</h2>
            <ul className="mt-4 space-y-3 text-neutral-300">
              <li>High volatility: flat / no exposure.</li>
              <li>Medium volatility: trend-following module.</li>
              <li>Low volatility: mean-reversion module.</li>
            </ul>
          </Card>
        </div>
      </PageSection>

      <PageSection title="Methodology">
        <div className="grid gap-4 md:grid-cols-2">
          {methodologyItems.map((item) => (
            <Card key={item}>
              <p className="text-neutral-300">{item}</p>
            </Card>
          ))}
        </div>
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
