import type { Metadata } from "next";
import { KoreanRecruiterProjectsPage } from "@/components/korean-projects-recruiter";

export const metadata: Metadata = {
  title: "프로젝트 | 신우섭",
  description:
    "시스템 트레이딩 연구, Multi-Asset Research Lab, BTC C4 selective-regime challenger, 금융계량경제학 연구를 연결한 신우섭의 프로젝트 포트폴리오.",
  alternates: {
    canonical: "/ko/projects",
    languages: { en: "/projects", ko: "/ko/projects" },
  },
};

export default KoreanRecruiterProjectsPage;
