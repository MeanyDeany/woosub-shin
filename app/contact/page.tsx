import { Card, PageSection, PageShell } from "@/components/site-shell";

const interests = [
  "Quant research infrastructure",
  "Financial econometrics roles",
  "Market data validation systems",
  "Volatility and risk diagnostics",
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageSection
        eyebrow="Contact"
        title="Research-Focused Opportunities"
        className="pt-16"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <h1 className="text-2xl font-semibold text-white">Woosub Shin</h1>
            <p className="mt-4 text-neutral-300">
              Interested in research infrastructure, financial econometrics, and
              validation systems for market data.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:woosub815@gmail.com"
                className="rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm font-semibold text-neutral-100 transition hover:border-emerald-300/60 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                woosub815@gmail.com
              </a>
              <a
                href="https://github.com/MeanyDeany"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm font-semibold text-neutral-100 transition hover:border-emerald-300/60 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                GitHub: MeanyDeany
              </a>
            </div>
            <p className="mt-5 text-sm text-neutral-500">
              This portfolio does not provide financial advice, trading signals, or
              execution services.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-white">Open to</h2>
            <ul className="mt-5 space-y-3">
              {interests.map((interest) => (
                <li
                  key={interest}
                  className="border-l border-emerald-300/40 pl-4 text-neutral-300"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </PageSection>
    </PageShell>
  );
}
