/** Public page paths only. API routes and unavailable translations are excluded. */
export const siteRoutes = [
  "/",
  "/astra",
  "/research",
  "/research/risk-forecasting",
  "/research/nonlinear-measurement",
  "/papers",
  "/projects",
  "/projects/btc-final-system",
  "/projects/btc-futures-research",
  "/projects/btc-futures-research/live-position",
  "/projects/btc-regime-challenger",
  "/projects/multi-asset-research-lab",
  "/projects/multi-asset-research-lab/claims",
  "/projects/volatility-regime-filtering",
  "/projects/bitcoin-bubble-gsadf",
  "/resume",
  "/contact",
  "/build-log",
  "/ko",
  "/ko/research",
  "/ko/papers",
  "/ko/projects",
  "/ko/projects/btc-futures-research",
  "/ko/projects/btc-futures-research/live-position",
  "/ko/projects/btc-regime-challenger",
  "/ko/projects/multi-asset-research-lab",
  "/ko/projects/multi-asset-research-lab/claims",
  "/ko/projects/volatility-regime-filtering",
  "/ko/projects/bitcoin-bubble-gsadf",
  "/ko/contact",
  "/ko/build-log",
] as const;

export type SiteRoute = (typeof siteRoutes)[number];
export type SiteLocale = "en" | "ko";

/** Only existing, reviewed counterpart pages belong in this registry. */
export const localeCounterpartPairs = [
  { en: "/", ko: "/ko" },
  { en: "/research", ko: "/ko/research" },
  { en: "/papers", ko: "/ko/papers" },
  { en: "/projects", ko: "/ko/projects" },
  { en: "/projects/btc-futures-research", ko: "/ko/projects/btc-futures-research" },
  { en: "/projects/btc-futures-research/live-position", ko: "/ko/projects/btc-futures-research/live-position" },
  { en: "/projects/btc-regime-challenger", ko: "/ko/projects/btc-regime-challenger" },
  { en: "/projects/multi-asset-research-lab", ko: "/ko/projects/multi-asset-research-lab" },
  { en: "/projects/multi-asset-research-lab/claims", ko: "/ko/projects/multi-asset-research-lab/claims" },
  { en: "/projects/volatility-regime-filtering", ko: "/ko/projects/volatility-regime-filtering" },
  { en: "/projects/bitcoin-bubble-gsadf", ko: "/ko/projects/bitcoin-bubble-gsadf" },
  { en: "/contact", ko: "/ko/contact" },
  { en: "/build-log", ko: "/ko/build-log" },
] as const satisfies readonly { en: SiteRoute; ko: SiteRoute }[];

export function getLocaleCounterpart(pathname: string): { href: SiteRoute; locale: SiteLocale } | null {
  const pair = localeCounterpartPairs.find(({ en, ko }) => pathname === en || pathname === ko);
  if (!pair) return null;
  return pathname === pair.en
    ? { href: pair.ko, locale: "ko" }
    : { href: pair.en, locale: "en" };
}

/** Suitable for static Metadata.alternates; no fabricated hreflang targets. */
export function getRouteAlternates(pathname: SiteRoute) {
  const pair = localeCounterpartPairs.find(({ en, ko }) => pathname === en || pathname === ko);
  return {
    canonical: pathname,
    languages: pair ? { en: pair.en, ko: pair.ko } : undefined,
  };
}


type NavigationLink = { href: SiteRoute; label: string; englishOnly?: boolean };

export const primaryNavigation: readonly NavigationLink[] = [
  { href: "/astra", label: "ASTRA" },
  { href: "/research", label: "Research" },
  { href: "/papers", label: "Papers" },
  { href: "/projects", label: "Systems" },
  { href: "/resume", label: "About" },
];

export const primaryNavigationKo: readonly NavigationLink[] = [
  { href: "/astra", label: "ASTRA", englishOnly: true },
  { href: "/ko/research", label: "연구" },
  { href: "/ko/papers", label: "논문" },
  { href: "/ko/projects", label: "시스템" },
  { href: "/resume", label: "소개", englishOnly: true },
];
