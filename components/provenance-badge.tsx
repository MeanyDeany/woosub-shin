import {
  PROVENANCE_LABELS,
  type DataProvenance,
} from "@/lib/research-visual-data";

export function ProvenanceBadge({ provenance }: { provenance: DataProvenance }) {
  return (
    <span className="inline-flex w-fit rounded-md border border-white/10 bg-neutral-950 px-2.5 py-1 text-xs font-semibold text-neutral-300">
      {PROVENANCE_LABELS[provenance]}
    </span>
  );
}
