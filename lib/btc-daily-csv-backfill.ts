/**
 * Historical Binance USD-M stablecoin realized-cash PnL for the public calendar.
 *
 * Sources:
 * - Binance Futures Transaction History export ending 2025-11-14 (UTC+09:00)
 * - Binance Futures Transaction History export through 2026-09-24 local time (UTC+09:00)
 *
 * Complete UTC window: 2024-11-15 through 2026-09-22. The second export is
 * incomplete for 2026-09-23 UTC, so later dates are intentionally excluded.
 *
 * For supported BTCUSDT/BTCUSDC rows:
 * net_pnl = REALIZED_PNL + FUNDING_FEE + COMMISSION
 * only when the income asset is USDT or USDC, using the same stablecoin-par
 * convention as the authenticated performance layer.
 *
 * Capital flows such as TRANSFER and COIN_SWAP_* are excluded. BNB-denominated
 * commission cannot be valued in USD from these CSVs alone and is therefore not
 * mixed into net_pnl. INSURANCE_CLEAR and other ambiguous performance events are
 * also excluded. Dates containing either condition are labelled partial.
 *
 * This is not mark-to-market daily PnL. Daily return is unavailable. From
 * 2026-08-01 onward an authenticated CLOSED/IN_PROGRESS ledger row always wins;
 * CSV data is used only to display an otherwise MISSING row.
 */

import type { BinanceDailyPerformanceDay } from "@/lib/btc-daily-performance";

export type CsvRealizedBackfillDay = {
  date_utc: string;
  net_pnl: number;
  partial: boolean;
  excluded_bnb_commission_bnb: number;
  ambiguous_event_count: number;
  unsupported_performance_event_count: number;
};

export type CalendarPerformanceDay =
  | (BinanceDailyPerformanceDay & { source: "LEDGER"; partial?: false })
  | {
      date_utc: string;
      status: "CSV_REALIZED";
      start_observed_at_utc: null;
      end_observed_at_utc: null;
      actual_duration_seconds: null;
      net_pnl: number;
      return_pct: null;
      source: "CSV_REALIZED";
      partial: boolean;
      excluded_bnb_commission_bnb: number;
      ambiguous_event_count: number;
      unsupported_performance_event_count: number;
    };

export const CSV_REALIZED_BACKFILL_START = "2024-11-15";
export const CSV_REALIZED_BACKFILL_END = "2026-09-22";
export const CSV_REALIZED_BACKFILL_TOTAL = -128.09855281;

