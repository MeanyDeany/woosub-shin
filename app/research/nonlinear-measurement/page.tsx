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

const sensor = researchEvidence.nonlinearSensorRecovery;
const selection = researchEvidence.nativeHorizonSelection;
const scheduler = researchEvidence.nativeScheduler;
const candidateGenerator = researchEvidence.candidateGeneratorV3;
const sensitivity = researchEvidence.smallSignalSensitivity;
const transferSupportMetrics = candidateGenerator.metrics.filter(metric => [
  "v3-validation-targets", "v3-p1-positive-folds", "v3-p2-positive-folds", "v3-p0-rank-ic",
].includes(metric.id));

export const metadata = metadataFor(
  "/research/nonlinear-measurement",
  "Nonlinear Measurement and Selection Repair",
  "Synthetic measurement repairs remained healthy, but Candidate Generator V3 did not demonstrate incremental historical BTC return transfer. Zero finalists; the locked return holdout remained unopened.",
);

export default function NonlinearMeasurementPage() {
  return (
    <PageShell>
      <div className="research-page">
      <ResearchHero
        eyebrow="ASTRA · Measurement methodology"
        title="A failed control changed the measurement."
        intro="A null result can reflect an absent signal, a blind sensor or a misaligned test. Positive controls made those possibilities separable."
      >
        <p className="research-prose">
          The progression moved from detection failure to sensor repair, then to
          native-horizon target alignment and selection repair. Synthetic controls
          remained healthy; the completed V3 test did not demonstrate incremental
          historical return transfer within its frozen validation domain.
        </p>
        <div className="research-actions">
          <Link href="#sensor-recovery" className="finding-link">Inspect sensor recovery</Link>
          <Link href="#native-horizon-selection" className="finding-link">Inspect selection repair</Link>
          <Link href="#historical-transfer-test" className="finding-link">Inspect historical transfer</Link>
        </div>
      </ResearchHero>

      <ResearchContents items={[
        { href: "#positive-control-failure", label: "Failed positive control" },
        { href: "#sensor-recovery", label: "Sensor recovery" },
        { href: "#native-horizon-selection", label: "Native-horizon selection" },
        { href: "#scheduler-robustness", label: "Completed scheduler test" },
        { href: "#historical-transfer-test", label: "Historical transfer test" },
        { href: "#small-signal-sensitivity", label: "Next sensitivity question" },
        { href: "#sources", label: "Sources and code" },
      ]} />

      <ResearchSection id="positive-control-failure" eyebrow="Failure and diagnosis" title="First, test whether the test can see.">
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass="SYNTHETIC" />
          <p>
            A synthetic positive control exposed detection failure. The null
            readout could no longer support an interpretation of &ldquo;no signal&rdquo;
            without first ruling out a measurement blind spot.
          </p>
          <p>
            That invalidated a specific interpretation of the failed test. It did
            not invalidate every directional hypothesis or establish a market signal.
          </p>
          <h3>Decompose the measurement</h3>
          <ol className="research-list">
            <li><strong>Sensor:</strong> can it detect the controlled nonlinear signal?</li>
            <li><strong>Target alignment:</strong> does the question match its native horizon?</li>
            <li><strong>Selection:</strong> can the architecture preserve detection power?</li>
          </ol>
          <p>
            Separating these stages changes what a failure means and which part
            of the research design needs repair.
          </p>
        </div>
      </ResearchSection>

      <ResearchSection id="sensor-recovery" eyebrow="Completed synthetic repair" title={sensor.title}>
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass={sensor.evidenceClass} workState={sensor.workState} />
          <h3>Question</h3>
          <p>{sensor.question}</p>
          <h3>Method</h3>
          <p>{sensor.method}</p>
        </div>
        <AssessmentContext assessment={sensor.assessment} id="sensor-context" />
        <div className="research-prose space-y-5">
          <h3>Finding</h3>
          <p>{sensor.finding}</p>
          <h3>Limits and next question</h3>
          <p>{sensor.keyCaveat}</p>
          <p>{sensor.limitations[0]}</p>
          <p>{sensor.nextQuestion}</p>
        </div>
      </ResearchSection>

      <ResearchSection id="native-horizon-selection" eyebrow="Completed measurement repair" title={selection.title}>
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass={selection.evidenceClass} workState={selection.workState} />
          <p className="research-kicker">{selection.role}</p>
          <h3>Question</h3>
          <p>{selection.question}</p>
          <h3>Method</h3>
          <p>{selection.method}</p>
        </div>
        <AssessmentContext assessment={selection.assessment} id="selection-context" />
        <div className="research-prose space-y-5">
          <h3>Finding</h3>
          <p>{selection.finding}</p>
          <h3>Limits</h3>
          <p>{selection.keyCaveat}</p>
          <p>{selection.limitations[0]}</p>
          <p>
            The reviewed progression supports power recovery after target and
            selection repair. It does not isolate an adaptive scheduler&apos;s contribution.
            The separate completed scheduler test now narrows that architecture decision.
          </p>
        </div>
        <AuthorityBoundary>
          Measurement repair does not establish historical BTC nonlinear alpha,
          a trading signal or execution authority.
        </AuthorityBoundary>
      </ResearchSection>

      <ResearchSection id="scheduler-robustness" eyebrow="Completed synthetic assessment" title="Fixed native selection was sufficient within the tested scope.">
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass={scheduler.evidenceClass} workState={scheduler.workState} outcome={scheduler.outcomeLabel} />
          <p className="font-mono text-sm break-words">{scheduler.classification}</p>
          <h3>Question</h3>
          <p>{scheduler.question}</p>
          <h3>Registered comparison</h3>
          <p>{scheduler.method}</p>
        </div>
        <EvidenceMetricGroup record={scheduler} idPrefix="scheduler-primary" />
        <div className="research-prose space-y-5">
          <h3>Detection, uncertainty and validity checks</h3>
          <p>{scheduler.assessment.protocol}</p>
          <table className="research-table w-full border-collapse text-left text-sm" aria-describedby="scheduler-primary-context scheduler-primary-caveat">
            <caption className="pb-4 text-left">{scheduler.assessment.domain}</caption>
            <thead>
              <tr><th scope="col" className="py-3 pr-4">Measure</th><th scope="col" className="py-3">Observed</th></tr>
            </thead>
            <tbody>
              {scheduler.metrics.filter((metric) => metric.priority === "detail").map((metric) => (
                <tr key={metric.id} className="border-t border-[var(--rule)]">
                  <th scope="row" className="py-3 pr-4 font-normal">{metric.label}</th>
                  <td className="py-3 font-mono tabular-nums">{metric.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{scheduler.observations[0]}</p>
          <h3>Interpretation</h3>
          <p>{scheduler.finding}</p>
          <ul className="research-list">
            {scheduler.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
          <p>
            The paired interval excludes the prespecified meaningful-increment margin.
            The result supports simplification within the registered synthetic scope.
            It does not establish exact equivalence or make this methodology test a
            prerequisite for the earlier independent risk assessment.
          </p>
        </div>
        <AuthorityBoundary>{scheduler.keyCaveat}</AuthorityBoundary>
        <div className="research-actions">
          <Link href="/astra#timeline" className="finding-link">Follow the complete research progression</Link>
        </div>
      </ResearchSection>

      <span id="candidate-generator" aria-hidden="true" />
      <ResearchSection id="historical-transfer-test" eyebrow="Completed retrospective validation" title={candidateGenerator.title}>
        <div className="research-prose space-y-5">
          <EvidenceStatus evidenceClass={candidateGenerator.evidenceClass} workState={candidateGenerator.workState} outcome={candidateGenerator.outcomeLabel} />
          <p className="font-mono text-sm break-words">{candidateGenerator.classification}</p>
          <h3>Question</h3>
          <p>{candidateGenerator.question}</p>
          <h3>Frozen historical comparison</h3>
          <p>{candidateGenerator.method}</p>
          <p>{candidateGenerator.assessment.protocol}</p>
        </div>
        <EvidenceMetricGroup record={candidateGenerator} idPrefix="v3-validation" />
        <div className="research-prose mt-8 space-y-5">
          <h3>Validation sample and supporting diagnostics</h3>
          <table className="research-table w-full border-collapse text-left text-sm" aria-describedby="v3-validation-context v3-validation-caveat">
            <caption className="pb-4 text-left">Supporting diagnostics in the same retrospective validation sample</caption>
            <thead>
              <tr><th scope="col" className="py-3 pr-4">Measure</th><th scope="col" className="py-3">Observed</th></tr>
            </thead>
            <tbody>
              {transferSupportMetrics.map(metric => (
                <tr key={metric.id} className="border-t border-[var(--rule)]">
                  <th scope="row" className="py-3 pr-4 font-normal">{metric.label}</th>
                  <td className="py-3 font-mono tabular-nums">{metric.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{candidateGenerator.metrics.find(metric => metric.id === "v3-p0-rank-ic")?.interpretation}</p>
          <h3>Locked return-lane holdout</h3>
          <dl className="research-card">
            <dt>Holdout access</dt><dd><strong>{candidateGenerator.holdout.label}</strong></dd>
            <dt>Reserved interval</dt><dd className="font-mono text-sm">{candidateGenerator.holdout.window.label}</dd>
          </dl>
          <p>{candidateGenerator.observations[0]}</p>
          <p>{candidateGenerator.observations[1]}</p>
          <h3>What the completed test supports</h3>
          <p>{candidateGenerator.finding}</p>
          <ul className="research-list">
            {candidateGenerator.limitations.map(limitation => <li key={limitation}>{limitation}</li>)}
          </ul>
          <details>
            <summary>Secondary diagnostic boundary</summary>
            <p>{candidateGenerator.observations[2]}</p>
          </details>
        </div>
        <AuthorityBoundary>{candidateGenerator.keyCaveat} {candidateGenerator.authority}</AuthorityBoundary>
      </ResearchSection>

      <ResearchSection id="small-signal-sensitivity" eyebrow="Next question · Return / methodology" title="What effect size can the repaired stack detect?">
        <ResearchFindingCard record={sensitivity} />
        <p className="research-prose">{sensitivity.scope}</p>
      </ResearchSection>

      <ResearchSection id="sources" eyebrow="Source availability" title="Each assessment retains its own context.">
        <div className="research-prose space-y-5">
          <p>
            Research records are maintained in the private research archive.
            The sensor repair is explicitly synthetic. The native-horizon repair&apos;s
            exact test domain and evidence class await source review, so it carries
            a neutral measurement-repair role without an inferred scientific badge.
          </p>
          <p>
            Public experiment artifacts, generated-data settings and immutable
            code links are not available. The completed scheduler test supplies its
            own synthetic context and verified study identifier; its evidence class
            does not transfer to the earlier native-horizon repair.
          </p>
          <p>
            Candidate Generator V3 is a separate retrospective historical validation.
            Its completed-study identifier and validation interval do not establish
            an independent assessment or access to the locked return-lane holdout.
          </p>
        </div>
        <ResearchSources records={[sensor, selection, scheduler, candidateGenerator]} />
        <div className="research-actions">
          <Link href="/research/risk-forecasting" className="finding-link">Inspect the separate risk evidence</Link>
          <Link href="/research#methodology" className="finding-link">Read the research methodology</Link>
        </div>
      </ResearchSection>
      </div>
    </PageShell>
  );
}
