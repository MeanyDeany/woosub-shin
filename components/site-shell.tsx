import Link from "next/link";
import type { ReactNode } from "react";
import { ActiveNavigation } from "@/components/active-navigation";
import { ContextualPageEnd } from "@/components/contextual-page-end";
import { ContextualPageTools } from "@/components/contextual-page-tools";
import { KoreanHonorificCopy } from "@/components/korean-honorific-copy";
import type { SiteLocale } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { VisitorStats } from "@/components/visitor-stats";

type HeaderVariant = "default" | "showcase";

export function SiteHeader({
  locale = "en",
  variant = "default",
}: {
  locale?: SiteLocale;
  variant?: HeaderVariant;
}) {
  const homeHref = locale === "ko" ? "/ko" : "/";
  const showcase = variant === "showcase";

  return (
    <header
      className={
        showcase
          ? "sticky top-0 z-50 border-b border-white/8 bg-[#05070D]/92 text-white shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          : "site-header sticky top-0 z-50 backdrop-blur-2xl"
      }
    >
      <div className="site-header__inner mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          href={homeHref}
          className={
            showcase
              ? "text-sm font-semibold tracking-[-0.02em] text-white transition-colors hover:text-[#58D9FF]"
              : "site-brand text-sm font-semibold tracking-[-0.02em] transition-colors"
          }
        >
          MeanyDeany
        </Link>
        <div className="site-header__actions flex min-w-0 items-center gap-2 sm:gap-4">
          <div className="header-navigation-wrap min-w-0">
            <ActiveNavigation locale={locale} showcase={showcase} />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({
  locale = "en",
  variant = "default",
}: {
  locale?: SiteLocale;
  variant?: HeaderVariant;
}) {
  const currentYear = new Date().getUTCFullYear();
  const korean = locale === "ko";
  const showcase = variant === "showcase";

  if (showcase) {
    return (
      <footer className="border-t border-white/8 bg-[#05070D] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-lg font-semibold tracking-[-0.03em] text-[#F5F8FC]">MeanyDeany</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#8290A8]">
                {korean
                  ? "시장 데이터, 모델 검증, 의사결정 통제를 위한 정량 연구 인프라."
                  : "Quantitative research infrastructure for market data, model validation, and decision control."}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              <Link href={korean ? "/ko/build-log" : "/build-log"} className="text-[#AAB6C7] transition-colors hover:text-[#58D9FF]">
                {korean ? "빌드 로그" : "Build log"}
              </Link>
              <Link
                href={
                  korean
                    ? "/ko/projects/multi-asset-research-lab/claims"
                    : "/projects/multi-asset-research-lab/claims"
                }
                className="text-[#AAB6C7] transition-colors hover:text-[#58D9FF]"
              >
                {korean ? "주장 장부" : "Claims ledger"}
              </Link>
              <a
                href="mailto:woosub815@gmail.com"
                className="text-[#AAB6C7] transition-colors hover:text-[#58D9FF]"
              >
                {korean ? "이메일" : "Email"}
              </a>
              <a
                href="https://github.com/MeanyDeany"
                target="_blank"
                rel="noreferrer"
                className="text-[#AAB6C7] transition-colors hover:text-[#58D9FF]"
              >
                GitHub ↗
              </a>
            </div>
          </div>
          <div className="mt-10 grid gap-3 border-t border-white/8 pt-5 text-xs text-[#69778D] sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <p>© {currentYear} MeanyDeany</p>
            <p className="sm:justify-self-center">
              <VisitorStats locale={locale} />
            </p>
            <p className="sm:justify-self-end">
              {korean ? "연구 전용 · 신호 없음 · 실행 없음" : "Research only · No signals · No execution"}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="site-strong text-lg font-semibold tracking-[-0.03em]">MeanyDeany</p>
            <p className="site-muted mt-3 max-w-xl text-sm leading-6">
              {korean
                ? "시장 데이터, 모델 검증, 의사결정 통제를 위한 정량 연구 인프라."
                : "Quantitative research infrastructure for market data, model validation, and decision control."}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <Link href={korean ? "/ko/build-log" : "/build-log"} className="site-link transition-colors">
              {korean ? "빌드 로그" : "Build log"}
            </Link>
            <Link
              href={
                korean
                  ? "/ko/projects/multi-asset-research-lab/claims"
                  : "/projects/multi-asset-research-lab/claims"
              }
              className="site-link transition-colors"
            >
              {korean ? "주장 장부" : "Claims ledger"}
            </Link>
            <a
              href="mailto:woosub815@gmail.com"
              className="site-link transition-colors"
            >
              {korean ? "이메일" : "Email"}
            </a>
            <a
              href="https://github.com/MeanyDeany"
              target="_blank"
              rel="noreferrer"
              className="site-link transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="site-footer-rule site-muted mt-10 grid gap-3 border-t pt-5 text-xs sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <p>© {currentYear} MeanyDeany</p>
          <p className="sm:justify-self-center">
            <VisitorStats locale={locale} />
          </p>
          <p className="sm:justify-self-end">
            {korean ? "연구 전용 · 신호 없음 · 실행 없음" : "Research only · No signals · No execution"}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
  locale = "en",
  headerVariant = "default",
}: {
  children: ReactNode;
  locale?: SiteLocale;
  headerVariant?: HeaderVariant;
}) {
  const korean = locale === "ko";

  return (
    <div className="cosmic-page flex min-h-dvh flex-col" lang={locale}>
      <a
        href="#main-content"
        className="skip-link fixed left-4 top-3 z-[100] -translate-y-24 rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-transform focus:translate-y-0"
      >
        {korean ? "본문으로 건너뛰기" : "Skip to content"}
      </a>
      <SiteHeader locale={locale} variant={headerVariant} />
      <ContextualPageTools locale={locale} />
      <main id="main-content" className="flex-1">
        {korean ? <KoreanHonorificCopy>{children}</KoreanHonorificCopy> : children}
      </main>
      <ContextualPageEnd />
      <SiteFooter locale={locale} variant={headerVariant} />
    </div>
  );
}

export function PageSection({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`theme-section border-t backdrop-blur-sm ${className}`}>
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-4xl">
          {eyebrow ? (
            <p className="site-accent mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="site-strong text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`glass-panel rounded-[1.5rem] p-6 ${className}`}>{children}</div>;
}

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="min-h-28">
      <p className="site-muted text-sm">{label}</p>
      <p className="site-strong mt-3 text-xl font-semibold">{value}</p>
    </Card>
  );
}

export function BoundaryList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="glass-panel site-body rounded-2xl px-4 py-3 text-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}
