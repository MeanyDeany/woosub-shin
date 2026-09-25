export type BinanceDailyPerformanceDay = {
  date_utc: string;
  status: "CLOSED" | "IN_PROGRESS" | "MISSING";
  start_observed_at_utc: string | null;
  end_observed_at_utc: string | null;
  actual_duration_seconds: number | null;
  net_pnl: number | null;
  return_pct: number | null;
};

export type BinanceDailyPerformanceTelemetry = {
  schema_version: 1;
  dataset_id: "binance_usdm_public_daily_performance_v1";
  generated_at_utc: string;
  observed_at_utc: string;
  tracking_started_at_utc: "2026-08-01T00:00:00Z";
  venue: "BINANCE_USDM";
  environment: "PRODUCTION";
  scope: "BINANCE_USDM_ACCOUNT_WIDE_DAILY_TRADING_V1";
  reporting_currency: "USD";
  days: BinanceDailyPerformanceDay[];
  return_method: "MODIFIED_DIETZ_FLOW_ADJUSTED_V2";
  capital_flow_handling: "EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2";
  freshness_ttl_seconds: 180;
  authority_classification: "PERFORMANCE_TELEMETRY_ONLY";
  external_action_permitted: false;
  telemetry_sha256: string;
};

export const DEFAULT_BTC_DAILY_PERFORMANCE_FEED_URL =
  "https://btc-data.meanydeany.com/public/execution/daily-performance.json";

const sha256=/^[0-9a-f]{64}$/;
const utc=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?Z$/;
const date=/^\d{4}-\d{2}-\d{2}$/;
const topKeys=["schema_version","dataset_id","generated_at_utc","observed_at_utc","tracking_started_at_utc","venue","environment","scope","reporting_currency","days","return_method","capital_flow_handling","freshness_ttl_seconds","authority_classification","external_action_permitted","telemetry_sha256"] as const;
const dayKeys=["date_utc","status","start_observed_at_utc","end_observed_at_utc","actual_duration_seconds","net_pnl","return_pct"] as const;

function isRecord(value: unknown): value is Record<string,unknown>{return typeof value==="object"&&value!==null&&!Array.isArray(value);}
function exactKeys(value:Record<string,unknown>,expected:readonly string[],field:string){const actual=Object.keys(value).sort();const wanted=[...expected].sort();if(actual.length!==wanted.length||actual.some((key,index)=>key!==wanted[index])) throw new Error(`${field} fields do not match contract`);}
function timestamp(value:unknown,field:string):string{if(typeof value!=="string"||!utc.test(value)||!Number.isFinite(Date.parse(value))) throw new Error(`${field} must be RFC3339 UTC text`);return value;}
function finite(value:unknown,field:string):number{if(typeof value!=="number"||!Number.isFinite(value)||Object.is(value,-0)) throw new Error(`${field} must be finite public number`);return value;}
function nullableTimestamp(value:unknown,field:string):string|null{return value===null?null:timestamp(value,field);}
function nullableFinite(value:unknown,field:string):number|null{return value===null?null:finite(value,field);}

function parseDay(value:unknown,index:number):BinanceDailyPerformanceDay{
  if(!isRecord(value)) throw new Error("Daily performance row must be an object");
  exactKeys(value,dayKeys,"Daily performance row");
  if(typeof value.date_utc!=="string"||!date.test(value.date_utc)||!Number.isFinite(Date.parse(value.date_utc+"T00:00:00Z"))) throw new Error("Daily date is invalid");
  if(value.status!=="CLOSED"&&value.status!=="IN_PROGRESS"&&value.status!=="MISSING") throw new Error("Daily status is invalid");
  const start=nullableTimestamp(value.start_observed_at_utc,`days[${index}].start_observed_at_utc`);
  const end=nullableTimestamp(value.end_observed_at_utc,`days[${index}].end_observed_at_utc`);
  let duration:number|null=null;
  if(value.actual_duration_seconds!==null){
    if(typeof value.actual_duration_seconds!=="number"||!Number.isSafeInteger(value.actual_duration_seconds)||value.actual_duration_seconds<=0) throw new Error("Daily duration is invalid");
    duration=value.actual_duration_seconds;
  }
  const pnl=nullableFinite(value.net_pnl,`days[${index}].net_pnl`);
  const ret=nullableFinite(value.return_pct,`days[${index}].return_pct`);
  if(value.status==="MISSING"){
    if(start!==null||end!==null||duration!==null||pnl!==null||ret!==null) throw new Error("Missing daily row must contain null measurements");
  }else{
    if(start===null||end===null||duration===null||pnl===null||ret===null) throw new Error("Measured daily row is incomplete");
    if(Date.parse(start)>=Date.parse(end)||Math.floor((Date.parse(end)-Date.parse(start))/1000)!==duration) throw new Error("Daily row timestamps are inconsistent");
  }
  return {date_utc:value.date_utc,status:value.status,start_observed_at_utc:start,end_observed_at_utc:end,actual_duration_seconds:duration,net_pnl:pnl,return_pct:ret};
}

