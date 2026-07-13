import Link from "next/link";
import { ProvenanceBadge } from "@/components/provenance-badge";

function Arrow() {
  return (
    <div aria-hidden="true" className="py-2 text-center text-neutral-600">
      ↓
    </div>
  );
}

export function MultiAssetLineage() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["NQ Futures", "Academic thesis research"],
          ["ES Futures", "Academic thesis research"],
        ].map(([asset, context]) => (
          <Link
            key={asset}
            href="/projects/volatility-regime-filtering"
            className="rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-semibold text-white">{asset}</span>
              <ProvenanceBadge provenance="academic-context" />
            </span>
            <span className="mt-1 block text-sm text-neutral-400">{context}</span>
          </Link>
        ))}
      </div>
      <Arrow />
      <div className="rounded-lg border border-cyan-300/25 bg-cyan-300/[0.04] px-5 py-4 text-center">
        <p className="font-semibold text-white">Volatility Research Foundation</p>
        <p className="mt-1 text-sm text-neutral-400">Academic and methodological foundation</p>
      </div>
      <Arrow />
      <div className="rounded-lg border border-emerald-300/30 bg-emerald-300/[0.05] px-5 py-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="font-semibold text-white">BTCUSDT Research Infrastructure</p>
          <ProvenanceBadge provenance="current-static-snapshot" />
        </div>
        <p className="mt-2 text-sm text-neutral-400">Current forecast-evidence operations</p>
      </div>
      <Arrow />
      <div className="rounded-lg border border-white/10 px-5 py-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="font-semibold text-white">Unified Multi-Asset Framework</p>
          <ProvenanceBadge provenance="planned-research" />
        </div>
        <p className="mt-2 text-sm text-neutral-400">Long-term architecture objective</p>
      </div>
      <Arrow />
      <div className="rounded-lg border border-dashed border-amber-300/30 px-5 py-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="font-semibold text-white">Gold Futures Generalization</p>
          <ProvenanceBadge provenance="planned-research" />
        </div>
        <p className="mt-2 text-sm text-neutral-400">Planned commodity research; not operational</p>
      </div>
      <p className="mt-6 max-w-5xl text-sm leading-7 text-neutral-400">
        NQ and ES established the academic foundation for volatility-regime research.
        BTCUSDT currently hosts the operational forecast-evidence infrastructure. Gold
        futures are a planned commodity generalization asset. The long-term objective
        is a unified multi-asset research and automation framework.
      </p>
    </div>
  );
}
