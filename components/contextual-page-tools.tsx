"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { SiteLocale } from "@/components/language-switcher";
import "@/components/contextual-page-tools.module.css";

const BTC_PATH = "/projects/btc-futures-research";
const LAB_PATH = "/projects/multi-asset-research-lab";
const KO_BTC_PATH = "/ko/projects/btc-futures-research";
const KO_LAB_PATH = "/ko/projects/multi-asset-research-lab";

const labSections = [
  { href: "#proof", label: "Failures", primary: false },
  { href: "#roadmap", label: "Roadmap", primary: false },
  { href: "/projects/multi-asset-research-lab/claims", label: "Claims", primary: false },
  { href: "#faq", label: "FAQ", primary: true },
] as const;

const labSectionsKo = [
  { href: "#proof", label: "실패 사례", primary: false },
  { href: "#roadmap", label: "로드맵", primary: false },
  { href: "/ko/projects/multi-asset-research-lab/claims", label: "주장 장부", primary: false },
  { href: "#faq", label: "질문", primary: true },
] as const;

export function ContextualPageTools({ locale = "en" }: { locale?: SiteLocale }) {
  const pathname = usePathname();
  const korean = locale === "ko";
  const btcPath = korean ? KO_BTC_PATH : BTC_PATH;
  const labPath = korean ? KO_LAB_PATH : LAB_PATH;
  const sections = korean ? labSectionsKo : labSections;

  useEffect(() => {
    if (pathname !== btcPath) {
      document.documentElement.removeAttribute("data-page");
      return;
    }

    document.documentElement.dataset.page = "btc-research";

    return () => {
      if (document.documentElement.dataset.page === "btc-research") {
        document.documentElement.removeAttribute("data-page");
      }
    };
  }, [btcPath, pathname]);

  if (pathname !== labPath) return null;

  return (
    <nav
      aria-label={korean ? "멀티애셋 연구소 페이지 구역" : "Multi-Asset Research Lab page sections"}
      className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-[#7187AB]/25 bg-white/90 p-1.5 shadow-[0_16px_50px_rgba(36,50,74,0.22)] backdrop-blur-2xl"
    >
      {sections.map((section) => (
        <a
          key={section.href}
          href={section.href}
          className={
            section.primary
              ? "inline-flex min-h-9 shrink-0 items-center rounded-full bg-[#17243D] px-4 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#22375B]"
              : "inline-flex min-h-9 shrink-0 items-center rounded-full px-4 text-xs font-semibold text-[#4C5A70] transition-colors hover:bg-[#E9F2FF] hover:text-[#176FC1]"
          }
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
