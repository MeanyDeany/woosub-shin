import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Woosub Shin | Quantitative Researcher",
  description:
    "Quantitative research portfolio focused on financial econometrics, systematic trading, digital assets, causal validation, and reproducible research engineering.",
};

const recruiterSnapshot = [
  ["Education", "M.Sc. Economics · University of Copenhagen"],
  ["Certification", "Certified Investment Manager · KOFIA"],
  ["Markets", "Futures · Bitcoin · Digital assets"],
  ["Core stack", "Python · SQL · Git · Linux · AWS"],
  ["Validation", "OOS · Walk-forward · Bootstrap · Cost stress"],
] as const;

const evidence = [
  {
    value: "1.195",
    label: "Thesis pre-OOS Sharpe",
    detail: "2019-2025 evaluation with parameters selected on 2010-2018 data.",
  },
  {
    value: "p = 0.004",
    label: "EGARCH ablation",
    detail: "Circular block bootstrap for the filtered versus no-filter thesis comparison.",
  },
  {
    value: "+165.92%",
    label: "Retained BTC research return",
    detail: "Retrospective FULL result for the frozen Daily EMA 50/200 long/flat system at 5bp accounting.",
  },
  {
    value: "-29.37%",
    label: "Retained BTC MaxDD",
    detail: "Drawdown stays attached to the headline result instead of being hidden behind return alone.",
  },
] as const;

const selectedWork = [
  {
    number: "01",
    eyebrow: "Digital asset systematic research",
    title: "BTC Research Program",
    detail:
      "A research program for BTC market states, low-turnover systematic candidates, cost stress, frozen validation, prospective observation, and explicit research-to-execution boundaries.",
    href: "/projects/btc-final-system",
    link: "Open the BTC research system",
    span: "lg:col-span-7",
  },
  {
    number: "02",
    eyebrow: "MSc financial econometrics",
    title: "Volatility Regime Filtering",
    detail:
      "EGARCH-conditioned intraday NQ, ES, and WTI Crude Oil futures research with ablation, alternative volatility filters, walk-forward evaluation, placebo tests, and bootstrap inference.",
    href: "/projects/volatility-regime-filtering",
    link: "Read the thesis project",
    span: "lg:col-span-5",
  },
  {
    number: "03",
    eyebrow: "Research engineering",
    title: "Multi-Asset Research Lab",
    detail:
      "An asset-neutral framework for data contracts, causal timing, deterministic replay, provenance, reproducible experiments, frozen evidence, and auditable research infrastructure.",
    href: "/projects/multi-asset-research-lab",
    link: "Explore the research platform",
    span: "lg:col-span-6",
  },
  {
    number: "04",
    eyebrow: "Time-series diagnostics",
    title: "Bitcoin Bubble Detection",
    detail:
      "GSADF-based explosive-root testing for Bitcoin, separating statistical evidence from trading claims and market narratives.",
    href: "/projects/bitcoin-bubble-gsadf",
    link: "Open the GSADF project",
    span: "lg:col-span-6",
  },
] as const;

const capabilities = [
  {
    number: "01",
    title: "Quantitative research",
    detail:
      "Financial econometrics, volatility modeling, time-series diagnostics, hypothesis testing, transaction-cost modeling, systematic strategy research, and market-regime analysis.",
    tags: ["EGARCH", "GARCH/GJR", "GSADF", "Bootstrap", "Placebo tests"],
  },
  {
    number: "02",
    title: "Validation and falsification",
    detail:
      "Out-of-sample evaluation, walk-forward testing, ablation, cost stress, subperiod analysis, causal timing checks, and explicit controls against look-ahead bias and data leakage.",
    tags: ["OOS", "Walk-forward", "Ablation", "Leakage control", "Cost stress"],
  },
  {
    number: "03",
    title: "Research engineering",
    detail:
      "Python and SQL research pipelines with deterministic replay, frozen snapshots, content hashing, experiment provenance, CI, failure-state handling, Linux, and AWS.",
    tags: ["Python", "SQL", "Git", "Linux", "AWS"],
  },
  {
    number: "04",
    title: "AI-augmented development",
    detail:
      "Codex and Claude are used as implementation and review tools inside explicit contracts, tests, source-control boundaries, and independent verification rather than as research authority.",
    tags: ["Codex", "Claude", "Test-driven review", "Audit trails"],
  },
] as const;

