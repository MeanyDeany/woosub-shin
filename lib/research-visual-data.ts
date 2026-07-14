export type DataProvenance =
  | "current-static-snapshot"
  | "academic-context"
  | "conceptual-illustration"
  | "planned-research";

export const PROVENANCE_LABELS: Readonly<Record<DataProvenance, string>> =
  Object.freeze({
    "current-static-snapshot": "Initial public snapshot",
    "academic-context": "Academic context",
    "conceptual-illustration": "Conceptual illustration",
    "planned-research": "Planned research",
  });
