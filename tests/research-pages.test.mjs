import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";
import vm from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { getMetricGroup, historicalResearchPerformance, researchEvidence } from "../lib/research-evidence.ts";
import { portfolioStudies, paperConnections, researchConnections } from "../lib/portfolio-content.ts";

const root = path.resolve(import.meta.dirname, "..");
function localModule(specifier, importer) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return null;
  const stem = specifier.startsWith("@/") ? path.join(root, specifier.slice(2)) : path.resolve(path.dirname(importer), specifier);
  return [stem, ...[".ts", ".tsx", ".js", ".jsx"].map(extension => stem + extension), path.join(stem, "index.ts"), path.join(stem, "index.tsx")].find(candidate => /\.[jt]sx?$/.test(candidate) && fs.existsSync(candidate)) ?? null;
}
function renderPage(relativePath, exportName = "default") {
  const require = createRequire(import.meta.url);
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const compiledModule = { exports: {} };
    cache.set(filename, compiledModule);
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), { fileName: filename, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
    const scopedRequire = specifier => {
      if (specifier === "next/link") return function TestLink({ children, ...props }) { return createElement("a", props, children); };
      if (specifier === "@/components/site-shell") return { PageShell: ({ children }) => children };
      const local = localModule(specifier, filename);
      return local ? load(local) : require(specifier);
    };
    const compile = new vm.Script(`(function(require, module, exports) {\n${output}\n})`, { filename }).runInThisContext();
    compile(scopedRequire, compiledModule, compiledModule.exports);
    return compiledModule.exports;
  }
  return renderToStaticMarkup(createElement(load(path.join(root, relativePath))[exportName]));
}
const renderHome = () => renderPage("components/portfolio-home.tsx", "PortfolioHome");
const textContent = html => html.replace(/<[^>]*>/g, " ").replaceAll("&amp;", "&").replace(/\s+/g, " ").trim();

test("homepage telemetry retains reviewed public projection components and no private exchange access", () => {
  const source = fs.readFileSync(path.join(root, "components/portfolio-home.tsx"), "utf8");
  assert.match(source, /HomeLiveTelemetry/);
  assert.doesNotMatch(source, /binance\.com|fapi\.binance|BINANCE_USDM_READONLY|api[_-]?key|secret[_-]?key/i);
  const telemetry = fs.readFileSync(path.join(root, "components/home-live-telemetry.tsx"), "utf8");
  for (const name of ["BtcLifetimePerformance", "BtcLiveMultiPosition", "BtcRollingPerformance", "BtcDailyPerformance"]) assert.ok(telemetry.includes(name));
  assert.doesNotMatch(telemetry, /WebSocket|EventSource|XMLHttpRequest|axios|useSWR|fapi\.binance/i);
});

test("Home is personal-first and keeps the exact ASRA identity without legacy branding", () => {
  const html = renderHome();
  const hero = html.match(/<section[^>]+home-hero[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero);
  assert.match(textContent(hero), /meanydeany/);
  assert.match(textContent(hero), /Futures trader\. Quantitative researcher\./);
  assert.match(textContent(html), /AI Systematic Research Architecture/);
  assert.match(html, /href="\/asra(?:#|")/);
  assert.doesNotMatch(html, /href="\/astra(?:#|\/|")/i);
  assert.doesNotMatch(textContent(html), /\bASTRA\b|AI-augmented systematic research architecture/i);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});

test("Home links account outcomes, research, papers and systems without mixing evidence classes", () => {
  const html = renderHome();
  const text = textContent(html);
  assert.match(text, /Actual account observations, separate from backtests and model evaluations/);
  assert.match(text, /Historical strategy returns are not personal account returns/);
  assert.match(text, /not a live order route/);
  assert.match(text, /hypothetical fills are not realized PnL/);
  for (const href of ["/trading", "/research", "/papers", "/projects", "/resume", "/contact", "/research/trader-behavior", "/research/microstructure", "/projects/btc-final-system"]) assert.ok(html.includes(`href="${href}"`), href);
  assert.deepEqual(researchConnections.map(item => item.title), ["Trading record", "Research questions", "Tests and evidence", "Systems"]);
  assert.doesNotMatch(html, /href="\/ko(?:\/|")|lang="ko"|[\uac00-\ud7af]|English-only/);
  assert.doesNotMatch(html, /<canvas|<video|observation-field/);
});