const operatingChain = [
  {
    number: "01",
    label: "Define",
    title: "Freeze the question before inspecting the answer.",
    detail: "Lock the dataset, information set, parameters, accounting, and failure rules before interpreting results.",
  },
  {
    number: "02",
    label: "Build",
    title: "Make the experiment reproducible.",
    detail: "Bind source data, code, parameters, and outputs to deterministic identities that can be reconstructed.",
  },
  {
    number: "03",
    label: "Falsify",
    title: "Try to break the result.",
    detail: "Use ablation, placebo tests, cost stress, subperiods, concentration checks, walk-forward testing, and resampling where appropriate.",
  },
  {
    number: "04",
    label: "Forward",
    title: "Let new time arrive after the freeze.",
    detail: "Historical evidence can graduate into prospective observation, but it is not automatically execution authority.",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#58D9FF] px-6 text-sm font-semibold text-[#061018] shadow-[0_12px_34px_rgba(88,217,255,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#86E6FA]";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white/78 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#58D9FF]/38 hover:bg-[#58D9FF]/8 hover:text-white";

export default function Home() {
  return (
    <PageShell headerVariant="showcase">
      <section className="relative isolate overflow-hidden border-b border-white/8 bg-[#05070D] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#315CFF]/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#58D9FF]/10 blur-3xl"
        />
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(20rem,0.82fr)] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.67rem] font-semibold uppercase tracking-[0.17em] text-[#58D9FF]">
                <span>Woosub Shin</span>
                <span className="h-1 w-1 rounded-full bg-[#58D9FF]/45" />
                <span>Quantitative Researcher</span>
              </div>
              <h1 className="mt-7 max-w-[72rem] text-[clamp(3.4rem,7.7vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#F5F8FC]">
                Quantitative research
                <span className="block text-[#8D9AAF]">built to survive falsification.</span>
              </h1>
              <p className="mt-8 max-w-[55rem] text-[clamp(1.15rem,2.1vw,1.85rem)] leading-[1.35] tracking-[-0.025em] text-[#C7D2E5]">
                I combine financial econometrics, systematic trading research, and
                research engineering across futures and digital assets.
              </p>
              <p className="mt-6 max-w-[51rem] text-base leading-7 text-[#8290A8] sm:text-lg sm:leading-8">
                My work emphasizes causal timing, out-of-sample validation, regime-dependent risk,
                reproducible experiments, and the separation of historical evidence from execution authority.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Futures",
                  "Digital assets",
                  "Financial econometrics",
                  "Python / SQL",
                  "OOS / Walk-forward",
                  "AI-assisted development",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-[#AAB6C7]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/resume" className={primaryButton}>
                  View resume
                  <Arrow />
                </Link>
                <Link href="/projects" className={secondaryButton}>
                  Selected research
                  <Arrow />
                </Link>
                <a
                  href="https://github.com/MeanyDeany"
                  target="_blank"
                  rel="noreferrer"
                  className={secondaryButton}
                >
                  GitHub
                  <Arrow />
                </a>
                <a href="mailto:woosub815@gmail.com" className={secondaryButton}>
                  Email
                  <Arrow />
                </a>
              </div>
            </div>

            <aside className="rounded-[1.9rem] border border-white/10 bg-[#0E1522]/88 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#58D9FF]/70">
                    Recruiter snapshot
                  </p>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[#F5F8FC]">
                    Quant research + systematic trading
                  </p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-emerald-200">
                  Seoul
                </span>
              </div>
              <dl className="mt-7 divide-y divide-white/8">
                {recruiterSnapshot.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_minmax(0,1fr)]"
                  >
                    <dt className="text-xs uppercase tracking-[0.09em] text-[#76849A]">{label}</dt>
                    <dd className="text-sm font-semibold leading-6 text-[#D9E3F3]">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 rounded-2xl border border-[#58D9FF]/12 bg-[#58D9FF]/[0.045] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#58D9FF]">
                  Current research thread
                </p>
                <p className="mt-2 text-sm leading-6 text-[#AAB6C7]">
                  Digital-asset systematic research, regime-dependent risk, frozen validation,
                  and reproducible research infrastructure.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#080C14] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Selected research evidence</p>
              <h2 className="mt-3 max-w-[62rem] text-[clamp(2.7rem,5.3vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
                Results stay attached to their sample, risk, and validation label.
              </h2>
            </div>
            <p className="max-w-[35rem] text-sm leading-7 text-[#8795AA] sm:text-base">
              Thesis figures come from the submitted academic paper. BTC figures describe the retained
              retrospective research system and are not a live or paper trading track record.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {evidence.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.6rem] border border-white/9 bg-[#0E1522]/82 p-6 sm:p-7"
              >
                <p className="text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-none tracking-[-0.055em] text-[#F5F8FC]">
                  {item.value}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#58D9FF]">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#8290A8]">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 border-l-2 border-amber-300/35 pl-4 text-xs leading-6 text-[#7F8DA3] sm:flex-row sm:gap-6">
            <span>BTC retained system: 13/13 frozen deep-validation gates passed</span>
            <span>10bp retrospective cost stress: +165.12%</span>
            <span>No live-track-record claim</span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#090D15] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Selected work</p>
              <h2 className="mt-3 max-w-[60rem] text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#F5F8FC]">
                Research that shows the result and the machinery behind it.
              </h2>
            </div>
            <p className="max-w-[35rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">
              The portfolio is concentrated around digital assets, futures, validation,
              financial econometrics, and reproducible research systems.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {selectedWork.map((item) => (
              <article
                key={item.number}
                className={`${item.span} group flex min-h-[23rem] flex-col rounded-[1.8rem] border border-white/9 bg-[#0E1522]/84 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#58D9FF]/24 hover:bg-[#111A2A] sm:p-9`}
              >
                <div className="flex items-start justify-between gap-5">
                  <p className="text-sm font-semibold text-[#58D9FF]">{item.eyebrow}</p>
                  <span className="font-mono text-xs text-[#66758B]">{item.number}</span>
                </div>
                <h3 className="mt-8 max-w-[38rem] text-[clamp(2rem,3.4vw,3.8rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#F5F8FC]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[46rem] text-sm leading-7 text-[#93A0B4] sm:text-base">
                  {item.detail}
                </p>
                <Link
                  href={item.href}
                  className="mt-auto pt-10 text-sm font-semibold text-[#D8F7FF] transition-colors group-hover:text-[#58D9FF]"
                >
                  {item.link} <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#070B12] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Research profile</p>
              <h2 className="mt-3 text-[clamp(2.8rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
                Evidence first. Engineering underneath.
              </h2>
              <p className="mt-7 max-w-[31rem] text-lg leading-8 text-[#93A0B4]">
                I care about whether the information was actually available at the time,
                whether the experiment can be rerun, and whether the result survives attempts to falsify it.
              </p>
            </div>

            <div className="grid gap-3">
              {capabilities.map((item) => (
                <article
                  key={item.number}
                  className="rounded-[1.6rem] border border-white/9 bg-[#0E1522]/72 p-6 sm:p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="font-mono text-xs text-[#58D9FF]">{item.number}</span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#F5F8FC]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[55rem] text-sm leading-7 text-[#93A0B4] sm:text-base">
                        {item.detail}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/9 bg-white/[0.03] px-3 py-1.5 text-xs text-[#AAB6C7]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#090D15] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Research operating chain</p>
              <h2 className="mt-3 max-w-[60rem] text-[clamp(2.8rem,5.8vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
                Define, reproduce, falsify, then observe forward.
              </h2>
            </div>
            <Link href="/research" className={secondaryButton}>
              Research methodology
              <Arrow />
            </Link>
          </div>

          <ol className="mt-12 grid gap-px border border-white/9 bg-white/9 lg:grid-cols-4">
            {operatingChain.map((item) => (
              <li key={item.number} className="bg-[#0B111C] p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#58D9FF]">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-[#617087]">{item.number}</span>
                </div>
                <h3 className="mt-10 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#F5F8FC]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#8C9AAF]">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#05070D] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="rounded-[2rem] border border-white/9 bg-gradient-to-br from-[#111A2A] to-[#090E18] p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-[#58D9FF]">
                  Quant research · Systematic trading · Research engineering
                </p>
                <h2 className="mt-4 max-w-[58rem] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#F5F8FC]">
                  Looking for teams where research quality has to survive contact with real markets.
                </h2>
                <p className="mt-6 max-w-[49rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">
                  I am interested in quantitative research, systematic trading, digital-asset research,
                  and research-engineering roles where rigorous validation matters as much as the initial idea.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/resume" className={primaryButton}>
                  Resume <Arrow />
                </Link>
                <a href="mailto:woosub815@gmail.com" className={secondaryButton}>
                  woosub815@gmail.com <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
