const API_ROOT = "https://api.vercel.com/v1/query/web-analytics/visits";

type AnalyticsCountPayload = {
  data?: {
    pageviews?: unknown;
    visitors?: unknown;
  };
};

export type AnalyticsTotals = {
  pageviews: number;
  visitors: number;
};

export type AnalyticsAggregateRow = {
  [key: string]: string | number | null | undefined;
  pageviews: number;
  visitors: number;
};

type AnalyticsAggregatePayload = {
  data?: unknown;
};

function nonnegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function context() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId =
    process.env.VERCEL_ANALYTICS_PROJECT_ID ?? process.env.VERCEL_PROJECT_ID;
  const teamId =
    process.env.VERCEL_ANALYTICS_TEAM_ID ?? process.env.VERCEL_ORG_ID;

  if (!token || !projectId) {
    throw new Error("Vercel Web Analytics is not configured.");
  }
  return { token, projectId, teamId };
}

async function request(path: "count" | "aggregate", params: URLSearchParams) {
  const { token, projectId, teamId } = context();
  params.set("projectId", projectId);
  if (teamId?.startsWith("team_")) params.set("teamId", teamId);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(`${API_ROOT}/${path}?${params.toString()}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Vercel Analytics request failed with ${response.status}.`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function countVisits({
  since,
  until,
}: {
  since?: string;
  until?: string;
} = {}): Promise<AnalyticsTotals> {
  const params = new URLSearchParams();
  if (since) params.set("since", since);
  if (until) params.set("until", until);

  const payload = (await request("count", params)) as AnalyticsCountPayload;
  const pageviews = payload.data?.pageviews;
  const visitors = payload.data?.visitors;
  if (!nonnegativeInteger(pageviews) || !nonnegativeInteger(visitors)) {
    throw new Error("Vercel Analytics count response is invalid.");
  }
  return { pageviews, visitors };
}

export async function aggregateVisits({
  by,
  since,
  until,
  limit = 20,
}: {
  by: string;
  since: string;
  until: string;
  limit?: number;
}): Promise<AnalyticsAggregateRow[]> {
  const params = new URLSearchParams({
    since,
    until,
    by,
    limit: String(Math.min(100, Math.max(1, Math.trunc(limit)))),
  });

  const payload = (await request("aggregate", params)) as AnalyticsAggregatePayload;
  if (!Array.isArray(payload.data)) {
    throw new Error("Vercel Analytics aggregate response is invalid.");
  }

  return payload.data.map((row, index) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      throw new Error(`Vercel Analytics row ${index} is invalid.`);
    }
    const record = row as Record<string, unknown>;
    const pageviews = record.pageviews;
    const visitors = record.visitors;
    if (!nonnegativeInteger(pageviews) || !nonnegativeInteger(visitors)) {
      throw new Error(`Vercel Analytics row ${index} has invalid counts.`);
    }
    return { ...record, pageviews, visitors } as AnalyticsAggregateRow;
  });
}
