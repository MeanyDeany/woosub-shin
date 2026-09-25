"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import { parseBtcLifetimePerformanceTelemetry } from "@/lib/btc-lifetime-performance";
import { parseBtcLiveMultiPositionTelemetry } from "@/lib/btc-live-multi-position";
import { parseBtcRollingPerformanceTelemetry } from "@/lib/btc-rolling-performance";
import { parseBtcDailyPerformanceTelemetry, type BinanceDailyPerformanceDay } from "@/lib/btc-daily-performance";
import { JOURNAL_KEY, MAX_IMPORT_BYTES, TRACKING_START, calendarDays, emptyJournal, mergeJournal, parseJournal, shiftMonth, utcDay, type Journal, type JournalEntry } from "@/lib/trading-journal";

type Receipt = { observed_at_utc: string; freshness_ttl_seconds: number };
type Feed<T> = { data: T | null; error: string | null; refreshing: boolean };
type Props = { positionFeedUrl: string; performanceFeedUrl: string; rollingFeedUrl: string; dailyFeedUrl: string; compact?: boolean };
const detailHref = "/projects/btc-futures-research/live-position";

function useFeed<T extends Receipt>(url: string, parse: (value: unknown) => T) {
  const [state, setState] = useState<Feed<T>>({ data: null, error: null, refreshing: false });
  const alive = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const refresh = useCallback(async () => {
    if (!alive.current) return;
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    const timeout = window.setTimeout(() => request.abort(), 10_000);
    setState(previous => ({ ...previous, refreshing: true }));
    try {
      const response = await fetch(url, { cache: "no-store", signal: request.signal, credentials: "omit" });
      if (!response.ok) throw new Error("Public feed unavailable");
      const data = parse(await response.json());
      if (Date.parse(data.observed_at_utc) > Date.now() + 5000) throw new Error("Observation clock is ahead");
      if (!alive.current || controller.current !== request) return;
      setState(previous => previous.data && Date.parse(data.observed_at_utc) < Date.parse(previous.data.observed_at_utc)
        ? { ...previous, refreshing: false, error: "An older update was rejected." }
        : { data, error: null, refreshing: false });
    } catch {
      if (alive.current && controller.current === request) setState(previous => ({ ...previous, refreshing: false, error: "Latest update could not be verified." }));
    } finally {
      window.clearTimeout(timeout);
    }
  }, [url, parse]);
  useEffect(() => {
    alive.current = true;
    const initial = window.setTimeout(() => void refresh(), 0);
    const poll = window.setInterval(() => { if (document.visibilityState === "visible") void refresh(); }, 30_000);
    const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { alive.current = false; controller.current?.abort(); window.clearTimeout(initial); window.clearInterval(poll); document.removeEventListener("visibilitychange", onVisible); };
  }, [refresh]);
  return { ...state, refresh };
}
function money(value: number | null | undefined, compact = false) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", signDisplay: "exceptZero", maximumFractionDigits: 2, minimumFractionDigits: compact ? 0 : 2, notation: compact && Math.abs(value) >= 10_000 ? "compact" : "standard" }).format(value);
}
function percent(value: number | null | undefined) {
  return value === null || value === undefined ? "—" : `${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: "exceptZero" }).format(value)}%`;
}
function tone(value: number | null | undefined) { return value == null || value === 0 ? "" : value > 0 ? "td-positive" : "td-negative"; }
function timestamp(value?: string) {
  return value ? `${new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC" }).format(new Date(value))} UTC` : "No verified observation yet";
}
function feedState<T extends Receipt>(feed: Feed<T>, now: number) {
  if (!feed.data) return feed.error ? "Unavailable" : "Connecting";
  if (now - Date.parse(feed.data.observed_at_utc) > feed.data.freshness_ttl_seconds * 1000) return "Stale";
  if (feed.error) return "Update delayed";
  return "Live";
}
function Status({ label }: { label: string }) {
  return <span className={`td-status ${label === "Live" ? "td-status-live" : "td-status-wait"}`}><span aria-hidden="true" />{label}</span>;
}
function Metric({ label, value, numeric, hint, primary = false }: { label: string; value: string; numeric?: number | null; hint: string; primary?: boolean }) {
  return <div className={`td-metric ${primary ? "td-metric-primary" : ""}`}><dt>{label}</dt><dd className={tone(numeric)}>{value}</dd><p>{hint}</p></div>;
}

