export type ObservatoryLocale = "en" | "ko";

export type BtcLivePositionTelemetry = {
  schema_version: 1;
  dataset_id: "binance_usdm_public_position_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  venue: "BINANCE_USDM";
  environment: "PRODUCTION";
  symbol: "BTCUSDT";
  position_state: "FLAT" | "LONG" | "SHORT" | "AMBIGUOUS";
  position_mode: "ONE_WAY" | "HEDGE";
  margin_type: "CROSSED" | "ISOLATED";
  configured_leverage: number;
  open_order_count: number;
  multi_assets_margin: boolean;
  diagnostic_codes: string[];
  observation_identity_sha256: string;
  freshness_ttl_seconds: 180;
  authority_classification: "AUTHENTICATED_READ_ONLY_TELEMETRY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

const sha256 = /^[0-9a-f]{64}$/;
const diagnostic = /^[A-Z][A-Z0-9_]{0,95}$/;
const exactKeys = [
  "schema_version",
  "dataset_id",
  "generated_at_utc",
  "observed_at_utc",
  "venue",
  "environment",
  "symbol",
  "position_state",
  "position_mode",
  "margin_type",
  "configured_leverage",
  "open_order_count",
  "multi_assets_margin",
  "diagnostic_codes",
  "observation_identity_sha256",
  "freshness_ttl_seconds",
  "authority_classification",
  "external_action_permitted",
  "telemetry_sha256",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function utcTimestamp(value: unknown, field: string): string {
  if (
    typeof value !== "string" ||
    !value.endsWith("Z") ||
    !Number.isFinite(Date.parse(value))
  ) {
    throw new Error(`${field} must be a valid UTC timestamp`);
  }
  return value;
}

function exactInteger(value: unknown, field: string, minimum: number, maximum?: number): number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < minimum ||
    (maximum !== undefined && value > maximum)
  ) {
    throw new Error(`${field} must be a bounded integer`);
  }
  return value;
}

function exactSha(value: unknown, field: string): string {
  if (typeof value !== "string" || !sha256.test(value)) {
    throw new Error(`${field} must be a lowercase SHA-256`);
  }
  return value;
}

export function parseBtcLivePositionTelemetry(value: unknown): BtcLivePositionTelemetry {
  if (!isRecord(value)) {
    throw new Error("Live position telemetry must be an object");
  }
  const keys = Object.keys(value).sort();
  const expected = [...exactKeys].sort();
  if (keys.length !== expected.length || keys.some((key, index) => key !== expected[index])) {
    throw new Error("Live position telemetry fields do not match V1");
  }
  if (value.schema_version !== 1 || value.dataset_id !== "binance_usdm_public_position_v1") {
    throw new Error("Unsupported live position telemetry schema");
  }
  if (
    value.venue !== "BINANCE_USDM" ||
    value.environment !== "PRODUCTION" ||
    value.symbol !== "BTCUSDT"
  ) {
    throw new Error("Unexpected live position telemetry identity");
  }
  if (!(["FLAT", "LONG", "SHORT", "AMBIGUOUS"] as const).includes(value.position_state as never)) {
    throw new Error("Unexpected position state");
  }
  if (!(["ONE_WAY", "HEDGE"] as const).includes(value.position_mode as never)) {
    throw new Error("Unexpected position mode");
  }
  if (!(["CROSSED", "ISOLATED"] as const).includes(value.margin_type as never)) {
    throw new Error("Unexpected margin type");
  }

  const diagnosticCodes = value.diagnostic_codes;
  if (
    !Array.isArray(diagnosticCodes) ||
    diagnosticCodes.length === 0 ||
    diagnosticCodes.length > 32 ||
    diagnosticCodes.some((code) => typeof code !== "string" || !diagnostic.test(code)) ||
    new Set(diagnosticCodes).size !== diagnosticCodes.length ||
    diagnosticCodes.some((code, index) => index > 0 && code < diagnosticCodes[index - 1]) ||
    !diagnosticCodes.includes("READ_ONLY_OBSERVATION_COMPLETE")
  ) {
    throw new Error("Invalid live position diagnostic codes");
  }
  if (
    typeof value.multi_assets_margin !== "boolean" ||
    value.freshness_ttl_seconds !== 180 ||
    value.authority_classification !== "AUTHENTICATED_READ_ONLY_TELEMETRY" ||
    value.external_action_permitted !== false
  ) {
    throw new Error("Invalid live position authority boundary");
  }

  return {
    schema_version: 1,
    dataset_id: "binance_usdm_public_position_v1",
    generated_at_utc: utcTimestamp(value.generated_at_utc, "generated_at_utc"),
    observed_at_utc: utcTimestamp(value.observed_at_utc, "observed_at_utc"),
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    symbol: "BTCUSDT",
    position_state: value.position_state as BtcLivePositionTelemetry["position_state"],
    position_mode: value.position_mode as BtcLivePositionTelemetry["position_mode"],
    margin_type: value.margin_type as BtcLivePositionTelemetry["margin_type"],
    configured_leverage: exactInteger(value.configured_leverage, "configured_leverage", 1, 125),
    open_order_count: exactInteger(value.open_order_count, "open_order_count", 0),
    multi_assets_margin: value.multi_assets_margin,
    diagnostic_codes: [...diagnosticCodes],
    observation_identity_sha256: exactSha(
      value.observation_identity_sha256,
      "observation_identity_sha256",
    ),
    freshness_ttl_seconds: 180,
    authority_classification: "AUTHENTICATED_READ_ONLY_TELEMETRY",
    external_action_permitted: false,
    telemetry_sha256: exactSha(value.telemetry_sha256, "telemetry_sha256"),
  };
}

export function deriveBtcLivePositionFeedUrl(observatoryFeedUrl?: string): string | undefined {
  if (!observatoryFeedUrl) {
    return undefined;
  }
  try {
    const url = new URL(observatoryFeedUrl);
    if (url.protocol !== "https:") {
      return undefined;
    }
    url.pathname = "/public/execution/btcusdt-position.json";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return undefined;
  }
}

export function positionAgeSeconds(telemetry: BtcLivePositionTelemetry, nowMs = Date.now()): number {
  return Math.max(0, Math.floor((nowMs - Date.parse(telemetry.observed_at_utc)) / 1000));
}
