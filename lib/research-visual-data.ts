export const SHADOW_MODEL_NAMES = [
  "GARCH(1,1)-t",
  "EGARCH(1,1)-t",
  "GJR-GARCH(1,1)-t",
  "HAR-RV",
] as const;

export type ShadowModelName = (typeof SHADOW_MODEL_NAMES)[number];
export type ResearchAsset = "BTCUSDT" | "NQ" | "ES";

export type DataProvenance =
  | "current-static-snapshot"
  | "academic-context"
  | "conceptual-illustration"
  | "planned-research";

export const PROVENANCE_LABELS: Record<DataProvenance, string> = {
  "current-static-snapshot": "Initial public snapshot",
  "academic-context": "Academic context",
  "conceptual-illustration": "Conceptual illustration",
  "planned-research": "Planned research",
};

export type SurfaceSample = {
  label: string;
  context: string;
  provenance: "conceptual-illustration";
  status: string;
  values: Record<ShadowModelName, readonly number[]>;
};

export const SURFACE_SAMPLES: Record<ResearchAsset, SurfaceSample> = {
  BTCUSDT: {
    label: "BTCUSDT",
    context: "Illustrative surface connected to the initial public research baseline; no trading execution",
    provenance: "conceptual-illustration",
    status: "Public showcase baseline",
    values: {
      "GARCH(1,1)-t": [
        0.34, 0.36, 0.42, 0.39, 0.45, 0.52, 0.49, 0.58, 0.72, 0.65,
        0.59, 0.63, 0.77, 0.82, 0.74, 0.69, 0.76, 0.88,
      ],
      "EGARCH(1,1)-t": [
        0.31, 0.35, 0.46, 0.42, 0.51, 0.6, 0.55, 0.66, 0.8, 0.72,
        0.64, 0.7, 0.85, 0.91, 0.8, 0.74, 0.83, 0.96,
      ],
      "GJR-GARCH(1,1)-t": [
        0.33, 0.37, 0.44, 0.41, 0.48, 0.57, 0.53, 0.63, 0.78, 0.7,
        0.62, 0.68, 0.82, 0.87, 0.78, 0.72, 0.8, 0.92,
      ],
      "HAR-RV": [
        0.29, 0.32, 0.36, 0.38, 0.42, 0.47, 0.5, 0.55, 0.62, 0.66,
        0.64, 0.67, 0.71, 0.76, 0.77, 0.75, 0.79, 0.84,
      ],
    },
  },
  NQ: {
    label: "NQ",
    context: "Prior futures and volatility-regime research; not running in the BTC operational pipeline",
    provenance: "conceptual-illustration",
    status: "Academic research asset",
    values: {
      "GARCH(1,1)-t": [
        0.26, 0.28, 0.3, 0.33, 0.37, 0.35, 0.4, 0.46, 0.43, 0.48,
        0.55, 0.61, 0.58, 0.52, 0.57, 0.64, 0.6, 0.66,
      ],
      "EGARCH(1,1)-t": [
        0.24, 0.27, 0.32, 0.36, 0.41, 0.38, 0.45, 0.52, 0.48, 0.54,
        0.63, 0.7, 0.65, 0.58, 0.64, 0.72, 0.67, 0.75,
      ],
      "GJR-GARCH(1,1)-t": [
        0.25, 0.29, 0.31, 0.35, 0.39, 0.37, 0.43, 0.49, 0.46, 0.52,
        0.6, 0.67, 0.62, 0.56, 0.61, 0.69, 0.65, 0.71,
      ],
      "HAR-RV": [
        0.23, 0.25, 0.28, 0.31, 0.34, 0.36, 0.39, 0.43, 0.45, 0.47,
        0.51, 0.56, 0.58, 0.57, 0.59, 0.62, 0.64, 0.67,
      ],
    },
  },
  ES: {
    label: "ES",
    context: "Prior futures and volatility-regime research; not running in the BTC operational pipeline",
    provenance: "conceptual-illustration",
    status: "Academic research asset",
    values: {
      "GARCH(1,1)-t": [
        0.22, 0.24, 0.27, 0.29, 0.31, 0.34, 0.32, 0.35, 0.39, 0.42,
        0.4, 0.44, 0.48, 0.46, 0.49, 0.53, 0.51, 0.55,
      ],
      "EGARCH(1,1)-t": [
        0.21, 0.23, 0.28, 0.31, 0.34, 0.38, 0.35, 0.39, 0.44, 0.47,
        0.44, 0.49, 0.54, 0.51, 0.55, 0.6, 0.56, 0.62,
      ],
      "GJR-GARCH(1,1)-t": [
        0.22, 0.25, 0.27, 0.3, 0.33, 0.36, 0.34, 0.37, 0.42, 0.45,
        0.43, 0.47, 0.51, 0.49, 0.52, 0.57, 0.54, 0.59,
      ],
      "HAR-RV": [
        0.2, 0.22, 0.24, 0.27, 0.29, 0.31, 0.32, 0.34, 0.37, 0.39,
        0.4, 0.42, 0.45, 0.46, 0.48, 0.5, 0.52, 0.54,
      ],
    },
  },
};

export const MODEL_COLORS: Record<ShadowModelName, string> = {
  "GARCH(1,1)-t": "#42D7F5",
  "EGARCH(1,1)-t": "#4D8DFF",
  "GJR-GARCH(1,1)-t": "#9B6CFF",
  "HAR-RV": "#FFB547",
};
