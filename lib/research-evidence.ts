/**
 * Reviewed portfolio content, frozen 2026-09-09.
 * Evidence describes a particular assessment; work state, outcome and authority
 * are independent dimensions. Missing research artifacts remain unavailable.
 */
export const evidenceClasses = [
  "INDEPENDENT", "DEVELOPMENT", "SYNTHETIC", "RETROSPECTIVE", "FORWARD OBSERVATION",
] as const;

export type EvidenceClass = (typeof evidenceClasses)[number];
export type WorkState = "completed" | "in_progress" | "proposed" | "blocked" | "invalidated";
export type ClaimOutcome = "confirmed" | "not_confirmed" | "supported_within_scope";
export type ResearchRecordId =
  | "independent-risk-forecast" | "policy-utility" | "risk-baseline-challenge"
  | "nonlinear-sensor-recovery" | "native-horizon-selection" | "daily-ema"
  | "futures-volatility-thesis" | "bitcoin-gsadf" | "c4-challenger"
  | "native-scheduler" | "turnover-decomposition" | "candidate-generator-v3";

export const evidenceClassLabels: Record<EvidenceClass, string> = {
  INDEPENDENT: "INDEPENDENT",
  DEVELOPMENT: "DEVELOPMENT",
  SYNTHETIC: "SYNTHETIC",
  RETROSPECTIVE: "RETROSPECTIVE",
  "FORWARD OBSERVATION": "FORWARD OBSERVATION",
};

export const evidenceClassDescriptions: Record<EvidenceClass, string> = {
  INDEPENDENT: "A frozen claim assessed separately from model and candidate development.",
  DEVELOPMENT: "Evidence used during hypothesis, model, baseline or specification development.",
  SYNTHETIC: "Generated data, positive controls or controlled methodological simulations.",
  RETROSPECTIVE: "Historical analysis with its selection and evaluation history disclosed separately.",
  "FORWARD OBSERVATION": "Observations accrued after a specified freeze or start under a recorded protocol.",
};

export const workStateLabels: Record<WorkState, string> = {
  completed: "COMPLETED", in_progress: "IN PROGRESS", proposed: "NEXT QUESTION",
  blocked: "BLOCKED", invalidated: "INVALIDATED",
};

export const workStateDescriptions: Record<WorkState, string> = {
  completed: "The study is finished; the claim outcome is stated separately.",
  in_progress: "The study is underway. No completed result is reported.",
  proposed: "A proposed follow-up question; no active-study or result claim.",
  blocked: "A specified objective cannot proceed under a documented binding constraint.",
  invalidated: "A particular interpretation lost support after a defined validity check failed.",
};

export type ResearchSource = {
  readonly label: string;
  readonly note: string;
} & (
  | { readonly availability: "public"; readonly href: string }
  | { readonly availability: "private_archive" | "unpublished"; readonly href?: never }
);

export type ResearchCode = {
  readonly label: string;
  readonly note: string;
  readonly commit?: string;
} & (
  | { readonly availability: "public"; readonly href: string }
  | { readonly availability: "unpublished"; readonly href?: never }
);

export type AssessmentWindow = {
  readonly label: string;
  readonly start?: string;
  readonly end?: string;
  readonly startInclusive?: boolean;
  readonly endInclusive?: boolean;
  readonly timezone: string | null;
};

export type AssessmentContext = {
  readonly id: string;
  readonly domain: string;
  readonly horizon: string | null;
  readonly comparison: string;
  readonly model: { readonly id: string | null; readonly label: string } | null;
  readonly baseline: { readonly id: string | null; readonly label: string } | null;
  readonly window: AssessmentWindow;
  readonly protocol: string;
};

export type ResearchMetric = {
  readonly id: string;
  readonly assessmentId: string;
  readonly value: string;
  readonly label: string;
  readonly unit: "percent" | "segments" | "ratio" | "trials" | "percentage_points" | "count";
  readonly interpretation: string;
  readonly priority: "primary" | "detail";
};

type ResearchRecordBase = {
  readonly id: ResearchRecordId;
  readonly version: string;
  readonly reviewedAt: "2026-09-09";
  readonly title: string;
  readonly shortTitle: string;
  readonly question: string;
  readonly evidenceClass: EvidenceClass | null;
  readonly role: string;
  readonly assessment: AssessmentContext;
  readonly method: string;
  readonly keyCaveat: string;
  readonly limitations: readonly string[];
  readonly authority: string;
  readonly source: ResearchSource;
  readonly code: ResearchCode;
  readonly lineage: readonly ResearchRecordId[];
  readonly nextQuestion: string;
  readonly followUpRecord?: ResearchRecordId;
  readonly detailHref: string;
};

export type CompletedResearchRecord = ResearchRecordBase & {
  readonly workState: "completed";
  readonly claimOutcome: ClaimOutcome;
  readonly outcomeLabel: string;
  readonly classification: string | null;
  readonly finding: string;
  readonly metrics: readonly ResearchMetric[];
  readonly observations: readonly string[];
};

type NonResultResearchRecord = ResearchRecordBase & {
  readonly scope: string;
  readonly finding?: never;
  readonly metrics?: never;
  readonly claimOutcome?: never;
  readonly outcomeLabel?: never;
  readonly classification?: never;
  readonly observations?: never;
};

export type OngoingResearchRecord = NonResultResearchRecord & { readonly workState: "in_progress" };
export type ProposedResearchRecord = NonResultResearchRecord & {
  readonly workState: "proposed";
  readonly evidenceClass: null;
};
export type ResearchRecord = CompletedResearchRecord | OngoingResearchRecord | ProposedResearchRecord;

