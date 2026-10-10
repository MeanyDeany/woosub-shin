export type BtcExternalWithdrawals = {
  schema_version: 1;
  dataset_id: "binance_public_external_withdrawals_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  coverage_start_utc: "2025-04-12T22:44:30Z";
  historical_base_through_utc: "2026-09-25T05:29:15Z";
  last_withdrawal_at_utc: string;
  completed_withdrawal_count: number;
  live_completed_withdrawal_count: number;
  live_market_valued_withdrawal_count: number;
  total_net_sent_usdt_equivalent_estimate: number;
  withdrawal_fee_usdt_equivalent_estimate: number;
  total_account_outflow_usdt_equivalent_estimate: number;
  valuation_label: "HISTORICAL_USDT_EQUIVALENT_ESTIMATE";
  live_valuation_method: "STABLECOIN_PAR_OTHER_ASSETS_APPLY_TIME_1M_CLOSE_ESTIMATE";
  freshness_ttl_seconds: 900;
  external_action_permitted: false;
  telemetry_sha256: string;
};

const fields = ["schema_version", "dataset_id", "generated_at_utc", "observed_at_utc", "coverage_start_utc", "historical_base_through_utc", "last_withdrawal_at_utc", "completed_withdrawal_count", "live_completed_withdrawal_count", "live_market_valued_withdrawal_count", "total_net_sent_usdt_equivalent_estimate", "withdrawal_fee_usdt_equivalent_estimate", "total_account_outflow_usdt_equivalent_estimate", "valuation_label", "live_valuation_method", "freshness_ttl_seconds", "external_action_permitted", "telemetry_sha256"].sort();

export function deriveBtcExternalWithdrawalsFeedUrl(performanceFeedUrl: string): string {
  try {
    const url = new URL(performanceFeedUrl);
    if (url.protocol !== "https:" || url.username || url.password) throw new Error("Invalid origin");
    url.pathname = "/public/execution/external-withdrawals.json";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return "https://btc-data.meanydeany.com/public/execution/external-withdrawals.json";
  }
}

export function parseBtcExternalWithdrawals(value: unknown): BtcExternalWithdrawals {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("Withdrawal telemetry must be an object");
  const row = value as Record<string, unknown>;
  const keys = Object.keys(row).sort();
  if (keys.length !== fields.length || keys.some((key, index) => key !== fields[index])) throw new Error("Withdrawal fields do not match the public contract");
  if (row.schema_version !== 1 || row.dataset_id !== "binance_public_external_withdrawals_v1" || row.coverage_start_utc !== "2025-04-12T22:44:30Z" || row.historical_base_through_utc !== "2026-09-25T05:29:15Z" || row.valuation_label !== "HISTORICAL_USDT_EQUIVALENT_ESTIMATE" || row.live_valuation_method !== "STABLECOIN_PAR_OTHER_ASSETS_APPLY_TIME_1M_CLOSE_ESTIMATE" || row.freshness_ttl_seconds !== 900 || row.external_action_permitted !== false || typeof row.telemetry_sha256 !== "string" || !/^[a-f0-9]{64}$/.test(row.telemetry_sha256)) throw new Error("Unsupported withdrawal contract");
  for (const field of ["generated_at_utc", "observed_at_utc", "last_withdrawal_at_utc"]) {
    const text = row[field];
    if (typeof text !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/.test(text) || !Number.isFinite(Date.parse(text))) throw new Error("Invalid withdrawal timestamp");
  }
  if (Date.parse(row.generated_at_utc as string) < Date.parse(row.observed_at_utc as string) || Date.parse(row.last_withdrawal_at_utc as string) > Date.parse(row.observed_at_utc as string) || Date.parse(row.last_withdrawal_at_utc as string) < Date.parse(row.historical_base_through_utc as string)) throw new Error("Withdrawal timestamps are not chronological");
  for (const field of ["completed_withdrawal_count", "live_completed_withdrawal_count", "live_market_valued_withdrawal_count"]) {
    if (typeof row[field] !== "number" || !Number.isSafeInteger(row[field]) || row[field] < 0) throw new Error("Invalid withdrawal count");
  }
  if (row.completed_withdrawal_count !== 24 + (row.live_completed_withdrawal_count as number) || (row.live_market_valued_withdrawal_count as number) > (row.live_completed_withdrawal_count as number)) throw new Error("Withdrawal counts are inconsistent");
  for (const field of ["total_net_sent_usdt_equivalent_estimate", "withdrawal_fee_usdt_equivalent_estimate", "total_account_outflow_usdt_equivalent_estimate"]) {
    if (typeof row[field] !== "number" || !Number.isFinite(row[field]) || row[field] < 0) throw new Error("Invalid withdrawal amount");
  }
  if (Math.abs((row.total_net_sent_usdt_equivalent_estimate as number) + (row.withdrawal_fee_usdt_equivalent_estimate as number) - (row.total_account_outflow_usdt_equivalent_estimate as number)) > 0.000001) throw new Error("Withdrawal totals are inconsistent");
  return row as BtcExternalWithdrawals;
}
