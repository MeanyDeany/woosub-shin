import Link from "next/link";
import type { ReactNode } from "react";
import { ActiveNavigation } from "@/components/active-navigation";

export function SiteHeader() {
  return (
    <header className="relative z-50 border-b border-[#7E8B9D]/18 bg-[#07090D]/96 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link
          href="/"
          className="group flex w-fit flex-col gap-1 focus-visible:outline-none sm:flex-row sm:items-baseline sm:gap-3"
        >
          <span className="text-base font-semibold tracking-[-0.02em] text-[#F4F7FB] group-hover:text-white">
            MeanyDeany
          </span>
          <span className="text-[0.61rem] font-medium uppercase tracking-[0.13em] text-[#6F7D90] sm:text-[0.66rem] sm:tracking-[0.14em]">
            Quantitative Research Systems
          </span>
        </Link>
        <div className="-mx-2 min-w-0 overflow-x-auto px-2 pb-0.5 lg:mx-0 lg:px-0">
          <ActiveNavigation />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-[#42D7F5]/20 bg-[#050608]">
      <div className="mx-auto max-w-[1320px] px-5 py-12 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.7fr_1.15fr]">
          <div>
            <p className="text-lg font-semibold tracking-[-0.025em] text-[#F4F7FB]">
              MeanyDeany
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#8996A8]">
              A public quantitative research program in volatility, validation,
              and auditable evidence infrastructure.
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#67DFF7]">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:woosub815@gmail.com"
                  className="text-[#B6C0CF] underline decoration-[#475466] hover:text-white focus-visible:outline-none"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MeanyDeany"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B6C0CF] underline decoration-[#475466] hover:text-white focus-visible:outline-none"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#FFC56F]">
              Research boundary
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#8996A8]">
              Research-only public program. No trading signals, execution services, or
              investment advice.
            </p>
          </div>
        </div>
        <p className="mt-12 border-t border-[#7E8B9D]/12 pt-5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#566274]">
          © {currentYear} MeanyDeany · Public research program
        </p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#07090D] text-[#F4F7FB]">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-24 bg-[#42D7F5] px-4 py-2 text-sm font-semibold text-[#061016] transition-transform focus:translate-y-0"
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
