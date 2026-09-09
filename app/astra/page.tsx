import Link from "next/link";
import { PageShell } from "@/components/site-shell";
import {
  AuthorityBoundary,
  CurrentResearch,
  EvidenceLegend,
  EvidenceMetricGroup,
  EvidenceStatus,
  PolicySummary,
  ResearchContents,
  ResearchFindingCard,
  ResearchHero,
  ResearchPipeline,
  ResearchSection,
  ResearchTimeline,
} from "@/components/research-ui";
import { researchAuthority, researchEvidence } from "@/lib/research-evidence";
import { metadataFor } from "@/lib/site-metadata";

export const metadata = metadataFor(
  "/astra",
  "ASTRA Research Architecture",
  "Woosub Shin’s AI-augmented research architecture. Independent risk information survived, policy utility was not confirmed, and repaired measurement did not demonstrate incremental historical BTC return transfer.",
);

const forecast = researchEvidence.independentRiskForecast;
const scheduler = researchEvidence.nativeScheduler;
const historicalTransfer = researchEvidence.candidateGeneratorV3;

export default function AstraPage() {
  return (
    <PageShell>
      <div className="research-page">
        <ResearchHero
          eyebrow="Woosub Shin / Research program"
          title="ASTRA"
          intro="AI-augmented systematic research architecture"
        >
          <p className="research-prose">Generate hypotheses. Repair measurement. Confirm what survives.</p>
          <div className="research-actions">
            <Link className="research-button primary" href={forecast.detailHref}>Inspect the risk assessment</Link>
            <a className="research-button" href="#timeline">Follow the research progression</a>
          </div>
        </ResearchHero>

        <ResearchContents items={[
          { href: "#engine", label: "Research engine" },
          { href: "#discoveries", label: "Findings" },
          { href: "#native-scheduler", label: "Completed scheduler study" },
          { href: "#candidate-generator-v3", label: "Historical transfer test" },
          { href: "#timeline", label: "Timeline" },
          { href: "#current-research", label: "Current / next" },
          { href: "#evidence-protocol", label: "Evidence protocol" },
        ]} />

        <ResearchSection id="engine" eyebrow="Research engine" title="Failure changes the measurement and narrows the claim.">
          <p className="research-prose">ASTRA organizes research around testable questions, explicit comparisons and visible rejection. A promising candidate can fail a control, survive only within a narrow domain, or remain unresolved.</p>
          <ResearchPipeline detailed />
          <AuthorityBoundary>{researchAuthority} Candidate generation, forecast assessment, policy research and operational systems retain separate responsibilities.</AuthorityBoundary>
        </ResearchSection>

        <ResearchSection id="discoveries" eyebrow="Strongest confirmed finding" title={forecast.title}>
          <EvidenceStatus evidenceClass={forecast.evidenceClass} outcome={forecast.outcomeLabel} />
          <p className="research-prose">{forecast.finding}</p>
          <EvidenceMetricGroup record={forecast} idPrefix="astra-independent" />
          <div className="research-actions"><Link href={forecast.detailHref}>Inspect the independent assessment <span aria-hidden="true">→</span></Link></div>
        </ResearchSection>

        <ResearchSection eyebrow="Completed translation test" title="A forecast and a policy answer different questions.">
          <PolicySummary />
        </ResearchSection>

        <ResearchSection eyebrow="Measurement and development" title="What the repairs and comparisons established">
          <div className="finding-list">
            <ResearchFindingCard record={researchEvidence.riskBaselineChallenge} />
            <ResearchFindingCard record={researchEvidence.nonlinearSensorRecovery} />
            <ResearchFindingCard record={researchEvidence.nativeHorizonSelection} />
          </div>
        </ResearchSection>

        <ResearchSection id="native-scheduler" eyebrow="Completed synthetic methodology" title={scheduler.title}>
          <EvidenceStatus evidenceClass={scheduler.evidenceClass} workState={scheduler.workState} outcome={scheduler.outcomeLabel} />
          <p className="research-prose">{scheduler.finding}</p>
          <p className="policy-classification">{scheduler.classification}</p>
          <AuthorityBoundary>{scheduler.keyCaveat}</AuthorityBoundary>
          <div className="research-actions"><Link href={scheduler.detailHref}>Inspect the registered robustness study <span aria-hidden="true">→</span></Link></div>
        </ResearchSection>

        <ResearchSection id="candidate-generator-v3" eyebrow="Completed retrospective transfer test" title={historicalTransfer.title}>
          <EvidenceStatus evidenceClass={historicalTransfer.evidenceClass} workState={historicalTransfer.workState} outcome={historicalTransfer.outcomeLabel} />
          <p className="research-prose">{historicalTransfer.finding}</p>
          <AuthorityBoundary>{historicalTransfer.keyCaveat}</AuthorityBoundary>
          <div className="research-actions"><Link href={historicalTransfer.detailHref}>Inspect the historical transfer test <span aria-hidden="true">→</span></Link></div>
        </ResearchSection>

        <ResearchSection id="timeline" eyebrow="Scientific progression" title="The record includes failed claims and simpler methods.">
          <p className="research-prose">Two research lanes track how findings changed the next question. These are separate studies with distinct validation domains, not one sequential statistical experiment. Synthetic measurement health, historical return transfer, independent risk information and policy utility remain separate claims.</p>
          <ResearchTimeline />
        </ResearchSection>

        <ResearchSection id="current-research" eyebrow="Current / next" title="Completed findings, then proposed questions">
          <CurrentResearch detailed />
        </ResearchSection>

        <ResearchSection id="evidence-protocol" eyebrow="Evidence protocol" title="A result carries its context and its boundary.">
          <div className="research-copy">
            <p>Evidence class describes the assessment. Work state describes whether a study is completed, underway, proposed, blocked or invalidated. A completed study can leave a specific claim unconfirmed.</p>
            <p>Independent assessment is separate from candidate development. It does not imply replication by another institution. Synthetic controls establish what the tested measurement can detect; they do not establish historical market alpha.</p>
          </div>
          <div style={{ marginTop: 32 }}><EvidenceLegend /></div>
          <div className="research-grid" style={{ marginTop: 40 }}>
            <article className="research-card">
              <h3>Source availability</h3>
              <p>{forecast.source.note}</p>
              <p>{forecast.code.note}</p>
              <p>Each detail page discloses its own assessment scope, source availability and code lineage. Original thesis and seminar-paper PDFs remain available in the academic archive.</p>
              <Link className="research-link" href="/papers">Read the original papers <span aria-hidden="true">→</span></Link>
            </article>
            <article className="research-card">
              <h3>Human responsibility and separate systems</h3>
              <p>AI supports candidate generation, implementation and review. Woosub Shin remains responsible for research questions, evidence standards and published claims.</p>
              <p>Existing lab and BTC pages document research infrastructure and architectural lineage. Operational telemetry is read-only systems evidence.</p>
              <Link className="research-link" href="/projects">Inspect systems and research infrastructure <span aria-hidden="true">→</span></Link>
            </article>
          </div>
          <AuthorityBoundary>{researchAuthority}</AuthorityBoundary>
          <div className="research-actions"><Link href="/research#methodology">Read the research methodology <span aria-hidden="true">→</span></Link></div>
        </ResearchSection>
      </div>
    </PageShell>
  );
}
