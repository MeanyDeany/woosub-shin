import type { Metadata } from "next";
import {
  CtaLink,
  EditorialSection,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Papers",
  description:
    "MeanyDeany academic papers on volatility-regime filtering in NQ and ES futures and GSADF-based Bitcoin bubble diagnostics.",
};

const papers = [
  {
    abstract:
      "Studies whether daily EGARCH volatility regimes can serve as a risk and admissibility layer for an intraday NQ and ES futures framework. The volatility model is evaluated as conditioning context, not as a price-direction predictor.",
    accent: "blue" as const,
    methods: ["EGARCH(1,1)", "Student-t", "Ablation", "Walk-forward", "Bootstrap"],
    pdfHref: "/papers/volatility-regime-filtering-thesis.pdf",
    projectHref: "/projects/volatility-regime-filtering",
    scope: "E-mini Nasdaq-100 (NQ) and E-mini S&P 500 (ES) intraday futures",
    title: "Volatility Regime Filtering in Futures Markets",
    type: "MSc Economics thesis",
  },
  {
    abstract:
      "Applies right-tailed explosive-root testing to examine periods of statistically explosive Bitcoin price behavior. The study is framed as a time-series diagnostic, not as market guidance or a trading rule.",
    accent: "amber" as const,
    methods: ["GSADF", "Right-tailed tests", "Explosive roots", "Time series"],
    pdfHref: "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf",
    projectHref: "/projects/bitcoin-bubble-gsadf",
    scope: "Bitcoin price dynamics",
    title: "Bitcoin Bubble Detection with GSADF",
    type: "Seminar paper",
  },
] as const;

export default function PapersPage() {
  return (
    <PageShell>
      <PageHero
        accent="blue"
        eyebrow="MeanyDeany · Publication archive"
        title="Papers"
        intro="The academic foundation of the research program: original work in financial econometrics and crypto-asset time-series diagnostics."
        metadata={[
          { label: "Archive", value: "2 academic papers" },
          { label: "Methods", value: "EGARCH · GSADF" },
          { label: "Scope", value: "NQ · ES · Bitcoin" },
          { label: "Format", value: "Original PDF files" },
        ]}
      />

      <EditorialSection
        accent="blue"
        eyebrow="Academic work"
        title="Publication record"
        intro="Each entry separates its summary, empirical scope, and methods from the actions used to read the paper or inspect its project context."
      >
        <ol>
          {papers.map((paper, index) => (
            <li
              key={paper.title}
              className="grid gap-7 border-t border-[#7E8B9D]/18 py-10 first:border-t-0 first:pt-0 lg:grid-cols-[3rem_minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:gap-10"
            >
              <p className="font-mono text-xs text-[#8CB5FF]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <article>
                <StatusLabel accent={paper.accent}>{paper.type}</StatusLabel>
                <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#F4F7FB] sm:text-3xl">
                  {paper.title}
                </h3>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#A8B3C2]">
                  {paper.abstract}
                </p>
                <dl className="mt-7 border-y border-[#7E8B9D]/15">
                  <div className="grid gap-2 py-4 sm:grid-cols-[7rem_1fr]">
                    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">
                      Market scope
                    </dt>
                    <dd className="text-sm leading-6 text-[#DCE3EC]">{paper.scope}</dd>
                  </div>
                </dl>
              </article>
              <div className="flex flex-col items-start justify-between gap-8">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-[#6F7D90]">
                    Methods
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {paper.methods.map((method) => (
                      <ResearchTag key={method}>{method}</ResearchTag>
                    ))}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
                  <CtaLink href={paper.pdfHref} kind="primary" newTab>
                    View PDF
                  </CtaLink>
                  <CtaLink href={paper.projectHref}>Project page</CtaLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </EditorialSection>
    </PageShell>
  );
}
