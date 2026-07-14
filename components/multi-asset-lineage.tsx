import Link from "next/link";
import { ProvenanceBadge } from "@/components/provenance-badge";

function ProgressArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex h-8 items-center justify-center text-[#475466] lg:h-auto lg:min-w-8"
    >
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">→</span>
    </div>
  );
}

export function MultiAssetLineage() {
  return (
    <div>
      <div className="grid items-stretch lg:grid-cols-[1.1fr_auto_0.9fr_auto_1.1fr_auto_1fr]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            ["NQ Futures", "Academic thesis research"],
            ["ES Futures", "Academic thesis research"],
          ].map(([asset, context]) => (
            <Link
              key={asset}
              href="/projects/volatility-regime-filtering"
              className="rounded-lg border border-[#4D8DFF]/25 bg-[#0E131C] px-5 py-4 transition hover:border-[#4D8DFF]/55 focus:outline-none focus:ring-2 focus:ring-[#42D7F5]"
            >
              <span className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-semibold text-white">{asset}</span>
                <ProvenanceBadge provenance="academic-context" />
              </span>
              <span className="mt-2 block text-sm text-[#7E8B9D]">{context}</span>
            </Link>
          ))}
        </div>

        <ProgressArrow />

        <div className="flex min-h-32 flex-col justify-center rounded-lg border border-[#42D7F5]/25 bg-[#42D7F5]/[0.04] px-5 py-5">
          <p className="font-semibold text-white">Volatility Research Foundation</p>
          <p className="mt-2 text-sm leading-6 text-[#7E8B9D]">
            Academic and methodological foundation
          </p>
        </div>

        <ProgressArrow />

        <div className="flex min-h-32 flex-col justify-center rounded-lg border border-[#3DDC97]/35 bg-[#3DDC97]/[0.04] px-5 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-semibold text-white">BTCUSDT Research Infrastructure</p>
            <ProvenanceBadge provenance="current-static-snapshot" />
          </div>
          <p className="mt-2 text-sm leading-6 text-[#7E8B9D]">
            Initial public forecast-evidence baseline
          </p>
        </div>

        <ProgressArrow />

        <div className="grid gap-3">
          <div className="rounded-lg border border-[#FFB547]/25 bg-[#FFB547]/[0.03] px-5 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold text-white">Unified Multi-Asset Framework</p>
              <ProvenanceBadge provenance="planned-research" />
            </div>
            <p className="mt-2 text-sm text-[#7E8B9D]">Long-term architecture objective</p>
          </div>
          <div className="rounded-lg border border-dashed border-[#FFB547]/35 px-5 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold text-white">Gold Futures Generalization</p>
              <ProvenanceBadge provenance="planned-research" />
            </div>
            <p className="mt-2 text-sm text-[#7E8B9D]">
              Planned commodity research; not operational
            </p>
          </div>
        </div>
      </div>
      <p className="mt-7 max-w-5xl text-sm leading-7 text-[#7E8B9D]">
        NQ and ES established the academic foundation for volatility-regime research.
        The public BTCUSDT showcase documents an initial forecast-evidence infrastructure
        baseline. Gold futures are a planned commodity generalization asset. The
        long-term objective is a unified multi-asset research and automation framework.
      </p>
    </div>
  );
}
