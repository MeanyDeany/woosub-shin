import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";
import nextConfig from "../next.config.ts";
import { getRouteAlternates, primaryNavigation, siteRoutes } from "../lib/site-routes.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const appDirectory = path.join(root, "app");
const requireDependency = createRequire(import.meta.url);

function pageRoutes(directory = appDirectory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return pageRoutes(filename);
    if (entry.name !== "page.tsx") return [];
    const route = path.relative(appDirectory, directory).split(path.sep).join("/");
    return [route ? `/${route}` : "/"];
  });
}

// Execute the actual static metadata/sitemap modules with existing TypeScript.
function loadStaticModule(relativeFilename) {
  const filename = path.join(root, relativeFilename);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  const loadedModule = { exports: {} };
  const localRequire = (specifier) => specifier.startsWith("@/")
    ? loadStaticModule(`${specifier.slice(2)}.ts`)
    : requireDependency(specifier);
  new Function("require", "module", "exports", outputText)(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

test("public route inventory contains exactly the existing 18 English pages", () => {
  assert.equal(siteRoutes.length, 18);
  assert.ok(siteRoutes.includes("/asra"));
  assert.ok(!siteRoutes.includes("/astra"));
  assert.equal(new Set(siteRoutes).size, siteRoutes.length);
  assert.deepEqual([...siteRoutes].sort(), pageRoutes().sort());
  assert.ok(siteRoutes.every((route) => !/^\/ko(?:\/|$)/.test(route)));
});

test("sitemap and metadata emit no Korean pages or hreflang alternates", () => {
  const { default: sitemap } = loadStaticModule("app/sitemap.ts");
  const { metadataFor } = loadStaticModule("lib/site-metadata.ts");
  const entries = sitemap();
  assert.ok(entries.some((entry) => new URL(entry.url).pathname === "/asra"));
  assert.ok(entries.every((entry) => new URL(entry.url).pathname !== "/astra"));
  assert.deepEqual(entries.map((entry) => new URL(entry.url).pathname).sort(), [...siteRoutes].sort());
  for (const entry of entries) {
    assert.equal(entry.alternates, undefined);
    assert.doesNotMatch(new URL(entry.url).pathname, /^\/ko(?:\/|$)/);
  }
  for (const route of siteRoutes) {
    const metadata = metadataFor(route, "Research", "A bounded research finding.");
    assert.equal(metadata.alternates.canonical, new URL(route, "https://meanydeany.com").href);
    assert.equal(metadata.alternates.languages, undefined);
    assert.equal(metadata.openGraph.locale, "en_US");
    assert.deepEqual(getRouteAlternates(route), { canonical: route });
  }
});

test("all 13 retired Korean URLs redirect directly to existing English counterparts", async () => {
  const redirects = (await nextConfig.redirects()).filter((entry) => /^\/ko(?:\/|$)/.test(entry.source));
  const historicalSources = [
    "/ko", "/ko/research", "/ko/papers", "/ko/projects",
    "/ko/projects/btc-futures-research", "/ko/projects/btc-futures-research/live-position",
    "/ko/projects/btc-regime-challenger", "/ko/projects/multi-asset-research-lab",
    "/ko/projects/multi-asset-research-lab/claims", "/ko/projects/volatility-regime-filtering",
    "/ko/projects/bitcoin-bubble-gsadf", "/ko/contact", "/ko/build-log",
  ];
  assert.deepEqual(redirects.map((entry) => entry.source).sort(), historicalSources.sort());
  for (const redirect of redirects) {
    assert.equal(redirect.destination, redirect.source.slice(3) || "/");
    assert.ok(siteRoutes.includes(redirect.destination), `Missing redirect destination: ${redirect.destination}`);
    assert.equal(redirect.permanent, false, "Temporary 307 redirects keep this release decision reversible.");
    assert.ok(!redirects.some((entry) => entry.source === redirect.destination), "Legacy redirects must not chain.");
  }
});

test("the former program URL redirects only to the canonical ASRA route", async () => {
  const redirects = await nextConfig.redirects();
  assert.equal(redirects.length, 14);
  assert.equal(new Set(redirects.map((entry) => entry.source)).size, redirects.length);
  assert.deepEqual(redirects.filter((entry) => !/^\/ko(?:\/|$)/.test(entry.source)), [
    { source: "/astra", destination: "/asra", permanent: false },
  ]);
  for (const redirect of redirects) {
    assert.ok(siteRoutes.includes(redirect.destination));
    assert.ok(!redirects.some((entry) => entry.source === redirect.destination), "Legacy redirects must not chain.");
  }
});

test("normal navigation exposes no language switch or retired routes", () => {
  const navigation = readFileSync(path.join(root, "components/active-navigation.tsx"), "utf8");
  const shell = readFileSync(path.join(root, "components/site-shell.tsx"), "utf8");
  assert.doesNotMatch(navigation, /LanguageSwitcher|language-switcher|primaryNavigationKo|한국어|English-only|\bEN\b/);
  assert.doesNotMatch(shell, /LanguageSwitcher|한국어|English-only|\/ko(?:\/|["'])/);
  assert.deepEqual(primaryNavigation.map((item) => item.label), ["ASRA", "Research", "Papers", "Systems", "About"]);
  assert.ok(primaryNavigation.every((item) => siteRoutes.includes(item.href)));
});
