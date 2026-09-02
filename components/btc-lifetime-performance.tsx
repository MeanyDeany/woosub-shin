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
    eyebrow: "Flow-adjusted trading performance",
    title: "Performance Since August 1",
    live: "LIVE",
    stale: "STALE",
    unavailable: "PENDING FEED",
    loading: "Loading flow-adjusted performance…",
    failed:
      "The public flow-adjusted performance feed is not available yet. Position telemetry remains unaffected.",
    pnl: "Lifetime trading PnL",
    return: "Flow-adjusted return",
    realized: "Realized net PnL",
    unrealized: "Current unrealized PnL",
    since: "Tracking started",
    observed: "Last observed",
    definition:
      "Trading PnL equals realized net PnL plus the change in account-wide unrealized PnL since August 1, 2026. Deposits, withdrawals, transfers, and non-trading rewards are excluded from PnL; neutral capital flows are time-weighted only in the return denominator.",
    privacy:
      "Only aggregate performance is public. Position size, entry and mark prices, balances, and per-position PnL remain private.",
    refreshFailed: "Refresh failed. Last validated values remain visible.",
    boundary: "Performance telemetry only · no execution authority",
  },
  ko: {
    eyebrow: "입출금 조정 트레이딩 성과",
    title: "8월 1일 이후 성과",
    live: "LIVE",
    stale: "STALE",
    unavailable: "PENDING FEED",
    loading: "입출금 조정 성과를 불러오는 중…",
    failed:
      "공개 입출금 조정 성과 피드가 아직 준비되지 않았습니다. 포지션 텔레메트리에는 영향이 없습니다.",
    pnl: "누적 트레이딩 PnL",
    return: "입출금 조정 수익률",
    realized: "실현 순손익",
    unrealized: "현재 미실현손익",
    since: "추적 시작",
    observed: "마지막 관측",
    definition:
      "트레이딩 PnL은 2026년 8월 1일 이후의 실현 순손익과 계정 전체 미실현손익 변화를 합산합니다. 입금·출금·내부이체·비거래 보상은 손익에서 제외하고, 중립 자금 흐름은 수익률 분모에만 시간가중 반영합니다.",
    privacy:
      "공개 범위는 계정 전체 합산 성과뿐입니다. 포지션 수량, 진입가·mark price, 잔고, 종목별 PnL은 공개하지 않습니다.",
    refreshFailed: "새로고침에 실패했습니다. 마지막 검증값을 계속 표시합니다.",
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
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsed = parseBtcLifetimePerformanceTelemetry(await response.json());
      setTelemetry(parsed);
      setStatus("ready");
      setRefreshFailed(false);
      setNowMs(Date.now());
    } catch {
      setStatus("error");
      setRefreshFailed(true);
    }
  }, [feedUrl]);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => void refresh(), 0);
    const timer = window.setInterval(() => void refresh(), POLL_INTERVAL_MS);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, [refresh]);

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), CLOCK_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const ageSeconds = useMemo(
    () => (telemetry ? lifetimePerformanceAgeSeconds(telemetry, nowMs) : null),
    [telemetry, nowMs],
  );
  const stale =
    telemetry !== null && ageSeconds !== null && ageSeconds > telemetry.freshness_ttl_seconds;

  if (status === "loading" && !telemetry) {
    return <StatePanel eyebrow={text.eyebrow} title={text.title} body={text.loading} badge="…" />;
  }
  if (status === "error" && !telemetry) {
    return (
      <StatePanel
        eyebrow={text.eyebrow}
        title={text.title}
        body={text.failed}
        badge={text.unavailable}
      />
    );
  }
  if (!telemetry || ageSeconds === null) return null;

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
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold ${badgeTone}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${stale ? "bg-[#FFB547]" : "bg-[#3DDC97]"}`}
            />
            {badge}
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-[#7E8B9D]/12 md:grid-cols-2">
        <Metric
          label={text.pnl}
          value={formatMoney(telemetry.lifetime_net_pnl, locale)}
          tone={valueTone(telemetry.lifetime_net_pnl)}
          large
        />
        <Metric
          label={text.return}
          value={formatReturn(telemetry.lifetime_return_pct, locale)}
          tone={valueTone(telemetry.lifetime_return_pct)}
          large
        />
        <Metric
          label={text.realized}
          value={formatMoney(telemetry.realized_net_pnl, locale)}
          tone={valueTone(telemetry.realized_net_pnl)}
        />
        <Metric
          label={text.unrealized}
          value={formatMoney(telemetry.current_unrealized_pnl, locale)}
          tone={valueTone(telemetry.current_unrealized_pnl)}
        />
      </div>

      <div className="grid gap-5 border-t border-[#7E8B9D]/12 bg-[#0B0F16] px-6 py-6 text-sm sm:grid-cols-2 sm:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#7E8B9D]">{text.since}</p>
          <p className="mt-2 font-mono text-xs text-[#F4F7FB]">
            {formatTimestamp(telemetry.tracking_started_at_utc, locale)} UTC
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#7E8B9D]">
            {text.observed}
          </p>
          <p className="mt-2 font-mono text-xs text-[#F4F7FB]">
            {formatTimestamp(telemetry.observed_at_utc, locale)} UTC
          </p>
        </div>
        <p className="text-xs leading-5 text-[#7E8B9D] sm:col-span-2">{text.definition}</p>
        <p className="text-xs leading-5 text-[#7E8B9D] sm:col-span-2">{text.privacy}</p>
        {refreshFailed ? (
          <p className="text-xs text-[#FFD08A] sm:col-span-2">{text.refreshFailed}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#7E8B9D]/12 pt-5 sm:col-span-2">
          <p className="font-mono text-[10px] font-semibold text-[#7CF0B9]">{text.boundary}</p>
          <code className="font-mono text-[10px] text-[#8CEBFF]">
            {telemetry.telemetry_sha256.slice(0, 12)}…{telemetry.telemetry_sha256.slice(-8)}
          </code>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  tone,
  large = false,
}: {
  label: string;
  value: string;
  tone: string;
  large?: boolean;
}) {
  return (
    <div className="bg-[#07090D] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.1em] text-[#7E8B9D]">{label}</p>
      <p
        className={`mt-4 font-mono font-semibold tracking-[-0.05em] ${large ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"} ${tone}`}
      >
        {value}
      </p>
    </div>
  );
}

function StatePanel({
  eyebrow,
  title,
  body,
  badge,
}: {
  eyebrow: string;
  title: string;
  body: string;
  badge: string;
}) {
  return (
    <section className="rounded-[2rem] border border-[#7E8B9D]/16 bg-[#080B11] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42D7F5]">
            {eyebrow}
          </p>
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
