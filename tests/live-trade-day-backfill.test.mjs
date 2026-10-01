import assert from "node:assert/strict";
import test from "node:test";

import { applyLiveTradeDayFallback } from "../lib/btc-live-trade-day-backfill.ts";

const missing = (date_utc) => ({
  date_utc,
  status: "MISSING",
  start_observed_at_utc: null,
  end_observed_at_utc: null,
  actual_duration_seconds: null,
  net_pnl: null,
  return_pct: null,
  flow_adjusted_net_pnl: null,
  flow_adjusted_return_pct: null,
  source: "LEDGER",
});

const outcome = (date_utc, net_pnl = 9) => ({
  date_utc,
  realized_pnl: 10,
  commission: net_pnl - 10,
  net_pnl,
  outcome: net_pnl > 0 ? "WIN" : "LOSS",
});

test("replaces only missing ledger days with authenticated realized cash", () => {
  const result = applyLiveTradeDayFallback(
    [missing("2026-09-30")],
    [outcome("2026-09-30")],
  );
  assert.deepEqual(result[0], {
    date_utc: "2026-09-30",
    status: "LIVE_REALIZED",
    start_observed_at_utc: null,
    end_observed_at_utc: null,
    actual_duration_seconds: null,
    net_pnl: 9,
    return_pct: null,
    flow_adjusted_net_pnl: null,
    flow_adjusted_return_pct: null,
    source: "LIVE_REALIZED",
    realized_pnl: 10,
    commission: -1,
    outcome: "WIN",
  });
});

test("never overwrites measured ledger days", () => {
  const closed = {
    ...missing("2026-09-30"),
    status: "CLOSED",
    start_observed_at_utc: "2026-09-29T23:55:00Z",
    end_observed_at_utc: "2026-09-30T23:55:00Z",
    actual_duration_seconds: 86400,
    net_pnl: -4,
    return_pct: -0.1,
    flow_adjusted_net_pnl: -5,
    flow_adjusted_return_pct: -0.12,
  };
  const result = applyLiveTradeDayFallback([closed], [outcome("2026-09-30")]);
  assert.equal(result[0].source, "LEDGER");
  assert.equal(result[0].net_pnl, -4);
});

test("adds an absent live day and keeps chronological order", () => {
  const result = applyLiveTradeDayFallback(
    [missing("2026-10-01")],
    [outcome("2026-09-30")],
  );
  assert.deepEqual(result.map(day => day.date_utc), ["2026-09-30", "2026-10-01"]);
  assert.equal(result[0].source, "LIVE_REALIZED");
  assert.equal(result[1].source, "LEDGER");
});
