export type BinanceTradeDayOutcome = {
  date_utc: string;
  realized_pnl: number;
  commission: number;
  net_pnl: number;
  outcome: "WIN" | "LOSS";
};

export type BinanceCalendarTradeDayOutcome = {
  date_local: string;
  realized_pnl: number;
  commission: number;
  net_pnl: number;
  outcome: "WIN" | "LOSS";
};

export type BinanceTradeDayWinRateTelemetry = {
  schema_version: 1 | 2 | 3;
  dataset_id:
    | "binance_usdm_public_trade_day_win_rate_v1"
    | "binance_usdm_public_trade_day_win_rate_v2"
    | "binance_usdm_public_trade_day_win_rate_v3";
  generated_at_utc: string;
  observed_at_utc: string;
  coverage_start_utc: "2024-11-13";
  scope:
    | "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V1"
    | "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V2"
    | "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V3";
  historical_base_through_utc: "2026-09-28";
  live_extension_start_utc: "2026-09-29T00:00:00Z";
  days: BinanceTradeDayOutcome[];
  calendar_timezone: "Asia/Seoul" | null;
  calendar_extension_start_utc: "2026-09-28T15:00:00Z" | null;
  calendar_days: BinanceCalendarTradeDayOutcome[];
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
const utcDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const exactKeysV1 = [
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
const exactKeysV2 = [...exactKeysV1, "days"] as const;
const exactKeysV3 = [
  ...exactKeysV2,
  "calendar_timezone",
  "calendar_extension_start_utc",
  "calendar_days",
] as const;
const outcomeKeys = ["date_utc", "realized_pnl", "commission", "net_pnl", "outcome"] as const;
const calendarOutcomeKeys = ["date_local", "realized_pnl", "commission", "net_pnl", "outcome"] as const;

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
  const schemaVersion = value.schema_version;
  if (schemaVersion !== 1 && schemaVersion !== 2 && schemaVersion !== 3) {
    throw new Error("Unsupported trade-day win-rate schema version");
  }
  const keys = Object.keys(value).sort();
  const expected = [
    ...(schemaVersion === 3 ? exactKeysV3 : schemaVersion === 2 ? exactKeysV2 : exactKeysV1),
  ].sort();
  if (keys.length !== expected.length || keys.some((key, i) => key !== expected[i])) {
    throw new Error("Trade-day win-rate telemetry fields do not match contract");
  }

  const freshnessTtlSeconds = value.freshness_ttl_seconds;
  if (freshnessTtlSeconds !== 180 && freshnessTtlSeconds !== 600) {
    throw new Error("Unsupported trade-day win-rate freshness TTL");
  }

  const versionValid = schemaVersion === 1
    ? value.dataset_id === "binance_usdm_public_trade_day_win_rate_v1" &&
      value.scope === "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V1"
    : schemaVersion === 2
      ? value.dataset_id === "binance_usdm_public_trade_day_win_rate_v2" &&
        value.scope === "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V2"
      : value.dataset_id === "binance_usdm_public_trade_day_win_rate_v3" &&
        value.scope === "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V3";
  const fixedValid =
    versionValid &&
    value.coverage_start_utc === "2024-11-13" &&
    value.historical_base_through_utc === "2026-09-28" &&
    value.live_extension_start_utc === "2026-09-29T00:00:00Z" &&
    value.method === "REALIZED_PNL_PLUS_COMMISSION_EX_FUNDING_BY_UTC_DAY_V1" &&
    value.day_basis === "UTC" &&
    value.funding_included === false &&
    value.trading_commission_included === true &&
    value.historical_bnb_commission_valuation === "CONTEMPORANEOUS_BNBUSDT_1M_CLOSE_ESTIMATE" &&
    value.live_commission_basis === "AUTHENTICATED_USDT_USDC_LEDGER_PAR" &&
    value.authority_classification === "PERFORMANCE_TELEMETRY_ONLY" &&
    value.external_action_permitted === false;
  if (!fixedValid) throw new Error("Unsupported trade-day win-rate telemetry contract");
  if (
    schemaVersion === 3 &&
    (
      value.calendar_timezone !== "Asia/Seoul" ||
      value.calendar_extension_start_utc !== "2026-09-28T15:00:00Z"
    )
  ) {
    throw new Error("Unsupported trade-day calendar contract");
  }

  const generated = timestamp(value.generated_at_utc, "generated_at_utc");
  const observed = timestamp(value.observed_at_utc, "observed_at_utc");
  if (Date.parse(observed) > Date.parse(generated)) {
    throw new Error("Trade-day win-rate timestamps are not chronological");
  }

  const winning = nonNegativeInt(value.winning_trade_day_count, "winning_trade_day_count");
  const losing = nonNegativeInt(value.losing_trade_day_count, "losing_trade_day_count");
  const resolved = nonNegativeInt(value.resolved_trade_day_count, "resolved_trade_day_count");
  if (winning < 152 || losing < 70 || resolved !== winning + losing || resolved === 0) {
    throw new Error("Trade-day win-rate counts are inconsistent");
  }
  const rate = finiteNumber(value.win_rate_pct, "win_rate_pct");
  const expectedRate = (100 * winning) / resolved;
  if (Math.abs(rate - expectedRate) > 1e-10) {
    throw new Error("Trade-day win rate does not match counts");
  }

  const days: BinanceTradeDayOutcome[] = [];
  if (schemaVersion >= 2) {
    if (!Array.isArray(value.days)) throw new Error("Trade-day outcomes must be an array");
    let previousDate = "";
    for (const [index, item] of value.days.entries()) {
      if (!isRecord(item)) throw new Error(`days[${index}] must be an object`);
      const itemKeys = Object.keys(item).sort();
      const expectedItemKeys = [...outcomeKeys].sort();
      if (
        itemKeys.length !== expectedItemKeys.length ||
        itemKeys.some((key, i) => key !== expectedItemKeys[i])
      ) throw new Error(`days[${index}] fields do not match contract`);
      const dateUtc = item.date_utc;
      if (
        typeof dateUtc !== "string" ||
        !utcDatePattern.test(dateUtc) ||
        new Date(`${dateUtc}T00:00:00Z`).toISOString().slice(0, 10) !== dateUtc ||
        dateUtc < "2026-09-29" ||
        dateUtc > observed.slice(0, 10) ||
        (previousDate !== "" && dateUtc <= previousDate)
      ) throw new Error(`days[${index}].date_utc is invalid`);
      previousDate = dateUtc;
      const realizedPnl = finiteNumber(item.realized_pnl, `days[${index}].realized_pnl`);
      const commission = finiteNumber(item.commission, `days[${index}].commission`);
      const netPnl = finiteNumber(item.net_pnl, `days[${index}].net_pnl`);
      if (realizedPnl === 0 || netPnl === 0 || Math.abs(netPnl - (realizedPnl + commission)) > 1e-9) {
        throw new Error(`days[${index}] PnL components are inconsistent`);
      }
      if (
        (item.outcome !== "WIN" && item.outcome !== "LOSS") ||
        (netPnl > 0) !== (item.outcome === "WIN")
      ) throw new Error(`days[${index}].outcome is inconsistent`);
      days.push({ date_utc: dateUtc, realized_pnl: realizedPnl, commission, net_pnl: netPnl, outcome: item.outcome });
    }
    const liveWins = days.filter(day => day.outcome === "WIN").length;
    const liveLosses = days.length - liveWins;
    if (winning !== 152 + liveWins || losing !== 70 + liveLosses || resolved !== 222 + days.length) {
      throw new Error("Trade-day outcomes do not match aggregate counts");
    }
  }

  const calendarDays: BinanceCalendarTradeDayOutcome[] = [];
  if (schemaVersion === 3) {
    if (!Array.isArray(value.calendar_days)) throw new Error("Calendar trade-day outcomes must be an array");
    let previousLocalDate = "";
    const observedLocalDate = new Date(Date.parse(observed) + 9 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    for (const [index, item] of value.calendar_days.entries()) {
      if (!isRecord(item)) throw new Error(`calendar_days[${index}] must be an object`);
      const itemKeys = Object.keys(item).sort();
      const expectedItemKeys = [...calendarOutcomeKeys].sort();
      if (
        itemKeys.length !== expectedItemKeys.length ||
        itemKeys.some((key, i) => key !== expectedItemKeys[i])
      ) throw new Error(`calendar_days[${index}] fields do not match contract`);
      const dateLocal = item.date_local;
      const parsedLocal = typeof dateLocal === "string"
        ? new Date(`${dateLocal}T00:00:00+09:00`)
        : new Date(Number.NaN);
      const canonicalLocal = Number.isFinite(parsedLocal.getTime())
        ? new Date(parsedLocal.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10)
        : "";
      if (
        typeof dateLocal !== "string" ||
        !utcDatePattern.test(dateLocal) ||
        canonicalLocal !== dateLocal ||
        dateLocal < "2026-09-29" ||
        dateLocal > observedLocalDate ||
        (previousLocalDate !== "" && dateLocal <= previousLocalDate)
      ) throw new Error(`calendar_days[${index}].date_local is invalid`);
      previousLocalDate = dateLocal;
      const realizedPnl = finiteNumber(item.realized_pnl, `calendar_days[${index}].realized_pnl`);
      const commission = finiteNumber(item.commission, `calendar_days[${index}].commission`);
      const netPnl = finiteNumber(item.net_pnl, `calendar_days[${index}].net_pnl`);
      if (realizedPnl === 0 || netPnl === 0 || Math.abs(netPnl - (realizedPnl + commission)) > 1e-9) {
        throw new Error(`calendar_days[${index}] PnL components are inconsistent`);
      }
      if (
        (item.outcome !== "WIN" && item.outcome !== "LOSS") ||
        (netPnl > 0) !== (item.outcome === "WIN")
      ) throw new Error(`calendar_days[${index}].outcome is inconsistent`);
      calendarDays.push({
        date_local: dateLocal,
        realized_pnl: realizedPnl,
        commission,
        net_pnl: netPnl,
        outcome: item.outcome,
      });
    }
  }

  if (typeof value.telemetry_sha256 !== "string" || !sha256.test(value.telemetry_sha256)) {
    throw new Error("Trade-day win-rate telemetry SHA-256 is invalid");
  }

  return {
    schema_version: schemaVersion,
    dataset_id: schemaVersion === 3
      ? "binance_usdm_public_trade_day_win_rate_v3"
      : schemaVersion === 2
        ? "binance_usdm_public_trade_day_win_rate_v2"
        : "binance_usdm_public_trade_day_win_rate_v1",
    generated_at_utc: generated,
    observed_at_utc: observed,
    coverage_start_utc: "2024-11-13",
    scope: schemaVersion === 3
      ? "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V3"
      : schemaVersion === 2
        ? "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V2"
        : "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V1",
    historical_base_through_utc: "2026-09-28",
    live_extension_start_utc: "2026-09-29T00:00:00Z",
    days,
    calendar_timezone: schemaVersion === 3 ? "Asia/Seoul" : null,
    calendar_extension_start_utc: schemaVersion === 3 ? "2026-09-28T15:00:00Z" : null,
    calendar_days: calendarDays,
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
    freshness_ttl_seconds: freshnessTtlSeconds,
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
