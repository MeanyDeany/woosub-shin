import { ProvenanceBadge } from "@/components/provenance-badge";

export function EvidenceMaturity() {
  return (
    <div>
      <ProvenanceBadge provenance="current-static-snapshot" />
      <div className="mt-5 overflow-hidden rounded-lg border border-[#FFB547]/22 bg-[#0D0C0B] p-5 sm:p-7 lg:p-9">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Initial forward outcome rows", "8"],
            ["Shadow models at baseline", "4"],
            ["Baseline maturity", "BOOTSTRAP"],
          ].map(([label, value]) => (
            <div key={label} className="border-l border-[#FFB547]/45 pl-4">
              <p className="text-xs text-[#7E8B9D]">{label}</p>
              <p className="mt-2 font-mono text-lg font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 900 190" className="mt-8 aspect-[9/2] min-h-36 w-full" role="img" aria-labelledby="maturity-title maturity-description">
          <title id="maturity-title">Evidence maturity thresholds</title>
          <desc id="maturity-description">The initial public baseline contains eight outcome rows at bootstrap maturity, below the accumulating threshold at twenty-four and reviewable threshold at one hundred sixty-eight.</desc>
          <line x1="70" x2="830" y1="102" y2="102" stroke="#525252" strokeWidth="2" />
          {[70, 178, 330, 830].map((x) => (
            <line key={x} x1={x} x2={x} y1="94" y2="110" stroke="#a3a3a3" />
          ))}
          <circle cx="178" cy="102" r="12" fill="#FFB547" fillOpacity="0.08" />
          <circle cx="178" cy="102" r="5" fill="#FFB547" />
          <g fill="#d4d4d4" fontSize="13" fontFamily="ui-monospace, monospace">
            <text x="70" y="134" textAnchor="middle">0</text>
            <text x="178" y="46" textAnchor="middle">BASELINE: 8</text>
            <text x="330" y="134" textAnchor="middle">24</text>
            <text x="830" y="134" textAnchor="middle">168+</text>
          </g>
          <g fill="#737373" fontSize="12" fontFamily="ui-monospace, monospace">
            <text x="70" y="168">BOOTSTRAP</text>
            <text x="330" y="168" textAnchor="middle">ACCUMULATING</text>
            <text x="830" y="168" textAnchor="end">REVIEWABLE</text>
          </g>
        </svg>
        <p className="mt-4 text-sm leading-7 text-[#B6C0CF]">
          At the initial public baseline, outcome comparisons and descriptive model ordering were intentionally suppressed below the common reviewable threshold.
        </p>
      </div>
    </div>
  );
}
