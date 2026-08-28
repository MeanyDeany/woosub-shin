import type { Metadata } from "next";
import Link from "next/link";
import { BtcLivePosition } from "@/components/btc-live-position";
import { PageShell } from "@/components/site-shell";
import { deriveBtcLivePositionFeedUrl } from "@/lib/btc-live-position";


export const metadata: Metadata = {
  title: "Live BTCUSDT Binance Position",
  description:
    "Sanitized authenticated read-only telemetry for the BTCUSDT Binance USD-M account position observed by the Systematic Execution Gateway.",
};

export default function LiveBtcPositionPage() {
  const feedUrl = deriveBtcLivePositionFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_LIVE_POSITION_URL,
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
              The portfolio can now show what the real Binance account is holding.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#B6C0CF]">
              This page renders a sanitized read-only projection produced on AWS from authenticated Binance USD-M USER_DATA. It exposes account state, not credentials, account size, or trading authority.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:py-14 lg:px-8">
          <BtcLivePosition feedUrl={feedUrl} locale="en" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Source", "Authenticated Binance USD-M read-only observation"],
              ["Refresh", "Public feed polls every 30 seconds"],
              ["Authority", "Observation only · external action disabled"],
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
