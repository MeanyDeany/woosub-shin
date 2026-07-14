import type { Metadata } from "next";
import {
  CtaLink,
  EditorialSection,
  PageHero,
  ResearchTag,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Woosub Shin about quant research, financial econometrics, market data, and research infrastructure roles.",
};

const interests = [
  "Quant research infrastructure",
  "Financial econometrics",
  "Market data validation",
  "Volatility and risk diagnostics",
  "Reproducible research systems",
] as const;

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Build research that can be inspected"
        intro="I am interested in roles and conversations at the intersection of quant research, financial econometrics, market data, and reliable research infrastructure."
        actions={
          <>
            <a
              href="mailto:woosub815@gmail.com"
              className="inline-flex min-h-11 items-center justify-center border border-[#42D7F5] bg-[#42D7F5] px-5 py-2.5 text-sm font-semibold text-[#061016] transition-colors hover:border-[#7BE7FA] hover:bg-[#7BE7FA] focus-visible:outline-none"
            >
              Email Woosub <span className="ml-2" aria-hidden="true">→</span>
            </a>
            <CtaLink href="https://github.com/MeanyDeany" newTab>
              View GitHub
            </CtaLink>
          </>
        }
        metadata={[
          { label: "Focus", value: "Quant research · econometrics" },
          { label: "Systems", value: "Market data · validation · evidence" },
          { label: "Email", value: "woosub815@gmail.com" },
          { label: "GitHub", value: "MeanyDeany" },
        ]}
      />

      <EditorialSection
        accent="blue"
        eyebrow="Areas of interest"
        title="Where the work fits"
        intro="The strongest fit is research that values careful temporal construction, model-role discipline, and infrastructure that preserves evidence under review."
      >
        <ul className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-5">
          {interests.map((interest, index) => (
            <li key={interest} className="bg-[#0B0F16] px-5 py-6 last:sm:col-span-2 last:lg:col-span-1">
              <span className="font-mono text-[0.65rem] text-[#8CB5FF]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-sm font-medium leading-6 text-[#DCE3EC]">
                {interest}
              </p>
            </li>
          ))}
        </ul>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Direct channels"
        title="A concise next step"
        tone="deep"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.7fr)] lg:items-start">
          <p className="max-w-2xl text-lg leading-8 text-[#B6C0CF]">
            For a role, research discussion, or technical question, email is the
            clearest channel. GitHub contains the public code context connected to
            this portfolio.
          </p>
          <dl className="border-y border-[#7E8B9D]/15">
            <div className="grid gap-2 py-4 sm:grid-cols-[5rem_1fr]">
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">Email</dt>
              <dd>
                <a className="text-sm text-[#DCE3EC] underline decoration-[#42D7F5]/45 hover:text-white" href="mailto:woosub815@gmail.com">
                  woosub815@gmail.com
                </a>
              </dd>
            </div>
            <div className="grid gap-2 border-t border-[#7E8B9D]/12 py-4 sm:grid-cols-[5rem_1fr]">
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">GitHub</dt>
              <dd>
                <a className="text-sm text-[#DCE3EC] underline decoration-[#42D7F5]/45 hover:text-white" href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer">
                  github.com/MeanyDeany
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          <ResearchTag>Research only</ResearchTag>
          <ResearchTag>No contact-form backend</ResearchTag>
          <ResearchTag>No investment advice</ResearchTag>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
