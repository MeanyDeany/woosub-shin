import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Resume | Woosub Shin",
  description:
    "Resume of Woosub Shin, a quantitative researcher focused on financial econometrics, systematic trading, digital assets, and reproducible research engineering.",
};

const sectionTitle =
  "text-xs font-semibold uppercase tracking-[0.16em] text-[#58D9FF]";

const chip =
  "rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-[#AAB6C7]";

export default function ResumePage() {
  return (
    <PageShell>
      <section className="border-b border-white/8 bg-[#05070D] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="font-mono text-[0.67rem] font-semibold uppercase tracking-[0.17em] text-[#58D9FF]">
                Resume · Quantitative Research
              </p>
              <h1 className="mt-5 text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[#F5F8FC]">
                Woosub Shin
              </h1>
              <p className="mt-5 max-w-[52rem] text-xl leading-8 tracking-[-0.02em] text-[#C7D2E5] sm:text-2xl">
                Quantitative researcher focused on financial econometrics, systematic trading,
                digital assets, and reproducible research engineering.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Seoul, South Korea",
                  "Python",
                  "SQL",
                  "Futures",
                  "Digital assets",
                  "Financial econometrics",
                ].map((item) => (
                  <span key={item} className={chip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <a
                href="mailto:woosub815@gmail.com"
                className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-[#D9E3F3] transition-colors hover:border-[#58D9FF]/35 hover:text-[#58D9FF]"
              >
                woosub815@gmail.com ↗
              </a>
              <a
                href="https://github.com/MeanyDeany"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-[#D9E3F3] transition-colors hover:border-[#58D9FF]/35 hover:text-[#58D9FF]"
              >
                GitHub / MeanyDeany ↗
              </a>
              <Link
                href="/"
                className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-[#D9E3F3] transition-colors hover:border-[#58D9FF]/35 hover:text-[#58D9FF]"
              >
                Portfolio home →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#080C14] text-white">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <aside className="space-y-10">
              <div>
                <p className={sectionTitle}>Education</p>
                <div className="mt-5 border-l border-[#58D9FF]/28 pl-5">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#F5F8FC]">
                    M.Sc. Economics
                  </h2>
                  <p className="mt-2 text-sm font-medium text-[#C7D2E5]">
                    University of Copenhagen
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#8290A8]">
                    Financial econometrics, time-series analysis, empirical asset pricing,
                    volatility modeling, and systematic strategy research.
                  </p>
                </div>
              </div>

              <div>
                <p className={sectionTitle}>Certification</p>
                <div className="mt-5 border-l border-[#58D9FF]/28 pl-5">
                  <h2 className="text-lg font-semibold text-[#F5F8FC]">
                    Certified Investment Manager
                  </h2>
                  <p className="mt-2 text-sm text-[#8290A8]">KOFIA · Korea</p>
                </div>
              </div>

              <div>
                <p className={sectionTitle}>Technical stack</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Python",
                    "SQL / SQLite",
                    "Git / GitHub",
                    "Linux",
                    "AWS",
                    "Time-series analysis",
                    "Backtesting",
                    "Walk-forward validation",
                    "Bootstrap",
                    "Codex",
                    "Claude",
                  ].map((item) => (
                    <span key={item} className={chip}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className={sectionTitle}>Languages</p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-5 border-b border-white/8 pb-3">
                    <dt className="text-[#8290A8]">Korean</dt>
                    <dd className="font-semibold text-[#D9E3F3]">Native</dd>
                  </div>
                  <div className="flex items-center justify-between gap-5 border-b border-white/8 pb-3">
                    <dt className="text-[#8290A8]">English</dt>
                    <dd className="font-semibold text-[#D9E3F3]">Native / bilingual</dd>
                  </div>
                </dl>
              </div>
            </aside>

            <main className="space-y-14">
              <section>
                <p className={sectionTitle}>Profile</p>
                <p className="mt-5 text-base leading-8 text-[#B9C5D6] sm:text-lg">
                  I build quantitative research systems that keep data timing, model assumptions,
                  validation, and execution authority separate. My work spans futures volatility,
                  digital-asset systematic research, reproducible backtesting, frozen evidence,
                  and AI-assisted research engineering.
                </p>
              </section>

              <section>
                <p className={sectionTitle}>Selected quantitative research</p>

                <article className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#58D9FF]">MSc thesis</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#F5F8FC]">
                        Volatility Regime Filtering in Futures Markets
                      </h2>
                    </div>
                    <a
                      href="/papers/volatility-regime-filtering-thesis.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-[#A9EFFF] hover:text-[#58D9FF]"
                    >
                      Thesis PDF ↗
                    </a>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[#A5B2C4] sm:text-base">
                    <li>
                      Studied a long-only EGARCH-conditioned intraday breakout framework across
                      Nasdaq 100, S&amp;P 500, and WTI Crude Oil futures using 5-minute data over 2019-2025.
                    </li>
                    <li>
                      A pre-out-of-sample specification with parameters selected on 2010-2018 data
                      achieved a Sharpe ratio of 1.195 and a cumulative return of 3.36x on $200,000 initial capital.
                    </li>
                    <li>
                      Removing EGARCH reduced Sharpe from 1.195 to 0.382; circular block bootstrap
                      testing supported the difference at p = 0.004. Placebo and walk-forward tests were used
                      to probe timing dependence and robustness.
                    </li>
                  </ul>
                </article>

                <article className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#58D9FF]">Independent quantitative research</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#F5F8FC]">
                        BTC Systematic Research Program
                      </h2>
                    </div>
                    <Link
                      href="/projects/btc-final-system"
                      className="text-sm font-semibold text-[#A9EFFF] hover:text-[#58D9FF]"
                    >
                      Project evidence →
                    </Link>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[#A5B2C4] sm:text-base">
                    <li>
                      Built Python and SQL research infrastructure for market data, deterministic replay,
                      frozen snapshots, causal timing, experiment provenance, validation, and reporting.
                    </li>
                    <li>
                      The retained Daily EMA 50/200 long/flat research system reports a retrospective FULL
                      return of +165.92%, Sharpe 0.769, and MaxDD -29.37% under 5bp funding-adjusted accounting.
                    </li>
                    <li>
                      The retained candidate passed 13 frozen deep-validation gates, remained positive under
                      10bp cost stress, and moved into prospective forward observation on 22 Aug 2026.
                    </li>
                    <li>
                      Historical research evidence is explicitly separated from live-track-record claims and
                      from execution authority.
                    </li>
                  </ul>
                </article>

                <article className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#58D9FF]">Research engineering</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#F5F8FC]">
                        Multi-Asset Research Lab
                      </h2>
                    </div>
                    <Link
                      href="/projects/multi-asset-research-lab"
                      className="text-sm font-semibold text-[#A9EFFF] hover:text-[#58D9FF]"
                    >
                      Platform →
                    </Link>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-[#A5B2C4] sm:text-base">
                    <li>
                      Developed an asset-neutral framework for data contracts, point-in-time semantics,
                      deterministic replay, immutable artifacts, content hashing, and reproducible experiments.
                    </li>
                    <li>
                      Designed explicit controls for look-ahead bias, data leakage, failure states,
                      post-selection evidence, and prospective validation boundaries.
                    </li>
                    <li>
                      Uses Git, Linux, AWS, CI, and AI-assisted implementation workflows with independent review.
                    </li>
                  </ul>
                </article>

                <article className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#58D9FF]">Time-series research</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#F5F8FC]">
                        Bitcoin Bubble Detection with GSADF
                      </h2>
                    </div>
                    <Link
                      href="/projects/bitcoin-bubble-gsadf"
                      className="text-sm font-semibold text-[#A9EFFF] hover:text-[#58D9FF]"
                    >
                      Project →
                    </Link>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[#A5B2C4] sm:text-base">
                    Applied right-tailed explosive-root testing to Bitcoin price dynamics, separating
                    statistical evidence of explosive episodes from trading claims or market narratives.
                  </p>
                </article>
              </section>

              <section>
                <p className={sectionTitle}>Research approach</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Causal timing", "Only information available at decision time belongs in the information set."],
                    ["Falsification", "Ablation, placebo tests, cost stress, and alternative specifications are used to attack the result."],
                    ["Reproducibility", "Data, code, parameters, and outputs are bound to deterministic identities and frozen evidence."],
                    ["Forward boundary", "Historical evidence is not treated as a live track record or automatic execution permission."],
                  ].map(([title, detail]) => (
                    <div key={title} className="rounded-2xl border border-white/9 bg-[#0E1522]/72 p-5">
                      <h3 className="font-semibold text-[#F5F8FC]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#8D9AAF]">{detail}</p>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
