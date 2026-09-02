import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_BTC_MULTI_POSITION_FEED_URL,
  deriveBtcLiveMultiPositionFeedUrl,
  parseBtcLiveMultiPositionTelemetry,
} from "../lib/btc-live-multi-position.ts";
import { parseBtcLifetimePerformanceTelemetry } from "../lib/btc-lifetime-performance.ts";

const SHA_A = "a".repeat(64);
const SHA_B = "b".repeat(64);

function performance(overrides = {}) {
  return {
    schema_version: 2,
    dataset_id: "binance_usdm_public_flow_adjusted_performance_v2",
    generated_at_utc: "2026-09-02T06:31:02Z",
    observed_at_utc: "2026-09-02T06:31:01Z",
    tracking_started_at_utc: "2026-08-01T00:00:00Z",
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    scope: "BINANCE_USDM_ACCOUNT_WIDE_TRADING_V2",
    reporting_currency: "USD",
    realized_net_pnl: 558.99302655,
    current_unrealized_pnl: -25.1009,
    lifetime_net_pnl: 1159.73400546,
    lifetime_return_pct: 63.68566043,
    return_method: "MODIFIED_DIETZ_FLOW_ADJUSTED_V2",
    capital_flow_handling: "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2",
    freshness_ttl_seconds: 180,
    authority_classification: "PERFORMANCE_TELEMETRY_ONLY",
    external_action_permitted: false,
    telemetry_sha256: SHA_A,
    ...overrides,
  };
}

function positions(overrides = {}) {
  return {
    schema_version: 2,
    dataset_id: "binance_usdm_public_open_positions_v2",
    generated_at_utc: "2026-09-02T06:31:02Z",
    observed_at_utc: "2026-09-02T06:31:01Z",
    venue: "BINANCE_USDM",
    environment: "PRODUCTION",
    position_mode: "HEDGE",
    open_position_count: 3,
    positions: [
      {
        symbol: "BTCUSDC",
        position_side: "LONG",
        position_state: "LONG",
        ordinary_open_orders_present: false,
        algo_open_orders_present: false,
      },
      {
        symbol: "BTCUSDC",
        position_side: "SHORT",
        position_state: "SHORT",
        ordinary_open_orders_present: true,
        algo_open_orders_present: false,
      },
      {
        symbol: "ETHUSDT",
        position_side: "SHORT",
        position_state: "SHORT",
        ordinary_open_orders_present: false,
        algo_open_orders_present: true,
      },
    ],
    observation_identity_sha256: SHA_A,
    freshness_ttl_seconds: 180,
    authority_classification: "AUTHENTICATED_READ_ONLY_TELEMETRY",
    external_action_permitted: false,
    telemetry_sha256: SHA_B,
    ...overrides,
  };
}

test("accepts the fixed flow-adjusted V2 performance contract", () => {
  const parsed = parseBtcLifetimePerformanceTelemetry(performance());
  assert.equal(parsed.tracking_started_at_utc, "2026-08-01T00:00:00Z");
  assert.equal(parsed.lifetime_net_pnl, 1159.73400546);
  assert.equal(parsed.current_unrealized_pnl, -25.1009);
});

test("rejects V1, extra fields, negative zero, and enabled external action", () => {
  assert.throws(() =>
    parseBtcLifetimePerformanceTelemetry(performance({ schema_version: 1 })),
  );
  assert.throws(() =>
    parseBtcLifetimePerformanceTelemetry({ ...performance(), unsupported: true }),
  );
  assert.throws(() =>
    parseBtcLifetimePerformanceTelemetry(performance({ lifetime_net_pnl: -0 })),
  );
  assert.throws(() =>
    parseBtcLifetimePerformanceTelemetry(performance({ external_action_permitted: true })),
  );
});

test("accepts arbitrary symbols and two hedge sides in canonical order", () => {
  const parsed = parseBtcLiveMultiPositionTelemetry(positions());
  assert.equal(parsed.open_position_count, 3);
  assert.deepEqual(
    parsed.positions.map((position) => `${position.symbol}:${position.position_side}`),
    ["BTCUSDC:LONG", "BTCUSDC:SHORT", "ETHUSDT:SHORT"],
  );
});

test("accepts a validated flat account", () => {
  const parsed = parseBtcLiveMultiPositionTelemetry(
    positions({ position_mode: "ONE_WAY", open_position_count: 0, positions: [] }),
  );
  assert.deepEqual(parsed.positions, []);
});

test("rejects count mismatches, non-canonical order, and malformed authority", () => {
  assert.throws(() =>
    parseBtcLiveMultiPositionTelemetry(positions({ open_position_count: 2 })),
  );
  const reversed = [...positions().positions].reverse();
  assert.throws(() =>
    parseBtcLiveMultiPositionTelemetry(positions({ positions: reversed })),
  );
  assert.throws(() =>
    parseBtcLiveMultiPositionTelemetry(positions({ external_action_permitted: true })),
  );
});

test("derives the V2 path and migrates a legacy direct override", () => {
  assert.equal(
    deriveBtcLiveMultiPositionFeedUrl(
      "https://btc-data.meanydeany.com/public/execution/observatory.json",
    ),
    "https://btc-data.meanydeany.com/public/execution/open-positions.json",
  );
  assert.equal(
    deriveBtcLiveMultiPositionFeedUrl(
      undefined,
      "https://btc-data.meanydeany.com/public/execution/multi-symbol-position.json?old=1",
    ),
    "https://btc-data.meanydeany.com/public/execution/open-positions.json",
  );
  assert.equal(deriveBtcLiveMultiPositionFeedUrl("http://unsafe.example"), DEFAULT_BTC_MULTI_POSITION_FEED_URL);
});
