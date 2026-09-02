export type BtcLifetimePerformanceTelemetry = {
  schema_version: 2;
  dataset_id: "binance_usdm_public_flow_adjusted_performance_v2";
  generated_at_utc: string;
  observed_at_utc: string;
  tracking_started_at_utc: "2026-08-01T00:00:00Z";
  venue: "BINANCE_USDM";
  environment: "PRODUCTION";
  scope: "BINANCE_USDM_ACCOUNT_WIDE_TRADING_V2";
  reporting_currency: "USD";
  realized_net_pnl: number;
  current_unrealized_pnl: number;
  lifetime_net_pnl: number;
  lifetime_return_pct: number;
  return_method: "MODIFIED_DIETZ_FLOW_ADJUSTED_V2";
  capital_flow_handling: "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2";
  freshness_ttl_seconds: 180;
  authority_classification: "PERFORMANCE_TELEMETRY_ONLY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_LIFETIME_PERFORMANCE_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/lifetime-performance.json";

const sha256 = /^[0-9a-f]{64}$/;
const utcTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;
const exactKeys = [
  "schema_version",
  "dataset_id",
  "generated_at_utc",
  "observed_at_utc",
  "tracking_started_at_utc",
  "venue",
  "environment",
  "scope",
  "reporting_currency",
  "realized_net_pnl",
  "current_unrealized_pnl",
  "lifetime_net_pnl",
  "lifetime_return_pct",
  "return_method",
  "capital_flow_handling",
  "freshness_ttl_seconds",
  "authority_classification",
  "external_action_permitted",
  "telemetry_sha256",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactUtcTimestamp(value: unknown, field: string): string {
  if (
    typeof value !== "string" ||
    !utcTimestampPattern.test(value) ||
    !Number.isFinite(Date.parse(value))
  ) {
    throw new Error(`${field} must be RFC3339 UTC text`);
  }
  return value;
}

function exactFiniteNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || Object.is(value, -0)) {
    throw new Error(`${field} must be a finite public number`);
  }
  return value;
}

function exactSha(value: unknown, field: string): string {
  if (typeof value !== "string" || !sha256.test(value)) {
    throw new Error(`${field} must be a lowercase SHA-256`);
  }
  return value;
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

export function parseBtcLifetimePerformanceTelemetry(
  value: unknown,
): BtcLifetimePerformanceTelemetry {
  if (!isRecord(value)) {
    throw new Error("Lifetime performance telemetry must be an object");
  }

  const keys = Object.keys(value).sort();
  const expected = [...exactKeys].sort();
  if (keys.length !== expected.length || keys.some((key, index) => key !== expected[index])) {
    throw new Error("Lifetime performance telemetry fields do not match V2");
  }

  if (
    value.schema_version !== 2 ||
    value.dataset_id !== "binance_usdm_public_flow_adjusted_performance_v2" ||
    value.tracking_started_at_utc !== "2026-08-01T00:00:00Z" ||
    value.venue !== "BINANCE_USDM" ||
    value.environment !== "PRODUCTION" ||
    value.scope !== "BINANCE_USDM_ACCOUNT_WIDE_TRADING_V2" ||
    value.reporting_currency !== "USD" ||
    value.return_method !== "MODIFIED_DIETZ_FLOW_ADJUSTED_V2" ||
    value.capital_flow_handling !== "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2" ||
    value.freshness_ttl_seconds !== 180 ||
    value.authority_classification !== "PERFORMANCE_TELEMETRY_ONLY" ||
    value.external_action_permitted !== false
  ) {
    throw new Error("Unsupported lifetime performance telemetry contract");
  }

  const generatedAt = exactUtcTimestamp(value.generated_at_utc, "generated_at_utc");
  const observedAt = exactUtcTimestamp(value.observed_at_utc, "observed_at_utc");
  const trackingStartedAt = value.tracking_started_at_utc;

  if (
    Date.parse(trackingStartedAt) >= Date.parse(observedAt) ||
    Date.parse(observedAt) > Date.parse(generatedAt)
  ) {
    throw new Error("Lifetime performance timestamps are not chronological");
  }

  return {
    schema_version: 2,
    dataset_id: "binance_usdm_public_flow_adjusted_performance_v2",
    generated_at_utc: generatedAt,
    observed_at_utc: observedAt,
    tracking_started_at_utc: trackingStartedAt,
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    scope: "BINANCE_USDM_ACCOUNT_WIDE_TRADING_V2",
    reporting_currency: "USD",
    realized_net_pnl: exactFiniteNumber(value.realized_net_pnl, "realized_net_pnl"),
    current_unrealized_pnl: exactFiniteNumber(
      value.current_unrealized_pnl,
      "current_unrealized_pnl",
    ),
    lifetime_net_pnl: exactFiniteNumber(value.lifetime_net_pnl, "lifetime_net_pnl"),
    lifetime_return_pct: exactFiniteNumber(
      value.lifetime_return_pct,
      "lifetime_return_pct",
    ),
    return_method: "MODIFIED_DIETZ_FLOW_ADJUSTED_V2",
    capital_flow_handling: "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2",
    freshness_ttl_seconds: 180,
    authority_classification: "PERFORMANCE_TELEMETRY_ONLY",
    external_action_permitted: false,
    telemetry_sha256: exactSha(value.telemetry_sha256, "telemetry_sha256"),
  };
}

export function deriveBtcLifetimePerformanceFeedUrl(
  observatoryFeedUrl?: string,
  directFeedUrl?: string,
): string {
  const direct = validHttpsUrl(directFeedUrl);
  if (direct) return direct;

  const observatory = validHttpsUrl(observatoryFeedUrl);
  if (observatory) {
    const url = new URL(observatory);
    url.pathname = "/public/execution/lifetime-performance.json";
    return url.toString();
  }

  return DEFAULT_BTC_LIFETIME_PERFORMANCE_FEED_URL;
}

export function lifetimePerformanceAgeSeconds(
  telemetry: BtcLifetimePerformanceTelemetry,
  nowMs = Date.now(),
): number {
  return Math.max(0, Math.floor((nowMs - Date.parse(telemetry.observed_at_utc)) / 1000));
}
