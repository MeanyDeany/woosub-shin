import type { Metadata } from "next";
import {
  CtaLink,
  EditorialSection,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";
import { buildLog } from "@/lib/public-progress";

export const metadata: Metadata = {
  title: "Build Log",
  description:
    "A curated record of what changed in the research systems, what each milestone proved, and what it still cannot claim.",
};

export default function BuildLogPage() {
  return (
    <PageShell>
      <PageHero
        accent="blue"
        eyebrow="Build log"
        title="What changed, what it proved, and what it still cannot claim."
        intro="This is a curated engineering record, not a marketing feed. Each entry names the completed capability, the evidence behind it, and the boundary that remains in force."
        actions={
          <>
            <CtaLink href="/projects/multi-asset-research-lab" kind="primary">
              Open the flagship system
            </CtaLink>
            <CtaLink href="/projects/multi-asset-research-lab/claims">
              Read the claims ledger
            </CtaLink>
          </>
        }
        metadata={[
          { label: "Entries", value: String(buildLog.length) },
          { label: "Source", value: "Verified repository milestones" },
          { label: "Update style", value: "Curated, not automated" },
          { label: "Trading authority", value: "None" },
        ]}
      />

      <EditorialSection
        accent="blue"
        eyebrow="Chronological record"
        title="The system is shown through completed increments"
        intro="Entries are ordered newest first. A milestone appears here only when its public description can be separated cleanly from unfinished work and unsupported claims."
        tone="deep"
      >
        <ol className="space-y-5">
          {buildLog.map((entry, index) => (
            <li key={`${entry.date}-${entry.title}`} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <article className="grid gap-7 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
                <div>
                  <span className="font-mono text-xs text-[#2563C9]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-5 text-sm font-semibold text-[#24324A]">{entry.date}</p>
                  <div className="mt-3">
                    <StatusLabel accent="blue">{entry.phase}</StatusLabel>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#111A2E] sm:text-3xl">
                    {entry.title}
                  </h2>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-[#657189]">
                    {entry.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {entry.proof.map((item) => (
                      <ResearchTag key={item}>{item}</ResearchTag>
                    ))}
                  </div>

                  <p className="mt-7 border-l-2 border-[#D68A2A]/45 pl-4 text-sm leading-6 text-[#5F6C82]">
                    <span className="font-semibold text-[#3D4A60]">Boundary:</span>{" "}
                    {entry.boundary}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Reading rule"
        title="A build milestone is not an approval milestone"
        intro="New infrastructure can make research more reproducible without making a strategy more profitable, safer, or ready for execution. Those are separate claims requiring separate evidence."
        tone="warm"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Built", "The code or evidence boundary exists and has been validated."],
            ["Proven", "A narrow claim is supported within the exact demonstrated scope."],
            ["Authorized", "Operational use has received a separate explicit approval. This has not happened for trading."],
          ].map(([title, detail], index) => (
            <article key={title} className="glass-panel rounded-[1.75rem] p-6 sm:p-7">
              <span className="font-mono text-xs text-[#A85D08]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-[#111A2E]">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#657189]">{detail}</p>
            </article>
          ))}
        </div>
      </EditorialSection>
    </PageShell>
  );
}
