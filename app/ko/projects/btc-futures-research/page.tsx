import type { Metadata } from "next";
import { BtcResearchObservatory } from "@/components/btc-research-observatory";
import {
  CtaLink,
  EditorialSection,
  EvidenceBand,
  PageHero,
  ResearchTag,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "BTC 선물 연구 시스템",
  description:
    "BTCUSDT 변동성 forecast, forward outcome, provenance, 운영 무결성을 축적하는 연구 전용 freezer validation 시스템.",
  alternates: {
    canonical: "/ko/projects/btc-futures-research",
    languages: {
      en: "/projects/btc-futures-research",
      ko: "/ko/projects/btc-futures-research",
    },
  },
};

export default function KoreanBtcResearchPage() {
  const observatoryFeedUrl = process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL;
  const chartingLibraryPath = process.env.NEXT_PUBLIC_TRADINGVIEW_CHARTING_LIBRARY_PATH;

  return (
    <PageShell locale="ko">
      <PageHero
        accent="emerald"
        eyebrow="BTCUSDT · Freezer validation"
        title="BTC 선물 연구 시스템"
        intro="변동성 forecast, forward outcome, provenance, operational integrity를 축적하는 연구 전용 시스템이다. 진입 신호나 자동매매 엔진이 아니다."
        actions={
          <>
            <CtaLink href="#observatory" kind="primary">
              연구 Observatory 보기
            </CtaLink>
            <CtaLink href="/projects/btc-futures-research">
              영문 전체 상세 보기
            </CtaLink>
          </>
        }
        metadata={[
          { label: "현재 자산", value: "BTCUSDT 5분봉" },
          { label: "모델", value: "GARCH · EGARCH · GJR · HAR-RV" },
          { label: "상태", value: "Freezer forward validation" },
          { label: "실행 연동", value: "없음" },
        ]}
      />

      <EditorialSection
        id="observatory"
        accent="cyan"
        eyebrow="서버 원본 시각화"
        title="BTC Research Observatory"
        intro="완료된 BTCUSDT 봉과 설명 목적의 연구 상태 전환을 sanitized server bundle에서 그대로 표시한다. 웹사이트는 상태를 다시 계산하지 않으며 전략·허가·실행 필드를 받지 않는다."
        tone="deep"
      >
        <BtcResearchObservatory
          feedUrl={observatoryFeedUrl}
          chartingLibraryPath={chartingLibraryPath}
          locale="ko"
        />
      </EditorialSection>

      <EditorialSection
        id="evidence-pipeline"
        eyebrow="증거 파이프라인"
        title="예측과 결과와 운영 상태를 분리해 기록한다"
        intro="각 ledger는 append-only evidence와 source identity를 보존하며, 모델 출력이 자동으로 policy나 entry permission으로 변하지 못하게 한다."
      >
        <EvidenceBand
          accent="emerald"
          items={[
            { label: "Fit", value: "고정 시점의 모델 specification과 parameter" },
            { label: "State", value: "예측 당시의 변동성 evidence" },
            { label: "Outcome", value: "시간이 지난 뒤 관측된 factual result" },
            { label: "Integrity", value: "중복·stale·lock·schedule 상태" },
          ]}
        />
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="모델 역할"
        title="변동성 context이지 방향 예측기가 아니다"
        tone="deep"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["GARCH(1,1)-t", "대칭적 조건부 분산 baseline"],
            ["EGARCH(1,1)-t", "비대칭 volatility response"],
            ["GJR-GARCH(1,1)-t", "Threshold asymmetry"],
            ["HAR-RV", "여러 horizon의 realized volatility 구조"],
          ].map(([name, detail]) => (
            <article key={name} className="glass-panel rounded-[1.75rem] p-6">
              <h3 className="text-xl font-semibold text-[#111A2E]">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#657189]">{detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="연구 경계"
        title="좋은 forecast도 매매 허가가 아니다"
        tone="warm"
      >
        <div className="flex flex-wrap gap-2">
          {[
            "Live trading 금지",
            "Paper approval 없음",
            "Binance execution 없음",
            "Entry permission 없음",
            "Short permission 없음",
            "Leverage sizing 없음",
            "Automatic veto 없음",
          ].map((item) => (
            <ResearchTag key={item}>{item}</ResearchTag>
          ))}
        </div>
      </EditorialSection>
    </PageShell>
  );
}
