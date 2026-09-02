"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  multiPositionAgeSeconds,
  parseBtcLiveMultiPositionTelemetry,
  type BinanceOpenPosition,
  type BinanceOpenPositionsTelemetry,
} from "@/lib/btc-live-multi-position";
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
    eyebrow: "Authenticated exchange telemetry",
    title: "All Open Binance USD-M Positions",
    live: "LIVE",
    stale: "STALE",
    unavailable: "UNAVAILABLE",
    loading: "Loading account-wide open-position telemetry…",
    failed: "The public open-position feed could not be loaded or validated.",
    lastGood: "Refresh failed. The last validated observation remains visible.",
    count: "Open positions",
    mode: "Account mode",
    side: "Position side",
    ordinaryOrders: "Ordinary orders",
    algoOrders: "Algo orders",
    present: "PRESENT",
    none: "NONE",
    observed: "Observed",
    emptyTitle: "No open positions",
    emptyBody: "The latest authenticated account-wide observation is flat.",
    boundary:
      "Every non-zero Binance USD-M position is listed dynamically. Exact size, notional, prices, per-position PnL, margin, balances, order counts, identifiers, credentials, and order authority are excluded.",
    action: "External action permitted: FALSE",
  },
  ko: {
    eyebrow: "인증된 거래소 텔레메트리",
    title: "Binance USD-M 전체 오픈 포지션",
    live: "LIVE",
    stale: "STALE",
    unavailable: "UNAVAILABLE",
    loading: "계정 전체 오픈 포지션 정보를 불러오는 중…",
    failed: "공개 오픈 포지션 피드를 불러오거나 검증하지 못했습니다.",
    lastGood: "새로고침에 실패했습니다. 마지막 검증 관측값을 계속 표시합니다.",
    count: "오픈 포지션",
    mode: "계정 모드",
    side: "포지션 사이드",
    ordinaryOrders: "일반 주문",
    algoOrders: "알고 주문",
    present: "있음",
    none: "없음",
    observed: "관측",
    emptyTitle: "오픈 포지션 없음",
    emptyBody: "마지막으로 인증된 계정 전체 관측 시점에는 포지션이 없습니다.",
    boundary:
      "Binance USD-M의 모든 non-zero 포지션을 종목 제한 없이 동적으로 표시합니다. 정확한 수량, 명목가치, 가격, 종목별 PnL, 마진, 잔고, 주문 수·식별자, 인증정보, 주문 권한은 공개하지 않습니다.",
    action: "External action permitted: FALSE",
  },
} as const;