test("behavioral case study retains every published result and its conditional interpretation", () => {
  const html = renderPage("app/research/trader-behavior/page.tsx");
  const text = textContent(html);
  for (const term of [/686/, /114/, /71\.05%/, /67\.76%/, /MCC 0\.353/, /689 complete episodes/, /66\.47%/, /worst 1% of episodes accounted for 50\.20% of all losing PnL/, /0\.5583/, /0\.1364/, /do not establish a profitable-entry model or a reliable risk veto/, /conditional on recorded LONG\/SHORT entries/, /kept out of fitting and parameter selection/, /not attributed to this model/, /read-only observer/]) assert.match(text, term);
  assert.match(html, /href="\/trading"/);
  assert.match(html, /href="\/research\/microstructure"/);
});

test("R15 replaces the legacy strategy panel while forecast evidence remains unchanged", () => {
  const historical = historicalResearchPerformance;
  assert.deepEqual(historical.rows.map(row => [row.name, row.role, row.returnValue, row.sharpe, row.maxDrawdown]), [
    ["R15 RAW 1X", "retained", "+1,463.45%", "1.955", "-46.03%"],
    ["R15 VOLNORM 1X", "reference", "+6,763.15%", "3.170", "-21.48%"],
    ["R15 BLEND 1X", "reference", "+6,001.97%", "2.998", "-24.82%"],
  ]);
  const caveats = historical.caveats.join(" ");
  for (const term of [/EXPOSED HISTORICAL DEVELOPMENT/, /not untouched OOS confirmation/, /Commission, spread, slippage and funding are zero/, /maker fillability/, /not promoted/, /3 Oct 2026/]) assert.match(caveats, term);
  const metrics = getMetricGroup(researchEvidence.independentRiskForecast).metrics.map(metric => metric.value);
  assert.deepEqual(metrics, ["+12.58%", "+11.65%", "4 / 4"]);
  assert.equal(portfolioStudies.find(study => study.id === "risk-forecasting").metric, metrics[0]);
  assert.match(textContent(renderHome()), /Log-MSE improvement, not investment return/);
  assert.match(textContent(renderHome()), /preregistered policy-utility claim did not/);
});

test("Trading page does not claim nonexistent order history or recalculate performance", () => {
  const html = renderPage("app/trading/page.tsx");
  const text = textContent(html);
  assert.match(text, /Daily history is not order history/);
  assert.match(text, /Order-level feed: not published/);
  assert.match(text, /13 Nov 2024/);
  assert.match(text, /01 Aug 2026/);
  assert.match(text, /interface does not recalculate returns/);
  assert.match(text, /Missing observations are unavailable, not zero/);
  assert.match(text, /Personal journal notes stay in the browser/);
  assert.doesNotMatch(fs.readFileSync(path.join(root, "app/trading/page.tsx"), "utf8"), /fapi\.binance|BINANCE_API_KEY|api[_-]?secret/i);
});

test("current work has status and local-compute limitations instead of profitability claims", () => {
  const text = textContent(renderPage("app/research/microstructure/page.tsx"));
  assert.match(text, /profitable execution strategy has not been established/);
  assert.match(text, /not a measurement of exchange or end-to-end execution latency/);
  assert.match(text, /Negative tests are part of the deliverable/);
  assert.match(text, /September 26, 2026/);
  const projects = textContent(renderPage("app/projects/page.tsx"));
  assert.match(projects, /NO AUTOMATIC EXECUTION AUTHORITY/);
});

