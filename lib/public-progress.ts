export type ClaimStatus = "Demonstrated" | "In progress" | "Not claimed" | "Not approved";
export type ClaimTone = "amber" | "cyan" | "emerald" | "violet";

export const buildLog = [
  {
    date: "22 Aug 2026",
    phase: "Final-system validation",
    title: "One BTC research system survived frozen search and deep validation.",
    summary:
      "Three low-turnover long/flat candidates were evaluated under one deterministic replay and funding-adjusted PnL engine. Daily Dual EMA 50/200 was the only search survivor and then passed all thirteen frozen deep-validation gates.",
    proof: [
      "FULL 5bp return +165.92%, Sharpe 0.769, MaxDD -29.37%",
      "10bp stress return +165.12% with Sharpe 0.767",
      "8/8 neighboring EMA pairs positive in LATER and FULL; 6/8 beat B&H Sharpe in both",
    ],
    boundary:
      "This is retrospective post-selection research evidence. Only three completed primary trades exist, one trend dominates positive trade growth, and paired bootstrap Sharpe-difference intervals cross zero.",
  },
  {
    date: "22 Aug 2026",
    phase: "Prospective forward handoff",
    title: "The retained BTC system crossed an explicit historical-to-forward research boundary.",
    summary:
      "The exact retained EMA 50/200 strategy state was restored from an immutable historical checkpoint, bridged through public completed BTCUSDT bars, and activated into an append-only forward research runtime without relabeling bootstrap context as prospective evidence.",
    proof: [
      "6,626 completed 5m bars bridged as bootstrap context",
      "Activation at 08:29:51 UTC; first forward decision bar fixed at 08:30 UTC",
      "First checkpoint-backed retained observation recorded after the 08:30 bar and effective from 08:35 UTC",
    ],
    boundary:
      "Forward observation is research evidence only. One observation is not performance validation, and the runtime has no broker, order, leverage, sizing, or execution authority.",
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
    claim: "A frozen BTC research system produced positive retrospective historical results under funding-adjusted accounting and cost stress.",
    evidence:
      "BTC Daily Dual EMA 50/200 returned +165.92% over the FULL validation period with 0.769 Sharpe and -29.37% MaxDD under 5bp funding-adjusted accounting; 10bp stress returned +165.12% with 0.767 Sharpe.",
    limit:
      "The sample is retrospective and post-selection, only three completed primary trades exist, one trend dominates positive trade growth, and paired bootstrap Sharpe-difference intervals cross zero. This is not a live track record or future-profitability claim.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "The retained BTC research strategy is now running in an append-only prospective forward observation runtime.",
    evidence:
      "An explicit 22 Aug 2026 activation restored the frozen historical state, bridged 6,626 public completed 5m bars as non-forward context, and published the first retained checkpoint-backed observation from the 08:30 UTC bar, effective from 08:35 UTC.",
    limit:
      "Forward research-state observation is not a trade, order, entry permission, execution signal, or performance validation. The runtime has no trading authority.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "The historical BTC result proves future profitability.",
    evidence:
      "The retained system has attractive retrospective metrics and robustness checks, but uncertainty remains material and the independent trend sample is sparse.",
    limit:
      "Future profitability is explicitly not claimed. New evidence must arrive prospectively after the frozen historical-to-forward boundary.",
    status: "Not claimed",
    tone: "violet",
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
      "Comparison remains deferred until the frozen maturity requirements are met, including at least 168 clean scheduled outcome lineages and coverage thresholds.",
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
      "One retained BTC strategy has positive retrospective historical metrics and prospective research-state observation has begun, but there is no live trading PnL series.",
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