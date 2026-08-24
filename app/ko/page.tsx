import type { Metadata } from "next";
import { KoreanRecruiterHome } from "@/components/korean-recruiter-home";

export const metadata: Metadata = {
  title: "신우섭 | 퀀트 리서치 · 시스템 트레이딩",
  description:
    "금융계량경제학, 시스템 트레이딩 연구, deterministic backtesting, walk-forward validation, research engineering을 연결하는 신우섭의 포트폴리오.",
  alternates: {
    canonical: "/ko",
    languages: { en: "/", ko: "/ko" },
  },
};

export default KoreanRecruiterHome;
