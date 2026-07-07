import { Card, PageSection, PageShell } from "@/components/site-shell";
import { researchNotes } from "@/lib/content";

const principles = [
  "Use only information available at or before the timestamp being evaluated.",
  "Keep feature research, state validation, and execution assumptions separated.",
  "Treat operational reliability as part of the research process, not an afterthought.",
];

export default function ResearchPage() {
  return (
    <PageShell>
      <PageSection eyebrow="Research Notes" title="Validation Before Permission" className="pt-16">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <h1 className="text-2xl font-semibold text-white">
              Research style
            </h1>
            <p className="mt-4 text-neutral-400">
              My work emphasizes causal feature construction, stable validation
              windows, operational auditability, and clear separation between
              evidence and permission.
            </p>
          </Card>
          <div className="grid gap-4">
            {researchNotes.map((note) => (
              <Card key={note.title}>
                <h2 className="text-lg font-semibold text-white">{note.title}</h2>
                <p className="mt-3 text-neutral-400">{note.summary}</p>
              </Card>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection title="Working Principles">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <Card key={principle}>
              <p className="text-neutral-300">{principle}</p>
            </Card>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
