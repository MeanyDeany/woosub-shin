import type { Metadata } from "next";
import {
  CapabilityBand,
  CtaLink,
  EditorialSection,
  EvidenceBand,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "BTC 선택적 국면 Challenger C4",
  description:
    "Momentum90, EMA 50/180, RSI2/EMA200 sleeve를 결합한 BTC long/flat 선택적 국면 challenger의 post-selection historical stress audit.",
  alternates: {
    canonical: "/ko/projects/btc-regime-challenger",
    languages: { en: "/projects/btc-regime-challenger", ko: "/ko/projects/btc-regime-challenger" },
  },
};

const tags = [
  "BTCUSDT",
  "Systematic trading research",
  "Regime conditioning",
  "Momentum90",
  "EMA 50/180",
  "RSI2",
  "Cost stress",
  "Bootstrap",
] as const;

const sleeves = [
  {
    id: "S1",
    regime: "TREND_UP",
    strategy: "Momentum90",
    rule: "완료된 일봉 종가가 90일 전 종가보다 높으면 long, 아니면 flat입니다.",
  },
  {
    id: "S2",
    regime: "TREND_DOWN",
    strategy: "EMA 50/180",
    rule: "일봉 EMA50이 EMA180보다 높으면 long, 아니면 flat입니다. TREND_DOWN은 short 진입을 의미하지 않습니다.",
  },
  {
    id: "S3",
    regime: "NORMAL_VOL__TRANSITION",
    strategy: "RSI2 + EMA200",
    rule: "EMA200 위에서 RSI2가 10 미만이면 long state에 진입하고, EMA200 이하 또는 RSI2 70 초과 시 flat으로 전환합니다.",
  },
] as const;

const limitations = [
  "C4는 앞선 historical tournament 결과를 확인한 뒤 선택되었기 때문에 독립적인 OOS 검증이 아닙니다.",
  "2022년부터 2026년 7월까지의 과거 데이터이며 2026년 마지막 구간은 partial period입니다.",
  "Transition side당 20bp에서는 frozen >50% positive-log-growth 기준상 year concentration이 다시 발생합니다.",
  "Bootstrap 빈도는 retrospective path diagnostic이지 미래 수익 확률이 아닙니다.",
  "레버리지, position sizing, stop-loss, take-profit, short, execution logic은 결과에 포함되지 않습니다.",
] as const;

