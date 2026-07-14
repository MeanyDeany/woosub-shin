"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { FAILURE_CASES } from "@/lib/research-exhibit-data";

export function FailureModeAtlas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const caseButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCase = FAILURE_CASES[activeIndex];

  function selectCase(index: number, focus = false) {
    setActiveIndex(index);
    if (focus) caseButtonRefs.current[index]?.focus();
  }

  function handleCaseKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const lastIndex = FAILURE_CASES.length - 1;
    let nextIndex: number | null = null;

    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      nextIndex = Math.min(activeIndex + 1, lastIndex);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      nextIndex = Math.max(activeIndex - 1, 0);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      selectCase(nextIndex, true);
    }
  }

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)] lg:gap-10" data-testid="failure-mode-atlas">
      <div className="min-w-0" role="tablist" aria-label="Research evidence failure cases">
        {FAILURE_CASES.map((failureCase, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={failureCase.id}
              ref={(node) => { caseButtonRefs.current[index] = node; }}
              id={`failure-tab-${failureCase.id}`}
              type="button"
              role="tab"
              aria-controls={`failure-panel-${failureCase.id}`}
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => selectCase(index)}
              onKeyDown={handleCaseKeyDown}
              className={`grid w-full min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-x border-t px-4 py-4 text-left transition-colors last:border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#42D7F5] ${
                active
                  ? "border-[#FFB547]/45 bg-[#FFB547]/[0.06]"
                  : "border-[#7E8B9D]/15 bg-[#0B0F16] hover:bg-[#0E131C]"
              }`}
            >
              <span className="font-mono text-[0.66rem] text-[#FFC56F]">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 text-[#F4F7FB]">{failureCase.name}</span>
                <span className="mt-1 block text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[#8996A8]">
                  {active ? "Active case" : "Inspect case"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <section
        id={`failure-panel-${activeCase.id}`}
        role="tabpanel"
        aria-labelledby={`failure-tab-${activeCase.id}`}
        className="min-w-0 border border-[#7E8B9D]/18 bg-[#0B0F16] p-5 sm:p-7"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#FFC56F]">Refusal case {activeIndex + 1}</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#F4F7FB]">{activeCase.name}</h3>
          </div>
          <span className="border border-[#9B6CFF]/35 bg-[#9B6CFF]/[0.06] px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#C3AEFF]">
            Visible rejection
          </span>
        </div>

        <dl className="mt-7 divide-y divide-[#7E8B9D]/12 border-y border-[#7E8B9D]/12">
          <AtlasRow label="Trigger" value={activeCase.trigger} />
          <AtlasRow label="Why dangerous" value={activeCase.danger} />
          <AtlasRow label="System response" value={activeCase.response} accent="amber" />
          <AtlasRow label="Evidence retained" value={activeCase.evidenceRetained} />
          <AtlasRow label="Boundary protected" value={activeCase.boundaryProtected} accent="violet" />
        </dl>

        <p className="mt-6 text-xs leading-6 text-[#7E8B9D]">
          Conceptual illustration. This atlas describes research-integrity behavior, not a live incident, production alert, or trading control.
        </p>
      </section>
    </div>
  );
}

function AtlasRow({
  accent = "base",
  label,
  value,
}: {
  accent?: "amber" | "base" | "violet";
  label: string;
  value: string;
}) {
  const color = accent === "amber" ? "text-[#FFC56F]" : accent === "violet" ? "text-[#C3AEFF]" : "text-[#B6C0CF]";
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5">
      <dt className="text-[0.63rem] font-semibold uppercase tracking-[0.1em] text-[#6F7D90]">{label}</dt>
      <dd className={`text-sm leading-7 ${color}`}>{value}</dd>
    </div>
  );
}
