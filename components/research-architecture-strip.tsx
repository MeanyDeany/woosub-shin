import { ProvenanceBadge } from "@/components/provenance-badge";

const assets = [
  { label: "BTCUSDT Futures", provenance: "current-static-snapshot" as const },
  { label: "E-mini Nasdaq-100 Futures (NQ)", provenance: "academic-context" as const },
  { label: "E-mini S&P 500 Futures (ES)", provenance: "academic-context" as const },
  { label: "Crude Oil (CL) Futures", provenance: "academic-context" as const },
  { label: "Gold Futures (GC)", provenance: "planned-research" as const },
];

const models = ["GARCH(1,1)-t", "EGARCH(1,1)-t", "GJR-GARCH(1,1)-t", "HAR-RV"] as const;
const evidence = ["Fit Ledger", "State Ledger", "Forward Outcome Ledger"] as const;

export function ResearchArchitectureStrip() {
  return (
    <section className="border-y border-[#7E8B9D]/15 bg-[#0B0F16]">
      <div className="mx-auto max-w-[1520px] px-5 py-8 lg:px-8 xl:px-10">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
              Research architecture
            </p>
            <h2 className="mt-2 text-xl font-semibold text-[#F4F7FB]">
              Asset context to immutable evidence
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#7E8B9D]">
            A compact system map. Provenance stays attached to each asset context.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_0.9fr] lg:gap-0">
          <ArchitectureLayer label="Asset layer" color="#42D7F5">
            <div className="grid grid-cols-2 gap-2">
              {assets.map((asset) => (
                <div
                  key={asset.label}
                  className={`min-w-0 rounded-lg border bg-[#080B11] px-3 py-3 ${
                    asset.provenance === "planned-research"
                      ? "border-dashed border-[#FFB547]/35"
                      : asset.provenance === "current-static-snapshot"
                        ? "border-[#3DDC97]/35"
                        : "border-[#4D8DFF]/25"
                  }`}
                >
                  <p className="text-xs font-semibold leading-5 text-white">{asset.label}</p>
                  <div className="mt-2">
                    <ProvenanceBadge provenance={asset.provenance} />
                  </div>
                </div>
              ))}
            </div>
          </ArchitectureLayer>

          <ArchitectureLayer label="Model layer" color="#9B6CFF">
            <div className="grid grid-cols-2 gap-2">
              {models.map((model) => (
                <div
                  key={model}
                  className="rounded-lg border border-[#9B6CFF]/25 bg-[#080B11] px-3 py-3 font-mono text-xs text-[#DCE3EC]"
                >
                  {model}
                </div>
              ))}
            </div>
          </ArchitectureLayer>

          <ArchitectureLayer label="Evidence layer" color="#FFB547" last>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {evidence.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-[#FFB547]/20 bg-[#080B11] px-3 py-3"
                >
                  <span className="font-mono text-[10px] text-[#FFB547]">0{index + 1}</span>
                  <span className="text-sm text-[#DCE3EC]">{item}</span>
                </div>
              ))}
            </div>
          </ArchitectureLayer>
        </div>
      </div>
    </section>
  );
}

function ArchitectureLayer({
  children,
  color,
  label,
  last = false,
}: {
  children: React.ReactNode;
  color: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div className={`relative lg:px-6 ${last ? "" : "lg:border-r lg:border-[#7E8B9D]/15"}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-7" style={{ backgroundColor: color }} aria-hidden="true" />
        <h3 className="text-xs font-semibold uppercase tracking-normal text-[#B6C0CF]">{label}</h3>
      </div>
      {children}
    </div>
  );
}
