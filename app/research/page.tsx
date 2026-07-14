import type { Metadata } from "next";
import {
  EditorialSection,
  EvidenceBand,
  PageHero,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Research Methodology",
  description:
    "MeanyDeany research methodology: time-respecting construction, narrow model roles, robust comparison, immutable evidence, and visible failure states.",
};

const principles = [
  {
    accent: "amber" as const,
    index: "01",
    title: "Evidence before permission",
    text: "A model output earns interpretation through validation. It does not become an entry, veto, sizing, or execution instruction by default.",
  },
  {
    accent: "cyan" as const,
    index: "02",
    title: "Time-respecting data construction",
    text: "Features, states, and outcomes use information available at the evaluated timestamp. Alignment rules are explicit and missing data is not silently repaired.",
  },
  {
    accent: "violet" as const,
    index: "03",
    title: "Model comparison and robustness",
    text: "Ablation, alternative specifications, walk-forward evaluation, and subperiod checks matter more than a single favorable summary statistic.",
  },
  {
    accent: "amber" as const,
    index: "04",
    title: "Immutable evidence and provenance",
    text: "Historical research records should remain inspectable as hypotheses evolve. Source identity and transformation history belong beside the result.",
  },
  {
    accent: "emerald" as const,
    index: "05",
    title: "Operational reliability",
    text: "Duplicate protection, stale-input detection, locking, scheduling, and failure states are part of research validity when systems generate evidence repeatedly.",
  },
  {
    accent: "blue" as const,
    index: "06",
    title: "Evidence, policy, and execution stay separate",
    text: "Descriptive evidence can inform later policy research, but policy state is not entry permission and neither layer authorizes execution.",
  },
] as const;

const notes = [
  ["Timestamp discipline", "If a value was not knowable at the decision timestamp, it does not belong in the feature set."],
  ["Narrow claims", "Model maturity, forecast loss, and regime labels answer research questions—not whether a strategy is approved."],
  ["Visible failure", "A failed input, orphan reference, or stale process should remain observable instead of being hidden by a plausible fallback."],
  ["Reproducible lineage", "A result is stronger when another reviewer can trace its inputs, specification, timing, and limitations."],
] as const;

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        accent="violet"
        eyebrow="MeanyDeany · Methodology"
        title="Research methodology"
        intro="Time-respecting construction, narrow model roles, robust comparison, immutable evidence, and visible failure states."
        metadata={[
          { label: "Data", value: "Time-respecting" },
          { label: "Models", value: "Compared, not canonized" },
          { label: "Evidence", value: "Auditable and immutable" },
          { label: "Permission", value: "Outside model output" },
        ]}
      />

      <EditorialSection
        accent="violet"
        eyebrow="Working principles"
        title="Research credibility is cumulative"
        intro="No single diagnostic establishes a system's validity. Credibility accumulates through temporal discipline, robustness, provenance, operational integrity, and appropriately narrow claims."
      >
        <ol className="grid gap-px border-y border-[#7E8B9D]/15 bg-[#7E8B9D]/15 lg:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle.title} className="bg-[#0B0F16] p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#C3AEFF]">{principle.index}</span>
                <StatusLabel accent={principle.accent}>{principle.title}</StatusLabel>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#A8B3C2]">
                {principle.text}
              </p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Research notes"
        title="Short rules for difficult decisions"
        tone="deep"
      >
        <dl className="divide-y divide-[#7E8B9D]/15 border-y border-[#7E8B9D]/15">
          {notes.map(([term, detail], index) => (
            <div
              key={term}
              className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(10rem,0.7fr)_minmax(0,1.3fr)] sm:gap-6"
            >
              <span className="font-mono text-[0.68rem] text-[#FFC56F]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <dt className="font-semibold text-[#F4F7FB]">{term}</dt>
              <dd className="text-sm leading-7 text-[#8996A8]">{detail}</dd>
            </div>
          ))}
        </dl>
      </EditorialSection>

      <EditorialSection
        eyebrow="Separation of concerns"
        title="One pipeline, three distinct responsibilities"
      >
        <EvidenceBand
          accent="cyan"
          items={[
            { label: "Evidence", value: "What the data and model record support." },
            { label: "Interpretation", value: "How the evidence is framed and challenged." },
            { label: "Policy", value: "A separate research layer with explicit rules." },
            { label: "Execution", value: "Not part of this public portfolio." },
          ]}
        />
      </EditorialSection>
    </PageShell>
  );
}
