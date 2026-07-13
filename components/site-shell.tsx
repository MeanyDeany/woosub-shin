import Link from "next/link";
import type { ReactNode } from "react";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="relative z-50 border-b border-[#7E8B9D]/15 bg-[#07090D]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8 xl:px-10">
        <Link href="/" className="text-base font-semibold text-white">
          Woosub Shin
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#B6C0CF] transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#42D7F5]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#7E8B9D]/15 bg-[#07090D]">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-3 px-5 py-8 text-sm text-[#7E8B9D] sm:flex-row sm:items-center sm:justify-between lg:px-8 xl:px-10">
        <p>Research-only portfolio project. Not financial advice.</p>
        <p>Quant research, financial econometrics, and research infrastructure.</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#07090D] text-[#F4F7FB]">
      <SiteHeader />
      <main className="flex-1">{children}</main>
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
    <section className={`mx-auto max-w-6xl px-5 py-16 lg:px-8 ${className}`}>
      <div className="mb-8 max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-normal text-[#42D7F5]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">{title}</h2>
      </div>
      {children}
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
    <div className={`rounded-lg border border-[#7E8B9D]/15 bg-[#0E131C] p-6 ${className}`}>
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
          className="rounded-lg border border-[#7E8B9D]/15 bg-[#0B0F16] px-4 py-3 text-sm text-[#DCE3EC]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
