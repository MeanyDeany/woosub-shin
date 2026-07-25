"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  formatAge,
  formatUtcTimestamp,
  parseBtcResearchObservatoryBundle,
  type BtcResearchMark,
  type BtcResearchObservatoryBundle,
} from "@/lib/btc-research-observatory";
import { ObservatoryTradingViewDatafeed } from "@/lib/tradingview-observatory-datafeed";

type TradingViewWidgetOptions = {
  container: HTMLElement;
  library_path: string;
  datafeed: ObservatoryTradingViewDatafeed;
  symbol: string;
  interval: string;
  locale: string;
  timezone: string;
  autosize: boolean;
  theme: "dark" | "light";
  disabled_features: string[];
  enabled_features: string[];
  overrides: Record<string, string | number | boolean>;
  loading_screen: { backgroundColor: string; foregroundColor: string };
};

type TradingViewWidgetInstance = {
  remove: () => void;
};

type TradingViewConstructor = new (
  options: TradingViewWidgetOptions,
) => TradingViewWidgetInstance;

declare global {
  interface Window {
    TradingView?: {
      widget: TradingViewConstructor;
    };
  }
}

type LoadStatus = "unconfigured" | "loading" | "ready" | "error";
type LibraryStatus = "fallback" | "loading" | "advanced" | "unavailable";

type BtcResearchObservatoryProps = {
  feedUrl?: string;
  chartingLibraryPath?: string;
};

const POLL_INTERVAL_MS = 60_000;
const FALLBACK_BAR_COUNT = 288;

