import Link from "next/link";
import {
  AssessmentContext,
  AuthorityBoundary,
  EvidenceMetricGroup,
  EvidenceStatus,
  ResearchContents,
  ResearchFindingCard,
  ResearchHero,
  ResearchSection,
  ResearchSources,
} from "@/components/research-ui";
import { PageShell } from "@/components/site-shell";
import { researchEvidence } from "@/lib/research-evidence";
import { metadataFor } from "@/lib/site-metadata";

const forecast = researchEvidence.independentRiskForecast;
const baseline = researchEvidence.riskBaselineChallenge;
const policy = researchEvidence.policyUtility;
const nextQuestion = researchEvidence.turnoverDecomposition;
const calibrationRecord = {
  ...forecast,
  metrics: forecast.metrics.filter((metric) => metric.id === "variance-calibration"),
};

export const metadata = metadataFor(
  "/research/risk-forecasting",
  "BTC Risk Forecast Assessment",
  "Independent BTC risk forecast information survived. Frozen P3 policy utility was not confirmed; the assessment contexts and claim boundaries remain separate.",
);

export default function RiskForecastingPage() {
  return (
    <PageShell>
      <div className="research-page">
      <ResearchHero
        eyebrow="ASRA · Risk research"
        title="Risk information, independently assessed."
        intro={forecast.question}
      >
        <p className="research-prose">
          A stronger risk forecast and a useful risk policy are separate claims.
          This research confirmed the first, then tested the second under its own frozen rule.
        </p>
        <div className="research-actions">
          <Link href="#independent-assessment" className="finding-link">Inspect the independent assessment</Link>
          <Link href="#policy-utility" className="finding-link">Read the policy translation result</Link>
        </div>
      </ResearchHero>

      <ResearchContents items={[
        { href: "#independent-assessment", label: "Independent assessment" },
        { href: "#calibration", label: "Calibration and limits" },
        { href: "#baseline-challenge", label: "Development baseline" },
        { href: "#policy-utility", label: "Policy utility" },
        { href: "#next-question", label: "Next question" },
        { href: "#sources", label: "Sources and code" },
      ]} />

      <ResearchSection
        id="independent-assessment"
        eyebrow="Strongest confirmed finding"
        title={forecast.title}
      >
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass={forecast.evidenceClass} workState={forecast.workState} />
          <p>{forecast.finding}</p>
          <p>{forecast.method}</p>
        </div>
        <EvidenceMetricGroup record={forecast} idPrefix="risk-independent" />
        <div className="research-prose space-y-5">
          <h3>Consistency across chronology</h3>
          <p>{forecast.metrics.find((metric) => metric.id === "chronological-consistency")?.interpretation}</p>
          <p>{forecast.observations[0]}</p>
          <p>
            The conclusion is specific to the fixed model, the named strong baseline
            and this frozen assessment. It does not establish a directional timing rule.
          </p>
        </div>
        <AuthorityBoundary>{forecast.authority}</AuthorityBoundary>
      </ResearchSection>

      <ResearchSection id="calibration" eyebrow="Interpretation and limits" title="Calibration has an aggregation boundary.">
        <EvidenceMetricGroup record={calibrationRecord} includeDetail idPrefix="risk-calibration" />
        <div className="research-prose space-y-5">
          <p>
            The actual-to-forecast variance ratio describes calibration at the reported
            aggregation level. Proximity to one does not establish perfect conditional
            calibration or accurate tail calibration.
          </p>
          <h3>What the supplied evidence does not establish</h3>
          <ul className="research-list">
            {forecast.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
          <p>
            The public summary does not infer unreported confidence intervals,
            significance levels or loss-normalization formulas. Those require the
            underlying assessment report.
          </p>
        </div>
      </ResearchSection>

      <ResearchSection id="baseline-challenge" eyebrow="Earlier development evidence" title={baseline.title}>
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass={baseline.evidenceClass} workState={baseline.workState} />
          <h3>Question</h3>
          <p>{baseline.question}</p>
          <h3>Method and finding</h3>
          <p>{baseline.method}</p>
          <p>{baseline.finding}</p>
        </div>
        <AssessmentContext assessment={baseline.assessment} id="baseline-context" />
        <div className="research-prose space-y-5">
          <p>{baseline.keyCaveat}</p>
          <p>{baseline.limitations[0]}</p>
          <p>
            The independent assessment above is the completed follow-up. Its model
            identifiers and dates are not a substitute for this development study&apos;s
            missing specification.
          </p>
        </div>
      </ResearchSection>

      <ResearchSection id="policy-utility" eyebrow="Completed policy translation test" title="Better forecasts did not automatically become a better policy.">
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass={policy.evidenceClass} workState={policy.workState} outcome={policy.outcomeLabel} />
          <p className="font-mono text-sm break-words">{policy.classification}</p>
          <h3>Question</h3>
          <p>{policy.question}</p>
          <h3>Frozen test</h3>
          <p>{policy.method}</p>
        </div>
        <EvidenceMetricGroup record={policy} idPrefix="risk-policy" />
        <div className="research-prose space-y-5">
          <h3>Policy utility was not confirmed</h3>
          <p>{policy.finding}</p>
          <ul className="research-list">
            {policy.limitations.slice(0, 3).map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
          <h3>What the mechanism evidence supports</h3>
          <ul className="research-list">
            {policy.observations.map((observation) => <li key={observation}>{observation}</li>)}
          </ul>
          <p>{policy.limitations[3]}</p>
          <p>
            These observed relationships motivate a separate decomposition question.
            They do not override the frozen primary rule or turn risk ranking into
            directional timing evidence.
          </p>
        </div>
        <AuthorityBoundary>{policy.authority}</AuthorityBoundary>
      </ResearchSection>

      <ResearchSection id="next-question" eyebrow="Proposed follow-up" title={nextQuestion.title}>
        <ResearchFindingCard record={nextQuestion} />
        <div className="research-actions">
          <Link href="/asra#timeline" className="finding-link">Follow the full research progression</Link>
          <Link href="/research" className="finding-link">All research findings</Link>
        </div>
      </ResearchSection>

      <ResearchSection id="sources" eyebrow="Source availability" title="Reviewed claims, with explicit source limits.">
        <div className="research-prose space-y-5">
          <p>
            Research records are maintained in the private research archive.
            The reviewed briefs support the claims shown here; public reports,
            manifests and reproducible code destinations are not yet available.
          </p>
          <p>
            The policy study&apos;s supplied branch-head identifier belongs only to
            that completed study. It is not the independent forecast assessment&apos;s code lineage.
          </p>
        </div>
        <ResearchSources records={[forecast, baseline, policy]} />
      </ResearchSection>
      </div>
    </PageShell>
  );
}
