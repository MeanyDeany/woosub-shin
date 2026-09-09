import Link from "next/link";
import { type ReactNode } from "react";
import { ActiveNavigation } from "@/components/active-navigation";
import { ContextualPageTools } from "@/components/contextual-page-tools";
import { KoreanHonorificCopy } from "@/components/korean-honorific-copy";
import type { SiteLocale } from "@/components/language-switcher";
import { VisitorStats } from "@/components/visitor-stats";

type HeaderVariant = "default" | "showcase";
type ShellPresentation = { locale?: SiteLocale; variant?: HeaderVariant };

// Both legacy variants use the same accessible, theme-aware shell.
export function SiteHeader({ locale = "en" }: ShellPresentation) {
  return (
    <header className="research-header">
      <div className="research-header__inner">
        <Link href={locale === "ko" ? "/ko" : "/"} className="research-wordmark" aria-label={locale === "ko" ? "Woosub Shin — 홈" : "Woosub Shin — Home"}>
          Woosub Shin
        </Link>
        <ActiveNavigation locale={locale} />
      </div>
    </header>
  );
}

export function SiteFooter({ locale = "en" }: ShellPresentation) {
  const currentYear = new Date().getUTCFullYear();
  const korean = locale === "ko";

  return (
    <footer className="research-footer">
      <div className="research-footer__inner">
        <div className="research-footer__identity">
          <p className="research-footer__name">Woosub Shin</p>
          <p>{korean ? "정량 연구 · 금융계량경제학 · 재현 가능한 연구 엔지니어링" : "Quantitative research · Financial econometrics · Reproducible research engineering"}</p>
        </div>
        <nav aria-label={korean ? "하단 탐색" : "Footer navigation"} className="research-footer__links">
          <Link href={korean ? "/ko/research" : "/research"}>{korean ? "연구" : "Research"}</Link>
          <Link href={korean ? "/ko/projects" : "/projects"}>{korean ? "시스템" : "Systems"}</Link>
          <Link href="/resume">{korean ? "소개 · 이력서 (English)" : "About / Resume"}</Link>
          <Link href={korean ? "/ko/contact" : "/contact"}>{korean ? "연락" : "Contact"}</Link>
          <a href="mailto:woosub815@gmail.com">{korean ? "이메일" : "Email"}</a>
          <a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
        <div className="research-footer__record">
          <p>© {currentYear} Woosub Shin</p>
          <p><VisitorStats locale={locale} /></p>
          <p>{korean ? "연구 결과는 실거래 실적이 아닙니다" : "Research results are not a live track record"}</p>
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
    <div className="cosmic-page research-shell flex min-h-dvh flex-col" lang={locale}>
      <a href="#main-content" className="skip-link research-skip-link">
        {korean ? "본문으로 건너뛰기" : "Skip to content"}
      </a>
      <SiteHeader locale={locale} variant={headerVariant} />
      <ContextualPageTools locale={locale} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {korean ? <KoreanHonorificCopy>{children}</KoreanHonorificCopy> : children}
      </main>
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
    <section className={`theme-section border-t ${className}`}>
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
  return <div className={`glass-panel rounded-md p-6 ${className}`}>{children}</div>;
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
        <li key={item} className="glass-panel site-body rounded-md px-4 py-3 text-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}
