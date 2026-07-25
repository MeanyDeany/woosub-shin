import type {
  BtcResearchBar,
  BtcResearchMark,
  BtcResearchObservatoryBundle,
} from "@/lib/btc-research-observatory";

export type TradingViewBar = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type PeriodParams = {
  from: number;
  to: number;
  countBack: number;
  firstDataRequest: boolean;
};

type SymbolInfo = {
  name: string;
  ticker: string;
  description: string;
  type: string;
  session: string;
  timezone: string;
  exchange: string;
  listed_exchange: string;
  format: string;
  pricescale: number;
  minmov: number;
  has_intraday: boolean;
  has_daily: boolean;
  has_weekly_and_monthly: boolean;
  supported_resolutions: string[];
  volume_precision: number;
  data_status: string;
};

type SearchSymbolResult = {
  symbol: string;
  full_name: string;
  description: string;
  exchange: string;
  ticker: string;
  type: string;
};

type TradingViewMark = {
  id: string;
  time: number;
  color: string;
  text: string;
  label: string;
  labelFontColor: string;
  minSize: number;
};

type HistoryCallback = (
  bars: TradingViewBar[],
  meta: { noData: boolean },
) => void;

type ResolveCallback = (symbolInfo: SymbolInfo) => void;
type ErrorCallback = (message: string) => void;
type RealtimeCallback = (bar: TradingViewBar) => void;

type DatafeedConfiguration = {
  supported_resolutions: string[];
  supports_marks: boolean;
  supports_timescale_marks: boolean;
  supports_time: boolean;
  exchanges: Array<{ value: string; name: string; desc: string }>;
  symbols_types: Array<{ name: string; value: string }>;
};

const configuration: DatafeedConfiguration = {
  supported_resolutions: ["5"],
  supports_marks: true,
  supports_timescale_marks: false,
  supports_time: true,
  exchanges: [
    {
      value: "BINANCE_USDM_RESEARCH",
      name: "Binance USD-M public research source",
      desc: "Read-only server evidence",
    },
  ],
  symbols_types: [{ name: "Crypto futures research", value: "crypto" }],
};

const symbolInfo: SymbolInfo = {
  name: "BTCUSDT",
  ticker: "BTCUSDT",
  description: "BTCUSDT 5m server-authoritative research context",
  type: "crypto",
  session: "24x7",
  timezone: "Etc/UTC",
  exchange: "BINANCE_USDM_RESEARCH",
  listed_exchange: "BINANCE_USDM_RESEARCH",
  format: "price",
  pricescale: 100,
  minmov: 1,
  has_intraday: true,
  has_daily: false,
  has_weekly_and_monthly: false,
  supported_resolutions: ["5"],
  volume_precision: 4,
  data_status: "streaming",
};

function toTradingViewBar(bar: BtcResearchBar): TradingViewBar {
  return {
    time: bar.time_ms,
    open: bar.open,
    high: bar.high,
    low: bar.low,
    close: bar.close,
    volume: bar.volume,
  };
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

export class ObservatoryTradingViewDatafeed {
  private bundle: BtcResearchObservatoryBundle;
  private readonly subscribers = new Map<string, RealtimeCallback>();

  constructor(bundle: BtcResearchObservatoryBundle) {
    this.bundle = bundle;
  }

  updateBundle(bundle: BtcResearchObservatoryBundle): void {
    this.bundle = bundle;
    const latest = bundle.bars.at(-1);
    if (!latest) {
      return;
    }
    const realtimeBar = toTradingViewBar(latest);
    for (const callback of this.subscribers.values()) {
      callback(realtimeBar);
    }
  }

  onReady(callback: (config: DatafeedConfiguration) => void): void {
    window.setTimeout(() => callback(configuration), 0);
  }

  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: (results: SearchSymbolResult[]) => void,
  ): void {
    const query = userInput.trim().toUpperCase();
    const exchangeMatches = !exchange || exchange === symbolInfo.exchange;
    const typeMatches = !symbolType || symbolType === symbolInfo.type;
    const symbolMatches = !query || symbolInfo.ticker.includes(query);
    const results =
      exchangeMatches && typeMatches && symbolMatches
        ? [
            {
              symbol: symbolInfo.name,
              full_name: `${symbolInfo.exchange}:${symbolInfo.ticker}`,
              description: symbolInfo.description,
              exchange: symbolInfo.exchange,
              ticker: symbolInfo.ticker,
              type: symbolInfo.type,
            },
          ]
        : [];
    window.setTimeout(() => onResult(results), 0);
  }

  resolveSymbol(
    symbolName: string,
    onResolve: ResolveCallback,
    onError: ErrorCallback,
  ): void {
    if (symbolName !== "BTCUSDT" && !symbolName.endsWith(":BTCUSDT")) {
      window.setTimeout(() => onError("Unknown research symbol"), 0);
      return;
    }
    window.setTimeout(() => onResolve(symbolInfo), 0);
  }

  getBars(
    _symbol: SymbolInfo,
    resolution: string,
    periodParams: PeriodParams,
    onHistory: HistoryCallback,
    onError: ErrorCallback,
  ): void {
    if (resolution !== "5") {
      onError("Only the authoritative 5-minute interval is available");
      return;
    }
    try {
      const toMs = periodParams.to * 1_000;
      const fromMs = periodParams.from * 1_000;
      const available = this.bundle.bars.filter((bar) => bar.time_ms < toMs);
      let selected = available.filter((bar) => bar.time_ms >= fromMs);
      if (selected.length < periodParams.countBack) {
        selected = available.slice(-periodParams.countBack);
      }
      onHistory(selected.map(toTradingViewBar), { noData: selected.length === 0 });
    } catch (error) {
      onError(error instanceof Error ? error.message : "Unable to read research bars");
    }
  }

  subscribeBars(
    _symbol: SymbolInfo,
    resolution: string,
    onRealtime: RealtimeCallback,
    subscriberUid: string,
  ): void {
    if (resolution !== "5") {
      return;
    }
    this.subscribers.set(subscriberUid, onRealtime);
    const latest = this.bundle.bars.at(-1);
    if (latest) {
      onRealtime(toTradingViewBar(latest));
    }
  }

  unsubscribeBars(subscriberUid: string): void {
    this.subscribers.delete(subscriberUid);
  }

  getMarks(
    _symbol: SymbolInfo,
    from: number,
    to: number,
    onData: (marks: TradingViewMark[]) => void,
    _resolution: string,
  ): void {
    const marks = this.bundle.marks
      .filter((mark) => mark.time_ms >= from * 1_000 && mark.time_ms < to * 1_000)
      .map((mark) => ({
        id: mark.id,
        time: Math.floor(mark.time_ms / 1_000),
        color: markColor(mark),
        text: mark.title,
        label: mark.label,
        labelFontColor: "#050608",
        minSize: 18,
      }));
    window.setTimeout(() => onData(marks), 0);
  }

  getServerTime(callback: (unixTime: number) => void): void {
    const generated = Date.parse(this.bundle.generated_at_utc);
    callback(Math.floor(generated / 1_000));
  }
}