export type ResearchMetricGroup = {
  readonly assessment: AssessmentContext;
  readonly evidenceClass: EvidenceClass | null;
  readonly metrics: readonly ResearchMetric[];
  readonly keyCaveat: string;
  readonly source: ResearchSource;
  readonly detailHref: string;
};

export const researchAuthority = "Research findings do not confer execution authority.";
export const riskInformationBoundary = "Risk information, not directional alpha, a trading signal, sizing approval or execution authority.";

const reviewedAt = "2026-09-09" as const;
const privateResearchSource: ResearchSource = {
  availability: "private_archive",
  label: "Reviewed research brief",
  note: "Research record maintained in the private research archive. The reviewed claims are reported here; a public report and manifest are not available.",
};
const unavailableCode: ResearchCode = {
  availability: "unpublished", label: "Research code not publicly available",
  note: "No verified public repository or immutable code link is available for this study.",
};
const unknownWindow: AssessmentWindow = {
  label: "Assessment dates and endpoint rules not supplied in the reviewed brief.", timezone: null,
};

export const independentAssessment: AssessmentContext = {
  id: "independent-risk-assessment-v1",
  domain: "BTC risk forecast", horizon: "1 hour",
  comparison: "H+C vs HAR-basis",
  model: { id: "H_PLUS_C", label: "H+C" },
  baseline: { id: "B4B_HAR_BASIS", label: "HAR-basis" },
  window: {
    label: "[2025-08-01, 2026-07-30) · end exclusive",
    start: "2025-08-01", end: "2026-07-30",
    startInclusive: true, endInclusive: false, timezone: null,
  },
  protocol: "Fixed model and strong baseline compared on a frozen independent assessment. Source dates do not establish intraday timezone semantics.",
};

export const policyAssessment: AssessmentContext = {
  id: "risk-policy-utility-v1",
  domain: "Frozen primary P3 policy evaluation", horizon: null,
  comparison: "Pooled H+C vs HAR policy result",
  model: { id: null, label: "H+C policy under frozen primary P3" },
  baseline: { id: null, label: "HAR policy under frozen primary P3" },
  window: {
    label: "Policy assessment window and era boundaries not supplied in the reviewed update.", timezone: null,
  },
  protocol: "Frozen primary P3 evaluated against the preregistered minimum and required multi-era consistency. Exact mapping and era definitions are not publicly available.",
};

const forecastMetrics: readonly ResearchMetric[] = [
  {
    id: "log-mse-improvement", assessmentId: independentAssessment.id, value: "+12.58%",
    label: "Log-MSE improvement", unit: "percent", priority: "primary",
    interpretation: "Lower forecast loss versus HAR-basis; this is not a return metric.",
  },
  {
    id: "qlike-improvement", assessmentId: independentAssessment.id, value: "+11.65%",
    label: "QLIKE improvement", unit: "percent", priority: "primary",
    interpretation: "Lower forecast loss versus HAR-basis; this is not a return metric.",
  },
  {
    id: "chronological-consistency", assessmentId: independentAssessment.id, value: "4 / 4",
    label: "Chronological segments positive in both primary losses", unit: "segments", priority: "primary",
    interpretation: "Consistency across four chronological segments, not four independent replications.",
  },
  {
    id: "variance-calibration", assessmentId: independentAssessment.id, value: "≈0.9963",
    label: "Actual / forecast variance", unit: "ratio", priority: "detail",
    interpretation: "Calibration evidence at the reported aggregation level; not proof of perfect conditional or tail calibration.",
  },
];

const policyMetrics: readonly ResearchMetric[] = [
  {
    id: "policy-volatility-improvement", assessmentId: policyAssessment.id, value: "2.070%",
    label: "Pooled volatility improvement", unit: "percent", priority: "primary",
    interpretation: "Frozen P3 H+C versus HAR policy comparison; below the preregistered minimum.",
  },
  {
    id: "policy-es5-improvement", assessmentId: policyAssessment.id, value: "2.016%",
    label: "Pooled ES5 improvement", unit: "percent", priority: "primary",
    interpretation: "Frozen P3 H+C versus HAR policy comparison; below the preregistered minimum. No unsupplied metric formula is inferred.",
  },
  {
    id: "policy-minimum", assessmentId: policyAssessment.id, value: "3.0%",
    label: "Preregistered minimum", unit: "percent", priority: "primary",
    interpretation: "Required minimum for each primary pooled improvement; the multi-era consistency rule must also pass.",
  },
];

export const schedulerAssessment: AssessmentContext = {
  id: "native-scheduler-robustness-v1", domain: "Synthetic methodology research · primary 60bps setting",
  horizon: null,
  comparison: "S1 adaptive scheduler vs S2 fixed native-horizon selection; Forced reference",
  model: { id: "S1", label: "Adaptive scheduler" },
  baseline: { id: "S2", label: "Fixed native-horizon selection" },
  window: { label: "Completed registered synthetic experiment; calendar assessment dates not supplied.", timezone: null },
  protocol: "Registered trials with reported raw and adjusted detection, a conservative paired 95% interval, a prespecified meaningful-increment margin, null guards and presentation-order checks. The adjustment method is not supplied in the reviewed update.",
};

