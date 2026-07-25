export type BtcResearchBar = {
  time_ms: number;
  open_time_utc: string;
  close_time_ms: number;
  close_time_utc: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type BtcResearchStatePoint = {
  observed_at_utc: string;
  bar_time_ms: number;
  bar_open_time_utc: string;
  bar_close_time_utc: string;
  price: number;
  direction_state: string;
  composite_volatility_state: string;
  vol_of_vol_state: string;
  filter_agreement_score: number | null;
  shadow_filter_regimes: Record<string, string>;
  authority_classification: "DESCRIPTIVE_CONTEXT_ONLY";
};

export type BtcResearchMark = {
  id: string;
  time_ms: number;
  kind:
    | "direction_change"
    | "composite_volatility_change"
    | "vol_of_vol_change";
  label: string;
  from: string;
  to: string;
  title: string;
};

export type BtcResearchObservatoryBundle = {
  schema_version: 1;
  dataset_id: "btc_public_research_observatory_v1";
  generated_at_utc: string;
  symbol: "BTCUSDT";
  interval: "5m";
  authority_classification: "SERVER_AUTHORITATIVE_RESEARCH_CONTEXT";
  model_scope: string;
  counts: {
    bars: number;
    state_points: number;
    marks: number;
  };
  freshness: {
    latest_state_age_seconds: number;
    latest_completed_bar_age_seconds: number;
  };
  source: {
    bars_source: string;
    states_source: string;
    selected_bars_sha256: string;
    state_log_bytes_sha256: string;
  };
  bars: BtcResearchBar[];
  state_points: BtcResearchStatePoint[];
  marks: BtcResearchMark[];
  latest_state: BtcResearchStatePoint;
  omitted_authority_fields: string[];
  research_boundary: string;
  bundle_sha256: string;
};

const stateToken = /^[A-Z][A-Z0-9_]{0,63}$/;
const sha256 = /^[0-9a-f]{64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${field} must be a finite number`);
  }
  return value;
}

function exactString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${field} must be a non-empty string`);
  }
  return value;
}

function parseBar(value: unknown, index: number): BtcResearchBar {
  if (!isRecord(value)) {
    throw new Error(`bars[${index}] must be an object`);
  }
  const bar = {
    time_ms: exactNumber(value.time_ms, `bars[${index}].time_ms`),
    open_time_utc: exactString(value.open_time_utc, `bars[${index}].open_time_utc`),
    close_time_ms: exactNumber(value.close_time_ms, `bars[${index}].close_time_ms`),
    close_time_utc: exactString(value.close_time_utc, `bars[${index}].close_time_utc`),
    open: exactNumber(value.open, `bars[${index}].open`),
    high: exactNumber(value.high, `bars[${index}].high`),
    low: exactNumber(value.low, `bars[${index}].low`),
    close: exactNumber(value.close, `bars[${index}].close`),
    volume: exactNumber(value.volume, `bars[${index}].volume`),
  } satisfies BtcResearchBar;
  if (!Number.isInteger(bar.time_ms) || !Number.isInteger(bar.close_time_ms)) {
    throw new Error(`bars[${index}] timestamps must be integers`);
  }
  if (bar.low > Math.min(bar.open, bar.close) || bar.high < Math.max(bar.open, bar.close)) {
    throw new Error(`bars[${index}] has incoherent OHLC values`);
  }
  return bar;
}

function parseFilterRegimes(value: unknown, field: string): Record<string, string> {
  if (!isRecord(value)) {
    throw new Error(`${field} must be an object`);
  }
  const parsed: Record<string, string> = {};
  for (const [key, rawState] of Object.entries(value)) {
    if (!stateToken.test(key.toUpperCase()) || typeof rawState !== "string" || !stateToken.test(rawState)) {
      throw new Error(`${field} contains an invalid state`);
    }
    parsed[key] = rawState;
  }
  return parsed;
}

function parseStatePoint(value: unknown, index: number): BtcResearchStatePoint {
  if (!isRecord(value)) {
    throw new Error(`state_points[${index}] must be an object`);
  }
  const agreement = value.filter_agreement_score;
  if (agreement !== null && (typeof agreement !== "number" || !Number.isFinite(agreement))) {
    throw new Error(`state_points[${index}].filter_agreement_score is invalid`);
  }
  if (value.authority_classification !== "DESCRIPTIVE_CONTEXT_ONLY") {
    throw new Error(`state_points[${index}] has an invalid authority classification`);
  }
  const point = {
    observed_at_utc: exactString(value.observed_at_utc, `state_points[${index}].observed_at_utc`),
    bar_time_ms: exactNumber(value.bar_time_ms, `state_points[${index}].bar_time_ms`),
    bar_open_time_utc: exactString(value.bar_open_time_utc, `state_points[${index}].bar_open_time_utc`),
    bar_close_time_utc: exactString(value.bar_close_time_utc, `state_points[${index}].bar_close_time_utc`),
    price: exactNumber(value.price, `state_points[${index}].price`),
    direction_state: exactString(value.direction_state, `state_points[${index}].direction_state`),
    composite_volatility_state: exactString(
      value.composite_volatility_state,
      `state_points[${index}].composite_volatility_state`,
    ),
    vol_of_vol_state: exactString(value.vol_of_vol_state, `state_points[${index}].vol_of_vol_state`),
    filter_agreement_score: agreement,
    shadow_filter_regimes: parseFilterRegimes(
      value.shadow_filter_regimes,
      `state_points[${index}].shadow_filter_regimes`,
    ),
    authority_classification: "DESCRIPTIVE_CONTEXT_ONLY",
  } satisfies BtcResearchStatePoint;
  if (
    !Number.isInteger(point.bar_time_ms) ||
    !stateToken.test(point.direction_state) ||
    !stateToken.test(point.composite_volatility_state) ||
    !stateToken.test(point.vol_of_vol_state)
  ) {
    throw new Error(`state_points[${index}] has an invalid classification`);
  }
  return point;
}

