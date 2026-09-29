import assert from "node:assert/strict";
import test from "node:test";
import {
  deriveBtcTradeDayWinRateFeedUrl,
  parseBtcTradeDayWinRateTelemetry,
} from "../lib/btc-trade-day-win-rate.ts";
import {
  deriveBtcExternalWithdrawalSummaryFeedUrl,
  parseBtcExternalWithdrawalSummaryTelemetry,
} from "../lib/btc-live-withdrawal-summary.ts";

const SHA = "a".repeat(64);

function winRate(overrides = {}) {
  return {
    schema_version: 1,
    dataset_id: "binance_usdm_public_trade_day_win_rate_v1",
    generated_at_utc: "2026-09-29T12:00:01Z",
    observed_at_utc: "2026-09-29T12:00:00Z",
    coverage_start_utc: "2024-11-13",
    scope: "BINANCE_USDM_ACCOUNT_WIDE_TRADE_DAY_WIN_RATE_V1",
    historical_base_through_utc: "2026-09-28",
    live_extension_start_utc: "2026-09-29T00:00:00Z",
    resolved_trade_day_count: 223,
    winning_trade_day_count: 153,
    losing_trade_day_count: 70,
    win_rate_pct: (100 * 153) / 223,
    method: "REALIZED_PNL_PLUS_COMMISSION_EX_FUNDING_BY_UTC_DAY_V1",
    day_basis: "UTC",
    funding_included: false,
    trading_commission_included: true,
    historical_bnb_commission_valuation: "CONTEMPORANEOUS_BNBUSDT_1M_CLOSE_ESTIMATE",
    live_commission_basis: "AUTHENTICATED_USDT_USDC_LEDGER_PAR",
    freshness_ttl_seconds: 180,
    authority_classification: "PERFORMANCE_TELEMETRY_ONLY",
    external_action_permitted: false,
    telemetry_sha256: SHA,
    ...overrides,
  };
}

function withdrawal(overrides = {}) {
  return {
    schema_version: 1,
    dataset_id: "binance_public_external_withdrawal_summary_v1",
    generated_at_utc: "2026-09-29T12:00:01Z",
    observed_at_utc: "2026-09-29T12:00:00Z",
    coverage_start_utc: "2025-04-12T22:44:30Z",
    historical_base_through_utc: "2026-09-25T23:59:59Z",
    live_extension_start_utc: "2026-09-26T00:00:00Z",
    completed_withdrawal_count: 25,
    historical_completed_withdrawal_count: 24,
    live_completed_withdrawal_count: 1,
    total_net_sent_usdt_equivalent_estimate: 6032.50577308,
    withdrawal_fee_usdt_equivalent_estimate: 10.36783582,
    total_account_outflow_usdt_equivalent_estimate: 6042.8736089,
    historical_valuation_method:
      "DEDICATED_EXPORT_STABLECOIN_PAR_PLUS_TRANSACTION_IMPLIED_XRP_USDT_V1",
    live_valuation_method:
      "STABLECOIN_PAR_OR_BINANCE_SPOT_1M_CLOSE_AT_APPLY_TIME_V1",
    valuation_label: "HISTORICAL_PLUS_LIVE_USDT_EQUIVALENT_ESTIMATE",
    freshness_ttl_seconds: 600,
    authority_classification: "PERFORMANCE_TELEMETRY_ONLY",
    external_action_permitted: false,
    telemetry_sha256: SHA,
    ...overrides,
  };
}

test("accepts live trade-day win-rate telemetry", () => {
  const parsed = parseBtcTradeDayWinRateTelemetry(winRate());
  assert.equal(parsed.win_rate_pct, (100 * 153) / 223);
  assert.equal(parsed.winning_trade_day_count, 153);
  assert.equal(parsed.losing_trade_day_count, 70);
  assert.equal(parsed.funding_included, false);
});

test("rejects inconsistent trade-day win-rate counts", () => {
  assert.throws(() =>
    parseBtcTradeDayWinRateTelemetry(winRate({ resolved_trade_day_count: 999 })),
  );
});

test("accepts live historical-plus-current withdrawal summary", () => {
  const parsed = parseBtcExternalWithdrawalSummaryTelemetry(withdrawal());
  assert.equal(parsed.completed_withdrawal_count, 25);
  assert.equal(parsed.live_completed_withdrawal_count, 1);
  assert.equal(parsed.total_account_outflow_usdt_equivalent_estimate, 6042.8736089);
});

test("rejects inconsistent withdrawal totals", () => {
  assert.throws(() =>
    parseBtcExternalWithdrawalSummaryTelemetry(
      withdrawal({ total_account_outflow_usdt_equivalent_estimate: 1 }),
    ),
  );
});

test("derives both auxiliary feeds from the observatory origin", () => {
  assert.equal(
    deriveBtcTradeDayWinRateFeedUrl("https://btc-data.meanydeany.com/base.json"),
    "https://btc-data.meanydeany.com/public/execution/trade-day-win-rate.json",
  );
  assert.equal(
    deriveBtcExternalWithdrawalSummaryFeedUrl("https://btc-data.meanydeany.com/base.json"),
    "https://btc-data.meanydeany.com/public/execution/external-withdrawals.json",
  );
});
