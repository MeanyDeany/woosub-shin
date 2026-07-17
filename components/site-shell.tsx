import Link from "next/link";
import type { ReactNode } from "react";
import { ActiveNavigation } from "@/components/active-navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07090D]/88 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[-0.02em] text-[#F5F5F7] transition-colors hover:text-white focus-visible:outline-none"
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
    <footer className="border-t border-white/[0.08] bg-[#07090D] text-[#F5F5F7]">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[-0.03em]">MeanyDeany</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#86868B]">
              Quantitative research infrastructure for market data, model validation,
              and decision control.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <a
              href="mailto:woosub815@gmail.com"
              className="text-[#A1A1A6] transition-colors hover:text-white focus-visible:outline-none"
            >
              Email
            </a>
            <a
              href="https://github.com/MeanyDeany"
              target="_blank"
              rel="noreferrer"
              className="text-[#A1A1A6] transition-colors hover:text-white focus-visible:outline-none"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-xs text-[#6E6E73] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} MeanyDeany</p>
          <p>Research only · No signals · No execution</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#07090D] text-[#F5F5F7]">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-[#F5F5F7] px-4 py-2 text-sm font-semibold text-[#1D1D1F] transition-transform focus:translate-y-0"
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
    <section className={`border-t border-[#7E8B9D]/12 bg-[#07090D] ${className}`}>
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-4xl">
          {eyebrow ? (
            <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#67DFF7]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.75rem]">
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
    <div className={`border border-[#7E8B9D]/16 bg-[#0E131C] p-6 ${className}`}>
      {children}
    </div>
  );
}

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="min-h-28">
      <p className="text-sm text-[#7E8B9D]">{label}</p>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
    </Card>
  );
}

export function BoundaryList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="border border-[#7E8B9D]/15 bg-[#0B0F16] px-4 py-3 text-sm text-[#DCE3EC]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
