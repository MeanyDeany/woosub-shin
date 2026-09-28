# Binance USD-M public telemetry UI V2

This website surface consumes two sanitized, reporting-only V2 datasets. It does not create trading, transfer, or execution authority.

## Dynamic open positions

The open-position panel consumes `binance_usdm_public_open_positions_v2` from:

```text
/public/execution/open-positions.json
```

It displays every non-zero Binance USD-M account position in canonical `(symbol, position_side)` order. New symbols require no frontend code change. One-way and hedge mode are both supported, including two sides of the same symbol in hedge mode.

The public item fields are limited to:

- symbol;
- position side (`BOTH`, `LONG`, or `SHORT`);
- normalized state (`LONG` or `SHORT`);
- ordinary open-order presence;
- algo open-order presence.

The UI does not publish exact position quantity, notional, prices, per-position PnL, margin, account capital, order counts or identifiers, credentials, signatures, or order authority. A valid empty `positions` array is rendered as an authenticated flat-account state.

The legacy environment variable `NEXT_PUBLIC_BTC_MULTI_POSITION_URL` is retained so the Vercel deployment configuration does not need an atomic rename. If its value ends in `/multi-symbol-position.json`, the frontend rewrites it to the V2 `/public/execution/open-positions.json` path.

## Flow-adjusted performance

The performance panel consumes `binance_usdm_public_flow_adjusted_performance_v2` from:

```text
/public/execution/lifetime-performance.json
```

The fixed tracking boundary is `2026-08-01T00:00:00Z`. Public values are:

- realized net trading PnL;
- current account-wide unrealized PnL;
- lifetime trading PnL;
- Modified Dietz flow-adjusted return.

Lifetime trading PnL is realized net PnL plus the change in unrealized PnL since the boundary. Deposits, withdrawals, transfers, and non-trading rewards are neutral: they do not enter the PnL numerator. Neutral flows are time-weighted only in the return denominator.

Aggregate current unrealized PnL is public, but position size, entry price, mark price, balances, and per-position PnL remain private.


## Binance-compatible daily performance

The daily calendar consumes `binance_usdm_public_daily_performance_v2` from:

```text
/public/execution/daily-performance.json
```

The primary daily fields follow the Binance Futures PNL Analysis wallet-balance basis. Daily PnL is ending wallet balance minus beginning wallet balance minus net capital inflow. Daily PnL % divides that PnL by beginning wallet balance plus positive inflow. Open-position unrealized PnL is therefore excluded from the primary daily metric until it is realized into wallet balance.

The same row also retains `flow_adjusted_net_pnl` and `flow_adjusted_return_pct` using the existing Modified Dietz mark-to-market method. These secondary fields are useful for research/account-equity context but are intentionally not labelled as Binance PnL.

The frontend accepts the older V1 contract during rollout so the website and feed can be deployed independently without fabricating or mislabelling values.

## Validation and authority

Both parsers fail closed on unknown fields, unsupported schema identities, malformed timestamps, inconsistent counts or ordering, malformed SHA-256 identities, or any authority coordinate other than `external_action_permitted: false`.

The UI polls every 30 seconds and marks a validated observation stale after the contract's 180-second TTL. A failed refresh keeps the last validated observation visible and does not synthesize values.
