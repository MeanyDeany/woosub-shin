import type { CalendarPerformanceDay } from "@/lib/btc-daily-csv-backfill";
import type { BinanceCashDayOutcome } from "@/lib/btc-trade-day-win-rate";

export type LiveCashDayFallback = {
  date_utc: string;
  status: "LIVE_CASH";
  start_observed_at_utc: null;
  end_observed_at_utc: null;
  actual_duration_seconds: null;
  net_pnl: number;
  return_pct: null;
  flow_adjusted_net_pnl: null;
  flow_adjusted_return_pct: null;
  source: "LIVE_CASH";
  realized_pnl: number;
  commission: number;
  funding_fee: number;
};

export type CalendarDisplayDay = CalendarPerformanceDay | LiveCashDayFallback;

function fallback(outcome: BinanceCashDayOutcome): LiveCashDayFallback {
  return {
    date_utc: outcome.date_utc,
    status: "LIVE_CASH",
    start_observed_at_utc: null,
    end_observed_at_utc: null,
    actual_duration_seconds: null,
    net_pnl: outcome.net_pnl,
    return_pct: null,
    flow_adjusted_net_pnl: null,
    flow_adjusted_return_pct: null,
    source: "LIVE_CASH",
    realized_pnl: outcome.realized_pnl,
    commission: outcome.commission,
    funding_fee: outcome.funding_fee,
  };
}

export function applyLiveCashDayFallback(
  days: readonly CalendarPerformanceDay[],
  outcomes: readonly BinanceCashDayOutcome[],
): CalendarDisplayDay[] {
  const merged = new Map<string, CalendarDisplayDay>(
    days.map(day => [day.date_utc, day]),
  );
  for (const outcome of outcomes) {
    const current = merged.get(outcome.date_utc);
    if (
      current?.source === "CSV_REALIZED" ||
      (current?.source === "LEDGER" && current.status !== "MISSING")
    ) {
      continue;
    }
    merged.set(outcome.date_utc, fallback(outcome));
  }
  return [...merged.values()].sort((a, b) => a.date_utc.localeCompare(b.date_utc));
}