export function BtcTradingDesk({ positionFeedUrl, performanceFeedUrl, rollingFeedUrl, dailyFeedUrl, compact = false }: Props) {
  const performance = useFeed(performanceFeedUrl, parseBtcLifetimePerformanceTelemetry);
  const positions = useFeed(positionFeedUrl, parseBtcLiveMultiPositionTelemetry);
  const rolling = useFeed(rollingFeedUrl, parseBtcRollingPerformanceTelemetry);
  const [now, setNow] = useState(0);
  const [filter, setFilter] = useState<"ALL" | "LONG" | "SHORT">("ALL");
  const [query, setQuery] = useState("");
  useEffect(() => { const tick = () => setNow(Date.now()); const first = window.setTimeout(tick, 0); const timer = window.setInterval(tick, 10_000); return () => { window.clearTimeout(first); window.clearInterval(timer); }; }, []);
  const metrics = performance.data;
  const items = positions.data?.positions ?? [];
  const visible = items.filter(p => (filter === "ALL" || p.position_state === filter) && p.symbol.includes(query.trim().toUpperCase()));
  const busy = performance.refreshing || positions.refreshing || rolling.refreshing;
  const refresh = () => { void performance.refresh(); void positions.refresh(); void rolling.refresh(); };
  const Heading = compact ? "h2" : "h1";

  return <div className={`trading-desk ${compact ? "td-compact" : ""}`}>
    <div className="td-topline"><span className="td-eyebrow"><span className="td-venue-mark" aria-hidden="true">◆</span> BINANCE USD-M <span className="td-divider">/</span> ACCOUNT OVERVIEW</span><span className="td-muted td-mono">READ ONLY</span></div>
    <header className="td-heading"><div><Heading>Performance, without the noise<span className="td-accent">.</span></Heading><p>Live account observations. A clearer view of every position.</p></div><div className="td-actions"><button className="td-button" onClick={refresh} disabled={busy} aria-label="Refresh all public account feeds"><span aria-hidden="true">↻</span> {busy ? "Updating" : "Refresh"}</button>{compact && <Link className="td-button td-button-primary" href={`${detailHref}#daily-journal`}>Daily journal <span aria-hidden="true">↗</span></Link>}</div></header>
    <div className="td-section-kicker"><span>01 <strong>ACCOUNT PERFORMANCE</strong></span><Status label={feedState(performance, now)} /></div>
    <dl className="td-metrics" aria-label="Public account performance">
      <Metric primary label="Return since inception" value={percent(metrics?.lifetime_return_pct)} numeric={metrics?.lifetime_return_pct} hint="Flow-adjusted / since 01 Aug 2026" />
      <Metric label="Cumulative net PnL" value={money(metrics?.lifetime_net_pnl)} numeric={metrics?.lifetime_net_pnl} hint="Account-wide / USD" />
      <Metric label="Realized net PnL" value={money(metrics?.realized_net_pnl)} numeric={metrics?.realized_net_pnl} hint="Published realized component" />
      <Metric label="Current unrealized PnL" value={money(metrics?.current_unrealized_pnl)} numeric={metrics?.current_unrealized_pnl} hint="All open positions / not realized" />
    </dl>
    <div className="td-observation-line"><span>{timestamp(metrics?.observed_at_utc)}</span><span>{performance.error ? "Showing the last verified values, where available." : "30-second refresh / deposits and withdrawals excluded from trading PnL"}</span></div>
    <div className="td-market-grid">
      <section className="td-panel td-positions" aria-labelledby="td-positions-heading">
        <div className="td-panel-heading"><div><p className="td-kicker">02 / POSITIONS</p><h3 id="td-positions-heading">Open positions <span className="td-count">{positions.data ? items.length : "—"}</span></h3></div><Status label={feedState(positions, now)} /></div>
        <div className="td-table-tools"><div className="td-segmented" aria-label="Position direction filter">{(["ALL", "LONG", "SHORT"] as const).map(option => <button key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option === "ALL" ? "All" : option === "LONG" ? "Long" : "Short"}{positions.data && <span>{option === "ALL" ? items.length : items.filter(p => p.position_state === option).length}</span>}</button>)}</div><label className="td-search"><span className="td-sr-only">Filter symbols</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter symbol…" maxLength={30} /></label></div>
        <div className="td-table-scroll"><table className="td-table"><caption className="td-sr-only">All non-zero public Binance USD-M positions. Position size and prices are not published.</caption><thead><tr><th scope="col">Instrument</th><th scope="col">Direction</th><th scope="col">Position side</th><th scope="col">Open orders</th></tr></thead><tbody>
          {!positions.data ? <tr><td colSpan={4}><div className="td-empty"><span className="td-empty-icon" aria-hidden="true">◇</span><strong>{positions.error ? "Position feed unavailable" : "Connecting to the public feed"}</strong><p>No position state is assumed while data is unavailable.</p></div></td></tr> : visible.length === 0 ? <tr><td colSpan={4}><div className="td-empty"><span className="td-empty-icon" aria-hidden="true">◎</span><strong>{items.length === 0 ? "No open positions in this observation" : "No matching positions"}</strong><p>{items.length === 0 ? "The verified snapshot contains no non-zero positions." : "Try another symbol or direction."}</p></div></td></tr> : visible.map(p => <tr key={`${p.symbol}:${p.position_side}`}><th scope="row"><span className="td-instrument"><span className="td-coin" aria-hidden="true">{p.symbol.slice(0, 1)}</span><span>{p.symbol}<small>USD-M perpetual</small></span></span></th><td><span className={`td-direction ${p.position_state === "LONG" ? "td-direction-long" : "td-direction-short"}`}>{p.position_state === "LONG" ? "↗" : "↘"} {p.position_state}</span></td><td className="td-mono td-muted">{p.position_side === "BOTH" ? "One-way" : `Hedge / ${p.position_side.toLowerCase()}`}</td><td><span className="td-order-flags"><span>Regular <b>{p.ordinary_open_orders_present ? "Present" : "None"}</b></span><span>Algo <b>{p.algo_open_orders_present ? "Present" : "None"}</b></span></span></td></tr>)}
        </tbody></table></div><div className="td-panel-foot"><span>{timestamp(positions.data?.observed_at_utc)}</span><span>Size and prices remain private</span></div>
      </section>
      <section className="td-panel td-periods" aria-labelledby="td-period-heading"><div className="td-panel-heading"><div><p className="td-kicker">03 / ROLLING WINDOWS</p><h3 id="td-period-heading">Recent performance</h3></div><Status label={feedState(rolling, now)} /></div>
        <table className="td-table td-period-table"><caption className="td-sr-only">Published flow-adjusted rolling performance windows</caption><thead><tr><th scope="col">Period</th><th scope="col">Return</th><th scope="col">Net PnL</th></tr></thead><tbody>{([7, 30] as const).map((days, index) => { const window = rolling.data?.windows[index]; return <tr key={days}><th scope="row">{days} days{window && window.actual_duration_seconds < (days * 86400 - 60) && <small className="td-partial">Partial window</small>}</th><td className={`td-mono ${tone(window?.return_pct)}`}>{percent(window?.return_pct)}</td><td className={`td-mono ${tone(window?.net_pnl)}`}>{money(window?.net_pnl)}</td></tr>; })}</tbody></table>
        <div className="td-period-note"><span className="td-note-icon" aria-hidden="true">↳</span><p>Returns use the published Modified Dietz calculation, not a sum of daily percentages.</p></div><div className="td-panel-foot"><span>{timestamp(rolling.data?.observed_at_utc)}</span></div>
      </section>
    </div>
    {!compact && <PublicDailyCalendar feedUrl={dailyFeedUrl} />}
    <details className="td-methodology"><summary>Data, privacy & methodology <span aria-hidden="true">+</span></summary><div><p>These are sanitized account observations, not ASRA strategy results or an execution interface. All non-zero symbols and hedge sides remain visible in the public feed. Exact sizes, prices, per-position PnL, balances and credentials are not published. Open-order presence is not proof of a protective stop.</p><p>Account tracking begins at 2026-08-01T00:00:00Z. The source supplies flow-adjusted performance; the interface does not recompute it. After 180 seconds, observations are marked stale. A failed update never means that the account is flat.</p><p>Daily PnL and daily return are published read-only account telemetry derived from the authenticated flow-adjusted ledger, so every visitor sees the same calendar. Closed UTC days require validated boundary anchors; missing source coverage remains explicitly missing and the current UTC day is marked in progress. Personal notes stay browser-local and are never included in the public feed.</p>{metrics && <p className="td-mono td-hash">Performance source: {metrics.telemetry_sha256}</p>}</div></details>
  </div>;
}

