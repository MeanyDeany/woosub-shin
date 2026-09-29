/**
 * Sanitized external-withdrawal summary derived from user-supplied Binance
 * withdrawal history. No addresses, TXIDs, account IDs, or raw rows are public.
 *
 * Stablecoin withdrawals use USDT/USDC par value.
 * XRP withdrawals use contemporaneous USDC/USDT funding-transfer amounts where
 * a unique preceding Futures->Spot transfer could be paired with the external
 * withdrawal. Eleven of twelve XRP withdrawals pair within 6.4 minutes. One
 * 2025-10-11 withdrawal uses the sole same-day 50 USDC transfer; the implied
 * XRP price is within the observed daily market range, but that row remains the
 * least precise component. Values are therefore labelled historical USDT
 * equivalent rather than exact exchange-accounting cashflow.
 */
export const BINANCE_WITHDRAWAL_SUMMARY = {
  source_first_withdrawal_local: "2025-04-13T07:44:30+09:00",
  source_last_withdrawal_local: "2026-09-25T14:29:15+09:00",
  completed_withdrawal_count: 24,
  stablecoin_withdrawal_count: 12,
  xrp_withdrawal_count: 12,
  stablecoin_net_sent_usdt_equivalent: 3050.74268622,
  xrp_net_sent_units: 1481.469529,
  xrp_net_sent_usdt_equivalent_estimate: 2882.36308686,
  total_net_sent_usdt_equivalent_estimate: 5933.10577308,
  withdrawal_fee_usdt_equivalent_estimate: 9.76783582,
  total_account_outflow_usdt_equivalent_estimate: 5942.8736089,
  valuation_label: "HISTORICAL_USDT_EQUIVALENT_ESTIMATE",
} as const;
