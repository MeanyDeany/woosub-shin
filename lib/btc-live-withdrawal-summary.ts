export type BinanceExternalWithdrawalSummaryTelemetry = {
  schema_version: 1;
  dataset_id: "binance_public_external_withdrawal_summary_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  coverage_start_utc: "2025-04-12T22:44:30Z";
  historical_base_through_utc: "2026-09-25T23:59:59Z";
  live_extension_start_utc: "2026-09-26T00:00:00Z";
  completed_withdrawal_count: number;
  historical_completed_withdrawal_count: 24;
  live_completed_withdrawal_count: number;
  total_net_sent_usdt_equivalent_estimate: number;
  withdrawal_fee_usdt_equivalent_estimate: number;
  total_account_outflow_usdt_equivalent_estimate: number;
  historical_valuation_method:
    "DEDICATED_EXPORT_STABLECOIN_PAR_PLUS_TRANSACTION_IMPLIED_XRP_USDT_V1";
  live_valuation_method:
    "STABLECOIN_PAR_OR_BINANCE_SPOT_1M_CLOSE_AT_APPLY_TIME_V1";
  valuation_label: "HISTORICAL_PLUS_LIVE_USDT_EQUIVALENT_ESTIMATE";
  freshness_ttl_seconds: 600;
  authority_classification: "PERFORMANCE_TELEMETRY_ONLY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_WITHDRAWAL_SUMMARY_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/external-withdrawals.json";

const sha256 = /^[0-9a-f]{64}$/;
const utcTimestampPattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;
const topKeys = [
  "schema_version",
  "dataset_id",
  "generated_at_utc",
  "observed_at_utc",
  "coverage_start_utc",
  "historical_base_through_utc",
  "live_extension_start_utc",
  "completed_withdrawal_count",
  "historical_completed_withdrawal_count",
  "live_completed_withdrawal_count",
  "total_net_sent_usdt_equivalent_estimate",
  "withdrawal_fee_usdt_equivalent_estimate",
  "total_account_outflow_usdt_equivalent_estimate",
  "historical_valuation_method",
  "live_valuation_method",
  "valuation_label",
  "freshness_ttl_seconds",
  "authority_classification",
  "external_action_permitted",
  "telemetry_sha256",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactKeys(value: Record<string, unknown>) {
  const actual = Object.keys(value).sort();
  const expected = [...topKeys].sort();
  if (
    actual.length !== expected.length ||
    actual.some((key, index) => key !== expected[index])
  ) {
    throw new Error("Withdrawal summary fields do not match contract");
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

function finiteNonNegative(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new Error(`${field} must be a finite non-negative number`);
  }
  return value;
}

function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${field} must be a non-negative integer`);
  }
  return value;
}

export function parseBtcExternalWithdrawalSummaryTelemetry(
  value: unknown,
): BinanceExternalWithdrawalSummaryTelemetry {
  if (!isRecord(value)) throw new Error("Withdrawal summary telemetry must be an object");
  exactKeys(value);

  if (
    value.schema_version !== 1 ||
    value.dataset_id !== "binance_public_external_withdrawal_summary_v1" ||
    value.coverage_start_utc !== "2025-04-12T22:44:30Z" ||
    value.historical_base_through_utc !== "2026-09-25T23:59:59Z" ||
    value.live_extension_start_utc !== "2026-09-26T00:00:00Z" ||
    value.historical_completed_withdrawal_count !== 24 ||
    value.historical_valuation_method !==
      "DEDICATED_EXPORT_STABLECOIN_PAR_PLUS_TRANSACTION_IMPLIED_XRP_USDT_V1" ||
    value.live_valuation_method !==
      "STABLECOIN_PAR_OR_BINANCE_SPOT_1M_CLOSE_AT_APPLY_TIME_V1" ||
    value.valuation_label !== "HISTORICAL_PLUS_LIVE_USDT_EQUIVALENT_ESTIMATE" ||
    value.freshness_ttl_seconds !== 600 ||
    value.authority_classification !== "PERFORMANCE_TELEMETRY_ONLY" ||
    value.external_action_permitted !== false
  ) {
    throw new Error("Unsupported withdrawal summary contract");
  }

  const generated = timestamp(value.generated_at_utc, "generated_at_utc");
  const observed = timestamp(value.observed_at_utc, "observed_at_utc");
  if (Date.parse(observed) > Date.parse(generated)) {
    throw new Error("Withdrawal summary timestamps are not chronological");
  }

  const historical = count(
    value.historical_completed_withdrawal_count,
    "historical_completed_withdrawal_count",
  );
  const live = count(value.live_completed_withdrawal_count, "live_completed_withdrawal_count");
  const total = count(value.completed_withdrawal_count, "completed_withdrawal_count");
  if (total !== historical + live) {
    throw new Error("Withdrawal counts do not reconcile");
  }

  const net = finiteNonNegative(
    value.total_net_sent_usdt_equivalent_estimate,
    "total_net_sent_usdt_equivalent_estimate",
  );
  const fee = finiteNonNegative(
    value.withdrawal_fee_usdt_equivalent_estimate,
    "withdrawal_fee_usdt_equivalent_estimate",
  );
  const outflow = finiteNonNegative(
    value.total_account_outflow_usdt_equivalent_estimate,
    "total_account_outflow_usdt_equivalent_estimate",
  );
  if (Math.abs(net + fee - outflow) > 1e-7) {
    throw new Error("Withdrawal totals do not reconcile");
  }

  if (typeof value.telemetry_sha256 !== "string" || !sha256.test(value.telemetry_sha256)) {
    throw new Error("Withdrawal summary telemetry SHA-256 is invalid");
  }

  return {
    schema_version: 1,
    dataset_id: "binance_public_external_withdrawal_summary_v1",
    generated_at_utc: generated,
    observed_at_utc: observed,
    coverage_start_utc: "2025-04-12T22:44:30Z",
    historical_base_through_utc: "2026-09-25T23:59:59Z",
    live_extension_start_utc: "2026-09-26T00:00:00Z",
    completed_withdrawal_count: total,
    historical_completed_withdrawal_count: 24,
    live_completed_withdrawal_count: live,
    total_net_sent_usdt_equivalent_estimate: net,
    withdrawal_fee_usdt_equivalent_estimate: fee,
    total_account_outflow_usdt_equivalent_estimate: outflow,
    historical_valuation_method:
      "DEDICATED_EXPORT_STABLECOIN_PAR_PLUS_TRANSACTION_IMPLIED_XRP_USDT_V1",
    live_valuation_method:
      "STABLECOIN_PAR_OR_BINANCE_SPOT_1M_CLOSE_AT_APPLY_TIME_V1",
    valuation_label: "HISTORICAL_PLUS_LIVE_USDT_EQUIVALENT_ESTIMATE",
    freshness_ttl_seconds: 600,
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

export function deriveBtcExternalWithdrawalSummaryFeedUrl(
  observatoryFeedUrl?: string,
  directFeedUrl?: string,
): string {
  const direct = validHttpsUrl(directFeedUrl);
  if (direct) return direct;
  const observatory = validHttpsUrl(observatoryFeedUrl);
  if (observatory) {
    const url = new URL(observatory);
    url.pathname = "/public/execution/external-withdrawals.json";
    return url.toString();
  }
  return DEFAULT_BTC_WITHDRAWAL_SUMMARY_FEED_URL;
}
