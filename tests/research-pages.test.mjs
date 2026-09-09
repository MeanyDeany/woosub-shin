import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { researchEvidence } from "../lib/research-evidence.ts";

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

test("English and Korean homepage dependency graphs exclude telemetry, charts and WebGL", () => {
  const banned = /(?:^|\/)(?:home-live-telemetry|btc-live-(?:position|multi-position)|btc-lifetime-performance|btc-research-observatory|tradingview-observatory-datafeed)(?:\.|$)|^(?:three|@react-three\/fiber|lightweight-charts)(?:\/|$)/;
  for (const homepage of ["app/page.tsx", "app/ko/page.tsx"]) {
    const pending = [path.join(root, homepage)];
    const inspected = new Set();
    while (pending.length) {
      const filename = pending.pop();
      if (inspected.has(filename)) continue;
      inspected.add(filename);
      for (const specifier of moduleSpecifiers(filename)) {
        assert.doesNotMatch(specifier, banned, `${homepage} imports ${specifier} through ${path.relative(root, filename)}`);
        const local = localModule(specifier, filename);
        if (local) pending.push(local);
      }
    }
    assert.ok(inspected.size > 1, "The check must inspect transitive local dependencies.");
  }
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
