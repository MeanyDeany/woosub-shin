"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  useId,
  useRef,
  useState,
} from "react";
import {
  MODEL_COLORS,
  MODEL_MECHANICS,
  SCENARIOS_BY_ID,
  SHOCK_LAB_HOURS,
  SHOCK_SCENARIOS,
  VOLATILITY_MODELS,
  cycleScenario,
  type ScenarioNavigationKey,
  type ShockLabPoint,
  type ShockScenario,
  type VolatilityModel,
} from "@/lib/volatility-shock-lab-data";

const VIEWBOX_WIDTH = 960;
const VIEWBOX_HEIGHT = 440;
const PLOT_LEFT = 94;
const PLOT_RIGHT = 926;
const PLOT_TOP = 58;
const PLOT_BOTTOM = 338;
const X_TICKS = [-6, -3, 0, 3, 6, 9, 12] as const;
const Y_TICKS = [0.2, 0.4, 0.6, 0.8, 1] as const;

function scaleHour(hour: number) {
  return (
    PLOT_LEFT +
    ((hour - SHOCK_LAB_HOURS[0]) /
      (SHOCK_LAB_HOURS[SHOCK_LAB_HOURS.length - 1] - SHOCK_LAB_HOURS[0])) *
      (PLOT_RIGHT - PLOT_LEFT)
  );
}

function scaleValue(value: number) {
  return (
    PLOT_BOTTOM -
    ((value - Y_TICKS[0]) / (Y_TICKS[Y_TICKS.length - 1] - Y_TICKS[0])) *
      (PLOT_BOTTOM - PLOT_TOP)
  );
}

