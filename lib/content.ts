export const navigation = [
  { href: "/", label: "Home" },
  {
    href: "/projects",
    label: "Systems",
    children: [
      { href: "/projects", label: "All systems", detail: "Research systems and academic lineage" },
      { href: "/projects/multi-asset-research-lab", label: "Multi-Asset Research Lab", detail: "Asset-neutral contracts and verifiable research infrastructure" },
      { href: "/projects/btc-futures-research", label: "BTC Futures Research System", detail: "Freezer validation and volatility evidence" },
      { href: "/projects/volatility-regime-filtering", label: "Volatility Regime Filtering", detail: "NQ, ES, and Crude Oil (CL) econometrics" },
      { href: "/projects/bitcoin-bubble-gsadf", label: "Bitcoin Bubble Detection", detail: "GSADF time-series diagnostics" },
    ],
  },
  {
    href: "/papers",
    label: "Papers",
    children: [
      { href: "/papers", label: "Publication archive", detail: "Original papers and project context" },
      { href: "/papers/volatility-regime-filtering-thesis.pdf", label: "MSc thesis", detail: "Volatility regime filtering in futures" },
      { href: "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf", label: "Seminar paper", detail: "Bitcoin bubble detection with GSADF" },
    ],
  },
  {
    href: "/research",
    label: "Method",
    children: [
      { href: "/research", label: "Research methodology", detail: "Time, validation, provenance, and boundaries" },
      { href: "/build-log", label: "Build log", detail: "Verified milestones, changes, and remaining limits" },
      { href: "/projects/multi-asset-research-lab/claims", label: "Claims ledger", detail: "Public claims matched to evidence and boundaries" },
      { href: "/projects/multi-asset-research-lab#architecture", label: "Lab architecture", detail: "Contracts, evidence, and verification layers" },
      { href: "/projects/btc-futures-research#evidence-pipeline", label: "BTC evidence pipeline", detail: "Follow the freezer evidence chain" },
      { href: "/projects/multi-asset-research-lab#boundaries", label: "Research boundaries", detail: "What the systems cannot authorize" },
    ],
  },
  { href: "/contact", label: "Contact" },
] as const;

export const navigationKo = [
  { href: "/ko", label: "홈" },
  {
    href: "/ko/projects",
    label: "시스템",
    children: [
      { href: "/ko/projects", label: "전체 시스템", detail: "연구 시스템과 학술 연구의 연결" },
      { href: "/ko/projects/multi-asset-research-lab", label: "멀티애셋 연구소", detail: "자산 중립 계약과 검증 가능한 연구 인프라" },
      { href: "/ko/projects/btc-futures-research", label: "BTC 선물 연구 시스템", detail: "Freezer 검증과 변동성 증거" },
      { href: "/ko/projects/volatility-regime-filtering", label: "변동성 국면 필터링", detail: "NQ·ES·원유 선물 금융계량 연구" },
      { href: "/ko/projects/bitcoin-bubble-gsadf", label: "비트코인 버블 탐지", detail: "GSADF 시계열 진단" },
    ],
  },
  {
    href: "/ko/papers",
    label: "논문",
    children: [
      { href: "/ko/papers", label: "논문 목록", detail: "원문 PDF와 프로젝트 설명" },
      { href: "/papers/volatility-regime-filtering-thesis.pdf", label: "석사 논문 원문", detail: "선물시장 변동성 국면 필터링" },
      { href: "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf", label: "세미나 페이퍼 원문", detail: "GSADF 기반 비트코인 버블 탐지" },
    ],
  },
  {
    href: "/ko/research",
    label: "방법론",
    children: [
      { href: "/ko/research", label: "연구 방법론", detail: "시간 정합성·검증·출처·경계" },
      { href: "/ko/build-log", label: "빌드 로그", detail: "검증된 이정표와 남아 있는 한계" },
      { href: "/ko/projects/multi-asset-research-lab/claims", label: "주장 장부", detail: "공개 주장과 증거·경계의 대응" },
      { href: "/ko/projects/multi-asset-research-lab#architecture", label: "연구소 구조", detail: "계약·증거·검증 계층" },
      { href: "/ko/projects/btc-futures-research#evidence-pipeline", label: "BTC 증거 파이프라인", detail: "Freezer 증거 흐름" },
      { href: "/ko/projects/multi-asset-research-lab#boundaries", label: "연구 경계", detail: "시스템이 허가할 수 없는 것" },
    ],
  },
  { href: "/ko/contact", label: "연락" },
] as const;

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