export function parseBtcDailyPerformanceTelemetry(value:unknown):BinanceDailyPerformanceTelemetry{
  if(!isRecord(value)) throw new Error("Daily performance telemetry must be an object");
  exactKeys(value,topKeys,"Daily performance telemetry");
  if(value.schema_version!==1||value.dataset_id!=="binance_usdm_public_daily_performance_v1"||value.tracking_started_at_utc!=="2026-08-01T00:00:00Z"||value.venue!=="BINANCE_USDM"||value.environment!=="PRODUCTION"||value.scope!=="BINANCE_USDM_ACCOUNT_WIDE_DAILY_TRADING_V1"||value.reporting_currency!=="USD"||value.return_method!=="MODIFIED_DIETZ_FLOW_ADJUSTED_V2"||value.capital_flow_handling!=="EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2"||value.freshness_ttl_seconds!==180||value.authority_classification!=="PERFORMANCE_TELEMETRY_ONLY"||value.external_action_permitted!==false) throw new Error("Unsupported daily performance contract");
  const generated=timestamp(value.generated_at_utc,"generated_at_utc");
  const observed=timestamp(value.observed_at_utc,"observed_at_utc");
  if(Date.parse(observed)>Date.parse(generated)) throw new Error("Daily performance timestamps are not chronological");
  if(!Array.isArray(value.days)||value.days.length===0) throw new Error("Daily performance days are unavailable");
  const days=value.days.map(parseDay);
  let expected="2026-08-01";
  for(const [index,item] of days.entries()){
    if(item.date_utc!==expected) throw new Error("Daily performance dates are not contiguous");
    expected=new Date(Date.parse(expected+"T00:00:00Z")+86400000).toISOString().slice(0,10);
    if(item.status==="IN_PROGRESS"&&index!==days.length-1) throw new Error("Only the latest day may be in progress");
  }
  if(days.at(-1)?.date_utc!==observed.slice(0,10)) throw new Error("Daily performance does not end on the observed UTC day");
  if(typeof value.telemetry_sha256!=="string"||!sha256.test(value.telemetry_sha256)) throw new Error("Daily performance SHA-256 is invalid");
  return {schema_version:1,dataset_id:"binance_usdm_public_daily_performance_v1",generated_at_utc:generated,observed_at_utc:observed,tracking_started_at_utc:"2026-08-01T00:00:00Z",venue:"BINANCE_USDM",environment:"PRODUCTION",scope:"BINANCE_USDM_ACCOUNT_WIDE_DAILY_TRADING_V1",reporting_currency:"USD",days,return_method:"MODIFIED_DIETZ_FLOW_ADJUSTED_V2",capital_flow_handling:"EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2",freshness_ttl_seconds:180,authority_classification:"PERFORMANCE_TELEMETRY_ONLY",external_action_permitted:false,telemetry_sha256:value.telemetry_sha256};
}

function validHttpsUrl(value?:string):string|undefined{if(!value)return undefined;try{const url=new URL(value);if(url.protocol!=="https:")return undefined;url.search="";url.hash="";return url.toString();}catch{return undefined;}}
export function deriveBtcDailyPerformanceFeedUrl(observatoryFeedUrl?:string,directFeedUrl?:string):string{
  const direct=validHttpsUrl(directFeedUrl); if(direct)return direct;
  const observatory=validHttpsUrl(observatoryFeedUrl); if(observatory){const url=new URL(observatory);url.pathname="/public/execution/daily-performance.json";return url.toString();}
  return DEFAULT_BTC_DAILY_PERFORMANCE_FEED_URL;
}
export function dailyPerformanceAgeSeconds(telemetry:BinanceDailyPerformanceTelemetry,nowMs=Date.now()):number{return Math.max(0,Math.floor((nowMs-Date.parse(telemetry.observed_at_utc))/1000));}
