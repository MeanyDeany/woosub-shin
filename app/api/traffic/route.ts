import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ANALYTICS_COUNT_URL =
  "https://api.vercel.com/v1/query/web-analytics/visits/count";

const publicCacheHeaders = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "X-Robots-Tag": "noindex, nofollow",
};

const fallbackCacheHeaders = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
  "X-Robots-Tag": "noindex, nofollow",
};

type VercelAnalyticsCountResponse = {
  data?: {
    pageviews?: unknown;
    visitors?: unknown;
  };
};

function isNonnegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && typeof value === "number" && value >= 0;
}

function unavailableResponse() {
  return NextResponse.json(
    {
      available: false,
      pageviews: null,
      visitors: null,
    },
    {
      status: 200,
      headers: fallbackCacheHeaders,
    },
  );
}

export async function GET() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId =
    process.env.VERCEL_ANALYTICS_PROJECT_ID ?? process.env.VERCEL_PROJECT_ID;
  const scopeId =
    process.env.VERCEL_ANALYTICS_TEAM_ID ?? process.env.VERCEL_ORG_ID;

  if (!token || !projectId) {
    return unavailableResponse();
  }

  const query = new URLSearchParams({ projectId });
  if (scopeId?.startsWith("team_")) {
    query.set("teamId", scopeId);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);

  try {
    const response = await fetch(`${ANALYTICS_COUNT_URL}?${query.toString()}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return unavailableResponse();
    }

    const payload = (await response.json()) as VercelAnalyticsCountResponse;
    const pageviews = payload.data?.pageviews;
    const visitors = payload.data?.visitors;

    if (!isNonnegativeInteger(pageviews) || !isNonnegativeInteger(visitors)) {
      return unavailableResponse();
    }

    return NextResponse.json(
      {
        available: true,
        pageviews,
        visitors,
      },
      {
        status: 200,
        headers: publicCacheHeaders,
      },
    );
  } catch {
    return unavailableResponse();
  } finally {
    clearTimeout(timeout);
  }
}