const schedulerMetrics: readonly ResearchMetric[] = [
  {
    id: "scheduler-adjusted-difference", assessmentId: schedulerAssessment.id, value: "−0.39 pp",
    label: "S1 − S2 adjusted detection difference", unit: "percentage_points", priority: "primary",
    interpretation: "Primary 60bps synthetic setting. The conservative paired interval excludes the meaningful positive-increment margin; this is not proof of exact equivalence.",
  },
  {
    id: "scheduler-meaningful-margin", assessmentId: schedulerAssessment.id, value: "+5 pp",
    label: "Prespecified meaningful-increment margin", unit: "percentage_points", priority: "primary",
    interpretation: "The upper bound of the conservative paired interval is below this meaningful adaptive-increment margin.",
  },
  {
    id: "scheduler-fixed-retention", assessmentId: schedulerAssessment.id, value: "97.93%",
    label: "S2 fixed-selection retention", unit: "percent", priority: "primary",
    interpretation: "Raw and adjusted detection retention relative to the Forced reference in the primary 60bps setting.",
  },
  {
    id: "scheduler-paired-interval", assessmentId: schedulerAssessment.id, value: "[−2.47, +1.69] pp",
    label: "Conservative paired 95% interval", unit: "percentage_points", priority: "detail",
    interpretation: "Interval for the S1 − S2 adjusted detection difference in the primary 60bps setting.",
  },
  {
    id: "scheduler-registered-trials", assessmentId: schedulerAssessment.id, value: "1,536",
    label: "Registered trials", unit: "trials", priority: "detail",
    interpretation: "Total registered trials across the supplied synthetic experiment.",
  },
  {
    id: "scheduler-trials-per-cell", assessmentId: schedulerAssessment.id, value: "256",
    label: "Trials per cell", unit: "trials", priority: "detail",
    interpretation: "Registered trials in each synthetic experiment cell.",
  },
  {
    id: "scheduler-forced-detection", assessmentId: schedulerAssessment.id, value: "242 / 256",
    label: "Forced detection · raw and adjusted", unit: "trials", priority: "detail",
    interpretation: "Forced reference detection in the primary 60bps setting; no additional mechanism is inferred from the supplied label.",
  },
  {
    id: "scheduler-adaptive-raw", assessmentId: schedulerAssessment.id, value: "237 / 256",
    label: "S1 adaptive detection · raw", unit: "trials", priority: "detail",
    interpretation: "Raw detection in the primary 60bps setting.",
  },
  {
    id: "scheduler-adaptive-adjusted", assessmentId: schedulerAssessment.id, value: "236 / 256",
    label: "S1 adaptive detection · adjusted", unit: "trials", priority: "detail",
    interpretation: "Reported adjusted detection in the primary 60bps setting; adjustment method not supplied.",
  },
  {
    id: "scheduler-fixed-detection", assessmentId: schedulerAssessment.id, value: "237 / 256",
    label: "S2 fixed selection · raw and adjusted", unit: "trials", priority: "detail",
    interpretation: "Fixed native-horizon selection detection in the primary 60bps setting.",
  },
  {
    id: "scheduler-undefined-tests", assessmentId: schedulerAssessment.id, value: "0",
    label: "Undefined primary tests", unit: "count", priority: "detail",
    interpretation: "No primary test was undefined in the registered experiment.",
  },
  {
    id: "scheduler-order-effects", assessmentId: schedulerAssessment.id, value: "0",
    label: "Scientific presentation-order effects", unit: "count", priority: "detail",
    interpretation: "No scientific presentation-order effect was reported in the registered checks.",
  },
];