export const CSV_REALIZED_BACKFILL: readonly CsvRealizedBackfillDay[] = [
  {
    "date_utc": "2024-11-15",
    "net_pnl": 1.42108361,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-11-16",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-11-17",
    "net_pnl": 1.14704573,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-11-18",
    "net_pnl": 47.2428977,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-11-19",
    "net_pnl": 14.2912143,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-11-20",
    "net_pnl": 44.77922982,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00412681,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2024-11-21",
    "net_pnl": 42.6489,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.02976983,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 25
  },
  {
    "date_utc": "2024-11-22",
    "net_pnl": 61.03714659,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.02113111,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 13
  },
  {
    "date_utc": "2024-11-23",
    "net_pnl": 69.2466,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.03646178,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 20
  },
  {
    "date_utc": "2024-11-24",
    "net_pnl": 56.2573,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.02391388,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 19
  },
  {
    "date_utc": "2024-11-25",
    "net_pnl": 252.77891002,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.04583107,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 22
  },
  {
    "date_utc": "2024-11-26",
    "net_pnl": -488.0922836,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 1,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-11-27",
    "net_pnl": -35.25359471,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00705364,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 8
  },
  {
    "date_utc": "2024-11-28",
    "net_pnl": -23.70813459,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.03802323,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 42
  },
  {
    "date_utc": "2024-11-29",
    "net_pnl": -6.15058631,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00002683,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2024-11-30",
    "net_pnl": -0.25977878,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 1,
    "unsupported_performance_event_count": 14
  },
  {
    "date_utc": "2024-12-01",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-02",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-03",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-04",
    "net_pnl": 56.28073498,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00933243,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 13
  },
  {
    "date_utc": "2024-12-05",
    "net_pnl": -37.6714,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00454051,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 10
  },
  {
    "date_utc": "2024-12-06",
    "net_pnl": 5.3619,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00984038,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 10
  },
  {
    "date_utc": "2024-12-07",
    "net_pnl": 9.93946624,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00904561,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 8
  },
  {
    "date_utc": "2024-12-08",
    "net_pnl": 32.34420272,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00202489,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2024-12-09",
    "net_pnl": 104.4993,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.01602048,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 14
  },
  {
    "date_utc": "2024-12-10",
    "net_pnl": 25.38450001,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0283977,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 20
  },
  {
    "date_utc": "2024-12-11",
    "net_pnl": 71.40097069,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.01381858,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 17
  },
  {
    "date_utc": "2024-12-12",
    "net_pnl": 38.51323293,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0211955,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 25
  },
  {
    "date_utc": "2024-12-13",
    "net_pnl": 58.93482188,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0029121,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2024-12-14",
    "net_pnl": 28.99941533,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00848497,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2024-12-15",
    "net_pnl": -33.84862451,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.014495,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 10
  },
  {
    "date_utc": "2024-12-16",
    "net_pnl": -147.18304981,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.07374626,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 42
  },
  {
    "date_utc": "2024-12-17",
    "net_pnl": -73.79668018,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.02356562,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 17
  },
  {
    "date_utc": "2024-12-18",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-19",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-20",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-21",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00113798,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2024-12-22",
    "net_pnl": -119.92806483,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00285338,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2024-12-23",
    "net_pnl": -1.98453132,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00988474,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 16
  },
  {
    "date_utc": "2024-12-24",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-25",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-26",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-27",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-28",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-29",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-30",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2024-12-31",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-01",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-02",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-03",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-04",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-05",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-06",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-07",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-08",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-09",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-10",
    "net_pnl": 6.42059999,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00247373,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-01-11",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-12",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-13",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-14",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-15",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-16",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-17",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-18",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-19",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-20",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-21",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-22",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-24",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-25",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-26",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-27",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-28",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-29",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-30",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-01-31",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-01",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-02",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-03",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-04",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-05",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-06",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-07",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-08",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-09",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-10",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-11",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-12",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-13",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-14",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-15",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-16",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-17",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-18",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-19",
    "net_pnl": 3.256,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00116362,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-02-20",
    "net_pnl": -6.985,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00207329,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-02-21",
    "net_pnl": -13.4028,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00224636,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-02-22",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-23",
    "net_pnl": 1.28710892,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00202321,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-02-24",
    "net_pnl": 2.248,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00042823,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-02-25",
    "net_pnl": -5.27956542,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0136773,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 22
  },
  {
    "date_utc": "2025-02-26",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-02-27",
    "net_pnl": 2.8418,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00575246,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 10
  },
  {
    "date_utc": "2025-02-28",
    "net_pnl": 79.17349596,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00296654,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-03-01",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-02",
    "net_pnl": 40.3938,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0121156,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 23
  },
  {
    "date_utc": "2025-03-03",
    "net_pnl": -296.75930051,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.04184239,
    "ambiguous_event_count": 2,
    "unsupported_performance_event_count": 27
  },
  {
    "date_utc": "2025-03-04",
    "net_pnl": 0.5544,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0024124,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 12
  },
  {
    "date_utc": "2025-03-05",
    "net_pnl": 12.81135579,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00260473,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 11
  },
  {
    "date_utc": "2025-03-06",
    "net_pnl": 7.698,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00079642,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-03-07",
    "net_pnl": 3.65718623,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00031668,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-03-08",
    "net_pnl": -0.02993423,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-09",
    "net_pnl": -0.04337792,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-10",
    "net_pnl": -0.03762128,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-11",
    "net_pnl": -0.06709229,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-12",
    "net_pnl": -0.0427405,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-13",
    "net_pnl": -0.02331892,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-14",
    "net_pnl": -0.04523986,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-15",
    "net_pnl": 0.03669156,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-16",
    "net_pnl": -0.02485589,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-17",
    "net_pnl": -0.04337081,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-18",
    "net_pnl": -0.02584104,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-19",
    "net_pnl": -0.04688022,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-20",
    "net_pnl": -0.02928816,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-21",
    "net_pnl": -0.03964592,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-22",
    "net_pnl": -0.02586861,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-23",
    "net_pnl": -0.02513628,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-24",
    "net_pnl": -0.017597,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-25",
    "net_pnl": 0.01267495,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-26",
    "net_pnl": 0.01911447,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-27",
    "net_pnl": -0.02135592,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-28",
    "net_pnl": -0.03905925,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-29",
    "net_pnl": -0.06742639,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-30",
    "net_pnl": -0.02215266,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-03-31",
    "net_pnl": -0.04322357,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00019685,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-04-01",
    "net_pnl": -0.11341469,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-02",
    "net_pnl": 8.11023267,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00082358,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-04-03",
    "net_pnl": 0.27275803,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-04",
    "net_pnl": 80.03531387,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00048265,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-05",
    "net_pnl": 1.88177725,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00126364,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-06",
    "net_pnl": 16.88,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-07",
    "net_pnl": 13.06490071,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00209126,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-04-08",
    "net_pnl": -16.10876468,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00118602,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-09",
    "net_pnl": 63.11424464,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-10",
    "net_pnl": -12.38930225,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0022407,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 7
  },
  {
    "date_utc": "2025-04-11",
    "net_pnl": 17.04228125,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0010076,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-12",
    "net_pnl": -100.37726782,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00154536,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-13",
    "net_pnl": -8.8054212,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00206675,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-04-14",
    "net_pnl": 19.66394699,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00140262,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-15",
    "net_pnl": 29.9535934,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-16",
    "net_pnl": -0.00069904,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-17",
    "net_pnl": -16.32880428,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-18",
    "net_pnl": 29.24216859,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00315567,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-04-19",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-20",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-21",
    "net_pnl": 25.86015084,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00157248,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-22",
    "net_pnl": -16.17,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00158463,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-04-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-24",
    "net_pnl": 1.51968689,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-25",
    "net_pnl": 29.52626206,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-26",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-27",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-28",
    "net_pnl": 12.88,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-29",
    "net_pnl": 13.088,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-04-30",
    "net_pnl": 76.00163632,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-01",
    "net_pnl": 12.841,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-02",
    "net_pnl": 8.76887395,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-03",
    "net_pnl": -71.083591,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00608981,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-05-04",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-05",
    "net_pnl": 0.07140234,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-06",
    "net_pnl": -214.12312605,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-07",
    "net_pnl": -3.35999997,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-08",
    "net_pnl": 35.1373,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-09",
    "net_pnl": 51.67200001,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-10",
    "net_pnl": 17.064,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-11",
    "net_pnl": 45.658,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-12",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-13",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-14",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-15",
    "net_pnl": 60.176,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-16",
    "net_pnl": 2.87999999,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-17",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-18",
    "net_pnl": 8.73,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-19",
    "net_pnl": -60.94876262,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-20",
    "net_pnl": 106.08271876,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-21",
    "net_pnl": 65.53688336,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-22",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-23",
    "net_pnl": -75.27784,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-24",
    "net_pnl": -6.016,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-25",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-26",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-27",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-28",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-29",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-30",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-05-31",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-01",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-02",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-03",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-04",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-05",
    "net_pnl": 6.46388196,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-06",
    "net_pnl": 26.58784097,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-07",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-08",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-09",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-10",
    "net_pnl": 23.142,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-11",
    "net_pnl": -0.42440343,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-12",
    "net_pnl": -0.92276573,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-13",
    "net_pnl": 0.17235842,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-14",
    "net_pnl": -1.55263661,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-15",
    "net_pnl": -1.26730102,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-16",
    "net_pnl": 30.08498875,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-17",
    "net_pnl": -0.29157866,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-18",
    "net_pnl": -0.28131945,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-19",
    "net_pnl": 0.28671316,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-20",
    "net_pnl": 75.38388414,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-21",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-22",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-24",
    "net_pnl": 0.10869734,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-25",
    "net_pnl": 0.04270483,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-26",
    "net_pnl": -0.2281208,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-27",
    "net_pnl": 0.46598908,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-28",
    "net_pnl": -0.25194467,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-29",
    "net_pnl": 2.09780632,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-06-30",
    "net_pnl": 2.10852054,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-01",
    "net_pnl": 95.50718102,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-02",
    "net_pnl": -6.15,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-03",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-04",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-05",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-06",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-07",
    "net_pnl": -0.61710537,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-08",
    "net_pnl": 53.76533548,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-09",
    "net_pnl": 1.25678247,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-10",
    "net_pnl": 2.30758364,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-11",
    "net_pnl": -1137.3691224,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 1,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-12",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-13",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-14",
    "net_pnl": -2.388,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-15",
    "net_pnl": 6.33150651,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-16",
    "net_pnl": 1.0123496,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-17",
    "net_pnl": -8.1266357,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-18",
    "net_pnl": -3.78,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00028296,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-07-19",
    "net_pnl": -5.899051,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-20",
    "net_pnl": 4.26210679,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-21",
    "net_pnl": 11.41546675,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-07-22",
    "net_pnl": 1.58444786,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-07-23",
    "net_pnl": 3.63194418,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-07-24",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-07-25",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-07-26",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 11
  },
  {
    "date_utc": "2025-07-27",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-07-28",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00054281,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 7
  },
  {
    "date_utc": "2025-07-29",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-07-30",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-07-31",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00024177,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-08-01",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-08-02",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-08-03",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-08-04",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00031677,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-08-05",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 7
  },
  {
    "date_utc": "2025-08-06",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00037632,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-08-07",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00039299,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-08-08",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-08-09",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00041029,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-08-10",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00103127,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 12
  },
  {
    "date_utc": "2025-08-11",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00150873,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 12
  },
  {
    "date_utc": "2025-08-12",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00052883,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 9
  },
  {
    "date_utc": "2025-08-13",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-14",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00015783,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-08-15",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-16",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-08-17",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00035248,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-08-18",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-19",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-20",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-21",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-22",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-24",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-08-25",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00034512,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-08-26",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00068789,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-08-27",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-08-28",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 8
  },
  {
    "date_utc": "2025-08-29",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-08-30",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-08-31",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-01",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-02",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-03",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-04",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-05",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-06",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-07",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-08",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-09",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-10",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-11",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-12",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-09-13",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-14",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-09-15",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-16",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-17",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-18",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-19",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-20",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-21",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-22",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-23",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-24",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-25",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-26",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-27",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-28",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-29",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-09-30",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-01",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-02",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-10-03",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-04",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-05",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-06",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00000468,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-10-07",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-08",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 4
  },
  {
    "date_utc": "2025-10-09",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00061464,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-10-10",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00038104,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-10-11",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00042099,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-10-12",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00053004,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2025-10-13",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-14",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-15",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-16",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 6
  },
  {
    "date_utc": "2025-10-17",
    "net_pnl": 0,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-10-18",
    "net_pnl": 0.07641405,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00049908,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2025-10-19",
    "net_pnl": 56.11151131,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-20",
    "net_pnl": 0.41812314,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-21",
    "net_pnl": 161.96748493,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-22",
    "net_pnl": 1.122,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-24",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-25",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-26",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-27",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-28",
    "net_pnl": -3.90056275,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-29",
    "net_pnl": 61.64361408,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-30",
    "net_pnl": 61.37791437,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-10-31",
    "net_pnl": 31.00209778,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-01",
    "net_pnl": 0.58726446,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-02",
    "net_pnl": 0.6422913,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-03",
    "net_pnl": 36.97014664,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-04",
    "net_pnl": -0.33014921,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-05",
    "net_pnl": -0.36146636,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-06",
    "net_pnl": -0.5258592,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-07",
    "net_pnl": -1.2110677,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-11-08",
    "net_pnl": -0.93994397,
    "partial": true,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-11-09",
    "net_pnl": -0.51311515,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-10",
    "net_pnl": 98.76129681,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-11",
    "net_pnl": -39.71123222,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00112955,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-11-12",
    "net_pnl": 162.40185527,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-13",
    "net_pnl": 5.72509501,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00060917,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2025-11-14",
    "net_pnl": -0.88626914,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-15",
    "net_pnl": -0.43354027,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-16",
    "net_pnl": -0.77742689,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-17",
    "net_pnl": -1.00316247,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-18",
    "net_pnl": -1.25278944,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-19",
    "net_pnl": -0.44554494,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-20",
    "net_pnl": -1.29806387,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-21",
    "net_pnl": -0.8755631,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-22",
    "net_pnl": -0.15529125,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-23",
    "net_pnl": 0.002905,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-24",
    "net_pnl": 0.23942262,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-25",
    "net_pnl": 0.1082229,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-26",
    "net_pnl": -0.32664741,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-27",
    "net_pnl": -0.06456695,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-28",
    "net_pnl": -0.20337869,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-29",
    "net_pnl": -0.25244173,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-11-30",
    "net_pnl": -0.88680753,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-01",
    "net_pnl": -0.68808491,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-02",
    "net_pnl": -0.02999142,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-03",
    "net_pnl": -0.24764956,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-04",
    "net_pnl": -0.34389203,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-05",
    "net_pnl": -0.36614558,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-06",
    "net_pnl": 0.13816575,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-07",
    "net_pnl": -0.36453381,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-08",
    "net_pnl": -0.4079105,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-09",
    "net_pnl": -0.27312627,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-10",
    "net_pnl": 0.02098784,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-11",
    "net_pnl": -466.73540348,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00179911,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2025-12-12",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-13",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-14",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-15",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-16",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-17",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-18",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-19",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-20",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-21",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-22",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-24",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-25",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-26",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-27",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-28",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-29",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-30",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2025-12-31",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-01",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-02",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-03",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-04",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-05",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-06",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-07",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-08",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-09",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-10",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-11",
    "net_pnl": 11.78197824,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-12",
    "net_pnl": 6.8043169,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-13",
    "net_pnl": -14.85847728,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00054888,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2026-01-14",
    "net_pnl": 15.16926995,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-15",
    "net_pnl": 36.37956763,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-16",
    "net_pnl": 7.06826126,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00055163,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2026-01-17",
    "net_pnl": 8.36077079,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-18",
    "net_pnl": 18.85534421,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00137239,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2026-01-19",
    "net_pnl": -16.92669771,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00057829,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2026-01-20",
    "net_pnl": 76.72633927,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00057276,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2026-01-21",
    "net_pnl": 0.38068469,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-22",
    "net_pnl": -29.61114964,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-24",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-25",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-26",
    "net_pnl": 0.0720126,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-27",
    "net_pnl": 0.17406848,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-28",
    "net_pnl": 0.20250318,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-29",
    "net_pnl": 6.11289158,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-01-30",
    "net_pnl": -67.35634348,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00046169,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2026-01-31",
    "net_pnl": 43.24651178,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-01",
    "net_pnl": 15.6010524,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-02",
    "net_pnl": 17.79903428,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00040324,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2026-02-03",
    "net_pnl": 53.21004395,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-04",
    "net_pnl": 76.34784289,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-05",
    "net_pnl": 9.47887878,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00189068,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 9
  },
  {
    "date_utc": "2026-02-06",
    "net_pnl": 0.74290793,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-07",
    "net_pnl": 36.8742751,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-08",
    "net_pnl": -0.05465418,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-09",
    "net_pnl": -106.83765341,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00143099,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2026-02-10",
    "net_pnl": -30.47281173,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00193483,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 3
  },
  {
    "date_utc": "2026-02-11",
    "net_pnl": 87.52812554,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-12",
    "net_pnl": 1.42939701,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-13",
    "net_pnl": 0.23994894,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-14",
    "net_pnl": -0.14403212,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-15",
    "net_pnl": -0.18657148,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-16",
    "net_pnl": 0.33630912,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-17",
    "net_pnl": 0.15165543,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-18",
    "net_pnl": 0.42448755,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-19",
    "net_pnl": 8.43689199,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-20",
    "net_pnl": 0.79567644,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-21",
    "net_pnl": 0.39419584,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-22",
    "net_pnl": 0.42530859,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-23",
    "net_pnl": 135.15591803,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-24",
    "net_pnl": 54.75794029,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-25",
    "net_pnl": -144.9535174,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00406133,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 5
  },
  {
    "date_utc": "2026-02-26",
    "net_pnl": 0.09754124,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-27",
    "net_pnl": 0.43275045,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-02-28",
    "net_pnl": 0.58023081,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-01",
    "net_pnl": 0.60457826,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-02",
    "net_pnl": 1.4940468,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-03",
    "net_pnl": 93.67022578,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-04",
    "net_pnl": -0.26249613,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-05",
    "net_pnl": -0.66442692,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-06",
    "net_pnl": -0.02740386,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-07",
    "net_pnl": -0.0699684,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-08",
    "net_pnl": -3.84237211,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-09",
    "net_pnl": 50.15795458,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-10",
    "net_pnl": 44.92598796,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-11",
    "net_pnl": -0.67239274,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-12",
    "net_pnl": -1.18364454,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-13",
    "net_pnl": 0.08060494,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-14",
    "net_pnl": -0.30441528,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-15",
    "net_pnl": -0.27957517,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-16",
    "net_pnl": -0.07349938,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-17",
    "net_pnl": 0.13926883,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-18",
    "net_pnl": -0.26063908,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-19",
    "net_pnl": 2.31931178,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-20",
    "net_pnl": 43.5,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-21",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-22",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-23",
    "net_pnl": 43.32647179,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-24",
    "net_pnl": 32.69753397,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-25",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-26",
    "net_pnl": -0.02884464,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-27",
    "net_pnl": -0.26057187,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-28",
    "net_pnl": -0.08387729,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-29",
    "net_pnl": -0.04439296,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-30",
    "net_pnl": -0.30460588,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-03-31",
    "net_pnl": -0.43828342,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-01",
    "net_pnl": -0.00216629,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-02",
    "net_pnl": 0.17403885,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-03",
    "net_pnl": -0.08702601,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-04",
    "net_pnl": -0.15567711,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-05",
    "net_pnl": -0.08347411,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-06",
    "net_pnl": -30.91492243,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-07",
    "net_pnl": 39.24962057,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-08",
    "net_pnl": 0.31713097,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-09",
    "net_pnl": -0.08016158,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-10",
    "net_pnl": -0.26083985,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-11",
    "net_pnl": -0.20789332,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-12",
    "net_pnl": -0.11348236,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-13",
    "net_pnl": -0.34723014,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-14",
    "net_pnl": -171.85515086,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.00074218,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 1
  },
  {
    "date_utc": "2026-04-15",
    "net_pnl": 40.72127909,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-16",
    "net_pnl": 106.98125301,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-17",
    "net_pnl": -0.00121844,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-18",
    "net_pnl": -1.20498669,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-19",
    "net_pnl": -0.88754739,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-20",
    "net_pnl": -0.95981238,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-21",
    "net_pnl": -1.25948567,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-22",
    "net_pnl": -0.92354771,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-23",
    "net_pnl": -1.21530995,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-24",
    "net_pnl": -1.2217208,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-25",
    "net_pnl": -0.66280897,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-26",
    "net_pnl": 0.08232674,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-27",
    "net_pnl": -0.09456698,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-28",
    "net_pnl": -0.0292607,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-29",
    "net_pnl": -0.31001742,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-04-30",
    "net_pnl": 0.58029384,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-01",
    "net_pnl": 0.65493451,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-02",
    "net_pnl": -0.1832079,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-03",
    "net_pnl": -0.11925539,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-04",
    "net_pnl": -656.8092623,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-05",
    "net_pnl": 0.807,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-06",
    "net_pnl": -1.28062693,
    "partial": true,
    "excluded_bnb_commission_bnb": -0.0006908,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 2
  },
  {
    "date_utc": "2026-05-07",
    "net_pnl": 14.11759093,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-08",
    "net_pnl": -13.9108642,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-09",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-10",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-11",
    "net_pnl": 21.52139254,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-12",
    "net_pnl": 15.2650027,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-13",
    "net_pnl": 25.524048,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-14",
    "net_pnl": 0.09923001,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-15",
    "net_pnl": -10.85960715,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-16",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-17",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-18",
    "net_pnl": -0.25063769,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-19",
    "net_pnl": -0.95860306,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-20",
    "net_pnl": -1.02703729,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-21",
    "net_pnl": -0.75849188,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-22",
    "net_pnl": -63.61283283,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-23",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-24",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-25",
    "net_pnl": -0.19629147,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-26",
    "net_pnl": -0.29506341,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-27",
    "net_pnl": -0.80238786,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-28",
    "net_pnl": -0.97039418,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-29",
    "net_pnl": -0.95269578,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-30",
    "net_pnl": -0.627926,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-05-31",
    "net_pnl": -0.53408406,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-01",
    "net_pnl": -0.91145724,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-02",
    "net_pnl": -0.62687441,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-03",
    "net_pnl": -0.25159501,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-04",
    "net_pnl": -0.23382461,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-05",
    "net_pnl": -0.17573933,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-06",
    "net_pnl": -0.16158525,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-07",
    "net_pnl": 0.07747789,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-08",
    "net_pnl": -0.26911999,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-09",
    "net_pnl": -0.24714051,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-10",
    "net_pnl": -0.92118286,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-11",
    "net_pnl": -0.7432495,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-12",
    "net_pnl": -0.10499583,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-13",
    "net_pnl": 0.03145913,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-14",
    "net_pnl": -0.02893738,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-15",
    "net_pnl": -0.21937733,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-16",
    "net_pnl": -0.08446605,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-17",
    "net_pnl": -0.68457355,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-18",
    "net_pnl": -0.36497585,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-19",
    "net_pnl": -0.46689008,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-20",
    "net_pnl": -0.2105073,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-21",
    "net_pnl": -0.25187047,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-22",
    "net_pnl": -0.39835975,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-23",
    "net_pnl": -0.34616643,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-24",
    "net_pnl": -0.44715892,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-25",
    "net_pnl": 0.22846241,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-26",
    "net_pnl": -0.68487152,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-27",
    "net_pnl": -0.46444025,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-28",
    "net_pnl": -0.55728977,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-29",
    "net_pnl": -0.82677992,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-06-30",
    "net_pnl": -0.61527736,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-01",
    "net_pnl": -0.70041845,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-02",
    "net_pnl": -1.07013013,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-03",
    "net_pnl": -0.75771439,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-04",
    "net_pnl": -0.56872239,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-05",
    "net_pnl": -0.53098073,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-06",
    "net_pnl": -0.74532361,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-07",
    "net_pnl": -1.05653374,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-08",
    "net_pnl": -0.99848636,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-09",
    "net_pnl": -0.98844876,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-10",
    "net_pnl": -1.03259496,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-11",
    "net_pnl": -0.69720421,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-12",
    "net_pnl": -0.73501544,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-13",
    "net_pnl": -0.47668625,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-14",
    "net_pnl": -0.99548634,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-15",
    "net_pnl": -1.12685585,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-16",
    "net_pnl": -0.68818129,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-17",
    "net_pnl": -0.82911171,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-18",
    "net_pnl": -0.83927947,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-19",
    "net_pnl": -0.61176028,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-20",
    "net_pnl": -1.19982972,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-21",
    "net_pnl": -0.89115421,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-22",
    "net_pnl": -0.66965045,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-23",
    "net_pnl": -0.29702135,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-24",
    "net_pnl": -0.62254435,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-25",
    "net_pnl": -0.42077454,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-26",
    "net_pnl": -0.25588603,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-27",
    "net_pnl": -1.13444032,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-28",
    "net_pnl": -0.496612,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-29",
    "net_pnl": -1.33691694,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-30",
    "net_pnl": -1.21471053,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-07-31",
    "net_pnl": -0.69346911,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-01",
    "net_pnl": -0.47382238,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-02",
    "net_pnl": -1.11656961,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-03",
    "net_pnl": -0.85711787,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-04",
    "net_pnl": -1.30918351,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-05",
    "net_pnl": -1.02462832,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-06",
    "net_pnl": -0.96326695,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-07",
    "net_pnl": -0.5130977,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-08",
    "net_pnl": -0.1434256,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-09",
    "net_pnl": -0.28730069,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-10",
    "net_pnl": -1.02863917,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-11",
    "net_pnl": -1.04871229,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-12",
    "net_pnl": -1.28320076,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-13",
    "net_pnl": -1.42087629,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-14",
    "net_pnl": -1.34676671,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-15",
    "net_pnl": -1.18991718,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-16",
    "net_pnl": -0.60902824,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-17",
    "net_pnl": -1.45586878,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-18",
    "net_pnl": -1.20563449,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-19",
    "net_pnl": -1.08195876,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-20",
    "net_pnl": 177.90120133,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-21",
    "net_pnl": -0.36279535,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-22",
    "net_pnl": -1.10186523,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-23",
    "net_pnl": -1.2428772,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-24",
    "net_pnl": -1.04421014,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-25",
    "net_pnl": 158.19053664,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-26",
    "net_pnl": -0.74807179,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-27",
    "net_pnl": 86.5992276,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-28",
    "net_pnl": 71.258,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-29",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-30",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-08-31",
    "net_pnl": 0.59769088,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-01",
    "net_pnl": 87.30520511,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-02",
    "net_pnl": 59.39946806,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-03",
    "net_pnl": -346.07868874,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-04",
    "net_pnl": 0.0211803,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-05",
    "net_pnl": 0.595402,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-06",
    "net_pnl": -0.91552612,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-07",
    "net_pnl": -0.41093996,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-08",
    "net_pnl": -1.28464511,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-09",
    "net_pnl": -2.44376593,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-10",
    "net_pnl": -1.48548776,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-11",
    "net_pnl": -1.85427248,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-12",
    "net_pnl": -1.11342031,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-13",
    "net_pnl": -2.32651791,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-14",
    "net_pnl": -2.64189062,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-15",
    "net_pnl": -1.35459686,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-16",
    "net_pnl": -4.36708417,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-17",
    "net_pnl": -3.87531392,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-18",
    "net_pnl": 268.20474947,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-19",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-20",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-21",
    "net_pnl": 0,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  },
  {
    "date_utc": "2026-09-22",
    "net_pnl": -9.3542512,
    "partial": false,
    "excluded_bnb_commission_bnb": 0,
    "ambiguous_event_count": 0,
    "unsupported_performance_event_count": 0
  }
] as const;

