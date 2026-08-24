import Link from "next/link";
import { PageShell } from "@/components/site-shell";

const snapshot = [
  ["관심 직무", "퀀트 리서치 · 시스템 트레이딩"],
  ["핵심 스택", "Python · SQL · Git · Linux/AWS"],
  ["검증", "OOS · Walk-forward · Bootstrap · Cost stress"],
  ["AI 활용", "Codex · Claude · 테스트 기반 검토"],
] as const;

const evidence = [
  {
    value: "+182.3%",
    label: "과거 데이터 수익률",
    detail: "BTC C4 선택적 국면 challenger · transition side당 5bp",
  },
  {
    value: "1.10",
    label: "과거 데이터 Sharpe",
    detail: "동일한 frozen post-selection stress audit",
  },
  {
    value: "88",
    label: "완료 거래",
    detail: "가용 국면 기간의 C4 long/flat 경로",
  },
  {
    value: "+116.7%",
    label: "20bp cost stress",
    detail: "강한 거래비용 가정에서도 C4 누적 수익률 양수 유지",
  },
] as const;

const work = [
  {
    number: "01",
    eyebrow: "Research engineering",
    title: "Multi-Asset Research Lab",
    detail:
      "데이터 contract, deterministic replay, provenance, 재현 가능한 experiment, frozen evidence, 연구와 execution 권한 분리를 다루는 자산 중립 연구 프레임워크입니다.",
    href: "/ko/projects/multi-asset-research-lab",
    link: "연구 플랫폼 보기",
    span: "lg:col-span-7",
  },
  {
    number: "02",
    eyebrow: "Systematic BTC research",
    title: "BTC Research Program",
    detail:
      "Daily EMA 50/200 retained baseline과 선택적 국면 challenger 연구를 포함합니다. 과거 결과는 prospective observation보다 먼저 비용, 집중도, subperiod, 재현성 검증을 거칩니다.",
    href: "/projects/btc-final-system",
    link: "BTC 연구 시스템 보기",
    span: "lg:col-span-5",
  },
  {
    number: "03",
    eyebrow: "MSc research",
    title: "Volatility Regime Filtering",
    detail:
      "EGARCH 기반 intraday futures 연구로 ablation, 대체 변동성 필터, walk-forward, bootstrap robustness를 포함합니다.",
    href: "/ko/projects/volatility-regime-filtering",
    link: "석사 논문 프로젝트 보기",
    span: "lg:col-span-6",
  },
  {
    number: "04",
    eyebrow: "Time-series research",
    title: "Bitcoin Bubble Detection",
    detail:
      "GSADF 기반 explosive-root 진단으로 Bitcoin의 통계적 폭발 구간을 탐지하고, 통계적 증거와 매매 주장을 구분합니다.",
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
      "금융계량경제학, 변동성 모델링, 시계열 진단, systematic strategy research, transaction cost, OOS, walk-forward validation을 다룹니다.",
    tags: ["EGARCH", "GARCH/GJR", "HAR-RV", "GSADF", "Bootstrap"],
  },
  {
    number: "02",
    title: "Research engineering",
    detail:
      "Causal data pipeline, deterministic replay, content hashing, immutable artifact, append-only evidence, CI, failure-state handling을 연구 코드에 적용합니다.",
    tags: ["Python", "SQL", "Git", "Linux", "AWS"],
  },
  {
    number: "03",
    title: "AI-augmented development",
    detail:
      "Codex와 Claude를 구현·검토 도구로 활용하되, contract, test, Git diff, independent verification을 통해 AI 출력 자체가 판단 권한이 되지 않도록 설계합니다.",
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
                <span>Quantitative Research</span>
              </div>
              <h1 className="mt-7 max-w-[72rem] text-[clamp(3.2rem,7vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[#F5F8FC]">
                다시 돌려도 같은 결과가 나오는
                <span className="block text-[#8D9AAF]">시스템 트레이딩 연구를 만듭니다.</span>
              </h1>
              <p className="mt-8 max-w-[55rem] text-[clamp(1.12rem,2vw,1.75rem)] leading-[1.42] tracking-[-0.025em] text-[#C7D2E5]">
                금융계량경제학, systematic trading research, software engineering을 연결해
                시장 아이디어를 재현 가능하고 검증 가능한 연구 증거로 바꿉니다.
              </p>
              <p className="mt-6 max-w-[50rem] text-base leading-7 text-[#8290A8] sm:text-lg sm:leading-8">
                현재는 BTC 국면 연구, deterministic backtesting, prospective validation,
                volatility modeling, 그리고 연구 결과와 execution 권한을 분리하는 인프라를 구축하고 있습니다.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["Systematic trading", "금융계량경제학", "Research engineering", "AI 활용 개발"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs font-medium text-[#AAB6C7]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/ko/projects" className={primaryButton}>프로젝트 보기 <Arrow /></Link>
                <Link href="/ko/research" className={secondaryButton}>연구 방법론 <Arrow /></Link>
                <a href="mailto:woosub815@gmail.com" className={secondaryButton}>이메일 <Arrow /></a>
              </div>
            </div>

            <aside className="rounded-[1.9rem] border border-white/10 bg-[#0E1522]/88 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#58D9FF]/70">Recruiter snapshot</p>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[#F5F8FC]">Quant research + research engineering</p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-emerald-200">Active build</span>
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
                <p className="mt-2 text-sm leading-6 text-[#AAB6C7]">BTC 선택적 국면 challenger, forward-observation contract, execution authority separation을 병렬로 구축하고 있습니다.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#080C14] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">숫자에는 출처와 한계를 함께 붙입니다</p>
              <h2 className="mt-3 max-w-[58rem] text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#F5F8FC]">
                좋은 백테스트보다, 왜 그 숫자를 믿어도 되는지 설명하는 연구를 지향합니다.
              </h2>
            </div>
            <p className="max-w-[34rem] text-sm leading-7 text-[#8795AA] sm:text-base">
              아래 BTC challenger 수치는 2022년부터 2026년 7월까지의 frozen post-selection historical stress audit입니다. 실거래 track record가 아닙니다.
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
            <span>Post-selection historical research</span>
            <span>실거래·모의매매 track record 아님</span>
            <span>레버리지·position sizing 미적용</span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#090D15] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#58D9FF]">Selected work</p>
              <h2 className="mt-3 max-w-[60rem] text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">결과와 그 결과를 만든 연구 시스템을 함께 보여드립니다.</h2>
            </div>
            <p className="max-w-[34rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">포트폴리오는 systematic research, market data, validation, financial econometrics에 집중합니다.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {work.map((item) => (
              <article key={item.number} className={`${item.span} group flex min-h-[24rem] flex-col rounded-[1.8rem] border border-white/9 bg-[#0E1522]/84 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#58D9FF]/24 hover:bg-[#111A2A] sm:p-9`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#58D9FF]">{item.number}</span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#76849A]">{item.eyebrow}</span>
                </div>
                <h3 className="mt-10 max-w-[42rem] text-[clamp(2.2rem,3.8vw,4rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-[#F5F8FC]">{item.title}</h3>
                <p className="mt-6 max-w-[44rem] text-base leading-7 text-[#93A0B4]">{item.detail}</p>
                <Link href={item.href} className="mt-auto inline-flex w-fit items-center gap-2 pt-10 text-sm font-semibold text-[#58D9FF] transition-colors group-hover:text-[#86E6FA]">{item.link} <Arrow /></Link>
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
              <h2 className="mt-3 text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">연구 질문을 믿을 수 있는 코드와 증거로 연결합니다.</h2>
              <p className="mt-7 max-w-[31rem] text-lg leading-8 text-[#93A0B4]">모델 자체뿐 아니라 데이터가 언제 알려졌는지, 실험이 다시 실행되는지, 결과가 비용과 시간축을 견디는지도 함께 봅니다.</p>
            </div>
            <div className="grid gap-3">
              {capabilities.map((item) => (
                <article key={item.number} className="rounded-[1.6rem] border border-white/9 bg-[#0E1522]/72 p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="font-mono text-xs text-[#58D9FF]">{item.number}</span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#F5F8FC]">{item.title}</h3>
                      <p className="mt-3 max-w-[54rem] text-sm leading-7 text-[#93A0B4] sm:text-base">{item.detail}</p>
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
                <h2 className="mt-4 max-w-[58rem] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#F5F8FC]">모델과 그 모델을 뒷받침하는 증거를 함께 보는 팀을 찾고 있습니다.</h2>
                <p className="mt-6 max-w-[48rem] text-base leading-7 text-[#93A0B4] sm:text-lg sm:leading-8">퀀트 리서치, systematic strategy, research infrastructure가 만나는 역할이라면 이야기 나누고 싶습니다.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href="mailto:woosub815@gmail.com" className={primaryButton}>woosub815@gmail.com <Arrow /></a>
                <a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer" className={secondaryButton}>GitHub <Arrow /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
