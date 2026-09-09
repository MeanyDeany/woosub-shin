import Link from "next/link";
import { CtaLink, EditorialSection, PageHero } from "@/components/editorial";
import { ResearchFindingCard } from "@/components/research-ui";
import { PageShell } from "@/components/site-shell";
import { researchEvidence } from "@/lib/research-evidence";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor(
  "/resume",
  "Resume and Background",
  "Woosub Shin, Quantitative Researcher. Economics MSc from the University of Copenhagen, financial econometrics, systematic market research, and reproducible research engineering.",
);

const selectedResearch = [
  researchEvidence.independentRiskForecast,
  researchEvidence.futuresVolatilityThesis,
  researchEvidence.dailyEma,
] as const;

export default function ResumePage() {
  return (
    <PageShell>
      <div className="research-page">
        <PageHero
          eyebrow="About · Resume"
          title="Woosub Shin — Quantitative Researcher"
          intro="Financial econometrics, systematic market research, and reproducible research engineering."
          actions={<><CtaLink href="mailto:woosub815@gmail.com" kind="primary">Email Woosub</CtaLink><CtaLink href="/contact">Get in touch</CtaLink><CtaLink href="https://github.com/MeanyDeany" newTab>GitHub profile</CtaLink></>}
          metadata={[{ label: "Location", value: "Seoul, South Korea" }, { label: "Education", value: "MSc Economics · University of Copenhagen" }, { label: "Tools", value: "Python · SQL · Git · Linux" }]}
        />

        <EditorialSection id="background" eyebrow="Background" title="From a market question to an inspectable experiment">
          <div className="research-grid">
            <div className="research-prose">
              <p>I work at the intersection of financial econometrics and research engineering. I formulate market questions, build reproducible tests, challenge the measurement and comparison, and explain what the evidence supports.</p>
              <p>My work independently confirmed short-horizon BTC risk information and separately tested its policy translation. {researchEvidence.policyUtility.finding}</p>
              <p>My interests span Sales &amp; Trading, systematic trading, quantitative research, asset management, and research engineering.</p>
            </div>
            <article className="research-card">
              <h3>M.Sc. Economics</h3>
              <p className="site-strong mt-3">University of Copenhagen</p>
              <p className="research-prose mt-4">Financial econometrics, time-series analysis, empirical asset pricing, volatility modeling, and systematic strategy research.</p>
              <p className="research-prose mt-4">The academic foundation informs how I define a question, align information in time, compare alternatives, and communicate uncertainty.</p>
            </article>
          </div>
        </EditorialSection>

        <EditorialSection id="research" eyebrow="Selected research" title="Findings, academic work, and a retained historical system" intro="Each study retains its own evidence class, assessment context, and limitations.">
          <div>{selectedResearch.map((record) => <ResearchFindingCard key={record.id} record={record} />)}</div>
          <div className="research-actions"><CtaLink href="/research">View all research findings</CtaLink><CtaLink href="/papers">Read the academic papers</CtaLink></div>
        </EditorialSection>

        <EditorialSection id="skills" eyebrow="Research engineering" title="Build the test and preserve its reasoning">
          <div className="research-grid">
            <article className="research-card">
              <h3>Methodology and infrastructure</h3>
              <p className="research-prose">Data contracts, point-in-time information, deterministic replay, immutable artifacts, content hashing, frozen comparisons, and reproducible experiments.</p>
              <p className="research-prose mt-4">Ablation, placebo tests, cost stress, bootstrap analysis, and walk-forward evaluation challenge the result. Historical selection and prospective observation keep separate boundaries.</p>
              <div className="research-actions"><CtaLink href="/research#methodology">Research methodology</CtaLink><CtaLink href="/projects">Systems and infrastructure</CtaLink></div>
            </article>
            <article className="research-card">
              <h3>Technical tools</h3>
              <ul className="research-prose mt-4 space-y-3">
                <li>Python · SQL / SQLite · Git / GitHub · Linux</li>
                <li>AWS · CI · market-data and research pipelines</li>
                <li>Time-series analysis · backtesting · walk-forward validation · bootstrap</li>
              </ul>
              <p className="research-prose mt-5">AI tools support implementation and review. Research claims remain tied to explicit tests, evidence, and human responsibility.</p>
            </article>
          </div>
          <div className="research-grid mt-10">
            <article className="research-card"><h3>Certification</h3><p className="site-strong mt-4">Certified Investment Manager</p><p className="research-prose mt-2">KOFIA · Korea</p></article>
            <article className="research-card"><h3>Languages</h3><dl className="metadata-list mt-4"><div className="metadata-row flex flex-wrap justify-between gap-4 py-3"><dt>Korean</dt><dd>Native</dd></div><div className="metadata-row flex flex-wrap justify-between gap-4 border-t py-3"><dt>English</dt><dd>Native / bilingual</dd></div></dl></article>
          </div>
        </EditorialSection>

        <EditorialSection id="contact" eyebrow="Contact" title="Research discussions and professional opportunities">
          <p className="research-prose">I can turn a market question into a reproducible experiment, challenge the measurement, and explain what survived.</p>
          <div className="research-actions"><CtaLink href="mailto:woosub815@gmail.com">woosub815@gmail.com</CtaLink><Link href="/contact" className="research-button">Contact Woosub</Link><CtaLink href="https://github.com/MeanyDeany" newTab>GitHub profile</CtaLink></div>
        </EditorialSection>
      </div>
    </PageShell>
  );
}
