"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "@/components/contextual-page-tools.module.css";

const BTC_PATH = "/projects/btc-futures-research";

const sections = [
  { id: "overview", heading: "BTC Futures Research Assistant" },
  { id: "purpose", heading: "Evidence infrastructure, not a strategy layer" },
  { id: "lineage", heading: "Multi-asset research progression" },
  { id: "models", heading: "Baseline forecast models" },
  { id: "benchmarks", heading: "Prior benchmarks and challengers" },
  { id: "uncertainty", heading: "Monte Carlo variance uncertainty" },
  { id: "maturity", heading: "Evidence maturity" },
  { id: "evidence-pipeline", heading: "Evidence Pipeline Explorer" },
  { id: "failure-modes", heading: "Failure Mode Atlas" },
  { id: "operations", heading: "Operational scheduler" },
  { id: "engineering", heading: "What this project demonstrates" },
  { id: "boundaries", heading: "Research boundaries" },
] as const;

export function ContextualPageTools() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== BTC_PATH) {
      document.documentElement.removeAttribute("data-page");
      return;
    }

    document.documentElement.dataset.page = "btc-research";

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("#main-content h1, #main-content h2"),
    );

    sections.forEach((item) => {
      const heading = headings.find(
        (candidate) => candidate.textContent?.trim() === item.heading,
      );
      const section = heading?.closest<HTMLElement>("section");
      if (section) section.id = item.id;
    });

    return () => {
      if (document.documentElement.dataset.page === "btc-research") {
        document.documentElement.removeAttribute("data-page");
      }
    };
  }, [pathname]);

  return null;
}
