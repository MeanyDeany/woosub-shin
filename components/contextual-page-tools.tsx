"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "@/components/contextual-page-tools.module.css";

const BTC_PATH = "/projects/btc-futures-research";
const LAB_PATH = "/projects/multi-asset-research-lab";

const labSections = [
  { href: "#architecture", label: "Architecture", primary: false },
  { href: "#boundaries", label: "Boundaries", primary: false },
  { href: "/projects/multi-asset-research-lab/claims", label: "Claims", primary: false },
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
      className="research-contextual-navigation"
    >
      {labSections.map((section) => (
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
