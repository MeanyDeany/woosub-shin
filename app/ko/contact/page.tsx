import type { Metadata } from "next";
import { KoreanContactPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "연락",
  description: "정량 연구, 금융계량경제학, 시장 데이터 검증, 재현 가능한 연구 시스템에 관한 기술·학술·전문 문의.",
  alternates: {
    canonical: "/ko/contact",
    languages: { en: "/contact", ko: "/ko/contact" },
  },
};

export default KoreanContactPage;
