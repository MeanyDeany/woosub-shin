"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "@/components/contextual-page-tools.module.css";

const BTC_PATH = "/projects/btc-futures-research";
const LAB_PATH = "/projects/multi-asset-research-lab";

const labSections = [
  { href: "#proof", label: "Failures" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ", primary: true },
] as const;

export function ContextualPageTools() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== BTC_PATH) {
      document.documentElement.removeAttribute("data-page");
      return;
    }

    document.documentElement.dataset.page = "btc-research";

    return () => {
      if (document.documentElement.dataset.page === "btc-research") {
        document.documentElement.removeAttribute("data-page");
      }
    };
  }, [pathname]);

  if (pathname !== LAB_PATH) return null;

  return (
    <nav
      aria-label="Multi-Asset Research Lab page sections"
      className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-[#7187AB]/25 bg-white/90 p-1.5 shadow-[0_16px_50px_rgba(36,50,74,0.22)] backdrop-blur-2xl"
    >
      {labSections.map((section) => (
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
