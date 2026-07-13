import {
  MODEL_COLORS,
  SHADOW_MODEL_NAMES,
  SURFACE_SAMPLES,
  type ResearchAsset,
} from "@/lib/research-visual-data";

const width = 920;
const height = 460;

function projectPoint(timeIndex: number, modelIndex: number, value: number) {
  return {
    x: 76 + timeIndex * 42 + modelIndex * 23,
    y: 352 - modelIndex * 54 - value * 112,
  };
}

function surfaceColor(value: number) {
  if (value >= 0.78) return "#fbbf24";
  if (value >= 0.58) return "#a78bfa";
  if (value >= 0.4) return "#60a5fa";
  return "#67e8f9";
}

export function VolatilitySurfaceFallback({ asset }: { asset: ResearchAsset }) {
  const sample = SURFACE_SAMPLES[asset];
  const timeCount = sample.values[SHADOW_MODEL_NAMES[0]].length;
  const polygons = [];

  for (let modelIndex = 0; modelIndex < SHADOW_MODEL_NAMES.length - 1; modelIndex += 1) {
    const currentValues = sample.values[SHADOW_MODEL_NAMES[modelIndex]];
    const nextValues = sample.values[SHADOW_MODEL_NAMES[modelIndex + 1]];

    for (let timeIndex = 0; timeIndex < timeCount - 1; timeIndex += 1) {
      const points = [
        projectPoint(timeIndex, modelIndex, currentValues[timeIndex]),
        projectPoint(timeIndex + 1, modelIndex, currentValues[timeIndex + 1]),
        projectPoint(timeIndex + 1, modelIndex + 1, nextValues[timeIndex + 1]),
        projectPoint(timeIndex, modelIndex + 1, nextValues[timeIndex]),
      ];
      const averageValue =
        (currentValues[timeIndex] +
          currentValues[timeIndex + 1] +
          nextValues[timeIndex] +
          nextValues[timeIndex + 1]) /
        4;

      polygons.push(
        <polygon
          key={`${modelIndex}-${timeIndex}`}
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
          fill={surfaceColor(averageValue)}
          fillOpacity="0.13"
          stroke="rgba(148, 163, 184, 0.14)"
          strokeWidth="0.75"
        />,
      );
    }
  }

  return (
    <div
      className="relative min-h-[360px] w-full overflow-hidden bg-neutral-950 sm:min-h-[460px]"
      data-surface-mode="static"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full min-h-[360px] w-full sm:min-h-[460px]"
        role="img"
        aria-labelledby="volatility-surface-fallback-title volatility-surface-fallback-description"
      >
        <title id="volatility-surface-fallback-title">
          {`Static normalized volatility forecast surface for ${asset}`}
        </title>
        <desc id="volatility-surface-fallback-description">
          A static two-dimensional projection of frozen normalized forecast variance
          values over time and across four shadow models.
        </desc>
        <rect width={width} height={height} fill="#0a0a0a" />
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
          <text x="118" y="404">MODEL DIMENSION</text>
        </g>
      </svg>
      <div className="absolute left-4 top-4 rounded-md border border-white/10 bg-neutral-950/90 px-3 py-2 text-xs text-neutral-400">
        Static accessibility view
      </div>
    </div>
  );
}

export function VolatilitySurfaceLoading() {
  return (
    <div aria-busy="true" aria-label="Loading volatility forecast surface">
      <div className="mb-4 flex min-h-11 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-400">Frozen, sanitized portfolio sample</p>
        <div className="flex w-fit gap-1 rounded-lg border border-white/10 bg-neutral-950 p-1">
          {(["BTCUSDT", "NQ", "ES"] as const).map((asset) => (
            <span
              key={asset}
              className="min-w-20 rounded-md px-3 py-2 text-center text-xs font-semibold text-neutral-500"
            >
              {asset}
            </span>
          ))}
        </div>
      </div>
      <VolatilitySurfaceFallback asset="BTCUSDT" />
      <p className="mt-4 min-h-6 text-sm text-neutral-500">
        Preparing the interactive research surface.
      </p>
    </div>
  );
}
