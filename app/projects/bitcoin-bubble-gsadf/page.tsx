import type { Metadata } from "next";
import {
  CtaLink,
  EditorialSection,
  EvidenceBand,
  PageHero,
  ResearchTag,
  StatusLabel,
} from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Bitcoin Bubble Detection with GSADF",
  description:
    "A seminar paper applying right-tailed GSADF explosive-root testing to Bitcoin price dynamics as an academic time-series diagnostic.",
};

const method = [
  {
    index: "01",
    title: "Frame the series",
    text: "Define the Bitcoin price sample and the time-series question before interpreting explosive episodes.",
  },
  {
    index: "02",
    title: "Apply right-tailed tests",
    text: "Use recursive explosive-root statistics to evaluate departures from unit-root behavior across varying windows.",
  },
  {
    index: "03",
    title: "Date episodes",
    text: "Compare test statistics with critical values to identify periods of statistically explosive behavior.",
  },
  {
    index: "04",
    title: "Constrain interpretation",
    text: "Treat detections as sample-bound diagnostics rather than trading signals or proof of fundamental mispricing.",
  },
] as const;

const lessons = [
  ["Sample boundaries matter", "Episode dating depends on the selected series, frequency, and sample window."],
  ["Diagnostics are not decisions", "Explosive-root evidence can characterize price dynamics without becoming a buy or sell rule."],
  ["Interpretation needs context", "A statistical bubble label does not by itself explain the economic mechanism behind an episode."],
] as const;

export default function BitcoinBubbleGsadfPage() {
  return (
    <PageShell>
      <PageHero
        accent="amber"
        eyebrow="Seminar paper · Crypto-asset diagnostics"
        title="Bitcoin Bubble Detection with GSADF"
        intro="A time-series study applying right-tailed explosive-root testing to identify and interpret periods of statistically explosive Bitcoin price behavior."
        actions={
          <CtaLink
            href="/papers/bitcoin-bubble-gsadf-seminar-paper.pdf"
            kind="primary"
            newTab
          >
            View paper PDF
          </CtaLink>
        }
        metadata={[
          { label: "Asset", value: "Bitcoin" },
          { label: "Method", value: "GSADF" },
          { label: "Question", value: "Explosive price dynamics" },
          { label: "Context", value: "Academic diagnostic" },
        ]}
      />

      <EditorialSection
        accent="amber"
        eyebrow="Research framing"
        title="A diagnostic question, not a market recommendation"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] lg:gap-16">
          <p className="text-lg leading-8 text-[#B6C0CF]">
            The paper examines whether recursive right-tailed unit-root tests can
            identify periods when Bitcoin prices exhibit explosive behavior. The
            statistical result describes the series within the sample; it does not
            recommend buying, selling, timing, or execution.
          </p>
          <div>
            <StatusLabel accent="amber">Academic context</StatusLabel>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Bitcoin",
                "GSADF",
                "Explosive roots",
                "Bubble dating",
                "Time series",
              ].map((tag) => (
                <ResearchTag key={tag}>{tag}</ResearchTag>
              ))}
            </div>
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        accent="violet"
        eyebrow="Method"
        title="Recursive testing with bounded interpretation"
        tone="deep"
      >
        <ol className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 md:grid-cols-2 lg:grid-cols-4">
          {method.map((step) => (
            <li key={step.title} className="bg-[#0B0F16] p-5 sm:p-6">
              <span className="font-mono text-[0.65rem] text-[#C3AEFF]">{step.index}</span>
              <h3 className="mt-5 text-base font-semibold text-[#F4F7FB]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#8996A8]">{step.text}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        accent="blue"
        eyebrow="Research record"
        title="What the paper establishes"
      >
        <EvidenceBand
          accent="amber"
          items={[
            { label: "Test family", value: "Right-tailed explosive-root tests" },
            { label: "Recursive design", value: "Varying windows across the sample" },
            { label: "Output", value: "Statistically explosive episodes" },
            { label: "Boundary", value: "No trading or investment guidance" },
          ]}
        />
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Lessons"
        title="The test is only as strong as its framing"
        tone="warm"
      >
        <dl className="grid gap-px border border-[#7E8B9D]/15 bg-[#7E8B9D]/15 lg:grid-cols-3">
          {lessons.map(([term, detail]) => (
            <div key={term} className="bg-[#0D0C0B] p-6">
              <dt className="font-semibold text-[#F4F7FB]">{term}</dt>
              <dd className="mt-4 text-sm leading-7 text-[#8996A8]">{detail}</dd>
            </div>
          ))}
        </dl>
      </EditorialSection>

      <EditorialSection
        accent="amber"
        eyebrow="Research boundary"
        title="Academic interpretation only"
        tone="deep"
      >
        <p className="max-w-4xl text-base leading-8 text-[#A8B3C2]">
          This seminar paper is academic research. It does not provide trading
          signals, recommend buying or selling Bitcoin, or offer investment advice.
        </p>
      </EditorialSection>
    </PageShell>
  );
}
