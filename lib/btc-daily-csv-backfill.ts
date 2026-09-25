/**
 * Historical Binance USD-M realized-cash PnL fallback for public calendar gaps.
 *
 * Source: user-provided Binance Futures Transaction History CSV exported in UTC+09:00.
 * Complete UTC window: 2026-08-01 through 2026-09-22. The export is incomplete
 * for 2026-09-23 UTC, so later dates are intentionally excluded.
 *
 * net_pnl = REALIZED_PNL + FUNDING_FEE + COMMISSION.
 * TRANSFER rows are neutral capital flows and are excluded.
 *
 * This is not mark-to-market daily PnL. It is shown only when the authenticated
 * daily ledger row is MISSING, and daily return remains unavailable.
 */

import type { BinanceDailyPerformanceDay } from "@/lib/btc-daily-performance";

export type CsvRealizedBackfillDay = {
  date_utc: string;
  net_pnl: number;
};

export type CalendarPerformanceDay =
  | (BinanceDailyPerformanceDay & { source: "LEDGER" })
  | {
      date_utc: string;
      status: "CSV_REALIZED";
      start_observed_at_utc: null;
      end_observed_at_utc: null;
      actual_duration_seconds: null;
      net_pnl: number;
      return_pct: null;
      source: "CSV_REALIZED";
    };

export const CSV_REALIZED_BACKFILL_START = "2026-08-01";
export const CSV_REALIZED_BACKFILL_END = "2026-09-22";
export const CSV_REALIZED_BACKFILL_TOTAL = 507.70742529;

export const CSV_REALIZED_BACKFILL: readonly CsvRealizedBackfillDay[] = [
  {
    "date_utc": "2026-08-01",
    "net_pnl": -0.47382238
  },
  {
    "date_utc": "2026-08-02",
    "net_pnl": -1.11656961
  },
  {
    "date_utc": "2026-08-03",
    "net_pnl": -0.85711787
  },
  {
    "date_utc": "2026-08-04",
    "net_pnl": -1.30918351
  },
  {
    "date_utc": "2026-08-05",
    "net_pnl": -1.02462832
  },
  {
    "date_utc": "2026-08-06",
    "net_pnl": -0.96326695
  },
  {
    "date_utc": "2026-08-07",
    "net_pnl": -0.5130977
  },
  {
    "date_utc": "2026-08-08",
    "net_pnl": -0.1434256
  },
  {
    "date_utc": "2026-08-09",
    "net_pnl": -0.28730069
  },
  {
    "date_utc": "2026-08-10",
    "net_pnl": -1.02863917
  },
  {
    "date_utc": "2026-08-11",
    "net_pnl": -1.04871229
  },
  {
    "date_utc": "2026-08-12",
    "net_pnl": -1.28320076
  },
  {
    "date_utc": "2026-08-13",
    "net_pnl": -1.42087629
  },
  {
    "date_utc": "2026-08-14",
    "net_pnl": -1.34676671
  },
  {
    "date_utc": "2026-08-15",
    "net_pnl": -1.18991718
  },
  {
    "date_utc": "2026-08-16",
    "net_pnl": -0.60902824
  },
  {
    "date_utc": "2026-08-17",
    "net_pnl": -1.45586878
  },
  {
    "date_utc": "2026-08-18",
    "net_pnl": -1.20563449
  },
  {
    "date_utc": "2026-08-19",
    "net_pnl": -1.08195876
  },
  {
    "date_utc": "2026-08-20",
    "net_pnl": 177.90120133
  },
  {
    "date_utc": "2026-08-21",
    "net_pnl": -0.36279535
  },
  {
    "date_utc": "2026-08-22",
    "net_pnl": -1.10186523
  },
  {
    "date_utc": "2026-08-23",
    "net_pnl": -1.2428772
  },
  {
    "date_utc": "2026-08-24",
    "net_pnl": -1.04421014
  },
  {
    "date_utc": "2026-08-25",
    "net_pnl": 158.19053664
  },
  {
    "date_utc": "2026-08-26",
    "net_pnl": -0.74807179
  },
  {
    "date_utc": "2026-08-27",
    "net_pnl": 86.5992276
  },
  {
    "date_utc": "2026-08-28",
    "net_pnl": 71.258
  },
  {
    "date_utc": "2026-08-29",
    "net_pnl": 0
  },
  {
    "date_utc": "2026-08-30",
    "net_pnl": 0
  },
  {
    "date_utc": "2026-08-31",
    "net_pnl": 0.59769088
  },
  {
    "date_utc": "2026-09-01",
    "net_pnl": 87.30520511
  },
  {
    "date_utc": "2026-09-02",
    "net_pnl": 59.39946806
  },
  {
    "date_utc": "2026-09-03",
    "net_pnl": -346.07868874
  },
  {
    "date_utc": "2026-09-04",
    "net_pnl": 0.0211803
  },
  {
    "date_utc": "2026-09-05",
    "net_pnl": 0.595402
  },
  {
    "date_utc": "2026-09-06",
    "net_pnl": -0.91552612
  },
  {
    "date_utc": "2026-09-07",
    "net_pnl": -0.41093996
  },
  {
    "date_utc": "2026-09-08",
    "net_pnl": -1.28464511
  },
  {
    "date_utc": "2026-09-09",
    "net_pnl": -2.44376593
  },
  {
    "date_utc": "2026-09-10",
    "net_pnl": -1.48548776
  },
  {
    "date_utc": "2026-09-11",
    "net_pnl": -1.85427248
  },
  {
    "date_utc": "2026-09-12",
    "net_pnl": -1.11342031
  },
  {
    "date_utc": "2026-09-13",
    "net_pnl": -2.32651791
  },
  {
    "date_utc": "2026-09-14",
    "net_pnl": -2.64189062
  },
  {
    "date_utc": "2026-09-15",
    "net_pnl": -1.35459686
  },
  {
    "date_utc": "2026-09-16",
    "net_pnl": -4.36708417
  },
  {
    "date_utc": "2026-09-17",
    "net_pnl": -3.87531392
  },
  {
    "date_utc": "2026-09-18",
    "net_pnl": 268.20474947
  },
  {
    "date_utc": "2026-09-19",
    "net_pnl": 0
  },
  {
    "date_utc": "2026-09-20",
    "net_pnl": 0
  },
  {
    "date_utc": "2026-09-21",
    "net_pnl": 0
  },
  {
    "date_utc": "2026-09-22",
    "net_pnl": -9.3542512
  }
] as const;

const byDate = new Map(CSV_REALIZED_BACKFILL.map(day => [day.date_utc, day.net_pnl]));

export function applyCsvRealizedBackfill(days: readonly BinanceDailyPerformanceDay[]): CalendarPerformanceDay[] {
  return days.map(day => {
    if (day.status !== "MISSING") return { ...day, source: "LEDGER" as const };
    const net = byDate.get(day.date_utc);
    if (net === undefined) return { ...day, source: "LEDGER" as const };
    return {
      date_utc: day.date_utc,
      status: "CSV_REALIZED" as const,
      start_observed_at_utc: null,
      end_observed_at_utc: null,
      actual_duration_seconds: null,
      net_pnl: net,
      return_pct: null,
      source: "CSV_REALIZED" as const,
    };
  });
}
