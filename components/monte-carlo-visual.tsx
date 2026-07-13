import { MONTE_CARLO_BANDS } from "@/lib/research-visual-data";

const width = 920;
const height = 360;
const padding = { bottom: 42, left: 50, right: 24, top: 24 };
const minValue = 0.15;
const maxValue = 1.12;

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
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-950 p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="aspect-[23/9] w-full"
          role="img"
          aria-labelledby="monte-carlo-title monte-carlo-description"
        >
          <title id="monte-carlo-title">
            Monte Carlo variance scenario dispersion
          </title>
          <desc id="monte-carlo-description">
            A static fan chart shows tenth through ninetieth percentile bands for
            simulated normalized variance paths. It does not show investment returns.
          </desc>
          <rect width={width} height={height} fill="#0a0a0a" />
          {[0, 0.25, 0.5, 0.75, 1].map((position) => {
            const y =
              padding.top +
              position * (height - padding.top - padding.bottom);
            return (
              <line
                key={position}
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="rgba(148, 163, 184, 0.12)"
              />
            );
          })}
          <path
            d={bandPath(MONTE_CARLO_BANDS.q90, MONTE_CARLO_BANDS.q10)}
            fill="#a78bfa"
            fillOpacity="0.1"
          />
          <path
            d={bandPath(MONTE_CARLO_BANDS.q75, MONTE_CARLO_BANDS.q25)}
            fill="#67e8f9"
            fillOpacity="0.16"
          />
          <path
            d={linePath(MONTE_CARLO_BANDS.q50)}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="#737373" fontSize="11" fontFamily="ui-monospace, monospace">
            <text x="12" y="30">HIGH</text>
            <text x="12" y="322">LOW</text>
            <text x={padding.left} y="346">ORIGIN</text>
            <text x={width - 98} y="346">HORIZON</text>
          </g>
        </svg>
      </div>
      <div>
        <p className="text-sm leading-7 text-neutral-300">
          The fan widens with horizon to make scenario dispersion visible without
          converting uncertainty into a directional or execution conclusion.
        </p>
        <div className="mt-5 space-y-3 text-xs text-neutral-500">
          <p className="flex items-center gap-3">
            <span className="h-3 w-5 bg-violet-300/20" aria-hidden="true" />
            10th-90th percentile band
          </p>
          <p className="flex items-center gap-3">
            <span className="h-3 w-5 bg-cyan-300/20" aria-hidden="true" />
            25th-75th percentile band
          </p>
          <p className="flex items-center gap-3">
            <span className="h-px w-5 bg-amber-300" aria-hidden="true" />
            Median variance path
          </p>
        </div>
      </div>
    </div>
  );
}
