# ASRA portfolio redesign V1 — validation record

Validation date: 9 September 2026. This record preserves the original ASTRA redesign, completed V3 update, and English-only visual refinement as historical stages. The current refinement begins from verified local/remote/Draft PR head `fa561899b0f2d18f8241a8c506d88e66708a619c` and establishes **ASRA — AI Systematic Research Architecture**, the canonical `/asra` route, and a static cosmic visual treatment. Its 25 regression tests, production build/type checking, lint comparison, rendered-page and metadata audits, 14 HTTP redirect responses, protected-file checks, asset comparison and 100 responsive checks pass. Screenshot, contrast and interaction review are complete. The same branch and Draft PR #38 remain in use; its body records the exact delivery head and observed post-push status. Automatic preview is authorized; manual production deployment and merge remain unauthorized.

## Source and authorization

| Item | Recorded value |
| --- | --- |
| Approved repository base | `eafc9680c6f992e78ead3ef775d6c866b602b8fe` |
| Implementation branch | `codex/astra-portfolio-redesign-v1` |
| Reviewed plan | `docs/astra-portfolio-redesign-plan-v1.md` |
| Original plan-only commit | `3cd6e96098d527cd65e33418049fd78bd15d0004` |
| Approved narrow lockfile repair | `5902847d9aaabb1d2b3cd83a590165daa83f14ed` |
| Binding scheduler-completion plan update | `56ca79b3051178d67d2ed2611eeb85cbdc364db9` |
| Previous delivery head / PR head before V3 update | `914007e8516398020463754281fa32be109d2972` |
| Completed V3 delivery / refinement baseline | `42044142c041c23b8215c5ba23c076e2d8efe594` |
| English-only refinement delivery / ASRA refinement baseline | `fa561899b0f2d18f8241a8c506d88e66708a619c`; exact local, remote and existing Draft PR head verified before refinement |
| ASRA refinement final delivery / verified remote head | Recorded in the existing Draft PR body after the authorized same-branch push, avoiding a self-referential commit identifier in this document |
| Existing Draft PR | [#38](https://github.com/MeanyDeany/woosub-shin/pull/38), base `main`; open, Draft, unmerged at the pre-update check |

The first commit carried forward only the reviewed planning document. Its historical filesystem review links are preserved as approved documentation; application content does not publish those paths. Later plan edits record the user's binding research update rather than silently changing the original scientific interpretation.

The implementation brief explicitly assigned the completed policy study a RETROSPECTIVE evidence class and requested compact homepage policy values. Those instructions supersede the earlier plan's unasserted policy class and detail-only numerical presentation. Later binding updates completed Native Scheduler Robustness V1 and, after the original redesign validation, Candidate Generator V3. No study is presented as active within the current supplied research freeze.

No merge or production deployment is authorized or performed by this validation phase. The user separately authorized the automatic Vercel preview caused by pushing this update.

## ASRA branding and cosmic refinement — 9 September 2026

The current binding refinement starts from the clean delivery head `fa561899b0f2d18f8241a8c506d88e66708a619c`. The [dated plan addendum](astra-portfolio-redesign-plan-v1.md#30-post-plan-asra-branding-and-cosmic-presentation-addendum-9-september-2026) records the exact scope. Public identity becomes **ASRA — AI Systematic Research Architecture**; earlier ASTRA branding in the historical sections below describes the previous deliveries rather than current copy. This refinement changes presentation and route identity, not scientific outcomes, numerical records or execution authority.

The verified production inventory remains **18 English pages**. `/asra` replaces `/astra` in the public registry, navigation, canonical metadata and sitemap. The retired `/astra` URL receives an explicit **307** redirect to `/asra`, alongside the **13 unchanged Korean compatibility redirects**; none is a public sitemap entry. Metadata contains no Korean language alternates. The existing branch name, the internal `app/astra.css` filename/import, historical documentation filenames and passages, the explicit legacy redirect source, and negative/migration test assertions intentionally retain the old spelling. These names do not justify public ASTRA branding.

The authorized visual treatment uses static atmospheric light, sparse observation points, fine arcs and scientific surface detail around readable content. It keeps Home server-rendered, adds no decorative client hydration or visual dependency, preserves the stronger independent-risk metric hierarchy above the historical table, and distinguishes Systems with muted operational colors. Source and dependency checks confirm zero new visual dependencies and zero decorative client hydration: `ObservationField` is a static server-rendered inline SVG with no client directive, state, event handlers or browser API. Its wrapper is `aria-hidden`, its SVG is nonfocusable, and its decorative layer ignores pointer events. Home remains server-rendered with no telemetry fetch or polling mount. Static CSS illumination and geometry add presentation bytes without adding a decorative client bundle.

Before the prior production build was replaced, the asset inventory, 14 protected file hashes, 84 tracked source hashes and the relevant route/metadata/layout/Home source snapshots were preserved outside the repository. The baseline measurements below use unique initial assets referenced by the generated English homepage and local gzip compression. They exclude headers, runtime prefetch, third-party transfers, interaction work and Core Web Vitals.

| English homepage asset | Verified ASRA refinement baseline `fa56189` | Final ASRA refinement | Change |
| --- | ---: | ---: | ---: |
| JavaScript, raw | 641,939 B | 641,937 B | −2 B |
| JavaScript, gzip estimate | 191,259 B | 191,257 B | −2 B |
| CSS, raw | 118,080 B | 125,446 B | +7,366 B |
| CSS, gzip estimate | 23,031 B | 24,348 B | +1,317 B |
| HTML, raw | 70,205 B | 81,140 B | +10,935 B |
| HTML, gzip estimate | 13,399 B | 15,966 B | +2,567 B |

Both builds have nine initial JavaScript assets. The two-byte JavaScript difference is negligible and is not evidence of an interaction improvement. Static HTML rises by 2,567 B and CSS by 1,317 B in local gzip estimates. Against the original approved base, initial Home JavaScript is 4.83% smaller by the same gzip estimate. The earlier English-only comparison and original approved-base measurements remain in the historical sections below.

| ASRA refinement check | Current status |
| --- | --- |
| Evidence, page, route and telemetry regression tests | Passes: 19 evidence/page/route tests and 6 telemetry tests, 25 combined |
| Production build and TypeScript | Passes: Next.js 16.2.10 Turbopack, compilation 1.830 s, type checking 2.8 s, 23/23 generated outputs including 18 public pages |
| Scoped lint and whole-repository lint comparison | Scoped lint passes for all 48 surviving changed and new JavaScript/TypeScript files against the approved base, with zero errors/warnings. Whole lint exits 1 with exactly the prior 7 errors and 1 warning, matching rule, severity and source location |
| Rendered route/link/fragment/landmark/ARIA audit | Passes: 18 pages, 466 internal links, 184 fragment destinations and 14 explicit redirect contracts; zero issues; no retired brand in public text or accessible labels |
| Metadata, canonical URLs and sitemap | Passes: 18 unique page titles/canonicals/Open Graph URLs, exactly 18 sitemap URLs including `/asra`, English document language, zero hreflang/Korean public URLs or retired branding |
| Actual legacy redirect responses | Passes: all 14 local production responses return 307 with the exact destination and both query values preserved; requests were not followed. A browser visit to `/astra?source=legacy#timeline` reaches `/asra?source=legacy#timeline` with English document language and the ASRA canonical URL |
| Protected files, contact contract, Analytics, package/lockfile and papers | Passes: all 14 files match `fa561899`; all 454 prior lock entries and both PDFs remain unchanged from the approved base; contact handler matches by syntax-tree text; Analytics mount count is one |
| Homepage assets and decorative dependency/hydration review | Passes: refreshed same-condition measurements above; nine initial scripts, zero visual dependencies and zero decorative client hydration |
| Tracked ASTRA/Astra/astra occurrence classification | Passes: remaining current-source matches are one internal stylesheet import, one legacy redirect source, and six negative/migration test assertions; documentation occurrences are historical or explicit migration records; no unclassified source match |
| Responsive and visual review | Passes: 100/100 unique route/viewport/theme combinations across all 10 required routes, five sizes and both themes; 90 production checks plus 10 settled UNAVAILABLE monitor checks with local endpoint overrides. Targeted screenshots, semantic contrast, table keyboard scrolling, menu Escape/focus return and native empty-contact validation also pass |
| `git diff --check` | Passes after the automated validation-record update |
| Final commit, exact remote/PR head, PR title and observed hosted status | Local validation complete; exact post-push verification is recorded in the existing Draft PR body. No manual production deployment or merge |

All four files responsible for whole-repository ESLint findings remain byte-identical to both `fa561899` and the original approved base; their exact findings are retained in the historical V3 section. No new ESLint finding or blanket suppression was introduced. Direct TypeScript test loading still emits Node's typeless-package module warning, including the existing `next.config.ts` import path; this warning is separate from lint debt.

The 14 protected files include both API handlers, the complete contact component, telemetry libraries and contract test, package manifest/lockfile, paper placeholder and both public PDFs. Every file matches the ASRA refinement baseline. Relative to the original approved base, only the previously approved contact-form presentation/accessibility changes and narrow missing-entry lock repair differ. The package manifest is unchanged; all 454 pre-existing non-root lock entries, earlier root dependencies, other root fields and other top-level lock fields are unchanged. Only `lightweight-charts@5.2.0`, `fancy-canvas@2.1.0` and the already-declared root chart dependency were added by the earlier approved repair. Both recorded PDF SHA-256 values below remain exact. No fresh dependency installation or upgrade was needed for this refinement.

The 100-case browser matrix covers Home, ASRA, Research, Risk Forecasting, Nonlinear Measurement, Systems, Daily EMA, the operational monitor, Resume and Contact at 1440×900, 1280×800, 768×1024, 390×844 and 320×568 in both themes. All 100 combinations pass with one H1 and main landmark, no unintended overflow or clipping, no framework error overlay, and no retired public branding or links. Ninety cases use local production; the monitor's ten cases use development with process-local endpoint overrides and are checked after settling to UNAVAILABLE. No external telemetry endpoint is contacted. Decorative SVG layers remain aria-hidden, nonfocusable, noninteractive and unanimated across the matrix. The existing one-pixel Company honeypot is excluded from visible-content geometry after DOM verification of its hidden, `tabIndex=-1` behavior; it is not a new application defect.

The program redirect preserves both query and fragment in the browser, with English document language and the `/asra` canonical URL. Mobile-menu Escape closes the menu and returns focus. Native empty-contact submission marks name, email and message invalid and focuses name without a POST or email delivery. The first production Home load reports no browser errors. At 320px, the historical table's focusable region has a 278px viewport for its 690px table; ArrowRight advances its scroll position from 0 to 40px, with a visible 2px focus outline. Primary risk numerals remain 57.6px versus 18px historical numerals at 1440px, and 38px versus 18px at narrow mobile widths.

Targeted screenshots were inspected for all ten required pages, both observation tracks, the pipeline, primary metrics, the historical table and caveats, completed V3 detail, and settled unavailable telemetry. The before Home image is the prior production capture at `fa561899` (`astra-after-home.jpg`); the new matched 1440×900 dark capture is `asra-after-home-1440-dark.jpg`. Additional local artifacts include `asra-pipeline-1440-dark.jpg`, `asra-timeline-1440-dark.jpg`, `asra-home-320-light.jpg`, `asra-responsive-qa.json` and `asra-contrast-check.json`. They remain outside the repository/application and are presented in the implementation conversation.

Computed primary/secondary/accent/evidence text tokens were compared against all three defined opaque surfaces. Minimum ratios are 5.16:1 in light and 6.40:1 in dark; this is a semantic-token check, not a pixel-level audit of every retained exhibit state. Background geometry and every SVG child have `animation-name: none`; existing reduced-motion CSS removes transitions and animations. No decorative motion exists in either preference state. Reduced-motion emulation, full screen-reader testing, real browser zoom, field Core Web Vitals and external-service transitions were not performed. Responsive viewport overrides were reset after review.

All completed scientific constraints remain current: independent risk +12.58% Log-MSE, +11.65% QLIKE and 4/4 chronological segments; all nine frozen historical comparison values and nearby caveats; the completed negative policy finding; the bounded synthetic scheduler result; completed retrospective V3 with zero finalists and unopened holdout; and two separate proposed follow-ups with no active study. APIs, telemetry, contact delivery, Analytics, dependencies and public papers remain protected. No private research URL or source artifact is added for the branding refinement.

## English-only visual and historical-performance refinement — historical validation, 9 September 2026

The completed English-only refinement follows V3 delivery head `42044142c041c23b8215c5ba23c076e2d8efe594`. At that baseline, the repository was clean and contained 31 public pages: 18 English and 13 Korean. The prior 18-test result and exact 7-error/1-warning lint baseline are retained as history; they are not claimed as reruns of this refinement. Protected hashes and the earlier production asset measurement were preserved before this work.

The production build contains exactly **18 English public pages**. The Korean route tree, language switching, Korean public registry entries, sitemap URLs, and metadata language alternates are retired. All **13 previously valid Korean URLs** receive explicit **HTTP 307** redirects to their existing English counterparts. The root `/ko` maps to `/`; each other known source strips its `/ko` prefix. No wildcard destination is introduced. The full mapping is recorded in the [dated plan addendum](astra-portfolio-redesign-plan-v1.md#29-post-plan-english-only-and-visual-refinement-addendum-9-september-2026). The exact installed Next.js 16.2.10 redirect and sitemap guides were consulted; temporary redirects preserve the option to revisit the user's “for now” language decision. Actual local production responses confirmed all 13 status codes and destinations and preserved both query values in every request. HTTP requests do not transmit fragments; browser fragment behavior is reviewed separately.

The generated public sitemap contains exactly these 18 page routes, with zero language alternates:

```text
/
/astra
/research
/research/risk-forecasting
/research/nonlinear-measurement
/papers
/projects
/projects/btc-final-system
/projects/btc-futures-research
/projects/btc-futures-research/live-position
/projects/btc-regime-challenger
/projects/multi-asset-research-lab
/projects/multi-asset-research-lab/claims
/projects/volatility-regime-filtering
/projects/bitcoin-bubble-gsadf
/resume
/contact
/build-log
```

Home now places **Historical Research Performance** directly after the strongest independent finding and before How ASTRA Works. The independent **+12.58% Log-MSE / +11.65% QLIKE / 4 / 4** evidence remains the primary proof point. The secondary semantic comparison uses only the frozen historical figures:

| System | Return | Sharpe | MaxDD | Evidence / role |
| --- | ---: | ---: | ---: | --- |
| Daily EMA 50/200 | +165.92% | 0.769 | −29.37% | RETROSPECTIVE · retained |
| BTC price-only buy & hold | +38.33% | 0.394 | −66.94% | RETROSPECTIVE · reference |
| BTC perpetual long, funding-adjusted | +2.27% | 0.265 | −68.12% | RETROSPECTIVE · reference |

Visible retained-system caveats remain **post-selection; 3 completed historical trades; one trade contributed 97.4% of positive completed-trade log growth; not untouched OOS confirmation; not live performance**. The section links to `/projects/btc-final-system`; neither the return magnitude nor row styling grants a stronger scientific claim. The existing study's detailed assessment context and values remain unchanged.

The visual refinement uses denser evidence strips and card grouping, alternating surfaces, subtle rules/grid texture, stronger metric hierarchy, richer timelines, restrained depth and transitions, and clearer Research/Systems distinction. It adds no Three.js, WebGL, live ticker, decorative candlesticks or new visualization dependency. Systems links compactly to the read-only monitor, retained historical system, research infrastructure and execution engineering while keeping **NO AUTOMATIC EXECUTION AUTHORITY** visible. Operational metrics and polling remain at `/projects/btc-futures-research/live-position`; Home contains no telemetry fetch or polling mount.

| Refinement check | Current status |
| --- | --- |
| Evidence/page and English-only route contracts | Passes: 15 tests |
| Telemetry regression suite | Passes: 6 tests; 21 combined regression tests pass |
| Production build and TypeScript | Passes with Next.js 16.2.10 Turbopack: compilation 1.633 s, type checking 2.4 s, 23/23 generated outputs including 18 public pages |
| Scoped lint | Passes: all 47 surviving JavaScript/TypeScript source files changed from the approved base; zero errors or warnings |
| Whole-repository lint comparison | Exit 1 with exactly 7 errors and 1 warning; rules, severity and source locations match the prior recorded baseline |
| Rendered routes, links, fragments, landmarks and ARIA references | Passes: 18 English pages, 466 internal links, 184 fragment destinations, 13 explicit redirect contracts, zero issues |
| Metadata and sitemap | Passes: 18 unique page titles/canonicals/Open Graph URLs, English document language on every page, 18 sitemap entries, zero hreflang or Korean public URLs |
| Legacy redirect responses | Passes: all 13 HTTP responses return 307 and the expected `Location`, with query values preserved; requests were not followed |
| Protected file, package/lockfile and paper integrity | Passes: all 14 snapshot files unchanged from the refinement base; only the original approved contact-form and lockfile exceptions differ from the original base |
| Homepage asset comparison | Refreshed for English Home; exact measurements and comparison conditions below |
| Responsive and visual review | Passes: 10 required routes × five viewport sizes × both themes (100 combinations), plus targeted screenshots and before/after Home captures |
| `git diff --check` | Passes after the validation-record update |
| Commit, exact remote head and Draft PR body/state | Local validation complete; the same-branch push and automatic preview are authorized. Exact post-push verification is recorded in the existing Draft PR body |

The four files responsible for whole-repository lint findings are byte-identical to both the approved base and refinement head: `components/btc-live-position.tsx` (1 error), `components/btc-research-observatory.tsx` (5 errors), `components/market-shock-terminal.tsx` (1 error), and `lib/tradingview-observatory-datafeed.ts` (1 warning). The existing findings are listed in the historical V3 section below; no new ESLint finding or blanket suppression was introduced. Direct test loading emits Node's typeless-package module warning, now also for `next.config.ts`; this loader warning is separate from the ESLint result.

All 14 protected snapshot files match refinement head `42044142c041c23b8215c5ba23c076e2d8efe594`, including the complete contact component, both API handlers, telemetry libraries and contract test, dependency manifest/lockfile, and both public papers. Against the original approved base, all 454 pre-existing non-root lock entries remain unchanged and the only package additions remain the previously approved `lightweight-charts@5.2.0` and `fancy-canvas@2.1.0` repair. Both PDF SHA-256 values below remain unchanged. A repeated syntax-tree comparison confirms the contact submission handler is byte-identical to the original base; Analytics remains mounted once. The refinement needed no dependency upgrade or fresh installation.

The English homepage asset comparison uses the same default production build and unique initial asset inventory as the earlier measurements. Gzip values are local compression estimates; they exclude request headers, runtime prefetch, third-party transfers and interaction work. The previous multilingual measurements remain historical records rather than being overwritten.

| English homepage asset | Refinement base `4204414` | English-only refinement | Change |
| --- | ---: | ---: | ---: |
| JavaScript, raw | 644,412 B | 641,939 B | −2,473 B |
| JavaScript, gzip estimate | 192,006 B | 191,259 B | −747 B |
| CSS, raw | 108,204 B | 118,080 B | +9,876 B |
| CSS, gzip estimate | 20,808 B | 23,031 B | +2,223 B |
| HTML, raw | 56,848 B | 70,205 B | +13,357 B |
| HTML, gzip estimate | 10,067 B | 13,399 B | +3,332 B |

The homepage still references nine initial JavaScript assets. Against the original approved base, JavaScript is 34,639 B smaller raw and 9,694 B smaller by gzip estimate (−4.82%); CSS is 13,614 B larger raw and 3,259 B larger by gzip estimate. These counts describe the richer static presentation and reduced language-switching client code; they are not Core Web Vitals or a measured interaction-performance improvement.

The completed geometry matrix covers Home, ASTRA, Research, Risk Forecasting, Nonlinear Measurement, Systems, Daily EMA, the read-only operational monitor, Resume and Contact at 1440×900, 1280×800, 768×1024, 390×844 and 320×568 in dark and light. All 100 combinations pass: no unintended document or visible-child overflow/clipping, one main landmark and H1, no Korean navigation links or language-switcher labels, and no framework error overlay. Ninety checks used the production server; the monitor's ten checks used development with process-local endpoint overrides pointed only at an unavailable local address. All ten monitor cases were rechecked after the feed settled to UNAVAILABLE, rather than judging the initial loading state. The existing contact honeypot is intentionally off-screen, aria-hidden and excluded from keyboard focus; it was excluded from visible-content clipping checks.

Targeted screenshot inspection covered each of the ten routes, the historical table and its caveats, both ASTRA progression lanes, the completed V3 detail and Systems grouping. Before/after Home screenshots use 1440×900 dark at the same framing; the before image comes from the frozen production build of `4204414`. Local review artifacts include `astra-before-home.jpg`, `astra-after-home.jpg`, `astra-after-historical-performance.jpg`, and the 100-record `astra-refinement-responsive-qa.json`. They are provided through the implementation conversation rather than added to the application bundle. Primary independent values measure 57.6px versus 18px historical values at 1440px, and 38px versus 18px at narrow mobile widths. The semantic historical table remains one accessible table with a focusable scroll region and a mobile scrolling hint; keyboard ArrowRight visibly advances it at 320px.

The mobile menu passes Escape closure and focus return, and theme choice persists through navigation. Native empty-contact submission marks name, email and message invalid and focuses name without sending email. A browser visit to `/ko/research?source=legacy#methodology` preserves the query and fragment at `/research?source=legacy#methodology`, with English document language and an existing target. The first production Home load reports no browser errors. Viewport overrides were reset after review.

Korean visual QA is no longer a release requirement. The root document remains English, matching every public page, so the earlier Korean subtree/root-language mismatch is historical. These checks do not establish full assistive-technology conformance, real browser zoom behavior, reduced-motion emulation, Core Web Vitals, external feed transitions or contact-delivery availability. No external telemetry service or real email delivery was exercised.

This refinement does not change completed V3 scientific status, zero finalists or its unopened holdout; Small-Signal Sensitivity Calibration and turnover/opportunity-cost decomposition remain separate proposed questions with no active study. API behavior, telemetry parsing/math/authority, contact delivery, Analytics, dependency versions and both public papers remain protected. No new hosted CI or deployment settings are introduced, and no private research URLs are published.

The refinement changes 34 files relative to `4204414`: 19 modified and 15 deleted. The deletions retire the 13 Korean pages, their layout and the unused Korean recruiter homepage component. Modified files cover shared visual styles, Home/Systems presentation, navigation/theme utilities, public routes and metadata, explicit redirects, the shared evidence record/table, focused route/page tests, and these two documents. Across the full redesign relative to the original approved base, 67 files differ: 16 added, 36 modified and 15 deleted. The historical inventory below is retained to document the earlier delivery.

## Baseline and dependency installation

The original checkout contains 28 page routes: 15 English and 13 Korean, plus two API handlers and two public PDF files. All 35 distinct literal absolute internal link destinations resolved to an existing route or asset. Generated locale links and fragment existence were reviewed separately.

The initial required `npm ci` failed before application changes: `package.json` already declared `lightweight-charts@5.2.0`, but the lockfile omitted that package and its `fancy-canvas@2.1.0` dependency. Initial lint and build commands consequently could not find their installed executables. The original telemetry test suite still passed all six tests.

The user approved a narrowly scoped repair. It added only:

- The existing `lightweight-charts: 5.2.0` declaration to the lockfile root dependency map.
- The missing `node_modules/lightweight-charts` entry at version `5.2.0`.
- Its missing `node_modules/fancy-canvas` entry at version `2.1.0`.

`package.json` is byte-identical to the approved base. Every pre-existing non-root lock entry is unchanged, including all versions, resolved URLs, integrity fields, and transitive dependency declarations. No existing dependency was upgraded, removed, or re-resolved.

A runnable exact-base comparison was then created from the approved source using the installed dependencies. Baseline results:

| Check | Baseline result |
| --- | --- |
| `npm run lint` with dependencies available | Fails with 7 errors and 1 warning in existing code |
| `npm run test:telemetry` | Passes: 6 tests |
| Default `npm run build` | Passes with Next.js 16.2.10 and Turbopack |
| Exact source comparison | All baseline `app/`, `components/`, and `lib/` files match the approved commit |

The isolated baseline initially used a dependency symlink, which Turbopack rejected because it pointed outside the isolated filesystem root. A webpack fallback also rejected an existing global-only CSS Module selector in `components/contextual-page-tools.module.css`. Copying the installed dependencies into the isolated baseline allowed the original default Turbopack build to succeed without changing source or configuration. These intermediate failures do not describe a redesign regression.

The installed Next.js 16.2.10 documentation was consulted for pages/layouts, Server and Client Components, navigation/accessibility, metadata, fonts, and the metadata file conventions used by the redesign.

## Research content and authority

The typed registry in `lib/research-evidence.ts` is the shared authority for homepage, ASRA, findings, detail, and résumé summaries. Evidence class, work state, claim outcome, assessment context, source/code availability, lineage, and execution authority are separate fields.

- Independent risk confirmation retains H_PLUS_C versus B4B_HAR_BASIS, a one-hour BTC risk horizon, `[2025-08-01, 2026-07-30)` with an exclusive end, +12.58% Log-MSE improvement, +11.65% QLIKE improvement, and 4/4 positive chronological segments in both primary losses. The approximately 0.9963 actual/forecast variance ratio stays at research depth with its aggregation-level calibration limitation.
- The completed policy study remains `FORECAST_INFORMATION_WITHOUT_POLICY_UTILITY`: frozen P3 pooled improvements of 2.070% volatility and 2.016% ES5 missed the 3.0% minimum, and required multi-era consistency failed. It does not inherit forecast independence, the forecast interval, or forecast code lineage.
- Native Scheduler Robustness V1 is completed SYNTHETIC evidence, classified `NATIVE_FIXED_SELECTION_SUFFICIENT`. Its registered comparison supports methodological simplification within the tested synthetic domain, not mathematical equivalence or historical BTC alpha. Supplied raw/adjusted counts, the −0.39 percentage-point difference, conservative paired 95% interval of [−2.47, +1.69] percentage points, +5 percentage-point margin, 97.93% retention, and validity checks remain contextualized.
- Candidate Generator V3 is completed RETROSPECTIVE evidence with a NOT CONFIRMED claim outcome and the public label HISTORICAL TRANSFER NOT DEMONSTRATED. Its exact classification is `MEASUREMENT_REPAIR_DOES_NOT_TRANSFER_TO_HISTORICAL_BTC`: the repaired fixed-native Activity and nonlinear challengers did not add historical one-hour BTC return information beyond the frozen OHLCV baseline in the tested domain. There were zero finalists, and the locked return-lane holdout was not opened.
- Small-Signal Sensitivity Calibration and Turnover & Opportunity-Cost Decomposition are separate NEXT QUESTION records. Neither has started or has an invented design, threshold, result, or power value. Candidate Generator V3 is absent from next questions.
- The earlier native-horizon repair retains an unresolved evidence class; the completed scheduler's synthetic class is not transferred to it.
- Daily EMA remains a retained historical system. Its three completed trades, concentration, cost assumptions, post-selection limitation, and separate forward-observation boundary remain visible. Original historical metrics remain on the preserved study route.

The completed policy, scheduler, and V3 study identifiers are retained as supplied text, without guessed repository or commit hyperlinks. Private research records are identified as unavailable publicly. Public academic PDFs and the public GitHub profile remain available. No private research-repository URL, private source path, or invented reproducibility link is introduced into application content.

Research findings do not create directional-alpha, sizing, veto, trading, or execution authority. Systems presents research infrastructure, execution engineering, and read-only operational evidence as separate responsibilities. PR41 is a bounded, deep-only engineering note; it is excluded from homepage composition and recency injection.

## Completed V3 update — historical validation, 9 September 2026

This update follows previous delivery head `914007e8516398020463754281fa32be109d2972` on the same implementation branch and existing Draft PR #38. The completed V3 study head is `1dc9e529b9729e770691e36a2ad937c0009f6fdb`, retained only as a supplied private-study identifier. The original plan and earlier validation remain historical records; a dated plan addendum records the new research status.

The V3 validation used 13,819 native hourly targets in `[2024-01-01, 2025-07-30)`. Relative MSE improvement versus P0 OHLCV_RIDGE was −0.007539% for P1 ACTIVITY_RIDGE and −0.130519% for P2 NONLINEAR_OHLCV; positive MSE folds were 3/5 and 2/5, respectively. Both challengers failed the registered paired-bootstrap and Holm gates. There were zero finalists, and the locked return-lane holdout `[2025-07-30, 2026-07-30)` was not opened. This is a bounded retrospective validation result, not independent holdout confirmation, universal BTC return unpredictability, or a strategy-failure claim. Synthetic positive controls remained healthy; secondary shadow economics did not rescue the failed predictive gate and do not establish policy utility.

`candidateGeneratorV3` is now a completed research record with evidence class RETROSPECTIVE, claim outcome NOT CONFIRMED, and exact classification `MEASUREMENT_REPAIR_DOES_NOT_TRANSFER_TO_HISTORICAL_BTC`. It has moved from `nextResearchQuestions` to `completedResearch`; scheduler lineage, follow-up wording, and `schedulerBranch` now lead through the completed historical transfer test to zero finalists and the unopened holdout. Small-Signal Sensitivity Calibration is proposed only, asking how small a conditional return effect the repaired stack can reliably detect under BTC-like historical feature distribution and temporal dependence. Turnover & Opportunity-Cost Decomposition remains the separate risk-lane next question, and `currentResearch` remains empty.

Home and ASTRA present V3 as a compact completed negative finding or timeline stage. The three dominant homepage metrics remain +12.58% Log-MSE, +11.65% QLIKE, and 4/4 chronological segments. Research adds the completed retrospective finding. The nonlinear page presents a completed historical transfer section at `#historical-transfer-test`; the old proposed-section anchor remains a compatibility destination. The timeline separates nine completed return/methodology stages from six completed risk stages, with future questions outside both timelines. These lanes are not represented as one sequential statistical experiment.

| V3 update check | Recorded result before the English-only refinement |
| --- | --- |
| Evidence, route/locale, and page contracts | Passes: all 12 tests in the final updated run |
| `npm run test:telemetry` | Passes: all 6 tests |
| Combined regression suite | Passes: 18 tests across the two commands |
| `npm run build` | Passes after final spacing adjustments: default Next.js 16.2.10 Turbopack, 36/36 static outputs; compilation 1.923 s and type checking 2.6 s |
| Scoped lint | Passes across all 60 changed source files; the two files receiving final spacing adjustments also pass their subsequent scoped recheck |
| Whole-repository lint | Exit 1: exactly 7 errors and 1 warning; all four offending files are byte-identical to both the approved base and previous delivery head |
| Rendered route/link/fragment audit | Passes: 31 routes, 722 internal links, 227 fragment destinations, zero issues |
| Metadata/canonical/locale audit | Passes: all 31 pages, 13 reciprocal locale pairs, 5 English-only pages, 31 matching sitemap URLs, zero issues |
| Protected-file, lockfile, and paper integrity checks | Passes: all 14 captured files unchanged from the previous delivery head; only the approved contact-form presentation/accessibility and narrow lockfile repair differ from the original base |
| Homepage asset comparison | Refreshed from the new production build; JavaScript unchanged from the previous delivery and −4.45% gzip versus the approved base; exact counts below |
| Responsive browser smoke matrix and visual review | Passes: 140 geometry checks across 14 routes, five sizes and both themes, plus targeted screenshots and final spacing rechecks |
| `git diff --check` | Passes after the validation-record update |
| New delivery head, exact remote head, and PR body/state | Local validation complete; same-branch push with automatic preview explicitly authorized. Exact commit, remote verification and PR state are recorded in the existing Draft PR body |

The V3 browser rerun used the prior 14-route matrix at 1440×900, 1280×800, 768×1024, 390×844 and 320×568 in both themes: all 140 combinations passed document/child overflow and main/H1 checks, with no framework error overlay. Targeted screenshot review covered Home and Korean Home V3/Current–Next content; ASTRA's separate lanes at 768px light and 390px dark; and the V3 detail at 1440px dark, 390px light and 320px dark. The final spacing adjustments to the timeline wrapper and supporting diagnostics were rechecked visually and followed by the successful production rebuild and rendered-route audit.

Mobile-menu Escape closure and focus return passed (`aria-expanded` became `false`, focus returned to the menu button), as did theme persistence. Native empty-contact validation marked name, email and message invalid and focused name; no email was sent. The first Home browser load had zero browser errors. The monitor was inspected in its unavailable state using process-local endpoint overrides pointing only to an unavailable local address. No external telemetry service was exercised, and viewport overrides were reset after inspection. The original limitations concerning screen readers, browser zoom, reduced-motion emulation, external-service transitions and field-performance measurement remain applicable.

At the exact previous head, GitHub returned zero repository Actions workflows and zero exact-head workflow runs across all events. No applicable existing GitHub Actions workflow was found, and no new CI system was added. Code/test validation is local. GitHub separately reported a successful Vercel preview-deployment status and a successful Vercel Preview Comments check; these are deployment/feedback statuses, not hosted test CI. The existing automatic preview is not described as absent.

The initial no-deployment instruction conflicted with the existing automatic-preview integration. After the full local change was committed and reviewable, the user explicitly answered “Push; allow automatic preview.” This authorizes the preview side effect of the same-branch push; it does not authorize a merge or production deployment. No hosting settings, credentials, deployment hooks, or CI configuration are changed by this update. Exact-head hosted status is recorded in the existing Draft PR body after publication.

The whole-repository lint result contains only the existing findings below. Each affected file was compared directly with both the approved base and previous delivery head; all four are byte-identical. No new lint error, warning, or blanket suppression was introduced.

| Existing file | Unchanged findings |
| --- | --- |
| `components/btc-live-position.tsx` | 1 `react-hooks/set-state-in-effect` error at line 126 |
| `components/btc-research-observatory.tsx` | 1 `react-hooks/set-state-in-effect` error at line 472 and 4 `react-hooks/refs` errors at lines 577/580 |
| `components/market-shock-terminal.tsx` | 1 `react-hooks/set-state-in-effect` error at line 342 |
| `lib/tradingview-observatory-datafeed.ts` | 1 `@typescript-eslint/no-unused-vars` warning at line 248 |

## Original redesign automated checks

Before the V3 status update, the completed local implementation checks produced:

| Command | Result |
| --- | --- |
| `npm run test:telemetry` | Passes: 6 tests |
| `node --experimental-strip-types --test tests/research-evidence.test.mjs tests/site-routes.test.mjs tests/research-pages.test.mjs` | Passes: 11 tests |
| `npm run build` | Passes with default Next.js 16.2.10 Turbopack |
| `git diff --check` | Passes |
| Whole-repository `npm run lint` | 7 errors and 1 warning, matching the runnable exact-base baseline; no blanket suppression added |
| Scoped lint across all 60 changed source files | Passes, exit 0 |
| Final production HTML audit | Passes: 31 routes, 700 internal links, 205 fragments, zero issues |

The eleven added tests cover failure-prone contracts: result-free proposed/active records; separate forecast/policy assessment and provenance; scheduler completion and bounded inference; timeline branching; unavailable-source handling; TypeScript context/state constraints; actual reciprocal locale routes; and transitive exclusion of telemetry, chart, and WebGL modules from both homepages. They do not snapshot every paragraph.

## Protected behavior and file integrity

The original redesign's final exact-base SHA-256 comparisons confirmed no changes to the files below. The V3 update recheck again confirmed that these files remain byte-identical to the approved base and previous delivery head.

- `app/api/contact/route.ts` and `app/api/traffic/route.ts`.
- Telemetry parsing, validation, accounting, authority, and datafeed libraries.
- `tests/binance-telemetry-v2.test.mjs`.
- `package.json` and both public PDFs.

| Public paper | SHA-256 |
| --- | --- |
| `public/papers/volatility-regime-filtering-thesis.pdf` | `d846e4adfafddf40bea30235a8972b0332350af98e9a4b37ce0869b5f934a6dd` |
| `public/papers/bitcoin-bubble-gsadf-seminar-paper.pdf` | `6992eba491854dc09a7adecb5ef206a8031aa26d4f4aa674234ff2171653b2b6` |

All 454 pre-existing non-root lockfile package entries remain identical to the approved base. The only additions are the approved missing `lightweight-charts@5.2.0` and `fancy-canvas@2.1.0` entries and the matching root dependency declaration; existing root dependencies and all other root/top-level fields are unchanged.

All 14 files in the protected snapshot are byte-identical to previous delivery head `914007e8516398020463754281fa32be109d2972`, including the complete contact component, dependency manifest and lockfile, both API handlers, the telemetry libraries/test, and both papers. Against the approved base, the only two changed snapshot files remain the original permitted contact-form presentation/accessibility update and approved narrow lockfile repair. The V3 update introduces no further protected-file change.

The contact form preserves its submission handler, payload fields, browser validation, timing, and server delivery contract. A repeated TypeScript syntax-tree extraction confirms the complete `handleSubmit` source is byte-identical to the approved base. Its permitted changes add feedback associations/error focus, replace handle-first recipient copy with the human name, and adjust presentation. No real test email is sent.

The English monitor route remains, and its retired Korean counterpart now redirects to it. Polling, timestamp-derived age, freshness, TTL, fallback/last-good behavior, accounting labels, endpoint contracts, and operational authority stay unchanged. Homepage demotion removes the telemetry mount rather than changing its behavior. Root Vercel Analytics remains mounted once, with no new tracking introduced.

Source integrity and local tests do not establish the availability of external telemetry or contact-delivery services.

## Pre-refinement routes, metadata, and accessibility — historical

The final route inventory contains 31 public page routes: the original 28 plus `/astra`, `/research/risk-forecasting`, and `/research/nonlinear-measurement`. Existing project, monitor, contact, résumé, paper, and Korean URLs are preserved. No duplicate `/systems` or `/about` route is introduced.

The original redesign's prerendered HTML metadata was inspected for all 31 pages with zero metadata or locale-link issues. Every page has its own canonical and Open Graph URL and a descriptive title without a duplicated human-name suffix. Home's root URL is normalized without a trailing slash. Thirteen actual English/Korean route pairs have reciprocal language alternates. The five English-only pages advertise no invented Korean translation and provide an explicitly labeled Korean-home fallback. The V3 production-build rerun independently confirms all 31 canonicals, Open Graph URLs and unique titles; all 13 reciprocal language pairs; all 13 Korean content subtrees; and the 31-route sitemap, with zero issues.

The generated sitemap contains exactly the 31 actual canonical page routes; robots retains public index/follow intent without changing API response headers. No fabricated publication metadata or peer-review claim is added.

Navigation uses an ordinary disclosure with keyboard and Escape behavior. Evidence meanings remain textual; disclosures and source links are keyboard reachable. The résumé and monitor nested `main` landmarks are removed, and legacy exhibit tab relationships are corrected without changing data behavior. The original production HTML audit verified one `main` and one H1 per page, unique IDs, valid ARIA reference targets, 700 internal links, and 205 fragment destinations across all 31 routes, with zero issues. The V3 rerun passes the same structural checks and validates 722 internal links and 227 fragment destinations, including the new historical-transfer anchor and retained compatibility anchor.

Known locale limitation: the shared root document remains `<html lang="en">`; all thirteen Korean pages provide an explicit `lang="ko"` content subtree. A complete route-dependent root document-language change was deliberately kept outside an incidental layout restructuring. This remains a limitation for review, not a claim of full accessibility conformance.

## Production asset comparison

Both measurements use the default Next.js 16.2.10 Turbopack production build, the same installed dependencies, and the same local asset inventory method. The exact-base comparison uses unchanged approved application source. Values count unique script/stylesheet assets referenced by prerendered homepage HTML; gzip values are local compression estimates. They exclude request headers, runtime prefetch, third-party transfers, and interaction work. They are not Core Web Vitals or field measurements.

The redesigned values below record the original successful production build after its presentation and accessibility adjustments. They precede the V3 status update; the second table records the new production build using the same inventory and compression method.

| Asset | Exact base | Redesign | Change |
| --- | ---: | ---: | ---: |
| Initial EN/KO JavaScript, raw | 676,578 B | 644,412 B | −32,166 B |
| Initial EN/KO JavaScript, gzip estimate | 200,953 B | 192,006 B | −8,947 B (−4.45%) |
| Shared homepage CSS, raw | 104,466 B | 107,653 B | +3,187 B |
| Shared homepage CSS, gzip estimate | 19,772 B | 20,751 B | +979 B |
| English HTML, raw / gzip estimate | 95,770 / 16,898 B | 56,068 / 9,920 B | Lower |
| Korean HTML, raw / gzip estimate | 85,241 / 16,238 B | 57,827 / 10,925 B | Lower |

V3 status-update production build compared with the previous delivery:

| Asset | Previous delivery | V3 update | Change from previous delivery |
| --- | ---: | ---: | ---: |
| Initial EN/KO JavaScript, raw | 644,412 B | 644,412 B | 0 B |
| Initial EN/KO JavaScript, gzip estimate | 192,006 B | 192,006 B | 0 B |
| Shared homepage CSS, raw | 107,653 B | 108,204 B | +551 B |
| Shared homepage CSS, gzip estimate | 20,751 B | 20,808 B | +57 B |
| English HTML, raw / gzip estimate | 56,068 / 9,920 B | 56,848 / 10,067 B | +780 / +147 B |
| Korean HTML, raw / gzip estimate | 57,827 / 10,925 B | 58,565 / 11,009 B | +738 / +84 B |

Against the approved base, V3 homepage JavaScript remains 32,166 B smaller raw and 8,947 B smaller by gzip estimate (−4.45%); CSS is 3,738 B larger raw and 1,036 B larger by gzip estimate. The earlier measurement was retained separately when the V3 build was measured.

Both homepages retain nine initial script asset references. Their source dependency graphs exclude operational position/performance widgets, chart initialization, and WebGL. No new homepage chart or visualization dependency is introduced. No LCP, INP, CLS, Lighthouse, or field-performance improvement is claimed from these byte counts.

## Original redesign visual QA

Local browser inspection covered Home, ASTRA, Research, Risk Forecasting, Nonlinear Measurement, Systems, Resume, Contact, and the existing monitor in both dark and light themes. Representative screenshots were inspected at 1440×900, 1280×800, 768×1024, 390×844, and 320×568, including affected Korean pages. This is targeted visual inspection, not a screenshot assertion for every page/size/theme combination.

A DOM geometry matrix checked 14 routes at all five sizes in both themes (140 combinations). It checked document and child-element overflow plus the main/H1 landmarks. The only finding was a long timeline classification overflowing ASTRA at 320px; a minimum-width/wrapping fix resolved it, and a dark-theme 320px recheck passed. A final additional 50-combination Korean reflow matrix passed after adding word-boundary wrapping.

Visual adjustments improved the 1280px homepage fold so the strongest-finding heading is visible before scrolling, aligned the three primary metric values, prevented long timeline identifiers from overflowing, and stopped Korean prose splitting words unnecessarily. The human name remains more prominent than the subordinate ASTRA subtitle.

Mobile menu disclosure, Escape closure and focus return, theme persistence, on-page disclosure/anchor links, and native empty-form validation were checked. Empty submission focused the required name input; no email was sent. Semantic primary/secondary/accent/evidence token contrast against the three defined surfaces is at least 5.16:1 in light and 6.65:1 in dark. This token calculation does not claim a complete contrast audit of every retained exhibit state.

The monitor was inspected in its unavailable state using process-local development endpoint overrides pointed at an unavailable local address. Production endpoint configuration, polling, validators, and fallback behavior were not changed. Live/stale/last-good transitions were not exercised in the browser against external services; the unchanged telemetry contract suite passed. Browser viewport overrides were reset after inspection.

No real browser zoom test, full screen-reader pass, reduced-motion emulation, browser network capture, Lighthouse run, or field Core Web Vitals measurement was performed. Reduced-motion rules, focus treatment, semantic landmarks, text status labels, and source dependency boundaries were checked directly. The root document-language limitation and pre-existing lint failures remain review items.

## Pre-refinement implemented hierarchy and sitemap — historical

Home follows human identity → independent risk evidence → six-stage ASTRA process → scientific progression → completed policy translation → restrained selected research → no active study and two next questions → supporting systems → career/contact. The main proof points remain forecast metrics; historical return and scheduler counts do not replace them.

ASTRA supplies the six-stage overview, detailed eight-stage process, rejected/unresolved paths, discoveries, and evidence protocol. Following the V3 update, its scientific progression separates a nine-stage completed return/methodology timeline from a six-stage completed risk timeline; the two proposed follow-up questions sit outside those timelines. The nonlinear page distinguishes sensor recovery, the earlier repair's unresolved domain, completed synthetic scheduler robustness, and V3's completed retrospective historical transfer test. Risk detail keeps independent assessment, development baseline challenge, calibration limitations, retrospective policy utility, mechanism and source availability separate.

The shared registry distinguishes INDEPENDENT, DEVELOPMENT, SYNTHETIC, RETROSPECTIVE, and FORWARD OBSERVATION evidence from COMPLETED, IN PROGRESS, NEXT QUESTION, BLOCKED and INVALIDATED work states. Textual outcome labels carry scientific interpretation independently of color. Systems separates research infrastructure, execution engineering and read-only telemetry. Resume/About preserves the supplied education, certification, skills and language facts; Contact retains the direct-email fallback and original delivery handler.

Primary navigation is ASTRA / Research / Papers / Systems / About, with the human wordmark linking Home and Resume/GitHub/locale/theme as utilities. Five English-only routes use an explicit English-availability message and Korean-home fallback. The Korean research route preserves its methodology content and links to the English findings.

Final public-page sitemap:

| English canonical route | Existing Korean counterpart |
| --- | --- |
| `/` | `/ko` |
| `/astra` | English only |
| `/research` | `/ko/research` |
| `/research/risk-forecasting` | English only |
| `/research/nonlinear-measurement` | English only |
| `/papers` | `/ko/papers` |
| `/projects` | `/ko/projects` |
| `/projects/btc-final-system` | English only |
| `/projects/btc-futures-research` | `/ko/projects/btc-futures-research` |
| `/projects/btc-futures-research/live-position` | `/ko/projects/btc-futures-research/live-position` |
| `/projects/btc-regime-challenger` | `/ko/projects/btc-regime-challenger` |
| `/projects/multi-asset-research-lab` | `/ko/projects/multi-asset-research-lab` |
| `/projects/multi-asset-research-lab/claims` | `/ko/projects/multi-asset-research-lab/claims` |
| `/projects/volatility-regime-filtering` | `/ko/projects/volatility-regime-filtering` |
| `/projects/bitcoin-bubble-gsadf` | `/ko/projects/bitcoin-bubble-gsadf` |
| `/resume` | English only |
| `/contact` | `/ko/contact` |
| `/build-log` | `/ko/build-log` |

The two existing API routes remain `/api/contact` and `/api/traffic`; both paper PDFs remain unchanged public assets. Generated metadata endpoints are `/sitemap.xml` and `/robots.txt`.

## Pre-refinement changed-file inventory — historical

The following inventory records the completed V3 delivery before the English-only refinement. API handlers, telemetry math/validation libraries, dependency manifest, and public paper binaries are absent because they were unchanged. Current refinement change counts and scope are recorded in its section above.

65 changed or added files:

```text
app/astra.css
app/astra/page.tsx
app/build-log/page.tsx
app/contact/page.tsx
app/ko/build-log/page.tsx
app/ko/contact/page.tsx
app/ko/page.tsx
app/ko/papers/page.tsx
app/ko/projects/bitcoin-bubble-gsadf/page.tsx
app/ko/projects/btc-futures-research/live-position/page.tsx
app/ko/projects/btc-futures-research/page.tsx
app/ko/projects/btc-regime-challenger/page.tsx
app/ko/projects/multi-asset-research-lab/claims/page.tsx
app/ko/projects/multi-asset-research-lab/page.tsx
app/ko/projects/page.tsx
app/ko/projects/volatility-regime-filtering/page.tsx
app/ko/research/page.tsx
app/layout.tsx
app/navigation.css
app/page.tsx
app/papers/page.tsx
app/projects/bitcoin-bubble-gsadf/page.tsx
app/projects/btc-final-system/page.tsx
app/projects/btc-futures-research/live-position/page.tsx
app/projects/btc-futures-research/page.tsx
app/projects/btc-regime-challenger/page.tsx
app/projects/multi-asset-research-lab/claims/page.tsx
app/projects/multi-asset-research-lab/page.tsx
app/projects/page.tsx
app/projects/volatility-regime-filtering/page.tsx
app/research/nonlinear-measurement/page.tsx
app/research/page.tsx
app/research/risk-forecasting/page.tsx
app/resume/page.tsx
app/robots.ts
app/sitemap.ts
components/active-navigation.tsx
components/contact-form.tsx
components/contextual-page-tools.tsx
components/editorial.tsx
components/evidence-maturity.tsx
components/evidence-pipeline-explorer.tsx
components/failure-mode-atlas.tsx
components/korean-pages.tsx
components/korean-projects-recruiter.tsx
components/korean-recruiter-home.tsx
components/language-switcher.tsx
components/portfolio-home.tsx
components/research-architecture-strip.tsx
components/research-ui.tsx
components/site-shell.tsx
components/theme-toggle.tsx
components/visitor-stats.tsx
docs/astra-portfolio-redesign-plan-v1.md
docs/astra-redesign-validation.md
lib/content.ts
lib/public-progress-ko.ts
lib/public-progress.ts
lib/research-evidence.ts
lib/site-metadata.ts
lib/site-routes.ts
package-lock.json
tests/research-evidence.test.mjs
tests/research-pages.test.mjs
tests/site-routes.test.mjs
```

## Release boundary and remaining review

Only the implementation branch is authorized for push, with a Draft PR against `main`. The original plan commit, binding research update, narrow lock repair, research model/pages, homepage/navigation, supporting systems, career/contact, metadata/accessibility, and final validation remain separate focused commits.

No merge or deployment command was performed. Production hosting, DNS, AWS, research/execution repositories, and trading/account state were not changed. The previous head received an automatic Vercel preview through the existing integration, as disclosed above. The user authorized the same-branch push and its automatic preview; this permission also applies to the requested refinement push. Preview feedback is not a GitHub Actions test run. The existing Draft PR body records the ASRA refinement's exact local/remote head, PR title/state and observed hosted status after the authorized push. All test, build, route and browser results in this document are local.

Review items are the documented baseline lint debt, unavailable public source artifacts, and unperformed external-service/assistive-technology/field-performance checks. The earlier Korean root-language limitation is preserved as history above; the current English-only release verifies English document language on every public page. No active research result, source URL, CV download, institutional experience, or execution authority was invented to fill missing content.
