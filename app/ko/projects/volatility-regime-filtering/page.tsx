import type { Metadata } from "next";
import { KoreanVolatilityPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "선물시장 변동성 국면 필터링",
  description: "EGARCH를 방향 예측기가 아니라 NQ·ES·Crude Oil intraday 연구의 risk와 admissibility 계층으로 평가한 석사 논문.",
  alternates: {
    canonical: "/ko/projects/volatility-regime-filtering",
    languages: {
      en: "/projects/volatility-regime-filtering",
      ko: "/ko/projects/volatility-regime-filtering",
    },
  },
};

export default KoreanVolatilityPage;
