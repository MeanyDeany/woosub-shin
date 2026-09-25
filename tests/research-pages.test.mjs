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

const root = path.resolve(import.meta.dirname, "..");

function moduleSpecifiers(filename) {
  const source = ts.createSourceFile(filename, fs.readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
  const imports = [];
  function visit(node) {
    if (ts.isImportDeclaration(node) && !node.importClause?.isTypeOnly) {
      imports.push(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.moduleSpecifier) {
      imports.push(node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) {
      imports.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return imports;
}

function localModule(specifier, importer) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return null;
  const stem = specifier.startsWith("@/")
    ? path.join(root, specifier.slice(2))
    : path.resolve(path.dirname(importer), specifier);
  return [stem, ...[".ts", ".tsx", ".js", ".jsx"].map((extension) => stem + extension), path.join(stem, "index.ts"), path.join(stem, "index.tsx")]
    .find((candidate) => /\.[jt]sx?$/.test(candidate) && fs.existsSync(candidate)) ?? null;
}

test("homepage telemetry uses only the reviewed public projection components", () => {
  const source = fs.readFileSync(path.join(root, "components/portfolio-home.tsx"), "utf8");
  assert.match(source, /HomeLiveTelemetry/);
  assert.doesNotMatch(source, /binance\.com|fapi\.binance|BINANCE_USDM_READONLY|api[_-]?key|secret[_-]?key/i);

  const telemetry = fs.readFileSync(path.join(root, "components/home-live-telemetry.tsx"), "utf8");
  assert.match(telemetry, /BtcLifetimePerformance/);
  assert.match(telemetry, /BtcLiveMultiPosition/);
  assert.match(telemetry, /BtcRollingPerformance/);
  assert.match(telemetry, /deriveBtcLifetimePerformanceFeedUrl/);
  assert.match(telemetry, /deriveBtcLiveMultiPositionFeedUrl/);
  assert.match(telemetry, /deriveBtcRollingPerformanceFeedUrl/);
  assert.doesNotMatch(telemetry, /WebSocket|EventSource|XMLHttpRequest|axios|useSWR|fapi\.binance/i);
});


// Render the actual server content with only framework routing and shell isolated.
// Shared research components and registry are loaded from their real source modules.
function renderHome() {
  const require = createRequire(import.meta.url);
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const compiledModule = { exports: {} };
    cache.set(filename, compiledModule);
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    const scopedRequire = (specifier) => {
      if (specifier === "next/link") return function TestLink({ children, ...props }) { return createElement("a", props, children); };
      if (specifier === "@/components/site-shell") return { PageShell: ({ children }) => children };
      const local = localModule(specifier, filename);
      return local ? load(local) : require(specifier);
    };
    const compile = new vm.Script(`(function(require, module, exports) {\n${output}\n})`, { filename }).runInThisContext();
    compile(scopedRequire, compiledModule, compiledModule.exports);
    return compiledModule.exports;
  }
  return renderToStaticMarkup(createElement(load(path.join(root, "components/portfolio-home.tsx")).PortfolioHome));
}

function textContent(markup) {
  return markup.replace(/<[^>]*>/g, " ").replaceAll("&amp;", "&").replace(/\s+/g, " ").trim();
}

test("Home presents ASRA with its exact expansion and canonical program links", () => {
  const html = renderHome();
  const hero = html.match(/<section[^>]+home-hero[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero, "The human and program identity must remain in the Home hero.");
  const heroText = textContent(hero);
  assert.match(heroText, /WOOSUB SHIN/);
  assert.match(heroText, /Quantitative Researcher/);
  assert.match(heroText, /Systematic trading, market microstructure, and quantitative research\./);
  assert.match(heroText, /\bASRA\b/);
  assert.match(heroText, /AI Systematic Research Architecture/);
  assert.match(html, /href="\/asra(?:#|")/);
  assert.doesNotMatch(html, /href="\/astra(?:#|\/|")/i);
  assert.doesNotMatch(textContent(html), /\bASTRA\b|AI-augmented systematic research architecture/i);
});

test("Home surfaces trading evidence and trader-behavior ML with explicit limits", () => {
  const html = renderHome();
  const text = textContent(html);
  assert.match(text, /Trader behavior ML/);
  assert.doesNotMatch(text, /Futures OOS Sharpe 1\.236/);
  assert.match(text, /686 ML-eligible episodes/);
  assert.match(text, /114 Newest BTCUSDC episodes/);
  assert.match(text, /71\.05% HGB \+ user-state model/);
  assert.match(text, /67\.76% Final conditional LONG\/SHORT imitation/);
  assert.match(text, /worst 1% of episodes accounted for 50\.20% of all losing PnL/);
  assert.match(text, /do not establish a profitable-entry model or a reliable risk veto/);
  assert.match(text, /read-only observer now collects forward action/);
});

test("Home observation geometry stays decorative and server-rendered", () => {
  const html = renderHome();
  const fields = [...html.matchAll(/<div class="observation-field [^"]+" aria-hidden="true">([\s\S]*?)<\/div>/g)];
  assert.ok(fields.length >= 2, "The hero and pipeline share the static observation field.");
  for (const [, field] of fields) {
    assert.match(field, /<svg\b[^>]*focusable="false"/);
    assert.doesNotMatch(field, /<(?:a|button|input|canvas|video|image|foreignObject)\b|\btabindex=/i);
    assert.equal(textContent(field), "", "Decorative geometry must not introduce scientific copy or values.");
  }
  const pending = [path.join(root, "components/observation-field.tsx")];
  const inspected = new Set();
  while (pending.length) {
    const filename = pending.pop();
    if (inspected.has(filename)) continue;
    inspected.add(filename);
    const source = ts.createSourceFile(filename, fs.readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
    assert.ok(!source.statements.some(statement => ts.isExpressionStatement(statement) && ts.isStringLiteral(statement.expression) && statement.expression.text === "use client"), `${path.relative(root, filename)} adds decorative client hydration`);
    for (const specifier of moduleSpecifiers(filename)) {
      const local = localModule(specifier, filename);
      if (local) pending.push(local);
    }
  }
});

test("Home renders the frozen historical comparison after independent evidence with visible caveats", () => {
  const html = renderHome();
  const historical = historicalResearchPerformance;
  const table = html.match(/<table\b[^>]*class="historical-performance-table"[\s\S]*?<\/table>/)?.[0];
  assert.ok(table, "Historical results must use a semantic table.");
  assert.match(table, /<caption>/);
  assert.match(table, /aria-describedby="historical-performance-context historical-performance-caveats"/);
  assert.deepEqual([...table.matchAll(/<th scope="col">([^<]+)<\/th>/g)].map(match => match[1]), ["System", "Return", "Sharpe", "MaxDD", "Evidence"]);
  const expected = [
    ["Daily EMA 50/200", "retained", "+165.92%", "0.769", "-29.37%"],
    ["BTC price-only buy & hold", "reference", "+38.33%", "0.394", "-66.94%"],
    ["BTC perpetual long", "reference", "+2.27%", "0.265", "-68.12%"],
  ];
  assert.deepEqual(historical.rows.map(row => [row.name, row.role, row.returnValue, row.sharpe, row.maxDrawdown]), expected);
  const rows = [...table.matchAll(/<tr data-role="([^"]+)">([\s\S]*?)<\/tr>/g)];
  assert.equal(rows.length, 3);
  rows.forEach((row, index) => {
    assert.equal(row[1], expected[index][1]);
    assert.match(row[2], /<th scope="row">/);
    assert.ok(textContent(row[2]).includes(expected[index][0]));
    const values = [...row[2].matchAll(/<td>([\s\S]*?)<\/td>/g)].map(cell => textContent(cell[1]));
    assert.deepEqual(values, [...expected[index].slice(2), "RETROSPECTIVE"]);
  });
  const caveats = html.match(/<ul id="historical-performance-caveats"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(caveats, "Caveats must be visible adjacent content, not a tooltip.");
  for (const term of [/RETROSPECTIVE/, /post-selection/, /3 completed historical trades/, /97\.4% of positive completed-trade log growth/, /not untouched OOS confirmation/, /not live performance/]) assert.match(textContent(caveats), term);
  assert.match(html, /href="\/projects\/btc-final-system"/);
  const independentSection = html.match(/<section[^>]+home-primary-finding[\s\S]*?<\/section>/)?.[0];
  assert.ok(independentSection);
  assert.deepEqual(getMetricGroup(researchEvidence.independentRiskForecast).metrics.map(metric => metric.value), ["+12.58%", "+11.65%", "4 / 4"]);
  assert.deepEqual([...independentSection.matchAll(/<span class="metric-value">([^<]+)<\/span>/g)].map(match => match[1]), ["+12.58%", "+11.65%", "4 / 4"]);
  assert.ok(html.indexOf(independentSection) < html.indexOf('id="historical-research-performance"'));
  assert.ok(html.indexOf('id="historical-research-performance"') < html.indexOf("ASRA research process"));
  assert.ok(html.slice(html.indexOf(independentSection) + independentSection.length).startsWith('<section id="historical-research-performance"'), "Historical performance must immediately follow the independent finding.");
  assert.doesNotMatch(html, /≈0\.9963|0\.050895|0\.007539%|0\.130519%/);
});

test("Home keeps four static Systems references and no public Korean experience", () => {
  const html = renderHome();
  const systemLinks = [...html.matchAll(/<a href="([^"]+)" class="home-system-card">/g)].map(match => match[1]);
  assert.deepEqual(systemLinks, ["/projects/btc-futures-research/live-position", "/projects/btc-final-system", "/projects/multi-asset-research-lab", "/projects#execution-gateway"]);
  assert.match(textContent(html), /Read-only positions & performance/);
  assert.match(textContent(html), /NO AUTOMATIC EXECUTION AUTHORITY/);
  assert.doesNotMatch(html, /href="\/ko(?:\/|")|lang="ko"|[\uac00-\ud7af]|English-only/);
  assert.equal((html.match(/<ol class="home-progression-stages">/g) ?? []).length, 2);
});

test("reviewed research destinations and public artifacts resolve to real routes or files", () => {
  for (const record of Object.values(researchEvidence)) {
    for (const href of [record.detailHref, record.source.href].filter(Boolean)) {
      if (!href.startsWith("/")) continue;
      const pathname = href.split(/[?#]/, 1)[0];
      const route = path.join(root, "app", pathname, "page.tsx");
      const artifact = path.join(root, "public", pathname);
      assert.ok(fs.existsSync(route) || fs.existsSync(artifact), `${record.id} destination is missing: ${href}`);
    }
  }
});
