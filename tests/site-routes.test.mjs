import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { getLocaleCounterpart, getRouteAlternates, localeCounterpartPairs, siteRoutes } from "../lib/site-routes.ts";

const appDirectory = fileURLToPath(new URL("../app", import.meta.url));

function pageRoutes(directory = appDirectory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return pageRoutes(filename);
    if (entry.name !== "page.tsx") return [];
    const route = path.relative(appDirectory, directory).split(path.sep).join("/");
    return [route ? `/${route}` : "/"];
  });
}

test("public route inventory matches existing App Router pages", () => {
  assert.equal(new Set(siteRoutes).size, siteRoutes.length);
  assert.deepEqual([...siteRoutes].sort(), pageRoutes().sort());
});

test("all locale counterparts exist and switch reciprocally", () => {
  const available = new Set(pageRoutes());
  const mapped = new Set();
  for (const pair of localeCounterpartPairs) {
    for (const route of [pair.en, pair.ko]) {
      assert.ok(available.has(route), `Missing locale page: ${route}`);
      assert.ok(!mapped.has(route), `Ambiguous locale page: ${route}`);
      mapped.add(route);
      assert.deepEqual(getRouteAlternates(route).languages, pair);
    }
    assert.deepEqual(getLocaleCounterpart(pair.en), { href: pair.ko, locale: "ko" });
    assert.deepEqual(getLocaleCounterpart(pair.ko), { href: pair.en, locale: "en" });
  }
  assert.equal(localeCounterpartPairs.length, 13);
});

test("English-only pages do not advertise fabricated translations", () => {
  for (const route of ["/astra", "/research/risk-forecasting", "/research/nonlinear-measurement", "/resume", "/projects/btc-final-system"]) {
    assert.equal(getLocaleCounterpart(route), null);
    assert.equal(getRouteAlternates(route).languages, undefined);
  }
  assert.equal(getLocaleCounterpart("/ko/astra"), null);
  assert.equal(getLocaleCounterpart("/unknown"), null);
});
