import type { Metadata } from "next";
import { KoreanGsadfPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "GSADF 기반 비트코인 버블 탐지",
  description: "GSADF 검정으로 비트코인 가격의 통계적 폭발 구간을 진단한 시계열 연구의 한국어 설명.",
  alternates: {
    canonical: "/ko/projects/bitcoin-bubble-gsadf",
    languages: {
      en: "/projects/bitcoin-bubble-gsadf",
      ko: "/ko/projects/bitcoin-bubble-gsadf",
    },
  },
};

export default KoreanGsadfPage;
