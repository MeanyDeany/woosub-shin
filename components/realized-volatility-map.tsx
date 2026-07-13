import { ProvenanceBadge } from "@/components/provenance-badge";

const harComponents = [
  "HAR daily component",
  "HAR weekly component",
  "HAR monthly component",
] as const;

function FlowNode({ title, role }: { title: string; role: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-4">
      <p className="font-semibold text-neutral-100">{title}</p>
      <p className="mt-1 text-xs uppercase text-neutral-500">{role}</p>
    </div>
  );
}

export function RealizedVolatilityMap() {
  return (
    <div>
      <ProvenanceBadge provenance="conceptual-illustration" />
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <FlowNode title="5-minute decimal log returns" role="Research input" />
        <span aria-hidden="true" className="hidden text-neutral-600 md:block">→</span>
        <div className="grid gap-3 sm:grid-cols-2">
          <FlowNode title="Realized Variance" role="Research input" />
          <FlowNode title="Realized Volatility" role="Diagnostic feature" />
        </div>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <div className="space-y-3">
          <FlowNode title="RV48" role="Historical research component" />
          <p className="px-1 text-xs leading-5 text-neutral-500">
            Diagnostic feature, not an independent active shadow forecast model.
          </p>
        </div>
        <div className="space-y-3">
          {harComponents.map((component) => (
            <FlowNode key={component} title={component} role="Research input" />
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            <FlowNode title="HAR-RV" role="Forecast model" />
            <FlowNode title="Vol-of-vol" role="Volatility-state research feature" />
          </div>
        </div>
        <div className="space-y-3">
          <FlowNode title="Jump component" role="Diagnostic feature" />
          <FlowNode title="HAR-Jump" role="Regime research" />
          <FlowNode title="Defensive-policy candidate" role="Historical research component" />
        </div>
      </div>
      <div className="mt-6 border-l border-emerald-300/40 pl-4 text-sm leading-7 text-neutral-300">
        <p>
          Realized-volatility components support forecasting, diagnostics, and
          defensive research. They do not independently authorize trading.
        </p>
        <p className="mt-2 text-neutral-500">
          HAR-Jump is not an entry model and does not provide short permission.
          Vol-of-vol does not provide trading permission. Defensive research
          candidates are not automatic veto rules.
        </p>
      </div>
    </div>
  );
}
