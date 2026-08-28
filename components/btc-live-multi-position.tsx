"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  multiPositionAgeSeconds,
  parseBtcLiveMultiPositionTelemetry,
  type BtcLiveMultiPositionSymbol,
  type BtcLiveMultiPositionTelemetry,
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
    title: "Live Binance USD-M Positions",
    live: "LIVE",
    stale: "STALE",
    unavailable: "UNAVAILABLE",
    loading: "Loading authenticated multi-symbol position telemetry…",
    failed: "The multi-symbol public position feed could not be loaded or validated.",
    lastGood: "Refresh failed. The last validated observation remains visible.",
    position: "Position",
    mode: "Mode",
    margin: "Margin",
    leverage: "Configured leverage",
    orders: "Open orders",
    observed: "Observed",
    flat: "No active position",
    boundary:
      "BTCUSDT and BTCUSDC are shown from one authenticated read-only observation. Exact size, prices, unrealized PnL, balances, credentials, and order authority are excluded.",
    action: "External action permitted: FALSE",
  },
  ko: {
    eyebrow: "인증된 거래소 텔레메트리",
    title: "Binance USD-M 실계정 포지션",
    live: "LIVE",
    stale: "STALE",
    unavailable: "UNAVAILABLE",
    loading: "BTCUSDT·BTCUSDC 인증 포지션 정보를 불러오는 중…",
    failed: "멀티 심볼 공개 포지션 피드를 불러오거나 검증하지 못했습니다.",
    lastGood: "새로고침에 실패했습니다. 마지막 검증 관측값을 계속 표시합니다.",
    position: "포지션",
    mode: "모드",
    margin: "마진",
    leverage: "설정 레버리지",
    orders: "오픈 주문",
    observed: "관측",
    flat: "활성 포지션 없음",
    boundary:
      "BTCUSDT와 BTCUSDC를 하나의 인증된 read-only 관측에서 표시합니다. 정확한 수량, 가격, 미실현 PnL, 잔고, 인증정보, 주문 권한은 공개하지 않습니다.",
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

function positionTone(state: BtcLiveMultiPositionSymbol["position_state"]): string {
  if (state === "LONG") return "text-[#7CF0B9]";
  if (state === "SHORT") return "text-[#FF9AA5]";
  if (state === "AMBIGUOUS") return "text-[#FFD08A]";
  return "text-[#8CEBFF]";
}

function SymbolCard({
  position,
  locale,
}: {
  position: BtcLiveMultiPositionSymbol;
  locale: ObservatoryLocale;
}) {
  const text = copy[locale];
  return (
    <article className="rounded-2xl border border-[#7E8B9D]/14 bg-[#080B11] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.08em] text-[#F4F7FB]">
            {position.symbol}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[#7E8B9D]">{text.position}</p>
        </div>
        <span className="rounded-full border border-[#7E8B9D]/18 px-2.5 py-1 font-mono text-[10px] text-[#B6C0CF]">
          {position.margin_type}
        </span>
      </div>

      <p className={`mt-6 font-mono text-4xl font-semibold tracking-[-0.05em] ${positionTone(position.position_state)}`}>
        {position.position_state}
      </p>
      {position.position_state === "FLAT" ? (
        <p className="mt-2 text-xs text-[#7E8B9D]">{text.flat}</p>
      ) : null}

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#7E8B9D]/12">
        {[
          [text.mode, position.position_mode],
          [text.margin, position.margin_type],
          [text.leverage, `${position.configured_leverage}x`],
          [text.orders, String(position.open_order_count)],
        ].map(([label, value]) => (
          <div key={label} className="bg-[#0B0F16] px-4 py-3">
            <dt className="text-[10px] uppercase tracking-[0.08em] text-[#7E8B9D]">{label}</dt>
            <dd className="mt-1.5 font-mono text-sm font-semibold text-[#F4F7FB]">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function BtcLiveMultiPosition({ feedUrl, locale = "en" }: Props) {
  const text = copy[locale];
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [telemetry, setTelemetry] = useState<BtcLiveMultiPositionTelemetry | null>(null);
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
      if (telemetry) setRefreshFailed(true);
      else setStatus("error");
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
  const extraDiagnostics = telemetry.diagnostic_codes.filter(
    (code) => code !== "READ_ONLY_OBSERVATION_COMPLETE",
  );

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#7E8B9D]/16 bg-[#080B11] shadow-2xl shadow-black/20">
      <div className="border-b border-[#7E8B9D]/12 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42D7F5]">{text.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#F4F7FB] sm:text-3xl">{text.title}</h2>
          </div>
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold ${badgeTone}`}>
            <span className={`h-2 w-2 rounded-full ${stale ? "bg-[#FFB547]" : "bg-[#3DDC97]"}`} />
            {stale ? text.stale : text.live}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {telemetry.symbols.map((position) => (
            <SymbolCard key={position.symbol} position={position} locale={locale} />
          ))}
        </div>

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

        {extraDiagnostics.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {extraDiagnostics.map((code) => (
              <span key={code} className="rounded-full border border-[#FFB547]/30 bg-[#FFB547]/8 px-3 py-1 font-mono text-[10px] text-[#FFD08A]">
                {code}
              </span>
            ))}
          </div>
        ) : null}
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
        <span className="rounded-full border border-[#7E8B9D]/20 px-3 py-1 font-mono text-[10px] text-[#B6C0CF]">{badge}</span>
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-6 text-[#7E8B9D]">{body}</p>
    </section>
  );
}
