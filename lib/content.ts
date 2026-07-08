export const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/papers", label: "Papers" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export const boundaryItems = [
  "This project is research-only.",
  "No live trading.",
  "No paper trading approval.",
  "No Binance execution.",
  "No entry permission.",
  "No short permission.",
  "No leverage sizing.",
  "No veto rule.",
  "No investment advice.",
];

export const architectureItems = [
  {
    title: "Data Layer",
    detail: "BTCUSDT OHLCV, funding, open interest",
  },
  {
    title: "Feature Layer",
    detail: "EMA, RSI, ATR, realized volatility, V2 candidate flags",
  },
  {
    title: "Validation Layer",
    detail: "forward validation, diagnostic review, RV48 risk audit, cluster audit",
  },
  {
    title: "Ops Layer",
    detail: "cron automation, flock locks, health checks, CPU/memory/disk monitoring",
  },
];

export const healthSnapshot = [
  { label: "overall_status", value: "PASS" },
  { label: "WATCH", value: "0" },
  { label: "FAIL", value: "0" },
  { label: "cron", value: "staggered" },
  { label: "report cadence", value: "30 minutes" },
  { label: "CPU", value: "no high CPU process" },
  { label: "reboot required", value: "no" },
];

export const researchLessons = [
  "A candidate signal is not a trading rule.",
  "Sample size and cluster dominance matter.",
  "Forward validation must be separated from development.",
  "Operational reliability matters even in research systems.",
  "Automation should reduce emotional discretionary decisions, not amplify them.",
];

export const researchNotes = [
  {
    title: "State validation before strategy design",
    summary:
      "Historical replay should test whether states separate future return distributions before any entry or exit rule is considered.",
  },
  {
    title: "Volatility regimes as risk context",
    summary:
      "Regime labels are more useful when treated as context, stability evidence, and risk diagnostics rather than direct trading instructions.",
  },
  {
    title: "Operational monitoring for research systems",
    summary:
      "Cron cadence, duplicate protection, stale file detection, and process health matter because research conclusions depend on reliable data production.",
  },
];
