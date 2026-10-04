import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.R15_QA_BASE_URL ?? "http://localhost:3000";
const output = process.env.R15_QA_OUTPUT ?? "/tmp/portfolio-qa/r15";
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const theme of ["light", "dark"]) for (const width of [1440, 768, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    await context.addInitScript(value => {
      localStorage.setItem("meanydeany-theme", value);
      localStorage.setItem("meanydeany.analytics.owner-excluded.v1", "1");
    }, theme);
    await context.route("**/*", route => {
      const url = new URL(route.request().url());
      if (url.origin !== new URL(base).origin) return route.fulfill({ status: 503, contentType: "application/json", body: "{}" });
      return route.continue();
    });
    const page = await context.newPage();
    const exceptions = [];
    page.on("pageerror", error => exceptions.push(error.message));
    const response = await page.goto(`${base}/projects/btc-final-system`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").innerText(), "R15: from signal to system.");
    assert.equal(await page.locator("[data-r15-model]").count(), 3);
    const visible = await page.locator("main").innerText();
    for (const phrase of ["Hypothetical gross results", "commission, spread, slippage and funding set to zero", "Volatility-aware modeling", "Dual-head ensemble", "Promising extensions", "paired comparisons did not establish", "3 Oct 2026", "LIVE_READY was false"]) assert.ok(visible.includes(phrase), phrase);
    assert.doesNotMatch(visible, /Dual EMA|Daily EMA 50\/200|Not yet the execution edge/);
    await page.getByText("Read the comparison evidence", { exact: true }).click();
    await page.getByText(/all four paired log-growth intervals/).waitFor({ state: "visible" });
    await page.getByText("Read the comparison evidence", { exact: true }).click();
    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      width: innerWidth,
      background: getComputedStyle(document.body).backgroundColor,
      font: getComputedStyle(document.querySelector("h1")).fontFamily,
      cards: [...document.querySelectorAll("[data-r15-model]")].map(e => ({ width: e.getBoundingClientRect().width, radius: getComputedStyle(e).borderRadius, color: getComputedStyle(e.querySelector("h3")).color })),
    }));
    assert.ok(layout.documentWidth <= width + 1, JSON.stringify(layout));
    assert.ok(layout.font.includes("Georgia"));
    assert.equal(layout.background, theme === "light" ? "rgb(243, 240, 233)" : "rgb(17, 20, 22)");
    assert.ok(layout.cards.every(card => card.radius === "0px"));
    assert.deepEqual(exceptions, []);
    await page.screenshot({ path: `${output}/r15-${theme}-${width}.png`, fullPage: true });
    if (width === 1440) await page.locator("#challengers").screenshot({ path: `${output}/models-${theme}.png` });
    results.push({ theme, width, ...layout });
    await context.close();
  }
  const response = await fetch(`${base}/research/r15-summary.json`);
  assert.equal(response.status, 200);
  const summary = await response.json();
  assert.equal(summary.incumbent, "R15_RAW_1X");
  assert.equal(summary.selection.volnorm.promoted, false);
  assert.equal(summary.selection.blend.promoted, false);
  await fs.writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(`R15_PORTFOLIO_QA_PASS: ${results.length} theme/viewport combinations, evidence disclosure, model cards, summary, mobile layout and zero runtime exceptions.`);
} finally { await browser.close(); }
