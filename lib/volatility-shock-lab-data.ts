export const VOLATILITY_MODELS = [
  "GARCH(1,1)-t",
  "EGARCH(1,1)-t",
  "GJR-GARCH(1,1)-t",
  "HAR-RV",
] as const;

export type VolatilityModel = (typeof VOLATILITY_MODELS)[number];

export const SHOCK_SCENARIOS = [
  "positive-shock",
  "negative-shock",
  "volatility-cluster",
  "gradual-rv-buildup",
] as const;

export type ShockScenario = (typeof SHOCK_SCENARIOS)[number];

export const SHOCK_LAB_HOURS = [
  -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;

export type ShockLabPoint = {
  readonly hour: number;
  readonly value: number;
};

export type ModelMechanics = {
  readonly requiredInputs: readonly string[];
  readonly coreMechanism: string;
  readonly characteristicResponse: string;
  readonly producedEvidence: string;
  readonly researchRole: string;
  readonly prohibitedInterpretation: string;
};

export type ScenarioDefinition = {
  readonly id: ShockScenario;
  readonly label: string;
  readonly shortLabel: string;
  readonly description: string;
  readonly eventLabel: string;
  readonly eventHour: number;
  readonly comparisonGoal: string;
  readonly series: Readonly<Record<VolatilityModel, readonly ShockLabPoint[]>>;
};

export type ScenarioNavigationKey =
  | "ArrowLeft"
  | "ArrowRight"
  | "Home"
  | "End";

export const MODEL_COLORS: Readonly<Record<VolatilityModel, string>> =
  Object.freeze({
    "GARCH(1,1)-t": "#42D7F5",
    "EGARCH(1,1)-t": "#4D8DFF",
    "GJR-GARCH(1,1)-t": "#9B6CFF",
    "HAR-RV": "#FFB547",
  });

const PROHIBITED_INTERPRETATION =
  "This output is not a market regime, entry signal, short permission, automatic veto, sizing instruction, leverage decision, strategy approval, paper-trading approval, live-trading approval, or execution authority.";

export const MODEL_MECHANICS: Readonly<Record<VolatilityModel, ModelMechanics>> =
  Object.freeze({
    "GARCH(1,1)-t": Object.freeze({
      requiredInputs: Object.freeze([
        "previous conditional variance",
        "lagged squared standardized return shock",
        "persistence terms",
      ]),
      coreMechanism:
        "Updates conditional variance using a sign-symmetric squared-shock term and persistent lagged variance.",
      characteristicResponse:
        "Positive and negative shocks of equal magnitude produce the same conceptual immediate variance effect.",
      producedEvidence: "A normalized next-hour conditional variance estimate.",
      researchRole:
        "A symmetric baseline specification used for comparable shadow-model evidence.",
      prohibitedInterpretation: PROHIBITED_INTERPRETATION,
    }),
    "EGARCH(1,1)-t": Object.freeze({
      requiredInputs: Object.freeze([
        "previous log variance",
        "signed standardized residual",
        "absolute standardized residual",
        "persistence terms",
      ]),
      coreMechanism:
        "Updates log variance with separate shock-magnitude and signed-shock effects.",
      characteristicResponse:
        "A negative synthetic shock can produce a larger response than an equal positive shock.",
      producedEvidence:
        "A normalized next-hour variance estimate derived from a log-variance state.",
      researchRole:
        "An asymmetric shadow specification for studying signed-shock response.",
      prohibitedInterpretation: PROHIBITED_INTERPRETATION,
    }),
    "GJR-GARCH(1,1)-t": Object.freeze({
      requiredInputs: Object.freeze([
        "previous conditional variance",
        "lagged squared standardized return shock",
        "negative-shock indicator",
        "persistence terms",
      ]),
      coreMechanism:
        "Adds an extra threshold contribution when the lagged synthetic return shock is negative.",
      characteristicResponse:
        "Negative shocks activate an additional variance term that positive shocks do not activate.",
      producedEvidence:
        "A normalized next-hour conditional variance estimate with threshold asymmetry.",
      researchRole:
        "A threshold-asymmetric challenger specification in the shadow-model set.",
      prohibitedInterpretation: PROHIBITED_INTERPRETATION,
    }),
    "HAR-RV": Object.freeze({
      requiredInputs: Object.freeze([
        "recent daily realized volatility component",
        "recent weekly realized volatility component",
        "recent monthly realized volatility component",
      ]),
      coreMechanism:
        "Combines multiple realized-volatility horizons into a smoother next-period forecast state.",
      characteristicResponse:
        "Responds more gradually to persistent realized-volatility buildup and multi-hour clustering.",
      producedEvidence:
        "A normalized next-hour realized-variance forecast estimate.",
      researchRole: "A multi-horizon realized-volatility shadow specification.",
      prohibitedInterpretation: PROHIBITED_INTERPRETATION,
    }),
  });

function makeSeries(values: readonly number[]): readonly ShockLabPoint[] {
  if (values.length !== SHOCK_LAB_HOURS.length) {
    throw new Error("Shock Lab series must contain exactly 19 values.");
  }

  return Object.freeze(
    SHOCK_LAB_HOURS.map((hour, index) => {
      const value = values[index];

      if (value === undefined || !Number.isFinite(value) || value < 0.2 || value > 1) {
        throw new Error(`Invalid Shock Lab value at relative hour ${hour}.`);
      }

      return Object.freeze({ hour, value });
    }),
  );
}

export const SCENARIO_DEFINITIONS: readonly ScenarioDefinition[] = Object.freeze([
  Object.freeze({
    id: "positive-shock",
    label: "Positive Shock",
    shortLabel: "Positive Shock",
    description:
      "A single positive standardized return shock arrives at hour zero after a stable pre-event variance state.",
    eventLabel: "Positive synthetic shock",
    eventHour: 0,
    comparisonGoal:
      "Compares sign-symmetric variance updating against asymmetric specifications when the synthetic shock is positive.",
    series: Object.freeze({
      "GARCH(1,1)-t": makeSeries([
        0.28, 0.28, 0.29, 0.29, 0.3, 0.3, 0.78, 0.7, 0.63, 0.57,
        0.52, 0.48, 0.44, 0.41, 0.38, 0.36, 0.34, 0.33, 0.32,
      ]),
      "EGARCH(1,1)-t": makeSeries([
        0.27, 0.28, 0.28, 0.29, 0.29, 0.3, 0.72, 0.65, 0.59, 0.54,
        0.49, 0.45, 0.41, 0.38, 0.36, 0.34, 0.32, 0.31, 0.3,
      ]),
      "GJR-GARCH(1,1)-t": makeSeries([
        0.28, 0.28, 0.29, 0.29, 0.3, 0.3, 0.67, 0.61, 0.56, 0.51,
        0.47, 0.43, 0.4, 0.37, 0.35, 0.33, 0.32, 0.31, 0.3,
      ]),
      "HAR-RV": makeSeries([
        0.27, 0.28, 0.28, 0.29, 0.3, 0.31, 0.48, 0.5, 0.49, 0.47,
        0.45, 0.43, 0.41, 0.39, 0.37, 0.36, 0.35, 0.34, 0.33,
      ]),
    }),
  }),
  Object.freeze({
    id: "negative-shock",
    label: "Negative Shock",
    shortLabel: "Negative Shock",
    description:
      "A single negative standardized return shock arrives at hour zero after a stable pre-event variance state.",
    eventLabel: "Negative synthetic shock",
    eventHour: 0,
    comparisonGoal:
      "Highlights the stronger conceptual response of signed-shock and threshold-asymmetric specifications.",
    series: Object.freeze({
      "GARCH(1,1)-t": makeSeries([
        0.28, 0.28, 0.29, 0.29, 0.3, 0.3, 0.78, 0.7, 0.63, 0.57,
        0.52, 0.48, 0.44, 0.41, 0.38, 0.36, 0.34, 0.33, 0.32,
      ]),
      "EGARCH(1,1)-t": makeSeries([
        0.27, 0.28, 0.28, 0.29, 0.29, 0.3, 0.96, 0.84, 0.75, 0.67,
        0.6, 0.54, 0.49, 0.45, 0.41, 0.38, 0.36, 0.34, 0.33,
      ]),
      "GJR-GARCH(1,1)-t": makeSeries([
        0.28, 0.28, 0.29, 0.29, 0.3, 0.3, 0.9, 0.8, 0.71, 0.64,
        0.58, 0.52, 0.47, 0.43, 0.4, 0.37, 0.35, 0.33, 0.32,
      ]),
      "HAR-RV": makeSeries([
        0.27, 0.28, 0.28, 0.29, 0.3, 0.31, 0.5, 0.52, 0.51, 0.49,
        0.47, 0.45, 0.43, 0.41, 0.39, 0.38, 0.36, 0.35, 0.34,
      ]),
    }),
  }),
  Object.freeze({
    id: "volatility-cluster",
    label: "Volatility Cluster",
    shortLabel: "Volatility Cluster",
    description:
      "Several synthetic shocks arrive over consecutive hours, illustrating persistent elevated variance rather than a single isolated event.",
    eventLabel: "Cluster begins",
    eventHour: 0,
    comparisonGoal:
      "Compares persistence and smoothing when elevated variance is reinforced across consecutive hours.",
    series: Object.freeze({
      "GARCH(1,1)-t": makeSeries([
        0.28, 0.28, 0.29, 0.29, 0.3, 0.31, 0.52, 0.68, 0.83, 0.88,
        0.82, 0.77, 0.7, 0.64, 0.59, 0.54, 0.49, 0.45, 0.41,
      ]),
      "EGARCH(1,1)-t": makeSeries([
        0.27, 0.28, 0.28, 0.29, 0.3, 0.31, 0.56, 0.74, 0.91, 0.96,
        0.9, 0.83, 0.76, 0.69, 0.63, 0.58, 0.53, 0.48, 0.44,
      ]),
      "GJR-GARCH(1,1)-t": makeSeries([
        0.28, 0.28, 0.29, 0.29, 0.3, 0.31, 0.55, 0.72, 0.89, 0.93,
        0.88, 0.81, 0.74, 0.68, 0.62, 0.57, 0.52, 0.47, 0.43,
      ]),
      "HAR-RV": makeSeries([
        0.27, 0.28, 0.28, 0.29, 0.3, 0.31, 0.42, 0.51, 0.6, 0.68,
        0.74, 0.77, 0.78, 0.77, 0.74, 0.7, 0.65, 0.6, 0.55,
      ]),
    }),
  }),
  Object.freeze({
    id: "gradual-rv-buildup",
    label: "Gradual RV Buildup",
    shortLabel: "Gradual RV Buildup",
    description:
      "Realized-volatility information rises progressively before hour zero, emphasizing multi-horizon accumulation rather than one discrete return shock.",
    eventLabel: "Review point",
    eventHour: 0,
    comparisonGoal:
      "Highlights the multi-horizon HAR-RV response when realized-volatility information accumulates gradually.",
    series: Object.freeze({
      "GARCH(1,1)-t": makeSeries([
        0.27, 0.27, 0.28, 0.28, 0.29, 0.33, 0.43, 0.56, 0.67, 0.72,
        0.7, 0.66, 0.61, 0.56, 0.51, 0.47, 0.43, 0.4, 0.37,
      ]),
      "EGARCH(1,1)-t": makeSeries([
        0.27, 0.27, 0.28, 0.28, 0.3, 0.35, 0.46, 0.59, 0.7, 0.75,
        0.73, 0.68, 0.63, 0.58, 0.53, 0.49, 0.45, 0.42, 0.39,
      ]),
      "GJR-GARCH(1,1)-t": makeSeries([
        0.27, 0.27, 0.28, 0.28, 0.3, 0.34, 0.45, 0.58, 0.69, 0.74,
        0.72, 0.67, 0.62, 0.57, 0.52, 0.48, 0.44, 0.41, 0.38,
      ]),
      "HAR-RV": makeSeries([
        0.26, 0.28, 0.31, 0.35, 0.4, 0.46, 0.53, 0.6, 0.66, 0.71,
        0.75, 0.77, 0.78, 0.77, 0.75, 0.72, 0.68, 0.64, 0.6,
      ]),
    }),
  }),
]);

export const SCENARIOS_BY_ID: Readonly<Record<ShockScenario, ScenarioDefinition>> =
  Object.freeze({
    "positive-shock": SCENARIO_DEFINITIONS[0],
    "negative-shock": SCENARIO_DEFINITIONS[1],
    "volatility-cluster": SCENARIO_DEFINITIONS[2],
    "gradual-rv-buildup": SCENARIO_DEFINITIONS[3],
  });

export function cycleScenario(
  current: ShockScenario,
  key: ScenarioNavigationKey,
): ShockScenario {
  if (key === "Home") return SHOCK_SCENARIOS[0];
  if (key === "End") return SHOCK_SCENARIOS[SHOCK_SCENARIOS.length - 1];

  const currentIndex = SHOCK_SCENARIOS.indexOf(current);
  const direction = key === "ArrowLeft" ? -1 : 1;
  const nextIndex =
    (currentIndex + direction + SHOCK_SCENARIOS.length) % SHOCK_SCENARIOS.length;

  return SHOCK_SCENARIOS[nextIndex] ?? current;
}
