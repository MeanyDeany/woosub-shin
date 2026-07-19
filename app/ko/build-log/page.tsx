import type { Metadata } from "next";
import { KoreanBuildLogPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "빌드 로그",
  description: "연구 시스템에서 완료된 capability, 근거, 남아 있는 경계를 기록한 한국어 engineering log.",
  alternates: {
    canonical: "/ko/build-log",
    languages: { en: "/build-log", ko: "/ko/build-log" },
  },
};

export default KoreanBuildLogPage;
