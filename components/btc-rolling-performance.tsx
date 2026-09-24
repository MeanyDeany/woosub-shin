"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  parseBtcRollingPerformanceTelemetry,
  rollingPerformanceAgeSeconds,
  type BinanceRollingPerformanceTelemetry,
} from "@/lib/btc-rolling-performance";
import type { ObservatoryLocale } from "@/lib/btc-live-position";

type Props = {
  feedUrl: string;
  locale?: ObservatoryLocale;
};

const POLL_INTERVAL_MS = 30_000;
const CLOCK_INTERVAL_MS = 10_000;

const copy = {
  en: {
    eyebrow: "Rolling account return",
    title: "Recent Binance performance",
    seven: "7D return",
    thirty: "30D return",
    pnl: "window PnL",
    live: "LIVE",
    stale: "STALE",
    boundary: "Flow-adjusted account telemetry · read-only",
  },
  ko: {
    eyebrow: "Rolling account return",
    title: "최근 Binance 성과",
    seven: "7일 수익률",
    thirty: "30일 수익률",
    pnl: "구간 PnL",
    live: "LIVE",
    stale: "STALE",
    boundary: "입출금 조정 계정 텔레메트리 · read-only",
  },
} as const;

function formatReturn(value: number, locale: ObservatoryLocale): string {
  const formatted = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "always",
  }).format(value);
  return `${value === 0 ? formatted.replace(/^\+/, "") : formatted}%`;
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

function tone(value: number): string {
  if (value > 0) return "text-[#7CF0B9]";
  if (value < 0) return "text-[#FF9AA5]";
  return "text-[#F4F7FB]";
}

export function BtcRollingPerformance({ feedUrl, locale = "en" }: Props) {
  const text = copy[locale];
  const [telemetry, setTelemetry] = useState<BinanceRollingPerformanceTelemetry | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(feedUrl, { cache: "no-store" });
      if (!response.ok) return;
      const parsed = parseBtcRollingPerformanceTelemetry(await response.json());
      setTelemetry(parsed);
      setNowMs(Date.now());
    } catch {
      // Optional additive feed. Preserve the last validated values and avoid
      // replacing the primary lifetime/open-position telemetry with a placeholder.
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
    () => (telemetry ? rollingPerformanceAgeSeconds(telemetry, nowMs) : null),
    [telemetry, nowMs],
  );

  if (!telemetry || ageSeconds === null) return null;

  const stale = ageSeconds > telemetry.freshness_ttl_seconds;
  const seven = telemetry.windows[0];
  const thirty = telemetry.windows[1];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#7E8B9D]/16 bg-[#080B11] shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#7E8B9D]/12 px-6 py-5 sm:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42D7F5]">
            {text.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#F4F7FB] sm:text-2xl">
            {text.title}
          </h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold ${
            stale
              ? "border-[#FFB547]/35 bg-[#FFB547]/10 text-[#FFD08A]"
              : "border-[#3DDC97]/35 bg-[#3DDC97]/10 text-[#7CF0B9]"
          }`}
        >
          {stale ? text.stale : text.live}
        </span>
      </div>

      <div className="grid gap-px bg-[#7E8B9D]/12 md:grid-cols-2">
        {[
          [text.seven, seven],
          [text.thirty, thirty],
        ].map(([label, window]) => {
          const item = window as typeof seven;
          return (
            <div key={item.window} className="bg-[#07090D] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.1em] text-[#7E8B9D]">{label as string}</p>
              <p className={`mt-3 font-mono text-4xl font-semibold tracking-[-0.05em] sm:text-5xl ${tone(item.return_pct)}`}>
                {formatReturn(item.return_pct, locale)}
              </p>
              <p className="mt-3 font-mono text-xs text-[#7E8B9D]">
                {text.pnl}: <span className={tone(item.net_pnl)}>{formatMoney(item.net_pnl, locale)}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#7E8B9D]/12 bg-[#0B0F16] px-6 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] font-semibold text-[#7CF0B9]">{text.boundary}</p>
          <code className="font-mono text-[10px] text-[#8CEBFF]">
            {telemetry.telemetry_sha256.slice(0, 12)}…{telemetry.telemetry_sha256.slice(-8)}
          </code>
        </div>
      </div>
    </section>
  );
}
