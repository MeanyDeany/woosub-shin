export type BtcPositionSymbol = "BTCUSDT" | "BTCUSDC";

export type BtcLiveMultiPositionSymbol = {
  symbol: BtcPositionSymbol;
  position_state: "FLAT" | "LONG" | "SHORT" | "AMBIGUOUS";
  position_mode: "ONE_WAY" | "HEDGE";
  margin_type: "CROSSED" | "ISOLATED";
  configured_leverage: number;
  open_order_count: number;
};

export type BtcLiveMultiPositionTelemetry = {
  schema_version: 1;
  dataset_id: "binance_usdm_public_multi_symbol_position_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  venue: "BINANCE_USDM";
  environment: "PRODUCTION";
  symbols: [BtcLiveMultiPositionSymbol, BtcLiveMultiPositionSymbol];
  diagnostic_codes: string[];
  observation_identity_sha256: string;
  freshness_ttl_seconds: 180;
  authority_classification: "AUTHENTICATED_READ_ONLY_TELEMETRY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_MULTI_POSITION_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/multi-symbol-position.json";

const sha256 = /^[0-9a-f]{64}$/;
const utcTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;
const canonicalDiagnosticCodes = [
  "READ_ONLY_OBSERVATION_COMPLETE",
  "HEDGE_MODE_OBSERVED",
  "MULTI_ASSET_MODE_OBSERVED",
  "UNEXPECTED_SHORT_POSITION",
  "OPEN_ORDERS_PRESENT",
  "POSITION_AMBIGUOUS",
] as const;
const topLevelKeys = [
  "schema_version",
  "dataset_id",
  "generated_at_utc",
  "observed_at_utc",
  "venue",
  "environment",
  "symbols",
  "diagnostic_codes",
  "observation_identity_sha256",
  "freshness_ttl_seconds",
  "authority_classification",
  "external_action_permitted",
  "telemetry_sha256",
] as const;
const symbolKeys = [
  "symbol",
  "position_state",
  "position_mode",
  "margin_type",
  "configured_leverage",
  "open_order_count",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactKeys(value: Record<string, unknown>, expected: readonly string[], field: string): void {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    throw new Error(`${field} fields do not match V1`);
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

function parseSymbol(value: unknown, expectedSymbol: BtcPositionSymbol): BtcLiveMultiPositionSymbol {
  if (!isRecord(value)) throw new Error(`${expectedSymbol} telemetry must be an object`);
  exactKeys(value, symbolKeys, expectedSymbol);
  if (value.symbol !== expectedSymbol) throw new Error(`Expected ${expectedSymbol} in canonical order`);
  if (!(["FLAT", "LONG", "SHORT", "AMBIGUOUS"] as const).includes(value.position_state as never)) {
    throw new Error(`Unexpected ${expectedSymbol} position state`);
  }
  if (!(["ONE_WAY", "HEDGE"] as const).includes(value.position_mode as never)) {
    throw new Error(`Unexpected ${expectedSymbol} position mode`);
  }
  if (!(["CROSSED", "ISOLATED"] as const).includes(value.margin_type as never)) {
    throw new Error(`Unexpected ${expectedSymbol} margin type`);
  }
  return {
    symbol: expectedSymbol,
    position_state: value.position_state as BtcLiveMultiPositionSymbol["position_state"],
    position_mode: value.position_mode as BtcLiveMultiPositionSymbol["position_mode"],
    margin_type: value.margin_type as BtcLiveMultiPositionSymbol["margin_type"],
    configured_leverage: exactInteger(value.configured_leverage, `${expectedSymbol}.configured_leverage`, 1, 125),
    open_order_count: exactInteger(value.open_order_count, `${expectedSymbol}.open_order_count`, 0),
  };
}

function validateDiagnostics(
  codes: unknown,
  symbols: [BtcLiveMultiPositionSymbol, BtcLiveMultiPositionSymbol],
): string[] {
  if (
    !Array.isArray(codes) ||
    codes.length === 0 ||
    codes.some((code) => typeof code !== "string") ||
    new Set(codes).size !== codes.length
  ) {
    throw new Error("Invalid multi-symbol diagnostic codes");
  }

  const allowed = new Set<string>(canonicalDiagnosticCodes);
  if (codes.some((code) => !allowed.has(code))) {
    throw new Error("Multi-symbol diagnostics contain a non-public code");
  }

  const canonical = canonicalDiagnosticCodes.filter((code) => codes.includes(code));
  if (codes.length !== canonical.length || codes.some((code, index) => code !== canonical[index])) {
    throw new Error("Multi-symbol diagnostics are not in PR16 canonical order");
  }
  if (!codes.includes("READ_ONLY_OBSERVATION_COMPLETE")) {
    throw new Error("Multi-symbol telemetry is incomplete");
  }

  const states = symbols.map((symbol) => symbol.position_state);
  const hasOpenOrders = symbols.some((symbol) => symbol.open_order_count > 0);
  const expectedFacts: Record<string, boolean> = {
    HEDGE_MODE_OBSERVED: symbols[0].position_mode === "HEDGE",
    UNEXPECTED_SHORT_POSITION: states.includes("SHORT"),
    OPEN_ORDERS_PRESENT: hasOpenOrders,
    POSITION_AMBIGUOUS: states.includes("AMBIGUOUS"),
  };
  for (const [code, expected] of Object.entries(expectedFacts)) {
    if (codes.includes(code) !== expected) {
      throw new Error("Multi-symbol diagnostics do not match public symbol facts");
    }
  }

  return [...codes];
}

export function parseBtcLiveMultiPositionTelemetry(value: unknown): BtcLiveMultiPositionTelemetry {
  if (!isRecord(value)) throw new Error("Multi-symbol position telemetry must be an object");
  exactKeys(value, topLevelKeys, "Multi-symbol position telemetry");
  if (
    value.schema_version !== 1 ||
    value.dataset_id !== "binance_usdm_public_multi_symbol_position_v1" ||
    value.venue !== "BINANCE_USDM" ||
    value.environment !== "PRODUCTION"
  ) {
    throw new Error("Unexpected multi-symbol position telemetry identity");
  }
  if (!Array.isArray(value.symbols) || value.symbols.length !== 2) {
    throw new Error("Multi-symbol telemetry requires exactly BTCUSDT and BTCUSDC");
  }

  const symbols: [BtcLiveMultiPositionSymbol, BtcLiveMultiPositionSymbol] = [
    parseSymbol(value.symbols[0], "BTCUSDT"),
    parseSymbol(value.symbols[1], "BTCUSDC"),
  ];
  if (symbols[0].position_mode !== symbols[1].position_mode) {
    throw new Error("Position modes must match shared Binance account state");
  }

  const diagnosticCodes = validateDiagnostics(value.diagnostic_codes, symbols);
  if (
    value.freshness_ttl_seconds !== 180 ||
    value.authority_classification !== "AUTHENTICATED_READ_ONLY_TELEMETRY" ||
    value.external_action_permitted !== false
  ) {
    throw new Error("Invalid multi-symbol telemetry authority boundary");
  }

  return {
    schema_version: 1,
    dataset_id: "binance_usdm_public_multi_symbol_position_v1",
    generated_at_utc: utcTimestamp(value.generated_at_utc, "generated_at_utc"),
    observed_at_utc: utcTimestamp(value.observed_at_utc, "observed_at_utc"),
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    symbols,
    diagnostic_codes: diagnosticCodes,
    observation_identity_sha256: exactSha(value.observation_identity_sha256, "observation_identity_sha256"),
    freshness_ttl_seconds: 180,
    authority_classification: "AUTHENTICATED_READ_ONLY_TELEMETRY",
    external_action_permitted: false,
    telemetry_sha256: exactSha(value.telemetry_sha256, "telemetry_sha256"),
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

export function deriveBtcLiveMultiPositionFeedUrl(
  observatoryFeedUrl?: string,
  directFeedUrl?: string,
): string {
  const direct = validHttpsUrl(directFeedUrl);
  if (direct) return direct;
  const observatory = validHttpsUrl(observatoryFeedUrl);
  if (observatory) {
    const url = new URL(observatory);
    url.pathname = "/public/execution/multi-symbol-position.json";
    return url.toString();
  }
  return DEFAULT_BTC_MULTI_POSITION_FEED_URL;
}

export function multiPositionAgeSeconds(
  telemetry: BtcLiveMultiPositionTelemetry,
  nowMs = Date.now(),
): number {
  return Math.max(0, Math.floor((nowMs - Date.parse(telemetry.observed_at_utc)) / 1000));
}
