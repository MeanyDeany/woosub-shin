import Link from "next/link";
import { Card, PageSection, PageShell } from "@/components/site-shell";

const focusAreas = [
  "Market data validation",
  "Volatility-regime diagnostics",
  "Forward validation workflows",
  "Research operations monitoring",
];

const systemFlow = ["Data", "Features", "Validation", "Operations"];

export default function Home() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase text-emerald-300">
            Quant research infrastructure portfolio
          </p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Woosub Shin
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-neutral-200">
            MSc Economics | Financial Econometrics | Quant Research Infrastructure
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
            I build research systems for market data validation, volatility-regime
            diagnostics, and risk-aware trading infrastructure.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects/btc-futures-research"
              className="rounded-lg bg-emerald-300 px-5 py-3 text-center text-sm font-semibold text-neutral-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              View BTC research project
            </Link>
            <Link
              href="/research"
              className="rounded-lg border border-white/15 px-5 py-3 text-center text-sm font-semibold text-neutral-100 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Read research notes
            </Link>
          </div>
        </div>

        <div className="mt-14 rounded-lg border border-white/10 bg-neutral-900 p-5">
          <div className="grid gap-3 sm:grid-cols-4">
            {systemFlow.map((item, index) => (
              <div key={item} className="rounded-lg bg-neutral-950 p-4">
                <p className="text-xs text-neutral-500">0{index + 1}</p>
                <p className="mt-2 text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageSection eyebrow="Primary project" title="Research Systems">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Card>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              BTC Futures Research Assistant
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Research-only diagnostics and validation infrastructure for BTCUSDT
              futures.
            </h2>
            <p className="mt-4 text-neutral-400">
              A structured research assistant for market-data checks, volatility
              candidate tracking, forward validation, and operational health
              monitoring. It is intentionally separated from trading execution.
            </p>
            <Link
              href="/projects/btc-futures-research"
              className="mt-6 inline-flex rounded-lg border border-emerald-300/50 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Project details
            </Link>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Focus Areas</h3>
            <ul className="mt-5 space-y-3">
              {focusAreas.map((area) => (
                <li key={area} className="border-l border-emerald-300/40 pl-4 text-neutral-300">
                  {area}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </PageSection>

      <PageSection eyebrow="Selected research" title="Financial Econometrics">
        <Card>
          <p className="text-sm font-semibold uppercase text-emerald-300">
            MSc thesis
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Volatility Regime Filtering in Futures Markets
          </h2>
          <p className="mt-4 max-w-3xl text-neutral-400">
            EGARCH-based volatility regime conditioning for intraday futures
            research. The thesis frames volatility modeling as a risk and
            admissibility layer, not as a direction predictor.
          </p>
          <Link
            href="/projects/volatility-regime-filtering"
            className="mt-6 inline-flex rounded-lg border border-emerald-300/50 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            View thesis project
          </Link>
        </Card>
      </PageSection>

      <PageSection eyebrow="Contact" title="Research and Infrastructure Roles">
        <Card>
          <p className="max-w-3xl text-neutral-300">
            I am focused on quant research infrastructure, financial econometrics,
            volatility diagnostics, and disciplined validation systems.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-lg border border-emerald-300/50 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            Contact
          </Link>
        </Card>
      </PageSection>
    </PageShell>
  );
}
