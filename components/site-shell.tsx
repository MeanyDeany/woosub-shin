import Link from "next/link";
import type { ReactNode } from "react";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-neutral-950/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="text-base font-semibold text-white">
          Woosub Shin
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>Research-only portfolio project. Not financial advice.</p>
        <p>Quant research, financial econometrics, and research infrastructure.</p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-neutral-950 text-neutral-100">
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
    <section className={`mx-auto max-w-6xl px-5 py-14 lg:px-8 ${className}`}>
      <div className="mb-8 max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase text-emerald-300">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
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
    <div className={`rounded-lg border border-white/10 bg-white/[0.04] p-6 ${className}`}>
      {children}
    </div>
  );
}

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="min-h-28">
      <p className="text-sm text-neutral-400">{label}</p>
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
          className="rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-200"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
