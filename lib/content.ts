export const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/papers", label: "Papers" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export type ArchitectureStage = {
  title: string;
  description: string;
  details: readonly string[];
};

export const architectureStages: readonly ArchitectureStage[] = [
  {
    title: "Market Data",
    description: "A factual, completed-candle source for downstream research.",
    details: [
      "BTCUSDT 5-minute OHLCV",
      "Local SQLite source",
      "Exact completed-candle handling",
      "Read-only research access where applicable",
    ],
  },
  {
    title: "Hourly Input Construction",
    description: "Deterministic inputs aligned to exact UTC research windows.",
    details: [
      "Exact completed UTC hourly inputs",
      "No interpolation or forward fill",
      "No tolerance joins",
      "Factual source hashes",
    ],
  },
  {
    title: "Daily Model Fits",
    description: "Four independent statistical volatility specifications.",
    details: [
      "GARCH(1,1) Student-t",
      "EGARCH(1,1) Student-t",
      "GJR-GARCH(1,1) Student-t",
      "HAR-RV",
    ],
  },
  {
    title: "Hourly Forecast States",
    description: "Raw next-hour variance evidence without policy interpretation.",
    details: [
      "Decimal variance and volatility forecasts",
      "No annualization or 10,000 scaling",
      "No regime or direction interpretation",
      "No entry, veto, or permission interpretation",
    ],
  },
  {
    title: "Forward Outcome Validation",
    description: "Factual outcomes calculated only after the forecast horizon closes.",
    details: [
      "Next completed one-hour window",
      "One exact anchor 5-minute candle and twelve exact future 5-minute candles",
      "Realized variance from decimal log returns",
      "Forecast error, realized volatility, and QLIKE loss",
    ],
  },
  {
    title: "Health and Integrity Monitoring",
    description: "Operational checks for the evidence pipeline and its ledgers.",
    details: [
      "Scheduler, source, fit, state, and outcome health",
      "Semantic duplicate and orphan-reference detection",
      "Fit/state mismatch detection",
      "Latest four-model outcome coverage",
    ],
  },
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

export const ledgerProperties = [
  "Append-only records",
  "Deterministic event identities",
  "Deterministic content hashes",
  "Exact source provenance",
  "Fit/state referential integrity",
  "Semantic fit-slot protection",
  "Orphan-reference blocking",
  "Fit/state mismatch blocking",
  "Semantic duplicate blocking",
  "Conflicting factual content blocking",
  "Immutable historical evidence",
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
  "No manual fit execution",
  "No manual state execution",
  "No manual forward-outcome append",
] as const;

export const operationalSnapshot = [
  { label: "Shadow models", value: "4" },
  { label: "Scheduled jobs", value: "7" },
  { label: "Ledger blockers at initial validation", value: "0" },
  { label: "Semantic duplicates at initial validation", value: "0" },
  { label: "Initial forward outcome rows", value: "8" },
  { label: "Outcome maturity", value: "BOOTSTRAP" },
  { label: "Production execution", value: "DISABLED" },
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
