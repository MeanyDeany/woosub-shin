import type { Metadata } from "next";
import Link from "next/link";
import { BtcLifetimePerformance } from "@/components/btc-lifetime-performance";
import { BtcLiveMultiPosition } from "@/components/btc-live-multi-position";
import { PageShell } from "@/components/site-shell";
import { deriveBtcLifetimePerformanceFeedUrl } from "@/lib/btc-lifetime-performance";
import { deriveBtcLiveMultiPositionFeedUrl } from "@/lib/btc-live-multi-position";

export const metadata: Metadata = {
  title: "실시간 Binance USD-M 포지션 및 성과",
  description:
    "Binance USD-M 전체 오픈 포지션 read-only 텔레메트리와 2026년 8월 1일 이후 계정 전체 입출금 조정 트레이딩 성과.",
};

export default function KoreanLiveBtcPositionPage() {
  const positionFeedUrl = deriveBtcLiveMultiPositionFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_MULTI_POSITION_URL,
  );
  const performanceFeedUrl = deriveBtcLifetimePerformanceFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_LIFETIME_PERFORMANCE_URL,
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
              Binance USD-M 전체 오픈 포지션과 입출금 조정 트레이딩 성과를 공개합니다.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#B6C0CF]">
              하나의 인증된 Binance USD-M read-only 관측에서 공개 가능한 필드만 표시합니다. 포지션은 계정의 모든 non-zero 종목을 동적으로 포함합니다. 성과는 2026년 8월 1일부터 계산하며 입금·출금·내부이체·비거래 보상을 트레이딩 손익에서 제외합니다.
            </p>
            <div className="mt-6 max-w-3xl rounded-xl border border-[#3DDC97]/25 bg-[#3DDC97]/8 px-5 py-4">
              <p className="font-mono text-xs font-semibold text-[#7CF0B9]">
                ACCOUNT SCOPE · ALL NON-ZERO USD-M POSITIONS
              </p>
              <p className="mt-2 text-sm leading-6 text-[#B6C0CF]">
                새로운 USD-M 종목도 코드 변경 없이 canonical order로 자동 표시합니다. 정확한 포지션 수량, 명목가치, 가격, 종목별 PnL, 마진, 잔고, 주문 식별자, 인증정보, 주문 권한은 공개하지 않습니다. 현재 미실현손익은 별도 성과 피드에서 계정 전체 합계만 공개합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:py-14 lg:px-8">
          <BtcLiveMultiPosition feedUrl={positionFeedUrl} locale="ko" />

          <div className="mt-6">
            <BtcLifetimePerformance feedUrl={performanceFeedUrl} locale="ko" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Scope", "Binance USD-M 전체 non-zero 포지션 · 계정 전체 트레이딩 성과"],
              ["Refresh", "공개 피드 30초 polling"],
              ["Authority", "관측/성과 표시 전용 · external action disabled"],
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
