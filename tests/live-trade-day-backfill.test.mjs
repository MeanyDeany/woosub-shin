import assert from "node:assert/strict";
import test from "node:test";

import { applyLiveCashDayFallback } from "../lib/btc-live-trade-day-backfill.ts";

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

const cash = (date_utc, net_pnl = -0.43) => ({
  date_utc,
  realized_pnl: 0,
  commission: 0,
  funding_fee: net_pnl,
  net_pnl,
});

test("replaces only missing ledger days with authenticated net cash", () => {
  const result = applyLiveCashDayFallback(
    [missing("2026-09-29")],
    [cash("2026-09-29", -0.4329135)],
  );
  assert.deepEqual(result[0], {
    date_utc: "2026-09-29",
    status: "LIVE_CASH",
    start_observed_at_utc: null,
    end_observed_at_utc: null,
    actual_duration_seconds: null,
    net_pnl: -0.4329135,
    return_pct: null,
    flow_adjusted_net_pnl: null,
    flow_adjusted_return_pct: null,
    source: "LIVE_CASH",
    realized_pnl: 0,
    commission: 0,
    funding_fee: -0.4329135,
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
  const result = applyLiveCashDayFallback(
    [closed],
    [cash("2026-09-30", 86.38276781)],
  );
  assert.equal(result[0].source, "LEDGER");
  assert.equal(result[0].net_pnl, -4);
});

test("adds an absent cash day and preserves zero", () => {
  const result = applyLiveCashDayFallback(
    [missing("2026-10-01")],
    [cash("2026-09-30", 0)],
  );
  assert.deepEqual(result.map(day => day.date_utc), ["2026-09-30", "2026-10-01"]);
  assert.equal(result[0].source, "LIVE_CASH");
  assert.equal(result[0].net_pnl, 0);
  assert.equal(result[1].source, "LEDGER");
});
