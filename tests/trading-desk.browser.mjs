// Synthetic browser QA only. Fixtures are never shipped as account data.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const issues = [];
page.on('pageerror', error => issues.push(error.message));
page.on('dialog', dialog => dialog.accept());
let stale = false;
let empty = false;
let malformed = false;
const sha = 'a'.repeat(64);
const time = () => new Date(Date.now() - (stale ? 240_000 : 1000)).toISOString();
await page.route('**/public/execution/*.json', async route => {
  const observed = time();
  const common = { generated_at_utc: new Date().toISOString(), observed_at_utc: observed, venue: 'BINANCE_USDM', environment: 'PRODUCTION', freshness_ttl_seconds: 180, external_action_permitted: false, telemetry_sha256: sha };
  const file = new URL(route.request().url()).pathname.split('/').pop();
  let body;
  if (file === 'open-positions.json') body = { ...common, schema_version: 2, dataset_id: 'binance_usdm_public_open_positions_v2', position_mode: 'ONE_WAY', observation_identity_sha256: sha, authority_classification: 'AUTHENTICATED_READ_ONLY_TELEMETRY', open_position_count: malformed ? 77 : empty ? 0 : 2, positions: empty ? [] : [{ symbol: 'BTCUSDC', position_side: 'BOTH', position_state: 'LONG', ordinary_open_orders_present: false, algo_open_orders_present: true }, { symbol: 'ETHUSDT', position_side: 'BOTH', position_state: 'SHORT', ordinary_open_orders_present: true, algo_open_orders_present: false }] };
  if (file === 'lifetime-performance.json') body = { ...common, schema_version: 2, dataset_id: 'binance_usdm_public_flow_adjusted_performance_v2', tracking_started_at_utc: '2026-08-01T00:00:00Z', scope: 'BINANCE_USDM_ACCOUNT_WIDE_TRADING_V2', reporting_currency: 'USD', realized_net_pnl: 150, current_unrealized_pnl: -9.77, lifetime_net_pnl: 140.23, lifetime_return_pct: 7.01, return_method: 'MODIFIED_DIETZ_FLOW_ADJUSTED_V2', capital_flow_handling: 'EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2', authority_classification: 'PERFORMANCE_TELEMETRY_ONLY' };
  if (file === 'daily-performance.json') {
    const last = observed.slice(0,10); const days=[]; let cursor='2026-08-01'; let n=0;
    while(cursor<=last){ const start=cursor+'T00:00:00Z'; const isLast=cursor===last; const isCsvGap=cursor==='2026-08-20'; const end=isLast?observed:new Date(Date.parse(start)+86400000-1000).toISOString(); days.push(isCsvGap?{date_utc:cursor,status:'MISSING',start_observed_at_utc:null,end_observed_at_utc:null,actual_duration_seconds:null,net_pnl:null,return_pct:null}:{date_utc:cursor,status:isLast?'IN_PROGRESS':'CLOSED',start_observed_at_utc:start,end_observed_at_utc:end,actual_duration_seconds:Math.floor((Date.parse(end)-Date.parse(start))/1000),net_pnl:(n%4===0?-12:18+n),return_pct:(n%4===0?-0.4:0.5+n/100)}); cursor=new Date(Date.parse(start)+86400000).toISOString().slice(0,10); n++; }
    body={...common,schema_version:1,dataset_id:'binance_usdm_public_daily_performance_v1',tracking_started_at_utc:'2026-08-01T00:00:00Z',scope:'BINANCE_USDM_ACCOUNT_WIDE_DAILY_TRADING_V1',reporting_currency:'USD',days,return_method:'MODIFIED_DIETZ_FLOW_ADJUSTED_V2',capital_flow_handling:'EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2',authority_classification:'PERFORMANCE_TELEMETRY_ONLY'};
  }
  if (file === 'rolling-performance.json') body = { ...common, schema_version: 1, dataset_id: 'binance_usdm_public_rolling_performance_v1', scope: 'BINANCE_USDM_ACCOUNT_WIDE_ROLLING_TRADING_V1', reporting_currency: 'USD', return_method: 'MODIFIED_DIETZ_FLOW_ADJUSTED_V2', capital_flow_handling: 'EXCLUDE_NEUTRAL_FLOWS_TIME_WEIGHTED_V2', authority_classification: 'PERFORMANCE_TELEMETRY_ONLY', windows: [7,30].map(days=>({ window: `${days}D`, requested_days: days, start_observed_at_utc: new Date(Date.parse(observed)-days*86400000).toISOString(), end_observed_at_utc: observed, actual_duration_seconds: days*86400, net_pnl: days === 7 ? 38 : 95, return_pct: days === 7 ? 1.9 : 4.75 })) };
  await route.fulfill({ status: body ? 200 : 404, contentType: 'application/json', body: JSON.stringify(body ?? {}) });
});
const url = 'http://localhost:3000/projects/btc-futures-research/live-position';
try {
  await page.goto(url);
  await page.locator('.td-instrument').filter({hasText:'BTCUSDC'}).waitFor();
  await page.locator('#journal-note').waitFor({ state:'visible' });
  const skip = page.locator('.research-skip-link');
  assert.equal(await skip.evaluate(el => getComputedStyle(el).opacity), '0');
  await skip.focus();
  assert.equal(await skip.evaluate(el => getComputedStyle(el).opacity), '1');
  await skip.evaluate(el => el.blur());
  await page.locator('.td-segmented button').filter({hasText:'Short'}).click();
  assert.equal(await page.locator('.td-instrument').filter({hasText:'BTCUSDC'}).count(), 0);
  await page.locator('.td-segmented button').filter({hasText:'All'}).click();
  await page.getByRole('textbox', {name:'Filter symbols'}).fill('ETH');
  assert.equal(await page.locator('.td-instrument').filter({hasText:'BTCUSDC'}).count(), 0);
  await page.getByRole('textbox', {name:'Filter symbols'}).fill('');
  await page.locator('#journal-note').fill('Synthetic QA note. Followed the plan.');
  await page.getByRole('button',{ name:/Save private note/ }).click();
  await page.getByText(/Private note saved in this browser/).waitFor();
  await page.reload();
  await page.waitForFunction(()=>document.querySelector('#journal-note')?.value === 'Synthetic QA note. Followed the plan.');
  const exported = page.waitForEvent('download');
  await page.getByRole('button', {name:/Export private notes/}).click();
  const backup = await fs.readFile(await (await exported).path(),'utf8');
  const data = JSON.parse(backup);
  assert.equal(data.entries.at(-1).note,'Synthetic QA note. Followed the plan.');
  assert.equal(data.timezone,'UTC');
  await page.getByRole('button', {name:'Delete private note', exact:true}).click();
  await page.getByText('Private note deleted.', {exact:true}).waitFor();
  await page.locator('input[type=file]').setInputFiles({ name:'journal-backup.json', mimeType:'application/json', buffer:Buffer.from(backup) });
  await page.getByText(/Imported 1 private records/).waitFor();
  assert.equal(await page.locator('#journal-note').inputValue(), 'Synthetic QA note. Followed the plan.');
  await page.getByRole('button', {name:'Start', exact:true}).click();
  assert.match(await page.locator('.td-calendar-toolbar h3').textContent(), /November 2024/);
  await page.getByRole('button', {name:/2024-11-15/}).click();
  await page.getByText('CSV realized PnL', {exact:true}).first().waitFor();
  assert.match(await page.locator('.td-csv-explain').textContent(), /Stablecoin realized cash PnL/i);
  await page.getByRole('button', {name:/2024-11-21/}).click();
  await page.getByText(/CSV partial realized PnL/).waitFor();
  assert.match(await page.locator('.td-csv-explain').textContent(), /BNB commission/i);
  assert.equal(await page.getByRole('button', {name:'Previous month',exact:true}).isDisabled(), true);
  await page.getByRole('button', {name:'Today', exact:true}).click();
  const currentMonth = await page.locator('.td-calendar-toolbar h3').textContent();
  assert.doesNotMatch(currentMonth, /November 2024/);
  await page.getByRole('button', {name:'Previous month',exact:true}).click();
  assert.match(await page.locator('.td-calendar-toolbar h3').textContent(), /August 2026/);
  await page.getByRole('button', {name:'2026-08-20, +$177.90 public net PnL'}).click();
  await page.getByText('CSV realized PnL', {exact:true}).first().waitFor();
  assert.match(await page.locator('.td-csv-explain').textContent(), /does not include UTC-boundary unrealized mark-to-market/i);
  await fs.mkdir('/tmp/desk-qa', { recursive:true });
  // Seed a few explicitly synthetic daily records solely for visual QA.
  await page.evaluate(() => {
    const now = new Date(); const entries = [];
    for(let i=1;i<=Math.min(now.getUTCDate(),20);i++) { const date = `${now.toISOString().slice(0,7)}-${String(i).padStart(2,'0')}`; entries.push({ date, pnlUsd:i%4===0 ? -37.2 : i%3===0 ? 0 : 15+i*3, returnPct:null, note:i%3===0 ? 'Synthetic QA note' : '', updatedAt:now.toISOString() }); }
    localStorage.setItem('meanydeany.trading-journal.v1',JSON.stringify({version:1,timezone:'UTC',entries}));
  });
  await page.reload(); await page.locator('.td-instrument').filter({hasText:'BTCUSDC'}).waitFor();
  await page.evaluate(()=> { const marker=document.createElement('div'); marker.textContent='SYNTHETIC QA FIXTURE / NOT ACCOUNT DATA'; Object.assign(marker.style,{background:'#e2f5ac',color:'#182113',padding:'8px',fontSize:'12px',textAlign:'center'}); document.body.prepend(marker); });
  await page.screenshot({path:'/tmp/desk-qa/desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile page must not overflow horizontally');
  await page.screenshot({path:'/tmp/desk-qa/mobile.png',fullPage:true});
  stale=true; await page.reload(); await page.getByText('Stale',{exact:true}).first().waitFor();
  assert.equal(await page.getByText('Live',{exact:true}).count(),0);
  stale=false; empty=true; await page.reload(); await page.getByText('No open positions in this observation',{exact:true}).waitFor();
  empty=false; malformed=true; await page.reload(); await page.getByText('Position feed unavailable',{exact:true}).waitFor();
  assert.equal(await page.getByText('No open positions in this observation',{exact:true}).count(),0);
  assert.deepEqual(issues,[]);
  console.log('BROWSER_QA_PASS: public daily calendar from first trade, CSV realized/partial history, private notes, ledger precedence, position filters, month navigation, keyboard access, desktop/mobile, stale/flat/invalid feeds');
} finally { await browser.close(); }
