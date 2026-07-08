import type { Metadata } from "next";
import { Card, PageSection, PageShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Bitcoin Bubble Detection with GSADF | Woosub Shin",
  description:
    "A seminar paper applying explosive-root testing to Bitcoin price dynamics.",
};

const methodItems = [
  "Right-tailed explosive-root testing applied to Bitcoin price dynamics.",
  "GSADF-style bubble detection used to examine periods of explosive behavior.",
  "Time-series framing focused on diagnostics rather than market guidance.",
];

const lessons = [
  "Bubble diagnostics require cautious interpretation and clear sample boundaries.",
  "Explosive-root evidence can identify unusual price dynamics without becoming a trading rule.",
  "Crypto-asset research benefits from separating statistical diagnostics from market recommendations.",
];

const boundaryItems = [
  "This paper is academic research.",
  "It is not financial advice.",
  "It does not provide trading signals.",
  "It does not recommend buying or selling Bitcoin.",
];

export default function BitcoinBubbleGsadfPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <p className="mb-5 text-sm font-semibold uppercase text-emerald-300">
          Seminar paper
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-5xl">
          Bitcoin Bubble Detection with GSADF
        </h1>
        <p className="mt-5 max-w-3xl text-xl text-neutral-300">
          A seminar paper applying explosive-root testing to Bitcoin price dynamics.
        </p>
        <a
          href="/papers/bitcoin-bubble-gsadf-seminar-paper.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-lg bg-emerald-300 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          View PDF
        </a>
      </section>

      <PageSection title="Overview">
        <Card>
          <p className="max-w-4xl text-neutral-300">
            This seminar paper studies Bitcoin bubble detection using
            right-tailed explosive-root testing. The project is positioned as a
            crypto-asset diagnostic study, not as an investment product.
          </p>
        </Card>
      </PageSection>

      <PageSection title="Method">
        <div className="grid gap-4 md:grid-cols-3">
          {methodItems.map((item) => (
            <Card key={item}>
              <p className="text-neutral-300">{item}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Research Framing">
        <Card>
          <p className="max-w-4xl text-neutral-300">
            The paper uses statistical tests to examine bubble episodes and Bitcoin
            price dynamics. Its purpose is academic interpretation of explosive-root
            diagnostics, not financial advice or execution guidance.
          </p>
        </Card>
      </PageSection>

      <PageSection title="Lessons">
        <div className="grid gap-4 md:grid-cols-3">
          {lessons.map((lesson) => (
            <Card key={lesson}>
              <p className="text-neutral-300">{lesson}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Boundary">
        <div className="grid gap-3 md:grid-cols-2">
          {boundaryItems.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-neutral-200"
            >
              {item}
            </div>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
