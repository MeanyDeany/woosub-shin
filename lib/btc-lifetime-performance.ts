export type BtcLifetimePerformanceTelemetry = {
  schema_version: 1;
  dataset_id: "binance_usdm_public_lifetime_performance_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  tracking_started_at_utc: string;
  venue: "BINANCE_USDM";
  environment: "PRODUCTION";
  scope: "SYSTEMATIC_EXECUTION_PUBLIC_TRACKING_V1";
  reporting_currency: "USD";
  lifetime_net_pnl: number;
  lifetime_return_pct: number;
  freshness_ttl_seconds: 180;
  authority_classification: "PERFORMANCE_TELEMETRY_ONLY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_LIFETIME_PERFORMANCE_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/lifetime-performance.json";

const sha256 = /^[0-9a-f]{64}$/;
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
  "lifetime_net_pnl",
  "lifetime_return_pct",
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
    !value.endsWith("Z") ||
    !Number.isFinite(Date.parse(value))
  ) {
    throw new Error(`${field} must be a valid UTC timestamp`);
  }
  return value;
}

function exactFiniteNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${field} must be a finite number`);
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
    throw new Error("Lifetime performance telemetry fields do not match V1");
  }

  if (
    value.schema_version !== 1 ||
    value.dataset_id !== "binance_usdm_public_lifetime_performance_v1" ||
    value.venue !== "BINANCE_USDM" ||
    value.environment !== "PRODUCTION" ||
    value.scope !== "SYSTEMATIC_EXECUTION_PUBLIC_TRACKING_V1" ||
    value.reporting_currency !== "USD" ||
    value.freshness_ttl_seconds !== 180 ||
    value.authority_classification !== "PERFORMANCE_TELEMETRY_ONLY" ||
    value.external_action_permitted !== false
  ) {
    throw new Error("Unsupported lifetime performance telemetry contract");
  }

  const generatedAt = exactUtcTimestamp(value.generated_at_utc, "generated_at_utc");
  const observedAt = exactUtcTimestamp(value.observed_at_utc, "observed_at_utc");
  const trackingStartedAt = exactUtcTimestamp(
    value.tracking_started_at_utc,
    "tracking_started_at_utc",
  );

  if (
    Date.parse(trackingStartedAt) > Date.parse(observedAt) ||
    Date.parse(observedAt) > Date.parse(generatedAt)
  ) {
    throw new Error("Lifetime performance timestamps are not chronological");
  }

  const lifetimeNetPnl = exactFiniteNumber(value.lifetime_net_pnl, "lifetime_net_pnl");
  const lifetimeReturnPct = exactFiniteNumber(
    value.lifetime_return_pct,
    "lifetime_return_pct",
  );

  return {
    schema_version: 1,
    dataset_id: "binance_usdm_public_lifetime_performance_v1",
    generated_at_utc: generatedAt,
    observed_at_utc: observedAt,
    tracking_started_at_utc: trackingStartedAt,
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    scope: "SYSTEMATIC_EXECUTION_PUBLIC_TRACKING_V1",
    reporting_currency: "USD",
    lifetime_net_pnl: lifetimeNetPnl,
    lifetime_return_pct: lifetimeReturnPct,
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
