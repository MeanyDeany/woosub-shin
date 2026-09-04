import Link from "next/link";
import { PageShell } from "@/components/site-shell";

const snapshot = [
  ["학력", "M.Sc. Economics · University of Copenhagen"],
  ["자격", "Certified Investment Manager · KOFIA"],
  ["시장", "Futures · Bitcoin · Digital assets"],
  ["핵심 스택", "Python · SQL · Git · Linux · AWS"],
  ["검증", "OOS · Walk-forward · Bootstrap · Cost stress"],
] as const;

const evidence = [
  {
    value: "1.195",
    label: "논문 pre-OOS Sharpe",
    detail: "2010-2018에서 파라미터를 선정하고 2019-2025를 평가한 석사논문 결과입니다.",
  },
  {
    value: "p = 0.004",
    label: "EGARCH ablation",
    detail: "EGARCH filter 유무 비교에 대한 circular block bootstrap 결과입니다.",
  },
  {
    value: "+165.92%",
    label: "Retained BTC 과거 수익률",
    detail: "Daily EMA 50/200 long/flat 연구 시스템의 retrospective FULL 결과입니다.",
  },
  {
    value: "-29.37%",
    label: "Retained BTC MaxDD",
    detail: "수익률 숫자와 함께 drawdown을 같은 화면에 표시합니다.",
  },
] as const;

const work = [
  {
    number: "01",
    eyebrow: "Digital asset systematic research",
    title: "BTC Research Program",
    detail:
      "BTC market state, 저회전 systematic candidate, cost stress, frozen validation, prospective observation, research-to-execution boundary를 함께 다루는 연구 프로그램입니다.",
    href: "/projects/btc-final-system",
    link: "BTC 연구 시스템 보기",
    span: "lg:col-span-7",
  },
  {
    number: "02",
    eyebrow: "MSc financial econometrics",
    title: "Volatility Regime Filtering",
    detail:
      "NQ, ES, WTI Crude Oil 5분봉을 대상으로 EGARCH conditioning, ablation, alternative volatility filter, walk-forward, placebo, bootstrap inference를 수행한 석사논문입니다.",
    href: "/ko/projects/volatility-regime-filtering",
    link: "석사논문 프로젝트 보기",
    span: "lg:col-span-5",
  },
  {
    number: "03",
    eyebrow: "Research engineering",
    title: "Multi-Asset Research Lab",
    detail:
      "Data contract, causal timing, deterministic replay, provenance, frozen evidence, reproducible experiment를 자산 중립적으로 묶은 연구 인프라입니다.",
    href: "/ko/projects/multi-asset-research-lab",
    link: "연구 플랫폼 보기",
    span: "lg:col-span-6",
  },
  {
    number: "04",
    eyebrow: "Time-series diagnostics",
    title: "Bitcoin Bubble Detection",
    detail:
      "GSADF 기반 explosive-root test로 Bitcoin의 통계적 폭발 구간을 진단하고 통계적 증거와 매매 주장을 분리합니다.",
    href: "/ko/projects/bitcoin-bubble-gsadf",
    link: "GSADF 프로젝트 보기",
    span: "lg:col-span-6",
  },
] as const;

