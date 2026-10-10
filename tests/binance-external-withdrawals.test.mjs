import assert from "node:assert/strict";
import test from "node:test";
import { deriveBtcExternalWithdrawalsFeedUrl, parseBtcExternalWithdrawals } from "../lib/btc-external-withdrawals.ts";

// Synthetic fixtures exercise the live contract without making private requests.
export const fixture = () => ({
  schema_version: 1,
  dataset_id: "binance_public_external_withdrawals_v1",
  generated_at_utc: "2026-10-10T08:30:01Z",
  observed_at_utc: "2026-10-10T08:30:00Z",
  coverage_start_utc: "2025-04-12T22:44:30Z",
  historical_base_through_utc: "2026-09-25T05:29:15Z",
  last_withdrawal_at_utc: "2026-10-10T08:15:34Z",
  completed_withdrawal_count: 25,
  live_completed_withdrawal_count: 1,
  live_market_valued_withdrawal_count: 0,
  total_net_sent_usdt_equivalent_estimate: 5972.60577308,
  withdrawal_fee_usdt_equivalent_estimate: 10.26783582,
  total_account_outflow_usdt_equivalent_estimate: 5982.8736089,
  valuation_label: "HISTORICAL_USDT_EQUIVALENT_ESTIMATE",
  live_valuation_method: "STABLECOIN_PAR_OTHER_ASSETS_APPLY_TIME_1M_CLOSE_ESTIMATE",
  freshness_ttl_seconds: 900,
  external_action_permitted: false,
  telemetry_sha256: "a".repeat(64),
});

test("completed live withdrawals extend the historical estimate", () => {
  const row = parseBtcExternalWithdrawals(fixture());
  assert.equal(row.completed_withdrawal_count, 25);
  assert.equal(row.total_account_outflow_usdt_equivalent_estimate.toFixed(2), "5982.87");
});
test("rejects leaked private fields, mismatched counts, totals and authority", () => {
  for (const patch of [{ address: "private" }, { txId: "private" }, { completed_withdrawal_count: 26 }, { live_market_valued_withdrawal_count: 2 }, { total_account_outflow_usdt_equivalent_estimate: 10 }, { external_action_permitted: true }, { withdrawal_fee_usdt_equivalent_estimate: "10.26" }, { completed_withdrawal_count: true }, { freshness_ttl_seconds: 0 }, { last_withdrawal_at_utc: "2026-10-11T00:00:00Z" }]) assert.throws(() => parseBtcExternalWithdrawals({ ...fixture(), ...patch }));
});
test("derives the feed from the current source without query parameters", () => {
  assert.equal(deriveBtcExternalWithdrawalsFeedUrl("https://data.example/public/execution/lifetime-performance.json?x=1#hash"), "https://data.example/public/execution/external-withdrawals.json");
  assert.equal(deriveBtcExternalWithdrawalsFeedUrl("http://invalid"), "https://btc-data.meanydeany.com/public/execution/external-withdrawals.json");
});
