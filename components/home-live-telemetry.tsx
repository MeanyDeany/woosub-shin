import Link from "next/link";
import { BtcLifetimePerformance } from "@/components/btc-lifetime-performance";
import { BtcLiveMultiPosition } from "@/components/btc-live-multi-position";
import { deriveBtcLifetimePerformanceFeedUrl } from "@/lib/btc-lifetime-performance";
import { deriveBtcLiveMultiPositionFeedUrl } from "@/lib/btc-live-multi-position";

type Locale = "en" | "ko";

const copy = {
  en: {
    eyebrow: "Live system telemetry",
    title: "See the running system before the backtest.",
    description:
      "Sanitized read-only Binance USD-M telemetry is refreshed every 30 seconds. Every non-zero open position sits beside flow-adjusted trading performance since August 1, 2026, while exact size, prices, balances, credentials, and execution authority stay private.",
    link: "Open full telemetry",
    badges: [
      "Read-only public projection",
      "30s polling",
      "Performance telemetry only",
      "External action disabled",
    ],
  },
  ko: {
    eyebrow: "Live system telemetry",
    title: "백테스트보다 먼저, 지금 시스템이 어떻게 관측되고 있는지 보여드립니다.",
    description:
      "인증된 read-only Binance USD-M 공개 텔레메트리를 30초마다 갱신합니다. 모든 non-zero 오픈 포지션과 2026년 8월 1일 이후의 입출금 조정 트레이딩 성과를 공개하며, 정확한 수량·가격·잔고·인증정보·주문 권한은 공개하지 않습니다.",
    link: "전체 텔레메트리 보기",
    badges: [
      "Read-only public projection",
      "30초 polling",
      "Performance telemetry only",
      "External action disabled",
    ],
  },
} as const;

export function HomeLiveTelemetry({ locale = "en" }: { locale?: Locale }) {
  const text = copy[locale];
  const positionFeedUrl = deriveBtcLiveMultiPositionFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_MULTI_POSITION_URL,
  );
  const performanceFeedUrl = deriveBtcLifetimePerformanceFeedUrl(
    process.env.NEXT_PUBLIC_BTC_RESEARCH_OBSERVATORY_URL,
    process.env.NEXT_PUBLIC_BTC_LIFETIME_PERFORMANCE_URL,
  );
  const detailHref =
    locale === "ko"
      ? "/ko/projects/btc-futures-research/live-position"
      : "/projects/btc-futures-research/live-position";

  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-[#070A11] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-[#58D9FF]/[0.055] blur-3xl"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-[0.67rem] font-semibold uppercase tracking-[0.17em] text-[#58D9FF]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/45" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </span>
              <span>{text.eyebrow}</span>
            </div>
            <h2 className="mt-4 max-w-[64rem] text-[clamp(2.6rem,5.4vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#F5F8FC]">
              {text.title}
            </h2>
          </div>
          <div className="max-w-[36rem]">
            <p className="text-sm leading-7 text-[#93A0B4] sm:text-base">
              {text.description}
            </p>
            <Link
              href={detailHref}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#58D9FF] transition-colors hover:text-[#86E6FA]"
            >
              {text.link}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-2 xl:items-start">
          <BtcLifetimePerformance feedUrl={performanceFeedUrl} locale={locale} />
          <BtcLiveMultiPosition feedUrl={positionFeedUrl} locale={locale} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {text.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/9 bg-white/[0.025] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[#7F8DA3]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
