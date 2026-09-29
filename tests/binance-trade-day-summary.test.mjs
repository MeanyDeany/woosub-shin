import assert from "node:assert/strict";
import test from "node:test";
import { BINANCE_TRADE_DAY_SUMMARY as s } from "../lib/binance-trade-day-summary.ts";

test("trade-day win-rate summary is internally consistent", () => {
  assert.equal(s.active_trade_day_count, 286);
  assert.equal(s.resolved_trade_day_count, 222);
  assert.equal(s.winning_trade_day_count, 152);
  assert.equal(s.losing_trade_day_count, 70);
  assert.equal(s.unresolved_or_flat_trade_day_count, 64);
  assert.equal(
    s.winning_trade_day_count + s.losing_trade_day_count,
    s.resolved_trade_day_count,
  );
  assert.equal(
    s.resolved_trade_day_count + s.unresolved_or_flat_trade_day_count,
    s.active_trade_day_count,
  );
  assert.equal(
    Number(
      (
        (100 * s.winning_trade_day_count) /
        (s.winning_trade_day_count + s.losing_trade_day_count)
      ).toFixed(12),
    ),
    Number(s.win_rate_pct_estimate.toFixed(12)),
  );
  assert.equal(s.funding_included, false);
  assert.equal(s.trading_commission_included, true);
  assert.equal(s.day_basis, "UTC");
});