function parseMark(value: unknown, index: number): BtcResearchMark {
  if (!isRecord(value)) {
    throw new Error(`marks[${index}] must be an object`);
  }
  const kind = value.kind;
  if (
    kind !== "direction_change" &&
    kind !== "composite_volatility_change" &&
    kind !== "vol_of_vol_change"
  ) {
    throw new Error(`marks[${index}].kind is invalid`);
  }
  return {
    id: exactString(value.id, `marks[${index}].id`),
    time_ms: exactNumber(value.time_ms, `marks[${index}].time_ms`),
    kind,
    label: exactString(value.label, `marks[${index}].label`),
    from: exactString(value.from, `marks[${index}].from`),
    to: exactString(value.to, `marks[${index}].to`),
    title: exactString(value.title, `marks[${index}].title`),
  };
}

export function parseBtcResearchObservatoryBundle(value: unknown): BtcResearchObservatoryBundle {
  if (!isRecord(value)) {
    throw new Error("Observatory response must be an object");
  }
  if (
    value.schema_version !== 1 ||
    value.dataset_id !== "btc_public_research_observatory_v1" ||
    value.symbol !== "BTCUSDT" ||
    value.interval !== "5m" ||
    value.authority_classification !== "SERVER_AUTHORITATIVE_RESEARCH_CONTEXT"
  ) {
    throw new Error("Observatory response has an unsupported contract");
  }
  if (!Array.isArray(value.bars) || !Array.isArray(value.state_points) || !Array.isArray(value.marks)) {
    throw new Error("Observatory response is missing bounded arrays");
  }
  const bars = value.bars.map(parseBar);
  const statePoints = value.state_points.map(parseStatePoint);
  const marks = value.marks.map(parseMark);
  if (bars.length === 0 || statePoints.length === 0) {
    throw new Error("Observatory response has no current evidence");
  }
  if (!isRecord(value.counts) || !isRecord(value.freshness) || !isRecord(value.source)) {
    throw new Error("Observatory response is missing metadata");
  }
  const counts = {
    bars: exactNumber(value.counts.bars, "counts.bars"),
    state_points: exactNumber(value.counts.state_points, "counts.state_points"),
    marks: exactNumber(value.counts.marks, "counts.marks"),
  };
  if (counts.bars !== bars.length || counts.state_points !== statePoints.length || counts.marks !== marks.length) {
    throw new Error("Observatory counts do not match the response");
  }
  const latestState = parseStatePoint(value.latest_state, statePoints.length - 1);
  if (latestState.observed_at_utc !== statePoints[statePoints.length - 1].observed_at_utc) {
    throw new Error("Observatory latest state does not match the state history");
  }
  const bundleSha256 = exactString(value.bundle_sha256, "bundle_sha256");
  if (!sha256.test(bundleSha256)) {
    throw new Error("Observatory bundle hash is invalid");
  }
  const omitted = value.omitted_authority_fields;
  if (!Array.isArray(omitted) || omitted.some((item) => typeof item !== "string")) {
    throw new Error("Observatory omitted-authority declaration is invalid");
  }
  return {
    schema_version: 1,
    dataset_id: "btc_public_research_observatory_v1",
    generated_at_utc: exactString(value.generated_at_utc, "generated_at_utc"),
    symbol: "BTCUSDT",
    interval: "5m",
    authority_classification: "SERVER_AUTHORITATIVE_RESEARCH_CONTEXT",
    model_scope: exactString(value.model_scope, "model_scope"),
    counts,
    freshness: {
      latest_state_age_seconds: exactNumber(
        value.freshness.latest_state_age_seconds,
        "freshness.latest_state_age_seconds",
      ),
      latest_completed_bar_age_seconds: exactNumber(
        value.freshness.latest_completed_bar_age_seconds,
        "freshness.latest_completed_bar_age_seconds",
      ),
    },
    source: {
      bars_source: exactString(value.source.bars_source, "source.bars_source"),
      states_source: exactString(value.source.states_source, "source.states_source"),
      selected_bars_sha256: exactString(
        value.source.selected_bars_sha256,
        "source.selected_bars_sha256",
      ),
      state_log_bytes_sha256: exactString(
        value.source.state_log_bytes_sha256,
        "source.state_log_bytes_sha256",
      ),
    },
    bars,
    state_points: statePoints,
    marks,
    latest_state: latestState,
    omitted_authority_fields: omitted as string[],
    research_boundary: exactString(value.research_boundary, "research_boundary"),
    bundle_sha256: bundleSha256,
  };
}

export function formatUtcTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export function formatAge(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "Unavailable";
  }
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  if (seconds < 3_600) {
    return `${Math.floor(seconds / 60)}m`;
  }
  return `${Math.floor(seconds / 3_600)}h ${Math.floor((seconds % 3_600) / 60)}m`;
}
