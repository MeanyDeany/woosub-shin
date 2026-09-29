export const BINANCE_TRADE_DAY_SUMMARY = Object.freeze({
  coverage_start_utc: "2024-11-13",
  coverage_end_utc: "2026-09-28",
  active_trade_day_count: 286,
  resolved_trade_day_count: 222,
  winning_trade_day_count: 152,
  losing_trade_day_count: 70,
  unresolved_or_flat_trade_day_count: 64,
  win_rate_pct_estimate: 68.46846846846847,
  funding_included: false,
  trading_commission_included: true,
  bnb_commission_valuation_method: "CONTEMPORANEOUS_BNBUSDT_1M_CLOSE_ESTIMATE",
  day_basis: "UTC",
} as const);

export const BINANCE_TRADE_DAY_WIN_RATE_NOTE =
  "Winning resolved UTC trading days divided by winning plus losing resolved UTC trading days. Funding is excluded. Trading commissions are included; historical BNB commissions are converted with contemporaneous BNBUSDT 1-minute close prices. Fill-only days without a realized outcome are excluded from the win-rate denominator.";
