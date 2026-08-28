"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  parseBtcLivePositionTelemetry,
  positionAgeSeconds,
  type BtcLivePositionTelemetry,
  type ObservatoryLocale,
} from "@/lib/btc-live-position";


type LoadStatus = "unconfigured" | "loading" | "ready" | "error";

type Props = {
  feedUrl?: string;
  locale?: ObservatoryLocale;
};

const POLL_INTERVAL_MS = 30_000;
const CLOCK_INTERVAL_MS = 10_000;

const copy = {
  en: {
    eyebrow: "Authenticated exchange telemetry",
    title: "BTCUSDT Live Binance Position",
    live: "LIVE",
    stale: "STALE",
    unavailable: "UNAVAILABLE",
    loading: "Loading authenticated position telemetry…",
    unconfigured: "Live position feed is not configured yet.",
    failed: "The public position feed could not be loaded or validated.",
    lastGood: "Refresh failed. The last validated observation remains visible.",
    position: "Position",
    mode: "Position mode",
    margin: "Margin",
    leverage: "Configured leverage",
    orders: "Open orders",
    multiAsset: "Multi-Assets Mode",
    observed: "Observed",
    identity: "Telemetry identity",
    noPosition: "No active BTCUSDT futures position",
    configuredNote: "Observed exchange configuration, not a sizing recommendation",
    publicBoundary:
      "Legacy BTCUSDT-only public read-only telemetry. Exact position size, account balance, credentials, and order authority are intentionally excluded.",
    actionBoundary: "External action permitted: FALSE",
  },
  ko: {
    eyebrow: "인증된 거래소 텔레메트리",
    title: "BTCUSDT Binance 실계정 포지션",
    live: "LIVE",
    stale: "STALE",
    unavailable: "UNAVAILABLE",
    loading: "인증된 포지션 정보를 불러오는 중…",
    unconfigured: "실계정 포지션 피드가 아직 설정되지 않았습니다.",
    failed: "공개 포지션 피드를 불러오거나 검증하지 못했습니다.",
    lastGood: "새로고침에 실패했습니다. 마지막으로 검증된 관측값을 계속 표시합니다.",
    position: "포지션",
    mode: "포지션 모드",
    margin: "마진",
    leverage: "설정 레버리지",
    orders: "오픈 주문",
    multiAsset: "Multi-Assets Mode",
    observed: "관측",
    identity: "Telemetry identity",
    noPosition: "활성 BTCUSDT 선물 포지션 없음",
    configuredNote: "거래소에서 관측한 설정값이며 사이징 권고가 아닙니다",
    publicBoundary:
      "기존 BTCUSDT-only 공개 read-only 텔레메트리입니다. 정확한 포지션 크기, 계정 잔고, 인증정보, 주문 권한은 의도적으로 제외합니다.",
    actionBoundary: "External action permitted: FALSE",
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

function positionTone(state: BtcLivePositionTelemetry["position_state"]): string {
  if (state === "LONG") return "text-[#7CF0B9]";
  if (state === "SHORT") return "text-[#FF9AA5]";
  if (state === "AMBIGUOUS") return "text-[#FFD08A]";
  return "text-[#8CEBFF]";
}

export function BtcLivePosition({ feedUrl, locale = "en" }: Props) {
  const text = copy[locale];
  const [status, setStatus] = useState<LoadStatus>(feedUrl ? "loading" : "unconfigured");
  const [telemetry, setTelemetry] = useState<BtcLivePositionTelemetry | null>(null);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const refresh = useCallback(async () => {
    if (!feedUrl) {
      setStatus("unconfigured");
      return;
    }
    try {
      const response = await fetch(feedUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const parsed = parseBtcLivePositionTelemetry(await response.json());
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
    if (!feedUrl) return;
    const timer = window.setInterval(() => void refresh(), POLL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [feedUrl, refresh]);

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), CLOCK_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const ageSeconds = useMemo(
    () => (telemetry ? positionAgeSeconds(telemetry, nowMs) : null),
    [telemetry, nowMs],
  );
  const stale = telemetry !== null && ageSeconds !== null && ageSeconds > telemetry.freshness_ttl_seconds;
  const extraDiagnostics = telemetry?.diagnostic_codes.filter(
    (code) => code !== "READ_ONLY_OBSERVATION_COMPLETE",
  ) ?? [];

  if (status === "unconfigured") {
    return <StatePanel title={text.title} body={text.unconfigured} badge={text.unavailable} />;
  }
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

      <div className="grid gap-px bg-[#7E8B9D]/12 lg:grid-cols-[1.15fr_1.85fr]">
        <div className="bg-[#07090D] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.1em] text-[#7E8B9D]">{text.position}</p>
          <p className={`mt-4 font-mono text-5xl font-semibold tracking-[-0.05em] ${positionTone(telemetry.position_state)}`}>
            {telemetry.position_state}
          </p>
          {telemetry.position_state === "FLAT" ? (
            <p className="mt-4 text-sm leading-6 text-[#B6C0CF]">{text.noPosition}</p>
          ) : null}
          <div className="mt-8 border-t border-[#7E8B9D]/12 pt-5">
            <p className="text-xs text-[#7E8B9D]">{text.observed}</p>
            <p className="mt-2 font-mono text-sm text-[#F4F7FB]">
              {formatTimestamp(telemetry.observed_at_utc, locale)} UTC
            </p>
            <p className={`mt-2 font-mono text-xs ${stale ? "text-[#FFD08A]" : "text-[#7CF0B9]"}`}>
              {formatAge(ageSeconds)} ago
            </p>
          </div>
        </div>

        <div className="bg-[#0B0F16] p-6 sm:p-8">
          <dl className="grid gap-px overflow-hidden rounded-xl border border-[#7E8B9D]/12 bg-[#7E8B9D]/12 sm:grid-cols-2">
            {[
              [text.mode, telemetry.position_mode],
              [text.margin, telemetry.margin_type],
              [text.leverage, `${telemetry.configured_leverage}x`],
              [text.orders, String(telemetry.open_order_count)],
              [text.multiAsset, telemetry.multi_assets_margin ? "ON" : "OFF"],
              ["Venue", telemetry.venue],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#080B11] px-5 py-4">
                <dt className="text-[11px] uppercase tracking-[0.08em] text-[#7E8B9D]">{label}</dt>
                <dd className="mt-2 font-mono text-sm font-semibold text-[#F4F7FB]">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-xs leading-5 text-[#7E8B9D]">{text.configuredNote}</p>

          {extraDiagnostics.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {extraDiagnostics.map((code) => (
                <span key={code} className="rounded-full border border-[#FFB547]/30 bg-[#FFB547]/8 px-3 py-1 font-mono text-[10px] text-[#FFD08A]">
                  {code}
                </span>
              ))}
            </div>
          ) : null}

          {refreshFailed ? (
            <p className="mt-5 text-sm text-[#FFD08A]">{text.lastGood}</p>
          ) : null}

          <div className="mt-7 border-t border-[#7E8B9D]/12 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[#7E8B9D]">{text.identity}</p>
              <code className="font-mono text-[10px] text-[#8CEBFF]">
                {telemetry.telemetry_sha256.slice(0, 12)}…{telemetry.telemetry_sha256.slice(-8)}
              </code>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#7E8B9D]">{text.publicBoundary}</p>
            <p className="mt-3 font-mono text-[10px] font-semibold text-[#7CF0B9]">{text.actionBoundary}</p>
          </div>
        </div>
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
