"use client";

import { useEffect, useRef, useState } from "react";
import {
  CandlestickSeries,
  ColorType,
  CrosshairMode,
  HistogramSeries,
  createChart,
  type CandlestickData,
  type HistogramData,
  type UTCTimestamp,
} from "lightweight-charts";

import styles from "./market-shock-terminal.module.css";

type ScenarioBar = CandlestickData<UTCTimestamp> & {
  volume: number;
};

type Quote = Pick<ScenarioBar, "open" | "high" | "low" | "close">;

type MarketShockTerminalProps = {
  onCrashComplete: () => void;
};

const FIVE_MINUTES = 5 * 60;
const CRASH_BAR_COUNT = 7;
const PRELOAD_COUNT = 58;
const PRE_CRASH_INTERVAL_MS = 115;
const CRASH_INTERVAL_MS = 285;
const OPENING_HOLD_MS = 900;
const PRE_CRASH_HOLD_MS = 480;

function roundPrice(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildScenario(): ScenarioBar[] {
  const start = Math.floor(Date.UTC(2026, 7, 7, 18, 0, 0) / 1000) as UTCTimestamp;
  const bars: ScenarioBar[] = [];
  let previousClose = 101_840;

  for (let index = 0; index < 77; index += 1) {
    const open = previousClose;
    const drift =
      54 +
      Math.sin(index * 0.72) * 122 +
      Math.cos(index * 0.31) * 74 +
      (index > 49 ? 36 : 0);
    const close = roundPrice(open + drift);
    const wick = 92 + ((index * 37) % 118);
    const high = roundPrice(Math.max(open, close) + wick);
    const low = roundPrice(Math.min(open, close) - wick * 0.74);

    bars.push({
      time: (start + index * FIVE_MINUTES) as UTCTimestamp,
      open: roundPrice(open),
      high,
      low,
      close,
      volume: 1_180 + ((index * 193) % 1_220),
    });
    previousClose = close;
  }

  const crashMoves = [-120, -250, -560, -1_080, -1_920, -3_140, -4_760];

  crashMoves.forEach((move, offset) => {
    const index = 77 + offset;
    const open = previousClose;
    const close = roundPrice(open + move);
    const high = roundPrice(open + 80 + offset * 20);
    const low = roundPrice(close - (150 + offset * 86));

    bars.push({
      time: (start + index * FIVE_MINUTES) as UTCTimestamp,
      open: roundPrice(open),
      high,
      low,
      close,
      volume: 2_900 + offset * offset * 1_260 + offset * 720,
    });
    previousClose = close;
  });

  return bars;
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

function volumePoint(bar: ScenarioBar): HistogramData<UTCTimestamp> {
  return {
    time: bar.time,
    value: bar.volume,
    color: bar.close >= bar.open ? "rgba(57, 214, 190, 0.30)" : "rgba(255, 73, 102, 0.42)",
  };
}

export function MarketShockTerminal({ onCrashComplete }: MarketShockTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onCrashComplete);
  const [quote, setQuote] = useState<Quote>(() => {
    const scenario = buildScenario();
    return scenario[PRELOAD_COUNT - 1];
  });

  useEffect(() => {
    completeRef.current = onCrashComplete;
  }, [onCrashComplete]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scenario = buildScenario();
    const crashStart = scenario.length - CRASH_BAR_COUNT;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const chart = createChart(container, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(202, 215, 236, 0.62)",
        fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
        attributionLogo: true,
      },
      grid: {
        vertLines: { color: "rgba(159, 178, 209, 0.075)" },
        horzLines: { color: "rgba(159, 178, 209, 0.075)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(141, 169, 210, 0.48)",
          width: 1,
          labelBackgroundColor: "#182131",
        },
        horzLine: {
          color: "rgba(141, 169, 210, 0.48)",
          width: 1,
          labelBackgroundColor: "#182131",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(151, 169, 199, 0.18)",
        scaleMargins: { top: 0.08, bottom: 0.29 },
      },
      timeScale: {
        borderColor: "rgba(151, 169, 199, 0.18)",
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 9,
        minBarSpacing: 4,
        lockVisibleTimeRangeOnResize: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      localization: {
        priceFormatter: (price: number) => `$${Math.round(price).toLocaleString("en-US")}`,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      title: "BTCUSD",
      upColor: "#35d4b7",
      downColor: "#ff4966",
      wickUpColor: "#35d4b7",
      wickDownColor: "#ff4966",
      borderVisible: false,
      priceLineVisible: true,
      priceLineColor: "rgba(255, 73, 102, 0.42)",
      priceLineWidth: 1,
      lastValueVisible: true,
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "",
      lastValueVisible: false,
      priceLineVisible: false,
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.79, bottom: 0 },
    });

    const initialBars = reducedMotion ? scenario : scenario.slice(0, PRELOAD_COUNT);
    candleSeries.setData(initialBars);
    volumeSeries.setData(initialBars.map(volumePoint));
    setQuote(initialBars.at(-1) ?? scenario[0]);
    chart.timeScale().fitContent();

    const timers: number[] = [];

    if (reducedMotion) {
      completeRef.current();
      return () => chart.remove();
    }

    let index = PRELOAD_COUNT;

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
    };

    const appendNext = () => {
      if (index >= scenario.length) {
        schedule(() => completeRef.current(), 320);
        return;
      }

      const bar = scenario[index];
      candleSeries.update(bar);
      volumeSeries.update(volumePoint(bar));
      setQuote(bar);
      chart.timeScale().scrollToPosition(4, true);

      const justReachedCrash = index === crashStart - 1;
      const inCrash = index >= crashStart;
      index += 1;

      if (justReachedCrash) {
        schedule(appendNext, PRE_CRASH_HOLD_MS);
      } else {
        schedule(appendNext, inCrash ? CRASH_INTERVAL_MS : PRE_CRASH_INTERVAL_MS);
      }
    };

    schedule(appendNext, OPENING_HOLD_MS);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      chart.remove();
    };
  }, []);

  return (
    <div className={styles.shell}>
      <div className={styles.toolbar} aria-hidden="true">
        <div className={styles.symbolBlock}>
          <span className={styles.symbol}>BTCUSD</span>
          <span className={styles.interval}>5m</span>
          <span className={styles.synthetic}>Synthetic stress sequence</span>
        </div>
        <div className={styles.actions}>
          <span>Indicators</span>
          <span>Replay</span>
          <span className={styles.auto}>AUTO</span>
        </div>
      </div>

      <div className={styles.quoteStrip} aria-hidden="true">
        <span>O <strong>{formatPrice(quote.open)}</strong></span>
        <span>H <strong>{formatPrice(quote.high)}</strong></span>
        <span>L <strong>{formatPrice(quote.low)}</strong></span>
        <span>C <strong className={quote.close >= quote.open ? styles.up : styles.down}>{formatPrice(quote.close)}</strong></span>
      </div>

      <div ref={containerRef} className={styles.chart} aria-label="Interactive synthetic candlestick stress chart" />
      <div className={styles.cornerLabel}>SIMULATION · NOT LIVE MARKET DATA</div>
    </div>
  );
}
