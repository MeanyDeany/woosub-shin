import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Quantitative Research & Systematic Trading",
  description:
    "Woosub Shin builds systematic trading research with financial econometrics, deterministic backtesting, walk-forward validation, and auditable research infrastructure.",
};

const recruiterSnapshot = [
  ["Focus", "Quant research · Systematic trading"],
  ["Core stack", "Python · SQL · Git · Linux/AWS"],
  ["Validation", "OOS · Walk-forward · Bootstrap · Cost stress"],
  ["AI workflow", "Codex · Claude · test-driven review"],
] as const;

const evidence = [
  {
    value: "+182.3%",
    label: "Historical return",
    detail: "BTC C4 selective-regime challenger · 5bp per transition side",
  },
  {
    value: "1.10",
    label: "Historical Sharpe",
    detail: "Same frozen post-selection stress audit",
  },
  {
    value: "88",
    label: "Completed trades",
    detail: "Long/flat C4 path across the available regime period",
  },
  {
    value: "+116.7%",
    label: "20bp cost stress",
    detail: "C4 remained positive under severe turnover-cost assumptions",
  },
] as const;

const selectedWork = [
  {
    number: "01",
    eyebrow: "Research engineering",
    title: "Multi-Asset Research Lab",
    detail:
      "An asset-neutral framework for data contracts, deterministic replay, provenance, reproducible experiments, frozen evidence, and explicit research-to-execution boundaries.",
    href: "/projects/multi-asset-research-lab",
    link: "Explore the research platform",
    span: "lg:col-span-7",
  },
  {
    number: "02",
    eyebrow: "Systematic BTC research",
    title: "BTC Research Program",
    detail:
      "A retained Daily EMA 50/200 baseline plus a newer selective-regime challenger lineage. Historical findings are stress-tested before any prospective observation or execution discussion.",
    href: "/projects/btc-final-system",
    link: "Open the BTC research system",
    span: "lg:col-span-5",
  },
  {
    number: "03",
    eyebrow: "MSc research",
    title: "Volatility Regime Filtering",
    detail:
      "EGARCH-conditioned intraday futures research with ablation, alternative volatility filters, walk-forward evaluation, and bootstrap robustness.",
    href: "/projects/volatility-regime-filtering",
    link: "Read the thesis project",
    span: "lg:col-span-6",
  },
  {
    number: "04",
    eyebrow: "Time-series research",
    title: "Bitcoin Bubble Detection",
    detail:
      "GSADF-based explosive-root diagnostics for Bitcoin, separating statistical evidence from trading claims and market narratives.",
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
      "Financial econometrics, volatility modeling, time-series diagnostics, systematic strategy research, transaction-cost modeling, OOS evaluation, and walk-forward validation.",
    tags: ["EGARCH", "GARCH/GJR", "HAR-RV", "GSADF", "Bootstrap"],
  },
  {
    number: "02",
    title: "Research engineering",
    detail:
      "Causal data pipelines, deterministic replay, content hashing, immutable artifacts, append-only evidence, CI, failure-state handling, and reproducible experiment infrastructure.",
    tags: ["Python", "SQL", "Git", "Linux", "AWS"],
  },
  {
    number: "03",
    title: "AI-augmented development",
    detail:
      "I use Codex and Claude as implementation and review tools inside explicit contracts, tests, source-control boundaries, and independent verification rather than treating model output as authority.",
    tags: ["Codex", "Claude", "Test-driven review", "Audit trails"],
  },
] as const;

