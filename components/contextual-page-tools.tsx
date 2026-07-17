"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "@/components/contextual-page-tools.module.css";

const BTC_PATH = "/projects/btc-futures-research";

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

  return null;
}
