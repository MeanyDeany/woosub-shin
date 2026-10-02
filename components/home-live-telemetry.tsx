import { BtcTradingDesk } from "@/components/btc-trading-desk";
import { deriveBtcLifetimePerformanceFeedUrl } from "@/lib/btc-lifetime-performance";
import { deriveBtcLiveMultiPositionFeedUrl } from "@/lib/btc-live-multi-position";
import { deriveBtcRollingPerformanceFeedUrl } from "@/lib/btc-rolling-performance";
import { deriveBtcDailyPerformanceFeedUrl } from "@/lib/btc-daily-performance";
import { deriveBtcTradeDayWinRateFeedUrl } from "@/lib/btc-trade-day-win-rate";

export function HomeLiveTelemetry({ locale = "en" }: { locale?: "en" | "ko" }) {
  // Retain the caller contract; public Korean routes currently redirect to English.
  void locale;
  return (
    <section id="account-overview" className="td-live-surface">
      <BtcTradingDesk compact
        positionFeedUrl={deriveBtcLiveMultiPositionFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_MULTI_POSITION_URL)}
        performanceFeedUrl={deriveBtcLifetimePerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_LIFETIME_PERFORMANCE_URL)}
        rollingFeedUrl={deriveBtcRollingPerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_ROLLING_PERFORMANCE_URL)}
        dailyFeedUrl={deriveBtcDailyPerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_DAILY_PERFORMANCE_URL)}
        winRateFeedUrl={deriveBtcTradeDayWinRateFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_TRADE_DAY_WIN_RATE_URL)}
      />
    </section>
  );
}
