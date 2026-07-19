import type { Metadata } from "next";
import { KoreanProjectsPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "연구 시스템",
  description: "멀티애셋 연구소, BTC freezer validation, 변동성 국면 필터링, GSADF 연구를 연결한 한국어 연구 시스템 목록.",
  alternates: {
    canonical: "/ko/projects",
    languages: { en: "/projects", ko: "/ko/projects" },
  },
};

export default KoreanProjectsPage;