function makeLinePath(points: readonly ShockLabPoint[]) {
  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${scaleHour(point.hour).toFixed(1)},${scaleValue(point.value).toFixed(1)}`;
    })
    .join(" ");
}

function nearestPointIndex(viewBoxX: number) {
  const boundedX = Math.min(PLOT_RIGHT, Math.max(PLOT_LEFT, viewBoxX));
  const ratio = (boundedX - PLOT_LEFT) / (PLOT_RIGHT - PLOT_LEFT);
  return Math.round(ratio * (SHOCK_LAB_HOURS.length - 1));
}

function relativeHourLabel(hour: number) {
  if (hour === 0) return "0";
  return hour > 0 ? `+${hour}` : String(hour);
}

export function VolatilityShockLab() {
  const [selectedScenario, setSelectedScenario] =
    useState<ShockScenario>("negative-shock");
  const [selectedModel, setSelectedModel] =
    useState<VolatilityModel>("EGARCH(1,1)-t");
  const [inspectedIndex, setInspectedIndex] = useState<number | null>(null);
  const scenarioButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const titleId = useId();
  const descriptionId = useId();
  const scenario = SCENARIOS_BY_ID[selectedScenario];
  const selectedSeries = scenario.series[selectedModel];
  const eventIndex = SHOCK_LAB_HOURS.findIndex(
    (hour) => hour === scenario.eventHour,
  );
  const activeIndex = inspectedIndex ?? eventIndex;
  const inspectedPoint = selectedSeries[activeIndex] ?? selectedSeries[0];
  const orderedModels = [
    ...VOLATILITY_MODELS.filter((model) => model !== selectedModel),
    selectedModel,
  ];
  const mechanics = MODEL_MECHANICS[selectedModel];

  function handleScenarioKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
  ) {
    if (!isScenarioNavigationKey(event.key)) return;

    event.preventDefault();
    const nextScenario = cycleScenario(selectedScenario, event.key);
    const nextIndex = SHOCK_SCENARIOS.indexOf(nextScenario);
    setSelectedScenario(nextScenario);
    setInspectedIndex(null);
    scenarioButtonRefs.current[nextIndex]?.focus();
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width === 0) return;

    const relativeX = (event.clientX - bounds.left) / bounds.width;
    setInspectedIndex(nearestPointIndex(relativeX * VIEWBOX_WIDTH));
  }

  return (
    <section
      aria-labelledby={`${titleId}-heading`}
      className="min-w-0 rounded-lg border border-[#7E8B9D]/15 bg-[#080B11]/95 p-4 sm:p-6"
      data-testid="volatility-shock-lab"
    >
      <div className="flex flex-col gap-5 border-b border-[#7E8B9D]/15 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-normal text-[#42D7F5]">
            Interactive research exhibit
          </p>
          <h2
            id={`${titleId}-heading`}
            className="mt-2 text-2xl font-semibold leading-tight tracking-normal text-[#F4F7FB] sm:text-3xl"
          >
            Synthetic Volatility Shock Lab
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#B6C0CF] sm:text-base">
            Compare how four volatility specifications transform the same
            deterministic synthetic event into normalized next-hour variance evidence.
          </p>
        </div>
        <div className="flex max-w-md flex-col items-start gap-2 lg:items-end lg:text-right">
          <span className="rounded-md border border-[#42D7F5]/25 bg-[#42D7F5]/[0.05] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-normal text-[#8EEBFC]">
            Synthetic · normalized · deterministic
          </span>
          <p className="text-xs leading-5 text-[#7E8B9D]">
            No fitted private coefficients, production forecasts, model ranking, or
            trading authority.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-normal text-[#7E8B9D]">
          Synthetic scenario
        </p>
        <div
          className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
          role="group"
          aria-label="Synthetic volatility scenario"
        >
          {SHOCK_SCENARIOS.map((scenarioId, index) => {
            const definition = SCENARIOS_BY_ID[scenarioId];
            const isSelected = scenarioId === selectedScenario;

            return (
              <button
                key={scenarioId}
                ref={(button) => {
                  scenarioButtonRefs.current[index] = button;
                }}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedScenario(scenarioId);
                  setInspectedIndex(null);
                }}
                onKeyDown={handleScenarioKeyDown}
                className={`min-h-12 rounded-md border px-3 py-2 text-left text-xs font-semibold transition-colors motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#42D7F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B11] ${
                  isSelected
                    ? "border-[#42D7F5]/55 bg-[#42D7F5]/[0.09] text-[#F4F7FB]"
                    : "border-[#7E8B9D]/20 bg-[#0B0F16] text-[#7E8B9D] hover:border-[#7E8B9D]/40 hover:text-[#DCE3EC]"
                }`}
              >
                <span className="block">{definition.label}</span>
                <span
                  className={`mt-1 block font-mono text-[9px] uppercase ${
                    isSelected ? "text-[#8EEBFC]" : "text-[#475466]"
                  }`}
                >
                  {isSelected ? "Selected" : "Available"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-md border border-[#7E8B9D]/15 bg-[#0B0F16] p-4">
        <p className="text-xs font-semibold uppercase tracking-normal text-[#B6C0CF]">
          Scenario design
        </p>
        <p className="mt-2 text-sm leading-6 text-[#DCE3EC]">{scenario.description}</p>
        <dl className="mt-3 grid gap-3 text-xs leading-5 text-[#7E8B9D] sm:grid-cols-[auto_1fr]">
          <dt className="font-semibold text-[#B6C0CF]">Event marker</dt>
          <dd>{scenario.eventLabel} at relative hour {scenario.eventHour}</dd>
          <dt className="font-semibold text-[#B6C0CF]">Comparison goal</dt>
          <dd>{scenario.comparisonGoal}</dd>
        </dl>
      </div>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(17rem,0.75fr)]">
        <div className="min-w-0">
          <div
            className="grid gap-2 sm:grid-cols-2"
            role="group"
            aria-label="Volatility model selection"
          >
            {VOLATILITY_MODELS.map((model) => {
              const isSelected = model === selectedModel;

              return (
                <button
                  key={model}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedModel(model);
                    setInspectedIndex(null);
                  }}
                  className={`flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-xs font-semibold transition-colors motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#42D7F5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B11] ${
                    isSelected
                      ? "border-white/30 bg-white/[0.06] text-[#F4F7FB]"
                      : "border-[#7E8B9D]/20 bg-[#0B0F16] text-[#7E8B9D] hover:border-[#7E8B9D]/40 hover:text-[#DCE3EC]"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-0.5 w-5 shrink-0"
                      style={{ backgroundColor: MODEL_COLORS[model] }}
                    />
                    <span>{model}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[9px] uppercase text-[#B6C0CF]">
                    {isSelected ? "Selected" : "Visible"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 overflow-hidden rounded-md border border-[#7E8B9D]/15 bg-[#06080C]">
            <div className="grid gap-1 border-b border-[#7E8B9D]/12 px-4 py-3 text-[11px] text-[#7E8B9D] sm:hidden">
              <span>Y · Normalized next-hour variance forecast</span>
              <span>X · Hours relative to synthetic event</span>
            </div>
            <svg
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              className="block h-auto w-full"
              role="img"
              aria-labelledby={`${titleId} ${descriptionId}`}
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setInspectedIndex(null)}
            >
              <title id={titleId}>
                {`${scenario.label} normalized model response comparison`}
              </title>
              <desc id={descriptionId}>
                {selectedModel} is selected in the {scenario.label} conceptual
                scenario. The horizontal axis shows hours relative to the synthetic
                event from minus six to twelve. The vertical axis shows normalized
                next-hour variance forecasts from 0.2 to 1.0. All four deterministic
                model paths remain visible.
              </desc>
              <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="#06080C" />

              {Y_TICKS.map((tick) => {
                const y = scaleValue(tick);
                return (
                  <g key={tick}>
                    <line
                      x1={PLOT_LEFT}
                      x2={PLOT_RIGHT}
                      y1={y}
                      y2={y}
                      stroke="#7E8B9D"
                      strokeOpacity="0.14"
                      vectorEffect="non-scaling-stroke"
                    />
                    <text
                      x={PLOT_LEFT - 15}
                      y={y + 6}
                      fill="#7E8B9D"
                      fontSize="17"
                      textAnchor="end"
                      fontFamily="ui-monospace, SFMono-Regular, monospace"
                    >
                      {tick.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {X_TICKS.map((tick) => {
                const x = scaleHour(tick);
                return (
                  <g key={tick}>
                    <line
                      x1={x}
                      x2={x}
                      y1={PLOT_TOP}
                      y2={PLOT_BOTTOM}
                      stroke="#7E8B9D"
                      strokeOpacity={tick === 0 ? "0" : "0.09"}
                      vectorEffect="non-scaling-stroke"
                    />
                    <text
                      x={x}
                      y={PLOT_BOTTOM + 27}
                      fill="#7E8B9D"
                      fontSize="17"
                      textAnchor="middle"
                      fontFamily="ui-monospace, SFMono-Regular, monospace"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              <line
                x1={scaleHour(scenario.eventHour)}
                x2={scaleHour(scenario.eventHour)}
                y1={PLOT_TOP}
                y2={PLOT_BOTTOM}
                stroke="#F4F7FB"
                strokeOpacity="0.72"
                strokeDasharray="7 6"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={scaleHour(scenario.eventHour) + 8}
                y={PLOT_TOP + 5}
                width="205"
                height="25"
                rx="3"
                fill="#0B0F16"
                stroke="#7E8B9D"
                strokeOpacity="0.24"
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={scaleHour(scenario.eventHour) + 18}
                y={PLOT_TOP + 22}
                fill="#DCE3EC"
                fontSize="14"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
              >
                {scenario.eventLabel}
              </text>

              {orderedModels.map((model) => {
                const isSelected = model === selectedModel;
                const points = scenario.series[model];

                return (
                  <g key={model}>
                    <path
                      d={makeLinePath(points)}
                      fill="none"
                      stroke={MODEL_COLORS[model]}
                      strokeWidth={isSelected ? 4 : 2.25}
                      strokeOpacity={isSelected ? 1 : 0.42}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {isSelected
                      ? points.map((point) => (
                          <circle
                            key={point.hour}
                            cx={scaleHour(point.hour)}
                            cy={scaleValue(point.value)}
                            r="4"
                            fill="#06080C"
                            stroke={MODEL_COLORS[model]}
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                          />
                        ))
                      : null}
                  </g>
                );
              })}

              {inspectedIndex !== null ? (
                <g>
                  <line
                    x1={scaleHour(inspectedPoint.hour)}
                    x2={scaleHour(inspectedPoint.hour)}
                    y1={PLOT_TOP}
                    y2={PLOT_BOTTOM}
                    stroke={MODEL_COLORS[selectedModel]}
                    strokeOpacity="0.4"
                    strokeDasharray="3 5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={scaleHour(inspectedPoint.hour)}
                    cy={scaleValue(inspectedPoint.value)}
                    r="7"
                    fill="#06080C"
                    stroke={MODEL_COLORS[selectedModel]}
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ) : null}

              <text
                x={(PLOT_LEFT + PLOT_RIGHT) / 2}
                y={PLOT_BOTTOM + 61}
                fill="#B6C0CF"
                fontSize="18"
                textAnchor="middle"
              >
                Hours relative to synthetic event
              </text>
              <text
                x={(PLOT_LEFT + PLOT_RIGHT) / 2}
                y={PLOT_BOTTOM + 84}
                fill="#7E8B9D"
                fontSize="14"
                textAnchor="middle"
              >
                0 = synthetic event or review point
              </text>
              <text
                x="27"
                y={(PLOT_TOP + PLOT_BOTTOM) / 2}
                fill="#B6C0CF"
                fontSize="18"
                textAnchor="middle"
                transform={`rotate(-90 27 ${(PLOT_TOP + PLOT_BOTTOM) / 2})`}
              >
                Normalized next-hour variance forecast
              </text>
            </svg>
          </div>

          <div
            aria-live="polite"
            className="mt-3 rounded-md border border-[#7E8B9D]/15 bg-[#0B0F16] px-4 py-3 text-xs leading-5 text-[#B6C0CF]"
          >
            <span className="font-semibold text-[#F4F7FB]">Inspection · </span>
            {selectedModel} · hour {relativeHourLabel(inspectedPoint.hour)} · normalized
            value {inspectedPoint.value.toFixed(2)} · {scenario.label}
          </div>

          <p className="mt-4 text-xs leading-5 text-[#7E8B9D]">
            Deterministic conceptual illustration. Values are normalized for visual
            comparison and are not fitted forecasts, empirical results, or performance
            rankings.
          </p>
          <p className="mt-3 border-l border-[#3DDC97]/45 pl-4 text-sm leading-6 text-[#DCE3EC]">
            Model output is retained as research evidence only. Evidence does not
            authorize execution.
          </p>

          <div className="sr-only">
            <table>
              <caption>
                {selectedModel} values for the {scenario.label} scenario
              </caption>
              <thead>
                <tr>
                  <th scope="col">Relative hour</th>
                  <th scope="col">Normalized next-hour variance forecast</th>
                </tr>
              </thead>
              <tbody>
                {selectedSeries.map((point) => (
                  <tr key={point.hour}>
                    <th scope="row">{relativeHourLabel(point.hour)}</th>
                    <td>{point.value.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="min-w-0 rounded-md border border-[#7E8B9D]/15 bg-[#0B0F16] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-normal text-[#42D7F5]">
            Selected model
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-0.5 w-7 shrink-0"
              style={{ backgroundColor: MODEL_COLORS[selectedModel] }}
            />
            <h3 className="text-lg font-semibold text-[#F4F7FB]">{selectedModel}</h3>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase text-[#B6C0CF]">
            Selected · mechanics view
          </p>

          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs font-semibold text-[#DCE3EC]">
                Required synthetic inputs
              </dt>
              <dd className="mt-2">
                <ul className="space-y-2 text-xs leading-5 text-[#7E8B9D]">
                  {mechanics.requiredInputs.map((input) => (
                    <li key={input} className="border-l border-[#42D7F5]/30 pl-3">
                      {input}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <MechanicsField
              label="Core update mechanism"
              value={mechanics.coreMechanism}
            />
            <MechanicsField
              label="Characteristic response"
              value={mechanics.characteristicResponse}
            />
            <MechanicsField
              label="Produced research evidence"
              value={mechanics.producedEvidence}
            />
            <MechanicsField
              label="Role in this research system"
              value={mechanics.researchRole}
            />
            <div className="rounded-md border border-[#FFB547]/25 bg-[#FFB547]/[0.05] p-4">
              <dt className="text-xs font-semibold text-[#FFD08A]">
                Prohibited interpretation
              </dt>
              <dd className="mt-2 text-xs leading-5 text-[#B6C0CF]">
                {mechanics.prohibitedInterpretation}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function MechanicsField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-[#DCE3EC]">{label}</dt>
      <dd className="mt-2 text-xs leading-5 text-[#7E8B9D]">{value}</dd>
    </div>
  );
}

function isScenarioNavigationKey(key: string): key is ScenarioNavigationKey {
  return key === "ArrowLeft" || key === "ArrowRight" || key === "Home" || key === "End";
}
