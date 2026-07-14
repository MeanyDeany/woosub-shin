import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaLink,
  EditorialSection,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Research Program",
  description:
    "MeanyDeany is a public quantitative research program spanning financial econometrics, immutable evidence pipelines, and reusable research infrastructure.",
};

const lineage = [
  {
    accent: "amber" as const,
    index: "01",
    href: "/projects/bitcoin-bubble-gsadf",
    label: "Earlier time-series research",
    title: "Bitcoin bubble diagnostics",
    detail: "GSADF testing established a first discipline: statistical detection must remain separate from market recommendation.",
  },
  {
    accent: "blue" as const,
    index: "02",
    href: "/projects/volatility-regime-filtering",
    label: "Academic financial-econometrics foundation",
    title: "Volatility-regime filtering for NQ and ES",
    detail: "The MSc thesis treated EGARCH as volatility-conditioning context rather than a directional predictor.",
  },
  {
    accent: "cyan" as const,
    index: "03",
    href: "/projects/btc-futures-research",
    label: "Current public research infrastructure",
    title: "BTC evidence infrastructure",
    detail: "The flagship system records model fits, forecast states, forward outcomes, provenance, and integrity review as distinct evidence stages.",
  },
  {
    accent: "violet" as const,
    index: "04",
    href: "/projects",
    label: "Future multi-asset research direction",
    title: "Unified multi-asset research framework",
    detail: "The next research direction is reusable validation architecture across assets, with factual scope labels kept separate from operational claims.",
  },
] as const;

const scope = [
  ["BTCUSDT", "Current research infrastructure", "cyan"],
  ["NQ / ES", "Academic foundation", "blue"],
  ["SPY / QQQ", "Controlled data-trial scope", "emerald"],
  ["Gold", "Planned commodity research", "violet"],
] as const;

const architecture = [
  ["01", "Market Data", "Completed observations with explicit source identity"],
  ["02", "Input Construction", "Time-aligned inputs with no silent repair"],
  ["03", "Model Fits", "Narrow statistical specifications and frozen provenance"],
  ["04", "Forecast States", "Descriptive model evidence without permission semantics"],
  ["05", "Forward Outcomes", "Outcomes appended only after the horizon closes"],
  ["06", "Integrity Review", "Duplicates, references, freshness, and failure states inspected"],
] as const;

const principles = [
  "No lookahead repair",
  "No retrospective rewriting",
  "No model-to-permission shortcut",
  "No execution authority",
] as const;

const findings = [
  "EGARCH was studied as a volatility-conditioning layer, not a direction predictor.",
  "Its point estimate exceeded GARCH and GJR-GARCH in a pre-OOS comparison, but the difference was not statistically decisive.",
  "HAR-Jump survived as a defensive risk-context candidate, not an entry signal.",
  "Evidence integrity and operational reliability became part of the research methodology.",
] as const;

