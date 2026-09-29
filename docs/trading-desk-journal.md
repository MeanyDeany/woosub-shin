# Public account dashboard and private notes

The home account section and `/projects/btc-futures-research/live-position` share a compact responsive dashboard. Existing public V2 positions and V2 lifetime performance remain read-only. The dashboard accepts rolling-performance V1 during rollout and uses rolling-performance V2 when available; V2 makes 7D/30D wallet-balance PnL the primary recent-performance measure while retaining Modified Dietz MTM values as secondary fields. The detail page consumes the public daily-performance V2 projection with the same primary wallet-PnL basis.

## Recent performance

`/public/execution/rolling-performance.json` supplies fixed 7-day and 30-day account windows. V2 uses the same primary wallet-balance accounting as daily V2: ending wallet balance minus starting wallet balance minus net capital inflow, with positive inflows added to the return denominator. Open-position unrealized movement is excluded from the primary rolling result until realized. The prior Modified Dietz mark-to-market PnL and return remain explicit secondary fields.

The website never infers 7D/30D returns from daily percentages. If the rolling feed is missing, malformed or stale, the dashboard shows that state instead of synthesizing a result.

## Public daily calendar

The calendar currently begins on 2024-11-13 because that is the earliest date in the supplied Binance Futures transaction export. This is a data-coverage boundary, not a verified first-ever trade or account-inception date. Historical values through the complete CSV export window are derived from the supplied Binance Futures Transaction History files. Authenticated daily telemetry from 2026-08-01 onward comes from `/public/execution/daily-performance.json`. V2 makes Binance-compatible wallet PnL and PnL % the primary daily figures while retaining the existing flow-adjusted mark-to-market figures as secondary context. Every visitor sees the same public calendar; browser-local notes never override financial values.

A row is one of:

- `CLOSED`: a completed UTC day with validated backend anchors;
- `IN_PROGRESS`: the latest UTC day through the latest authenticated observation;
- `MISSING`: the backend could not support that day from validated boundary evidence. For dates through 2026-09-22, the UI may replace this display-only gap with a clearly labelled historical export realized-cash-PnL fallback.

The CSV history uses the two user-provided Binance Futures Transaction History exports in UTC+09:00 and re-buckets every event to UTC days. It sums supported BTCUSDT/BTCUSDC REALIZED_PNL, FUNDING_FEE and USDT/USDC COMMISSION under the same stablecoin-par convention used by the authenticated reporting layer. TRANSFER and COIN_SWAP flows are excluded. BNB-denominated commissions are not assigned a made-up USD value, and ambiguous INSURANCE_CLEAR rows are not silently counted; dates containing those items are labelled partial. CSV history has no wallet-balance boundary observations, so it never publishes a daily return. From 2026-08-01 onward CLOSED/IN_PROGRESS ledger rows always override CSV history; CSV is used only when that ledger row is MISSING.

The V2 primary daily PnL follows the Binance Futures PNL Analysis wallet-balance definition: ending wallet balance minus beginning wallet balance minus net capital inflow. Its PnL % denominator is beginning wallet balance plus positive inflow. Open-position unrealized PnL is excluded from this primary figure until it reaches wallet balance. The older Modified Dietz flow-adjusted mark-to-market PnL/return remains available as a secondary research measure. The current day is visibly incomplete. Monthly summaries keep authenticated ledger-day PnL and historical export realized cash PnL separate so unlike accounting bases are not silently added together; daily percentage returns are never summed.

The public projection contains no balances, exact position sizes, prices, credentials, order identifiers or personal notes.

## Private notes

The calendar can hold a private text note for the site owner. Notes remain in browser localStorage under `meanydeany.trading-journal.v1`; they are not uploaded, published or visible to interviewers. JSON export/import remains a browser-local backup mechanism. Historical browser-local PnL/return fields from the earlier journal format may remain in backups for compatibility, but the UI does not treat them as account performance.

## Freshness

Public feeds poll every 30 seconds while visible, use a 10-second request deadline and preserve the last validated value on failed refresh. Each source publishes its own freshness TTL: performance and trade-day win-rate feeds currently use 180 seconds, while the lower-frequency withdrawal summary uses 600 seconds. A failed or malformed feed never implies that the account is flat, that a missing day had zero PnL, or that no withdrawal occurred.

The public daily projection is produced by the execution-gateway reporting layer from the existing authenticated flow-adjusted ledger. The website itself has no Binance credential, private exchange call, order route or execution capability.



## Trade-day win rate

The dashboard also shows a separate trade-day win rate derived from actual Binance USD-M fill history rather than from calendar MTM marks. The day basis is UTC to match the public trading calendar.

For each UTC date with futures fills, the resolved trading result is realized trade PnL after trading commissions and with funding excluded. Historical USDT/USDC commissions are used directly. Historical BNB commissions are translated to USD with the contemporaneous BNBUSDT 1-minute close, so the aggregate win rate is explicitly approximate rather than presented as exchange-native accounting.

A date enters the win-rate denominator only when it has a resolved realized outcome. Fill-only or flat dates are excluded instead of being mislabeled as losses. The historical base through 2026-09-28 UTC contains 152 winning resolved days and 70 losing resolved days, for approximately 68.47%.

From 2026-09-29 UTC onward, the public win-rate feed extends that frozen historical base from authenticated ledger REALIZED_PNL and COMMISSION events. FUNDING_FEE is explicitly excluded. The server refreshes the feed with the same read-only reporting cycle, and the website polls it every 30 seconds. Funding fees remain part of the separate account cash-PnL and wallet-PnL views where appropriate.


## External withdrawal summary

The account card publishes a sanitized historical-plus-live external-withdrawal aggregate. The frozen historical base comes from the supplied Binance withdrawal-history export and contains 24 completed external withdrawals through 2026-09-25: 12 direct USDT/USDC withdrawals and 12 XRP withdrawals.

No wallet address, TXID, account ID or raw withdrawal row is shipped to the site. Historical USDT and USDC are valued at par. Historical XRP uses the contemporaneous transaction-implied USDT valuation already documented for the export, so the base remains explicitly approximate.

From 2026-09-26 UTC onward, a GET-only Binance withdrawal-history publisher extends the aggregate automatically. USDT/USDC continue at par. New non-stablecoin withdrawals use the Binance spot 1-minute close at the withdrawal apply minute with a direct USDT or USDC pair. If a new asset cannot be valued from either direct pair, publication fails closed rather than silently omitting it. The private incremental state stores only hashed withdrawal identities and sanitized valuation facts, never addresses or TXIDs.

The frozen historical base is approximately 5,933.11 USDT equivalent net sent plus 9.77 USDT equivalent fees, or 5,942.87 USDT equivalent total account outflow. Any completed withdrawal after the live-extension boundary is added automatically. Futures TRANSFER and COIN_SWAP rows are not counted as external withdrawals.
