import type { Metadata } from "next";
import { KoreanPapersPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "논문",
  description: "EGARCH 기반 선물시장 변동성 국면 필터링 석사 논문과 GSADF 기반 비트코인 버블 진단 세미나 페이퍼의 한국어 안내.",
  alternates: {
    canonical: "/ko/papers",
    languages: { en: "/papers", ko: "/ko/papers" },
  },
};

export default KoreanPapersPage;
