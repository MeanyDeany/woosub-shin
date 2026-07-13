import {
  MODEL_COLORS,
  SHADOW_MODEL_NAMES,
  SURFACE_SAMPLES,
  type ResearchAsset,
} from "@/lib/research-visual-data";
import { ProvenanceBadge } from "@/components/provenance-badge";

const width = 920;
const height = 460;

function projectPoint(
  timeIndex: number,
  modelIndex: number,
  value: number,
  bandEdge = 0,
) {
  return {
    x: 76 + timeIndex * 42 + modelIndex * 23,
    y: 382 - modelIndex * 58 - value * 164 + bandEdge * 11,
  };
}

function surfaceColor(value: number) {
  if (value >= 0.78) return "#FFB547";
  if (value >= 0.58) return "#9B6CFF";
  if (value >= 0.4) return "#4D8DFF";
  return "#42D7F5";
}

export function VolatilitySurfaceFallback({ asset }: { asset: ResearchAsset }) {
  const sample = SURFACE_SAMPLES[asset];
  const timeCount = sample.values[SHADOW_MODEL_NAMES[0]].length;
  const polygons = [];

  for (let modelIndex = 0; modelIndex < SHADOW_MODEL_NAMES.length; modelIndex += 1) {
    const currentValues = sample.values[SHADOW_MODEL_NAMES[modelIndex]];

    for (let timeIndex = 0; timeIndex < timeCount - 1; timeIndex += 1) {
      const points = [
        projectPoint(timeIndex, modelIndex, currentValues[timeIndex], -1),
        projectPoint(timeIndex + 1, modelIndex, currentValues[timeIndex + 1], -1),
        projectPoint(timeIndex + 1, modelIndex, currentValues[timeIndex + 1], 1),
        projectPoint(timeIndex, modelIndex, currentValues[timeIndex], 1),
      ];
      const averageValue =
        (currentValues[timeIndex] + currentValues[timeIndex + 1]) / 2;

      polygons.push(
        <polygon
          key={`${modelIndex}-${timeIndex}`}
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
          fill={surfaceColor(averageValue)}
          fillOpacity="0.2"
          stroke="rgba(148, 163, 184, 0.18)"
          strokeWidth="0.75"
        />,
      );
    }
  }

  return (
    <div
      className="relative min-h-[350px] w-full overflow-hidden bg-[#07090D] sm:min-h-[390px]"
      data-surface-mode="static"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full min-h-[350px] w-full sm:min-h-[390px]"
        role="img"
        aria-labelledby="volatility-surface-fallback-title volatility-surface-fallback-description"
      >
        <title id="volatility-surface-fallback-title">
          {`Static normalized variance ribbons for ${asset}`}
        </title>
        <desc id="volatility-surface-fallback-description">
          Four separate model ribbons show deterministic conceptual normalized
          variance values across an illustrative time index.
        </desc>
        <rect width={width} height={height} fill="#07090D" />
        <g stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1">
          <line x1="55" y1="380" x2="850" y2="380" />
          <line x1="55" y1="380" x2="130" y2="108" />
          <line x1="55" y1="380" x2="55" y2="92" />
        </g>
        <g>{polygons}</g>
        {SHADOW_MODEL_NAMES.map((model, modelIndex) => {
          const path = sample.values[model]
            .map((value, timeIndex) => {
              const point = projectPoint(timeIndex, modelIndex, value);
              return `${timeIndex === 0 ? "M" : "L"}${point.x},${point.y}`;
            })
            .join(" ");

          return (
            <path
              key={model}
              d={path}
              fill="none"
              stroke={MODEL_COLORS[model]}
              strokeOpacity="0.75"
              strokeWidth="1.6"
            />
          );
        })}
        <g fill="#737373" fontSize="12" fontFamily="ui-monospace, monospace">
          <text x="790" y="411">TIME</text>
          <text x="58" y="78">NORMALIZED VARIANCE</text>
          <text x="118" y="404">DISCRETE MODEL SPECIFICATION</text>
        </g>
      </svg>
      <div className="absolute left-4 top-4 rounded-md border border-[#7E8B9D]/20 bg-[#080B11]/90 px-3 py-2 text-xs text-[#7E8B9D]">
        Static accessibility view
      </div>
    </div>
  );
}

export function VolatilitySurfaceLoading() {
  return (
    <div className="min-h-[548px]" aria-busy="true" aria-label="Loading volatility forecast surface">
      <div className="mb-3 flex min-h-11 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ProvenanceBadge provenance="conceptual-illustration" />
          <p className="mt-2 text-sm text-[#7E8B9D]">
            Conceptual normalized surface generated from deterministic illustrative data.
          </p>
        </div>
        <div className="flex w-fit gap-1 rounded-lg border border-[#7E8B9D]/15 bg-[#080B11] p-1">
          {(["BTCUSDT", "NQ", "ES"] as const).map((asset) => (
            <span
              key={asset}
              className="min-w-20 rounded-md px-3 py-2 text-center text-xs font-semibold text-[#7E8B9D]"
            >
              {asset}
            </span>
          ))}
        </div>
      </div>
      <VolatilitySurfaceFallback asset="BTCUSDT" />
      <p className="mt-4 min-h-6 text-sm text-[#7E8B9D]">
        Preparing the interactive research surface.
      </p>
    </div>
  );
}
