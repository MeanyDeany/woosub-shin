import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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
    "Technical and professional correspondence with MeanyDeany, an independent quantitative research identity.",
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
        eyebrow="Research correspondence"
        title="Technical and professional correspondence"
        intro="For research discussions, technical questions, academic correspondence, or professional inquiries, send a private message below."
        actions={
          <>
            <a
              href="#message"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#17243D] bg-[#17243D] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(32,55,94,0.18)] transition-transform hover:-translate-y-0.5 hover:bg-[#22375B]"
            >
              Write a message <span className="ml-2" aria-hidden="true">↓</span>
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
        id="message"
        accent="blue"
        eyebrow="Private message"
        title="Send a question directly"
        intro="The form sends a private email notification. Messages are not displayed publicly or written to a website database."
        tone="elevated"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)] lg:items-start">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="site-strong text-xl font-semibold tracking-[-0.03em]">
              Useful topics
            </p>
            <ul className="site-body mt-5 grid gap-3 text-sm leading-6">
              {interests.map((interest, index) => (
                <li key={interest} className="flex gap-3 border-t border-[#7187AB]/14 pt-3 first:border-t-0 first:pt-0">
                  <span className="font-mono text-[0.65rem] text-[#2563C9]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
            <p className="site-muted mt-6 text-xs leading-5">
              This channel is for research, technical, academic, and professional correspondence.
              It is not a market-signal or investment-advice service.
            </p>
          </div>
          <ContactForm />
        </div>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Research identity"
        title="MeanyDeany is an independent quantitative research identity focused on auditable market-data, volatility, and validation systems."
        intro="The public program brings together quantitative research systems, academic financial econometrics, and evidence-focused infrastructure under one consistent brand."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:items-start">
          <dl className="metadata-list border-y">
            <div className="metadata-row grid gap-2 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="metadata-key">Identity</dt>
              <dd className="metadata-value">MeanyDeany</dd>
            </div>
            <div className="metadata-row grid gap-2 border-t py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="metadata-key">Focus</dt>
              <dd className="metadata-value">Auditable market data, volatility, and validation systems</dd>
            </div>
          </dl>
          <ul className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2">
            {interests.map((interest, index) => (
              <li key={interest} className="bg-[#0B0F16] px-5 py-5 last:sm:col-span-2">
                <span className="font-mono text-[0.65rem] text-[#8CB5FF]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-medium leading-6 text-[#DCE3EC]">{interest}</p>
              </li>
            ))}
          </ul>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Direct channels"
        title="Contact details"
        tone="deep"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.7fr)] lg:items-start">
          <p className="max-w-2xl text-lg leading-8 text-[#B6C0CF]">
            The form is the quickest route. Direct email remains available if the form service
            is unavailable. GitHub contains the public code context connected to this program.
          </p>
          <dl className="metadata-list border-y">
            <div className="metadata-row grid gap-2 py-4 sm:grid-cols-[5rem_1fr]">
              <dt className="metadata-key">Email</dt>
              <dd>
                <a className="metadata-link metadata-value underline decoration-[#42D7F5]/45" href="mailto:woosub815@gmail.com">
                  woosub815@gmail.com
                </a>
              </dd>
            </div>
            <div className="metadata-row grid gap-2 border-t py-4 sm:grid-cols-[5rem_1fr]">
              <dt className="metadata-key">GitHub</dt>
              <dd>
                <a className="metadata-link metadata-value underline decoration-[#42D7F5]/45" href="https://github.com/MeanyDeany" target="_blank" rel="noreferrer">
                  github.com/MeanyDeany
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          <ResearchTag>Private email delivery</ResearchTag>
          <ResearchTag>No message database</ResearchTag>
          <ResearchTag>No investment advice</ResearchTag>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
