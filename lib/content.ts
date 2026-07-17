export const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Systems" },
  { href: "/papers", label: "Papers" },
  { href: "/research", label: "Method" },
  { href: "/contact", label: "Contact" },
];

export const shadowModels = [
  {
    name: "GARCH(1,1)-t",
    description:
      "A symmetric conditional-variance model with Student-t innovations for heavy-tailed returns.",
  },
  {
    name: "EGARCH(1,1)-t",
    description:
      "A log-variance specification that represents asymmetric volatility responses without positivity constraints.",
  },
  {
    name: "GJR-GARCH(1,1)-t",
    description:
      "A threshold model that allows negative and positive return shocks to affect variance differently.",
  },
  {
    name: "HAR-RV",
    description:
      "A heterogeneous autoregressive model built from realized-volatility components across multiple horizons.",
  },
] as const;

export const schedulerJobs = [
  "Hourly GARCH-family state generation",
  "Hourly HAR-RV state generation",
  "Hourly forward outcome processing",
  "Daily GARCH-family fitting",
  "Daily HAR-RV fitting",
  "Hourly health validation",
  "Daily maturity review",
] as const;

export const schedulerControls = [
  "Staggered UTC scheduling",
  "Serialized scheduler execution",
  "Process locks and separate append locks",
  "Scheduler status and schedule-hash validation",
  "Automatic cron observation",
  "Production fit generation is scheduler-controlled",
  "Production state generation is scheduler-controlled",
  "Forward-outcome appends are scheduler-controlled",
  "Manual production appends are outside normal operating procedure",
] as const;

export const operationalSnapshot = [
  { label: "Shadow models at baseline", value: "4" },
  { label: "Scheduled jobs at baseline", value: "7" },
  { label: "Ledger blockers at initial validation", value: "0" },
  { label: "Semantic duplicates at initial validation", value: "0" },
  { label: "Initial forward outcome rows", value: "8" },
  { label: "Baseline outcome maturity", value: "BOOTSTRAP" },
  { label: "Execution integration", value: "NOT INCLUDED" },
] as const;

export const demonstratedCapabilities = [
  "Statistical volatility model implementation",
  "Deterministic research pipelines",
  "Anti-lookahead validation",
  "Immutable and append-only event design",
  "Data provenance and content hashing",
  "Scheduler, lock, and concurrency design",
  "Failure-state handling",
  "Operational health monitoring",
  "Separation of research evidence from execution",
  "Production-style research operations on constrained infrastructure",
] as const;

export const boundaryItems = [
  "Research-only system",
  "No live trading",
  "No paper trading approval",
  "No Binance execution",
  "No broker integration",
  "No order routing",
  "No entry permission",
  "No short permission",
  "No leverage",
  "No position sizing",
  "No automatic veto rule",
  "Policy state is not entry permission",
  "Model maturity is not strategy approval",
  "Lower forecast loss is not trading permission",
  "No investment advice",
] as const;

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
