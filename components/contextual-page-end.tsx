"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { latestBuildLog } from "@/lib/public-progress";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ContextualPageEnd() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <section className="border-t border-white/8 bg-[#080C13] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-[#58D9FF]">Build record</p>
            <h2 className="mt-3 max-w-[34rem] text-[clamp(2.2rem,4.2vw,4.3rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#F5F8FC]">
              Show the increments.
            </h2>
            <p className="mt-5 max-w-[30rem] text-base leading-7 text-[#93A0B4]">
              The public log records what changed, what the evidence supports, and what still remains outside the claim.
            </p>
            <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold">
              <Link href="/build-log" className="inline-flex items-center gap-2 text-[#58D9FF] hover:text-[#86E6FA]">
                Full build log <Arrow />
              </Link>
              <Link
                href="/projects/multi-asset-research-lab/claims"
                className="inline-flex items-center gap-2 text-[#9BA8BA] hover:text-white"
              >
                Claims ledger <Arrow />
              </Link>
            </div>
          </div>

          <ol className="divide-y divide-white/9 border-y border-white/9">
            {latestBuildLog.map((entry, index) => (
              <li
                key={`${entry.date}-${entry.title}`}
                className="grid gap-3 py-5 sm:grid-cols-[3rem_7rem_minmax(0,1fr)] sm:items-start sm:py-6"
              >
                <span className="font-mono text-xs text-[#58D9FF]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#76849A]">
                    {entry.phase}
                  </p>
                  <p className="mt-1 text-xs text-[#68768C]">{entry.date}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.025em] text-[#F5F8FC]">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#93A0B4]">{entry.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
