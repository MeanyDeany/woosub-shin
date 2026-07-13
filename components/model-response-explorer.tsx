"use client";

import { useState } from "react";
import { ProvenanceBadge } from "@/components/provenance-badge";

const modelResponses = {
  GARCH: {
    description: "Symmetric normalized variance response to positive and negative return shocks.",
    labels: ["NEGATIVE SHOCK", "ZERO", "POSITIVE SHOCK"],
    values: [0.92, 0.68, 0.5, 0.38, 0.32, 0.38, 0.5, 0.68, 0.92],
  },
  EGARCH: {
    description: "Asymmetric signed-shock response represented in normalized log variance.",
    labels: ["NEGATIVE SHOCK", "ZERO", "POSITIVE SHOCK"],
    values: [0.96, 0.8, 0.63, 0.45, 0.31, 0.36, 0.45, 0.56, 0.68],
  },
  "GJR-GARCH": {
    description: "Threshold response adds a larger conceptual variance effect for negative shocks.",
    labels: ["NEGATIVE SHOCK", "ZERO", "POSITIVE SHOCK"],
    values: [0.98, 0.84, 0.67, 0.47, 0.31, 0.36, 0.45, 0.55, 0.66],
  },
  "HAR-RV": {
    description: "Conceptual combination of daily, weekly, and monthly realized-volatility components.",
    labels: ["DAILY", "WEEKLY", "MONTHLY"],
    values: [0.76, 0.76, 0.42, 0.42, 0.62, 0.62, 0.34, 0.34, 0.34],
  },
} as const;

type ModelKey = keyof typeof modelResponses;

const width = 860;
const height = 310;

function responsePath(values: readonly number[]) {
  return values
    .map((value, index) => {
      const x = 54 + (index / (values.length - 1)) * 752;
      const y = 238 - value * 190;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function ModelResponseExplorer() {
  const [activeModel, setActiveModel] = useState<ModelKey>("GARCH");
  const response = modelResponses[activeModel];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ProvenanceBadge provenance="conceptual-illustration" />
        <div className="flex flex-wrap gap-1 rounded-lg border border-[#7E8B9D]/15 bg-[#080B11] p-1" role="group" aria-label="Model response">
          {(Object.keys(modelResponses) as ModelKey[]).map((model) => (
            <button
              key={model}
              type="button"
              aria-pressed={activeModel === model}
              onClick={() => setActiveModel(model)}
              className={`rounded-md px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                activeModel === model
                  ? "bg-[#9B6CFF]/15 text-white"
                  : "text-[#7E8B9D] hover:bg-white/[0.05] hover:text-[#DCE3EC]"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 overflow-hidden rounded-lg border border-[#7E8B9D]/15 bg-[#080B11] p-4 sm:p-6 lg:p-8">
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-normal text-[#42D7F5]">Conceptual model mechanics</p>
          <p className="mt-2 text-sm leading-6 text-[#7E8B9D]">{response.description}</p>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="aspect-[43/16] w-full" role="img" aria-label={`${activeModel} illustrative normalized response`}>
          <rect width={width} height={height} fill="#080B11" />
          <rect x="365" y="36" width="130" height="216" fill="#9B6CFF" fillOpacity="0.055" />
          {[0, 1, 2, 3].map((line) => (
            <line key={line} x1="54" x2="806" y1={48 + line * 58} y2={48 + line * 58} stroke="rgba(148,163,184,0.12)" />
          ))}
          <line x1="430" x2="430" y1="36" y2="252" stroke="#9B6CFF" strokeOpacity="0.35" />
          <path d={responsePath(response.values)} fill="none" stroke="#42D7F5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <g fill="#737373" fontSize="11" fontFamily="ui-monospace, monospace">
            <text x="54" y="285">{response.labels[0]}</text>
            <text x="405" y="285" textAnchor="middle">{response.labels[1]}</text>
            <text x="806" y="285" textAnchor="end">{response.labels[2]}</text>
            <text x="54" y="28">ILLUSTRATIVE NORMALIZED RESPONSE</text>
          </g>
        </svg>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#7E8B9D]">
        Illustrative normalized response only. No fitted coefficients, empirical performance, or model ranking is shown.
      </p>
    </div>
  );
}