export const researchEvidence = {
  independentRiskForecast: {
    id: "independent-risk-forecast", version: "V1", reviewedAt,
    title: "Independent Risk Forecast Confirmation", shortTitle: "Independent risk forecast",
    question: "Does contextual state improve one-hour BTC risk forecasts beyond a strong HAR-basis model?",
    evidenceClass: "INDEPENDENT", workState: "completed", role: "Independent assessment",
    classification: "INDEPENDENT_RISK_FORECAST_CONFIRMATION", claimOutcome: "confirmed", outcomeLabel: "RISK INFORMATION CONFIRMED",
    finding: "Context adds short-horizon BTC risk information beyond historical volatility persistence: H+C improves both primary losses against HAR-basis on the frozen independent assessment.",
    assessment: independentAssessment, metrics: forecastMetrics,
    method: "Independent comparison of the fixed H_PLUS_C model and B4B_HAR_BASIS baseline on the frozen assessment.",
    keyCaveat: riskInformationBoundary,
    limitations: [
      "The reported aggregate improvements do not supply confidence intervals, p-values, segment sample sizes or economic significance.",
      "Chronological segment consistency does not establish independent replication.",
      forecastMetrics[3].interpretation,
      "Forecast validation does not provide live trading permission or automatic veto authority.",
    ],
    observations: ["Calendar/liquidity structure, volatility compression and expansion, and shock normalization added information beyond the strong HAR-basis model within the frozen assessment."],
    authority: riskInformationBoundary, source: privateResearchSource, code: unavailableCode,
    lineage: ["risk-baseline-challenge"], followUpRecord: "policy-utility",
    nextQuestion: "Turnover & Opportunity-Cost Decomposition is a proposed follow-up after the completed policy translation test.",
    detailHref: "/research/risk-forecasting#independent-assessment",
  },
  policyUtility: {
    id: "policy-utility", version: "V1", reviewedAt,
    title: "ASTRA Risk Policy Utility V1", shortTitle: "Policy translation test",
    question: "Can the frozen primary P3 mapping turn stronger H+C risk information into policy utility under the preregistered rule?",
    evidenceClass: "RETROSPECTIVE", workState: "completed", role: "Policy translation test",
    classification: "FORECAST_INFORMATION_WITHOUT_POLICY_UTILITY", claimOutcome: "not_confirmed", outcomeLabel: "POLICY UTILITY NOT CONFIRMED",
    finding: "Forecast information survived; the preregistered policy-utility claim did not.",
    assessment: policyAssessment, metrics: policyMetrics,
    method: "Frozen primary P3 policy evaluation against the preregistered utility threshold and required multi-era consistency rule.",
    keyCaveat: "Better risk forecasts did not automatically become a better risk policy.",
    limitations: [
      "Both primary pooled improvements missed the preregistered minimum.",
      "Only CONFIRMED_FORECAST_ERA_DIAGNOSTIC passed the joint era rule; required multi-era consistency failed.",
      "The policy assessment has its own protocol. It does not inherit the forecast assessment window or independence label.",
      "Mechanism associations do not establish a completed causal decomposition or directional timing.",
    ],
    observations: [
      "H+C retains better realized-risk ranking than HAR.",
      "H+C has materially lower turnover than HAR; much of its relative fee-net return advantage is associated with lower turnover.",
      "Opportunity cost remains. Better ranking and lower turnover do not override the failed frozen P3 rule.",
    ],
    authority: "No directional-alpha, sizing, veto, execution or trading-authority claim follows from this policy evaluation.",
    source: { ...privateResearchSource, label: "Reviewed completed policy-study update" },
    code: {
      ...unavailableCode, commit: "3f5ebee1d3b002cd3f7f2d4ea65f72d6cf512cdd",
      note: "The supplied identifier is the completed policy-study branch head. A public repository or commit URL is not available.",
    },
    lineage: ["independent-risk-forecast"],
    nextQuestion: "How much of the observed policy tradeoff is associated with turnover, fees and foregone opportunity?",
    detailHref: "/research/risk-forecasting#policy-utility",
  },
  riskBaselineChallenge: {
    id: "risk-baseline-challenge", version: "reviewed-2026-09-09", reviewedAt,
    title: "Risk Baseline Challenge", shortTitle: "Risk baseline challenge",
    question: "Does the risk candidate survive comparison with a stronger volatility-persistence alternative?",
    evidenceClass: "DEVELOPMENT", workState: "completed", role: "Development comparison",
    classification: null, claimOutcome: "supported_within_scope", outcomeLabel: "DEVELOPMENT EVIDENCE SURVIVED",
    finding: "The risk candidate passed the strong-baseline challenge described in the reviewed research brief.",
    assessment: {
      id: "risk-baseline-challenge", domain: "Risk candidate development", horizon: null,
      comparison: "Risk candidate vs stronger volatility-persistence alternative; exact challenge baseline not supplied.",
      model: null, baseline: null, window: unknownWindow,
      protocol: "Development baseline comparison; its own report is required for the exact specification and window.",
    },
    metrics: [], method: "Challenge the candidate against a stronger baseline during development.",
    keyCaveat: "Passing a development comparison does not itself establish independent confirmation.",
    limitations: ["No numerical result, exact baseline specification or development assessment dates were supplied."], observations: [],
    authority: researchAuthority, source: privateResearchSource, code: unavailableCode,
    lineage: ["native-horizon-selection"], followUpRecord: "independent-risk-forecast",
    nextQuestion: "Would the fixed candidate survive a separate independent assessment? This follow-up has since completed.",
    detailHref: "/research/risk-forecasting#baseline-challenge",
  },
  nonlinearSensorRecovery: {
    id: "nonlinear-sensor-recovery", version: "reviewed-2026-09-09", reviewedAt,
    title: "Nonlinear Sensor Recovery", shortTitle: "Nonlinear sensor recovery",
    question: "Can the measurement system detect a controlled nonlinear signal?",
    evidenceClass: "SYNTHETIC", workState: "completed", role: "Sensor recovery",
    classification: null, claimOutcome: "supported_within_scope", outcomeLabel: "DETECTION RECOVERED IN CONTROLS",
    finding: "Positive controls exposed a measurement blind spot; a repaired nonlinear sensor recovered detection within the tested synthetic settings.",
    assessment: {
      id: "nonlinear-sensor-recovery", domain: "Synthetic positive controls", horizon: null,
      comparison: "Failed sensor/control setup vs repaired setup", model: null, baseline: null,
      window: { label: "Tested synthetic settings; exact experiment version not supplied.", timezone: null },
      protocol: "Positive-control diagnosis and sensor repair; exact generated-data settings require the source record.",
    },
    metrics: [], method: "Use positive controls to distinguish detection failure from absence of signal, then repair the sensor.",
    keyCaveat: "Recovery in synthetic controls does not establish historical BTC nonlinear alpha or market predictability.",
    limitations: ["Detection recovery is limited to the documented test settings. No real-market extension is established by this record."], observations: [],
    authority: researchAuthority, source: privateResearchSource, code: unavailableCode,
    lineage: [], followUpRecord: "native-horizon-selection",
    nextQuestion: "Does target alignment and selection repair recover power beyond the sensor repair?",
    detailHref: "/research/nonlinear-measurement#sensor-recovery",
  },
  nativeHorizonSelection: {
    id: "native-horizon-selection", version: "reviewed-2026-09-09", reviewedAt,
    title: "Native-Horizon Selection", shortTitle: "Native-horizon selection",
    question: "Does target alignment and selection repair recover detection power?",
    evidenceClass: null, workState: "completed", role: "Measurement repair",
    classification: null, claimOutcome: "supported_within_scope", outcomeLabel: "POWER RECOVERED IN THE REPORTED TESTS",
    finding: "Native-horizon target alignment and selection repair recovered methodological power in the supplied research progression.",
    assessment: {
      id: "native-horizon-selection", domain: "Target alignment and selection repair; test domain not supplied", horizon: null,
      comparison: "Previous vs repaired target and selection architecture", model: null, baseline: null,
      window: { label: "Test domain, experiment version and evidence class await source review.", timezone: null },
      protocol: "Native-horizon target/selection repair evaluation; exact protocol not supplied.",
    },
    metrics: [], method: "Align targets to their native horizons and repair selection separately from sensor detection.",
    keyCaveat: "Do not attribute repaired power specifically to adaptive scheduling. The completed repair's evidence class and test domain remain unresolved.",
    limitations: ["The separate synthetic scheduler study does not establish the data domain of this completed repair."], observations: [],
    authority: researchAuthority, source: privateResearchSource, code: unavailableCode,
    lineage: ["nonlinear-sensor-recovery"],
    nextQuestion: "Does adaptive question ordering add meaningful value beyond simpler fixed native-horizon selection? The separate scheduler test has since completed.",
    followUpRecord: "native-scheduler",
    detailHref: "/research/nonlinear-measurement#native-horizon-selection",
  },
  dailyEma: {
    id: "daily-ema", version: "V1", reviewedAt,
    title: "Daily EMA Long/Flat", shortTitle: "Daily EMA 50/200",
    question: "What survives the full research lifecycle for a low-turnover BTC system?",
    evidenceClass: "RETROSPECTIVE", workState: "completed", role: "RETAINED HISTORICAL SYSTEM",
    classification: null, claimOutcome: "supported_within_scope", outcomeLabel: "RETAINED HISTORICAL SYSTEM",
    finding: "Daily Dual EMA 50/200 is retained as a historical BTC long/flat research system spanning backtesting, cost stress and a separate forward-observation protocol.",
    assessment: {
      id: "daily-ema-historical-full", domain: "Historical BTCUSDT long/flat research", horizon: "Daily decision; next 5-minute open",
      comparison: "Exact-period BTC price-only buy-and-hold and funding-adjusted perpetual long references",
      model: { id: null, label: "Daily Dual EMA 50/200" }, baseline: null,
      window: { label: "FULL: 1 Jan 2022 through 30 Jul 2026; endpoint semantics follow the original study.", timezone: "UTC" },
      protocol: "Frozen backtest at 5bp per transition side with exact funding, cost stress, concentration analysis and separately identified forward observation.",
    },
    metrics: [], method: "Frozen low-turnover candidate search, deep validation, cost stress and concentration review.",
    keyCaveat: "3 completed historical trades; growth is concentrated, and selection used the historical sample. This is not the strongest current scientific result.",
    limitations: [
      "One long trend accounted for 97.4% of positive completed-trade log growth.",
      "The evidence is retrospective and post-selection, not untouched out-of-sample confirmation.",
      "Cost sensitivity remains; fixed friction excludes additional slippage and market impact.",
      "Forward observation is separate research-state evidence, not a live performance track record or trading permission.",
    ], observations: [], authority: researchAuthority,
    source: { availability: "public", label: "Retained historical-system study", href: "/projects/btc-final-system", note: "Public portfolio study; underlying research source and code are not publicly linked." },
    code: unavailableCode, lineage: [], nextQuestion: "What does continued observation show under the frozen protocol, without changing the historical rules?",
    detailHref: "/projects/btc-final-system",
  },
  futuresVolatilityThesis: {
    id: "futures-volatility-thesis", version: "MSc thesis", reviewedAt,
    title: "MSc Futures Volatility Thesis", shortTitle: "Futures volatility thesis",
    question: "Does volatility-regime filtering change an intraday futures strategy's behavior?",
    evidenceClass: "RETROSPECTIVE", workState: "completed", role: "MSc thesis",
    classification: null, claimOutcome: "supported_within_scope", outcomeLabel: "ACADEMIC EVIDENCE",
    finding: "The thesis reports useful EGARCH-conditioned risk and admissibility context in NQ, ES and WTI Crude Oil futures, examined through ablation and chronological evaluation.",
    assessment: {
      id: "futures-volatility-thesis", domain: "NQ, ES and WTI Crude Oil futures", horizon: "Daily volatility context; intraday evaluation",
      comparison: "EGARCH-filtered vs no-filter and alternative-filter configurations",
      model: { id: null, label: "EGARCH volatility-regime filter" }, baseline: { id: null, label: "No filter / alternative volatility filters" },
      window: { label: "2019–2025 evaluation; parameters selected using 2010–2018.", timezone: null },
      protocol: "Academic study with pre-evaluation parameter selection, ablation, walk-forward evaluation, bootstrap and robustness checks.",
    },
    metrics: [], method: "EGARCH volatility regimes, intraday research modules, no-filter ablation, alternative filters, walk-forward evaluation and bootstrap checks.",
    keyCaveat: "Academic evidence is bounded by the study's sample, methods and cost assumptions; it is not independent ASTRA confirmation.",
    limitations: ["Threshold choices, sample dependence and market differences limit transferability. The filter does not establish price direction."], observations: [],
    authority: researchAuthority,
    source: { availability: "public", label: "MSc thesis PDF", href: "/papers/volatility-regime-filtering-thesis.pdf", note: "Academic thesis with canonical project context; not presented as a peer-reviewed publication." },
    code: unavailableCode, lineage: [], nextQuestion: "How stable is the conditioning result across samples, markets and filter specifications? No active follow-up is claimed.",
    detailHref: "/projects/volatility-regime-filtering",
  },
  bitcoinGsadf: {
    id: "bitcoin-gsadf", version: "Seminar paper", reviewedAt,
    title: "Bitcoin Bubble GSADF", shortTitle: "Bitcoin bubble diagnostics",
    question: "Which historical Bitcoin episodes exhibit explosive-root behavior?",
    evidenceClass: "RETROSPECTIVE", workState: "completed", role: "Academic seminar paper",
    classification: null, claimOutcome: "supported_within_scope", outcomeLabel: "ACADEMIC DIAGNOSTIC",
    finding: "GSADF explosive-root diagnostics characterize historical Bitcoin price episodes within the seminar paper's sample and test specification.",
    assessment: {
      id: "bitcoin-gsadf", domain: "Historical Bitcoin price dynamics", horizon: null,
      comparison: "Right-tailed explosive-root tests against the unit-root null", model: null, baseline: { id: null, label: "Unit-root test null" },
      window: { label: "Sample dates and model choices are specified in the original seminar paper.", timezone: null },
      protocol: "Recursive explosive-root testing and episode dating; no unsupplied numerical results are reproduced here.",
    },
    metrics: [], method: "Right-tailed GSADF testing across recursive windows to diagnose and date explosive episodes.",
    keyCaveat: "Explosive-root diagnostics are not an actionable bubble-trading rule or proof of fundamental mispricing.",
    limitations: ["Episode dating depends on sample boundaries, frequency, test specification and critical values."], observations: [],
    authority: researchAuthority,
    source: { availability: "public", label: "GSADF seminar paper PDF", href: "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf", note: "Academic seminar paper; not presented as a peer-reviewed publication." },
    code: unavailableCode, lineage: [], nextQuestion: "How sensitive are the diagnosed episodes to specification and sample boundaries? No active follow-up is claimed.",
    detailHref: "/projects/bitcoin-bubble-gsadf",
  },
  c4Challenger: {
    id: "c4-challenger", version: "C4", reviewedAt,
    title: "C4 BTC Challenger", shortTitle: "C4 historical challenger",
    question: "What does the existing post-selection regime comparison show?",
    evidenceClass: "RETROSPECTIVE", workState: "completed", role: "Historical challenger",
    classification: null, claimOutcome: "supported_within_scope", outcomeLabel: "POST-SELECTION HISTORICAL COMPARISON",
    finding: "The sparse C4 regime router exceeded the retained baseline on historical risk-adjusted performance under the original comparison, with selection and cost-stress limitations.",
    assessment: {
      id: "c4-historical-challenger", domain: "Historical BTCUSDT long/flat research", horizon: "Daily sleeves",
      comparison: "C4 regime router vs retained Daily EMA 50/200", model: { id: "C4", label: "C4 regime router" }, baseline: { id: null, label: "Daily EMA 50/200" },
      window: { label: "2022-01-01 to 2026-07-30; terminal period partial, as specified in the existing study.", timezone: null },
      protocol: "Post-selection historical stress audit; exact comparator and cost cases remain in the existing project study.",
    },
    metrics: [], method: "Compare the frozen selective regime router with the retained historical baseline, including cost and concentration stress.",
    keyCaveat: "C4 was selected after inspecting historical tournament results; this is not independent validation.",
    limitations: ["At severe transaction-cost stress, concentration and the comparison deteriorate. Retrospective bootstrap frequencies are not forecast probabilities."], observations: [],
    authority: researchAuthority,
    source: { availability: "public", label: "C4 historical challenger study", href: "/projects/btc-regime-challenger", note: "The existing public project page preserves the original comparison and limitations." },
    code: unavailableCode, lineage: ["daily-ema"], nextQuestion: "What would a non-overlapping observation period show with the historical definitions fixed? No new active study is claimed.",
    detailHref: "/projects/btc-regime-challenger",
  },
  nativeScheduler: {
    id: "native-scheduler", version: "V1", reviewedAt,
    title: "Native Scheduler Robustness V1", shortTitle: "Native scheduler robustness",
    question: "Does adaptive question ordering add meaningful value beyond simpler fixed native-horizon selection?",
    evidenceClass: "SYNTHETIC", workState: "completed", role: "Methodology simplification",
    classification: "NATIVE_FIXED_SELECTION_SUFFICIENT", claimOutcome: "supported_within_scope", outcomeLabel: "FIXED NATIVE SELECTION SUFFICIENT",
    finding: "The registered synthetic test found no meaningful adaptive incremental value beyond fixed native-horizon selection, supporting a simpler research architecture within the tested scope.",
    assessment: schedulerAssessment, metrics: schedulerMetrics,
    method: "Registered synthetic comparison of adaptive scheduling, fixed native-horizon selection and the Forced reference, with reported raw and adjusted results, paired uncertainty and validity guards.",
    keyCaveat: "Supports simplification within the tested synthetic scope, not exact equivalence, historical BTC alpha or execution authority.",
    limitations: [
      "Excluding the prespecified meaningful margin does not establish that the adaptive and fixed architectures are exactly equivalent.",
      "The synthetic result does not establish historical BTC predictability, risk-policy utility or directional alpha.",
      "This assessment is separate from the earlier native-horizon repair, whose data domain and evidence class remain unresolved.",
    ],
    observations: ["All null guards passed.", "Fixed native-horizon selection retained the reported detection power without meaningful adaptive incremental value.", "Adaptive scheduling remains a diagnostic option in the proposed next architecture, not the primary selector."],
    authority: researchAuthority,
    source: { ...privateResearchSource, label: "Reviewed completed scheduler-study update" },
    code: { ...unavailableCode, commit: "b45e2a3fa2daf4b51967059d964393536a41f106", note: "Verified completed-study identifier supplied with the reviewed result. No public code destination is available." },
    lineage: ["native-horizon-selection"], nextQuestion: "Candidate Generator V3: evaluate ordered candidate families with frozen native-horizon selection; adaptive scheduling is diagnostic only.",
    detailHref: "/research/nonlinear-measurement#scheduler-robustness",
  },
  turnoverDecomposition: {
    id: "turnover-decomposition", version: "Proposed question", reviewedAt,
    title: "Turnover & Opportunity-Cost Decomposition", shortTitle: "Turnover & opportunity cost",
    question: "How much of the observed policy tradeoff is associated with turnover, fees and foregone opportunity?",
    evidenceClass: null, workState: "proposed", role: "Next question",
    scope: "Proposed follow-up question. The study has not started; no active-study status or new result is claimed.",
    assessment: {
      id: "turnover-opportunity-cost-proposal", domain: "Proposed policy-mechanism decomposition", horizon: null,
      comparison: "Study design not yet supplied", model: null, baseline: null,
      window: { label: "Proposed question; no assessment window.", timezone: null },
      protocol: "A proposed decomposition motivated by the completed policy study; no completed or active protocol is claimed.",
    },
    method: "Proposed decomposition of turnover, fees and foregone opportunity; design remains a next question.",
    keyCaveat: "NEXT QUESTION only. Mechanism observations belong to the completed policy study.",
    limitations: ["No causal attribution percentage, outcome metric or expected winner is supplied."],
    authority: researchAuthority, source: privateResearchSource, code: unavailableCode,
    lineage: ["policy-utility"], nextQuestion: "Define a bounded decomposition that separates the observed policy tradeoffs.",
    detailHref: "/astra#next-question",
  },
  candidateGeneratorV3: {
    id: "candidate-generator-v3", version: "V3 proposed", reviewedAt,
    title: "Candidate Generator V3", shortTitle: "Candidate Generator V3",
    question: "What can ordered candidate families contribute under a frozen native-horizon selection architecture?",
    evidenceClass: null, workState: "proposed", role: "Next architecture question",
    scope: "Proposed architecture: OHLCV_RIDGE → ACTIVITY_RIDGE → NONLINEAR_OHLCV; frozen native 1h selection, R3 product, ridge alpha 1 and canonical ties. Adaptive scheduling is diagnostic only. No active-study or result claim.",
    assessment: {
      id: "candidate-generator-v3-proposal", domain: "Proposed candidate-generation architecture", horizon: "Frozen native 1 hour",
      comparison: "OHLCV_RIDGE → ACTIVITY_RIDGE → NONLINEAR_OHLCV; a proposed family sequence", model: null, baseline: null,
      window: { label: "Proposed architecture question; no assessment window.", timezone: null },
      protocol: "R3 product, ridge alpha 1, canonical ties and fixed native-horizon selection; adaptive scheduling retained for diagnostics only.",
    },
    method: "Proposed ordered candidate-family evaluation with a frozen native-horizon selection architecture.",
    keyCaveat: "NEXT QUESTION only. No study has started and no candidate-family outcome is reported.",
    limitations: ["The completed scheduler result supports methodological simplification; it does not establish performance for this proposed candidate generator."],
    authority: researchAuthority, source: privateResearchSource, code: unavailableCode,
    lineage: ["native-scheduler"], nextQuestion: "Specify and assess the proposed ordered candidate families without restoring adaptive scheduling as primary selection.",
    detailHref: "/astra#candidate-generator-v3",
  },
} as const satisfies Record<string, ResearchRecord>;

