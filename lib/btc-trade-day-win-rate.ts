export type BinanceTradeDayWinRateTelemetry = {
  schema_version: 1;
  dataset_id: "binance_usdm_public_trade_day_win_rate_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  coverage_start_utc: "2024-11-13";
  scope: "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V1";
  historical_base_through_utc: "2026-09-28";
  live_extension_start_utc: "2026-09-29T00:00:00Z";
  resolved_trade_day_count: number;
  winning_trade_day_count: number;
  losing_trade_day_count: number;
  win_rate_pct: number;
  method: "REALIZED_PNL_PLUS_COMMISSION_EX_FUNDING_BY_UTC_DAY_V1";
  day_basis: "UTC";
  funding_included: false;
  trading_commission_included: true;
  historical_bnb_commission_valuation: "CONTEMPORANEOUS_BNBUSDT_1M_CLOSE_ESTIMATE";
  live_commission_basis: "AUTHENTICATED_USDT_USDC_LEDGER_PAR";
  freshness_ttl_seconds: 180 | 600;
  authority_classification: "PERFORMANCE_TELEMETRY_ONLY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_TRADE_DAY_WIN_RATE_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/trade-day-win-rate.json";

const sha256 = /^[0-9a-f]{64}$/;
const utcTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;
const exactKeys = [
  "schema_version",
  "dataset_id",
  "generated_at_utc",
  "observed_at_utc",
  "coverage_start_utc",
  "scope",
  "historical_base_through_utc",
  "live_extension_start_utc",
  "resolved_trade_day_count",
  "winning_trade_day_count",
  "losing_trade_day_count",
  "win_rate_pct",
  "method",
  "day_basis",
  "funding_included",
  "trading_commission_included",
  "historical_bnb_commission_valuation",
  "live_commission_basis",
  "freshness_ttl_seconds",
  "authority_classification",
  "external_action_permitted",
  "telemetry_sha256",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function timestamp(value: unknown, field: string): string {
  if (
    typeof value !== "string" ||
    !utcTimestampPattern.test(value) ||
    !Number.isFinite(Date.parse(value))
  ) throw new Error(`${field} must be RFC3339 UTC text`);
  return value;
}
function finiteNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || Object.is(value, -0)) {
    throw new Error(`${field} must be finite public number`);
  }
  return value;
}
function nonNegativeInt(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${field} must be a non-negative integer`);
  }
  return value;
}

export function parseBtcTradeDayWinRateTelemetry(
  value: unknown,
): BinanceTradeDayWinRateTelemetry {
  if (!isRecord(value)) throw new Error("Trade-day win-rate telemetry must be an object");
  const keys = Object.keys(value).sort();
  const expected = [...exactKeys].sort();
  if (keys.length !== expected.length || keys.some((key, i) => key !== expected[i])) {
    throw new Error("Trade-day win-rate telemetry fields do not match contract");
  }
  const fixedValid =
    value.schema_version === 1 &&
    value.dataset_id === "binance_usdm_public_trade_day_win_rate_v1" &&
    value.coverage_start_utc === "2024-11-13" &&
    value.scope === "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V1" &&
    value.historical_base_through_utc === "2026-09-28" &&
    value.live_extension_start_utc === "2026-09-29T00:00:00Z" &&
    value.method === "REALIZED_PNL_PLUS_COMMISSION_EX_FUNDING_BY_UTC_DAY_V1" &&
    value.day_basis === "UTC" &&
    value.funding_included === false &&
    value.trading_commission_included === true &&
    value.historical_bnb_commission_valuation === "CONTEMPORANEOUS_BNBUSDT_1M_CLOSE_ESTIMATE" &&
    value.live_commission_basis === "AUTHENTICATED_USDT_USDC_LEDGER_PAR" &&
    (value.freshness_ttl_seconds === 180 || value.freshness_ttl_seconds === 600) &&
    value.authority_classification === "PERFORMANCE_TELEMETRY_ONLY" &&
    value.external_action_permitted === false;
  if (!fixedValid) throw new Error("Unsupported trade-day win-rate telemetry contract");

  const generated = timestamp(value.generated_at_utc, "generated_at_utc");
  const observed = timestamp(value.observed_at_utc, "observed_at_utc");
  if (Date.parse(observed) > Date.parse(generated)) throw new Error("Trade-day win-rate timestamps are not chronological");

  const winning = nonNegativeInt(value.winning_trade_day_count, "winning_trade_day_count");
  const losing = nonNegativeInt(value.losing_trade_day_count, "losing_trade_day_count");
  const resolved = nonNegativeInt(value.resolved_trade_day_count, "resolved_trade_day_count");
  if (resolved !== winning + losing || resolved === 0) {
    throw new Error("Trade-day win-rate counts are inconsistent");
  }
  const rate = finiteNumber(value.win_rate_pct, "win_rate_pct");
  const expectedRate = (100 * winning) / resolved;
  if (Math.abs(rate - expectedRate) > 1e-10) {
    throw new Error("Trade-day win rate does not match counts");
  }
  if (typeof value.telemetry_sha256 !== "string" || !sha256.test(value.telemetry_sha256)) {
    throw new Error("Trade-day win-rate telemetry SHA-256 is invalid");
  }

  return {
    schema_version: 1,
    dataset_id: "binance_usdm_public_trade_day_win_rate_v1",
    generated_at_utc: generated,
    observed_at_utc: observed,
    coverage_start_utc: "2024-11-13",
    scope: "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V1",
    historical_base_through_utc: "2026-09-28",
    live_extension_start_utc: "2026-09-29T00:00:00Z",
    resolved_trade_day_count: resolved,
    winning_trade_day_count: winning,
    losing_trade_day_count: losing,
    win_rate_pct: rate,
    method: "REALIZED_PNL_PLUS_COMMISSION_EX_FUNDING_BY_UTC_DAY_V1",
    day_basis: "UTC",
    funding_included: false,
    trading_commission_included: true,
    historical_bnb_commission_valuation: "CONTEMPORANEOUS_BNBUSDT_1M_CLOSE_ESTIMATE",
    live_commission_basis: "AUTHENTICATED_USDT_USDC_LEDGER_PAR",
    freshness_ttl_seconds: value.freshness_ttl_seconds,
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

export function deriveBtcTradeDayWinRateFeedUrl(
  observatoryFeedUrl?: string,
  directFeedUrl?: string,
): string {
  const direct = validHttpsUrl(directFeedUrl);
  if (direct) return direct;
  const observatory = validHttpsUrl(observatoryFeedUrl);
  if (observatory) {
    const url = new URL(observatory);
    url.pathname = "/public/execution/trade-day-win-rate.json";
    return url.toString();
  }
  return DEFAULT_BTC_TRADE_DAY_WIN_RATE_FEED_URL;
}
