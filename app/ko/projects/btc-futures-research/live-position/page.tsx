import type { Metadata } from "next";
import Link from "next/link";
import { BtcLivePosition } from "@/components/btc-live-position";
import { PageShell } from "@/components/site-shell";
import { deriveBtcLivePositionFeedUrl } from "@/lib/btc-live-position";


export const metadata: Metadata = {
  title: "실시간 BTCUSDT Binance 포지션",
  description:
    "Systematic Execution Gateway가 관측한 BTCUSDT Binance USD-M 계약의 sanitized authenticated read-only telemetry.",
};

export default function KoreanLiveBtcPositionPage() {
  const feedUrl = deriveBtcLivePositionFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_LIVE_POSITION_URL,
  );

  return (
    <PageShell locale="ko">
      <main className="min-h-screen bg-[#050608]">
        <section className="border-b border-[#7E8B9D]/12 bg-[#07090D]">
          <div className="mx-auto max-w-[1180px] px-5 py-12 sm:py-16 lg:px-8">
            <Link
              href="/ko/projects/btc-futures-research"
              className="text-xs font-semibold uppercase tracking-[0.1em] text-[#42D7F5] hover:text-[#8CEBFF]"
            >
              ← BTC 연구 시스템
            </Link>
            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42D7F5]">
              Public execution-side observation
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#F4F7FB] sm:text-5xl">
              BTCUSDT 선물 계약의 실계정 상태를 read-only로 공개합니다.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#B6C0CF]">
              AWS에서 인증된 Binance USD-M USER_DATA를 read-only로 관측한 뒤 공개 가능한 필드만 표시합니다. 이 페이지는 Binance 계정 전체가 아니라 BTCUSDT 계약만 보여줍니다.
            </p>
            <div className="mt-6 max-w-3xl rounded-xl border border-[#FFB547]/25 bg-[#FFB547]/8 px-5 py-4">
              <p className="font-mono text-xs font-semibold text-[#FFD08A]">CONTRACT SCOPE · BTCUSDT ONLY</p>
              <p className="mt-2 text-sm leading-6 text-[#B6C0CF]">
                현재 V1 공개 피드에는 BTCUSDC 포지션이 포함되지 않습니다. 여기서 FLAT은 BTCUSDT가 FLAT이라는 뜻이며, 계정의 다른 BTC 선물 노출까지 없다는 뜻은 아닙니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:py-14 lg:px-8">
          <BtcLivePosition feedUrl={feedUrl} locale="ko" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Scope", "BTCUSDT 계약만 표시 · BTCUSDC 미포함"],
              ["Refresh", "공개 피드 30초 polling"],
              ["Authority", "관측 전용 · external action disabled"],
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