/** Scientific relevance order, intentionally independent of return or recency. */
export const completedResearch: readonly CompletedResearchRecord[] = [
  researchEvidence.independentRiskForecast, researchEvidence.policyUtility,
  researchEvidence.riskBaselineChallenge, researchEvidence.nonlinearSensorRecovery,
  researchEvidence.nativeHorizonSelection, researchEvidence.nativeScheduler, researchEvidence.dailyEma,
  researchEvidence.futuresVolatilityThesis, researchEvidence.bitcoinGsadf,
  researchEvidence.c4Challenger,
];
export const currentResearch: readonly OngoingResearchRecord[] = [];
export const nextResearchQuestions: readonly ProposedResearchRecord[] = [researchEvidence.candidateGeneratorV3, researchEvidence.turnoverDecomposition];

/** A metric group cannot be constructed without its assessment and visible caveat. */
export function getMetricGroup(record: CompletedResearchRecord, includeDetail = false): ResearchMetricGroup {
  const metrics = record.metrics.filter((metric) => includeDetail || metric.priority === "primary");
  if (metrics.some((metric) => metric.assessmentId !== record.assessment.id)) {
    throw new Error(`Metric assessment does not match record ${record.id}.`);
  }
  return {
    assessment: record.assessment, evidenceClass: record.evidenceClass, metrics,
    keyCaveat: record.keyCaveat, source: record.source, detailHref: record.detailHref,
  };
}

