import type { Metadata } from "next";
import Link from "next/link";
import {
  CapabilityBand,
  CtaLink,
  EditorialSection,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Quant Research & Financial Econometrics",
  description:
    "Woosub Shin builds time-respecting, auditable systems for financial econometrics, volatility research, and research infrastructure.",
};

const pillars = [
  {
    accent: "cyan" as const,
    index: "01",
    title: "Research Systems",
    text: "Deterministic pipelines that connect completed market data, model states, forward outcomes, and reviewable provenance.",
  },
  {
    accent: "blue" as const,
    index: "02",
    title: "Financial Econometrics",
    text: "Volatility models and time-series diagnostics treated as measured research instruments, not automatic market permissions.",
  },
  {
    accent: "amber" as const,
    index: "03",
    title: "Evidence Discipline",
    text: "Time-respecting construction, explicit boundaries, immutable history, and robustness before interpretation.",
  },
] as const;

const selectedWork = [
  {
    accent: "cyan" as const,
    context: "Research infrastructure",
    href: "/projects/btc-futures-research",
    index: "01",
    summary:
      "Immutable volatility-forecast evidence, factual forward-outcome validation, and operational integrity monitoring for BTCUSDT research.",
    tags: ["GARCH family", "HAR-RV", "Evidence ledgers"],
    title: "BTC Futures Research Assistant",
  },
  {
    accent: "blue" as const,
    context: "MSc Economics thesis",
    href: "/projects/volatility-regime-filtering",
    index: "02",
    summary:
      "NQ and ES intraday futures research using EGARCH as a volatility-regime risk and admissibility layer—not a direction predictor.",
    tags: ["NQ & ES", "EGARCH", "Intraday futures"],
    title: "Volatility Regime Filtering in Futures Markets",
  },
  {
    accent: "amber" as const,
    context: "Seminar paper",
    href: "/projects/bitcoin-bubble-gsadf",
    index: "03",
    summary:
      "A statistical diagnostic study of explosive Bitcoin price dynamics using right-tailed GSADF testing.",
    tags: ["Bitcoin", "GSADF", "Time series"],
    title: "Bitcoin Bubble Detection with GSADF",
  },
] as const;

const process = [
  ["01", "Data", "Completed observations and explicit time alignment"],
  ["02", "Models", "Specifications with clearly bounded roles"],
  ["03", "Validation", "Lookahead-safe outcomes and robustness checks"],
  ["04", "Evidence", "Append-only, inspectable research records"],
  ["05", "Integrity", "Failure states and provenance kept visible"],
] as const;

const capabilities = [
  "Statistical volatility modeling",
  "Anti-lookahead validation",
  "Deterministic pipelines",
  "Immutable evidence",
  "Operational monitoring",
] as const;

export default function Home() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Quant research · Financial econometrics"
        title="Woosub Shin"
        intro="I build time-respecting, auditable research systems for market data, volatility modeling, validation, and evidence—designed to make every conclusion easier to inspect."
        actions={
          <>
            <CtaLink href="/projects" kind="primary">
              Explore projects
            </CtaLink>
            <CtaLink href="/papers">Read papers</CtaLink>
          </>
        }
        metadata={[
          { label: "Focus", value: "Quant research infrastructure" },
          { label: "Methods", value: "Financial econometrics · time series" },
          { label: "Context", value: "MSc Economics" },
          { label: "Boundary", value: "Research only" },
        ]}
      />

      <EditorialSection
        eyebrow="Research practice"
        title="Three pillars, one evidence standard"
        intro="The work combines model design with the systems discipline needed to keep research temporally valid, reproducible, and appropriately bounded."
      >
        <ol className="grid gap-px border-y border-[#7E8B9D]/15 bg-[#7E8B9D]/15 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.title} className="bg-[#0B0F16] px-6 py-7 sm:px-7 sm:py-8">
              <StatusLabel accent={pillar.accent}>{pillar.index}</StatusLabel>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#F4F7FB]">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#8996A8]">{pillar.text}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Selected work"
        title="Research with visible lineage"
        intro="The project hierarchy moves from academic econometrics to a systems-oriented public research showcase, while preserving the scope of each contribution."
        tone="deep"
      >
        <div>
          {selectedWork.map((project) => (
            <article
              key={project.title}
              className="grid gap-5 border-t border-[#7E8B9D]/18 py-8 first:border-t-0 first:pt-0 md:grid-cols-[3rem_minmax(0,1fr)_minmax(15rem,0.7fr)] md:gap-8"
            >
              <p className="font-mono text-xs text-[#67DFF7]">{project.index}</p>
              <div>
                <p className="text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-[#8CB5FF]">
                  {project.context}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#F4F7FB]">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A8B3C2]">
                  {project.summary}
                </p>
              </div>
              <div className="flex flex-col items-start justify-between gap-5">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <ResearchTag key={tag}>{tag}</ResearchTag>
                  ))}
                </div>
                <Link
                  href={project.href}
                  className="inline-flex min-h-10 items-center border-b border-[#42D7F5]/45 py-2 text-sm font-semibold text-[#DCE3EC] hover:border-[#42D7F5] hover:text-white focus-visible:outline-none"
                >
                  View project <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Operating philosophy"
        title="From observation to defensible evidence"
        intro="Each stage has a distinct responsibility. Keeping those responsibilities separate reduces retrospective interpretation and makes failure easier to diagnose."
      >
        <ol className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-5">
          {process.map(([index, title, detail]) => (
            <li key={title} className="min-w-0 bg-[#0B0F16] px-5 py-6">
              <span className="font-mono text-[0.65rem] text-[#C3AEFF]">{index}</span>
              <h3 className="mt-4 text-base font-semibold text-[#F4F7FB]">{title}</h3>
              <p className="mt-3 text-xs leading-6 text-[#8996A8]">{detail}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <CapabilityBand items={capabilities} label="Research capability band" />

      <EditorialSection
        accent="cyan"
        eyebrow="Continue the conversation"
        title="Research roles benefit from evidence that can be challenged"
        tone="deep"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-3xl text-lg leading-8 text-[#B6C0CF]">
            I am interested in quant research, market data, financial econometrics,
            and research infrastructure where auditability is part of the work—not
            an afterthought.
          </p>
          <CtaLink href="/contact" kind="primary">
            Contact Woosub
          </CtaLink>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
