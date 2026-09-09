import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import {
  AuthorityBoundary,
  CurrentResearch,
  ResearchContents,
  ResearchFindingCard,
  ResearchHero,
  ResearchSection,
} from "@/components/research-ui";
import { researchAuthority, researchEvidence } from "@/lib/research-evidence";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor(
  "/research",
  "Research Findings",
  "Independent risk forecast assessment, completed policy translation, synthetic measurement and scheduler findings, retained historical systems and academic financial econometrics by Woosub Shin.",
);

const principles = [
  {
    index: "01",
    title: "Evidence before permission",
    text: "A model output earns interpretation through validation. It does not become an entry, veto, sizing, or execution instruction by default.",
  },
  {
    index: "02",
    title: "Time-respecting data construction",
    text: "Features, states, and outcomes use information available at the evaluated timestamp. Alignment rules are explicit and missing data is not silently repaired.",
  },
  {
    index: "03",
    title: "Model comparison and robustness",
    text: "Ablation, alternative specifications, walk-forward evaluation, and subperiod checks matter more than a single favorable summary statistic.",
  },
  {
    index: "04",
    title: "Immutable evidence and provenance",
    text: "Historical research records should remain inspectable as hypotheses evolve. Source identity and transformation history belong beside the result.",
  },
  {
    index: "05",
    title: "Operational reliability",
    text: "Duplicate protection, stale-input detection, locking, scheduling, and failure states are part of research validity when systems generate evidence repeatedly.",
  },
  {
    index: "06",
    title: "Evidence, policy, and execution stay separate",
    text: "Descriptive evidence can inform later policy research, but policy state is not entry permission and neither layer authorizes execution.",
  },
] as const;

const notes = [
  ["Timestamp discipline", "If a value was not knowable at the decision timestamp, it does not belong in the feature set."],
  ["Narrow claims", "Model maturity, forecast loss, and regime labels answer research questions—not whether a strategy is approved."],
  ["Visible failure", "A failed input, orphan reference, or stale process should remain observable instead of being hidden by a plausible fallback."],
  ["Reproducible lineage", "A result is stronger when another reviewer can trace its inputs, specification, timing, and limitations."],
] as const;

export default function ResearchPage() {
  return (
    <PageShell>
      <div className="research-page">
        <ResearchHero
          eyebrow="Woosub Shin / Research"
          title="Research findings and the tests behind them."
          intro="Independent assessment, development evidence, measurement repairs and historical studies — each with its scope and limitations."
        >
          <p className="research-note">Findings are organized by scientific relevance. Evidence class, work state and claim outcome remain separate.</p>
          <div className="research-actions">
            <Link className="research-button" href="/astra">Explore ASTRA</Link>
            <a className="research-button" href="#methodology">Read the methodology</a>
          </div>
        </ResearchHero>

        <ResearchContents items={[
          { href: "#risk-forecasting", label: "Risk forecasting" },
          { href: "#measurement", label: "Measurement" },
          { href: "#systematic-strategies", label: "Historical systems" },
          { href: "#academic", label: "Academic research" },
          { href: "#current-research", label: "Current / next" },
          { href: "#methodology", label: "Methodology" },
        ]} />

        <ResearchSection id="risk-forecasting" eyebrow="Risk forecasting" title="Forecast information survived. Policy utility was not confirmed.">
          <p className="research-prose">Independent forecast assessment, development comparison and the completed policy test answer different questions. Their evidence labels and assessment windows do not transfer between records.</p>
          <div className="finding-list">
            <ResearchFindingCard record={researchEvidence.independentRiskForecast} />
            <ResearchFindingCard record={researchEvidence.policyUtility} />
            <ResearchFindingCard record={researchEvidence.riskBaselineChallenge} />
          </div>
        </ResearchSection>

        <ResearchSection id="measurement" eyebrow="Measurement and methodology" title="Repair detection, then test the need for complexity.">
          <p className="research-prose">Positive controls exposed blind spots. Target and selection repairs recovered methodological power. The completed synthetic scheduler study supports simpler fixed-native selection within its registered domain.</p>
          <div className="finding-list">
            <ResearchFindingCard record={researchEvidence.nonlinearSensorRecovery} />
            <ResearchFindingCard record={researchEvidence.nativeHorizonSelection} />
            <ResearchFindingCard record={researchEvidence.nativeScheduler} />
          </div>
        </ResearchSection>

        <ResearchSection id="systematic-strategies" eyebrow="Retained historical research" title="Historical systems with their selection limits intact">
          <p className="research-prose">These records document historical strategy research. Post-selection comparisons and later forward observation remain distinct from independent ASTRA confirmation.</p>
          <div className="finding-list">
            <ResearchFindingCard record={researchEvidence.dailyEma} />
            <ResearchFindingCard record={researchEvidence.c4Challenger} />
          </div>
        </ResearchSection>

        <ResearchSection id="academic" eyebrow="Academic research" title="Financial econometrics and original papers">
          <div className="finding-list">
            <ResearchFindingCard record={researchEvidence.futuresVolatilityThesis} />
            <ResearchFindingCard record={researchEvidence.bitcoinGsadf} />
          </div>
          <div className="research-actions"><Link href="/papers">Read the original thesis and seminar paper <span aria-hidden="true">→</span></Link></div>
        </ResearchSection>

        <ResearchSection id="current-research" eyebrow="Current / next" title="Questions that follow from completed evidence">
          <CurrentResearch />
        </ResearchSection>

        <ResearchSection id="methodology" eyebrow="Working principles" title="Research credibility is cumulative.">
          <p className="research-prose">No single diagnostic establishes a system’s validity. Credibility accumulates through temporal discipline, robustness, provenance, operational integrity and appropriately narrow claims.</p>
          <ol className="research-grid" style={{ marginTop: 32 }}>
            {principles.map(principle => <li className="research-card" key={principle.index}>
              <p className="research-kicker" aria-hidden="true">{principle.index}</p>
              <h3>{principle.title}</h3><p>{principle.text}</p>
            </li>)}
          </ol>
          <div style={{ marginTop: 40 }}>
            <h3>Short rules for difficult decisions</h3>
            <dl>{notes.map(([term, detail]) => <div className="research-card" key={term}>
              <dt><strong>{term}</strong></dt><dd className="research-note">{detail}</dd>
            </div>)}</dl>
          </div>
          <AuthorityBoundary>{researchAuthority} Evidence, interpretation, policy research and execution systems have distinct responsibilities.</AuthorityBoundary>
          <div className="research-actions">
            <Link href="/astra#evidence-protocol">Read the evidence taxonomy and source boundaries <span aria-hidden="true">→</span></Link>
            <Link href="/projects">Inspect the supporting systems <span aria-hidden="true">→</span></Link>
          </div>
        </ResearchSection>
      </div>
    </PageShell>
  );
}
