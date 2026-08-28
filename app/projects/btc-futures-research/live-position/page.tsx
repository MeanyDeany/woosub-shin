import type { Metadata } from "next";
import Link from "next/link";
import { BtcLifetimePerformance } from "@/components/btc-lifetime-performance";
import { BtcLivePosition } from "@/components/btc-live-position";
import { PageShell } from "@/components/site-shell";
import { deriveBtcLifetimePerformanceFeedUrl } from "@/lib/btc-lifetime-performance";
import { deriveBtcLivePositionFeedUrl } from "@/lib/btc-live-position";


export const metadata: Metadata = {
  title: "Live BTCUSDT Binance Position",
  description:
    "Sanitized authenticated read-only BTCUSDT Binance USD-M position telemetry with tracked lifetime system PnL and return.",
};

export default function LiveBtcPositionPage() {
  const feedUrl = deriveBtcLivePositionFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_LIVE_POSITION_URL,
  );
  const performanceFeedUrl = deriveBtcLifetimePerformanceFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_LIFETIME_PERFORMANCE_URL,
  );

  return (
    <PageShell>
      <main className="min-h-screen bg-[#050608]">
        <section className="border-b border-[#7E8B9D]/12 bg-[#07090D]">
          <div className="mx-auto max-w-[1180px] px-5 py-12 sm:py-16 lg:px-8">
            <Link
              href="/projects/btc-futures-research"
              className="text-xs font-semibold uppercase tracking-[0.1em] text-[#42D7F5] hover:text-[#8CEBFF]"
            >
              ← BTC research system
            </Link>
            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42D7F5]">
              Public execution-side observation
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#F4F7FB] sm:text-5xl">
              Live read-only position state and tracked lifetime performance.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#B6C0CF]">
              This page renders sanitized public projections produced from authenticated Binance USD-M observations. Position telemetry remains read-only, while performance reporting is limited to cumulative PnL and cumulative return since the frozen public-tracking start.
            </p>
            <div className="mt-6 max-w-3xl rounded-xl border border-[#FFB547]/25 bg-[#FFB547]/8 px-5 py-4">
              <p className="font-mono text-xs font-semibold text-[#FFD08A]">CONTRACT SCOPE · BTCUSDT ONLY</p>
              <p className="mt-2 text-sm leading-6 text-[#B6C0CF]">
                BTCUSDC positions are not included in the current V1 position feed yet. A FLAT state here means BTCUSDT is flat; it does not mean the account has no BTC futures exposure elsewhere. Lifetime performance is a separate tracked metric and does not reveal current position size, entry price, or unrealized PnL.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:py-14 lg:px-8">
          <BtcLivePosition feedUrl={feedUrl} locale="en" />

          <div className="mt-6">
            <BtcLifetimePerformance feedUrl={performanceFeedUrl} locale="en" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Scope", "BTCUSDT position feed · lifetime performance tracked separately"],
              ["Refresh", "Public feeds poll every 30 seconds"],
              ["Authority", "Observation/performance only · external action disabled"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[#7E8B9D]/12 bg-[#080B11] p-5">
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#7E8B9D]">{label}</p>
                <p className="mt-3 text-sm leading-6 text-[#B6C0CF]">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
