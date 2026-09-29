import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_BTC_DAILY_PERFORMANCE_FEED_URL,
  deriveBtcDailyPerformanceFeedUrl,
  parseBtcDailyPerformanceTelemetry,
} from "../lib/btc-daily-performance.ts";

const sha="a".repeat(64);
function v2Payload(){
  return {
    schema_version:2,
    dataset_id:"binance_usdm_public_daily_performance_v2",
    generated_at_utc:"2026-09-25T02:00:02Z",
    observed_at_utc:"2026-09-25T02:00:01Z",
    tracking_started_at_utc:"2026-08-01T00:00:00Z",
    venue:"BINANCE_USDM",environment:"PRODUCTION",
    scope:"BINANCE_USDM_ACCOUNT_WIDE_DAILY_TRADING_V2",
    reporting_currency:"USD",
    days:[
      {date_utc:"2026-08-01",status:"CLOSED",start_observed_at_utc:"2026-08-01T00:00:00Z",end_observed_at_utc:"2026-08-01T23:59:30Z",actual_duration_seconds:86370,net_pnl:10,return_pct:0.33,flow_adjusted_net_pnl:12.5,flow_adjusted_return_pct:0.4},
      ...Array.from({length:54},(_,i)=>{const d=new Date(Date.UTC(2026,7,2+i));const date=d.toISOString().slice(0,10);return {date_utc:date,status:"MISSING",start_observed_at_utc:null,end_observed_at_utc:null,actual_duration_seconds:null,net_pnl:null,return_pct:null,flow_adjusted_net_pnl:null,flow_adjusted_return_pct:null};}),
      {date_utc:"2026-09-25",status:"IN_PROGRESS",start_observed_at_utc:"2026-09-25T00:00:00Z",end_observed_at_utc:"2026-09-25T02:00:01Z",actual_duration_seconds:7201,net_pnl:-2.5,return_pct:-0.08,flow_adjusted_net_pnl:-3.25,flow_adjusted_return_pct:-0.1},
    ],
    return_method:"BINANCE_FUTURES_WALLET_PNL_V1",
    capital_flow_handling:"SUBTRACT_NET_CAPITAL_FLOW_ADD_GROSS_INFLOW_TO_DENOMINATOR_V1",
    secondary_return_method:"MODIFIED_DIETZ_FLOW_ADJUSTED_V2",
    secondary_capital_flow_handling:"EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2",
    freshness_ttl_seconds:180,
    authority_classification:"PERFORMANCE_TELEMETRY_ONLY",
    external_action_permitted:false,
    telemetry_sha256:sha,
  };
}
function v1Payload(){
  const value=v2Payload();
  return {
    schema_version:1,
    dataset_id:"binance_usdm_public_daily_performance_v1",
    generated_at_utc:value.generated_at_utc,
    observed_at_utc:value.observed_at_utc,
    tracking_started_at_utc:value.tracking_started_at_utc,
    venue:value.venue,environment:value.environment,
    scope:"BINANCE_USDM_ACCOUNT_WIDE_DAILY_TRADING_V1",
    reporting_currency:value.reporting_currency,
    days:value.days.map(({flow_adjusted_net_pnl: _p,flow_adjusted_return_pct: _r,...day})=>day),
    return_method:"MODIFIED_DIETZ_FLOW_ADJUSTED_V2",
    capital_flow_handling:"EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2",
    freshness_ttl_seconds:value.freshness_ttl_seconds,
    authority_classification:value.authority_classification,
    external_action_permitted:value.external_action_permitted,
    telemetry_sha256:value.telemetry_sha256,
  };
}
test("accepts Binance-compatible V2 daily rows and preserves MTM secondary values",()=>{
  const parsed=parseBtcDailyPerformanceTelemetry(v2Payload());
  assert.equal(parsed.metric_basis,"BINANCE_FUTURES_PNL_ANALYSIS");
  assert.equal(parsed.days[0].net_pnl,10);
  assert.equal(parsed.days[0].flow_adjusted_net_pnl,12.5);
  assert.equal(parsed.days.at(-1).status,"IN_PROGRESS");
});
test("accepts V1 during rollout and normalizes MTM fields",()=>{
  const parsed=parseBtcDailyPerformanceTelemetry(v1Payload());
  assert.equal(parsed.metric_basis,"FLOW_ADJUSTED_MTM");
  assert.equal(parsed.days[0].flow_adjusted_net_pnl,parsed.days[0].net_pnl);
  assert.equal(parsed.secondary_return_method,null);
});
test("rejects fabricated measurements on V2 missing rows",()=>{
  const value=v2Payload(); value.days[1]={...value.days[1],net_pnl:0};
  assert.throws(()=>parseBtcDailyPerformanceTelemetry(value));
});
test("rejects mixed V1/V2 contracts",()=>{
  const value=v2Payload(); value.dataset_id="binance_usdm_public_daily_performance_v1";
  assert.throws(()=>parseBtcDailyPerformanceTelemetry(value));
});
test("rejects broken chronology and authority",()=>{
  const a=v2Payload(); a.external_action_permitted=true; assert.throws(()=>parseBtcDailyPerformanceTelemetry(a));
  const b=v2Payload(); b.days[1]={...b.days[1],date_utc:"2026-08-03"}; assert.throws(()=>parseBtcDailyPerformanceTelemetry(b));
});
test("derives daily public URL safely",()=>{
  assert.equal(deriveBtcDailyPerformanceFeedUrl("https://btc-data.meanydeany.com/public/execution/observatory.json"),"https://btc-data.meanydeany.com/public/execution/daily-performance.json");
  assert.equal(deriveBtcDailyPerformanceFeedUrl(undefined,"http://unsafe.example"),DEFAULT_BTC_DAILY_PERFORMANCE_FEED_URL);
});
