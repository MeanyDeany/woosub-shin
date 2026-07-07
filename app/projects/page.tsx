import Link from "next/link";
import { Card, PageSection, PageShell } from "@/components/site-shell";

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageSection eyebrow="Projects" title="Research Infrastructure Work" className="pt-16">
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
            <p className="text-sm font-semibold uppercase text-neutral-500">
              Portfolio direction
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              Financial econometrics systems
            </h2>
            <p className="mt-4 text-neutral-400">
              Future project writeups can cover feature validation, regime stability,
              risk diagnostics, and reproducible research workflows. Each project
              should distinguish research evidence from trading permission.
            </p>
          </Card>
        </div>
      </PageSection>
    </PageShell>
  );
}