function readJournal(): Journal { const raw = window.localStorage.getItem(JOURNAL_KEY); return raw ? parseJournal(JSON.parse(raw)) : emptyJournal(); }
function download(name: string, content: string) { const url = URL.createObjectURL(new Blob([content], { type: "application/json" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000); }
function SummaryItem({ label, children }: { label: string; children: ReactNode }) { return <div><span>{label}</span><strong>{children}</strong></div>; }

function PublicDailyCalendar({ feedUrl }: { feedUrl: string }) {
  const daily = useFeed(feedUrl, parseBtcDailyPerformanceTelemetry);
  const [journal, setJournal] = useState<Journal>(emptyJournal);
  const [today, setToday] = useState("");
  const [month, setMonth] = useState("");
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");
  const [baseVersion, setBaseVersion] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [problem, setProblem] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const loadDraft = useCallback((date: string, entry?: JournalEntry) => {
    setSelected(date); setNote(entry?.note ?? ""); setBaseVersion(entry?.updatedAt ?? null); setDirty(false);
  }, []);
  useEffect(() => {
    const initial = window.setTimeout(() => {
      const date = utcDay(); setToday(date); setMonth(date.slice(0,7));
      try { const stored=readJournal(); setJournal(stored); loadDraft(date,stored.entries.find(e=>e.date===date)); setReady(true); }
      catch { setNotice("Private notes could not be read. Public performance remains independent."); setProblem(true); }
    },0);
    const onStorage=(event:StorageEvent)=>{ if(event.key!==JOURNAL_KEY&&event.key!==null)return; try{const stored=readJournal();setJournal(stored);setNotice("Private notes changed in another tab. Unsaved edits are preserved.");}catch{setProblem(true);setReady(false);setNotice("Private note storage could not be read. Public performance remains visible.");}};
    const midnight=window.setInterval(()=>setToday(utcDay()),60_000);
    window.addEventListener("storage",onStorage);
    return()=>{window.clearTimeout(initial);window.clearInterval(midnight);window.removeEventListener("storage",onStorage);};
  },[loadDraft]);
  useEffect(()=>{if(!dirty)return;const warn=(event:BeforeUnloadEvent)=>{event.preventDefault();event.returnValue="";};window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);},[dirty]);

  const notes=new Map(journal.entries.map(entry=>[entry.date,entry]));
  const publicDays=new Map((daily.data?.days??[]).map(day=>[day.date_utc,day]));
  const measured=(daily.data?.days??[]).filter(day=>day.date_utc.startsWith(month+"-")&&day.net_pnl!==null);
  const net=measured.length?measured.reduce((sum,day)=>sum+(day.net_pnl??0),0):null;
  const positive=measured.filter(day=>day.net_pnl!>0).length;
  const negative=measured.filter(day=>day.net_pnl!<0).length;
  const selectedDay=publicDays.get(selected);
  const selectedEntry=notes.get(selected);

  const choose=(date:string)=>{if(date<TRACKING_START||date>today||date===selected)return;if(dirty&&!window.confirm("Discard unsaved private note changes for this date?"))return;loadDraft(date,notes.get(date));setMonth(date.slice(0,7));setNotice("");setProblem(false);};
  const reportError=(error:unknown)=>{setProblem(true);setNotice(error instanceof Error?error.message:"The private note could not be saved.");};
  const checkVersion=(latest:Journal)=>{if((latest.entries.find(e=>e.date===selected)?.updatedAt??null)!==baseVersion)throw new Error("This note changed in another tab. Select another date and return before editing it.");};
  const persist=(next:Journal)=>{window.localStorage.setItem(JOURNAL_KEY,JSON.stringify(next));setJournal(next);};
  const save=(event:FormEvent)=>{event.preventDefault();if(!ready||selected<TRACKING_START||selected>utcDay())return;try{const latest=readJournal();checkVersion(latest);const existing=latest.entries.find(e=>e.date===selected);const trimmed=note.trim();if(!trimmed)throw new Error("Add a private note before saving.");const value:JournalEntry={date:selected,pnlUsd:existing?.pnlUsd??null,returnPct:existing?.returnPct??null,note:trimmed,updatedAt:new Date().toISOString()};const next=parseJournal({version:1,timezone:"UTC",entries:[...latest.entries.filter(e=>e.date!==selected),value]});persist(next);loadDraft(selected,value);setProblem(false);setNotice("Private note saved in this browser. Public PnL is unchanged.");}catch(error){reportError(error);}};
  const remove=()=>{if(!window.confirm("Delete this private note? Public performance will not change."))return;try{const latest=readJournal();checkVersion(latest);const existing=latest.entries.find(e=>e.date===selected);const remainder=latest.entries.filter(e=>e.date!==selected);if(existing&&(existing.pnlUsd!==null||existing.returnPct!==null)){remainder.push({...existing,note:"",updatedAt:new Date().toISOString()});}const next=parseJournal({version:1,timezone:"UTC",entries:remainder});persist(next);loadDraft(selected,next.entries.find(e=>e.date===selected));setProblem(false);setNotice("Private note deleted.");}catch(error){reportError(error);}};
  const exportBackup=()=>{try{const raw=window.localStorage.getItem(JOURNAL_KEY);download(`private-trading-notes-${utcDay()}.json`,raw??JSON.stringify(emptyJournal(),null,2));}catch(error){reportError(error);}};
  const importBackup=async(file?:File)=>{if(!file)return;try{if(file.size>MAX_IMPORT_BYTES)throw new Error("Backup exceeds the 2 MB limit.");const incoming=parseJournal(JSON.parse(await file.text()));const latest=readJournal();const existing=new Set(latest.entries.map(e=>e.date));const conflicts=incoming.entries.filter(e=>existing.has(e.date)).length;if(!window.confirm(`Import ${incoming.entries.length} private records? ${conflicts} existing dates will be replaced. Public performance cannot be changed by imports.`))return;const next=mergeJournal(latest,incoming);persist(next);loadDraft(selected,next.entries.find(e=>e.date===selected));setProblem(false);setNotice(`Imported ${incoming.entries.length} private records.`);}catch(error){reportError(error);}finally{if(fileInput.current)fileInput.current.value="";}};

  const dayLabel=(day?:BinanceDailyPerformanceDay)=>day?.status==="MISSING"?"Missing source":day?.status==="IN_PROGRESS"?"Live / incomplete":day?.status==="CLOSED"?"Closed UTC day":"Not published";
  return <section id="daily-journal" className="td-journal" aria-labelledby="td-journal-heading">
    <div className="td-section-kicker"><span>04 <strong>PUBLIC DAILY PERFORMANCE</strong></span><Status label={feedState(daily, Date.now())} /></div>
    <div className="td-journal-intro"><div><h2 id="td-journal-heading">Every day, publicly accounted for.</h2><p>Visitors see the same flow-adjusted daily account results. Your notes remain private to this browser.</p></div><div className="td-actions"><button className="td-button" onClick={()=>void daily.refresh()} disabled={daily.refreshing}>{daily.refreshing?"Updating":"Refresh daily"}</button><button className="td-button" onClick={exportBackup}>Export private notes <span aria-hidden="true">↓</span></button><button className="td-button" disabled={!ready} onClick={()=>fileInput.current?.click()}>Import notes</button><input className="td-sr-only" type="file" accept="application/json,.json" ref={fileInput} tabIndex={-1} aria-label="Import private note backup" onChange={e=>void importBackup(e.target.files?.[0])}/></div></div>
    <div className="td-journal-layout"><div className="td-panel td-calendar-panel"><div className="td-calendar-toolbar"><div><h3>{month?new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(`${month}-01T00:00:00Z`)):"Daily calendar"}</h3><span className="td-muted td-mono">PUBLIC ACCOUNT PERFORMANCE / UTC</span></div><div className="td-actions"><button className="td-button td-month-arrow" aria-label="Previous month" disabled={!month||month<=TRACKING_START.slice(0,7)} onClick={()=>setMonth(shiftMonth(month,-1))}>‹</button><button className="td-button" onClick={()=>{if(today===selected)setMonth(today.slice(0,7));else choose(today);}} disabled={!ready}>Today</button><button className="td-button td-month-arrow" aria-label="Next month" disabled={!month||month>=today.slice(0,7)} onClick={()=>setMonth(shiftMonth(month,1))}>›</button></div></div>
      <div className="td-month-summary"><SummaryItem label="Published month PnL"><span className={tone(net)}>{money(net)}</span></SummaryItem><SummaryItem label="Positive / negative days"><span className="td-positive">{positive}</span><span className="td-muted"> / </span><span className="td-negative">{negative}</span></SummaryItem><SummaryItem label="Measured days">{measured.length}<span className="td-muted"> public rows</span></SummaryItem></div>
      <div className="td-calendar-weekdays" aria-hidden="true">{["MON","TUE","WED","THU","FRI","SAT","SUN"].map(day=><span key={day}>{day}</span>)}</div>
      <div className="td-calendar-grid" aria-label="Public Binance USD-M daily performance calendar">{month?calendarDays(month).map(date=>{const day=publicDays.get(date);const privateNote=notes.get(date)?.note;const disabled=!ready||date<TRACKING_START||date>today;return <button type="button" key={date} data-journal-date={date} className={`td-day ${date.slice(0,7)!==month?"td-day-outside":""} ${date===selected?"td-day-selected":""} ${day?.net_pnl!=null?day.net_pnl>0?"td-day-gain":day.net_pnl<0?"td-day-loss":"td-day-flat":""}`} disabled={disabled} aria-pressed={date===selected} aria-label={`${date}${date===today?", today":""}, ${day?.net_pnl!=null?`${money(day.net_pnl)} public net PnL`:dayLabel(day)}`} onClick={()=>choose(date)} onKeyDown={e=>{const steps:Record<string,number>={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};if(!(e.key in steps))return;e.preventDefault();const next=new Date(Date.parse(`${date}T00:00:00Z`)+steps[e.key]*86_400_000).toISOString().slice(0,10);if(next<TRACKING_START||next>today)return;choose(next);window.requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>(`[data-journal-date="${next}"]`)?.focus());}}><span className="td-day-number">{Number(date.slice(-2))}{date===today&&<i aria-label="Today"/>}</span>{day?.net_pnl!=null?<><strong className={tone(day.net_pnl)}>{money(day.net_pnl,true)}</strong><span className="td-no-result">{percent(day.return_pct)}{day.status==="IN_PROGRESS"?" · LIVE":""}</span></>:<span className="td-no-result">{day?.status==="MISSING"?"?":"—"}</span>}{privateNote&&<span className="td-day-note" aria-label="Private note on this browser"><span aria-hidden="true">≡</span><span>Private note</span></span>}</button>; }):<p className="td-calendar-loading">Loading public daily performance…</p>}</div>
      <div className="td-calendar-legend"><span><i className="td-legend-gain"/>Positive</span><span><i className="td-legend-loss"/>Negative</span><span><i/>Missing / unpublished</span><span className="td-muted">{daily.error?"Latest daily feed unavailable; no values fabricated.":"Public read-only telemetry"}</span></div>
    </div>
    <aside className="td-panel td-day-editor"><div className="td-editor-heading"><p className="td-kicker">DAY DETAIL / PUBLIC RESULT</p><h3>{selected?new Intl.DateTimeFormat("en-US",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}).format(new Date(`${selected}T00:00:00Z`)):"Select a date"}</h3><p className="td-muted td-mono">{selected||"UTC"} / {dayLabel(selectedDay)}</p></div>
      <div className="td-public-day-values"><div><span>Daily net PnL</span><strong className={tone(selectedDay?.net_pnl)}>{money(selectedDay?.net_pnl)}</strong></div><div><span>Daily return</span><strong className={tone(selectedDay?.return_pct)}>{percent(selectedDay?.return_pct)}</strong></div></div>
      {selectedDay?.start_observed_at_utc&&<p className="td-day-source td-mono">{timestamp(selectedDay.start_observed_at_utc)} → {timestamp(selectedDay.end_observed_at_utc??undefined)}</p>}
      <form onSubmit={save}><label htmlFor="journal-note">Private trading note <span>{note.length}/3000</span></label><textarea id="journal-note" rows={6} maxLength={3000} placeholder="Private note on this device. Interviewers cannot see this text." value={note} disabled={!ready} onChange={e=>{setNote(e.target.value);setDirty(true);}}/><button className="td-button td-button-primary td-save" type="submit" disabled={!ready||!dirty}>Save private note <span aria-hidden="true">↗</span></button>{selectedEntry?.note&&<button className="td-delete" type="button" onClick={remove} disabled={!ready}>Delete private note</button>}</form>
      <p className={`td-save-notice ${problem?"td-negative":""}`} role="status" aria-live="polite">{notice}</p><div className="td-private-note"><span aria-hidden="true">⌑</span><p>Daily PnL and return above are public and identical for every visitor. This note is browser-local and never uploaded by the portfolio site.</p></div>
    </aside></div>
  </section>;
}
