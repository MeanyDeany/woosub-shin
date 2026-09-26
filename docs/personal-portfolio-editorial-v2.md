# Personal portfolio editorial release V2

Date: 2026-09-26
Base: 626df897d1ed73848b36af64cb41ff22972231ca (website PR46)

## Purpose

Make Woosub Shin, rather than a framework acronym or an operational dashboard, the organizing subject. The visitor should be able to move from the personal account record to a research question, a bounded result, and the system supporting the next experiment.

Primary navigation: Trading / Research / Papers / Systems / About. ASRA remains the exact name AI Systematic Research Architecture, with its canonical /asra route and existing archive intact.

The homepage presents identity, published account observations, three connected research case studies, current market-data/replay work, working method, and contact. Long historical comparisons remain in their detailed research pages instead of competing with the personal identity above the fold.

## Visual direction

An editorial research journal with a dedicated dark account ledger: warm neutral surfaces, serif display headings, existing Geist body type and Geist Mono metadata, thin rules, asymmetric margins, and restrained link transitions. No fake market charts, decorative 3D, new fonts, animation dependency, loading theatre, or hidden-on-load content. Both stored themes and reduced-motion preferences are supported.

Reference reading: Hudson River Trading (research/engineering identity), Jane Street (technical subject matter), Man Insights (editorial grouping), and karpathy.ai (individual work as the primary organizing subject). These informed information hierarchy only; no logos, illustrations, copy, or branded assets were reproduced.

## Evidence provenance

- The personal account implementation and public-feed parsers are unchanged.
- Inception remains 2026-08-01 for authenticated flow-adjusted returns.
- Calendar CSV history begins 2024-11-15. It is realized stablecoin cash PnL, not historical account return. Missing marks, unsupported fees, and ambiguous events remain explicit.
- Trader-behavior figures are the already public homepage values from PR39/46: 686 eligible episodes, 114 final holdout, 71.05% direction accuracy, 67.76% balanced accuracy, MCC 0.353; 689 complete episodes, gross win rate 66.47%, worst 1% accounts for 50.20% of losing PnL. Entry ROC-AUC 0.5583 and tail PR-AUC 0.1364 do not establish profitable entries or a reliable risk veto.
- Risk-forecast summary preserves the existing +12.58% Log-MSE improvement and explicitly says it is not an investment return. All registry values and original detail pages remain unchanged.
- Academic headings remain the existing website display titles; original PDFs and detailed pages govern exact title, scope, sample, and findings. No unverified thesis asset-list change or new academic metric is introduced.
- Current engineering description was checked against the latest repository metadata, including merged C++ replay local-compute benchmark work. No proprietary threshold, raw event data, new private empirical coefficient, or protected holdout is published. Research-only status is retained.

## Order-history boundary and unfinished upstream work

The existing four public feeds contain account aggregates, daily history, rolling windows, and current positions. They do not contain a complete order or fill lifecycle. The new Trading page explicitly distinguishes this from order history. It does not invent a table of orders, infer fill prices from income rows, or advertise coverage that is absent.

A later order-history release requires a sanitized upstream publisher with a versioned read-only contract, explicit time coverage and gaps, and a review of the exact public fields. No Binance credential or private endpoint belongs in the browser. Prices, exact quantities, account/order IDs and private notes remain excluded in this release. No upstream publisher or execution repository is modified.

## Acceptance

Preserve all existing routes and PDFs, strict telemetry parsing, CSV precedence, private notes, stale/unavailable behavior, and immutable research metrics. Add route and content-link tests for the three new pages. Browser checks must cover desktop/mobile, both themes, reduced motion, navigation, single h1, no horizontal document overflow, console errors, and legacy trading-desk interactions. A passing static build alone is not visual QA.

Implementation should be reviewed as a branch/PR preview before production promotion. No production deployment is implied by this document.