const byDate = new Map(CSV_REALIZED_BACKFILL.map(day => [day.date_utc, day]));

function csvDay(day: CsvRealizedBackfillDay): CalendarPerformanceDay {
  return {
    date_utc: day.date_utc,
    status: "CSV_REALIZED",
    start_observed_at_utc: null,
    end_observed_at_utc: null,
    actual_duration_seconds: null,
    net_pnl: day.net_pnl,
    return_pct: null,
    source: "CSV_REALIZED",
    partial: day.partial,
    excluded_bnb_commission_bnb: day.excluded_bnb_commission_bnb,
    ambiguous_event_count: day.ambiguous_event_count,
    unsupported_performance_event_count: day.unsupported_performance_event_count,
  };
}

export function applyCsvRealizedBackfill(days: readonly BinanceDailyPerformanceDay[]): CalendarPerformanceDay[] {
  const firstLedgerDate = days[0]?.date_utc ?? "9999-12-31";
  const result: CalendarPerformanceDay[] = [];

  for (const historical of CSV_REALIZED_BACKFILL) {
    if (historical.date_utc < firstLedgerDate) result.push(csvDay(historical));
  }

  for (const day of days) {
    if (day.status !== "MISSING") {
      result.push({ ...day, source: "LEDGER" as const });
      continue;
    }
    const historical = byDate.get(day.date_utc);
    result.push(historical ? csvDay(historical) : { ...day, source: "LEDGER" as const });
  }

  return result.sort((a,b) => a.date_utc.localeCompare(b.date_utc));
}
