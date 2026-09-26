import Link from "next/link";
import { type ReactNode } from "react";
import { ActiveNavigation } from "@/components/active-navigation";
import { ContextualPageTools } from "@/components/contextual-page-tools";
import type { SiteLocale } from "@/lib/site-routes";
import { VisitorStats } from "@/components/visitor-stats";

type HeaderVariant = "default" | "showcase";

// Both legacy variants use the same accessible, theme-aware shell.
export function SiteHeader() {
  return (
    <header className="research-header">
      <div className="research-header__inner">
        <Link href="/" className="research-wordmark" aria-label="meanydeany / Home">
          meanydeany
        </Link>
        <ActiveNavigation />
      </div>
    </header>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="research-footer">
      <div className="research-footer__inner">
        <div className="research-footer__identity">
          <p className="research-footer__name">meanydeany</p>
          <p>Trader / Quantitative research / Market microstructure</p>
        </div>
        <nav aria-label="Footer navigation" className="research-footer__links">
          <Link href="/research">Research</Link>
          <Link href="/projects">Systems</Link>
          <Link href="/resume">About / Resume</Link>
          <Link href="/contact">Contact</Link>
          <a href="mailto:woosub815@gmail.com">Email</a>
          <a href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
        <div className="research-footer__record">
          <p>© {currentYear} meanydeany</p>
          <p><VisitorStats /></p>
          <p>Research results and account telemetry have separate scopes</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
}: {
  children: ReactNode;
  locale?: SiteLocale;
  headerVariant?: HeaderVariant;
}) {

  return (
    <div className="cosmic-page research-shell flex min-h-dvh flex-col" lang="en">
      <a href="#main-content" className="skip-link research-skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <ContextualPageTools />
      <main id="main-content" className="flex-1" tabIndex={-1}>
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
