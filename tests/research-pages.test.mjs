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

test("homepage transitive dependencies exclude market telemetry, charts, WebGL and data transport", () => {
  const banned = /(?:^|\/)(?:home-live-telemetry|btc-live-(?:position|multi-position)|btc-lifetime-performance|btc-research-observatory|tradingview-observatory-datafeed|binance-telemetry(?:-v2)?)(?:\.|$)|^(?:three|@react-three\/fiber|lightweight-charts)(?:\/|$)/;
  const pending = [path.join(root, "app/page.tsx")];
  const inspected = new Set();
  while (pending.length) {
    const filename = pending.pop();
    if (inspected.has(filename)) continue;
    inspected.add(filename);
    const relative = path.relative(root, filename);
    const source = ts.createSourceFile(filename, fs.readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
    function inspectTransport(node) {
      if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
        const name = ts.isIdentifier(node.expression) ? node.expression.text
          : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : "";
        if (name === "fetch") {
          const endpoint = node.arguments?.[0];
          assert.ok(relative === "components/visitor-stats.tsx" && endpoint && ts.isStringLiteral(endpoint) && endpoint.text === "/api/traffic", `${relative} adds homepage data fetching beyond visitor counts`);
        }
        assert.ok(!["WebSocket", "EventSource", "XMLHttpRequest", "axios", "useSWR"].includes(name), `${relative} adds ${name} transport to Home`);
      }
      ts.forEachChild(node, inspectTransport);
    }
    inspectTransport(source);
    for (const specifier of moduleSpecifiers(filename)) {
      assert.doesNotMatch(specifier, banned, `Home imports ${specifier} through ${relative}`);
      const local = localModule(specifier, filename);
      if (local) pending.push(local);
    }
  }
  assert.ok(inspected.size > 1, "The check must inspect transitive local dependencies.");
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
  assert.ok(html.indexOf('id="historical-research-performance"') < html.indexOf("How ASTRA works"));
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