const capabilities = [
  {
    number: "01",
    title: "Quantitative research",
    detail:
      "금융계량경제학, volatility modeling, time-series diagnostics, hypothesis testing, transaction-cost modeling, systematic strategy research를 다룹니다.",
    tags: ["EGARCH", "GARCH/GJR", "GSADF", "Bootstrap", "Placebo"],
  },
  {
    number: "02",
    title: "Validation and falsification",
    detail:
      "OOS, walk-forward, ablation, cost stress, subperiod, causal timing, look-ahead bias와 data leakage 통제를 연구 설계에 포함합니다.",
    tags: ["OOS", "Walk-forward", "Ablation", "Leakage control", "Cost stress"],
  },
  {
    number: "03",
    title: "Research engineering",
    detail:
      "Python·SQL 기반 data pipeline, deterministic replay, frozen snapshot, content hashing, experiment provenance, CI, Linux/AWS를 사용합니다.",
    tags: ["Python", "SQL", "Git", "Linux", "AWS"],
  },
  {
    number: "04",
    title: "AI-augmented development",
    detail:
      "Codex와 Claude를 구현·검토 도구로 사용하되 contract, test, source-control boundary, independent verification을 통해 AI 출력 자체가 연구 판단 권한이 되지 않도록 합니다.",
    tags: ["Codex", "Claude", "Test-driven review", "Audit trail"],
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#58D9FF] px-6 text-sm font-semibold text-[#061018] shadow-[0_12px_34px_rgba(88,217,255,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#86E6FA]";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white/78 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#58D9FF]/38 hover:bg-[#58D9FF]/8 hover:text-white";

export function KoreanRecruiterHome() {
  return (
    <PageShell locale="ko" headerVariant="showcase">
      <section className="relative isolate overflow-hidden border-b border-white/8 bg-[#05070D] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#315CFF]/12 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#58D9FF]/10 blur-3xl" />

        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(20rem,0.82fr)] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[0.67rem] font-semibold uppercase tracking-[0.17em] text-[#58D9FF]">
                <span>신우섭 · Woosub Shin</span>
                <span className="h-1 w-1 rounded-full bg-[#58D9FF]/45" />
                <span>Quantitative Researcher</span>
              </div>

              <h1 className="mt-7 max-w-[72rem] text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[#F5F8FC]">
                반증을 견디는
                <span className="block text-[#8D9AAF]">정량 연구를 만듭니다.</span>
              </h1>

              <p className="mt-8 max-w-[55rem] text-[clamp(1.12rem,2vw,1.75rem)] leading-[1.42] tracking-[-0.025em] text-[#C7D2E5]">
                금융계량경제학, systematic trading research, research engineering을 연결해
                futures와 digital asset 아이디어를 검증 가능한 evidence로 바꿉니다.
              </p>
              <p className="mt-6 max-w-[51rem] text-base leading-7 text-[#8290A8] sm:text-lg sm:leading-8">
                Causal timing, OOS validation, regime-dependent risk, reproducible experiment,
                그리고 historical evidence와 execution authority의 분리를 중요하게 봅니다.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Futures", "Digital assets", "금융계량경제학", "Python / SQL", "OOS / Walk-forward", "AI-assisted development"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-[#AAB6C7]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/resume" className={primaryButton}>영문 Resume <Arrow /></Link>
                <Link href="/ko/projects" className={secondaryButton}>연구 프로젝트 <Arrow /></Link>
                <a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer" className={secondaryButton}>GitHub <Arrow /></a>
                <a href="mailto:woosub815@gmail.com" className={secondaryButton}>이메일 <Arrow /></a>
              </div>
            </div>

            <aside className="rounded-[1.9rem] border border-white/10 bg-[#0E1522]/88 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#58D9FF]/70">Recruiter snapshot</p>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[#F5F8FC]">Quant research + systematic trading</p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-emerald-200">Seoul</span>
              </div>

              <dl className="mt-7 divide-y divide-white/8">
                {snapshot.map(([label, value]) => (
                  <div key={label} className="grid gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_minmax(0,1fr)]">
                    <dt className="text-xs uppercase tracking-[0.09em] text-[#76849A]">{label}</dt>
                    <dd className="text-sm font-semibold leading-6 text-[#D9E3F3]">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 rounded-2xl border border-[#58D9FF]/12 bg-[#58D9FF]/[0.045] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#58D9FF]">현재 연구</p>
                <p className="mt-2 text-sm leading-6 text-[#AAB6C7]">Digital-asset systematic research, regime-dependent risk, frozen validation, reproducible research infrastructure.</p>
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
              <h2 className="mt-3 max-w-[62rem] text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#F5F8FC]">
                숫자에는 sample, risk, validation label을 같이 붙입니다.
              </h2>
            </div>
            <p className="max-w-[35rem] text-sm leading-7 text-[#8795AA] sm:text-base">
              논문 수치는 제출된 thesis를 기준으로 했고, BTC 수치는 retained retrospective research system입니다. 실거래 track record 주장이 아닙니다.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {evidence.map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-white/9 bg-[#0E1522]/82 p-6 sm:p-7">
                <p className="text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-none tracking-[-0.055em] text-[#F5F8FC]">{item.value}</p>
                <p className="mt-4 text-sm font-semibold text-[#58D9FF]">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#8290A8]">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 border-l-2 border-amber-300/35 pl-4 text-xs leading-6 text-[#7F8DA3] sm:flex-row sm:gap-6">
            <span>BTC retained system: frozen deep-validation 13/13 통과</span>
            <span>10bp retrospective cost stress: +165.12%</span>
            <span>Live track record 아님</span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#090D15] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Selected work</p>
              <h2 className="mt-3 max-w-[60rem] text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">결과와 그 결과를 만든 연구 시스템을 같이 보여줍니다.</h2>
            </div>
            <p className="max-w-[35rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">Digital asset, futures, validation, financial econometrics, reproducible research에 집중합니다.</p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {work.map((item) => (
              <article key={item.number} className={`${item.span} group flex min-h-[23rem] flex-col rounded-[1.8rem] border border-white/9 bg-[#0E1522]/84 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#58D9FF]/24 hover:bg-[#111A2A] sm:p-9`}>
                <div className="flex items-start justify-between gap-5">
                  <p className="text-sm font-semibold text-[#58D9FF]">{item.eyebrow}</p>
                  <span className="font-mono text-xs text-[#66758B]">{item.number}</span>
                </div>
                <h3 className="mt-8 max-w-[38rem] text-[clamp(2rem,3.4vw,3.8rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#F5F8FC]">{item.title}</h3>
                <p className="mt-5 max-w-[46rem] text-sm leading-7 text-[#93A0B4] sm:text-base">{item.detail}</p>
                <Link href={item.href} className="mt-auto pt-10 text-sm font-semibold text-[#D8F7FF] transition-colors group-hover:text-[#58D9FF]">{item.link} <Arrow /></Link>
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
              <h2 className="mt-3 text-[clamp(2.8rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">Evidence first. Engineering underneath.</h2>
              <p className="mt-7 max-w-[31rem] text-lg leading-8 text-[#93A0B4]">정보가 실제로 그 시점에 존재했는지, 실험이 다시 실행되는지, 결과가 반증 시도를 견디는지까지 봅니다.</p>
            </div>

            <div className="grid gap-3">
              {capabilities.map((item) => (
                <article key={item.number} className="rounded-[1.6rem] border border-white/9 bg-[#0E1522]/72 p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="font-mono text-xs text-[#58D9FF]">{item.number}</span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#F5F8FC]">{item.title}</h3>
                      <p className="mt-3 max-w-[55rem] text-sm leading-7 text-[#93A0B4] sm:text-base">{item.detail}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/9 bg-white/[0.03] px-3 py-1.5 text-xs text-[#AAB6C7]">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#05070D] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="rounded-[2rem] border border-white/9 bg-gradient-to-br from-[#111A2A] to-[#090E18] p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-[#58D9FF]">Quant research · Systematic trading · Research engineering</p>
                <h2 className="mt-4 max-w-[58rem] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#F5F8FC]">연구 품질이 실제 시장과 부딪혀도 버텨야 하는 팀을 찾고 있습니다.</h2>
                <p className="mt-6 max-w-[49rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">Quant research, systematic trading, digital-asset research, research engineering 역할에 관심이 있습니다.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/resume" className={primaryButton}>영문 Resume <Arrow /></Link>
                <a href="mailto:woosub815@gmail.com" className={secondaryButton}>woosub815@gmail.com <Arrow /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
