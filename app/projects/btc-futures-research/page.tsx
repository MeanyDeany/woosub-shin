import {
  BoundaryList,
  Card,
  MetricCard,
  PageSection,
  PageShell,
} from "@/components/site-shell";
import {
  architectureItems,
  boundaryItems,
  healthSnapshot,
  researchLessons,
} from "@/lib/content";

const validationItems = [
  "Historical replay separates state generation from forward-return measurement.",
  "Diagnostic review checks sample size, tail behavior, and cluster dominance.",
  "RV48 risk audit and cluster audit evaluate whether volatility contexts are stable.",
  "Research outputs remain separate from execution permissions.",
];

const monitoringItems = [
  "Cron jobs are staggered and protected by flock locks.",
  "Health checks inspect report freshness, tracker files, CPU, memory, disk, and reboot status.",
  "Operational diagnostics are read-only and do not mutate source trackers.",
  "WATCH and FAIL statuses are maintenance signals, not trading signals.",
];

const roleItems = [
  "Designed the research-only validation workflow.",
  "Built the BTCUSDT data and diagnostic reporting pipeline.",
  "Implemented forward validation, diagnostic review, RV48 risk audit, and cluster audit tooling.",
  "Added cron-based operational monitoring with flock locks and health checks.",
  "Separated research diagnostics from execution permissions.",
];

export default function BtcFuturesResearchPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <p className="mb-5 text-sm font-semibold uppercase text-emerald-300">
          Project
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-5xl">
          BTC Futures Research Assistant
        </h1>
        <p className="mt-5 max-w-3xl text-xl text-neutral-300">
          Research-only regime diagnostics and operational monitoring for BTCUSDT
          futures.
        </p>
      </section>

      <PageSection title="Overview">
        <Card>
          <p className="max-w-4xl text-neutral-300">
            The BTC Futures Research Assistant is a research infrastructure project
            for validating market states, volatility-regime candidates, and
            operational reliability around BTCUSDT futures data. The system is built
            to keep evidence generation, monitoring, and safety boundaries separate
            from any trading decision.
          </p>
        </Card>
      </PageSection>

      <PageSection title="My Role">
        <Card>
          <ul className="space-y-4">
            {roleItems.map((item) => (
              <li
                key={item}
                className="border-l border-emerald-300/40 pl-4 text-neutral-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </PageSection>

      <PageSection title="Architecture">
        <div className="grid gap-4 md:grid-cols-2">
          {architectureItems.map((item) => (
            <Card key={item.title}>
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-neutral-400">{item.detail}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="System Health Snapshot">
        <div className="mb-6 rounded-lg border border-white/10 bg-neutral-900 px-5 py-4">
          <p className="text-sm text-neutral-300">
            Static snapshot from the research server health report. Operational
            status only, not a trading signal.
          </p>
          <p className="mt-2 text-sm font-semibold text-neutral-100">
            Snapshot date: 2026-07-07 UTC
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {healthSnapshot.map((item) => (
            <MetricCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </PageSection>

      <PageSection title="Tech Stack">
        <Card>
          <p className="text-lg font-semibold text-white">
            Python · pandas · CSV reports · cron · Linux · GitHub · AWS Lightsail ·
            Next.js · Vercel
          </p>
        </Card>
      </PageSection>

      <PageSection title="Validation Layer">
        <div className="grid gap-4 md:grid-cols-2">
          {validationItems.map((item) => (
            <Card key={item}>
              <p className="text-neutral-300">{item}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Operational Monitoring">
        <div className="grid gap-4 md:grid-cols-2">
          {monitoringItems.map((item) => (
            <Card key={item}>
              <p className="text-neutral-300">{item}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Research Lessons">
        <Card>
          <ul className="space-y-4">
            {researchLessons.map((lesson) => (
              <li key={lesson} className="border-l border-emerald-300/40 pl-4 text-neutral-300">
                {lesson}
              </li>
            ))}
          </ul>
        </Card>
      </PageSection>

      <PageSection title="Safety Boundary">
        <BoundaryList items={boundaryItems} />
      </PageSection>
    </PageShell>
  );
}
