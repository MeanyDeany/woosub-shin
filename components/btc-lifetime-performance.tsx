"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  lifetimePerformanceAgeSeconds,
  parseBtcLifetimePerformanceTelemetry,
  type BtcLifetimePerformanceTelemetry,
} from "@/lib/btc-lifetime-performance";
import type { ObservatoryLocale } from "@/lib/btc-live-position";


type LoadStatus = "loading" | "ready" | "error";

type Props = {
  feedUrl: string;
  locale?: ObservatoryLocale;
};

const POLL_INTERVAL_MS = 30_000;
const CLOCK_INTERVAL_MS = 10_000;

const copy = {
  en: {
    eyebrow: "Tracked performance",
    title: "Lifetime Performance",
    live: "LIVE",
    stale: "STALE",
    unavailable: "PENDING FEED",
    loading: "Loading tracked lifetime performance…",
    failed:
      "The public lifetime-performance feed is not available yet. Position telemetry remains unaffected.",
    pnl: "Lifetime PnL",
    return: "Lifetime Return",
    since: "Public tracking since",
    observed: "Last observed",
    definition:
      "Cumulative system performance since the frozen public-tracking start. Current position size, entry price, and unrealized PnL are not published here.",
    boundary: "Performance telemetry only · no execution authority",
  },
  ko: {
    eyebrow: "누적 성과 추적",
    title: "Lifetime Performance",
    live: "LIVE",
    stale: "STALE",
    unavailable: "PENDING FEED",
    loading: "누적 성과 정보를 불러오는 중…",
    failed:
      "공개 누적 성과 피드가 아직 준비되지 않았습니다. 기존 포지션 텔레메트리에는 영향이 없습니다.",
    pnl: "Lifetime PnL",
    return: "Lifetime Return",
    since: "공개 추적 시작",
    observed: "마지막 관측",
    definition:
      "고정된 public-tracking 시작 시점 이후의 시스템 누적 성과입니다. 현재 포지션 크기, 진입가, 미실현 PnL은 공개하지 않습니다.",
    boundary: "Performance telemetry only · execution authority 없음",
  },
} as const;

function formatTimestamp(value: string, locale: ObservatoryLocale): string {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(value));
}

function formatMoney(value: number, locale: ObservatoryLocale): string {
  const formatted = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "always",
  }).format(value);
  return value === 0 ? formatted.replace(/^\+/, "") : formatted;
}

function formatReturn(value: number, locale: ObservatoryLocale): string {
  const formatted = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "always",
  }).format(value);
  return `${value === 0 ? formatted.replace(/^\+/, "") : formatted}%`;
}

function valueTone(value: number): string {
  if (value > 0) return "text-[#7CF0B9]";
  if (value < 0) return "text-[#FF9AA5]";
  return "text-[#F4F7FB]";
}

export function BtcLifetimePerformance({ feedUrl, locale = "en" }: Props) {
  const text = copy[locale];
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [telemetry, setTelemetry] = useState<BtcLifetimePerformanceTelemetry | null>(null);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(feedUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const parsed = parseBtcLifetimePerformanceTelemetry(await response.json());
      setTelemetry(parsed);
      setStatus("ready");
      setRefreshFailed(false);
      setNowMs(Date.now());
    } catch {
      if (telemetry) {
        setRefreshFailed(true);
      } else {
        setStatus("error");
      }
    }
  }, [feedUrl, telemetry]);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), POLL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [refresh]);

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), CLOCK_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const ageSeconds = useMemo(
    () => (telemetry ? lifetimePerformanceAgeSeconds(telemetry, nowMs) : null),
    [telemetry, nowMs],
  );
  const stale = telemetry !== null && ageSeconds !== null && ageSeconds > telemetry.freshness_ttl_seconds;

  if (status === "loading" && !telemetry) {
    return <StatePanel title={text.title} body={text.loading} badge="…" />;
  }
  if (status === "error" && !telemetry) {
    return <StatePanel title={text.title} body={text.failed} badge={text.unavailable} />;
  }
  if (!telemetry || ageSeconds === null) {
    return null;
  }

  const badge = stale ? text.stale : text.live;
  const badgeTone = stale
    ? "border-[#FFB547]/35 bg-[#FFB547]/10 text-[#FFD08A]"
    : "border-[#3DDC97]/35 bg-[#3DDC97]/10 text-[#7CF0B9]";

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#7E8B9D]/16 bg-[#080B11] shadow-2xl shadow-black/20">
      <div className="border-b border-[#7E8B9D]/12 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42D7F5]">
              {text.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#F4F7FB] sm:text-3xl">
              {text.title}
            </h2>
          </div>
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold ${badgeTone}`}>
            <span className={`h-2 w-2 rounded-full ${stale ? "bg-[#FFB547]" : "bg-[#3DDC97]"}`} />
            {badge}
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-[#7E8B9D]/12 md:grid-cols-2">
        <div className="bg-[#07090D] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.1em] text-[#7E8B9D]">{text.pnl}</p>
          <p className={`mt-4 font-mono text-4xl font-semibold tracking-[-0.05em] sm:text-5xl ${valueTone(telemetry.lifetime_net_pnl)}`}>
            {formatMoney(telemetry.lifetime_net_pnl, locale)}
          </p>
        </div>
        <div className="bg-[#07090D] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.1em] text-[#7E8B9D]">{text.return}</p>
          <p className={`mt-4 font-mono text-4xl font-semibold tracking-[-0.05em] sm:text-5xl ${valueTone(telemetry.lifetime_return_pct)}`}>
            {formatReturn(telemetry.lifetime_return_pct, locale)}
          </p>
        </div>
      </div>

      <div className="grid gap-5 border-t border-[#7E8B9D]/12 bg-[#0B0F16] px-6 py-6 text-sm sm:grid-cols-2 sm:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#7E8B9D]">{text.since}</p>
          <p className="mt-2 font-mono text-xs text-[#F4F7FB]">
            {formatTimestamp(telemetry.tracking_started_at_utc, locale)} UTC
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#7E8B9D]">{text.observed}</p>
          <p className="mt-2 font-mono text-xs text-[#F4F7FB]">
            {formatTimestamp(telemetry.observed_at_utc, locale)} UTC
          </p>
        </div>
        <p className="sm:col-span-2 text-xs leading-5 text-[#7E8B9D]">{text.definition}</p>
        {refreshFailed ? (
          <p className="sm:col-span-2 text-xs text-[#FFD08A]">Refresh failed. Last validated values remain visible.</p>
        ) : null}
        <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#7E8B9D]/12 pt-5">
          <p className="font-mono text-[10px] font-semibold text-[#7CF0B9]">{text.boundary}</p>
          <code className="font-mono text-[10px] text-[#8CEBFF]">
            {telemetry.telemetry_sha256.slice(0, 12)}…{telemetry.telemetry_sha256.slice(-8)}
          </code>
        </div>
      </div>
    </section>
  );
}

function StatePanel({ title, body, badge }: { title: string; body: string; badge: string }) {
  return (
    <section className="rounded-[2rem] border border-[#7E8B9D]/16 bg-[#080B11] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42D7F5]">Tracked performance</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#F4F7FB]">{title}</h2>
        </div>
        <span className="rounded-full border border-[#7E8B9D]/20 px-3 py-1 font-mono text-[10px] text-[#B6C0CF]">
          {badge}
        </span>
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-6 text-[#7E8B9D]">{body}</p>
    </section>
  );
}
