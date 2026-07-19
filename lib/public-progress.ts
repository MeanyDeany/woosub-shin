export type ClaimStatus = "Demonstrated" | "In progress" | "Not claimed" | "Not approved";
export type ClaimTone = "amber" | "cyan" | "emerald" | "violet";

export const buildLog = [
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
    claim: "The repository can execute one bounded synthetic experiment.",
    evidence:
      "One fixed, parameter-free Decimal-series summary executes in memory and returns a deterministic ExperimentResult through the reviewed result factory.",
    limit:
      "It accepts no arbitrary code and says nothing about historical market performance.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "Verified historical market-data experiments are operational.",
    evidence:
      "One fixed read-only pipeline reloads a fully verified BTCUSDT run bundle, materializes immutable five-minute OHLCV rows, reconciles the dataset with the declared run, and produces a deterministic descriptive ExperimentResult.",
    limit:
      "The result contains descriptive bar statistics only. It is not a return study, backtest, strategy result, profitability claim, or trading approval.",
    status: "Demonstrated",
    tone: "emerald",
  },
  {
    claim: "Exact historical close-return evidence is operational.",
    evidence:
      "The exact rational close-return transform is the current build target following the verified historical-bar pipeline.",
    limit:
      "No completed close-return evidence is claimed until the transform and its independent validation are merged.",
    status: "In progress",
    tone: "cyan",
  },
  {
    claim: "The Lab currently operates multiple live asset adapters.",
    evidence:
      "The contracts are asset-neutral, but the only concrete end-to-end public-data adapter currently demonstrated is BTCUSDT five-minute data.",
    limit:
      "Multi-asset is an architecture under validation, not a statement that multiple assets are already running.",
    status: "Not claimed",
    tone: "violet",
  },
  {
    claim: "The research framework is profitable.",
    evidence:
      "The current outputs are infrastructure, deterministic evidence, and validation boundaries. There is no live strategy, fund, signal service, or software revenue claim.",
    limit:
      "Research evidence must not be presented as a track record or expected return.",
    status: "Not claimed",
    tone: "violet",
  },
  {
    claim: "Paper or live trading is approved.",
    evidence:
      "There is no broker integration, order routing, position management, entry permission, short permission, or leverage authority in the current system.",
    limit:
      "Research progress never automatically unlocks paper or live execution.",
    status: "Not approved",
    tone: "amber",
  },
];
