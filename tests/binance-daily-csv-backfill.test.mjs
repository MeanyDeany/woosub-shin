import assert from "node:assert/strict";
import test from "node:test";

import {
  CSV_REALIZED_BACKFILL,
  CSV_REALIZED_BACKFILL_END,
  CSV_REALIZED_BACKFILL_START,
  CSV_REALIZED_BACKFILL_TOTAL,
  applyCsvRealizedBackfill,
} from "../lib/btc-daily-csv-backfill.ts";

const missing = (date_utc) => ({
  date_utc,
  status: "MISSING",
  start_observed_at_utc: null,
  end_observed_at_utc: null,
  actual_duration_seconds: null,
  net_pnl: null,
  return_pct: null,
});

test("CSV backfill has the frozen complete UTC export window and exact aggregate", () => {
  assert.equal(CSV_REALIZED_BACKFILL_START, "2024-11-15");
  assert.equal(CSV_REALIZED_BACKFILL_END, "2026-09-22");
  assert.equal(CSV_REALIZED_BACKFILL.length, 677);
  assert.equal(
    Number(CSV_REALIZED_BACKFILL.reduce((sum, day) => sum + day.net_pnl, 0).toFixed(8)),
    CSV_REALIZED_BACKFILL_TOTAL,
  );
  assert.equal(CSV_REALIZED_BACKFILL.find(day => day.date_utc === "2024-11-15")?.net_pnl, 1.42108361);
  assert.equal(CSV_REALIZED_BACKFILL.find(day => day.date_utc === "2024-11-21")?.partial, true);
  assert.equal(CSV_REALIZED_BACKFILL.find(day => day.date_utc === "2026-08-20")?.net_pnl, 177.90120133);
  assert.equal(CSV_REALIZED_BACKFILL.find(day => day.date_utc === "2026-09-03")?.net_pnl, -346.07868874);
  assert.equal(CSV_REALIZED_BACKFILL.find(day => day.date_utc === "2026-09-22")?.net_pnl, -9.3542512);
});

test("backfill prepends historical rows and replaces only MISSING ledger rows", () => {
  const closed = {
    date_utc: "2026-08-20",
    status: "CLOSED",
    start_observed_at_utc: "2026-08-20T00:00:00Z",
    end_observed_at_utc: "2026-08-21T00:00:00Z",
    actual_duration_seconds: 86400,
    net_pnl: 999,
    return_pct: 1,
  };
  const result = applyCsvRealizedBackfill([
    missing("2026-08-19"),
    closed,
    missing("2026-09-22"),
    missing("2026-09-23"),
  ]);
  assert.equal(result[0].date_utc, "2024-11-15");
  assert.equal(result[0].source, "CSV_REALIZED");
  const aug19=result.find(day=>day.date_utc==="2026-08-19");
  const aug20=result.find(day=>day.date_utc==="2026-08-20");
  const sep22=result.find(day=>day.date_utc==="2026-09-22");
  const sep23=result.find(day=>day.date_utc==="2026-09-23");
  assert.equal(aug19?.source, "CSV_REALIZED");
  assert.equal(aug20?.source, "LEDGER");
  assert.equal(aug20?.net_pnl, 999);
  assert.equal(sep22?.source, "CSV_REALIZED");
  assert.equal(sep22?.net_pnl, -9.3542512);
  assert.equal(sep23?.source, "LEDGER");
  assert.equal(sep23?.status, "MISSING");
});
