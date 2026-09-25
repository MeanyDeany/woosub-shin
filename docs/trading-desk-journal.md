# Public account dashboard and private notes

The home account section and `/projects/btc-futures-research/live-position` share a compact responsive dashboard. Existing public V2 positions, V2 lifetime performance and V1 rolling performance remain read-only. The detail page additionally consumes the public V1 UTC daily-performance projection.

## Public daily calendar

The calendar begins on 2024-11-15, the first supplied Binance futures transaction date. Historical values through the complete CSV export window are derived from the supplied Binance Futures Transaction History files. Authenticated account PnL and return from 2026-08-01 onward come from `/public/execution/daily-performance.json`. Every visitor sees the same public calendar; browser-local notes never override financial values.

A row is one of:

- `CLOSED`: a completed UTC day with validated backend anchors;
- `IN_PROGRESS`: the latest UTC day through the latest authenticated observation;
- `MISSING`: the backend could not support that day from validated boundary evidence. For dates through 2026-09-22, the UI may replace this display-only gap with a clearly labelled historical CSV realized-PnL fallback.

The CSV history uses the two user-provided Binance Futures Transaction History exports in UTC+09:00 and re-buckets every event to UTC days. It sums supported BTCUSDT/BTCUSDC REALIZED_PNL, FUNDING_FEE and USDT/USDC COMMISSION under the same stablecoin-par convention used by the authenticated reporting layer. TRANSFER and COIN_SWAP flows are excluded. BNB-denominated commissions are not assigned a made-up USD value, and ambiguous INSURANCE_CLEAR rows are not silently counted; dates containing those items are labelled partial. CSV history has no UTC-boundary unrealized mark, so it never publishes a daily return. From 2026-08-01 onward CLOSED/IN_PROGRESS ledger rows always override CSV history; CSV is used only when that ledger row is MISSING.

The current day is visibly incomplete. Monthly summaries keep authenticated ledger-day PnL and CSV realized PnL separate so unlike accounting bases are not silently added together; daily percentage returns are never summed.

The public projection contains no balances, exact position sizes, prices, credentials, order identifiers or personal notes.

## Private notes

The calendar can hold a private text note for the site owner. Notes remain in browser localStorage under `meanydeany.trading-journal.v1`; they are not uploaded, published or visible to interviewers. JSON export/import remains a browser-local backup mechanism. Historical browser-local PnL/return fields from the earlier journal format may remain in backups for compatibility, but the UI does not treat them as account performance.

## Freshness

Public feeds poll every 30 seconds while visible, use a 10-second request deadline and preserve the last validated value on failed refresh. The source's 180-second freshness TTL is authoritative. A failed or malformed feed never implies that the account is flat or that a missing day had zero PnL.

The public daily projection is produced by the execution-gateway reporting layer from the existing authenticated flow-adjusted ledger. The website itself has no Binance credential, private exchange call, order route or execution capability.
