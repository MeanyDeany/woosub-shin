import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import ts from "typescript";
import {
  completedResearch,
  currentResearch,
  getMetricGroup,
  nextResearchQuestions,
  researchEvidence,
  researchTimeline,
  schedulerBranch,
} from "../lib/research-evidence.ts";

test("active and proposed research cannot expose a result", () => {
  assert.equal(completedResearch.length, 10);
  assert.deepEqual(currentResearch, []);
  assert.deepEqual(nextResearchQuestions.map((record) => record.id), ["candidate-generator-v3", "turnover-decomposition"]);
  for (const record of [...currentResearch, ...nextResearchQuestions]) {
    for (const resultField of ["finding", "metrics", "claimOutcome", "classification", "observations"]) {
      assert.equal(Object.hasOwn(record, resultField), false, `${record.id}: ${resultField}`);
    }
  }
  assert.equal(researchEvidence.nativeScheduler.evidenceClass, "SYNTHETIC");
  assert.equal(researchEvidence.turnoverDecomposition.workState, "proposed");
  assert.equal(researchEvidence.nativeHorizonSelection.evidenceClass, null);
});

test("forecast and policy metrics retain distinct assessment, outcome and code contexts", () => {
  const forecast = researchEvidence.independentRiskForecast;
  const policy = researchEvidence.policyUtility;
  assert.equal(forecast.classification, "INDEPENDENT_RISK_FORECAST_CONFIRMATION");
  assert.equal(forecast.claimOutcome, "confirmed");
  assert.equal(policy.classification, "FORECAST_INFORMATION_WITHOUT_POLICY_UTILITY");
  assert.equal(policy.workState, "completed");
  assert.equal(policy.claimOutcome, "not_confirmed");
  assert.equal(policy.evidenceClass, "RETROSPECTIVE");
  assert.equal(policy.code.commit, "3f5ebee1d3b002cd3f7f2d4ea65f72d6cf512cdd");
  assert.equal(forecast.code.commit, undefined);
  assert.equal(forecast.assessment.window.start, "2025-08-01");
  assert.equal(forecast.assessment.window.end, "2026-07-30");
  assert.equal(forecast.assessment.window.endInclusive, false);
  assert.equal(forecast.assessment.window.timezone, null);
  assert.equal(policy.assessment.window.start, undefined);
  assert.notEqual(forecast.assessment.id, policy.assessment.id);
  assert.deepEqual(getMetricGroup(forecast).metrics.map((metric) => metric.value), ["+12.58%", "+11.65%", "4 / 4"]);
  assert.equal(getMetricGroup(forecast, true).metrics.at(-1).value, "≈0.9963");
  assert.deepEqual(getMetricGroup(policy).metrics.map((metric) => metric.value), ["2.070%", "2.016%", "3.0%"]);
  for (const record of completedResearch) {
    assert.ok(record.assessment.id);
    assert.ok(record.keyCaveat);
    for (const metric of record.metrics) assert.equal(metric.assessmentId, record.assessment.id);
  }
  assert.throws(() => getMetricGroup({ ...forecast, assessment: policy.assessment }), /does not match/);
});

test("source availability never creates a placeholder or private repository URL", () => {
  for (const record of Object.values(researchEvidence)) {
    assert.ok(record.detailHref.startsWith("/"));
    if (record.source.availability !== "public") assert.equal(record.source.href, undefined);
    if (record.code.availability !== "public") assert.equal(record.code.href, undefined);
    for (const href of [record.detailHref, record.source.href, record.code.href].filter(Boolean)) {
      assert.notEqual(href, "#");
      assert.doesNotMatch(href, /btc_strategy_lab|\/Users\/|github\.com\/.*\/commit\/|file:\/\//);
    }
  }
});

test("timeline separates completed policy evidence from the completed methodology branch", () => {
  assert.equal(researchTimeline.length, 11);
  assert.deepEqual(researchTimeline.slice(-3).map((stage) => stage.id), ["policy-translation-tested", "policy-utility-not-confirmed", "policy-mechanism"]);
  assert.equal(schedulerBranch.fromStageId, "native-horizon-repair");
  assert.equal(schedulerBranch.record.workState, "completed");
  assert.equal(schedulerBranch.nextQuestion.workState, "proposed");
  assert.equal(researchTimeline.some((stage) => stage.recordId === "native-scheduler"), false);
  assert.equal(researchTimeline.some((stage) => stage.recordId === "turnover-decomposition"), false);
});

test("scheduler completion supports simplification with registered scope and bounded inference", () => {
  const scheduler = researchEvidence.nativeScheduler;
  assert.equal(scheduler.classification, "NATIVE_FIXED_SELECTION_SUFFICIENT");
  assert.equal(scheduler.evidenceClass, "SYNTHETIC");
  assert.equal(scheduler.code.commit, "b45e2a3fa2daf4b51967059d964393536a41f106");
  const values = Object.fromEntries(scheduler.metrics.map((metric) => [metric.id, metric.value]));
  assert.equal(values["scheduler-adjusted-difference"], "−0.39 pp");
  assert.equal(values["scheduler-paired-interval"], "[−2.47, +1.69] pp");
  assert.equal(values["scheduler-meaningful-margin"], "+5 pp");
  assert.equal(values["scheduler-registered-trials"], "1,536");
  assert.equal(values["scheduler-fixed-retention"], "97.93%");
  assert.equal(values["scheduler-forced-detection"], "242 / 256");
  assert.equal(values["scheduler-adaptive-adjusted"], "236 / 256");
  assert.equal(values["scheduler-fixed-detection"], "237 / 256");
  assert.match(scheduler.keyCaveat, /not exact equivalence/);
  assert.equal(researchEvidence.candidateGeneratorV3.workState, "proposed");
});

test("TypeScript requires assessment context and rejects result fields on non-result records", () => {
  const filename = path.resolve("lib/__research_evidence_type_contract__.ts");
  const fixture = `
    import { researchEvidence } from "./research-evidence";
    import type { OngoingResearchRecord, ProposedResearchRecord, ResearchMetricGroup } from "./research-evidence";
    declare const ongoingBase: OngoingResearchRecord;
    // @ts-expect-error An ongoing study cannot have result metrics.
    const ongoing: OngoingResearchRecord = { ...ongoingBase, metrics: [] };
    // @ts-expect-error A proposed question cannot have a finding.
    const proposed: ProposedResearchRecord = { ...researchEvidence.turnoverDecomposition, finding: "A winner" };
    // @ts-expect-error A proposed question cannot be labeled as observed evidence.
    const classified: ProposedResearchRecord = { ...researchEvidence.turnoverDecomposition, evidenceClass: "SYNTHETIC" };
    // @ts-expect-error A metric group requires its assessment context.
    const group: ResearchMetricGroup = { metrics: [], evidenceClass: null, keyCaveat: "Scope", source: researchEvidence.policyUtility.source, detailHref: "/research" };
    void [ongoing, proposed, classified, group];
  `;
  const options = {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler, strict: true,
    noEmit: true, skipLibCheck: true,
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (file, languageVersion, ...rest) => path.resolve(file) === filename
    ? ts.createSourceFile(file, fixture, languageVersion, true)
    : getSourceFile(file, languageVersion, ...rest);
  const program = ts.createProgram([filename], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (file) => file,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => "\n",
  }));
});