export default function KoreanBtcRegimeChallengerPage() {
  return (
    <PageShell locale="ko">
      <PageHero
        accent="cyan"
        eyebrow="BTC systematic research · Post-selection historical challenger"
        title="C4: 세 개의 선택적 국면 sleeve를 결합한 long/flat challenger"
        intro="TREND_UP에서는 Momentum90, TREND_DOWN에서는 EMA 50/180, NORMAL_VOL__TRANSITION에서는 EMA200-filtered RSI2 reversal state를 사용하고 나머지 구간은 flat입니다."
        actions={
          <>
            <CtaLink href="/projects/btc-final-system" kind="primary">Retained BTC baseline 보기</CtaLink>
            <CtaLink href="/ko/research">연구 방법론 보기</CtaLink>
          </>
        }
        metadata={[
          { label: "과거 기간", value: "2022-01-01 ~ 2026-07-30 partial" },
          { label: "Primary cost", value: "Transition side당 5bp" },
          { label: "Exposure", value: "Long / flat only" },
          { label: "Evidence", value: "Post-selection historical stress audit" },
        ]}
      />

      <EditorialSection accent="cyan" eyebrow="핵심 결과" title="성과는 흥미롭지만, evidence label을 지우지 않습니다" intro="아래 수치는 frozen historical research result이며 실거래 또는 모의매매 track record가 아닙니다.">
        <EvidenceBand accent="cyan" items={[
          { label: "5bp return", value: "+182.29%" },
          { label: "5bp Sharpe", value: "1.100" },
          { label: "5bp MaxDD", value: "-25.25%" },
          { label: "완료 거래", value: "88" },
        ]} />
        <div className="mt-7 flex flex-wrap gap-2">
          <StatusLabel accent="cyan">Historical challenger</StatusLabel>
          <StatusLabel accent="amber">독립 OOS 아님</StatusLabel>
          <StatusLabel accent="blue">Execution 권한 없음</StatusLabel>
        </div>
      </EditorialSection>

      <EditorialSection accent="blue" eyebrow="전략 구조" title="세 sleeve는 시장 국면에 따라 상호 배타적으로 동작합니다" tone="deep">
        <div className="grid gap-4 lg:grid-cols-3">
          {sleeves.map((row) => (
            <article key={row.id} className="rounded-[1.6rem] border border-[#7E8B9D]/15 bg-[#0B0F16] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#67DFF7]">{row.id}</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#7F8DA3]">{row.regime}</span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.035em] text-[#F4F7FB]">{row.strategy}</h3>
              <p className="mt-4 text-sm leading-7 text-[#A8B3C2]">{row.rule}</p>
            </article>
          ))}
        </div>
        <p className="mt-7 max-w-4xl border-l-2 border-[#67DFF7]/45 pl-5 text-sm leading-7 text-[#8996A8]">C4는 S1, S2, S3의 union입니다. 예기치 않은 동시 eligibility는 fail closed 처리하고, 어떤 sleeve도 long을 내지 않으면 flat을 유지합니다.</p>
      </EditorialSection>

      <EditorialSection accent="amber" eyebrow="Cost stress" title="거래비용을 높이면 성과는 약해지지만 historical edge는 완전히 사라지지 않았습니다">
        <EvidenceBand items={[
          { label: "5bp return", value: "+182.29%" },
          { label: "10bp return", value: "+158.50%" },
          { label: "20bp return", value: "+116.72%" },
          { label: "20bp Sharpe", value: "0.850" },
        ]} />
        <p className="mt-6 max-w-4xl text-sm leading-7 text-[#657189]">20bp에서도 retained EMA 50/200 baseline보다 Sharpe가 높았지만, return·MDD·Calmar까지 동시에 우월하지는 않았습니다.</p>
      </EditorialSection>

      <EditorialSection accent="violet" eyebrow="Concentration" title="단일 대박 거래 의존도는 낮아졌지만 severe-cost concentration은 남아 있습니다" tone="deep">
        <EvidenceBand accent="blue" items={[
          { label: "Largest trade share", value: "18.80%" },
          { label: "Largest year share", value: "47.50%" },
          { label: "Time long", value: "21.48%" },
          { label: "Transition sides", value: "176" },
        ]} />
      </EditorialSection>

      <EditorialSection accent="amber" eyebrow="한계" title="이 결과가 의미하지 않는 것">
        <ul className="grid gap-3 md:grid-cols-2">
          {limitations.map((item) => (
            <li key={item} className="rounded-2xl border border-[#7E8B9D]/15 bg-[#0B0F16] p-5 text-sm leading-7 text-[#A8B3C2]">{item}</li>
          ))}
        </ul>
      </EditorialSection>

      <CapabilityBand label="Methods demonstrated" items={[
        "Regime-conditioned strategy research",
        "Deterministic replay",
        "Transaction-cost stress",
        "Trade/year concentration diagnostics",
        "Leave-out robustness",
        "Block resampling",
      ]} />

      <EditorialSection accent="cyan" eyebrow="현재 상태" title="관찰할 가치가 있는 challenger이지, 거래 승인된 전략이 아닙니다" tone="deep">
        <div className="max-w-4xl">
          <p className="text-base leading-8 text-[#A8B3C2]">Frozen historical stress gate에서 formal survivor는 C1과 C4였습니다. C1은 concentration 측면이 더 깨끗하고, C4는 historical performance가 더 강합니다. 다음 의미 있는 증거는 과거 데이터에 필터를 더 붙이는 것이 아니라 두 정의를 고정한 채 새 데이터에서 관찰하는 것입니다.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => <ResearchTag key={tag}>{tag}</ResearchTag>)}
          </div>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
