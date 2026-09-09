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
  { href: "#architecture", label: "Architecture", primary: false },
  { href: "#boundaries", label: "Boundaries", primary: false },
  { href: "/projects/multi-asset-research-lab/claims", label: "Claims", primary: false },
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
      className="research-contextual-navigation"
    >
      {sections.map((section) => (
        <a
          key={section.href}
          href={section.href}
          className="research-contextual-navigation__link"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
