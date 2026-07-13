import {
  DESCRIPTIVE_LOSS_SAMPLE,
  FORECAST_OUTCOME_SAMPLE,
  MODEL_COLORS,
  REALIZED_OUTCOME_SAMPLE,
  SHADOW_MODEL_NAMES,
  SURFACE_SAMPLES,
} from "@/lib/research-visual-data";

const chartWidth = 720;
const chartHeight = 280;
const chartPadding = { bottom: 38, left: 46, right: 18, top: 20 };

function linePath(values: readonly number[], minValue = 0.15, maxValue = 1.02) {
  const innerWidth = chartWidth - chartPadding.left - chartPadding.right;
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom;

  return values
    .map((value, index) => {
      const x = chartPadding.left + (index / (values.length - 1)) * innerWidth;
      const y =
        chartPadding.top +
        (1 - (value - minValue) / (maxValue - minValue)) * innerHeight;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function ChartGrid() {
  return (
    <g>
      {[0, 0.25, 0.5, 0.75, 1].map((position) => {
        const y =
          chartPadding.top +
          position * (chartHeight - chartPadding.top - chartPadding.bottom);
        return (
          <line
            key={position}
            x1={chartPadding.left}
            x2={chartWidth - chartPadding.right}
            y1={y}
            y2={y}
            stroke="rgba(148, 163, 184, 0.12)"
            strokeWidth="1"
          />
        );
      })}
      <line
        x1={chartPadding.left}
        x2={chartPadding.left}
        y1={chartPadding.top}
        y2={chartHeight - chartPadding.bottom}
        stroke="rgba(148, 163, 184, 0.22)"
      />
      <line
        x1={chartPadding.left}
        x2={chartWidth - chartPadding.right}
        y1={chartHeight - chartPadding.bottom}
        y2={chartHeight - chartPadding.bottom}
        stroke="rgba(148, 163, 184, 0.22)"
      />
      <g fill="#737373" fontSize="11" fontFamily="ui-monospace, monospace">
        <text x="12" y="27">1.0</text>
        <text x="12" y="138">0.5</text>
        <text x="12" y="249">0.0</text>
        <text x={chartPadding.left} y="270">T-17h</text>
        <text x={chartWidth - 34} y="270">T</text>
      </g>
    </g>
  );
}

function ModelLegend() {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500">
      {SHADOW_MODEL_NAMES.map((model) => (
        <span key={model} className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: MODEL_COLORS[model] }}
          />
          {model}
        </span>
      ))}
    </div>
  );
}

export function ForecastHistoryChart() {
  const sample = SURFACE_SAMPLES.BTCUSDT;

  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase text-cyan-200">
        Frozen portfolio sample
      </p>
      <h3 className="mt-3 text-lg font-semibold text-white">Forecast History</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-400">
        Normalized one-hour variance forecasts across the four shadow models.
      </p>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="mt-5 aspect-[18/7] w-full"
        role="img"
        aria-labelledby="forecast-history-title forecast-history-description"
      >
        <title id="forecast-history-title">Frozen forecast history sample</title>
        <desc id="forecast-history-description">
          Four lines compare sanitized normalized one-hour variance forecasts over
          eighteen historical sample indices.
        </desc>
        <ChartGrid />
        {SHADOW_MODEL_NAMES.map((model) => (
          <path
            key={model}
            d={linePath(sample.values[model])}
            fill="none"
            stroke={MODEL_COLORS[model]}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <ModelLegend />
    </article>
  );
}

export function ForecastOutcomeChart() {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase text-violet-200">
        Descriptive historical view
      </p>
      <h3 className="mt-3 text-lg font-semibold text-white">
        Forecast vs Realized Outcome
      </h3>
      <p className="mt-2 text-sm leading-6 text-neutral-400">
        A frozen research-only comparison, not trading-signal validation.
      </p>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="mt-5 aspect-[18/7] w-full"
        role="img"
        aria-labelledby="forecast-outcome-title forecast-outcome-description"
      >
        <title id="forecast-outcome-title">
          Frozen forecast and realized variance comparison
        </title>
        <desc id="forecast-outcome-description">
          Two lines compare a sanitized model forecast sample with a normalized
          realized outcome sample.
        </desc>
        <ChartGrid />
        <path
          d={linePath(FORECAST_OUTCOME_SAMPLE)}
          fill="none"
          stroke="#67e8f9"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={linePath(REALIZED_OUTCOME_SAMPLE)}
          fill="none"
          stroke="#fbbf24"
          strokeDasharray="5 6"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-4 flex flex-wrap gap-5 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-5 bg-cyan-300" aria-hidden="true" />
          Model forecast
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-px w-5 border-t border-dashed border-amber-300" aria-hidden="true" />
          Realized variance
        </span>
      </div>
    </article>
  );
}

const lossMetrics = [
  { key: "qlike", label: "QLIKE", color: "#67e8f9", maximum: 0.5 },
  { key: "mae", label: "MAE", color: "#a78bfa", maximum: 0.16 },
  { key: "rmse", label: "RMSE", color: "#fbbf24", maximum: 0.22 },
] as const;

export function DescriptiveErrorSummary() {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase text-amber-200">
        Illustrative research sample
      </p>
      <h3 className="mt-3 text-lg font-semibold text-white">
        Descriptive Loss Snapshot
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-400">
        Frozen portfolio metrics shown in fixed model order. Lower values are
        descriptive loss observations, not model approval or strategy permission.
      </p>
      <div className="mt-6 space-y-6">
        {DESCRIPTIVE_LOSS_SAMPLE.map((row) => (
          <div key={row.model} className="grid gap-3 lg:grid-cols-[12rem_1fr] lg:items-center">
            <p className="text-sm font-medium text-neutral-200">{row.model}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {lossMetrics.map((metric) => {
                const value = row[metric.key];
                return (
                  <div key={metric.key}>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-neutral-500">{metric.label}</span>
                      <span className="font-mono text-neutral-300">
                        {value.toFixed(3)}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full opacity-75"
                        style={{
                          backgroundColor: metric.color,
                          width: `${Math.min((value / metric.maximum) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
