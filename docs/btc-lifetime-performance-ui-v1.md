# BTC live position and lifetime performance UI V1

This website surface is an outward-only public view. It combines two separately versioned sanitized feeds without creating any trading or execution authority.

## Position scope

The live position panel consumes the PR16-style multi-symbol public telemetry dataset and displays exactly two Binance USD-M contracts in canonical order:

1. `BTCUSDT`
2. `BTCUSDC`

For each contract, the page may display only:

- position state
- position mode
- margin type
- configured leverage
- open-order count

It does not display exact position quantity, entry price, mark price, liquidation price, current unrealized PnL, balances, order identifiers, credentials, signatures, or any order authority.

The legacy BTCUSDT-only feed remains supported elsewhere for backward compatibility, but this page is designed to move to the authenticated two-symbol PR16 public projection.

## Lifetime performance scope

The performance panel displays only:

- `Lifetime PnL`
- `Lifetime Return`

`Lifetime` means since a frozen public-tracking start, not the historical lifetime of the Binance account. The frontend does not derive these values from wallet balance, current unrealized PnL, or historical discretionary trading.

Until a valid sanitized performance feed exists, the panel fails closed and shows a pending/unavailable state rather than synthesizing zero performance.

## Separation

Position telemetry and lifetime performance are deliberately separate datasets. A LONG or SHORT observation is not permission to trade, and a positive or negative lifetime return does not change execution authority.

`external_action_permitted` remains `false` for every public feed consumed by this surface.
