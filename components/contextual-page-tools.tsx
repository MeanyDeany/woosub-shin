"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SectionDock, type SectionDockItem } from "@/components/section-dock";
import styles from "@/components/contextual-page-tools.module.css";

const BTC_PATH = "/projects/btc-futures-research";

const sections = [
  { id: "overview", label: "Overview", heading: "BTC Futures Research Assistant" },
  { id: "purpose", label: "Purpose", heading: "Evidence infrastructure, not a strategy layer" },
  { id: "lineage", label: "Lineage", heading: "Multi-asset research progression" },
  { id: "models", label: "Models", heading: "Baseline forecast models" },
  { id: "benchmarks", label: "Benchmarks", heading: "Prior benchmarks and challengers" },
  { id: "uncertainty", label: "Uncertainty", heading: "Monte Carlo variance uncertainty" },
  { id: "maturity", label: "Maturity", heading: "Evidence maturity" },
  { id: "evidence-pipeline", label: "Pipeline", heading: "Evidence Pipeline Explorer" },
  { id: "failure-modes", label: "Failures", heading: "Failure Mode Atlas" },
  { id: "operations", label: "Operations", heading: "Operational scheduler" },
  { id: "engineering", label: "Engineering", heading: "What this project demonstrates" },
  { id: "boundaries", label: "Boundaries", heading: "Research boundaries" },
] as const satisfies readonly (SectionDockItem & { heading: string })[];

export function ContextualPageTools() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);

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

    setReady(true);

    return () => {
      if (document.documentElement.dataset.page === "btc-research") {
        document.documentElement.removeAttribute("data-page");
      }
    };
  }, [pathname]);

  if (pathname !== BTC_PATH || !ready) return null;

  return (
    <div className={styles.root}>
      <SectionDock items={sections} />
    </div>
  );
}
