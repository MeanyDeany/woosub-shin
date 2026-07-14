"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  PIPELINE_STAGES,
  SYNTHETIC_WALKTHROUGH_IDENTIFIERS,
  getNextPipelineStageIndex,
  getPipelineDisplayStatus,
} from "@/lib/research-exhibit-data";

const statusLabels = {
  active: "Active stage",
  completed: "Completed",
  future: "Upcoming",
} as const;

export function EvidencePipelineExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStage = PIPELINE_STAGES[activeIndex];

  function selectStage(index: number, focus = false) {
    setActiveIndex(index);
    if (focus) stageButtonRefs.current[index]?.focus();
  }

  function moveStage(direction: -1 | 1, focus = false) {
    selectStage(
      getNextPipelineStageIndex(activeIndex, direction, PIPELINE_STAGES.length),
      focus,
    );
  }

  function handleStageKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      moveStage(1, true);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      moveStage(-1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectStage(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectStage(PIPELINE_STAGES.length - 1, true);
    }
  }

  return (
    <div className="min-w-0" data-testid="evidence-pipeline-explorer">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-[#7E8B9D]/15 py-4">
        <span className="inline-flex border border-[#9B6CFF]/35 bg-[#9B6CFF]/[0.06] px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-[#C3AEFF]">
          Synthetic public walkthrough
        </span>
        <p className="max-w-2xl text-xs leading-5 text-[#7E8B9D]">
          Interaction changes only this conceptual visualization. It does not alter a model, forecast, policy, or system state.
        </p>
      </div>

      <div
        className="grid gap-2 lg:grid-cols-7"
        role="tablist"
        aria-label="Synthetic evidence pipeline stages"
      >
        {PIPELINE_STAGES.map((stage, index) => {
          const status = getPipelineDisplayStatus(index, activeIndex);
          return (
            <button
              key={stage.id}
              ref={(node) => { stageButtonRefs.current[index] = node; }}
              id={`pipeline-tab-${stage.id}`}
              type="button"
              role="tab"
              aria-controls={`pipeline-panel-${stage.id}`}
              aria-selected={status === "active"}
              tabIndex={status === "active" ? 0 : -1}
              onClick={() => selectStage(index)}
              onKeyDown={handleStageKeyDown}
              className={`min-w-0 border px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#42D7F5] ${
                status === "active"
                  ? "border-[#42D7F5]/70 bg-[#42D7F5]/[0.08]"
                  : status === "completed"
                    ? "border-[#3DDC97]/25 bg-[#3DDC97]/[0.035]"
                    : "border-[#7E8B9D]/15 bg-[#0B0F16] hover:border-[#7E8B9D]/35"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-[0.65rem] text-[#67DFF7]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#8996A8]">
                  {statusLabels[status]}
                </span>
              </span>
              <span className="mt-3 block text-sm font-semibold leading-5 text-[#F4F7FB]">
                {stage.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
        <section
          id={`pipeline-panel-${activeStage.id}`}
          role="tabpanel"
          aria-labelledby={`pipeline-tab-${activeStage.id}`}
          className="min-w-0 border border-[#7E8B9D]/18 bg-[#0B0F16] p-5 sm:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#67DFF7]">
                Stage {activeIndex + 1} of {PIPELINE_STAGES.length}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F4F7FB]">{activeStage.name}</h3>
            </div>
            <span className="border border-[#42D7F5]/35 bg-[#42D7F5]/[0.06] px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#67DFF7]">
              Active stage
            </span>
          </div>

          <dl className="mt-7 divide-y divide-[#7E8B9D]/12 border-y border-[#7E8B9D]/12">
            <DetailRow label="Purpose" value={activeStage.purpose} />
            <DetailRow label="Required" value={activeStage.requiredInputs.join(" · ")} />
            <DetailRow label="Produced" value={activeStage.producedEvidence} />
            <DetailRow label="Timing rule" value={activeStage.timingRule} />
            <DetailRow label="Prohibited" value={activeStage.prohibitedShortcut} accent="amber" />
            <DetailRow label="Integrity" value={activeStage.integrityNote} accent="violet" />
          </dl>

          <div className="mt-7 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => moveStage(-1)}
              disabled={activeIndex === 0}
              className="min-h-10 border border-[#7E8B9D]/30 px-4 py-2 text-sm font-semibold text-[#DCE3EC] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Previous stage
            </button>
            <button
              type="button"
              onClick={() => moveStage(1)}
              disabled={activeIndex === PIPELINE_STAGES.length - 1}
              className="min-h-10 border border-[#42D7F5]/55 px-4 py-2 text-sm font-semibold text-[#DCE3EC] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Next stage
            </button>
            <button
              type="button"
              onClick={() => selectStage(0)}
              className="min-h-10 border-b border-[#7E8B9D]/35 px-2 py-2 text-sm font-semibold text-[#8996A8] hover:text-white"
            >
              Reset walkthrough
            </button>
          </div>
        </section>

        <aside className="min-w-0 border-y border-[#7E8B9D]/18 py-5" aria-label="Synthetic record identifiers">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#C3AEFF]">
            Conceptual record inspector
          </p>
          <dl className="mt-4 divide-y divide-[#7E8B9D]/12">
            {SYNTHETIC_WALKTHROUGH_IDENTIFIERS.map((item) => (
              <div key={item.label} className="py-4">
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#6F7D90]">{item.label}</dt>
                <dd className="mt-2 break-all font-mono text-xs leading-5 text-[#DCE3EC]">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 border-l border-[#FFB547]/45 pl-4 text-xs leading-6 text-[#8996A8]">
            All identifiers and values in this walkthrough are deterministic public examples. They are not production records or copied private hashes.
          </p>
        </aside>
      </div>
    </div>
  );
}

function DetailRow({
  accent = "base",
  label,
  value,
}: {
  accent?: "amber" | "base" | "violet";
  label: string;
  value: string;
}) {
  const valueColor = accent === "amber" ? "text-[#FFC56F]" : accent === "violet" ? "text-[#C3AEFF]" : "text-[#B6C0CF]";
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-5">
      <dt className="text-[0.63rem] font-semibold uppercase tracking-[0.1em] text-[#6F7D90]">{label}</dt>
      <dd className={`text-sm leading-6 ${valueColor}`}>{value}</dd>
    </div>
  );
}
