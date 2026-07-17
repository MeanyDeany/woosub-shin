import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Quantitative Research Systems",
  description:
    "MeanyDeany builds quantitative research infrastructure for market data, model validation, and decision control.",
};

const pillars = [
  {
    number: "01",
    title: "Capture what actually happened.",
    detail:
      "Exact market bytes, canonical datasets, immutable manifests, and provenance that can be inspected later.",
  },
  {
    number: "02",
    title: "Test what the model claims.",
    detail:
      "Time-respecting validation, forward outcomes, bounded comparisons, and failure states that stay visible.",
  },
  {
    number: "03",
    title: "Control what the evidence can authorize.",
    detail:
      "A forecast is not permission. A regime is not a trade. Research evidence stays separate from execution.",
  },
] as const;

const systems = [
  {
    label: "Market data",
    title: "Evidence starts before the model.",
    detail:
      "Controlled acquisition, exact-byte verification, canonical normalization, and reproducible dataset identity.",
    href: "/projects",
    link: "Explore the systems",
  },
  {
    label: "Model validation",
    title: "Results must survive time.",
    detail:
      "Forward validation, anti-lookahead construction, immutable outcomes, and explicit uncertainty boundaries.",
    href: "/research",
    link: "Read the methodology",
  },
  {
    label: "Decision control",
    title: "Failure should be loud.",
    detail:
      "Stale data, broken lineage, premature conclusions, and operational faults are surfaced instead of silently repaired.",
    href: "/projects/btc-futures-research#evidence-pipeline",
    link: "Inspect the pipeline",
  },
] as const;

const pipeline = [
  "Market data",
  "Canonical evidence",
  "Model state",
  "Forward outcome",
  "Integrity review",
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-[#07090D]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[48rem] bg-[radial-gradient(circle_at_50%_-15%,rgba(66,215,245,0.16),transparent_58%)]"
        />
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1440px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#67DFF7]">
            MeanyDeany · Quantitative Research Systems
          </p>

          <h1 className="mt-8 max-w-[78rem] text-[clamp(3.7rem,10.5vw,9rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#F5F5F7]">
            Shit always happens
            <span className="block text-[#6E6E73]">in the market.</span>
          </h1>

          <p className="mt-10 max-w-[56rem] text-[clamp(1.45rem,3vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[#F5F5F7]">
            So we build systems that fail visibly before capital does.
          </p>

          <p className="mt-7 max-w-[46rem] text-base leading-7 text-[#A1A1A6] sm:text-lg sm:leading-8">
            Quantitative research infrastructure for market data, model validation,
            and decision control. Built to expose bad assumptions, stale evidence,
            and silent failures before they become decisions.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/projects/btc-futures-research"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F5F5F7] px-6 text-sm font-semibold text-[#1D1D1F] transition-transform hover:scale-[1.02] focus-visible:outline-none"
            >
              See the flagship system
              <Arrow />
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-[#F5F5F7] transition-colors hover:border-white/45 hover:bg-white/[0.05] focus-visible:outline-none"
            >
              View all research
              <Arrow />
            </Link>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.16em] text-[#6E6E73]">
            Research only · No signals · No execution
          </p>
        </div>
      </section>

      <section className="bg-[#F5F5F7] text-[#1D1D1F]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <p className="text-sm font-semibold text-[#0071E3]">Why this exists</p>
          <h2 className="mt-4 max-w-[68rem] text-[clamp(2.8rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
            Markets do not fail politely.
          </h2>
          <p className="mt-8 max-w-[48rem] text-xl leading-8 tracking-[-0.02em] text-[#6E6E73] sm:text-2xl sm:leading-9">
            Data arrives late. Models drift. Infrastructure breaks. Humans improvise.
            The research system should make each failure inspectable.
          </p>

          <ol className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {pillars.map((pillar) => (
              <li key={pillar.number} className="border-t border-black/15 pt-7">
                <span className="font-mono text-xs text-[#86868B]">{pillar.number}</span>
                <h3 className="mt-7 text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  {pillar.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#6E6E73]">
                  {pillar.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#000000] text-[#F5F5F7]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <p className="text-sm font-semibold text-[#67DFF7]">What we build</p>
          <h2 className="mt-4 max-w-[62rem] text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
            Research infrastructure. Not signal theatre.
          </h2>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {systems.map((system, index) => (
              <article
                key={system.label}
                className="flex min-h-[30rem] flex-col rounded-[2rem] bg-[#161617] p-7 sm:p-9"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[#86868B]">
                  <span>{system.label}</span>
                  <span className="font-mono">0{index + 1}</span>
                </div>
                <h3 className="mt-12 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                  {system.title}
                </h3>
                <p className="mt-6 text-base leading-7 text-[#A1A1A6]">
                  {system.detail}
                </p>
                <Link
                  href={system.href}
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-12 text-sm font-semibold text-[#67DFF7] hover:text-[#9DECFB] focus-visible:outline-none"
                >
                  {system.link}
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F7] text-[#1D1D1F]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-[#0071E3]">Flagship system</p>
              <h2 className="mt-4 max-w-[54rem] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
                A research system should show its work.
              </h2>
              <p className="mt-8 max-w-[44rem] text-xl leading-8 text-[#6E6E73] sm:text-2xl sm:leading-9">
                The BTC Futures Research Assistant separates data, model states,
                later outcomes, and integrity review into an inspectable evidence chain.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-7 shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#86868B]">
                Evidence pipeline
              </p>
              <ol className="mt-7 divide-y divide-black/10">
                {pipeline.map((stage, index) => (
                  <li key={stage} className="flex items-center gap-5 py-4 first:pt-0 last:pb-0">
                    <span className="font-mono text-xs text-[#0071E3]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold">{stage}</span>
                  </li>
                ))}
              </ol>
              <Link
                href="/projects/btc-futures-research#evidence-pipeline"
                className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none"
              >
                Inspect the evidence pipeline
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#07090D] text-[#F5F5F7]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 text-center sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <p className="mx-auto max-w-[68rem] text-[clamp(2.8rem,7.5vw,7.3rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
            No black box.
            <span className="block text-[#6E6E73]">No silent repair.</span>
            No hidden permission.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/research"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F5F5F7] px-6 text-sm font-semibold text-[#1D1D1F] transition-transform hover:scale-[1.02] focus-visible:outline-none"
            >
              Read the methodology
              <Arrow />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-[#F5F5F7] transition-colors hover:border-white/45 hover:bg-white/[0.05] focus-visible:outline-none"
            >
              Contact
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
