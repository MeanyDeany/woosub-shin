# Public account dashboard and private notes

The home account section and `/projects/btc-futures-research/live-position` share a compact responsive dashboard. Existing public V2 positions, V2 lifetime performance and V1 rolling performance remain read-only. The detail page additionally consumes the public V1 UTC daily-performance projection.

## Public daily calendar

Daily account PnL and return come from `/public/execution/daily-performance.json`. Every visitor sees the same values. The site does not reconstruct daily results from lifetime values and does not let browser-local data override the public feed.

A row is one of:

- `CLOSED`: a completed UTC day with validated backend anchors;
- `IN_PROGRESS`: the latest UTC day through the latest authenticated observation;
- `MISSING`: the backend could not support that day from validated boundary evidence. For dates through 2026-09-22, the UI may replace this display-only gap with a clearly labelled historical CSV realized-PnL fallback.

The CSV fallback comes from the user-provided Binance Futures Transaction History export in UTC+09:00, re-bucketed to UTC days. It sums REALIZED_PNL, FUNDING_FEE and COMMISSION and excludes TRANSFER. Because the CSV does not contain UTC-boundary mark-to-market observations, a CSV fallback is labelled as realized PnL only and shows no daily return. It never overrides a CLOSED or IN_PROGRESS ledger row. Days after the complete export window remain missing rather than inferred.

The current day is visibly incomplete. Monthly summaries keep authenticated ledger-day PnL and CSV realized PnL separate so unlike accounting bases are not silently added together; daily percentage returns are never summed.

The public projection contains no balances, exact position sizes, prices, credentials, order identifiers or personal notes.

## Private notes

The calendar can hold a private text note for the site owner. Notes remain in browser localStorage under `meanydeany.trading-journal.v1`; they are not uploaded, published or visible to interviewers. JSON export/import remains a browser-local backup mechanism. Historical browser-local PnL/return fields from the earlier journal format may remain in backups for compatibility, but the UI does not treat them as account performance.

## Freshness

Public feeds poll every 30 seconds while visible, use a 10-second request deadline and preserve the last validated value on failed refresh. The source's 180-second freshness TTL is authoritative. A failed or malformed feed never implies that the account is flat or that a missing day had zero PnL.

The public daily projection is produced by the execution-gateway reporting layer from the existing authenticated flow-adjusted ledger. The website itself has no Binance credential, private exchange call, order route or execution capability.
