export { primaryNavigation as navigation, primaryNavigationKo as navigationKo } from "@/lib/site-routes";

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
  { label: "Historical retained BTC research systems", value: "1" },
  { label: "Frozen final-system candidate", value: "Daily EMA 50/200 long/flat" },
  { label: "Retrospective FULL return", value: "+165.92%" },
  { label: "Retrospective FULL Sharpe", value: "0.769" },
  { label: "Retrospective FULL MaxDD", value: "-29.37%" },
  { label: "Forward research activation", value: "22 Aug 2026" },
  { label: "Recorded forward handoff", value: "Append-only research observation" },
  { label: "Execution integration", value: "NOT INCLUDED" },
] as const;

export const demonstratedCapabilities = [
  "Statistical volatility model implementation",
  "Deterministic research pipelines",
  "Anti-lookahead validation",
  "Immutable and append-only event design",
  "Data provenance and content hashing",
  "Deterministic strategy replay and funding-adjusted PnL accounting",
  "Frozen candidate search and deep-validation gates",
  "Persistent strategy-state checkpointing and historical-to-forward handoff",
  "Failure-state handling and operational health monitoring",
  "Separation of research evidence from execution authority",
  "Production-style research operations on constrained infrastructure",
] as const;

export const boundaryItems = [
  "Research-only system",
  "No live trading in the research runtime",
  "No paper trading approval",
  "No Binance execution in the research runtime",
  "No broker integration",
  "No order routing",
  "No entry permission",
  "No short permission",
  "No leverage",
  "No position sizing",
  "No automatic veto rule",
  "Research state is not entry permission",
  "A retained strategy is not execution approval",
  "Historical performance is not a live track record",
  "Forward observation is not trading permission",
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
    title: "Historical-to-forward handoff",
    summary:
      "A frozen strategy should enter prospective observation through an explicit activation boundary so bootstrap context cannot be relabeled as forward evidence.",
  },
];