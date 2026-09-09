# ASTRA portfolio redesign V1 — validation record

Validation date: 9 September 2026. The original redesign's local implementation, visual review, production build, and regression checks completed at application source `6daa4aa11b55629cbb71385b16e211dbd43324ee`, followed by delivery head `914007e8516398020463754281fa32be109d2972`. Those checks are preserved below as the original validation record. The binding post-implementation Candidate Generator V3 update has passed its production build, 18 regression tests, scoped lint, rendered-page and metadata audits, protected-file rechecks, and responsive visual rerun. After local validation and review, the user explicitly authorized pushing the same branch with its automatic Vercel preview. Final commit, remote-head verification and exact PR state are recorded in the existing Draft PR body.

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
| V3 update delivery head / verified remote head | Recorded in the existing Draft PR body after this document and the update are committed and pushed |
| Existing Draft PR | [#38](https://github.com/MeanyDeany/woosub-shin/pull/38), base `main`; open, Draft, unmerged at the pre-update check |

The first commit carried forward only the reviewed planning document. Its historical filesystem review links are preserved as approved documentation; application content does not publish those paths. Later plan edits record the user's binding research update rather than silently changing the original scientific interpretation.

The implementation brief explicitly assigned the completed policy study a RETROSPECTIVE evidence class and requested compact homepage policy values. Those instructions supersede the earlier plan's unasserted policy class and detail-only numerical presentation. Later binding updates completed Native Scheduler Robustness V1 and, after the original redesign validation, Candidate Generator V3. No study is presented as active within the current supplied research freeze.

No merge or production deployment is authorized or performed by this validation phase. The user separately authorized the automatic Vercel preview caused by pushing this update.

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

The typed registry in `lib/research-evidence.ts` is the shared authority for homepage, ASTRA, findings, detail, and résumé summaries. Evidence class, work state, claim outcome, assessment context, source/code availability, lineage, and execution authority are separate fields.

- Independent risk confirmation retains H_PLUS_C versus B4B_HAR_BASIS, a one-hour BTC risk horizon, `[2025-08-01, 2026-07-30)` with an exclusive end, +12.58% Log-MSE improvement, +11.65% QLIKE improvement, and 4/4 positive chronological segments in both primary losses. The approximately 0.9963 actual/forecast variance ratio stays at research depth with its aggregation-level calibration limitation.
- The completed policy study remains `FORECAST_INFORMATION_WITHOUT_POLICY_UTILITY`: frozen P3 pooled improvements of 2.070% volatility and 2.016% ES5 missed the 3.0% minimum, and required multi-era consistency failed. It does not inherit forecast independence, the forecast interval, or forecast code lineage.
- Native Scheduler Robustness V1 is completed SYNTHETIC evidence, classified `NATIVE_FIXED_SELECTION_SUFFICIENT`. Its registered comparison supports methodological simplification within the tested synthetic domain, not mathematical equivalence or historical BTC alpha. Supplied raw/adjusted counts, the −0.39 percentage-point difference, conservative paired 95% interval of [−2.47, +1.69] percentage points, +5 percentage-point margin, 97.93% retention, and validity checks remain contextualized.
- Candidate Generator V3 is completed RETROSPECTIVE evidence with a NOT CONFIRMED claim outcome and the public label HISTORICAL TRANSFER NOT DEMONSTRATED. Its exact classification is `MEASUREMENT_REPAIR_DOES_NOT_TRANSFER_TO_HISTORICAL_BTC`: the repaired fixed-native Activity and nonlinear challengers did not add historical one-hour BTC return information beyond the frozen OHLCV baseline in the tested domain. There were zero finalists, and the locked return-lane holdout was not opened.
- Small-Signal Sensitivity Calibration and Turnover & Opportunity-Cost Decomposition are separate NEXT QUESTION records. Neither has started or has an invented design, threshold, result, or power value. Candidate Generator V3 is absent from next questions.
- The earlier native-horizon repair retains an unresolved evidence class; the completed scheduler's synthetic class is not transferred to it.
- Daily EMA remains a retained historical system. Its three completed trades, concentration, cost assumptions, post-selection limitation, and separate forward-observation boundary remain visible. Original historical metrics remain on the preserved study route.

The completed policy, scheduler, and V3 study identifiers are retained as supplied text, without guessed repository or commit hyperlinks. Private research records are identified as unavailable publicly. Public academic PDFs and the public GitHub profile remain available. No private research-repository URL, private source path, or invented reproducibility link is introduced into application content.

Research findings do not create directional-alpha, sizing, veto, trading, or execution authority. Systems presents research infrastructure, execution engineering, and read-only operational evidence as separate responsibilities. PR41 is a bounded, deep-only engineering note; it is excluded from homepage composition and recency injection.

## Post-implementation V3 update — 9 September 2026

This update follows previous delivery head `914007e8516398020463754281fa32be109d2972` on the same implementation branch and existing Draft PR #38. The completed V3 study head is `1dc9e529b9729e770691e36a2ad937c0009f6fdb`, retained only as a supplied private-study identifier. The original plan and earlier validation remain historical records; a dated plan addendum records the new research status.

The V3 validation used 13,819 native hourly targets in `[2024-01-01, 2025-07-30)`. Relative MSE improvement versus P0 OHLCV_RIDGE was −0.007539% for P1 ACTIVITY_RIDGE and −0.130519% for P2 NONLINEAR_OHLCV; positive MSE folds were 3/5 and 2/5, respectively. Both challengers failed the registered paired-bootstrap and Holm gates. There were zero finalists, and the locked return-lane holdout `[2025-07-30, 2026-07-30)` was not opened. This is a bounded retrospective validation result, not independent holdout confirmation, universal BTC return unpredictability, or a strategy-failure claim. Synthetic positive controls remained healthy; secondary shadow economics did not rescue the failed predictive gate and do not establish policy utility.

`candidateGeneratorV3` is now a completed research record with evidence class RETROSPECTIVE, claim outcome NOT CONFIRMED, and exact classification `MEASUREMENT_REPAIR_DOES_NOT_TRANSFER_TO_HISTORICAL_BTC`. It has moved from `nextResearchQuestions` to `completedResearch`; scheduler lineage, follow-up wording, and `schedulerBranch` now lead through the completed historical transfer test to zero finalists and the unopened holdout. Small-Signal Sensitivity Calibration is proposed only, asking how small a conditional return effect the repaired stack can reliably detect under BTC-like historical feature distribution and temporal dependence. Turnover & Opportunity-Cost Decomposition remains the separate risk-lane next question, and `currentResearch` remains empty.

Home and ASTRA present V3 as a compact completed negative finding or timeline stage. The three dominant homepage metrics remain +12.58% Log-MSE, +11.65% QLIKE, and 4/4 chronological segments. Research adds the completed retrospective finding. The nonlinear page presents a completed historical transfer section at `#historical-transfer-test`; the old proposed-section anchor remains a compatibility destination. The timeline separates nine completed return/methodology stages from six completed risk stages, with future questions outside both timelines. These lanes are not represented as one sequential statistical experiment.

| V3 update check | Current result |
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

Both monitor routes remain. Their polling, timestamp-derived age, freshness, TTL, fallback/last-good behavior, accounting labels, endpoint contracts, and operational authority stay unchanged. Homepage demotion removes the telemetry mount rather than changing its behavior. Root Vercel Analytics remains mounted once, with no new tracking introduced.

Source integrity and local tests do not establish the availability of external telemetry or contact-delivery services.

## Routes, metadata, and accessibility

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

## Implemented hierarchy and sitemap

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

## Changed-file inventory

The following files differ from the exact approved base, including this validation record. API handlers, telemetry math/validation libraries, dependency manifest, and public paper binaries are absent because they are unchanged.

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

No merge or deployment command was performed. Production hosting, DNS, AWS, research/execution repositories, and trading/account state were not changed. The previous head received an automatic Vercel preview through the existing integration, as disclosed above. The user subsequently authorized the same-branch V3 push and its automatic preview; neither preview is a GitHub Actions test run. The final local head, exact remote-head verification, final PR state and observed hosted status are recorded in the existing Draft PR body.

Review items are the documented baseline lint debt, root language limitation, unavailable public source artifacts, and unperformed external-service/assistive-technology/field-performance checks. No active research result, source URL, CV download, institutional experience, or execution authority was invented to fill missing content.
