import {
  EditorialSection,
  EvidenceBand,
  PageHero,
  ProjectIndexRow,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

const projects = [
  {
    accent: "cyan" as const,
    contribution:
      "불변 contract, canonical evidence identity, deterministic replay/PnL, frozen search, validation, historical-to-forward boundary를 갖춘 자산 중립 연구 프레임워크입니다.",
    href: "/ko/projects/multi-asset-research-lab",
    index: "01",
    methods: ["Immutable contracts", "Replay / PnL", "Frozen search", "Deep validation", "Forward evidence"],
    question:
      "멀티애셋 systematic research framework가 data provenance에서 retained research system까지 이동하면서 evidence를 execution authority로 오해하지 않게 하려면 어떤 구조가 필요한가?",
    status: "대표 연구 플랫폼",
    title: "Multi-Asset Research Lab",
    type: "Research infrastructure",
  },
  {
    accent: "emerald" as const,
    contribution:
      "BTCUSDT Daily EMA 50/200 long/flat retained baseline으로 deterministic replay, funding-adjusted accounting, frozen search, deep validation, append-only prospective observation을 포함합니다.",
    href: "/projects/btc-final-system",
    index: "02",
    methods: ["Daily EMA 50/200", "Funding-adjusted PnL", "Cost stress", "Deep validation", "Forward runtime"],
    question:
      "단순한 BTC trend-following baseline이 frozen search와 deep validation을 통과한 뒤, research state를 trading permission으로 바꾸지 않고 prospective forward clock으로 넘어갈 수 있는가?",
    status: "Retained baseline · forward research",
    title: "BTC Final Research System V1",
    type: "Systematic strategy research",
  },
  {
    accent: "cyan" as const,
    contribution:
      "Momentum90, EMA 50/180, RSI2/EMA200 sleeve를 결합한 sparse BTC regime router의 post-selection historical stress audit입니다. 5bp 기준 +182.29%, Sharpe 1.100, 완료 거래 88건을 기록했습니다.",
    href: "/ko/projects/btc-regime-challenger",
    index: "03",
    methods: ["Regime conditioning", "Momentum90", "EMA 50/180", "RSI2 + EMA200", "20bp cost stress", "Block resampling"],
    question:
      "상호 배타적인 selective regime long/flat system이 cost sensitivity, concentration, post-selection bias를 숨기지 않으면서 historical risk-adjusted performance를 개선할 수 있는가?",
    status: "Historical challenger · 독립 OOS 아님",
    title: "BTC Selective Regime Challenger C4",
    type: "Systematic strategy research",
  },
  {
    accent: "blue" as const,
    contribution:
      "NQ, ES, Crude Oil (CL) futures를 대상으로 동일한 intraday logic에 EGARCH 조건부 변동성 layer를 추가해 risk/admissibility 기여를 비교한 학술 연구입니다.",
    href: "/ko/projects/volatility-regime-filtering",
    index: "04",
    methods: ["NQ", "ES", "Crude Oil (CL)", "EGARCH", "5-minute data", "Robustness"],
    question:
      "EGARCH를 direction predictor로 취급하지 않으면서 volatility-regime filtering이 intraday futures framework의 규율을 개선할 수 있는가?",
    status: "학술 기반",
    title: "Volatility Regime Filtering in Futures Markets",
    type: "Financial econometrics",
  },
  {
    accent: "amber" as const,
    contribution:
      "Right-tailed explosive-root diagnostic을 이용해 Bitcoin의 통계적 폭발 구간을 식별하고 해석한 시계열 연구입니다.",
    href: "/ko/projects/bitcoin-bubble-gsadf",
    index: "05",
    methods: ["Bitcoin", "GSADF", "Explosive roots", "Time series"],
    question:
      "GSADF 검정으로 통계적 폭발 구간을 식별하면서 diagnostic evidence를 시장 추천과 분리할 수 있는가?",
    status: "초기 시계열 연구",
    title: "Bitcoin Bubble Detection with GSADF",
    type: "Crypto-asset diagnostics",
  },
] as const;

export function KoreanRecruiterProjectsPage() {
  return (
    <PageShell locale="ko">
      <PageHero
        eyebrow="신우섭 · Selected work"
        title="Systematic research, research infrastructure, 금융계량경제학"
        intro="플랫폼 엔지니어링, retained baseline, post-selection challenger, 학술 연구를 분리해 각 결과가 실제로 획득한 evidence label을 그대로 유지합니다."
        metadata={[
          { label: "대표 플랫폼", value: "Multi-Asset Research Lab" },
          { label: "Retained baseline", value: "BTC Final Research System V1" },
          { label: "현재 challenger", value: "BTC C4 selective-regime system" },
          { label: "핵심 경계", value: "Research evidence ≠ execution authority" },
        ]}
      />

      <EditorialSection
        eyebrow="연구 프로그램"
        title="하나의 연구 프로그램, 다섯 개의 계층"
        intro="각 프로젝트는 provenance, 연구 질문, 방법론, 결과 범위, 한계를 분리합니다. 높은 historical performance도 selection, validation, prospective evidence의 경계를 지우지 않습니다."
      >
        <div>
          {projects.map((project) => (
            <ProjectIndexRow key={project.href} {...project} />
          ))}
        </div>
      </EditorialSection>

      <EditorialSection accent="amber" eyebrow="공통 기준" title="모든 연구에 공통으로 적용하는 원칙" tone="deep">
        <EvidenceBand items={[
          { label: "시간", value: "정보가 실제로 알 수 있었던 시점에 맞춥니다." },
          { label: "모델", value: "모델의 역할을 strategy claim보다 좁게 유지합니다." },
          { label: "검증", value: "Search, stress test, prospective observation을 분리합니다." },
          { label: "증거", value: "Provenance, cost assumption, limitation을 결과와 함께 보존합니다." },
        ]} />
      </EditorialSection>
    </PageShell>
  );
}
