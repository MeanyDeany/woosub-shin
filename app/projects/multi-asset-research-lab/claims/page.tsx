import { metadataFor } from "@/lib/site-metadata";
import {
  CtaLink,
  EditorialSection,
  PageHero,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";
import { claimLedger } from "@/lib/public-progress";
import { researchEvidence } from "@/lib/research-evidence";
import { ResearchFindingCard } from "@/components/research-ui";

export const metadata = metadataFor(
  "/projects/multi-asset-research-lab/claims",
  "Research Claims Ledger",
  "Current ASRA research claims and scoped historical infrastructure evidence, with separate limitations and authority boundaries.",
);

export default function ResearchClaimsLedgerPage() {
  return (
    <PageShell>
      <PageHero
        accent="violet"
        eyebrow="Research claims ledger"
        title="Every public claim carries its evidence and its limit."
        intro="Current ASRA findings and historical infrastructure records retain separate scopes. A completed study, a preserved artifact, and an operational system answer different questions."
        actions={
          <>
            <CtaLink href="/projects/multi-asset-research-lab" kind="primary">
              Return to the Lab
            </CtaLink>
            <CtaLink href="/build-log">Open the build log</CtaLink>
          </>
        }
        metadata={[
          { label: "Historical records", value: String(claimLedger.length) },
          { label: "Evidence standard", value: "Narrow and reproducible" },
          { label: "Profitability claim", value: "None" },
          { label: "Automatic research authority", value: "None" },
        ]}
      />

      <EditorialSection
        eyebrow="Current ASRA findings"
        title="Forecast confirmation and policy utility are separate claims"
        intro="Both studies are completed. The forecast assessment confirms risk information; the policy test did not confirm its preregistered utility claim."
        className="research-page"
      >
        <ResearchFindingCard record={researchEvidence.independentRiskForecast} />
        <ResearchFindingCard record={researchEvidence.policyUtility} />
        <div className="research-actions"><CtaLink href="/asra#evidence-protocol">Read the evidence protocol</CtaLink><CtaLink href="/build-log#pr41-boundary-digest">Read the scoped verification blocker</CtaLink></div>
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Historical infrastructure records"
        title="Claims and their original evidence boundaries"
        intro="Each row answers three questions: what is being said, what supports it, and where the claim stops."
        tone="deep"
      >
        <ol className="space-y-5">
          {claimLedger.map((item, index) => (
            <li key={item.claim} className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <article className="grid gap-6 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(18rem,0.9fr)] lg:gap-8">
                <span className="font-mono text-xs text-[#7251C8]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <StatusLabel accent={item.tone}>{item.status}</StatusLabel>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#111A2E] sm:text-3xl">
                    {item.claim}
                  </h3>
                  <div className="mt-6">
                    <p className="text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-[#77839A]">
                      Evidence
                    </p>
                    <p className="mt-3 text-base leading-7 text-[#657189]">{item.evidence}</p>
                  </div>
                </div>

                <aside className="rounded-[1.5rem] border border-[#D68A2A]/18 bg-[#FFF9F0]/56 p-5 sm:p-6">
                  <p className="text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-[#A85D08]">
                    Claim boundary
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#5F6C82]">{item.limit}</p>
                </aside>
              </article>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Non-negotiable separation"
        title="Evidence is not permission"
        intro="The strongest possible research result still does not create an order, position, entry permission, short permission, leverage decision, or execution authority."
        tone="warm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <StatusLabel accent="emerald">Evidence state</StatusLabel>
            <p className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111A2E]">
              A result may be reproducible, verified, and useful for research.
            </p>
          </article>
          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <StatusLabel accent="amber">Operational state</StatusLabel>
            <p className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111A2E]">
              Research findings do not authorize paper or live trading. Execution systems and read-only account telemetry remain a separate supporting layer.
            </p>
          </article>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
