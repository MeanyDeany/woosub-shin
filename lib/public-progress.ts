export type ClaimStatus = "Demonstrated" | "In progress" | "Not claimed" | "Not approved";
export type ClaimTone = "amber" | "cyan" | "emerald" | "violet";

export const buildLog = [
  {
    date: "3 Oct 2026",
    phase: "R15 source-role runtime",
    title: "R15 gained a source-validated runtime with independent audit controls.",
    summary:
      "The 3 Oct checkpoint documents a separate R15 runtime with WebSocket-primary admission, mandatory asynchronous REST audits, deterministic replay and independent review.",
    proof: [
      "427 / 427 offline checks passed across inherited, policy, and runtime/adversarial suites",
      "20 / 20 actual-bound mutation categories failed preflight as required",
      "Forward-valid origins: 0; forward validation: false; LIVE_READY: false",
    ],
    boundary:
      "Offline runtime verification is not prospective market evidence, fill validation, deployment permission, or live-trading approval.",
  },
  {
    date: "1 Oct 2026",
    phase: "R15 gross-return validation",
    title: "Volatility-aware target design extended the R15 model comparison.",
    summary:
      "The research compared raw and volatility-normalized targets on shared historical support. VOLNORM recorded higher gross returns and lower minute-open drawdowns; RAW was retained because the paired tests did not establish a sufficiently consistent incremental improvement.",
    proof: [
      "R15_RAW_1X FULL: +1,463.45%, daily Sharpe 1.955, minute-open MDD -46.03%",
      "R15_RAW_1X RECENT: +108.63%, daily Sharpe 1.719, minute-open MDD -27.55%",
      "Gross bp/trade: 0.632 FULL and 0.482 RECENT before commission, spread, slippage, and funding",
    ],
    boundary:
      "Evidence is EXPOSED_HISTORICAL_DEVELOPMENT. The cited payoff studies are zero-friction and do not establish executed maker profitability or future returns.",
  },
  {
    date: "1 Oct 2026",
    phase: "R15 successor challenge",
    title: "A scale-aligned ensemble tested how two forecast heads work together.",
    summary:
      "BLEND combined raw and volatility-normalized scores after aligning their scales. It produced positive gross growth and the highest RECENT return among the three 1X arms. Paired uncertainty and greater drawdown versus VOLNORM kept it a research variant rather than a replacement.",
    proof: [
      "BLEND FULL gross return +6,001.97%; RECENT +203.15%",
      "All paired BLEND-minus-VOLNORM 7-day and 30-day intervals included zero",
      "Observed MDD was worse than VOLNORM in both FULL and RECENT",
    ],
    boundary:
      "The experiment adds evidence about ensemble design while preserving the comparison standard. RAW remains the reference; the published zero-friction results are not executed account performance.",
  },
  {
    date: "23 Jul 2026",
    phase: "Prospective evidence operations",
    title: "A separate baseline evidence pipeline now runs prospectively.",
    summary:
      "The BTC research system now schedules immutable hourly-RV inputs, two simple baseline forecast states, and one-hour forward outcomes as a separate three-job research pipeline.",
    proof: [
      "Exact :31, :34, and :36 UTC slots",
      "Latest-due slot only, with no historical backfill or automatic retry",
      "Manual adoption and unattended natural-cycle validation",
    ],
    boundary:
      "Prospective evidence scheduling is operational infrastructure, not model selection, strategy approval, or execution authority.",
  },
  {
    date: "23 Jul 2026",
    phase: "Operational health",
    title: "Baseline evidence health is measured without grading the forecasts.",
    summary:
      "A manual read-only diagnostic now validates complete input, state, and outcome stores, cross-layer lineage, scheduler status, cron identity, freshness, and bounded maturity coverage.",
    proof: [
      "PR90 managed cron block reported exact",
      "Three latest scheduler statuses were valid, fresh, and JOB_COMPLETE",
      "Initial 23 Jul snapshot: WATCH / BOOTSTRAP, 15 of 21 matured scheduled lineages, zero failing checks",
    ],
    boundary:
      "Health and operational maturity measure evidence flow and integrity. They do not assess forecast usefulness or authorize comparison, paper trading, or live trading.",
  },
  {
    date: "22 Jul 2026",
    phase: "Model-free baselines",
    title: "Two simple volatility baselines gained immutable forecast and outcome evidence.",
    summary:
      "Naive last-hour realized variance and a 24-hour rolling mean remain outside the model registry while receiving separate immutable input, forecast-state, and forward-outcome evidence.",
    proof: [
      "Frozen two-baseline contracts and deterministic identities",
      "Atomic two-event state and outcome batches",
      "Exact manifest-to-state-to-outcome lineage",
    ],
    boundary:
      "Simple baselines are research comparators under accumulation. Their presence is not ranking, promotion, strategy approval, or trading permission.",
  },
  {
    date: "19 Jul 2026",
    phase: "Historical experiments",
    title: "Verified market-data bytes now reach a deterministic historical result.",
    summary:
      "A fixed, bounded, read-only path now materializes verified BTCUSDT five-minute bars from an offline run bundle and produces one fixed descriptive ExperimentResult.",
    proof: [
      "Full run-bundle verification before and after materialization",
      "Descriptor-relative no-follow reads with mutation detection",
      "Immutable bar dataset and fixed descriptive metrics",
    ],
    boundary: "Historical description is not a backtest, strategy result, profitability claim, or trading permission.",
  },
  {
    date: "19 Jul 2026",
    phase: "Public interface",
    title: "Traffic became visible without exposing visitor data.",
    summary:
      "The site now shows aggregated visitor and page-view totals from Vercel Analytics through a server-only API boundary.",
    proof: [
      "No analytics token is shipped to the browser",
      "Only aggregate counts are returned",
      "The interface fails honestly when analytics access is unavailable",
    ],
    boundary: "Traffic counts describe the website, not research quality or commercial traction.",
  },
  {
    date: "18 Jul 2026",
    phase: "Execution proof",
    title: "One bounded synthetic experiment now runs end to end.",
    summary:
      "A fixed in-memory Decimal-series experiment reconciles one exact run, calculates nine descriptive metrics, and returns a deterministic result.",
    proof: [
      "One fixed entrypoint and no arbitrary code",
      "No filesystem, network, provider, or trading integration",
      "Canonical output is stable across Decimal precision settings",
    ],
    boundary: "Synthetic execution is not historical validation and grants no strategy authority.",
  },
  {
    date: "18 Jul 2026",
    phase: "Evidence identity",
    title: "Experiment runs and results gained deterministic identities.",
    summary:
      "Exact manifests, dataset-observation references, typed metrics, runs, and results can now be bound into reproducible canonical evidence.",
    proof: [
      "Path-free run and result identities",
      "Nested corruption is rejected before identity emission",
      "Metric values are exact strings, integers, Decimals, or booleans",
    ],
    boundary: "A deterministic result is evidence identity, not model approval.",
  },
  {
    date: "18 Jul 2026",
    phase: "Public accountability",
    title: "Failures, roadmap state, and direct answers became public.",
    summary:
      "The Lab page now documents rejected failure classes, completed and planned layers, and blunt answers about trading and revenue.",
    proof: [
      "Failure Museum",
      "Current phase roadmap",
      "Direct FAQ and explicit non-approval states",
    ],
    boundary: "Public documentation describes demonstrated boundaries without exposing private implementation details.",
  },
  {
    date: "Jul 2026",
    phase: "Offline verification",
    title: "Completed evidence bundles can be reloaded and verified offline.",
    summary:
      "A fixed completed run layout can be reconstructed from untrusted disk records and checked against the authoritative verifier.",
    proof: [
      "Bounded no-follow reads",
      "Exact-tree verification",
      "Completion markers cannot overrule byte mismatches",
    ],
    boundary: "Offline verification proves local evidence identity, not provider truth or research fitness.",
  },
  {
    date: "Jul 2026",
    phase: "Data lifecycle",
    title: "Public BTCUSDT bytes became canonical research evidence.",
    summary:
      "One fixed public-data lifecycle captures raw Binance USD-M bytes, normalizes them to canonical CSV, verifies the target, and persists an immutable run bundle.",
    proof: [
      "Bounded public HTTPS capture",
      "Deterministic raw-to-canonical normalization",
      "Independent target verification and atomic publication",
    ],
    boundary: "This is one narrow provider and asset lifecycle, not a general multi-asset data platform.",
  },
] as const;

