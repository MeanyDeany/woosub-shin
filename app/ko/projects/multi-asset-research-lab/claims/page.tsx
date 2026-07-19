import type { Metadata } from "next";
import { KoreanClaimsPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "연구 주장 장부",
  description: "검증된 capability, 진행 중인 작업, 주장하지 않는 결과, 명시적으로 미승인된 거래 상태를 분리한 한국어 공개 장부.",
  alternates: {
    canonical: "/ko/projects/multi-asset-research-lab/claims",
    languages: {
      en: "/projects/multi-asset-research-lab/claims",
      ko: "/ko/projects/multi-asset-research-lab/claims",
    },
  },
};

export default KoreanClaimsPage;
