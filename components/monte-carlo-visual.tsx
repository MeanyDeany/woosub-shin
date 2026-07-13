import { ProvenanceBadge } from "@/components/provenance-badge";
import { generateVarianceScenarios } from "@/lib/variance-simulation";

const width = 920;
const height = 360;
const padding = { bottom: 42, left: 50, right: 24, top: 24 };
const scenarioData = generateVarianceScenarios();
const displayedPaths = scenarioData.paths.filter((_, index) => index % 25 === 0);
const displayValues = [
  ...scenarioData.percentiles.q05,
  ...scenarioData.percentiles.q95,
  ...displayedPaths.flat(),
];
const minValue = Math.min(...displayValues) * 0.92;
const maxValue = Math.max(...displayValues) * 1.05;

function point(value: number, index: number, count: number) {
  return {
    x: padding.left + (index / (count - 1)) * (width - padding.left - padding.right),
    y:
      padding.top +
      (1 - (value - minValue) / (maxValue - minValue)) *
        (height - padding.top - padding.bottom),
  };
}

function linePath(values: readonly number[]) {
  return values
    .map((value, index) => {
      const projected = point(value, index, values.length);
      return `${index === 0 ? "M" : "L"}${projected.x.toFixed(2)},${projected.y.toFixed(2)}`;
    })
    .join(" ");
}

function bandPath(upper: readonly number[], lower: readonly number[]) {
  const upperPath = upper.map((value, index) => point(value, index, upper.length));
  const lowerPath = lower
    .map((value, index) => point(value, index, lower.length))
    .reverse();

  return [
    ...upperPath.map(
      (projected, index) =>
        `${index === 0 ? "M" : "L"}${projected.x.toFixed(2)},${projected.y.toFixed(2)}`,
    ),
    ...lowerPath.map(
      (projected) => `L${projected.x.toFixed(2)},${projected.y.toFixed(2)}`,
    ),
    "Z",
  ].join(" ");
}

export function MonteCarloVisual() {
  const { percentiles } = scenarioData;

  return (
    <div>
      <ProvenanceBadge provenance="conceptual-illustration" />
      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div className="overflow-hidden rounded-lg border border-[#9B6CFF]/20 bg-[#080811] p-4 sm:p-6">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="aspect-[23/9] w-full"
            role="img"
            aria-labelledby="variance-scenario-title variance-scenario-description"
          >
            <title id="variance-scenario-title">Deterministic normalized variance scenario dispersion</title>
            <desc id="variance-scenario-description">
              Two hundred fifty seeded paths over forty-eight research steps produce fifth, twenty-fifth, fiftieth, seventy-fifth, and ninety-fifth percentile summaries.
            </desc>
            <rect width={width} height={height} fill="#080811" />
            {[0, 0.25, 0.5, 0.75, 1].map((position) => {
              const y = padding.top + position * (height - padding.top - padding.bottom);
              return <line key={position} x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="rgba(148,163,184,0.12)" />;
            })}
            {displayedPaths.map((path, index) => (
              <path key={index} d={linePath(path)} fill="none" stroke="#94a3b8" strokeOpacity="0.13" strokeWidth="1" />
            ))}
            <path d={bandPath(percentiles.q95, percentiles.q05)} fill="#9B6CFF" fillOpacity="0.12" />
            <path d={bandPath(percentiles.q75, percentiles.q25)} fill="#42D7F5" fillOpacity="0.14" />
            <path d={linePath(percentiles.q50)} fill="none" stroke="#FFB547" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <g fill="#737373" fontSize="11" fontFamily="ui-monospace, monospace">
              <text x="12" y="30">HIGH</text>
              <text x="12" y="322">LOW</text>
              <text x={padding.left} y="346">ORIGIN</text>
              <text x={width - 98} y="346">48 STEPS</text>
            </g>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#DCE3EC]">Illustrative parameterization</p>
          <p className="mt-3 text-sm leading-7 text-[#B6C0CF]">
            A fixed seed generates 250 normalized mean-reverting log-variance paths across 48 research steps. Parameters are not fitted.
          </p>
          <div className="mt-5 space-y-3 text-xs text-[#7E8B9D]">
            <p className="flex items-center gap-3"><span className="h-3 w-5 bg-[#9B6CFF]/20" aria-hidden="true" />5th-95th percentile band</p>
            <p className="flex items-center gap-3"><span className="h-3 w-5 bg-[#42D7F5]/20" aria-hidden="true" />25th-75th percentile band</p>
            <p className="flex items-center gap-3"><span className="h-px w-5 bg-[#FFB547]" aria-hidden="true" />Median variance path</p>
          </div>
        </div>
      </div>
      <p className="mt-5 max-w-5xl text-sm leading-7 text-[#7E8B9D]">
        Illustrative scenario dispersion under a normalized mean-reverting log-variance process. This is not a return forecast, trading simulation, or investment projection.
      </p>
    </div>
  );
}
