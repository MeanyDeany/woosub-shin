import type { Metadata } from "next";
import Link from "next/link";
import { BtcLivePosition } from "@/components/btc-live-position";
import { PageShell } from "@/components/site-shell";
import { deriveBtcLivePositionFeedUrl } from "@/lib/btc-live-position";


export const metadata: Metadata = {
  title: "실시간 BTCUSDT Binance 포지션",
  description:
    "Systematic Execution Gateway가 관측한 BTCUSDT Binance USD-M 실계정의 sanitized authenticated read-only telemetry.",
};

export default function KoreanLiveBtcPositionPage() {
  const feedUrl = deriveBtcLivePositionFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
  );

  return (
    <PageShell>
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
              실제 Binance 계정이 무엇을 보유하고 있는지 공개합니다.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#B6C0CF]">
              AWS에서 인증된 Binance USD-M USER_DATA를 read-only로 관측한 뒤 공개 가능한 필드만 잘라낸 페이지입니다. API 인증정보, 계정 규모, 정확한 포지션 수량, 주문 권한은 공개하지 않습니다.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:py-14 lg:px-8">
          <BtcLivePosition feedUrl={feedUrl} locale="ko" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Source", "인증된 Binance USD-M read-only 관측"],
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