export const latestBuildLog = buildLog.slice(0, 3);

export const claimLedger: readonly {
  claim: string;
  evidence: string;
  limit: string;
  status: ClaimStatus;
  tone: ClaimTone;
}[] = [
  {
    claim: "R15 connects short-horizon signal design to reproducible historical model evaluation.",
    evidence:
      "On exposed historical zero-friction replay, R15_RAW_1X returned +1,463.45% FULL with 1.955 daily Sharpe and -46.03% minute-open MaxDD; RECENT returned +108.63% with 1.719 Sharpe and -27.55% MaxDD.",
    limit:
      "Commission, spread, slippage, and funding are zero in the cited studies. Gross bp/trade is 0.632 FULL and 0.482 RECENT, so execution friction and fillability remain central unresolved questions.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "VOLNORM and BLEND are established replacements for the R15 reference.",
    evidence:
      "The extensions produced positive gross results with distinct growth-risk profiles. Their paired comparisons did not establish consistent incremental superiority, so neither extension was promoted; BLEND also had greater drawdown than VOLNORM.",
    limit:
      "Diagnostic own-return support is not the same as supported incremental superiority. R15_RAW_1X remains the frozen incumbent.",
    status: "Not claimed",
    tone: "violet",
  },
  {
    claim: "The dated runtime checkpoint establishes prospective profitability or live readiness.",
    evidence:
      "The bound source-role runtime passed 427 offline checks and 20 mutation categories under the WSS-primary / asynchronous REST-audit contract.",
    limit:
      "At the 3 Oct 2026 checkpoint, forward-valid origins were 0, forward validation was false and LIVE_READY was false. That engineering result did not grant deployment or trading authority and is not a live status feed.",
    status: "Not approved",
    tone: "amber",
  },
  {
    claim: "The separate BTC baseline evidence pipeline is operational.",
    evidence:
      "A frozen three-job scheduler creates immutable hourly-RV input manifests, two-baseline forecast-state batches, and one-hour forward-outcome batches with exact lineage and idempotent append behavior.",
    limit:
      "Operational evidence production does not establish forecast quality, model superiority, strategy value, or execution readiness.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "Baseline pipeline health can be inspected without mutating evidence.",
    evidence:
      "A manual read-only health command validates all six evidence stores, cross-layer lineage, the PR90 cron block, three latest scheduler statuses, freshness, and bounded coverage from one captured source snapshot.",
    limit:
      "A health PASS or WATCH describes evidence integrity and operations only. It is not predictive evidence or a model-comparison result.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "Prospective baseline evidence is mature enough for model comparison.",
    evidence:
      "The initial 23 Jul 2026 health snapshot was WATCH / BOOTSTRAP with 15 complete scheduled lineages out of 21 matured expected cycles and zero failing checks.",
    limit:
      "At that initial snapshot, comparison was deferred until the frozen maturity requirements were met, including at least 168 clean scheduled outcome lineages and coverage thresholds. This historical pipeline snapshot does not describe the separate ASRA independent assessment.",
    status: "Not claimed",
    tone: "violet",
  },
  {
    claim: "A fixed BTCUSDT five-minute public-data lifecycle is operational.",
    evidence:
      "Bounded HTTPS capture, exact raw bytes, canonical CSV normalization, independent verification, and immutable run bundles are implemented for one fixed Binance USD-M lifecycle.",
    limit:
      "This demonstrates one concrete provider and asset boundary. It does not demonstrate general market-data coverage.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "Completed research runs can be reloaded and verified offline.",
    evidence:
      "The fixed completed-run tree is reconstructed from bounded records, checked for exact layout and byte identity, and delegated to the authoritative verifier.",
    limit:
      "The observation proves local evidence integrity. It does not prove provider truth, model validity, or profitability.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "Experiment specifications, runs, metrics, and results have deterministic identities.",
    evidence:
      "Exact manifests, observation references, typed metrics, run hashes, and result hashes are canonical and reject contradictory nested state.",
    limit:
      "Reproducibility and identity do not make a research conclusion correct or operationally approved.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "Deterministic historical strategy replay and PnL accounting are operational.",
    evidence:
      "A shared causal strategy contract replays completed BTCUSDT bars with next-exact-5m-open state timing, authenticated Funding, explicit transition friction, deterministic outputs, and independent endpoint reconciliation.",
    limit:
      "Historical accounting is a research measurement layer. It does not grant strategy approval, position sizing, leverage, or execution authority.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "The Lab currently operates multiple live asset adapters.",
    evidence:
      "The contracts are asset-neutral, but the concrete retained research system and public-data runtime currently demonstrated are BTCUSDT-specific.",
    limit:
      "Multi-asset remains an architectural direction, not a statement that multiple live asset systems are already running.",
    status: "Not claimed",
    tone: "violet",
  },
  {
    claim: "The research framework has a verified live-profit track record.",
    evidence:
      "One retained BTC strategy has positive retrospective historical metrics and a recorded forward-observation handoff. Separate account telemetry is not a live trading PnL series attributable to this research strategy.",
    limit:
      "Retrospective research performance and forward research states must not be presented as realized live trading profit.",
    status: "Not claimed",
    tone: "violet",
  },
  {
    claim: "Paper or live trading is approved.",
    evidence:
      "There is no broker integration, order routing, position management, entry permission, short permission, leverage authority, or order API in the retained BTC runtime.",
    limit:
      "Research retention and forward observation never automatically unlock paper or live execution.",
    status: "Not approved",
    tone: "amber",
  },
];