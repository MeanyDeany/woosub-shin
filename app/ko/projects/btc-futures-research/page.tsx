import type { Metadata } from "next";
import { KoreanBtcPage } from "@/components/korean-pages";

export const metadata: Metadata = {
  title: "BTC 선물 연구 시스템",
  description: "BTCUSDT 변동성 forecast, forward outcome, provenance, 운영 무결성을 축적하는 연구 전용 freezer validation 시스템.",
  alternates: {
    canonical: "/ko/projects/btc-futures-research",
    languages: {
      en: "/projects/btc-futures-research",
      ko: "/ko/projects/btc-futures-research",
    },
  },
};

export default KoreanBtcPage;
