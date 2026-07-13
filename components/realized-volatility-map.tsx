import { ProvenanceBadge } from "@/components/provenance-badge";

const harComponents = ["Daily", "Weekly", "Monthly"] as const;

function FlowNode({
  accent = "#42D7F5",
  title,
  role,
}: {
  accent?: string;
  title: string;
  role: string;
}) {
  return (
    <div className="relative rounded-lg border border-[#7E8B9D]/15 bg-[#0E131C] px-4 py-4">
      <span
        aria-hidden="true"
        className="absolute inset-y-3 left-0 w-px"
        style={{ backgroundColor: accent }}
      />
      <p className="font-semibold text-[#F4F7FB]">{title}</p>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
        {role}
      </p>
    </div>
  );
}

export function RealizedVolatilityMap() {
  return (
    <div>
      <ProvenanceBadge provenance="conceptual-illustration" />
      <div className="relative mt-7 grid gap-7 lg:grid-cols-[0.9fr_1.2fr_1fr] lg:gap-10">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-normal text-[#42D7F5]">
            Research input
          </p>
          <FlowNode title="5-minute decimal log returns" role="Research input" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <FlowNode title="Realized Variance" role="Research input" />
            <FlowNode title="Realized Volatility" role="Diagnostic feature" />
          </div>
          <FlowNode
            accent="#4D8DFF"
            title="RV48"
            role="Historical research component"
          />
          <p className="text-xs leading-5 text-[#7E8B9D]">
            Diagnostic feature, not an independent active shadow forecast model.
          </p>
        </div>

        <div className="space-y-3 lg:border-x lg:border-[#7E8B9D]/15 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-normal text-[#9B6CFF]">
            Forecast construction
          </p>
          <div className="rounded-lg border border-[#9B6CFF]/25 bg-[#9B6CFF]/[0.035] p-4">
            <p className="mb-3 text-sm font-semibold text-[#DCE3EC]">HAR components</p>
            <div className="grid grid-cols-3 gap-2">
              {harComponents.map((component) => (
                <div
                  key={component}
                  className="rounded-md border border-[#9B6CFF]/20 bg-[#080B11] px-2 py-3 text-center"
                >
                  <p className="font-mono text-xs text-[#DCE3EC]">{component}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-normal text-[#7E8B9D]">
                    Research input
                  </p>
                </div>
              ))}
            </div>
          </div>
          <FlowNode accent="#9B6CFF" title="HAR-RV" role="Forecast model" />
          <FlowNode
            accent="#C66BFF"
            title="Vol-of-vol"
            role="Volatility-state research feature"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-normal text-[#FFB547]">
            Research branches
          </p>
          <FlowNode accent="#FFB547" title="Jump component" role="Diagnostic feature" />
          <FlowNode accent="#FFB547" title="HAR-Jump" role="Regime research" />
          <FlowNode
            accent="#FFB547"
            title="Defensive-policy candidate"
            role="Historical research component"
          />
        </div>
      </div>
      <div className="mt-8 border-l border-[#3DDC97]/45 pl-5 text-sm leading-7 text-[#B6C0CF]">
        <p>
          Realized-volatility components support forecasting, diagnostics, and
          defensive research. They do not independently authorize trading.
        </p>
        <p className="mt-2 text-[#7E8B9D]">
          HAR-Jump is not an entry model and does not provide short permission.
          Vol-of-vol does not provide trading permission. Defensive research
          candidates are not automatic veto rules.
        </p>
      </div>
    </div>
  );
}
