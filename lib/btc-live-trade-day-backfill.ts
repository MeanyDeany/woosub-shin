import type { CalendarPerformanceDay } from "@/lib/btc-daily-csv-backfill";
import type { BinanceTradeDayOutcome } from "@/lib/btc-trade-day-win-rate";

export type LiveTradeDayFallback = {
  date_utc: string;
  status: "LIVE_REALIZED";
  start_observed_at_utc: null;
  end_observed_at_utc: null;
  actual_duration_seconds: null;
  net_pnl: number;
  return_pct: null;
  flow_adjusted_net_pnl: null;
  flow_adjusted_return_pct: null;
  source: "LIVE_REALIZED";
  realized_pnl: number;
  commission: number;
  outcome: "WIN" | "LOSS";
};

export type CalendarDisplayDay = CalendarPerformanceDay | LiveTradeDayFallback;

function fallback(outcome: BinanceTradeDayOutcome): LiveTradeDayFallback {
  return {
    date_utc: outcome.date_utc,
    status: "LIVE_REALIZED",
    start_observed_at_utc: null,
    end_observed_at_utc: null,
    actual_duration_seconds: null,
    net_pnl: outcome.net_pnl,
    return_pct: null,
    flow_adjusted_net_pnl: null,
    flow_adjusted_return_pct: null,
    source: "LIVE_REALIZED",
    realized_pnl: outcome.realized_pnl,
    commission: outcome.commission,
    outcome: outcome.outcome,
  };
}

export function applyLiveTradeDayFallback(
  days: readonly CalendarPerformanceDay[],
  outcomes: readonly BinanceTradeDayOutcome[],
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
