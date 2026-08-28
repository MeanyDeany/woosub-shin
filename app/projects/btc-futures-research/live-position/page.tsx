import type { Metadata } from "next";
import Link from "next/link";
import { BtcLifetimePerformance } from "@/components/btc-lifetime-performance";
import { BtcLiveMultiPosition } from "@/components/btc-live-multi-position";
import { PageShell } from "@/components/site-shell";
import { deriveBtcLifetimePerformanceFeedUrl } from "@/lib/btc-lifetime-performance";
import { deriveBtcLiveMultiPositionFeedUrl } from "@/lib/btc-live-multi-position";

export const metadata: Metadata = {
  title: "Live BTC Binance USD-M Positions",
  description:
    "Sanitized authenticated read-only BTCUSDT and BTCUSDC Binance USD-M position telemetry with tracked lifetime system PnL and return.",
};

export default function LiveBtcPositionPage() {
  const positionFeedUrl = deriveBtcLiveMultiPositionFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_MULTI_POSITION_URL,
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
              BTCUSDT and BTCUSDC position state with tracked lifetime performance.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#B6C0CF]">
              This page renders sanitized public projections produced from one authenticated Binance USD-M read-only observation. Position telemetry covers exactly BTCUSDT and BTCUSDC. Performance reporting is limited to Lifetime PnL and Lifetime Return since the frozen public-tracking start.
            </p>
            <div className="mt-6 max-w-3xl rounded-xl border border-[#3DDC97]/25 bg-[#3DDC97]/8 px-5 py-4">
              <p className="font-mono text-xs font-semibold text-[#7CF0B9]">CONTRACT SCOPE · BTCUSDT + BTCUSDC</p>
              <p className="mt-2 text-sm leading-6 text-[#B6C0CF]">
                Both supported BTC USD-M contracts are shown in canonical order. Exact position size, entry price, mark price, liquidation price, current unrealized PnL, account balances, credentials, and order authority remain excluded.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:py-14 lg:px-8">
          <BtcLiveMultiPosition feedUrl={positionFeedUrl} locale="en" />

          <div className="mt-6">
            <BtcLifetimePerformance feedUrl={performanceFeedUrl} locale="en" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Scope", "BTCUSDT + BTCUSDC positions · lifetime performance tracked separately"],
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
