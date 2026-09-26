import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";

const out = "/tmp/portfolio-qa";
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
const results = [];
const routes = ["/", "/trading", "/papers", "/projects", "/research/trader-behavior", "/research/microstructure"];
try {
  for (const theme of ["dark", "light"]) {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
      await context.addInitScript(value => localStorage.setItem("meanydeany-theme", value), theme);
      // No made-up performance values. Existing desk browser tests separately exercise fixtures.
      await context.route("**/public/execution/**", route => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "QA: source intentionally unavailable" }) }));
      const page = await context.newPage();
      page.on("pageerror", error => errors.push(`${theme}/${width}: ${error.message}`));
      for (const pathname of routes) {
        const response = await page.goto(`http://localhost:3000${pathname}`, { waitUntil: "networkidle" });
        assert.equal(response.status(), 200, pathname);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator("h1").count(), 1, `${pathname}: one page heading`);
        assert.ok(await page.locator("main").isVisible());
        assert.equal(await page.locator("html").getAttribute("data-theme"), theme);
        const dimensions = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
        assert.ok(dimensions.document <= dimensions.width + 1, `${pathname} ${theme}/${width} document overflow: ${JSON.stringify(dimensions)}`);
        const name = pathname === "/" ? "home" : pathname.replaceAll("/", "-").slice(1);
        await page.screenshot({ path: `${out}/${name}-${theme}-${width}.png`, fullPage: true });
        results.push({ pathname, theme, width, status: response.status(), dimensions });
      }
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      await page.locator('main a[href="/trading"]').first().click();
      await page.waitForURL("**/trading");
      await page.getByRole("link", { name: "Order-history coverage", exact: true }).click();
      await page.waitForURL("**/trading#order-history");
      assert.ok(await page.getByText("Order-level feed: not published", { exact: true }).isVisible());
      await page.getByRole("link", { name: "From trades to research", exact: false }).click();
      await page.waitForURL("**/research/trader-behavior");
      assert.ok(await page.getByRole("heading", { name: "Can a model learn my trading decisions?" }).isVisible());
      if (width === 390) {
        const menu = page.getByRole("button", { name: /menu/i });
        if (await menu.count()) {
          await menu.first().click();
          await page.getByRole("link", { name: "Papers", exact: true }).first().click();
          await page.waitForURL("**/papers");
        }
      }
      await context.close();
    }
  }
  // Existing detail destinations and original PDF artifacts must stay reachable.
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const pathname of ["/research", "/asra", "/resume", "/projects/btc-final-system", "/projects/volatility-regime-filtering", "/projects/bitcoin-bubble-gsadf"]) {
    const response = await page.goto(`http://localhost:3000${pathname}`, { waitUntil: "domcontentloaded" });
    assert.equal(response.status(), 200, pathname);
  }
  for (const pathname of ["/papers/volatility-regime-filtering-thesis.pdf", "/papers/bitcoin-bubble-gsadf-seminar-paper.pdf"]) {
    const response = await context.request.get(`http://localhost:3000${pathname}`);
    assert.equal(response.status(), 200, pathname);
    assert.ok((await response.body()).subarray(0, 5).toString().startsWith("%PDF-"));
  }
  await context.close();
  assert.deepEqual(errors, [], "Unhandled browser errors");
  await fs.writeFile(`${out}/results.json`, JSON.stringify({ status: "passed", results, errors, note: "Unavailable-source screenshots contain no invented account values. Separate trading-desk QA uses labelled synthetic fixtures." }, null, 2));
  console.log(`PORTFOLIO_BROWSER_OK: ${results.length} page/theme/viewport checks; navigation, PDF, and legacy-route checks passed.`);
} finally { await browser.close(); }