test("all reviewed research and editorial destinations resolve to real pages or files", () => {
  const hrefs = [...Object.values(researchEvidence).flatMap(record => [record.detailHref, record.source.href].filter(Boolean)), ...portfolioStudies.map(study => study.href), ...researchConnections.map(item => item.href), ...paperConnections.flatMap(paper => [paper.pdfHref, paper.projectHref, paper.nextHref])];
  for (const href of hrefs) {
    if (!href.startsWith("/")) continue;
    const pathname = href.split(/[?#]/, 1)[0];
    assert.ok(fs.existsSync(path.join(root, "app", pathname, "page.tsx")) || fs.existsSync(path.join(root, "public", pathname)), `Missing destination: ${href}`);
  }
});


test("public identity stays meanydeany and the real name appears only once in the resume", () => {
  const home = textContent(renderHome());
  assert.doesNotMatch(home, /\b(?:woosub|shin)\b|신우섭/i);
  assert.match(home, /Quantitative Economics & Econometrics/);
  assert.match(home, /UC San Diego/);
  const resume = textContent(renderPage("app/resume/page.tsx"));
  assert.equal((resume.match(/Woosub Shin/g) ?? []).length, 1);
  assert.equal((resume.match(/\bWoosub\b/gi) ?? []).length, 1);
  assert.match(resume, /University of California, San Diego/);
  assert.match(resume, /Quantitative Economics & Econometrics/);
  assert.match(resume, /University of Copenhagen/);
  const shell = fs.readFileSync(path.join(root, "components/site-shell.tsx"), "utf8");
  assert.match(shell, /aria-label="meanydeany \/ Home"/);
  assert.doesNotMatch(shell, /woosub shin|\bWoosub\b|신우섭/i);
});


test("R15 presents model design before selection detail without changing evidence", () => {
  const html = renderPage("app/projects/btc-final-system/page.tsx");
  const text = textContent(html);
  assert.match(text, /R15: from signal to system/);
  assert.match(text, /One benchmark\. Two extensions/);
  for (const term of [/Signal design/, /Volatility-aware modeling/, /Dual-head ensemble/, /Promising extensions/, /paired comparisons did not establish/, /neither extension has been promoted/, /post-outcome Ridge-only diagnostic/, /At that checkpoint, forward-valid origins were 0/, /LIVE_READY was false/]) assert.match(text, term);
  for (const term of [/Hypothetical gross results/, /commission, spread, slippage and funding set to zero/, /1 Jan 2022 to 29 Jul 2026/, /1 Jan 2025 to 29 Jul 2026/]) assert.match(text, term);
  assert.doesNotMatch(text, /Daily EMA 50\/200|Dual EMA|failed successor|Not yet the execution edge/);
  assert.match(html, /href="\/research\/r15-summary.json"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(text.indexOf("My contribution") < text.indexOf("+6,763.15%"));
  assert.ok(text.indexOf("Hypothetical gross results") < text.indexOf("+6,763.15%"));
});

test("R15 published metrics match the reviewed numeric snapshot and retain original decisions", () => {
  const summary = JSON.parse(fs.readFileSync(path.join(root, "public/research/r15-summary.json"), "utf8"));
  assert.equal(summary.incumbent, "R15_RAW_1X");
  assert.equal(summary.evidence, "EXPOSED_HISTORICAL_DEVELOPMENT");
  assert.equal(summary.metrics.length, 6);
  assert.deepEqual(summary.frictions_bp, { commission: 0, spread: 0, slippage: 0, funding: 0 });
  assert.equal(summary.selection.volnorm.promoted, false);
  assert.equal(summary.selection.blend.promoted, false);
  assert.equal(summary.selection.volnorm.verdict, "NO_SUPPORTED_RETURN_UPGRADE_RETAIN_R15");
  assert.equal(summary.selection.blend.verdict, "POSITIVE_GROSS_CANDIDATE_NO_SUPPORTED_UPGRADE");
  assert.equal(summary.runtime_checkpoint.is_live_status, false);
  assert.match(summary.runtime_checkpoint.as_of_utc, /^2026-10-03/);
  const text = textContent(renderPage("app/projects/btc-final-system/page.tsx"));
  for (const row of summary.metrics) {
    const gross = `+${row.return_pct.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
    const mdd = `${row.minute_open_mdd_pct.toFixed(2)}%`;
    assert.ok(text.includes(gross), gross);
    assert.ok(text.includes(mdd), mdd);
  }
  assert.equal(researchEvidence.r15Candidate.reviewedAt, "2026-10-04");
  assert.doesNotMatch(JSON.stringify(summary), /\/Users\/|\/home\/|api[_-]?key/i);
});

test("R15 navigation replaces the retired EMA pitch across the portfolio", () => {
  for (const route of ["app/research/page.tsx", "app/resume/page.tsx", "app/projects/page.tsx", "app/projects/multi-asset-research-lab/page.tsx"]) {
    const text = textContent(renderPage(route));
    assert.match(text, /R15/, route);
    assert.doesNotMatch(text, /Dual EMA|Daily EMA 50\/200|165\.92%/, route);
  }
});
