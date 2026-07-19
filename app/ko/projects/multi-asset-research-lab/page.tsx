import type { Metadata } from "next";
import { KoreanLabPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "멀티애셋 연구소",
  description: "데이터 identity, provenance, 재현성, 실패 경계를 거래 실행과 분리해 검증하는 시스템 트레이딩 연구 인프라.",
  alternates: {
    canonical: "/ko/projects/multi-asset-research-lab",
    languages: {
      en: "/projects/multi-asset-research-lab",
      ko: "/ko/projects/multi-asset-research-lab",
    },
  },
};

export default KoreanLabPage;
