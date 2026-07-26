export type ObservatoryLocale = "en" | "ko";

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

const FIVE_MINUTES_MS = 300_000;
const MAX_BARS = 8_640;
const MAX_STATE_POINTS = 8_640;
const MAX_MARKS = 25_920;
const MAX_FILTERS = 64;
const MAX_OMITTED_AUTHORITY_FIELDS = 64;
const MAX_TEXT_BYTES = 2_048;
const MAX_SHORT_TEXT_BYTES = 256;

const stateToken = /^[A-Z][A-Z0-9_]{0,63}$/;
const filterKey = /^[a-z][a-z0-9_]{0,63}$/;
const authorityField = /^[a-z][a-z0-9_]{0,63}$/;
const sha256 = /^[0-9a-f]{64}$/;
const utf8 = new TextEncoder();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${field} must be a finite number`);
  }
  return value;
}

function exactSafeInteger(value: unknown, field: string, minimum?: number): number {
  const parsed = exactNumber(value, field);
  if (!Number.isSafeInteger(parsed) || (minimum !== undefined && parsed < minimum)) {
    throw new Error(`${field} must be a safe integer`);
  }
  return parsed;
}

function exactBoundedString(
  value: unknown,
  field: string,
  maximumBytes = MAX_SHORT_TEXT_BYTES,
): string {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.includes("\0") ||
    utf8.encode(value).length > maximumBytes
  ) {
    throw new Error(`${field} must be a bounded non-empty string`);
  }
  return value;
}

function exactSha256(value: unknown, field: string): string {
  const parsed = exactBoundedString(value, field, 64);
  if (!sha256.test(parsed)) {
    throw new Error(`${field} must be a lowercase SHA-256`);
  }
  return parsed;
}

function exactUtcTimestamp(value: unknown, field: string): string {
  const parsed = exactBoundedString(value, field, 64);
  if (!/(?:Z|[+-]\d{2}:\d{2})$/i.test(parsed) || !Number.isFinite(Date.parse(parsed))) {
    throw new Error(`${field} must be a valid timezone-qualified timestamp`);
  }
  return parsed;
}

function timestampMatches(value: string, expectedMs: number, field: string): void {
  if (Date.parse(value) !== expectedMs) {
    throw new Error(`${field} does not match its millisecond timestamp`);
  }
}

function boundedArray(value: unknown, field: string, maximum: number): unknown[] {
  if (!Array.isArray(value) || value.length > maximum) {
    throw new Error(`${field} must be an array with at most ${maximum} items`);
  }
  return value;
}

function parseBar(value: unknown, index: number): BtcResearchBar {
  if (!isRecord(value)) {
    throw new Error(`bars[${index}] must be an object`);
  }
  const bar = {
    time_ms: exactSafeInteger(value.time_ms, `bars[${index}].time_ms`, 0),
    open_time_utc: exactUtcTimestamp(value.open_time_utc, `bars[${index}].open_time_utc`),
    close_time_ms: exactSafeInteger(value.close_time_ms, `bars[${index}].close_time_ms`, 0),
    close_time_utc: exactUtcTimestamp(value.close_time_utc, `bars[${index}].close_time_utc`),
    open: exactNumber(value.open, `bars[${index}].open`),
    high: exactNumber(value.high, `bars[${index}].high`),
    low: exactNumber(value.low, `bars[${index}].low`),
    close: exactNumber(value.close, `bars[${index}].close`),
    volume: exactNumber(value.volume, `bars[${index}].volume`),
  } satisfies BtcResearchBar;

  timestampMatches(bar.open_time_utc, bar.time_ms, `bars[${index}].open_time_utc`);
  timestampMatches(bar.close_time_utc, bar.close_time_ms, `bars[${index}].close_time_utc`);
  if (
    bar.time_ms % FIVE_MINUTES_MS !== 0 ||
    bar.close_time_ms !== bar.time_ms + FIVE_MINUTES_MS - 1
  ) {
    throw new Error(`bars[${index}] has invalid 5-minute timing`);
  }
  if (
    bar.open <= 0 ||
    bar.high <= 0 ||
    bar.low <= 0 ||
    bar.close <= 0 ||
    bar.volume < 0 ||
    bar.low > Math.min(bar.open, bar.close) ||
    bar.high < Math.max(bar.open, bar.close) ||
    bar.low > bar.high
  ) {
    throw new Error(`bars[${index}] has incoherent OHLCV values`);
  }
  return bar;
}

function parseFilterRegimes(value: unknown, field: string): Record<string, string> {
  if (!isRecord(value)) {
    throw new Error(`${field} must be an object`);
  }
  const entries = Object.entries(value);
  if (entries.length > MAX_FILTERS) {
    throw new Error(`${field} contains too many filters`);
  }
  const parsed: Record<string, string> = {};
  for (const [key, rawState] of entries) {
    if (!filterKey.test(key) || typeof rawState !== "string" || !stateToken.test(rawState)) {
      throw new Error(`${field} contains an invalid filter state`);
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
  if (
    agreement !== null &&
    (typeof agreement !== "number" ||
      !Number.isFinite(agreement) ||
      agreement < 0 ||
      agreement > 1)
  ) {
    throw new Error(`state_points[${index}].filter_agreement_score must be null or within 0..1`);
  }
  if (value.authority_classification !== "DESCRIPTIVE_CONTEXT_ONLY") {
    throw new Error(`state_points[${index}] has an invalid authority classification`);
  }
  const point = {
    observed_at_utc: exactUtcTimestamp(
      value.observed_at_utc,
      `state_points[${index}].observed_at_utc`,
    ),
    bar_time_ms: exactSafeInteger(value.bar_time_ms, `state_points[${index}].bar_time_ms`, 0),
    bar_open_time_utc: exactUtcTimestamp(
      value.bar_open_time_utc,
      `state_points[${index}].bar_open_time_utc`,
    ),
    bar_close_time_utc: exactUtcTimestamp(
      value.bar_close_time_utc,
      `state_points[${index}].bar_close_time_utc`,
    ),
    price: exactNumber(value.price, `state_points[${index}].price`),
    direction_state: exactBoundedString(
      value.direction_state,
      `state_points[${index}].direction_state`,
      64,
    ),
    composite_volatility_state: exactBoundedString(
      value.composite_volatility_state,
      `state_points[${index}].composite_volatility_state`,
      64,
    ),
    vol_of_vol_state: exactBoundedString(
      value.vol_of_vol_state,
      `state_points[${index}].vol_of_vol_state`,
      64,
    ),
    filter_agreement_score: agreement,
    shadow_filter_regimes: parseFilterRegimes(
      value.shadow_filter_regimes,
      `state_points[${index}].shadow_filter_regimes`,
    ),
    authority_classification: "DESCRIPTIVE_CONTEXT_ONLY",
  } satisfies BtcResearchStatePoint;

  if (
    point.price <= 0 ||
    point.bar_time_ms % FIVE_MINUTES_MS !== 0 ||
    Date.parse(point.bar_open_time_utc) !== point.bar_time_ms ||
    Date.parse(point.bar_close_time_utc) < point.bar_time_ms ||
    !stateToken.test(point.direction_state) ||
    !stateToken.test(point.composite_volatility_state) ||
    !stateToken.test(point.vol_of_vol_state)
  ) {
    throw new Error(`state_points[${index}] has an invalid classification or timing`);
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
  const from = exactBoundedString(value.from, `marks[${index}].from`, 64);
  const to = exactBoundedString(value.to, `marks[${index}].to`, 64);
  if (!stateToken.test(from) || !stateToken.test(to) || from === to) {
    throw new Error(`marks[${index}] must describe one exact state transition`);
  }
  return {
    id: exactBoundedString(value.id, `marks[${index}].id`, 128),
    time_ms: exactSafeInteger(value.time_ms, `marks[${index}].time_ms`, 0),
    kind,
    label: exactBoundedString(value.label, `marks[${index}].label`, 128),
    from,
    to,
    title: exactBoundedString(value.title, `marks[${index}].title`, MAX_TEXT_BYTES),
  };
}

function sameStringRecord(left: Record<string, string>, right: Record<string, string>): boolean {
  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);
  return (
    leftEntries.length === rightEntries.length &&
    leftEntries.every(([key, value]) => right[key] === value)
  );
}

function sameStatePoint(left: BtcResearchStatePoint, right: BtcResearchStatePoint): boolean {
  return (
    left.observed_at_utc === right.observed_at_utc &&
    left.bar_time_ms === right.bar_time_ms &&
    left.bar_open_time_utc === right.bar_open_time_utc &&
    left.bar_close_time_utc === right.bar_close_time_utc &&
    left.price === right.price &&
    left.direction_state === right.direction_state &&
    left.composite_volatility_state === right.composite_volatility_state &&
    left.vol_of_vol_state === right.vol_of_vol_state &&
    left.filter_agreement_score === right.filter_agreement_score &&
    left.authority_classification === right.authority_classification &&
    sameStringRecord(left.shadow_filter_regimes, right.shadow_filter_regimes)
  );
}

function validateBarSequence(bars: BtcResearchBar[]): Map<number, BtcResearchBar> {
  const barsByTime = new Map<number, BtcResearchBar>();
  for (const [index, bar] of bars.entries()) {
    if (barsByTime.has(bar.time_ms)) {
      throw new Error(`bars[${index}] duplicates a completed bar`);
    }
    if (index > 0) {
      const gap = bar.time_ms - bars[index - 1].time_ms;
      if (gap <= 0 || gap % FIVE_MINUTES_MS !== 0) {
        throw new Error(`bars[${index}] is not in ascending 5-minute order`);
      }
    }
    barsByTime.set(bar.time_ms, bar);
  }
  return barsByTime;
}

function validateStateSequence(
  points: BtcResearchStatePoint[],
  barsByTime: Map<number, BtcResearchBar>,
): Set<number> {
  const times = new Set<number>();
  for (const [index, point] of points.entries()) {
    const bar = barsByTime.get(point.bar_time_ms);
    if (!bar) {
      throw new Error(`state_points[${index}] does not reference a selected completed bar`);
    }
    if (
      point.bar_open_time_utc !== bar.open_time_utc ||
      point.bar_close_time_utc !== bar.close_time_utc
    ) {
      throw new Error(`state_points[${index}] does not retain the selected bar timestamps`);
    }
    if (times.has(point.bar_time_ms)) {
      throw new Error(`state_points[${index}] duplicates a state observation`);
    }
    if (index > 0 && point.bar_time_ms <= points[index - 1].bar_time_ms) {
      throw new Error(`state_points[${index}] is not strictly ordered`);
    }
    times.add(point.bar_time_ms);
  }
  return times;
}

function validateMarks(marks: BtcResearchMark[], stateTimes: Set<number>): void {
  const ids = new Set<string>();
  for (const [index, mark] of marks.entries()) {
    if (ids.has(mark.id)) {
      throw new Error(`marks[${index}] duplicates a mark ID`);
    }
    if (!stateTimes.has(mark.time_ms)) {
      throw new Error(`marks[${index}] does not reference a state observation`);
    }
    if (index > 0 && mark.time_ms < marks[index - 1].time_ms) {
      throw new Error(`marks[${index}] is not ordered`);
    }
    ids.add(mark.id);
  }
}

function parseOmittedAuthorityFields(value: unknown): string[] {
  const omitted = boundedArray(
    value,
    "omitted_authority_fields",
    MAX_OMITTED_AUTHORITY_FIELDS,
  );
  const parsed = omitted.map((item, index) => {
    const field = exactBoundedString(item, `omitted_authority_fields[${index}]`, 64);
    if (!authorityField.test(field)) {
      throw new Error(`omitted_authority_fields[${index}] is invalid`);
    }
    return field;
  });
  if (new Set(parsed).size !== parsed.length) {
    throw new Error("omitted_authority_fields contains duplicates");
  }
  return parsed;
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

  const rawBars = boundedArray(value.bars, "bars", MAX_BARS);
  const rawStatePoints = boundedArray(value.state_points, "state_points", MAX_STATE_POINTS);
  const rawMarks = boundedArray(value.marks, "marks", MAX_MARKS);
  if (rawBars.length === 0 || rawStatePoints.length === 0) {
    throw new Error("Observatory response has no current evidence");
  }
  const bars = rawBars.map(parseBar);
  const statePoints = rawStatePoints.map(parseStatePoint);
  const marks = rawMarks.map(parseMark);
  const barsByTime = validateBarSequence(bars);
  const stateTimes = validateStateSequence(statePoints, barsByTime);
  validateMarks(marks, stateTimes);

  if (!isRecord(value.counts) || !isRecord(value.freshness) || !isRecord(value.source)) {
    throw new Error("Observatory response is missing metadata");
  }
  const counts = {
    bars: exactSafeInteger(value.counts.bars, "counts.bars", 0),
    state_points: exactSafeInteger(value.counts.state_points, "counts.state_points", 0),
    marks: exactSafeInteger(value.counts.marks, "counts.marks", 0),
  };
  if (
    counts.bars !== bars.length ||
    counts.state_points !== statePoints.length ||
    counts.marks !== marks.length
  ) {
    throw new Error("Observatory counts do not match the response");
  }

  const latestState = parseStatePoint(value.latest_state, statePoints.length - 1);
  if (!sameStatePoint(latestState, statePoints[statePoints.length - 1])) {
    throw new Error("Observatory latest state does not match the state history");
  }

  const generatedAtUtc = exactUtcTimestamp(value.generated_at_utc, "generated_at_utc");
  const latestStateAgeSeconds = exactSafeInteger(
    value.freshness.latest_state_age_seconds,
    "freshness.latest_state_age_seconds",
    0,
  );
  const latestCompletedBarAgeSeconds = exactSafeInteger(
    value.freshness.latest_completed_bar_age_seconds,
    "freshness.latest_completed_bar_age_seconds",
    0,
  );
  const generatedAtMs = Date.parse(generatedAtUtc);
  if (
    Date.parse(latestState.observed_at_utc) > generatedAtMs ||
    bars[bars.length - 1].close_time_ms > generatedAtMs
  ) {
    throw new Error("Observatory evidence cannot be newer than bundle generation");
  }

  return {
    schema_version: 1,
    dataset_id: "btc_public_research_observatory_v1",
    generated_at_utc: generatedAtUtc,
    symbol: "BTCUSDT",
    interval: "5m",
    authority_classification: "SERVER_AUTHORITATIVE_RESEARCH_CONTEXT",
    model_scope: exactBoundedString(value.model_scope, "model_scope", MAX_TEXT_BYTES),
    counts,
    freshness: {
      latest_state_age_seconds: latestStateAgeSeconds,
      latest_completed_bar_age_seconds: latestCompletedBarAgeSeconds,
    },
    source: {
      bars_source: exactBoundedString(value.source.bars_source, "source.bars_source"),
      states_source: exactBoundedString(value.source.states_source, "source.states_source"),
      selected_bars_sha256: exactSha256(
        value.source.selected_bars_sha256,
        "source.selected_bars_sha256",
      ),
      state_log_bytes_sha256: exactSha256(
        value.source.state_log_bytes_sha256,
        "source.state_log_bytes_sha256",
      ),
    },
    bars,
    state_points: statePoints,
    marks,
    latest_state: latestState,
    omitted_authority_fields: parseOmittedAuthorityFields(value.omitted_authority_fields),
    research_boundary: exactBoundedString(
      value.research_boundary,
      "research_boundary",
      MAX_TEXT_BYTES,
    ),
    bundle_sha256: exactSha256(value.bundle_sha256, "bundle_sha256"),
  };
}

export function formatUtcTimestamp(value: string, locale: ObservatoryLocale = "en"): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return locale === "ko" ? "사용 불가" : "Unavailable";
  }
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export function formatAge(seconds: number, locale: ObservatoryLocale = "en"): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return locale === "ko" ? "사용 불가" : "Unavailable";
  }
  if (seconds < 60) {
    return locale === "ko" ? `${Math.round(seconds)}초` : `${Math.round(seconds)}s`;
  }
  if (seconds < 3_600) {
    return locale === "ko"
      ? `${Math.floor(seconds / 60)}분`
      : `${Math.floor(seconds / 60)}m`;
  }
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  return locale === "ko" ? `${hours}시간 ${minutes}분` : `${hours}h ${minutes}m`;
}