function normalizedLibraryPath(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function libraryScriptUrl(path: string): string {
  return `${normalizedLibraryPath(path)}charting_library.standalone.js`;
}

function stateTone(value: string): string {
  if (value.includes("CHAOTIC") || value.includes("STRESS")) {
    return "border-[#FF6B7A]/30 bg-[#FF6B7A]/8 text-[#FF9AA5]";
  }
  if (value.includes("HIGH") || value.includes("EXPANSION")) {
    return "border-[#FFB547]/30 bg-[#FFB547]/8 text-[#FFD08A]";
  }
  if (value.includes("LONG") || value.includes("NORMAL") || value === "STABLE") {
    return "border-[#3DDC97]/30 bg-[#3DDC97]/8 text-[#7CF0B9]";
  }
  return "border-[#42D7F5]/25 bg-[#42D7F5]/8 text-[#8CEBFF]";
}

function freshnessTone(seconds: number): string {
  if (seconds <= 2_700) {
    return "text-[#7CF0B9]";
  }
  if (seconds <= 5_400) {
    return "text-[#FFD08A]";
  }
  return "text-[#FF9AA5]";
}

function ObservatoryFallbackChart({ bundle }: { bundle: BtcResearchObservatoryBundle }) {
  const bars = bundle.bars.slice(-FALLBACK_BAR_COUNT);
  const width = 1_000;
  const height = 310;
  const padding = 30;
  const closes = bars.map((bar) => bar.close);
  const minimum = Math.min(...closes);
  const maximum = Math.max(...closes);
  const range = maximum - minimum || 1;
  const firstTime = bars[0]?.time_ms ?? 0;
  const lastTime = bars.at(-1)?.time_ms ?? firstTime + 1;
  const timeRange = lastTime - firstTime || 1;
  const points = bars
    .map((bar, index) => {
      const x =
        bars.length === 1
          ? width / 2
          : padding + (index / (bars.length - 1)) * (width - padding * 2);
      const y =
        padding + ((maximum - bar.close) / range) * (height - padding * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const visibleMarks = bundle.marks.filter(
    (mark) => mark.time_ms >= firstTime && mark.time_ms <= lastTime,
  );

  return (
    <div className="relative h-[360px] overflow-hidden rounded-lg border border-[#7E8B9D]/15 bg-[#07090D]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(126,139,157,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(126,139,157,0.05)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <svg
        aria-label="Recent BTCUSDT close-price path with server state-transition marks"
        className="relative h-full w-full"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="observatory-line" x1="0" x2="1">
            <stop offset="0%" stopColor="#42D7F5" />
            <stop offset="100%" stopColor="#9B6CFF" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          points={points}
          stroke="url(#observatory-line)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        {visibleMarks.map((mark) => {
          const x = padding + ((mark.time_ms - firstTime) / timeRange) * (width - padding * 2);
          const relatedBar = bars.reduce((nearest, bar) =>
            Math.abs(bar.time_ms - mark.time_ms) < Math.abs(nearest.time_ms - mark.time_ms)
              ? bar
              : nearest,
          );
          const y = padding + ((maximum - relatedBar.close) / range) * (height - padding * 2);
          return (
            <g key={mark.id}>
              <circle
                cx={x}
                cy={y}
                fill={markColor(mark)}
                r="7"
                stroke="#050608"
                strokeWidth="3"
              />
              <title>{mark.title}</title>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-normal text-[#7E8B9D]">
        <span>{formatUtcTimestamp(bars[0]?.open_time_utc ?? bundle.generated_at_utc)}</span>
        <span>Built-in evidence fallback · {bars.length} bars</span>
        <span>{formatUtcTimestamp(bars.at(-1)?.close_time_utc ?? bundle.generated_at_utc)}</span>
      </div>
    </div>
  );
}

function markColor(mark: BtcResearchMark): string {
  if (mark.kind === "direction_change") {
    return "#42D7F5";
  }
  if (mark.kind === "composite_volatility_change") {
    return "#9B6CFF";
  }
  return "#FFB547";
}

function StatusField({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#7E8B9D]/10 py-3 last:border-b-0">
      <dt className="text-[10px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
        {label}
      </dt>
      <dd className="mt-1 break-words font-mono text-xs text-[#DCE3EC]">{value}</dd>
    </div>
  );
}

export function BtcResearchObservatory({
  feedUrl,
  chartingLibraryPath,
}: BtcResearchObservatoryProps) {
  const [bundle, setBundle] = useState<BtcResearchObservatoryBundle | null>(null);
  const [status, setStatus] = useState<LoadStatus>(feedUrl ? "loading" : "unconfigured");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [libraryStatus, setLibraryStatus] = useState<LibraryStatus>("fallback");
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<TradingViewWidgetInstance | null>(null);
  const datafeedRef = useRef<ObservatoryTradingViewDatafeed | null>(null);

  const loadBundle = useCallback(async () => {
    if (!feedUrl) {
      setStatus("unconfigured");
      return;
    }
    try {
      const response = await fetch(feedUrl, {
        cache: "no-cache",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Research feed returned HTTP ${response.status}`);
      }
      const parsed = parseBtcResearchObservatoryBundle(await response.json());
      setBundle(parsed);
      setStatus("ready");
      setErrorMessage(null);
      datafeedRef.current?.updateBundle(parsed);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Research feed unavailable");
    }
  }, [feedUrl]);

  useEffect(() => {
    void loadBundle();
    if (!feedUrl) {
      return;
    }
    const timer = window.setInterval(() => void loadBundle(), POLL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [feedUrl, loadBundle]);

  useEffect(() => {
    if (!bundle || !chartingLibraryPath || !chartContainerRef.current || chartRef.current) {
      return;
    }
    const datafeed = datafeedRef.current ?? new ObservatoryTradingViewDatafeed(bundle);
    datafeedRef.current = datafeed;
    const libraryPath = normalizedLibraryPath(chartingLibraryPath);

    const startChart = () => {
      if (!window.TradingView || !chartContainerRef.current || chartRef.current) {
        return false;
      }
      chartRef.current = new window.TradingView.widget({
        container: chartContainerRef.current,
        library_path: libraryPath,
        datafeed,
        symbol: "BTCUSDT",
        interval: "5",
        locale: "en",
        timezone: "Etc/UTC",
        autosize: true,
        theme: "dark",
        disabled_features: [
          "header_compare",
          "header_symbol_search",
          "symbol_search_hot_key",
          "use_localstorage_for_settings",
        ],
        enabled_features: ["hide_left_toolbar_by_default"],
        overrides: {
          "paneProperties.background": "#07090D",
          "paneProperties.backgroundType": "solid",
          "paneProperties.vertGridProperties.color": "rgba(126,139,157,0.08)",
          "paneProperties.horzGridProperties.color": "rgba(126,139,157,0.08)",
          "scalesProperties.textColor": "#7E8B9D",
        },
        loading_screen: {
          backgroundColor: "#07090D",
          foregroundColor: "#42D7F5",
        },
      });
      setLibraryStatus("advanced");
      return true;
    };

    if (startChart()) {
      return;
    }
    const scriptId = "tradingview-advanced-charts-library";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    const script = existing ?? document.createElement("script");
    const handleLoad = () => {
      if (!startChart()) {
        setLibraryStatus("unavailable");
      }
    };
    const handleError = () => setLibraryStatus("unavailable");
    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);
    if (!existing) {
      script.id = scriptId;
      script.src = libraryScriptUrl(libraryPath);
      script.async = true;
      document.head.appendChild(script);
    }
    setLibraryStatus("loading");
    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, [bundle, chartingLibraryPath]);

  useEffect(
    () => () => {
      chartRef.current?.remove();
      chartRef.current = null;
    },
    [],
  );

  const latest = bundle?.latest_state;
  const modelFilters = useMemo(
    () =>
      latest
        ? Object.entries(latest.shadow_filter_regimes).filter(([key]) =>
            key.includes("garch_proxy"),
          )
        : [],
    [latest],
  );

  if (status === "unconfigured") {
    return (
      <div className="rounded-lg border border-[#FFB547]/25 bg-[#0D0C0B] p-6">
        <p className="text-xs font-semibold uppercase tracking-normal text-[#FFB547]">
          Observatory feed not configured
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#B6C0CF]">
          The website integration is installed, but no public sanitized server bundle URL is
          configured. No placeholder state or synthetic market value is displayed.
        </p>
      </div>
    );
  }

  if (!bundle && status === "loading") {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-[#7E8B9D]/15 bg-[#07090D]">
        <p className="font-mono text-xs uppercase tracking-normal text-[#42D7F5]">
          Loading server evidence…
        </p>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="rounded-lg border border-[#FF6B7A]/25 bg-[#12090C] p-6">
        <p className="text-xs font-semibold uppercase tracking-normal text-[#FF9AA5]">
          Server evidence unavailable
        </p>
        <p className="mt-3 text-sm leading-6 text-[#B6C0CF]">
          {errorMessage ?? "The public research bundle could not be validated."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#7E8B9D]/15 bg-[#080B11]">
      <div className="flex flex-col gap-4 border-b border-[#7E8B9D]/12 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#3DDC97]/30 bg-[#3DDC97]/8 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-normal text-[#7CF0B9]">
              Server authoritative
            </span>
            <span className="rounded-full border border-[#42D7F5]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-normal text-[#8CEBFF]">
              Research context only
            </span>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[#F4F7FB]">
            BTCUSDT 5-minute Research Observatory
          </h3>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[10px] uppercase tracking-normal text-[#7E8B9D]">Bundle freshness</p>
          <p className={`mt-1 font-mono text-sm ${freshnessTone(bundle.freshness.latest_state_age_seconds)}`}>
            {formatAge(bundle.freshness.latest_state_age_seconds)} since state observation
          </p>
        </div>
      </div>

      {status === "error" ? (
        <div className="border-b border-[#FFB547]/20 bg-[#FFB547]/6 px-5 py-3 text-xs leading-5 text-[#FFD08A]">
          Refresh failed. The last validated bundle remains visible. {errorMessage}
        </div>
      ) : null}

      <div className="grid min-w-0 gap-px bg-[#7E8B9D]/12 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 bg-[#07090D] p-4 sm:p-5">
          <div className={libraryStatus === "advanced" ? "block h-[560px]" : "hidden"}>
            <div ref={chartContainerRef} className="h-full w-full" />
          </div>
          {libraryStatus !== "advanced" ? <ObservatoryFallbackChart bundle={bundle} /> : null}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-normal text-[#7E8B9D]">
            <span>
              {libraryStatus === "advanced"
                ? "TradingView Advanced Charts · custom server datafeed"
                : "Built-in evidence chart · Advanced Charts assets optional"}
            </span>
            <span>Polling every 60 seconds</span>
          </div>
        </div>

        <aside className="min-w-0 bg-[#0B0F16] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-normal text-[#42D7F5]">
            Latest descriptive state
          </p>
          <div className="mt-4 grid gap-2">
            <StateBadge label="Direction context" value={latest?.direction_state ?? "UNKNOWN"} />
            <StateBadge
              label="Composite volatility"
              value={latest?.composite_volatility_state ?? "UNKNOWN"}
            />
            <StateBadge label="Vol-of-vol" value={latest?.vol_of_vol_state ?? "UNKNOWN"} />
          </div>

          <dl className="mt-5 border-y border-[#7E8B9D]/12">
            <StatusField
              label="Filter agreement"
              value={
                latest?.filter_agreement_score === null || latest?.filter_agreement_score === undefined
                  ? "Unavailable"
                  : `${Math.round(latest.filter_agreement_score * 100)}%`
              }
            />
            <StatusField
              label="Observed at"
              value={formatUtcTimestamp(latest?.observed_at_utc ?? bundle.generated_at_utc)}
            />
            <StatusField
              label="Latest completed bar"
              value={formatUtcTimestamp(bundle.bars.at(-1)?.close_time_utc ?? bundle.generated_at_utc)}
            />
            <StatusField label="Bundle SHA-256" value={bundle.bundle_sha256.slice(0, 16)} />
          </dl>

          {modelFilters.length > 0 ? (
            <div className="mt-5">
              <p className="text-[10px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
                Shadow proxy filters
              </p>
              <div className="mt-3 space-y-2">
                {modelFilters.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between gap-3 text-xs">
                    <span className="truncate text-[#7E8B9D]">{key.replaceAll("_", " ")}</span>
                    <span className="font-mono text-[#B6C0CF]">{value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-5 text-[#7E8B9D]">
                Proxy filter regimes are not the immutable Tier-2 model forecast events.
              </p>
            </div>
          ) : null}
        </aside>
      </div>

      <div className="border-t border-[#7E8B9D]/12 px-5 py-4 text-xs leading-5 text-[#7E8B9D]">
        No strategy, entry, short permission, position, sizing, leverage, allocation, order,
        broker, paper/live, or execution field is included in this public bundle.
      </div>
    </div>
  );
}

function StateBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className={`rounded-lg border px-4 py-3 ${stateTone(value)}`}>
      <p className="text-[9px] font-semibold uppercase tracking-normal opacity-70">{label}</p>
      <p className="mt-1 break-words font-mono text-xs font-semibold">{value}</p>
    </div>
  );
}
