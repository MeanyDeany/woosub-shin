# Account dashboard and daily journal

The home account section and `/projects/btc-futures-research/live-position` share a compact, responsive dashboard. Existing public V2 positions, V2 lifetime performance and V1 rolling performance parsers remain unchanged. No account, exchange, order or strategy APIs were added.

## Daily records

The calendar is explicitly a manual UTC journal, not a Binance daily PnL feed. The existing connected feeds provide current and rolling aggregate observations, not daily history. Unknown days stay empty. Monthly net PnL sums only manually recorded amounts, counts those days, and never sums return percentages or reconstructs daily PnL from cumulative-return changes.

Records live in browser localStorage under `meanydeany.trading-journal.v1`. They are private to that browser profile and site origin, not synchronized across devices, not published to visitors, and are removed if site data is cleared. JSON export/import supports backups and explicitly confirms overwrite conflicts. Size, date, duplicate, number and note validation happens before storage writes. A saved-version check rejects stale same-day drafts after another tab saves. This is not a transactional multi-user store. No server storage or automatic browser-closed recording is claimed.

## Freshness and privacy

Each public feed polls at 30 seconds while the page is visible, uses a 10-second request deadline, aborts superseded/unmounted requests and rejects malformed, future-dated or older observations. The last good values remain visible with degraded/stale status; unavailable data never implies a flat account. The source's 180-second freshness TTL remains authoritative. Live labels are data-dependent, not decorative.

The source still determines all public financial values, Modified Dietz methodology, August 1 tracking boundary and canonical positions order. Sizes, exact prices, balances, credentials and per-position PnL remain excluded. Regular/algo order presence is not labelled as protection.

## Verification

`node --experimental-strip-types --test tests/*.test.mjs`

The scoped UI workflow type-checks, lints and builds the real application, then exercises position filters, local daily saving and reload, backup export/import, delete, month navigation, keyboard access, desktop/mobile layout, stale feeds, flat feeds and malformed feeds in Chromium. Browser screenshots are marked synthetic QA fixtures and must never be described as actual account performance. No journal or fake account seed data is included in production rendering.
