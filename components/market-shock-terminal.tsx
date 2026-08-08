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

type CrashShape = {
  move: number;
  upperWick: number;
  lowerWick: number;
  volume: number;
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

function deterministicNoise(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
    return state / 4_294_967_296;
  };
}

function buildScenario(): ScenarioBar[] {
  const start = Math.floor(Date.UTC(2026, 7, 7, 18, 0, 0) / 1000) as UTCTimestamp;
  const bars: ScenarioBar[] = [];
  const noise = deterministicNoise(0x5eedb7c);
  let previousClose = 101_840;

  for (let index = 0; index < 77; index += 1) {
    const open = previousClose;

    let bias = 18;
    let bodyScale = 150;
    let wickScale = 155;
    let volumeBase = 1_050;

    if (index < 18) {
      bias = 6;
      bodyScale = 135;
      wickScale = 175;
      volumeBase = 980;
    } else if (index < 35) {
      bias = 58;
      bodyScale = 165;
      wickScale = 145;
      volumeBase = 1_180;
    } else if (index < 49) {
      bias = -18;
      bodyScale = 205;
      wickScale = 205;
      volumeBase = 1_420;
    } else if (index < 64) {
      bias = 82;
      bodyScale = 235;
      wickScale = 175;
      volumeBase = 1_650;
    } else {
      bias = 24;
      bodyScale = 265;
      wickScale = 245;
      volumeBase = 1_780;
    }

    const cyclical = Math.sin(index * 0.61) * 52 + Math.cos(index * 0.27) * 34;
    const signedNoise = (noise() - 0.5) * 2;
    let move = bias + cyclical + signedNoise * bodyScale;

    // A few hand-shaped bars make the pre-crash tape feel less algorithmically uniform.
    if (index === 7) move = 42; // hammer-like lower-wick reversal
    if (index === 14) move = -9; // doji / indecision
    if (index === 23) move = 286; // broad bullish impulse
    if (index === 32) move = 18; // spinning top
    if (index === 41) move = -338; // bearish impulse
    if (index === 52) move = -36; // long upper-wick rejection
    if (index === 60) move = 372; // expansion breakout
    if (index === 69) move = 7; // late-stage doji
    if (index === 74) move = -54; // shooting-star body

    const close = roundPrice(open + move);
    const body = Math.abs(close - open);

    let upperWick = 38 + noise() * wickScale;
    let lowerWick = 42 + noise() * wickScale;

    if (index === 7) {
      upperWick = 44;
      lowerWick = 420;
    } else if (index === 14) {
      upperWick = 238;
      lowerWick = 218;
    } else if (index === 23) {
      upperWick = 54;
      lowerWick = 46;
    } else if (index === 32) {
      upperWick = 270;
      lowerWick = 250;
    } else if (index === 41) {
      upperWick = 62;
      lowerWick = 112;
    } else if (index === 52) {
      upperWick = 510;
      lowerWick = 82;
    } else if (index === 60) {
      upperWick = 75;
      lowerWick = 54;
    } else if (index === 69) {
      upperWick = 318;
      lowerWick = 284;
    } else if (index === 74) {
      upperWick = 540;
      lowerWick = 68;
    }

    const high = roundPrice(Math.max(open, close) + upperWick);
    const low = roundPrice(Math.min(open, close) - lowerWick);
    const totalRange = high - low;

    const burstMultiplier =
      index === 23 || index === 41 || index === 52 || index === 60 || index === 74
        ? 1.85
        : index % 13 === 0
          ? 1.35
          : 1;

    const volume = Math.round(
      (volumeBase + body * 4.2 + totalRange * 1.25 + noise() * 1_050) * burstMultiplier,
    );

    bars.push({
      time: (start + index * FIVE_MINUTES) as UTCTimestamp,
      open: roundPrice(open),
      high,
      low,
      close,
      volume,
    });
    previousClose = close;
  }

  const crashShapes: CrashShape[] = [
    { move: -180, upperWick: 210, lowerWick: 120, volume: 4_900 },
    { move: -520, upperWick: 105, lowerWick: 330, volume: 7_600 },
    { move: -1_180, upperWick: 84, lowerWick: 520, volume: 12_800 },
    { move: -2_260, upperWick: 72, lowerWick: 940, volume: 21_900 },
    { move: 780, upperWick: 690, lowerWick: 430, volume: 18_400 },
    { move: -3_520, upperWick: 320, lowerWick: 1_260, volume: 31_700 },
    { move: -4_980, upperWick: 190, lowerWick: 1_820, volume: 47_600 },
  ];

  crashShapes.forEach((shape, offset) => {
    const index = 77 + offset;
    const open = previousClose;
    const close = roundPrice(open + shape.move);
    const high = roundPrice(Math.max(open, close) + shape.upperWick);
    const low = roundPrice(Math.min(open, close) - shape.lowerWick);

    bars.push({
      time: (start + index * FIVE_MINUTES) as UTCTimestamp,
      open: roundPrice(open),
      high,
      low,
      close,
      volume: shape.volume,
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
  const body = Math.abs(bar.close - bar.open);
  const range = Math.max(bar.high - bar.low, 1);
  const conviction = Math.min(0.62, 0.2 + (body / range) * 0.42);

  return {
    time: bar.time,
    value: bar.volume,
    color:
      bar.close >= bar.open
        ? `rgba(57, 214, 190, ${conviction.toFixed(2)})`
        : `rgba(255, 73, 102, ${conviction.toFixed(2)})`,
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
