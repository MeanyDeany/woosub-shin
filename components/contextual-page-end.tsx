"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { latestBuildLog } from "@/lib/public-progress";

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#17243D] px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(39,66,109,0.20)] transition-transform hover:-translate-y-0.5 hover:bg-[#22375B]";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#7187AB]/24 bg-white/58 px-6 text-sm font-semibold text-[#24324A] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-[#2580D8]/45 hover:bg-white/82";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ContextualPageEnd() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <section className="border-t border-[#6880A8]/12 bg-white/20 backdrop-blur-sm">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#1677D2]">Latest build</p>
            <h2 className="mt-4 max-w-[66rem] text-[clamp(2.8rem,7vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#111A2E]">
              Show the increments, not just the ambition.
            </h2>
            <p className="mt-7 max-w-[52rem] text-lg leading-8 text-[#657189] sm:text-xl">
              The public record separates completed engineering, supported claims, and the limits that remain.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/build-log" className={primaryButton}>
              Open the build log
              <Arrow />
            </Link>
            <Link href="/projects/multi-asset-research-lab/claims" className={secondaryButton}>
              Read the claims ledger
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {latestBuildLog.map((entry, index) => (
            <article
              key={`${entry.date}-${entry.title}`}
              className="glass-panel flex min-h-[26rem] flex-col rounded-[2rem] p-7 sm:p-9"
            >
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em] text-[#77839A]">
                <span>{entry.phase}</span>
                <span className="font-mono text-[#2563C9]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-7 text-sm font-semibold text-[#1677D2]">{entry.date}</p>
              <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#111A2E]">
                {entry.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-[#657189]">{entry.summary}</p>
              <p className="mt-auto border-l-2 border-[#D68A2A]/40 pl-4 pt-8 text-sm leading-6 text-[#5F6C82]">
                {entry.boundary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
