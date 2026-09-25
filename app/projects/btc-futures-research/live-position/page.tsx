import Link from "next/link";
import { metadataFor } from "@/lib/site-metadata";
import { PageShell } from "@/components/site-shell";
import { BtcTradingDesk } from "@/components/btc-trading-desk";
import { deriveBtcLifetimePerformanceFeedUrl } from "@/lib/btc-lifetime-performance";
import { deriveBtcLiveMultiPositionFeedUrl } from "@/lib/btc-live-multi-position";
import { deriveBtcRollingPerformanceFeedUrl } from "@/lib/btc-rolling-performance";
import { deriveBtcDailyPerformanceFeedUrl } from "@/lib/btc-daily-performance";

export const metadata = metadataFor(
  "/projects/btc-futures-research/live-position",
  "Positions, Performance & Daily Journal",
  "Read-only Binance USD-M positions and flow-adjusted account performance since August 1, 2026, including a public UTC daily performance calendar. Personal trading notes remain browser-local.",
);

export default function LiveBtcPositionPage() {
  return <PageShell><div style={{ minHeight: "100vh", background: "#090c10" }}>
    <Link className="td-page-back" href="/projects/btc-futures-research">← BTC research system</Link>
    <BtcTradingDesk
      positionFeedUrl={deriveBtcLiveMultiPositionFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_MULTI_POSITION_URL)}
      performanceFeedUrl={deriveBtcLifetimePerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_LIFETIME_PERFORMANCE_URL)}
      rollingFeedUrl={deriveBtcRollingPerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_ROLLING_PERFORMANCE_URL)}
      dailyFeedUrl={deriveBtcDailyPerformanceFeedUrl(process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL, process.env.NEXT_PUBLIC_BTC_DAILY_PERFORMANCE_URL)}
    />
  </div></PageShell>;
}
