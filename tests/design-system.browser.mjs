import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";
import { siteRoutes } from "../lib/site-routes.ts";

const out = "/tmp/portfolio-qa/design-system";
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [], exceptions = [], failures = [], consoleErrors = [];
try {
  for (const theme of ["dark", "light"]) for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    await context.addInitScript(value => localStorage.setItem("meanydeany-theme", value), theme);
    // External sources are unavailable in layout QA, not replaced by made-up PnL.
    await context.route("**/*", async route => {
      const url = new URL(route.request().url());
      if (!["localhost", "127.0.0.1"].includes(url.hostname)) return route.fulfill({ status: 503, contentType: "application/json", body: '{"error":"Layout QA: external source disabled"}' });
      return route.continue();
    });
    const page = await context.newPage();
    page.on("pageerror", error => exceptions.push({ theme, width, url: page.url(), message: error.message }));
    page.on("console", message => { if (message.type() === "error" && !/Failed to load resource|503/.test(message.text())) consoleErrors.push({ theme, width, url: page.url(), message: message.text() }); });
    for (const pathname of siteRoutes) {
      const response = await page.goto(`http://localhost:3000${pathname}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const snapshot = await page.evaluate(() => {
        const h1s = [...document.querySelectorAll("h1")];
        const heading = h1s[0];
        return {
          h1Count: h1s.length, heading: heading?.textContent,
          font: heading ? getComputedStyle(heading).fontFamily : null,
          ledgerHeading: Boolean(heading?.closest(".trading-desk")),
          theme: document.documentElement.dataset.theme,
          gutter: getComputedStyle(document.documentElement).getPropertyValue("--folio-gutter").trim(),
          bodyBackground: getComputedStyle(document.body).backgroundColor,
          width: innerWidth, documentWidth: document.documentElement.scrollWidth,
          hasContent: (document.querySelector("main")?.textContent?.trim().length ?? 0) > 100,
          overlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay')),
          overflowing: [...document.querySelectorAll("main *")].filter(e => e.getBoundingClientRect().right > innerWidth + 2 && getComputedStyle(e).position !== "fixed").slice(0, 8).map(e => ({ tag: e.tagName, class: e.className, right: e.getBoundingClientRect().right })),
        };
      });
      const problems = [];
      if (response?.status() !== 200) problems.push("HTTP status");
      if (snapshot.h1Count !== 1) problems.push("primary heading count");
      if (!snapshot.ledgerHeading && !snapshot.font?.includes("Georgia")) problems.push("display font mismatch");
      if (snapshot.gutter !== (width === 390 ? "20px" : "72px")) problems.push("responsive gutter mismatch");
      if (snapshot.theme !== theme) problems.push("theme mismatch");
      if (snapshot.documentWidth > width + 1) problems.push("document overflow");
      if (!snapshot.hasContent || snapshot.overlay) problems.push("blank page or error overlay");
      if (snapshot.bodyBackground !== (theme === "dark" ? "rgb(17, 20, 22)" : "rgb(243, 240, 233)")) problems.push("shared canvas mismatch");
      const name = pathname === "/" ? "home" : pathname.slice(1).replaceAll("/", "-");
      await page.screenshot({ path: `${out}/${name}-${theme}-${width}.png`, fullPage: ["/research", "/resume", "/contact"].includes(pathname) });
      results.push({ pathname, theme, width, status: response?.status(), ...snapshot, problems });
      if (problems.length) failures.push({ pathname, theme, width, problems });
    }
    await page.goto("http://localhost:3000/research", { waitUntil: "networkidle" });
    if (width === 390) {
      const menu = page.getByRole("button", { name: /menu/i });
      if (await menu.count()) await menu.first().click();
    }
    await page.locator('header a[href="/resume"]').first().click();
    await page.waitForURL("**/resume");
    assert.ok((await page.locator("h1").evaluate(e => getComputedStyle(e).fontFamily)).includes("Georgia"));
    // Both account routes display the accounting distinction before the dashboard.
    for (const route of ["/trading", "/projects/btc-futures-research/live-position"]) {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
      const guide = page.getByRole("complementary", { name: "Calendar accounting guide" });
      assert.ok(await guide.isVisible());
      await guide.locator("summary").click();
      assert.ok(await guide.getByText(/Non-BTC performance, BNB fees without USD valuation/).isVisible());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    }
    await context.close();
  }
  await fs.writeFile(`${out}/results.json`, JSON.stringify({ results, failures, exceptions, consoleErrors }, null, 2));
  assert.deepEqual(failures, []);
  assert.deepEqual(exceptions, []);
  assert.deepEqual(consoleErrors, []);
  console.log(`DESIGN_SYSTEM_OK: ${results.length} page/theme/viewport combinations; shared typography, canvas, gutters, navigation and accounting-guide checks passed.`);
} finally { await browser.close(); }
