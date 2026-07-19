import type { Metadata } from "next";
import { KoreanResearchPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "연구 방법론",
  description: "시간 정합성, 좁은 모델 역할, robustness, provenance, 운영 무결성, evidence와 execution 분리를 설명하는 한국어 방법론.",
  alternates: {
    canonical: "/ko/research",
    languages: { en: "/research", ko: "/ko/research" },
  },
};

export default KoreanResearchPage;
