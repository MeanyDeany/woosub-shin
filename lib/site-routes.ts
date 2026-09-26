/** Canonical public pages for this English-only release; API routes are excluded. */
export const siteRoutes = [
  "/", "/asra", "/research", "/research/risk-forecasting", "/research/nonlinear-measurement",
  "/research/trader-behavior", "/research/microstructure", "/trading", "/papers", "/projects",
  "/projects/btc-final-system", "/projects/btc-futures-research", "/projects/btc-futures-research/live-position",
  "/projects/btc-regime-challenger", "/projects/multi-asset-research-lab", "/projects/multi-asset-research-lab/claims",
  "/projects/volatility-regime-filtering", "/projects/bitcoin-bubble-gsadf", "/resume", "/contact", "/build-log",
] as const;
export type SiteRoute = (typeof siteRoutes)[number];
/** Compatibility type for existing form/telemetry props; public pages render English. */
export type SiteLocale = "en" | "ko";
export function getRouteAlternates(pathname: SiteRoute) { return { canonical: pathname }; }
type NavigationLink = { href: SiteRoute; label: string };
export const primaryNavigation: readonly NavigationLink[] = [
  { href: "/trading", label: "Trading" },
  { href: "/research", label: "Research" },
  { href: "/papers", label: "Papers" },
  { href: "/projects", label: "Systems" },
  { href: "/resume", label: "About" },
];
