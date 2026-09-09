import Link from "next/link";
import type { ReactNode } from "react";
import {
  evidenceClasses, evidenceClassDescriptions, workStateDescriptions, workStateLabels,
  getMetricGroup, homePipeline, researchPipeline, researchTimeline, researchEvidence,
  schedulerBranch, riskInformationBoundary,
  type AssessmentContext as Assessment, type CompletedResearchRecord,
  type EvidenceClass, type ResearchRecord, type WorkState,
} from "@/lib/research-evidence";

export function ResearchSection({ id, eyebrow, title, children }: {
  id?: string; eyebrow?: string; title?: string; children: ReactNode;
}) {
  return <section id={id} className="research-section"><div className="research-container">
    {eyebrow && <p className="research-kicker">{eyebrow}</p>}
    {title && <h2 className="research-heading">{title}</h2>}
    {children}
  </div></section>;
}

export function ResearchHero({ eyebrow, title, intro, children }: {
  eyebrow: string; title: string; intro: string; children?: ReactNode;
}) {
  return <section className="research-hero"><div className="research-container">
    <p className="research-kicker">{eyebrow}</p><h1>{title}</h1>
    <p className="research-prose">{intro}</p>{children}
  </div></section>;
}

export function ResearchContents({ items }: { items: readonly { href: string; label: string }[] }) {
  return <nav className="research-contents" aria-label="On this page"><div className="research-container">
    <details><summary>On this page</summary><ul>{items.map(item => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></details>
  </div></nav>;
}

export function EvidenceStatus({ evidenceClass, workState, outcome }: {
  evidenceClass: EvidenceClass | null; workState?: WorkState; outcome?: string;
}) {
  return <div className="evidence-status-row">
    {evidenceClass && <a className="evidence-status" data-evidence={evidenceClass.toLowerCase().replaceAll(" ", "_")} href="/astra#evidence-protocol" aria-label={`${evidenceClass}: ${evidenceClassDescriptions[evidenceClass]}`}>{evidenceClass}</a>}
    {workState && <span className="evidence-status" data-evidence={workState}>{workStateLabels[workState]}</span>}
    {outcome && <span className="evidence-status evidence-outcome">{outcome}</span>}
  </div>;
}

export function EvidenceLegend() {
  return <dl className="evidence-legend">
    {evidenceClasses.map(item => <div key={item}><dt><EvidenceStatus evidenceClass={item} /></dt><dd>{evidenceClassDescriptions[item]}</dd></div>)}
    {(["in_progress", "blocked", "invalidated"] as const).map(item => <div key={item}><dt><EvidenceStatus evidenceClass={null} workState={item} /></dt><dd>{workStateDescriptions[item]}</dd></div>)}
  </dl>;
}

export function AssessmentContext({ assessment, id }: { assessment: Assessment; id: string }) {
  return <div className="assessment-context" id={id}>
    <p className="assessment-scope"><strong>{assessment.horizon ? `${assessment.horizon} · ` : ""}{assessment.domain}</strong> · {assessment.comparison}</p>
    {(assessment.model?.id || assessment.baseline?.id) && <p>Model: <code>{assessment.model?.id ?? assessment.model?.label}</code> · Baseline: <code>{assessment.baseline?.id ?? assessment.baseline?.label}</code></p>}
    <p><strong>Assessment:</strong> <span className="mono">{assessment.window.label}</span></p>
  </div>;
}

export function EvidenceMetricGroup({ record, includeDetail = false, idPrefix = record.id }: {
  record: CompletedResearchRecord; includeDetail?: boolean; idPrefix?: string;
}) {
  const group = getMetricGroup(record, includeDetail);
  return <div>
    <AssessmentContext assessment={group.assessment} id={`${idPrefix}-context`} />
    <EvidenceStatus evidenceClass={group.evidenceClass} />
    <dl className="metric-grid" aria-describedby={`${idPrefix}-context ${idPrefix}-caveat`}>
      {group.metrics.map(metric => <div key={metric.id} className="evidence-metric" aria-describedby={`${idPrefix}-context ${idPrefix}-caveat`}>
        <dt>{metric.label}</dt><dd><span className="metric-value">{metric.value}</span><span className="metric-context">{metric.unit === "segments" ? "Consistency across the chronological assessment" : group.assessment.comparison}</span><p>{metric.interpretation}</p></dd>
      </div>)}
    </dl>
    <p className="authority-boundary" id={`${idPrefix}-caveat`}>{group.keyCaveat}</p>
  </div>;
}

export function AuthorityBoundary({ children = riskInformationBoundary }: { children?: ReactNode }) {
  return <aside className="authority-boundary"><strong>Claim boundary.</strong> {children}</aside>;
}

export function ResearchFindingCard({ record }: { record: ResearchRecord }) {
  return <article className="finding-card">
    <div>
      <EvidenceStatus evidenceClass={record.evidenceClass} workState={record.workState === "completed" && record.claimOutcome !== "not_confirmed" ? undefined : record.workState} outcome={record.workState === "completed" && record.claimOutcome === "not_confirmed" ? record.outcomeLabel : undefined} />
      <h3>{record.title}</h3><p className="evidence-role">{record.role}</p>
    </div>
    <div>
      <p>{record.workState === "completed" ? record.finding : record.question}</p>
      <p className="finding-caveat">{record.keyCaveat}</p>
      <Link className="finding-link" href={record.detailHref}>Inspect {record.shortTitle.toLowerCase()} <span aria-hidden="true">&nbsp;→</span></Link>
    </div>
  </article>;
}

export function ResearchPipeline({ detailed = false }: { detailed?: boolean }) {
  return <>
    <ol className="research-pipeline">{homePipeline.map((stage, index) => <li key={stage.title}><span className="pipeline-number">{String(index + 1).padStart(2, "0")}</span><strong className="pipeline-label">{stage.title}</strong>{detailed && <p>{stage.description}</p>}</li>)}</ol>
    {detailed && <>
      <h3>The full research sequence</h3>
      <ol className="pipeline-deep">{researchPipeline.map(stage => <li key={stage.title}>{stage.title}</li>)}</ol>
      <div className="pipeline-branches">
        <p><strong>Failed controls → return to measurement</strong>Diagnose the sensor, target alignment and selection. A failed test can require a repaired measurement before the market claim is interpretable.</p>
        <p><strong>Rejected or unresolved → retain the record</strong>Unsupported candidates stop here or remain open questions. This map describes the process; it does not imply every candidate reaches confirmation.</p>
      </div>
    </>}
  </>;
}

export function ResearchTimeline() {
  return <ol className="research-timeline">{researchTimeline.map((stage, index) => <li key={stage.id}>
    <span className="timeline-ordinal" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    <div>
      <EvidenceStatus evidenceClass={stage.evidenceClass} workState={stage.scopedState === "INVALIDATED" ? "invalidated" : undefined} />
      <h3>{stage.title}</h3><p>{stage.finding}</p><p>{stage.limitation}</p>
      <Link className="finding-link" href={stage.detailHref}>Inspect this stage <span aria-hidden="true">→</span></Link>
      {stage.id === schedulerBranch.fromStageId && <div className="timeline-branch"><EvidenceStatus evidenceClass={schedulerBranch.record.evidenceClass} workState={schedulerBranch.record.workState} /><Link href={schedulerBranch.record.detailHref}>{schedulerBranch.record.title}</Link><p>{schedulerBranch.record.finding}</p><p><strong>Fixed-native architecture sufficient within the registered synthetic domain.</strong> {schedulerBranch.record.keyCaveat}</p><p>NEXT QUESTION → <Link href={schedulerBranch.nextQuestion.detailHref}>{schedulerBranch.nextQuestion.title}</Link>. No active study is reported.</p></div>}
    </div>
  </li>)}</ol>;
}

export function PolicySummary() {
  const policy = researchEvidence.policyUtility;
  const [volatility, es5, threshold] = policy.metrics;
  return <div>
    <EvidenceStatus evidenceClass={policy.evidenceClass} workState={policy.workState} outcome={policy.outcomeLabel} />
    <h3>{policy.keyCaveat}</h3>
    <p className="policy-summary-values">Frozen primary P3 · pooled H+C vs HAR policy: <strong>{volatility.value}</strong> volatility improvement and <strong>{es5.value}</strong> ES5 improvement, below the <strong>{threshold.value}</strong> preregistered minimum.</p>
    <p className="research-note">Only the confirmed-forecast-era diagnostic passed the joint era rule. Required multi-era consistency failed.</p>
    <p className="research-note"><strong>{policy.finding}</strong></p>
    <p className="policy-classification">{policy.classification}</p>
    <div className="research-actions"><Link href={policy.detailHref}>Inspect the policy translation test <span aria-hidden="true">→</span></Link></div>
  </div>;
}

export function CurrentResearch({ detailed = false }: { detailed?: boolean }) {
  const next = researchEvidence.turnoverDecomposition;
  const generator = researchEvidence.candidateGeneratorV3;
  return <>
    <p className="research-prose">No active study is reported in the supplied research freeze. Scheduler Robustness V1 has completed; the following questions have not started.</p>
    <div className="research-grid" style={{ marginTop: 32 }}>
    <article id="candidate-generator-v3" className="research-next">
      <p className="research-kicker">Next question</p>
      <h3>{generator.title}</h3><p>{generator.question}</p>
      <p className="research-note">{detailed ? generator.scope : generator.keyCaveat}</p>
      {detailed ? <div className="research-actions"><Link href={researchEvidence.nativeScheduler.detailHref}>Inspect the completed scheduler evidence <span aria-hidden="true">→</span></Link></div> : <div className="research-actions"><Link href={generator.detailHref}>Read the proposed architecture <span aria-hidden="true">→</span></Link></div>}
    </article>
    <article id="next-question" className="research-next">
      <p className="research-kicker">Next question</p><h3>{next.title}</h3><p>{next.question}</p><p className="research-note">{next.scope}</p>
      <div className="research-actions"><Link href={detailed ? researchEvidence.policyUtility.detailHref : next.detailHref}>{detailed ? "Inspect the completed policy evidence" : "Read the next question"} <span aria-hidden="true">→</span></Link></div>
    </article>
    </div>
  </>;
}

export function ResearchSources({ records }: { records: readonly ResearchRecord[] }) {
  return <div>{records.map(record => <article className="research-source" key={record.id}>
    <h3>{record.title}</h3>
    <p>{record.source.note}</p>
    {record.source.availability === "public" && <p><Link href={record.source.href}>{record.source.label}{record.source.href.endsWith(".pdf") ? " (PDF)" : ""}</Link></p>}
    <p><strong>Code:</strong> {record.code.note}</p>
    {record.code.commit && <p>Completed study identifier: <code>{record.code.commit}</code></p>}
    <p><strong>Assessment scope:</strong> {record.assessment.window.label}</p>
  </article>)}</div>;
}
