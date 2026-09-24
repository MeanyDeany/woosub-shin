export type BinanceRollingPerformanceWindow = {
  window: "7D" | "30D";
  requested_days: 7 | 30;
  start_observed_at_utc: string;
  end_observed_at_utc: string;
  actual_duration_seconds: number;
  net_pnl: number;
  return_pct: number;
};

export type BinanceRollingPerformanceTelemetry = {
  schema_version: 1;
  dataset_id: "binance_usdm_public_rolling_performance_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  venue: "BINANCE_USDM";
  environment: "PRODUCTION";
  scope: "BINANCE_USDM_ACCOUNT_WIDE_ROLLING_TRADING_V1";
  reporting_currency: "USD";
  windows: [BinanceRollingPerformanceWindow, BinanceRollingPerformanceWindow];
  return_method: "MODIFIED_DIETZ_FLOW_ADJUSTED_V2";
  capital_flow_handling: "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2";
  freshness_ttl_seconds: 180;
  authority_classification: "PERFORMANCE_TELEMETRY_ONLY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_ROLLING_PERFORMANCE_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/rolling-performance.json";

const sha256 = /^[0-9a-f]{64}$/;
const utcTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;
const topKeys = [
  "schema_version",
  "dataset_id",
  "generated_at_utc",
  "observed_at_utc",
  "venue",
  "environment",
  "scope",
  "reporting_currency",
  "windows",
  "return_method",
  "capital_flow_handling",
  "freshness_ttl_seconds",
  "authority_classification",
  "external_action_permitted",
  "telemetry_sha256",
] as const;
const windowKeys = [
  "window",
  "requested_days",
  "start_observed_at_utc",
  "end_observed_at_utc",
  "actual_duration_seconds",
  "net_pnl",
  "return_pct",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactKeys(value: Record<string, unknown>, expected: readonly string[], field: string) {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    throw new Error(`${field} fields do not match contract`);
  }
}

function timestamp(value: unknown, field: string): string {
  if (
    typeof value !== "string" ||
    !utcTimestampPattern.test(value) ||
    !Number.isFinite(Date.parse(value))
  ) {
    throw new Error(`${field} must be RFC3339 UTC text`);
  }
  return value;
}

function finiteNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || Object.is(value, -0)) {
    throw new Error(`${field} must be a finite public number`);
  }
  return value;
}

function parseWindow(
  value: unknown,
  label: "7D" | "30D",
  requestedDays: 7 | 30,
  observedAt: string,
): BinanceRollingPerformanceWindow {
  if (!isRecord(value)) throw new Error("Rolling window must be an object");
  exactKeys(value, windowKeys, "Rolling window");
  if (value.window !== label || value.requested_days !== requestedDays) {
    throw new Error("Rolling window identity is invalid");
  }
  const start = timestamp(value.start_observed_at_utc, "start_observed_at_utc");
  const end = timestamp(value.end_observed_at_utc, "end_observed_at_utc");
  if (end !== observedAt || Date.parse(start) >= Date.parse(end)) {
    throw new Error("Rolling window timestamps are invalid");
  }
  if (
    typeof value.actual_duration_seconds !== "number" ||
    !Number.isSafeInteger(value.actual_duration_seconds) ||
    value.actual_duration_seconds <= 0
  ) {
    throw new Error("Rolling window duration is invalid");
  }
  return {
    window: label,
    requested_days: requestedDays,
    start_observed_at_utc: start,
    end_observed_at_utc: end,
    actual_duration_seconds: value.actual_duration_seconds,
    net_pnl: finiteNumber(value.net_pnl, "net_pnl"),
    return_pct: finiteNumber(value.return_pct, "return_pct"),
  };
}

export function parseBtcRollingPerformanceTelemetry(
  value: unknown,
): BinanceRollingPerformanceTelemetry {
  if (!isRecord(value)) throw new Error("Rolling performance telemetry must be an object");
  exactKeys(value, topKeys, "Rolling performance telemetry");
  if (
    value.schema_version !== 1 ||
    value.dataset_id !== "binance_usdm_public_rolling_performance_v1" ||
    value.venue !== "BINANCE_USDM" ||
    value.environment !== "PRODUCTION" ||
    value.scope !== "BINANCE_USDM_ACCOUNT_WIDE_ROLLING_TRADING_V1" ||
    value.reporting_currency !== "USD" ||
    value.return_method !== "MODIFIED_DIETZ_FLOW_ADJUSTED_V2" ||
    value.capital_flow_handling !== "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2" ||
    value.freshness_ttl_seconds !== 180 ||
    value.authority_classification !== "PERFORMANCE_TELEMETRY_ONLY" ||
    value.external_action_permitted !== false
  ) {
    throw new Error("Unsupported rolling performance telemetry contract");
  }

  const generated = timestamp(value.generated_at_utc, "generated_at_utc");
  const observed = timestamp(value.observed_at_utc, "observed_at_utc");
  if (Date.parse(observed) > Date.parse(generated)) {
    throw new Error("Rolling performance timestamps are not chronological");
  }
  if (!Array.isArray(value.windows) || value.windows.length !== 2) {
    throw new Error("Rolling performance must contain exactly 7D and 30D windows");
  }
  const windows: [BinanceRollingPerformanceWindow, BinanceRollingPerformanceWindow] = [
    parseWindow(value.windows[0], "7D", 7, observed),
    parseWindow(value.windows[1], "30D", 30, observed),
  ];
  if (typeof value.telemetry_sha256 !== "string" || !sha256.test(value.telemetry_sha256)) {
    throw new Error("Rolling performance telemetry SHA-256 is invalid");
  }

  return {
    schema_version: 1,
    dataset_id: "binance_usdm_public_rolling_performance_v1",
    generated_at_utc: generated,
    observed_at_utc: observed,
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    scope: "BINANCE_USDM_ACCOUNT_WIDE_ROLLING_TRADING_V1",
    reporting_currency: "USD",
    windows,
    return_method: "MODIFIED_DIETZ_FLOW_ADJUSTED_V2",
    capital_flow_handling: "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2",
    freshness_ttl_seconds: 180,
    authority_classification: "PERFORMANCE_TELEMETRY_ONLY",
    external_action_permitted: false,
    telemetry_sha256: value.telemetry_sha256,
  };
}

function validHttpsUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return undefined;
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return undefined;
  }
}

export function deriveBtcRollingPerformanceFeedUrl(
  observatoryFeedUrl?: string,
  directFeedUrl?: string,
): string {
  const direct = validHttpsUrl(directFeedUrl);
  if (direct) return direct;
  const observatory = validHttpsUrl(observatoryFeedUrl);
  if (observatory) {
    const url = new URL(observatory);
    url.pathname = "/public/execution/rolling-performance.json";
    return url.toString();
  }
  return DEFAULT_BTC_ROLLING_PERFORMANCE_FEED_URL;
}

export function rollingPerformanceAgeSeconds(
  telemetry: BinanceRollingPerformanceTelemetry,
  nowMs = Date.now(),
): number {
  return Math.max(0, Math.floor((nowMs - Date.parse(telemetry.observed_at_utc)) / 1000));
}
