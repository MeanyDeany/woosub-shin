import Link from "next/link";
import { CtaLink, EditorialSection, PageHero } from "@/components/editorial";
import { ResearchFindingCard } from "@/components/research-ui";
import { PageShell } from "@/components/site-shell";
import { researchEvidence } from "@/lib/research-evidence";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor(
  "/resume",
  "Resume and Background",
  "meanydeany: trader and quantitative researcher. MSc Economics at the University of Copenhagen; undergraduate Quantitative Economics & Econometrics at UC San Diego.",
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
          eyebrow="About / Resume"
          title="Woosub Shin"
          intro="Futures trader and quantitative researcher. My work connects financial econometrics, market microstructure, and systematic research."
          actions={<><CtaLink href="mailto:woosub815@gmail.com" kind="primary">Email meanydeany</CtaLink><CtaLink href="/contact">Get in touch</CtaLink><CtaLink href="https://github.com/MeanyDeany" newTab>GitHub profile</CtaLink></>}
          metadata={[{ label: "Location", value: "Seoul, South Korea" }, { label: "Education", value: "University of Copenhagen / UC San Diego" }, { label: "Tools", value: "Python / SQL / Git / Linux" }]}
        />

        <EditorialSection id="background" eyebrow="Background" title="Trading, research, and systems">
          <div className="research-grid">
            <div className="research-prose">
              <p>I approach markets as a trader first. I use financial econometrics, reproducible research, and systems engineering to test hypotheses, measure risk, and make trading decisions more explicit.</p>
              <p>My current work focuses on BTC market microstructure and low-latency market-data systems. Earlier work independently confirmed short-horizon BTC risk information and separately tested its policy translation. {researchEvidence.policyUtility.finding}</p>
              <p>My focus is trading, quantitative research, market microstructure, and execution systems.</p>
            </div>
            <div className="grid gap-8" aria-label="Education">
              <article className="research-card">
                <h3>M.Sc. Economics</h3>
                <p className="site-strong mt-3">University of Copenhagen</p>
                <p className="research-prose mt-4">Financial econometrics, time-series analysis, empirical asset pricing, volatility modeling, and systematic strategy research.</p>
                <p className="research-prose mt-4">The academic foundation informs how I define a question, align information in time, compare alternatives, and communicate uncertainty.</p>
              </article>
              <article className="research-card">
                <h3>Undergraduate degree</h3>
                <p className="site-strong mt-3">University of California, San Diego</p>
                <p className="research-prose mt-4">Quantitative Economics &amp; Econometrics</p>
              </article>
            </div>
          </div>
        </EditorialSection>

        <EditorialSection id="research" eyebrow="Selected research" title="Research supporting trading and risk decisions" intro="Each study keeps its own assessment context, evidence class, and limitations.">
          <div>{selectedResearch.map((record) => <ResearchFindingCard key={record.id} record={record} />)}</div>
          <div className="research-actions"><CtaLink href="/research">View all research findings</CtaLink><CtaLink href="/papers">Read the academic papers</CtaLink></div>
        </EditorialSection>

        <EditorialSection id="skills" eyebrow="Methods and systems" title="Research methods and technical systems">
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
                <li>Python / SQL / SQLite / Git / GitHub / Linux</li>
                <li>AWS / CI / market-data and research pipelines</li>
                <li>Time-series analysis / backtesting / walk-forward validation / bootstrap</li>
              </ul>
              <p className="research-prose mt-5">AI tools support implementation and review. Research claims remain tied to explicit tests, evidence, and human responsibility.</p>
            </article>
          </div>
          <div className="research-grid mt-10">
            <article className="research-card"><h3>Certification</h3><p className="site-strong mt-4">Certified Investment Manager</p><p className="research-prose mt-2">KOFIA / Korea</p></article>
            <article className="research-card"><h3>Languages</h3><dl className="metadata-list mt-4"><div className="metadata-row flex flex-wrap justify-between gap-4 py-3"><dt>Korean</dt><dd>Native</dd></div><div className="metadata-row flex flex-wrap justify-between gap-4 border-t py-3"><dt>English</dt><dd>Native / bilingual</dd></div></dl></article>
          </div>
        </EditorialSection>

        <EditorialSection id="contact" eyebrow="Contact" title="Trading, quantitative research, and professional opportunities">
          <p className="research-prose">I am interested in trading and quantitative roles where market judgment, research, and systems work meet.</p>
          <div className="research-actions"><CtaLink href="mailto:woosub815@gmail.com">Email meanydeany</CtaLink><Link href="/contact" className="research-button">Contact meanydeany</Link><CtaLink href="https://github.com/MeanyDeany" newTab>GitHub profile</CtaLink></div>
        </EditorialSection>
      </div>
    </PageShell>
  );
}
