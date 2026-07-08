import Link from "next/link";
import { Card, PageSection, PageShell } from "@/components/site-shell";

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageSection
        eyebrow="Projects"
        title="Research Projects and Papers"
        className="pt-16"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Primary project
            </p>
            <h1 className="mt-4 text-2xl font-semibold text-white">
              BTC Futures Research Assistant
            </h1>
            <p className="mt-4 text-neutral-400">
              Research-only diagnostics and validation infrastructure for BTCUSDT
              futures, with operational health monitoring and explicit safety
              boundaries.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Validation", "Volatility regimes", "Ops monitoring"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 px-3 py-1 text-sm text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/projects/btc-futures-research"
              className="mt-7 inline-flex rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              Open project
            </Link>
          </Card>

          <Card>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              MSc thesis
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Volatility Regime Filtering in Futures Markets
            </h2>
            <p className="mt-4 text-neutral-400">
              EGARCH-based volatility regime conditioning for intraday futures
              research, framed as an admissibility filter rather than a direction
              predictor.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["EGARCH", "Intraday futures", "Risk filtering"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 px-3 py-1 text-sm text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/projects/volatility-regime-filtering"
              className="mt-7 inline-flex rounded-lg border border-emerald-300/50 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Open thesis project
            </Link>
          </Card>

          <Card>
            <p className="text-sm font-semibold uppercase text-emerald-300">
              Seminar paper
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Bitcoin Bubble Detection with GSADF
            </h2>
            <p className="mt-4 text-neutral-400">
              A crypto-asset bubble detection study using right-tailed
              explosive-root testing to examine Bitcoin price dynamics and bubble
              episodes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Bitcoin", "GSADF", "Bubble detection"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 px-3 py-1 text-sm text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/projects/bitcoin-bubble-gsadf"
              className="mt-7 inline-flex rounded-lg border border-emerald-300/50 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Open seminar project
            </Link>
          </Card>
        </div>
      </PageSection>
    </PageShell>
  );
}
