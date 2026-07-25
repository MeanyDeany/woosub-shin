# BTC Research Observatory

## Architecture

The website displays a sanitized, server-generated research bundle. It does
not calculate direction, volatility context, model state, strategy, or trading
permission in the browser.

```text
AWS BTC research server
  -> read-only SQLite completed bars
  -> authoritative descriptive state log
  -> sanitized atomic JSON bundle
  -> static HTTPS + CORS
  -> portfolio website
```

The public bundle must be produced by the `btc_research_assistant` exporter and
served as one JSON file. Do not expose the SQLite database, repository, reports
directory, logs, credentials, or private server endpoints.

## Website environment

Configure the deployed website with:

```text
NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL=https://<research-host>/public/research/btcusdt-5m.json
```

The page polls the validated bundle every 60 seconds. A failed refresh keeps
the last validated bundle visible with a warning. When no URL is configured,
the page shows an explicit unconfigured state and never invents placeholder
market or research values.

## Chart modes

### Built-in evidence chart

The repository includes a dependency-free SVG close-price path with exact
server transition marks. It is the default and is always available when a
valid bundle is available.

### TradingView Advanced Charts

Advanced Charts assets are proprietary and are not committed to this public
repository. After a separately licensed deployment provides the library at a
private static path, configure:

```text
NEXT_PUBLIC_TRADINGVIEW_CHARTING_LIBRARY_PATH=/charting_library/
```

The component then loads `charting_library.standalone.js` and supplies the
same validated bundle through the custom JavaScript Datafeed API:

- `onReady`;
- `searchSymbols`;
- `resolveSymbol`;
- `getBars`;
- `subscribeBars`;
- `unsubscribeBars`;
- `getMarks`; and
- `getServerTime`.

Only `BTCUSDT` and resolution `5` are exposed. State-transition marks are
limited to direction, composite volatility, and vol-of-vol changes.

If the licensed library asset cannot be loaded, the component remains on the
built-in evidence chart instead of failing the page.

## Public state boundary

The UI displays:

- completed BTCUSDT 5-minute OHLCV;
- exact server observation and bar timestamps;
- direction context;
- composite volatility context;
- vol-of-vol context;
- filter agreement;
- selected shadow proxy regimes;
- transition marks;
- freshness ages; and
- bundle/source SHA-256 identities.

It does not display or receive:

- allowed or forbidden strategy;
- execution watch state;
- shadow recommendation;
- entry or short permission;
- position or sizing;
- leverage or allocation;
- order, fill, broker, paper, or live trading fields.

The GARCH-labeled filter values are explicitly labeled proxies. They are not
the immutable Tier-2 model forecast-state events.

## Research boundary

```text
SERVER-AUTHORITATIVE DESCRIPTIVE RESEARCH CONTEXT ONLY; NO MODEL SELECTION, STRATEGY, POLICY, ENTRY, SHORT PERMISSION, POSITION, SIZING, LEVERAGE, ALLOCATION, ORDER, BROKER, PAPER/LIVE, OR EXECUTION AUTHORITY
```