const operatingChain = [
  {
    number: "01",
    label: "Define",
    title: "Freeze the question before the answer.",
    detail: "Lock the dataset, information set, parameters, accounting, and failure rules before inspecting the result.",
  },
  {
    number: "02",
    label: "Build",
    title: "Make the experiment reproducible.",
    detail: "Bind source data, code, parameters, and outputs to deterministic identities that can be independently reconstructed.",
  },
  {
    number: "03",
    label: "Stress",
    title: "Try to break the result.",
    detail: "Use cost stress, subperiods, concentration tests, leave-out diagnostics, and walk-forward or resampling where scientifically appropriate.",
  },
  {
    number: "04",
    label: "Forward",
    title: "Let new time arrive after the freeze.",
    detail: "Historical evidence can graduate into prospective observation, but it does not automatically become execution authority.",
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
                <span>Quantitative Research</span>
              </div>
              <h1 className="mt-7 max-w-[72rem] text-[clamp(3.4rem,7.7vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#F5F8FC]">
                Systematic research,
                <span className="block text-[#8D9AAF]">engineered to survive a rerun.</span>
              </h1>
              <p className="mt-8 max-w-[54rem] text-[clamp(1.15rem,2.1vw,1.85rem)] leading-[1.35] tracking-[-0.025em] text-[#C7D2E5]">
                I combine financial econometrics, systematic trading research, and
                software engineering to turn market ideas into evidence that can be
                reproduced, challenged, and audited.
              </p>
              <p className="mt-6 max-w-[49rem] text-base leading-7 text-[#8290A8] sm:text-lg sm:leading-8">
                My current work spans BTC regime research, deterministic backtesting,
                prospective validation, volatility modeling, and the infrastructure
                required to keep research results separate from execution authority.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Systematic trading", "Financial econometrics", "Research engineering", "AI-assisted development"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-[#AAB6C7]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/projects" className={primaryButton}>
                  View selected work
                  <Arrow />
                </Link>
                <Link href="/research" className={secondaryButton}>
                  Research methodology
                  <Arrow />
                </Link>
                <a href="mailto:woosub815@gmail.com" className={secondaryButton}>
                  Email me
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
                    Quant research + research engineering
                  </p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-emerald-200">
                  Active build
                </span>
              </div>
              <dl className="mt-7 divide-y divide-white/8">
                {recruiterSnapshot.map(([label, value]) => (
                  <div key={label} className="grid gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_minmax(0,1fr)]">
                    <dt className="text-xs uppercase tracking-[0.09em] text-[#76849A]">{label}</dt>
                    <dd className="text-sm font-semibold leading-6 text-[#D9E3F3]">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 rounded-2xl border border-[#58D9FF]/12 bg-[#58D9FF]/[0.045] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#58D9FF]">Current research thread</p>
                <p className="mt-2 text-sm leading-6 text-[#AAB6C7]">
                  BTC selective-regime challengers, forward-observation contracts, and execution architecture with explicit authority separation.
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
              <p className="text-sm font-semibold text-[#58D9FF]">Evidence, with labels attached</p>
              <h2 className="mt-3 max-w-[58rem] text-[clamp(2.7rem,5.3vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
                Strong numbers are useful only when you can explain where they came from.
              </h2>
            </div>
            <p className="max-w-[34rem] text-sm leading-7 text-[#8795AA] sm:text-base">
              Latest BTC challenger figures below come from a frozen post-selection historical stress audit over 2022 to July 2026. They are research evidence, not a live track record.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {evidence.map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-white/9 bg-[#0E1522]/82 p-6 sm:p-7">
                <p className="text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-none tracking-[-0.055em] text-[#F5F8FC]">
                  {item.value}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#58D9FF]">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#8290A8]">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 border-l-2 border-amber-300/35 pl-4 text-xs leading-6 text-[#7F8DA3] sm:flex-row sm:gap-6">
            <span>Post-selection historical research</span>
            <span>No live or paper track record</span>
            <span>No leverage or position sizing in these figures</span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#090D15] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Selected work</p>
              <h2 className="mt-3 max-w-[60rem] text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#F5F8FC]">
                Research that shows both the result and the machinery behind it.
              </h2>
            </div>
            <p className="max-w-[34rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">
              The portfolio is intentionally concentrated around systematic research,
              market data, validation, and financial econometrics.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {selectedWork.map((system) => (
              <article
                key={system.number}
                className={`${system.span} group flex min-h-[24rem] flex-col rounded-[1.8rem] border border-white/9 bg-[#0E1522]/84 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#58D9FF]/24 hover:bg-[#111A2A] sm:p-9`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#58D9FF]">{system.number}</span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#76849A]">
                    {system.eyebrow}
                  </span>
                </div>
                <h3 className="mt-10 max-w-[42rem] text-[clamp(2.2rem,3.8vw,4rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-[#F5F8FC]">
                  {system.title}
                </h3>
                <p className="mt-6 max-w-[44rem] text-base leading-7 text-[#93A0B4]">{system.detail}</p>
                <Link
                  href={system.href}
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-10 text-sm font-semibold text-[#58D9FF] transition-colors group-hover:text-[#86E6FA]"
                >
                  {system.link}
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#0B101A] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.62fr)_minmax(0,1.38fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">What I bring</p>
              <h2 className="mt-3 text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
                Quant work that crosses research and engineering.
              </h2>
              <p className="mt-7 max-w-[31rem] text-lg leading-8 text-[#93A0B4]">
                I am most useful where a research question has to become reliable code,
                and where the code still has to remain honest about what the evidence proves.
              </p>
            </div>

            <div className="grid gap-3">
              {capabilities.map((capability) => (
                <article key={capability.number} className="rounded-[1.6rem] border border-white/9 bg-[#0E1522]/72 p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="font-mono text-xs text-[#58D9FF]">{capability.number}</span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#F5F8FC]">{capability.title}</h3>
                      <p className="mt-3 max-w-[54rem] text-sm leading-7 text-[#93A0B4] sm:text-base">{capability.detail}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {capability.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/9 bg-white/[0.03] px-3 py-1.5 text-xs text-[#AAB6C7]">
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

      <section className="border-b border-white/8 bg-[#080C14] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">How I work</p>
              <h2 className="mt-3 max-w-[34rem] text-[clamp(2.7rem,5.2vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
                Evidence moves in one direction.
              </h2>
              <p className="mt-7 max-w-[31rem] text-lg leading-8 text-[#93A0B4]">
                A good-looking backtest is a starting point. The job is to make it difficult
                for a weak idea to survive by accident.
              </p>
            </div>

            <ol className="divide-y divide-white/9 border-y border-white/9">
              {operatingChain.map((item) => (
                <li key={item.number} className="grid gap-5 py-7 sm:grid-cols-[3rem_8rem_minmax(0,1fr)] sm:items-start sm:py-8">
                  <span className="font-mono text-xs text-[#58D9FF]">{item.number}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#76849A]">
                    {item.label}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#F5F8FC] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[48rem] text-sm leading-6 text-[#93A0B4] sm:text-base sm:leading-7">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#05070D] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="rounded-[2rem] border border-white/9 bg-gradient-to-br from-[#111A2A] to-[#090E18] p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-[#58D9FF]">Quant research · Systematic trading · Research engineering</p>
                <h2 className="mt-4 max-w-[58rem] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#F5F8FC]">
                  Looking for teams that care about both the model and the evidence behind it.
                </h2>
                <p className="mt-6 max-w-[48rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">
                  If the role sits somewhere between quantitative research, systematic strategy work,
                  and building reliable research infrastructure, I would like to talk.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href="mailto:woosub815@gmail.com" className={primaryButton}>
                  woosub815@gmail.com
                  <Arrow />
                </a>
                <a
                  href="https://github.com/MeanyDeany"
                  target="_blank"
                  rel="noreferrer"
                  className={secondaryButton}
                >
                  GitHub
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
