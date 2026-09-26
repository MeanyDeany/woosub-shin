import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { CSV_REALIZED_BACKFILL, applyCsvRealizedBackfill } from "../lib/btc-daily-csv-backfill.ts";

// Locks already-public aggregates. Independent source-excerpt calculations were
// performed separately; this test does not claim a complete exchange audit.
test("sample-checked historical cash aggregates remain unchanged", () => {
  const expected = new Map([["2024-11-15", 1.42108361], ["2024-11-17", 1.14704573], ["2026-08-01", -0.47382238], ["2026-09-22", -9.3542512]]);
  for (const [date, value] of expected) assert.equal(CSV_REALIZED_BACKFILL.find(day => day.date_utc === date)?.net_pnl, value);
});

test("cash subtotal never overrides a measured mark-to-market ledger day", () => {
  const day = { date_utc: "2026-08-01", status: "CLOSED", start_observed_at_utc: "2026-08-01T00:00:00Z", end_observed_at_utc: "2026-08-02T00:00:00Z", actual_duration_seconds: 86400, net_pnl: 123.45, return_pct: 1.2 };
  const actual = applyCsvRealizedBackfill([day]).find(row => row.date_utc === day.date_utc);
  assert.equal(actual.source, "LEDGER");
  assert.equal(actual.net_pnl, day.net_pnl);
  assert.equal(actual.return_pct, day.return_pct);
  const historical = applyCsvRealizedBackfill([]).find(row => row.date_utc === day.date_utc);
  assert.equal(historical.return_pct, null);
  assert.notEqual(historical.net_pnl, actual.net_pnl);
});

test("known unsupported activity retains its partial-day classification", () => {
  const row = CSV_REALIZED_BACKFILL.find(day => day.date_utc === "2024-11-30");
  assert.equal(row.partial, true);
  assert.equal(row.ambiguous_event_count, 1);
  assert.equal(row.unsupported_performance_event_count, 14);
});

test("both public account routes expose the same accounting guide", () => {
  for (const file of ["app/trading/page.tsx", "app/projects/btc-futures-research/live-position/page.tsx"]) {
    assert.match(fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), /<TradingAccountingGuide \/>/);
  }
  const guide = fs.readFileSync(new URL("../components/trading-accounting-guide.tsx", import.meta.url), "utf8");
  for (const phrase of ["not complete Binance account PnL", "09:00 to 09:00", "Non-BTC performance", "INSURANCE_CLEAR", "changes in unrealized PnL", "private notes never change"]) assert.ok(guide.includes(phrase), phrase);
});
