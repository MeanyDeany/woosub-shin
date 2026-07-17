import Link from "next/link";
import type { ReactNode } from "react";
import { ActiveNavigation } from "@/components/active-navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="site-brand text-sm font-semibold tracking-[-0.02em] transition-colors focus-visible:outline-none"
        >
          MeanyDeany
        </Link>
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <div className="min-w-0 overflow-x-auto">
            <ActiveNavigation />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="site-footer backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="site-strong text-lg font-semibold tracking-[-0.03em]">MeanyDeany</p>
            <p className="site-muted mt-3 max-w-xl text-sm leading-6">
              Quantitative research infrastructure for market data, model validation,
              and decision control.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <a
              href="mailto:woosub815@gmail.com"
              className="site-link transition-colors focus-visible:outline-none"
            >
              Email
            </a>
            <a
              href="https://github.com/MeanyDeany"
              target="_blank"
              rel="noreferrer"
              className="site-link transition-colors focus-visible:outline-none"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="site-footer-rule site-muted mt-10 flex flex-col gap-3 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} MeanyDeany</p>
          <p>Research only · No signals · No execution</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="cosmic-page flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="skip-link fixed left-4 top-3 z-[100] -translate-y-24 rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
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
