export type ExhibitAccent = "amber" | "blue" | "cyan" | "emerald" | "violet";

export type PipelineDisplayStatus = "active" | "completed" | "future";

export type PipelineStage = {
  accent: ExhibitAccent;
  id: string;
  integrityNote: string;
  name: string;
  producedEvidence: string;
  prohibitedShortcut: string;
  purpose: string;
  requiredInputs: readonly string[];
  timingRule: string;
};

export type FailureCase = {
  accent: "amber" | "violet";
  boundaryProtected: string;
  danger: string;
  evidenceRetained: string;
  id: string;
  name: string;
  response: string;
  trigger: string;
};

export const SYNTHETIC_WALKTHROUGH_IDENTIFIERS = [
  { label: "event_id", value: "demo_forecast_2026_01_01T12_00Z" },
  { label: "source_window", value: "synthetic_completed_window" },
  { label: "fit_reference", value: "demo_egarch_fit_001" },
] as const;

export const PIPELINE_STAGES: readonly PipelineStage[] = [
  {
    accent: "cyan",
    id: "completed-market-data",
    integrityNote: "The source identity remains attached to the completed observations.",
    name: "Completed Market Data",
    producedEvidence: "A completed candle set with explicit source identity.",
    prohibitedShortcut: "No interpolation, forward fill, or silent repair.",
    purpose: "Use completed observations with explicit source identity.",
    requiredInputs: ["Completed 5-minute candles"],
    timingRule: "No incomplete candle enters the research window.",
  },
  {
    accent: "blue",
    id: "hourly-input-construction",
    integrityNote: "Every included observation must match the exact research boundary.",
    name: "Hourly Input Construction",
    producedEvidence: "A deterministic hourly input window.",
    prohibitedShortcut: "No tolerance join.",
    purpose: "Build an exact research window.",
    requiredInputs: ["One exact anchor", "Aligned completed observations"],
    timingRule: "Construction follows an exact UTC boundary.",
  },
  {
    accent: "violet",
    id: "model-fit-reference",
    integrityNote: "An orphan fit reference invalidates the proposed state.",
    name: "Model Fit Reference",
    producedEvidence: "One immutable fit reference bound to the state.",
    prohibitedShortcut: "No missing or ambiguous fit substitution.",
    purpose: "Bind the state to one immutable fitted specification.",
    requiredInputs: ["Existing referenced fit"],
    timingRule: "The fit must exist before the forecast state is recorded.",
  },
  {
    accent: "violet",
    id: "forecast-state",
    integrityNote: "The state records statistical evidence without policy semantics.",
    name: "Forecast State",
    producedEvidence: "Decimal variance and volatility evidence for the next hour.",
    prohibitedShortcut: "No direction, regime, entry, veto, or sizing interpretation.",
    purpose: "Record a raw next-hour variance forecast.",
    requiredInputs: ["Exact hourly input", "Immutable fit reference"],
    timingRule: "The state is fixed before its forward horizon begins.",
  },
  {
    accent: "amber",
    id: "horizon-close",
    integrityNote: "The future window becomes factual only after its exact close.",
    name: "Horizon Close",
    producedEvidence: "A closed factual evaluation window.",
    prohibitedShortcut: "No premature outcome.",
    purpose: "Establish that the future window is now factual.",
    requiredInputs: ["Forecast state", "Completed future observations"],
    timingRule: "An outcome cannot exist before this point.",
  },
  {
    accent: "emerald",
    id: "forward-outcome",
    integrityNote: "The outcome retains an exact reference to its frozen forecast state.",
    name: "Forward Outcome",
    producedEvidence: "Realized variance, forecast error, and forecast loss.",
    prohibitedShortcut: "No retrospective rewriting.",
    purpose: "Record realized variance and forecast loss after the horizon closes.",
    requiredInputs: ["Exact forecast-state reference", "Exact completed future observations"],
    timingRule: "Outcome calculation begins only after the exact horizon close.",
  },
  {
    accent: "amber",
    id: "integrity-review",
    integrityNote: "The result is accepted factual evidence or a visible rejection reason.",
    name: "Integrity Review",
    producedEvidence: "An explicit accepted or rejected research-evidence result.",
    prohibitedShortcut: "No plausible fallback that hides failure.",
    purpose: "Validate identities, references, source stability, freshness, and coverage.",
    requiredInputs: ["Fit, state, outcome, source, and coverage evidence"],
    timingRule: "Review completes before evidence is treated as publishable.",
  },
] as const;

export const FAILURE_CASES: readonly FailureCase[] = [
  {
    accent: "amber",
    boundaryProtected: "Anti-lookahead integrity",
    danger: "Future information would be treated as factual too early.",
    evidenceRetained: "Forecast state remains unchanged.",
    id: "premature-outcome",
    name: "Premature Outcome",
    response: "Reject outcome publication.",
    trigger: "The forecast horizon has not closed.",
  },
  {
    accent: "violet",
    boundaryProtected: "Append-only uniqueness",
    danger: "Repeated evidence can distort counts and later comparisons.",
    evidenceRetained: "Original immutable event remains authoritative.",
    id: "semantic-duplicate",
    name: "Semantic Duplicate",
    response: "Reject the second append.",
    trigger: "The same semantic event identity already exists.",
  },
  {
    accent: "violet",
    boundaryProtected: "Referential integrity",
    danger: "The forecast cannot be reproduced or attributed.",
    evidenceRetained: "Validation failure is surfaced.",
    id: "orphan-fit-reference",
    name: "Orphan Fit Reference",
    response: "Reject the state.",
    trigger: "A forecast state references a fit that does not exist.",
  },
  {
    accent: "amber",
    boundaryProtected: "Failure-safe publication",
    danger: "The published page may combine inconsistent source states.",
    evidenceRetained: "Previous valid snapshot remains byte-exact.",
    id: "source-mutation",
    name: "Source Mutation During Publication",
    response: "Abort staged publication and preserve the prior valid public snapshot.",
    trigger: "A source fingerprint changes between snapshot construction and publication.",
  },
  {
    accent: "amber",
    boundaryProtected: "Operational honesty",
    danger: "A plausible but incomplete view could be mistaken for healthy evidence.",
    evidenceRetained: "Staleness remains visible.",
    id: "stale-artifact",
    name: "Stale Artifact or Missing Coverage",
    response: "Display a limited or failed research-infrastructure state.",
    trigger: "Expected evidence is missing or not refreshed within its research cadence.",
  },
] as const;

export function getPipelineDisplayStatus(
  stageIndex: number,
  activeIndex: number,
): PipelineDisplayStatus {
  if (stageIndex < activeIndex) return "completed";
  if (stageIndex === activeIndex) return "active";
  return "future";
}

export function getNextPipelineStageIndex(
  currentIndex: number,
  direction: -1 | 1,
  stageCount = PIPELINE_STAGES.length,
) {
  return Math.min(Math.max(currentIndex + direction, 0), stageCount - 1);
}