export default function Home() {
  return (
    <PageShell>
      <PageHero
        eyebrow="MeanyDeany · Quantitative Research Systems"
        title="Volatility, validation, and evidence that can survive inspection."
        intro="A public quantitative research program spanning financial econometrics, immutable evidence pipelines, and reusable research infrastructure."
        actions={
          <>
            <CtaLink href="#flagship" kind="primary">
              Explore the research system
            </CtaLink>
            <CtaLink href="/research">Read the methodology</CtaLink>
          </>
        }
        metadata={[
          { label: "Identity", value: "MeanyDeany" },
          { label: "Focus", value: "Volatility · validation · evidence" },
          { label: "Method", value: "Time-respecting and auditable" },
          { label: "Boundary", value: "Research only" },
        ]}
      />

      <EditorialSection
        id="flagship"
        eyebrow="Flagship system"
        title="BTC Futures Research Assistant"
        intro="The current public research infrastructure turns statistical volatility forecasts into inspectable evidence without crossing into strategy approval or execution."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.75fr)] lg:gap-16">
          <div>
            <StatusLabel accent="cyan">Current public research infrastructure</StatusLabel>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[#DCE3EC]">
              A deterministic BTCUSDT research pipeline for model fits, hourly forecast
              states, forward outcomes, immutable provenance, and integrity monitoring.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#8996A8]">
              Model evidence remains descriptive. The system provides no entry permission,
              short permission, leverage sizing, execution connection, or investment advice.
            </p>
            <div className="mt-8">
              <CtaLink href="/projects/btc-futures-research#evidence-pipeline" kind="primary">
                Inspect the evidence pipeline
              </CtaLink>
            </div>
          </div>
          <dl className="border-y border-[#7E8B9D]/18">
            {[
              ["Evidence", "Append-only event ledgers"],
              ["Models", "GARCH family · HAR-RV"],
              ["Validation", "Forward outcomes after horizon close"],
              ["Authority", "No execution or permission role"],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-[#7E8B9D]/12 py-4 last:border-b-0 sm:grid-cols-[7rem_1fr]">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">{label}</dt>
                <dd className="text-sm leading-6 text-[#67DFF7]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Research lineage"
        title="From diagnostics to reusable evidence systems"
        intro="The program develops through connected questions rather than disconnected project cards. Each stage keeps its original provenance and claim boundary."
        tone="deep"
      >
        <ol className="divide-y divide-[#7E8B9D]/15 border-y border-[#7E8B9D]/15">
          {lineage.map((item) => (
            <li
              key={item.index}
              className="grid gap-4 py-7 md:grid-cols-[3rem_minmax(13rem,0.75fr)_minmax(0,1.25fr)] md:gap-8"
            >
              <span className="font-mono text-xs text-[#8CB5FF]">{item.index}</span>
              <div>
                <StatusLabel accent={item.accent}>{item.label}</StatusLabel>
                <h3 className="mt-4 text-xl font-semibold text-[#F4F7FB]">
                  <Link className="underline decoration-[#475466] hover:decoration-[#42D7F5]" href={item.href}>
                    {item.title}
                  </Link>
                </h3>
              </div>
              <p className="text-sm leading-7 text-[#8996A8]">{item.detail}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="emerald"
        eyebrow="Current research scope"
        title="Scope labels, not live operational states"
        intro="These labels describe the public research program's present and planned coverage. They do not report live market, model, server, or execution status."
      >
        <dl className="divide-y divide-[#7E8B9D]/15 border-y border-[#7E8B9D]/15">
          {scope.map(([asset, state, accent], index) => (
            <div
              key={asset}
              className="grid gap-4 py-5 sm:grid-cols-[3rem_minmax(8rem,0.6fr)_minmax(0,1.4fr)] sm:items-center sm:gap-6"
            >
              <span className="font-mono text-[0.68rem] text-[#79E8B5]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <dt className="font-mono text-sm font-semibold text-[#F4F7FB]">{asset}</dt>
              <dd><StatusLabel accent={accent}>{state}</StatusLabel></dd>
            </div>
          ))}
        </dl>
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Research architecture"
        title="A traceable path from observation to review"
        intro="Each stage has one bounded responsibility, preserving the distinction between factual inputs, model output, later outcomes, and integrity decisions."
        tone="deep"
      >
        <ol className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 sm:grid-cols-2 lg:grid-cols-3">
          {architecture.map(([index, title, detail]) => (
            <li key={title} className="min-w-0 bg-[#0B0F16] p-6">
              <span className="font-mono text-[0.65rem] text-[#C3AEFF]">{index}</span>
              <h3 className="mt-5 text-base font-semibold text-[#F4F7FB]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#8996A8]">{detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-2">
          {principles.map((principle) => <ResearchTag key={principle}>{principle}</ResearchTag>)}
        </div>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Bounded findings"
        title="What the research record currently supports"
        intro="These statements preserve uncertainty and model-role limits. They are research findings, not trading instructions."
        tone="warm"
      >
        <ol className="divide-y divide-[#7E8B9D]/15 border-y border-[#7E8B9D]/15">
          {findings.map((finding, index) => (
            <li key={finding} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span className="font-mono text-[0.68rem] text-[#FFC56F]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-base leading-8 text-[#B6C0CF]">{finding}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Research record"
        title="Papers and methodology"
      >
        <div className="divide-y divide-[#7E8B9D]/15 border-y border-[#7E8B9D]/15">
          {[
            ["Academic papers", "Original thesis and seminar-paper PDFs with their project context.", "/papers", "Open papers"],
            ["Research methodology", "Time-respecting construction, narrow model roles, robust comparison, and visible failure states.", "/research", "Read methodology"],
          ].map(([title, detail, href, label]) => (
            <article key={href} className="grid gap-5 py-7 md:grid-cols-[minmax(12rem,0.6fr)_minmax(0,1fr)_auto] md:items-center md:gap-8">
              <h3 className="text-xl font-semibold text-[#F4F7FB]">{title}</h3>
              <p className="text-sm leading-7 text-[#8996A8]">{detail}</p>
              <Link className="text-sm font-semibold text-[#DCE3EC] underline decoration-[#42D7F5]/45 hover:text-white" href={href}>
                {label}
              </Link>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        eyebrow="Research correspondence"
        title="Questions, critiques, and technical correspondence"
        tone="deep"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="max-w-3xl text-lg leading-8 text-[#B6C0CF]">
              Correspondence about the public research program, its methodology, or
              professional applications of auditable quantitative research is welcome.
            </p>
            <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#566274]">
              Public research identity: MeanyDeany
            </p>
          </div>
          <CtaLink href="/contact" kind="primary">Contact</CtaLink>
        </div>
      </EditorialSection>
    </PageShell>
  );
}