export type PipelineStage = { readonly title: string; readonly description: string };
export const homePipeline: readonly PipelineStage[] = [
  { title: "Generate", description: "Candidates and explicit market questions" },
  { title: "Measure", description: "Aligned targets, sensors and positive controls" },
  { title: "Falsify", description: "Alternatives, costs, nulls and failure criteria" },
  { title: "Repair", description: "Measurement and selection when controls fail" },
  { title: "Confirm", description: "Robustness and frozen independent assessment" },
  { title: "Translate", description: "Separate policy tests and bounded utility claims" },
];
export const researchPipeline: readonly PipelineStage[] = [
  { title: "Idea", description: "Frame a question that can be tested." },
  { title: "Candidate generation", description: "Specify hypotheses and comparison candidates." },
  { title: "Measurement", description: "Check targets, sensors and positive controls." },
  { title: "Falsification", description: "Challenge nulls, alternatives and costs; reject unsupported claims." },
  { title: "Repair", description: "Return failed controls to measurement and selection diagnosis." },
  { title: "Robustness", description: "Test the scope and stability of the surviving evidence." },
  { title: "Independent assessment", description: "Evaluate a fixed claim separately from development." },
  { title: "Policy research", description: "Test practical translation under its own frozen rule." },
];

export type ResearchTimelineEntry = {
  readonly id: string;
  readonly title: string;
  readonly finding: string;
  readonly limitation: string;
  readonly evidenceClass: EvidenceClass | null;
  readonly scopedState?: "INVALIDATED";
  readonly detailHref: string;
  readonly recordId?: ResearchRecordId;
};

