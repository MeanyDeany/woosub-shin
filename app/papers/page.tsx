import type { Metadata } from "next";
import Link from "next/link";
import { Card, PageSection, PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Papers | Woosub Shin",
  description:
    "Selected academic and research papers in financial econometrics, futures markets, and crypto-asset diagnostics.",
};

const papers = [
  {
    title: "Volatility Regime Filtering in Futures Markets",
    label: "MSc Thesis",
    description:
      "An EGARCH-based intraday futures research framework studying whether volatility-regime conditioning can improve the risk-adjusted profile of an otherwise identical futures strategy framework.",
    tags: [
      "Financial Econometrics",
      "EGARCH",
      "Intraday Futures",
      "Volatility Regimes",
      "Risk Management",
    ],
    pdfHref: "/papers/volatility-regime-filtering-thesis.pdf",
    projectHref: "/projects/volatility-regime-filtering",
  },
  {
    title: "Bitcoin Bubble Detection with GSADF",
    label: "Seminar Paper",
    description:
      "A crypto-asset bubble detection study using right-tailed explosive-root testing to examine Bitcoin price dynamics and bubble episodes.",
    tags: ["Bitcoin", "GSADF", "Bubble Detection", "Time Series", "Crypto Assets"],
    pdfHref: "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf",
  },
];

export default function PapersPage() {
  return (
    <PageShell>
      <PageSection eyebrow="Academic work" title="Papers" className="pt-16">
        <p className="-mt-4 mb-8 max-w-3xl text-neutral-400">
          Selected academic and research papers in financial econometrics, futures
          markets, and crypto-asset diagnostics.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          {papers.map((paper) => (
            <Card key={paper.title}>
              <p className="text-sm font-semibold uppercase text-emerald-300">
                {paper.label}
              </p>
              <h1 className="mt-4 text-2xl font-semibold text-white">
                {paper.title}
              </h1>
              <p className="mt-4 text-neutral-400">{paper.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 px-3 py-1 text-sm text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={paper.pdfHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-emerald-300 px-4 py-2 text-center text-sm font-semibold text-neutral-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-neutral-950"
                >
                  View PDF
                </a>
                {paper.projectHref ? (
                  <Link
                    href={paper.projectHref}
                    className="rounded-lg border border-emerald-300/50 px-4 py-2 text-center text-sm font-semibold text-emerald-200 transition hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    Project Page
                  </Link>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
