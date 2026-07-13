import {
  PROVENANCE_LABELS,
  type DataProvenance,
} from "@/lib/research-visual-data";

const provenanceStyles: Record<DataProvenance, string> = {
  "current-static-snapshot":
    "border-[#3DDC97]/35 bg-[#3DDC97]/[0.06] text-[#79E8B5]",
  "academic-context":
    "border-[#4D8DFF]/35 bg-[#4D8DFF]/[0.06] text-[#8CB5FF]",
  "conceptual-illustration":
    "border-[#9B6CFF]/35 bg-[#9B6CFF]/[0.06] text-[#BDA2FF]",
  "planned-research":
    "border-dashed border-[#FFB547]/45 bg-[#FFB547]/[0.04] text-[#FFC56F]",
};

export function ProvenanceBadge({ provenance }: { provenance: DataProvenance }) {
  return (
    <span
      className={`inline-flex w-fit rounded border px-2 py-1 text-[10px] font-semibold uppercase leading-none tracking-normal ${provenanceStyles[provenance]}`}
    >
      {PROVENANCE_LABELS[provenance]}
    </span>
  );
}
