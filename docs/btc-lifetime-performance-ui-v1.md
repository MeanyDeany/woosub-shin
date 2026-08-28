# BTC lifetime performance UI V1

The live Binance position page may display two cumulative performance fields only:

- `Lifetime PnL`
- `Lifetime Return`

Both metrics are defined from a frozen public-tracking start rather than the entire historical Binance account. This prevents unrelated discretionary account history from being presented as systematic execution performance.

The frontend contract expects a separately published sanitized feed at `/public/execution/lifetime-performance.json` (or `NEXT_PUBLIC_BTC_LIFETIME_PERFORMANCE_URL`). Until that feed exists and validates, the UI renders `PENDING FEED` and does not synthesize values.

The V1 performance UI deliberately does not publish current position size, entry price, mark price, liquidation price, unrealized PnL, balances, orders, credentials, or execution authority.

`Lifetime Return` must be supplied by an audited upstream performance ledger with a frozen tracking start and capital baseline. The website does not derive return from current Binance wallet balance.
