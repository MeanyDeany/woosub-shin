import { metadataFor } from "@/lib/site-metadata";
import {
  CtaLink,
  EditorialSection,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";
import { buildLog } from "@/lib/public-progress";

export const metadata = metadataFor(
  "/build-log",
  "Build Log",
  "Historical research-infrastructure milestones and a bounded verification constraint, with evidence and limitations.",
);

export default function BuildLogPage() {
  return (
    <PageShell>
      <PageHero
        accent="blue"
        eyebrow="Build log"
        title="What changed, what it proved, and what it still cannot claim."
        intro="Historical infrastructure milestones and a documented verification constraint. Each record retains its evidence and limitations; research findings are organized separately on ASTRA."
        actions={
          <>
            <CtaLink href="/projects/multi-asset-research-lab" kind="primary">
              Inspect research infrastructure
            </CtaLink>
            <CtaLink href="/projects/multi-asset-research-lab/claims">
              Read the claims ledger
            </CtaLink>
          </>
        }
        metadata={[
          { label: "Entries", value: String(buildLog.length) },
          { label: "Sources", value: "Historical milestones · supplied engineering record" },
          { label: "Update style", value: "Curated, not automated" },
          { label: "Trading authority", value: "None" },
        ]}
      />

      <EditorialSection
        id="pr41-boundary-digest"
        eyebrow="PR41 · Historical verification constraint"
        title="Historical retained verification — BLOCKED"
        intro="The objective is blocked under the frozen canonical boundary-digest contract."
      >
        <blockquote className="research-prose border-l-2 border-[var(--evidence-constrained)] pl-5">
          The study attempted near-linear historical retained verification while preserving exact historical boundary SHA-256 semantics. Under the frozen canonical boundary-digest contract, exact historical digest validation still requires quadratic suffix hashing. The objective is blocked under that contract.
        </blockquote>
        <dl className="metadata-list border-y mt-8">
          {[
            ["Objective", "Near-linear historical retained verification."],
            ["Frozen constraint", "Preserve exact historical boundary SHA-256 semantics."],
            ["Evidence", "Under this frozen contract, exact historical digest validation still requires quadratic suffix hashing."],
            ["Consequence", "Preserve the exactness claim and document the blocker. This does not establish that all verification is inherently quadratic, indicate a production outage, or approve a changed digest contract."],
            ["Source", "Supplied engineering record maintained in the private research archive. An exact public report or PR URL is unavailable."],
          ].map(([label, value]) => <div key={label} className="metadata-row grid gap-2 border-b last:border-b-0 py-4 sm:grid-cols-[9rem_1fr]"><dt className="metadata-key">{label}</dt><dd className="metadata-value">{value}</dd></div>)}
        </dl>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Chronological record"
        title="Historical engineering milestones"
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
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#111A2E] sm:text-3xl">
                    {entry.title}
                  </h3>
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
            ["Authorized", "Operational use requires its own explicit authority. These research milestones do not authorize trading."],
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
