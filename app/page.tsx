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

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#17243D] px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(39,66,109,0.20)] transition-transform hover:-translate-y-0.5 hover:bg-[#22375B] focus-visible:outline-none";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#7187AB]/24 bg-white/58 px-6 text-sm font-semibold text-[#24324A] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#2580D8]/45 hover:bg-white/82 focus-visible:outline-none";

export default function Home() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden border-b border-[#6880A8]/12 bg-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-48 -z-10 h-[44rem] w-[44rem] rounded-full bg-[#6DC1FF]/24 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-4 -z-10 h-[42rem] w-[42rem] rounded-full bg-[#B29BFF]/18 blur-3xl"
        />
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1440px] flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#1677D2]">
            MeanyDeany · Quantitative Research Systems
          </p>

          <h1 className="mt-8 max-w-[82rem] text-[clamp(3.7rem,10.5vw,9rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#111A2E]">
            Shit always happens
            <span className="block">in the market.</span>
          </h1>

          <p className="mt-10 max-w-[58rem] text-[clamp(1.45rem,3vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[#27364F]">
            So we build systems that fail visibly before capital does.
          </p>

          <p className="mt-7 max-w-[48rem] text-base leading-7 text-[#657189] sm:text-lg sm:leading-8">
            Quantitative research infrastructure for market data, model validation,
            and decision control. Built to expose bad assumptions, stale evidence,
            and silent failures before they become decisions.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/projects/btc-futures-research" className={primaryButton}>
              See the flagship system
              <Arrow />
            </Link>
            <Link href="/projects" className={secondaryButton}>
              View all research
              <Arrow />
            </Link>
          </div>

          <p className="mt-12 text-xs uppercase tracking-[0.16em] text-[#77839A]">
            Research only · No signals · No execution
          </p>
        </div>
      </section>

      <section className="border-b border-[#6880A8]/12 bg-white/32 backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <p className="text-sm font-semibold text-[#1677D2]">Why this exists</p>
          <h2 className="mt-4 max-w-[68rem] text-[clamp(2.8rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#111A2E]">
            Markets do not fail politely.
          </h2>
          <p className="mt-8 max-w-[50rem] text-xl leading-8 tracking-[-0.02em] text-[#657189] sm:text-2xl sm:leading-9">
            Data arrives late. Models drift. Infrastructure breaks. Humans improvise.
            The research system should make each failure inspectable.
          </p>

          <ol className="mt-20 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <li key={pillar.number} className="glass-panel rounded-[2rem] p-7 sm:p-9">
                <span className="font-mono text-xs text-[#2563C9]">{pillar.number}</span>
                <h3 className="mt-10 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#111A2E]">
                  {pillar.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#657189]">
                  {pillar.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#6880A8]/12 bg-white/12 backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <p className="text-sm font-semibold text-[#1677D2]">What we build</p>
          <h2 className="mt-4 max-w-[66rem] text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#111A2E]">
            Research infrastructure. Not signal theatre.
          </h2>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {systems.map((system, index) => (
              <article
                key={system.label}
                className="glass-panel flex min-h-[30rem] flex-col rounded-[2rem] p-7 sm:p-9"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[#758198]">
                  <span>{system.label}</span>
                  <span className="font-mono text-[#2563C9]">0{index + 1}</span>
                </div>
                <h3 className="mt-12 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#111A2E] sm:text-5xl">
                  {system.title}
                </h3>
                <p className="mt-6 text-base leading-7 text-[#657189]">
                  {system.detail}
                </p>
                <Link
                  href={system.href}
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-12 text-sm font-semibold text-[#1677D2] transition-colors hover:text-[#0D589C] focus-visible:outline-none"
                >
                  {system.link}
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#6880A8]/12 bg-white/36 backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-[#1677D2]">Flagship system</p>
              <h2 className="mt-4 max-w-[56rem] text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#111A2E]">
                A research system should show its work.
              </h2>
              <p className="mt-8 max-w-[46rem] text-xl leading-8 text-[#657189] sm:text-2xl sm:leading-9">
                The Multi-Asset Volatility Research System uses BTCUSDT for its current
                public research and operational evidence context. NQ, ES, and Crude Oil
                (CL) futures remain part of its academic lineage, not the current pipeline.
              </p>
            </div>

            <div className="glass-panel rounded-[2rem] p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#758198]">
                Evidence pipeline
              </p>
              <ol className="mt-7 divide-y divide-[#7187AB]/14">
                {pipeline.map((stage, index) => (
                  <li key={stage} className="flex items-center gap-5 py-4 first:pt-0 last:pb-0">
                    <span className="font-mono text-xs text-[#2563C9]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-[#24324A]">{stage}</span>
                  </li>
                ))}
              </ol>
              <Link
                href="/projects/btc-futures-research#evidence-pipeline"
                className={`${primaryButton} mt-9`}
              >
                Inspect the evidence pipeline
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/14 backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-5 py-24 text-center sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="glass-panel mx-auto max-w-[76rem] rounded-[2.5rem] px-6 py-16 sm:px-10 sm:py-24">
            <p className="mx-auto max-w-[68rem] text-[clamp(2.8rem,7.5vw,7.3rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#111A2E]">
              No black box.
              <span className="block">No silent repair.</span>
              <span className="block">No hidden permission.</span>
            </p>
            <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/research" className={primaryButton}>
                Read the methodology
                <Arrow />
              </Link>
              <Link href="/contact" className={secondaryButton}>
                Contact
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
