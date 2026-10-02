import { NextRequest, NextResponse } from "next/server";
import { verifyTrafficAdminAuthorization } from "@/lib/admin-traffic-auth";
import {
  aggregateVisits,
  countVisits,
  type AnalyticsAggregateRow,
} from "@/lib/vercel-web-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const responseHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

type Period = "today" | "7d" | "30d" | "90d";
type Breakdown = { key: string; pageviews: number; visitors: number };

const periodDays: Record<Period, number> = {
  today: 1,
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

function utcDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addUtcDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 86_400_000);
}

function periodWindow(period: Period) {
  const days = periodDays[period];
  const today = new Date();
  const end = new Date(`${utcDateKey(today)}T00:00:00Z`);
  const start = addUtcDays(end, -(days - 1));
  const previousEnd = addUtcDays(start, -1);
  const previousStart = addUtcDays(previousEnd, -(days - 1));
  return {
    days,
    since: utcDateKey(start),
    until: utcDateKey(end),
    previousSince: utcDateKey(previousStart),
    previousUntil: utcDateKey(previousEnd),
  };
}

function normalizeRows(
  rows: AnalyticsAggregateRow[],
  dimension: string,
): Breakdown[] {
  return rows.map(row => {
    const raw =
      row[dimension] ??
      row.timestamp ??
      row.value ??
      row.key ??
      "(unknown)";
    return {
      key: typeof raw === "string" || typeof raw === "number" ? String(raw) : "(unknown)",
      pageviews: row.pageviews,
      visitors: row.visitors,
    };
  });
}

async function safeAggregate(
  label: string,
  options: Parameters<typeof aggregateVisits>[0],
  warnings: string[],
) {
  try {
    return await aggregateVisits(options);
  } catch {
    warnings.push(`${label} unavailable`);
    return [];
  }
}

export async function GET(request: NextRequest) {
  if (!(await verifyTrafficAdminAuthorization(request.headers.get("authorization")))) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401, headers: responseHeaders },
    );
  }

  const rawPeriod = request.nextUrl.searchParams.get("period") ?? "30d";
  const period: Period =
    rawPeriod === "today" ||
    rawPeriod === "7d" ||
    rawPeriod === "30d" ||
    rawPeriod === "90d"
      ? rawPeriod
      : "30d";
  const range = periodWindow(period);
  const warnings: string[] = [];

  try {
    const [currentResult, previousResult, allTimeResult] = await Promise.allSettled([
      countVisits({ since: range.since, until: range.until }),
      countVisits({ since: range.previousSince, until: range.previousUntil }),
      countVisits(),
    ]);

    if (currentResult.status === "rejected") {
      return NextResponse.json(
        { ok: false, error: "Current-period analytics are unavailable." },
        { status: 502, headers: responseHeaders },
      );
    }

    const current = currentResult.value;
    const previous =
      previousResult.status === "fulfilled" ? previousResult.value : null;
    const allTime =
      allTimeResult.status === "fulfilled" ? allTimeResult.value : null;

    if (previousResult.status === "rejected") warnings.push("comparison totals unavailable");
    if (allTimeResult.status === "rejected") warnings.push("all-time totals unavailable");

    const [seriesRows, pageRows, referrerRows, countryRows, deviceRows, browserRows] =
      await Promise.all([
        safeAggregate("time series", { by: period === "today" ? "hour" : "day", since: range.since, until: range.until, limit: 100 }, warnings),
        safeAggregate("top pages", { by: "requestPath", since: range.since, until: range.until, limit: 20 }, warnings),
        safeAggregate("referrers", { by: "referrerHostname", since: range.since, until: range.until, limit: 15 }, warnings),
        safeAggregate("countries", { by: "country", since: range.since, until: range.until, limit: 15 }, warnings),
        safeAggregate("devices", { by: "deviceType", since: range.since, until: range.until, limit: 10 }, warnings),
        safeAggregate("browsers", { by: "browserName", since: range.since, until: range.until, limit: 10 }, warnings),
      ]);

    return NextResponse.json(
      {
        ok: true,
        generatedAt: new Date().toISOString(),
        period,
        range,
        current,
        previous,
        allTime,
        series: normalizeRows(seriesRows, period === "today" ? "hour" : "day"),
        pages: normalizeRows(pageRows, "requestPath"),
        referrers: normalizeRows(referrerRows, "referrerHostname"),
        countries: normalizeRows(countryRows, "country"),
        devices: normalizeRows(deviceRows, "deviceType"),
        browsers: normalizeRows(browserRows, "browserName"),
        warnings,
      },
      { status: 200, headers: responseHeaders },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Analytics data could not be loaded." },
      { status: 502, headers: responseHeaders },
    );
  }
}
