import type { Metadata } from "next";
import {
  CtaLink,
  EditorialSection,
  PageHero,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";
import { claimLedger } from "@/lib/public-progress";

export const metadata: Metadata = {
  title: "Research Claims Ledger",
  description:
    "A public ledger separating demonstrated research capabilities, work in progress, unclaimed outcomes, and explicitly unapproved trading states.",
};

export default function ResearchClaimsLedgerPage() {
  return (
    <PageShell>
      <PageHero
        accent="violet"
        eyebrow="Research claims ledger"
        title="Every public claim carries its evidence and its limit."
        intro="The ledger separates what has been demonstrated from what is still being built, what is not claimed, and what remains explicitly unapproved."
        actions={
          <>
            <CtaLink href="/projects/multi-asset-research-lab" kind="primary">
              Return to the Lab
            </CtaLink>
            <CtaLink href="/build-log">Open the build log</CtaLink>
          </>
        }
        metadata={[
          { label: "Claims", value: String(claimLedger.length) },
          { label: "Evidence standard", value: "Narrow and reproducible" },
          { label: "Profitability claim", value: "None" },
          { label: "Trading approval", value: "None" },
        ]}
      />

      <EditorialSection
        accent="violet"
        eyebrow="Claim by claim"
        title="Evidence without the costume jewellery"
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
                  <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#111A2E] sm:text-3xl">
                    {item.claim}
                  </h2>
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
              Paper and live trading remain unapproved until separately reviewed.
            </p>
          </article>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