export const researchTimeline: readonly ResearchTimelineEntry[] = [
  {
    id: "directional-hypotheses", title: "Directional hypotheses", finding: "Directional evidence was weak or cost-fragile.",
    limitation: "Narrow the claim; retain qualified historical EMA work separately. No blanket invalidation follows.",
    evidenceClass: "DEVELOPMENT", detailHref: "/research#systematic-strategies",
  },
  {
    id: "positive-control-failure", title: "Synthetic positive-control failure", finding: "A synthetic control exposed detection failure.",
    limitation: "The interpretation of a null readout as no signal was invalidated: a measurement blind spot could produce the same readout.",
    evidenceClass: "SYNTHETIC", scopedState: "INVALIDATED", detailHref: researchEvidence.nonlinearSensorRecovery.detailHref,
  },
  {
    id: "measurement-decomposition", title: "Measurement decomposition", finding: "Measurement stages were examined separately.",
    limitation: "Isolate sensor detection, target alignment and selection; no separate data domain is asserted for the diagnosis.",
    evidenceClass: null, detailHref: researchEvidence.nonlinearSensorRecovery.detailHref,
  },
  {
    id: "nonlinear-sensor-repair", title: "Nonlinear sensor repair", finding: "Synthetic positive-control detection recovered.",
    limitation: researchEvidence.nonlinearSensorRecovery.keyCaveat, evidenceClass: "SYNTHETIC",
    recordId: "nonlinear-sensor-recovery", detailHref: researchEvidence.nonlinearSensorRecovery.detailHref,
  },
  {
    id: "native-horizon-repair", title: "Native-horizon selection repair", finding: researchEvidence.nativeHorizonSelection.finding,
    limitation: researchEvidence.nativeHorizonSelection.keyCaveat, evidenceClass: null,
    recordId: "native-horizon-selection", detailHref: researchEvidence.nativeHorizonSelection.detailHref,
  },
  {
    id: "risk-candidate-discovery", title: "Risk candidate discovery", finding: "A candidate short-horizon risk information claim emerged.",
    limitation: "Development discovery needed a demanding baseline comparison.", evidenceClass: "DEVELOPMENT",
    detailHref: researchEvidence.riskBaselineChallenge.detailHref,
  },
  {
    id: "strong-baseline-challenge", title: "Strong baseline challenge", finding: researchEvidence.riskBaselineChallenge.finding,
    limitation: researchEvidence.riskBaselineChallenge.keyCaveat, evidenceClass: "DEVELOPMENT",
    recordId: "risk-baseline-challenge", detailHref: researchEvidence.riskBaselineChallenge.detailHref,
  },
  {
    id: "independent-confirmation", title: "Independent forecast confirmation", finding: "Both primary losses improved; all four chronological segments were positive in both losses.",
    limitation: riskInformationBoundary, evidenceClass: "INDEPENDENT",
    recordId: "independent-risk-forecast", detailHref: researchEvidence.independentRiskForecast.detailHref,
  },
  {
    id: "policy-translation-tested", title: "Policy translation tested", finding: "The completed policy study evaluated the frozen primary P3 mapping.",
    limitation: "Both primary pooled risk improvements missed the preregistered minimum.", evidenceClass: "RETROSPECTIVE",
    recordId: "policy-utility", detailHref: researchEvidence.policyUtility.detailHref,
  },
  {
    id: "policy-utility-not-confirmed", title: "Policy utility not confirmed", finding: researchEvidence.policyUtility.finding,
    limitation: researchEvidence.policyUtility.limitations[1], evidenceClass: "RETROSPECTIVE",
    recordId: "policy-utility", detailHref: researchEvidence.policyUtility.detailHref,
  },
  {
    id: "policy-mechanism", title: "Turnover / opportunity-cost mechanism isolated", finding: "H+C retains better risk ranking and lower turnover; much of the relative fee-net return advantage is associated with lower turnover.",
    limitation: "These observations do not override the failed P3 rule or establish a completed causal decomposition.", evidenceClass: "RETROSPECTIVE",
    recordId: "policy-utility", detailHref: researchEvidence.policyUtility.detailHref,
  },
];

export const schedulerBranch = {
  fromStageId: "native-horizon-repair", record: researchEvidence.nativeScheduler,
  nextQuestion: researchEvidence.candidateGeneratorV3,
} as const;
