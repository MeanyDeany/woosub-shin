import Link from "next/link";
import type { ReactNode } from "react";
import { ObservationField } from "@/components/observation-field";
import {
  evidenceClasses, evidenceClassDescriptions, workStateDescriptions, workStateLabels,
  getMetricGroup, homePipeline, researchPipeline, researchTimelineLanes, researchEvidence,
  riskInformationBoundary,
  type AssessmentContext as Assessment, type CompletedResearchRecord,
  type EvidenceClass, type ResearchRecord, type ResearchTimelineEntry, type WorkState,
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
  return <section className="research-hero"><ObservationField /><div className="research-container">
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
    {evidenceClass && <a className="evidence-status" data-evidence={evidenceClass.toLowerCase().replaceAll(" ", "_")} href="/asra#evidence-protocol" aria-label={`${evidenceClass}: ${evidenceClassDescriptions[evidenceClass]}`}>{evidenceClass}</a>}
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
    <div className="pipeline-observation"><ObservationField variant="sequence" />
      <ol className="research-pipeline">{homePipeline.map((stage, index) => <li key={stage.title}><span className="pipeline-number">{String(index + 1).padStart(2, "0")}</span><strong className="pipeline-label">{stage.title}</strong>{detailed && <p>{stage.description}</p>}</li>)}</ol>
    </div>
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

function TimelineStages({ stages }: { stages: readonly ResearchTimelineEntry[] }) {
  return <ol className="research-timeline">{stages.map((stage, index) => {
    const record = Object.values(researchEvidence).find(item => item.id === stage.recordId);
    return <li key={stage.id}>
    <span className="timeline-ordinal" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    <div>
      <EvidenceStatus evidenceClass={stage.evidenceClass} workState={stage.scopedState === "INVALIDATED" ? "invalidated" : record?.workState} outcome={record?.workState === "completed" && record.claimOutcome === "not_confirmed" ? record.outcomeLabel : undefined} />
      <h4 className="text-lg leading-snug font-semibold">{stage.title}</h4><p>{stage.finding}</p><p>{stage.limitation}</p>
      <Link className="finding-link" href={stage.detailHref}>Inspect this stage <span aria-hidden="true">→</span></Link>
    </div>
  </li>;
  })}</ol>;
}

export function ResearchTimeline() {
  return <div className="research-lanes">{researchTimelineLanes.map(lane => <section key={lane.id} className="research-lane" aria-labelledby={`timeline-${lane.id}`}>
    <h3 id={`timeline-${lane.id}`}>{lane.title}</h3>
    <p className="research-prose mb-8">{lane.description}</p>
    <TimelineStages stages={lane.stages} />
    <div className="research-next">
      <p className="research-kicker">Next question · {lane.title}</p>
      <Link className="finding-link" href={lane.nextQuestion.detailHref}>{lane.nextQuestion.title} <span aria-hidden="true">→</span></Link>
      <p className="research-note">{lane.nextQuestion.keyCaveat}</p>
    </div>
  </section>)}</div>;
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
  return <>
    <p className="research-prose">The active priority has shifted from extending bar-based strategy search to event-level Bitcoin market microstructure and high-frequency research. Prior ASRA, forecasting and historical strategy studies remain retained as frozen evidence rather than being rewritten around the new direction.</p>
    <div className="research-grid" style={{ marginTop: 32 }}>
      <article id="microstructure-hft" className="research-next">
        <p className="research-kicker">Current direction · Market microstructure</p>
        <h3>BTC Market Microstructure &amp; HFT Research</h3>
        <p>Do observable order-flow and liquidity states change fill probability and post-fill markouts enough to support robust, cost-aware passive-execution payoff?</p>
        <p className="research-note">{detailed ? "Planned measurement layer: event-level trades, quotes and order-book updates; local book reconstruction; OFI, microprice, spread, depth and trade imbalance; then 1s, 5s, 10s, 30s and 60s markouts." : "5-minute and 1-minute layers remain as context and benchmarks. The new information layer is event-level market mechanics, not faster bar indicators."}</p>
        <div className="research-actions"><Link href="/projects">Inspect the supporting research systems <span aria-hidden="true">→</span></Link></div>
      </article>
      <article id="cpp-market-data-core" className="research-next">
        <p className="research-kicker">Current build · Systems engineering</p>
        <h3>C++ Market-Data &amp; Deterministic Replay Core</h3>
        <p>Build an event-driven core that captures, validates, reconstructs and replays trades and order-book updates with explicit timestamp and sequence discipline.</p>
        <p className="research-note">Raw WebSocket capture → sequence validation → local order book → deterministic replay → microstructure features → fill-probability, adverse-selection and markout analysis in Python.</p>
        <div className="research-actions"><Link href="/projects#execution-gateway">Inspect execution engineering <span aria-hidden="true">→</span></Link></div>
      </article>
    </div>
    <AuthorityBoundary>A faster data layer is not evidence of an edge. This work remains research-only until fill, markout, cost and robustness evidence support narrower claims; no research result grants automatic execution authority.</AuthorityBoundary>
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
