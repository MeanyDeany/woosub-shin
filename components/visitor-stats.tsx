"use client";

import { useEffect, useState } from "react";
import type { SiteLocale } from "@/components/language-switcher";

type TrafficState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "ready"; pageviews: number; visitors: number };

type TrafficResponse = {
  available?: unknown;
  pageviews?: unknown;
  visitors?: unknown;
};

function isNonnegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && typeof value === "number" && value >= 0;
}

export function VisitorStats({ locale = "en" }: { locale?: SiteLocale }) {
  const [state, setState] = useState<TrafficState>({ status: "loading" });
  const numberFormatter = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTraffic() {
      try {
        const response = await fetch("/api/traffic", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          setState({ status: "unavailable" });
          return;
        }

        const payload = (await response.json()) as TrafficResponse;
        if (
          payload.available !== true ||
          !isNonnegativeInteger(payload.pageviews) ||
          !isNonnegativeInteger(payload.visitors)
        ) {
          setState({ status: "unavailable" });
          return;
        }

        setState({
          status: "ready",
          pageviews: payload.pageviews,
          visitors: payload.visitors,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setState({ status: "unavailable" });
      }
    }

    void loadTraffic();
    return () => controller.abort();
  }, []);

  if (state.status !== "ready") {
    return (
      <span className="inline-flex items-center gap-2" aria-live="polite">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#1C9A77] shadow-[0_0_10px_rgba(28,154,119,0.55)]"
        />
        {locale === "ko" ? "방문 통계 수집 중" : "Visitor analytics active"}
      </span>
    );
  }

  const visitors = numberFormatter.format(state.visitors);
  const pageviews = numberFormatter.format(state.pageviews);

  return (
    <span
      className="inline-flex flex-wrap items-center gap-x-3 gap-y-1"
      aria-live="polite"
      aria-label={
        locale === "ko"
          ? `기록된 방문자 ${visitors}명, 페이지 조회 ${pageviews}회`
          : `${visitors} recorded visitors and ${pageviews} page views`
      }
    >
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#1C9A77] shadow-[0_0_10px_rgba(28,154,119,0.55)]"
        />
        {locale === "ko" ? `${visitors}명 방문` : `${visitors} visitors`}
      </span>
      <span aria-hidden="true">·</span>
      <span>{locale === "ko" ? `${pageviews}회 조회` : `${pageviews} page views`}</span>
    </span>
  );
}
