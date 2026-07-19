import type { Metadata } from "next";
import { KoreanHomePage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "시스템 트레이딩 연구 인프라",
  description: "원시 시장 데이터를 검증된 dataset, 재현 가능한 experiment, 감사 가능한 연구 결과로 바꾸는 정량 연구 인프라.",
  alternates: {
    canonical: "/ko",
    languages: { en: "/", ko: "/ko" },
  },
};

export default KoreanHomePage;