function formatAge(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3_600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3_600)}h ${Math.floor((seconds % 3_600) / 60)}m`;
}

function formatTimestamp(value: string, locale: ObservatoryLocale): string {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

function positionTone(state: BinanceOpenPosition["position_state"]): string {
  return state === "LONG" ? "text-[#7CF0B9]" : "text-[#FF9AA5]";
}

function OrderPresence({
  present,
  yes,
  no,
}: {
  present: boolean;
  yes: string;
  no: string;
}) {
  return (
    <span className={present ? "text-[#FFD08A]" : "text-[#B6C0CF]"}>
      {present ? yes : no}
    </span>
  );
}

function PositionCard({
  position,
  locale,
}: {
  position: BinanceOpenPosition;
  locale: ObservatoryLocale;
}) {
  const text = copy[locale];
  return (
    <article className="rounded-2xl border border-[#7E8B9D]/14 bg-[#080B11] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm font-semibold tracking-[0.06em] text-[#F4F7FB]">
            {position.symbol}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[#7E8B9D]">
            {text.side}
          </p>
        </div>
        <span className="rounded-full border border-[#7E8B9D]/18 px-2.5 py-1 font-mono text-[10px] text-[#B6C0CF]">
          {position.position_side}
        </span>
      </div>

      <p
        className={`mt-6 font-mono text-4xl font-semibold tracking-[-0.05em] ${positionTone(position.position_state)}`}
      >
        {position.position_state}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#7E8B9D]/12">
        <div className="bg-[#0B0F16] px-4 py-3">
          <dt className="text-[10px] uppercase tracking-[0.08em] text-[#7E8B9D]">
            {text.ordinaryOrders}
          </dt>
          <dd className="mt-1.5 font-mono text-sm font-semibold">
            <OrderPresence
              present={position.ordinary_open_orders_present}
              yes={text.present}
              no={text.none}
            />
          </dd>
        </div>
        <div className="bg-[#0B0F16] px-4 py-3">
          <dt className="text-[10px] uppercase tracking-[0.08em] text-[#7E8B9D]">
            {text.algoOrders}
          </dt>
          <dd className="mt-1.5 font-mono text-sm font-semibold">
            <OrderPresence
              present={position.algo_open_orders_present}
              yes={text.present}
              no={text.none}
            />
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function BtcLiveMultiPosition({ feedUrl, locale = "en" }: Props) {
  const text = copy[locale];
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [telemetry, setTelemetry] = useState<BinanceOpenPositionsTelemetry | null>(null);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(feedUrl, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsed = parseBtcLiveMultiPositionTelemetry(await response.json());
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
    () => (telemetry ? multiPositionAgeSeconds(telemetry, nowMs) : null),
    [telemetry, nowMs],
  );

  if (status === "loading" && !telemetry) {
    return <StatePanel title={text.title} body={text.loading} badge="…" />;
  }
  if (status === "error" && !telemetry) {
    return <StatePanel title={text.title} body={text.failed} badge={text.unavailable} />;
  }
  if (!telemetry || ageSeconds === null) return null;

  const stale = ageSeconds > telemetry.freshness_ttl_seconds;
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
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="rounded-full border border-[#7E8B9D]/20 px-3 py-1.5 font-mono text-xs text-[#B6C0CF]">
              {text.count}: {telemetry.open_position_count}
            </span>
            <span className="rounded-full border border-[#7E8B9D]/20 px-3 py-1.5 font-mono text-xs text-[#B6C0CF]">
              {text.mode}: {telemetry.position_mode}
            </span>
            <span
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold ${badgeTone}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${stale ? "bg-[#FFB547]" : "bg-[#3DDC97]"}`}
              />
              {stale ? text.stale : text.live}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {telemetry.positions.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {telemetry.positions.map((position) => (
              <PositionCard
                key={`${position.symbol}:${position.position_side}`}
                position={position}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#3DDC97]/20 bg-[#3DDC97]/[0.04] px-5 py-8 text-center sm:px-8">
            <p className="font-mono text-lg font-semibold text-[#7CF0B9]">{text.emptyTitle}</p>
            <p className="mt-2 text-sm text-[#7E8B9D]">{text.emptyBody}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#7E8B9D]/12 pt-5">
          <div>
            <p className="text-xs text-[#7E8B9D]">{text.observed}</p>
            <p className="mt-1 font-mono text-xs text-[#F4F7FB]">
              {formatTimestamp(telemetry.observed_at_utc, locale)} UTC · {formatAge(ageSeconds)} ago
            </p>
          </div>
          <code className="font-mono text-[10px] text-[#8CEBFF]">
            {telemetry.telemetry_sha256.slice(0, 12)}…{telemetry.telemetry_sha256.slice(-8)}
          </code>
        </div>

        {refreshFailed ? <p className="mt-4 text-sm text-[#FFD08A]">{text.lastGood}</p> : null}
        <p className="mt-5 text-xs leading-5 text-[#7E8B9D]">{text.boundary}</p>
        <p className="mt-3 font-mono text-[10px] font-semibold text-[#7CF0B9]">{text.action}</p>
      </div>
    </section>
  );
}

function StatePanel({ title, body, badge }: { title: string; body: string; badge: string }) {
  return (
    <section className="rounded-[2rem] border border-[#7E8B9D]/16 bg-[#080B11] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold text-[#F4F7FB]">{title}</h2>
        <span className="rounded-full border border-[#7E8B9D]/20 px-3 py-1 font-mono text-[10px] text-[#B6C0CF]">
          {badge}
        </span>
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-6 text-[#7E8B9D]">{body}</p>
    </section>
  );
}
