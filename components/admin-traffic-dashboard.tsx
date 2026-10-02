"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "@/app/admin/traffic/admin-traffic.module.css";
import { markOwnerBrowserExcluded } from "@/lib/owner-analytics";

type Period = "today" | "7d" | "30d" | "90d";
type Totals = { pageviews: number; visitors: number };
type Breakdown = { key: string; pageviews: number; visitors: number };
type TrafficPayload = {
  ok: true;
  generatedAt: string;
  period: Period;
  range: {
    days: number;
    since: string;
    until: string;
    previousSince: string;
    previousUntil: string;
  };
  current: Totals;
  previous: Totals | null;
  allTime: Totals | null;
  series: Breakdown[];
  pages: Breakdown[];
  referrers: Breakdown[];
  countries: Breakdown[];
  devices: Breakdown[];
  browsers: Breakdown[];
  warnings: string[];
};

const periods: Array<{ value: Period; label: string }> = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
];

const integer = new Intl.NumberFormat("en-US");
const decimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const countryNames =
  typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

function ratio(totals: Totals) {
  return totals.visitors > 0 ? totals.pageviews / totals.visitors : 0;
}

function change(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

function changeText(current: number, previous: number | null) {
  if (previous === null) return "comparison unavailable";
  const value = change(current, previous);
  if (value === null) return "new vs prior period";
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${decimal.format(value)}% vs prior period`;
}

function changeClass(current: number, previous: number | null) {
  if (previous === null) return "";
  const value = change(current, previous);
  if (value === null || value === 0) return "";
  return value > 0 ? styles.positive : styles.negative;
}

function displayKey(kind: "page" | "referrer" | "country" | "device" | "browser", key: string) {
  if (kind === "referrer" && (key === "(unknown)" || key === "" || key === "null")) return "Direct / none";
  if (kind === "country" && countryNames && /^[A-Z]{2}$/.test(key)) {
    try {
      return countryNames.of(key) ?? key;
    } catch {
      return key;
    }
  }
  return key;
}

function TrafficChart({ rows }: { rows: Breakdown[] }) {
  const points = useMemo(() => {
    if (rows.length === 0) return [];
    const max = Math.max(1, ...rows.map(row => row.pageviews));
    return rows.map((row, index) => ({
      x: rows.length === 1 ? 500 : (index / (rows.length - 1)) * 1000,
      y: 210 - (row.pageviews / max) * 180,
      row,
    }));
  }, [rows]);

  if (points.length === 0) return <div className={styles.empty}>No time-series data in this period.</div>;

  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const area = `${line} L 1000 220 L 0 220 Z`;

  return (
    <>
      <svg className={styles.chart} viewBox="0 0 1000 230" role="img" aria-label="Page views over time">
        {[30, 90, 150, 210].map(y => <line key={y} className={styles.chartGrid} x1="0" y1={y} x2="1000" y2={y} />)}
        <path className={styles.chartArea} d={area} />
        <path className={styles.chartLine} d={line} />
        {points.map(point => (
          <circle key={`${point.x}:${point.row.key}`} className={styles.chartDot} cx={point.x} cy={point.y} r="3.5">
            <title>{point.row.key}: {integer.format(point.row.pageviews)} views, {integer.format(point.row.visitors)} visitors</title>
          </circle>
        ))}
      </svg>
      <div className={styles.chartFooter}>
        <span>{rows.at(0)?.key}</span>
        <span>{rows.at(-1)?.key}</span>
      </div>
    </>
  );
}

function BreakdownTable({
  title,
  rows,
  kind,
}: {
  title: string;
  rows: Breakdown[];
  kind: "page" | "referrer" | "country" | "device" | "browser";
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.sectionHeading}>
        <h2>{title}</h2>
        <span>top {rows.length}</span>
      </div>
      {rows.length === 0 ? (
        <div className={styles.empty}>No data available.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Value</th>
              <th>Visitors</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.key}:${index}`}>
                <td title={row.key}>{displayKey(kind, row.key)}</td>
                <td>{integer.format(row.visitors)}</td>
                <td>{integer.format(row.pageviews)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export function AdminTrafficDashboard() {
  const [period, setPeriod] = useState<Period>("30d");
  const [data, setData] = useState<TrafficPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      markOwnerBrowserExcluded(window.localStorage);
    } catch {
      // Storage can be unavailable in hardened/private browser modes.
    }

    const controller = new AbortController();
    fetch(`/admin/api/traffic?period=${period}`, {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then(async response => {
        if (response.status === 401) {
          window.location.reload();
          throw new Error("Unauthorized.");
        }
        const payload = (await response.json()) as TrafficPayload | { ok?: false; error?: string };
        if (!response.ok || payload.ok !== true) {
          throw new Error("error" in payload && payload.error ? payload.error : "Analytics request failed.");
        }
        setData(payload);
      })
      .catch(fetchError => {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") return;
        setError(fetchError instanceof Error ? fetchError.message : "Analytics request failed.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [period]);

  function selectPeriod(next: Period) {
    if (next === period) return;
    setLoading(true);
    setError("");
    setPeriod(next);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brand}><strong>meanydeany</strong><span>private analytics</span></div>
          <Link className={styles.logout} href="/">Back to site</Link>
        </header>

        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Vercel Web Analytics</p>
            <h1>Traffic</h1>
            <p>Aggregate site traffic only. Admin routes are excluded from collection, and this dashboard does not expose raw IPs or individual visitor histories.</p>
          </div>
          <div className={styles.rangePicker} aria-label="Analytics period">
            {periods.map(item => (
              <button
                type="button"
                key={item.value}
                className={`${styles.rangeButton} ${period === item.value ? styles.rangeButtonActive : ""}`}
                aria-pressed={period === item.value}
                onClick={() => selectPeriod(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {loading && !data ? <div className={styles.loading}>Loading analytics…</div> : null}
        {error ? <div className={styles.loading}>{error}</div> : null}

        {data ? (
          <>
            <section className={styles.metricGrid} aria-label="Traffic summary">
              <article className={styles.metric}>
                <p className={styles.metricLabel}>Visitors</p>
                <p className={styles.metricValue}>{integer.format(data.current.visitors)}</p>
                <p className={`${styles.metricHint} ${changeClass(data.current.visitors, data.previous?.visitors ?? null)}`}>
                  {changeText(data.current.visitors, data.previous?.visitors ?? null)}
                </p>
              </article>
              <article className={styles.metric}>
                <p className={styles.metricLabel}>Page views</p>
                <p className={styles.metricValue}>{integer.format(data.current.pageviews)}</p>
                <p className={`${styles.metricHint} ${changeClass(data.current.pageviews, data.previous?.pageviews ?? null)}`}>
                  {changeText(data.current.pageviews, data.previous?.pageviews ?? null)}
                </p>
              </article>
              <article className={styles.metric}>
                <p className={styles.metricLabel}>Views / visitor</p>
                <p className={styles.metricValue}>{decimal.format(ratio(data.current))}</p>
                <p className={styles.metricHint}>selected period</p>
              </article>
              <article className={styles.metric}>
                <p className={styles.metricLabel}>All-time visitors</p>
                <p className={styles.metricValue}>{data.allTime ? integer.format(data.allTime.visitors) : "—"}</p>
                <p className={styles.metricHint}>available Vercel history</p>
              </article>
              <article className={styles.metric}>
                <p className={styles.metricLabel}>All-time views</p>
                <p className={styles.metricValue}>{data.allTime ? integer.format(data.allTime.pageviews) : "—"}</p>
                <p className={styles.metricHint}>available Vercel history</p>
              </article>
            </section>

            <section className={styles.chartPanel}>
              <div className={styles.sectionHeading}>
                <h2>Page views over time</h2>
                <span>{data.range.since} → {data.range.until} UTC</span>
              </div>
              <TrafficChart rows={data.series} />
            </section>

            <div className={styles.grid}>
              <BreakdownTable title="Top pages" rows={data.pages} kind="page" />
              <BreakdownTable title="Referrers" rows={data.referrers} kind="referrer" />
              <BreakdownTable title="Countries" rows={data.countries} kind="country" />
              <BreakdownTable title="Devices" rows={data.devices} kind="device" />
              <BreakdownTable title="Browsers" rows={data.browsers} kind="browser" />
            </div>

            <div className={styles.statusRow}>
              <span>Updated {new Date(data.generatedAt).toLocaleString("en-GB", { timeZone: "UTC" })} UTC</span>
              <span>Source: Vercel Web Analytics aggregate API</span>
              <span>Owner browser: excluded from future analytics</span>
              {data.warnings.map(warning => <span className={styles.warning} key={warning}>{warning}</span>)}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
