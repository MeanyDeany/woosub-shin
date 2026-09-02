export type BinanceOpenPosition = {
  symbol: string;
  position_side: "BOTH" | "LONG" | "SHORT";
  position_state: "LONG" | "SHORT";
  ordinary_open_orders_present: boolean;
  algo_open_orders_present: boolean;
};

export type BinanceOpenPositionsTelemetry = {
  schema_version: 2;
  dataset_id: "binance_usdm_public_open_positions_v2";
  generated_at_utc: string;
  observed_at_utc: string;
  venue: "BINANCE_USDM";
  environment: "PRODUCTION";
  position_mode: "ONE_WAY" | "HEDGE";
  open_position_count: number;
  positions: BinanceOpenPosition[];
  observation_identity_sha256: string;
  freshness_ttl_seconds: 180;
  authority_classification: "AUTHENTICATED_READ_ONLY_TELEMETRY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_MULTI_POSITION_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/open-positions.json";

const sha256 = /^[0-9a-f]{64}$/;
const symbolPattern = /^[A-Z0-9]{2,30}$/;
const utcTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;
const topLevelKeys = [
  "schema_version",
  "dataset_id",
  "generated_at_utc",
  "observed_at_utc",
  "venue",
  "environment",
  "position_mode",
  "open_position_count",
  "positions",
  "observation_identity_sha256",
  "freshness_ttl_seconds",
  "authority_classification",
  "external_action_permitted",
  "telemetry_sha256",
] as const;
const positionKeys = [
  "symbol",
  "position_side",
  "position_state",
  "ordinary_open_orders_present",
  "algo_open_orders_present",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactKeys(
  value: Record<string, unknown>,
  expected: readonly string[],
  field: string,
): void {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    throw new Error(`${field} fields do not match V2`);
  }
}

function utcTimestamp(value: unknown, field: string): string {
  if (
    typeof value !== "string" ||
    !utcTimestampPattern.test(value) ||
    !Number.isFinite(Date.parse(value))
  ) {
    throw new Error(`${field} must be RFC3339 UTC text`);
  }
  return value;
}

function exactSha(value: unknown, field: string): string {
  if (typeof value !== "string" || !sha256.test(value)) {
    throw new Error(`${field} must be a lowercase SHA-256`);
  }
  return value;
}

function parsePosition(value: unknown): BinanceOpenPosition {
  if (!isRecord(value)) throw new Error("Open position telemetry must be an object");
  exactKeys(value, positionKeys, "Open position telemetry");

  if (typeof value.symbol !== "string" || !symbolPattern.test(value.symbol)) {
    throw new Error("Open position symbol is invalid");
  }
  if (
    !(
      value.position_side === "BOTH" ||
      value.position_side === "LONG" ||
      value.position_side === "SHORT"
    )
  ) {
    throw new Error("Open position side is invalid");
  }
  if (!(value.position_state === "LONG" || value.position_state === "SHORT")) {
    throw new Error("Open position state is invalid");
  }
  if (
    typeof value.ordinary_open_orders_present !== "boolean" ||
    typeof value.algo_open_orders_present !== "boolean"
  ) {
    throw new Error("Open-order presence fields must be boolean");
  }

  return {
    symbol: value.symbol,
    position_side: value.position_side,
    position_state: value.position_state,
    ordinary_open_orders_present: value.ordinary_open_orders_present,
    algo_open_orders_present: value.algo_open_orders_present,
  };
}

export function parseBtcLiveMultiPositionTelemetry(value: unknown): BinanceOpenPositionsTelemetry {
  if (!isRecord(value)) throw new Error("Open-position telemetry must be an object");
  exactKeys(value, topLevelKeys, "Open-position telemetry");

  if (
    value.schema_version !== 2 ||
    value.dataset_id !== "binance_usdm_public_open_positions_v2" ||
    value.venue !== "BINANCE_USDM" ||
    value.environment !== "PRODUCTION" ||
    value.freshness_ttl_seconds !== 180 ||
    value.authority_classification !== "AUTHENTICATED_READ_ONLY_TELEMETRY" ||
    value.external_action_permitted !== false
  ) {
    throw new Error("Unsupported open-position telemetry contract");
  }
  if (!(value.position_mode === "ONE_WAY" || value.position_mode === "HEDGE")) {
    throw new Error("Open-position mode is invalid");
  }
  if (!Array.isArray(value.positions)) {
    throw new Error("Open positions must be an array");
  }
  if (
    typeof value.open_position_count !== "number" ||
    !Number.isSafeInteger(value.open_position_count) ||
    value.open_position_count < 0 ||
    value.open_position_count !== value.positions.length
  ) {
    throw new Error("Open-position count is inconsistent");
  }

  const generatedAt = utcTimestamp(value.generated_at_utc, "generated_at_utc");
  const observedAt = utcTimestamp(value.observed_at_utc, "observed_at_utc");
  if (Date.parse(observedAt) > Date.parse(generatedAt)) {
    throw new Error("Open-position timestamps are not chronological");
  }

  const positions = value.positions.map(parsePosition);
  let previousCoordinate: string | undefined;
  for (const position of positions) {
    const coordinate = `${position.symbol}\u0000${position.position_side}`;
    if (previousCoordinate !== undefined && coordinate <= previousCoordinate) {
      throw new Error("Open positions are not unique and canonically sorted");
    }
    previousCoordinate = coordinate;
  }

  return {
    schema_version: 2,
    dataset_id: "binance_usdm_public_open_positions_v2",
    generated_at_utc: generatedAt,
    observed_at_utc: observedAt,
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    position_mode: value.position_mode,
    open_position_count: value.open_position_count,
    positions,
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

function validHttpsUrl(value?: string): URL | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return undefined;
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return undefined;
  }
}

function withV2PositionPath(url: URL): string {
  if (url.pathname.endsWith("/multi-symbol-position.json")) {
    url.pathname = "/public/execution/open-positions.json";
  }
  return url.toString();
}

export function deriveBtcLiveMultiPositionFeedUrl(
  observatoryFeedUrl?: string,
  directFeedUrl?: string,
): string {
  const direct = validHttpsUrl(directFeedUrl);
  if (direct) return withV2PositionPath(direct);

  const observatory = validHttpsUrl(observatoryFeedUrl);
  if (observatory) {
    observatory.pathname = "/public/execution/open-positions.json";
    return observatory.toString();
  }

  return DEFAULT_BTC_MULTI_POSITION_FEED_URL;
}

export function multiPositionAgeSeconds(
  telemetry: BinanceOpenPositionsTelemetry,
  nowMs = Date.now(),
): number {
  return Math.max(0, Math.floor((nowMs - Date.parse(telemetry.observed_at_utc)) / 1000));
}
