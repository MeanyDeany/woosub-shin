import Link from "next/link";
import type { ReactNode } from "react";
import { ActiveNavigation } from "@/components/active-navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#6880A8]/15 bg-white/65 shadow-[0_10px_40px_rgba(68,94,140,0.06)] backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[-0.02em] text-[#111A2E] transition-colors hover:text-[#1677D2] focus-visible:outline-none"
        >
          MeanyDeany
        </Link>
        <div className="-mr-2 min-w-0 overflow-x-auto pr-2">
          <ActiveNavigation />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-[#6880A8]/15 bg-white/55 text-[#111A2E] backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[-0.03em]">MeanyDeany</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#68748A]">
              Quantitative research infrastructure for market data, model validation,
              and decision control.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <a
              href="mailto:woosub815@gmail.com"
              className="text-[#68748A] transition-colors hover:text-[#1677D2] focus-visible:outline-none"
            >
              Email
            </a>
            <a
              href="https://github.com/MeanyDeany"
              target="_blank"
              rel="noreferrer"
              className="text-[#68748A] transition-colors hover:text-[#1677D2] focus-visible:outline-none"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-[#6880A8]/15 pt-5 text-xs text-[#7A869A] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} MeanyDeany</p>
          <p>Research only · No signals · No execution</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="cosmic-page flex min-h-dvh flex-col bg-transparent text-[#111A2E]">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-[#111A2E] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
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
    <section className={`border-t border-[#6880A8]/15 bg-white/25 backdrop-blur-sm ${className}`}>
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-4xl">
          {eyebrow ? (
            <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#1677D2]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#111A2E] sm:text-4xl lg:text-[2.75rem]">
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
  return (
    <div className={`glass-panel rounded-[1.5rem] p-6 ${className}`}>
      {children}
    </div>
  );
}

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="min-h-28">
      <p className="text-sm text-[#718096]">{label}</p>
      <p className="mt-3 text-xl font-semibold text-[#111A2E]">{value}</p>
    </Card>
  );
}

export function BoundaryList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="glass-panel rounded-2xl px-4 py-3 text-sm text-[#35435A]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}