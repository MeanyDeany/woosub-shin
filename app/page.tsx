import type { Metadata } from "next";
import Link from "next/link";
import { MarketShockIntro } from "@/components/market-shock-intro";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Systematic Trading Research Infrastructure",
  description:
    "MeanyDeany builds research systems that move from verified market data and deterministic experiments to frozen historical results and prospective forward observation before capital is put at risk.",
};

const featuredSystems = [
  {
    number: "01",
    eyebrow: "Flagship · Active",
    title: "Multi-Asset Research Lab",
    detail:
      "The asset-neutral research layer: source contracts, reproducible experiments, evidence identity, deterministic replay, and explicit separation between research and execution authority.",
    href: "/projects/multi-asset-research-lab",
    link: "Open the flagship system",
    span: "lg:col-span-7",
  },
  {
    number: "02",
    eyebrow: "Retained system · Forward research",
    title: "BTC Final Research System V1",
    detail:
      "A frozen BTCUSDT Daily EMA 50/200 long/flat system with +165.9% retrospective FULL return, 0.769 Sharpe, deep-validation gates, and a prospective forward research clock that started on 22 Aug 2026.",
    href: "/projects/btc-final-system",
    link: "Open the retained BTC system",
    span: "lg:col-span-5",
  },
  {
    number: "03",
    eyebrow: "MSc research",
    title: "Volatility Regime Filtering",
    detail:
      "EGARCH-conditioned regime research in futures markets with walk-forward validation, robustness checks, and explicit cost assumptions.",
    href: "/projects/volatility-regime-filtering",
    link: "Read the thesis project",
    span: "lg:col-span-6",
  },
  {
    number: "04",
    eyebrow: "Time-series research",
    title: "Bitcoin Bubble Detection",
    detail:
      "A GSADF research lineage for detecting explosive price behavior and separating statistical evidence from trading claims.",
    href: "/projects/bitcoin-bubble-gsadf",
    link: "Open the GSADF project",
    span: "lg:col-span-6",
  },
] as const;

const operatingChain = [
  {
    number: "01",
    label: "Source",
    title: "Know what existed when.",
    detail: "Capture market data with timestamp, revision, and provenance semantics that can be reconstructed later.",
  },
  {
    number: "02",
    label: "Contract",
    title: "Freeze the question first.",
    detail: "Define the information set, window, transformations, and failure conditions before looking at the answer.",
  },
  {
    number: "03",
    label: "Experiment",
    title: "Make the result repeatable.",
    detail: "Bind code, parameters, datasets, accounting, and outputs to exact identities instead of relying on a remembered workflow.",
  },
  {
    number: "04",
    label: "Forward",
    title: "Let new time arrive after the freeze.",
    detail: "A retained research system can cross an explicit historical-to-forward boundary without turning evidence into execution authority.",
  },
] as const;

const statusRows = [
  ["Program", "Multi-Asset Research Lab"],
  ["Current implementation", "BTC Final Research System V1"],
  ["Stage", "Frozen historical system · prospective observation"],
  ["Execution authority", "None · research states only"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const darkButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#58D9FF] px-6 text-sm font-semibold text-[#061018] shadow-[0_12px_34px_rgba(88,217,255,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#86E6FA]";

const darkSecondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white/76 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#58D9FF]/38 hover:bg-[#58D9FF]/8 hover:text-white";

export default function Home() {
  return (
    <PageShell headerVariant="showcase">
      <MarketShockIntro />

      <section
        id="research-intro"
        className="relative isolate scroll-mt-16 overflow-hidden border-b border-white/8 bg-[#070A11] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-52 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#58D9FF]/8 blur-3xl"
        />
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#58D9FF]">
                What comes after the drop
              </p>
              <h2 className="mt-6 max-w-[68rem] text-[clamp(3rem,7.4vw,7.2rem)] font-semibold leading-[0.89] tracking-[-0.07em] text-[#F5F8FC]">
                Markets break.
                <span className="block text-[#8D9AAF]">Research should expect that.</span>
              </h2>
              <p className="mt-8 max-w-[52rem] text-[clamp(1.2rem,2.3vw,2rem)] leading-[1.3] tracking-[-0.025em] text-[#C7D2E5]">
                I build research systems around the assumption that data changes, regimes fail,
                backtests mislead, and good-looking models can still be wrong.
              </p>
              <p className="mt-6 max-w-[48rem] text-base leading-7 text-[#8290A8] sm:text-lg sm:leading-8">
                The work is less about predicting every market shock and more about making each
                research claim traceable, reproducible, falsifiable, and difficult to promote
                beyond the evidence it actually earned. The current BTC implementation now
                includes a frozen historical system and a separate prospective forward clock.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/projects/btc-final-system" className={darkButton}>
                  Open BTC Final System V1
                  <Arrow />
                </Link>
                <Link href="/projects/multi-asset-research-lab" className={darkSecondaryButton}>
                  Enter the research lab
                  <Arrow />
                </Link>
              </div>
            </div>

            <aside className="rounded-[1.8rem] border border-white/10 bg-[#0E1522]/86 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-xl sm:p-8">
              <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#58D9FF]/62">
                Current research frame
              </p>
              <dl className="mt-6 divide-y divide-white/8">
                {statusRows.map(([label, value]) => (
                  <div key={label} className="grid gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)]">
                    <dt className="text-xs uppercase tracking-[0.09em] text-[#76849A]">{label}</dt>
                    <dd className="text-sm font-semibold leading-6 text-[#D9E3F3]">{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#090D15] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Selected work</p>
              <h2 className="mt-3 max-w-[60rem] text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#F5F8FC]">
                Four things worth opening.
              </h2>
            </div>
            <p className="max-w-[34rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">
              One research platform, one retained BTC system, and two academic lineages.
              Everything else on the site should support these, not compete with them.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {featuredSystems.map((system) => (
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
                <h3 className="mt-10 max-w-[42rem] text-[clamp(2.3rem,4vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#F5F8FC]">
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
          <div className="grid gap-12 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Research operating system</p>
              <h2 className="mt-3 max-w-[34rem] text-[clamp(2.7rem,5.2vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
                Evidence moves in one direction.
              </h2>
              <p className="mt-7 max-w-[31rem] text-lg leading-8 text-[#93A0B4]">
                Data can become a claim only after it survives a contract and an experiment.
                A retained claim can enter a forward observation clock without becoming an order.
              </p>
              <div className="mt-9 border-l-2 border-[#58D9FF]/32 pl-5 text-sm leading-7 text-[#7F8DA3]">
                No silent repair. No outcome peeking. No historical-to-forward relabeling. No evidence-to-order shortcut.
              </div>
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
    </PageShell>
  );
}
