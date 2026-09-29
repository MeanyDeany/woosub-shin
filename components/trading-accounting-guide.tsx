/** Explains existing accounting scopes; contains no account data or calculations. */
export function TradingAccountingGuide() {
  return <aside className="td-accounting-guide" aria-label="Calendar accounting guide">
    <p><strong>Read the calendar by source.</strong> V2 ledger days default to Binance-compatible wallet PnL, which excludes open-position unrealized PnL until it is realized. The same ledger row keeps a secondary flow-adjusted MTM measure including changes in unrealized PnL. Historical CSV days show BTC-only stablecoin cash subtotals, not complete Binance account PnL.</p>
    <details>
      <summary>Accounting scope, excluded records, and UTC boundaries</summary>
      <dl>
        <div><dt>One UTC day</dt><dd>00:00 to 00:00 UTC corresponds to 09:00 to 09:00 the following day in Korea. Export timestamps marked UTC+9 are converted before aggregation. Ledger rows disclose their actual boundary observations, which may be up to ten minutes before midnight.</dd></div>
        <div><dt>Binance-basis daily metric</dt><dd>Primary V2 PnL is ending wallet balance minus beginning wallet balance minus net capital inflow. PnL % uses beginning wallet balance plus positive inflow. Open-position unrealized PnL is not part of this primary wallet-balance figure.</dd></div>
        <div><dt>Historical cash subset</dt><dd>CSV figures include BTCUSDT/BTCUSDC realized PnL, funding, and USDT/USDC commissions. Non-BTC performance, BNB fees without USD valuation, and ambiguous events such as INSURANCE_CLEAR are excluded and flagged where recorded. Partial is not complete; a subtotal is not net account profit.</dd></div>
        <div><dt>Returns and source precedence</dt><dd>Published ledger rows take precedence over CSV history. CSV records have no daily percentage return because wallet-balance boundaries are absent. Missing observations remain unavailable, and private notes never change the public numbers.</dd></div>
      </dl>
    </details>
  </aside>;
}
