import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.CONTACT_QA_BASE_URL || "http://localhost:3000";
const output = "/tmp/portfolio-qa";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const checks = [];
const sample = "Contact recovery QA. 한글 & symbols + ? #\nSecond line stays intact.";

async function fill(page) {
  await page.locator('input[name="name"]').fill("Contact QA");
  await page.locator('input[name="email"]').fill("contact-qa@example.com");
  await page.locator('textarea[name="message"]').fill(sample);
}

try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  let posts = 0;
  page.on("pageerror", error => errors.push(error.message));
  // Never send QA messages. Abort any accidental real POST in all fallback checks.
  await page.route("**/api/contact", route => { posts += 1; return route.abort(); });
  const status = await context.request.get(`${base}/api/contact/status`);
  assert.equal(status.status(), 200);
  assert.equal(status.headers()["cache-control"], "no-store");
  assert.equal(typeof (await status.json()).configured, "boolean");
  await page.route("**/api/contact/status", route => route.fulfill({ json: { configured: false } }));
  await page.goto(`${base}/contact`);
  await page.locator('[data-contact-email-options]').waitFor();
  await page.getByRole("button", { name: "Open email app", exact: true }).click();
  assert.equal(await page.locator('input[name="name"]').evaluate(input => input.validity.valueMissing), true);
  assert.equal(posts, 0);
  checks.push("empty form validates without contacting the failed service");

  await fill(page);
  const gmail = new URL(await page.getByRole("link", { name: "Open Gmail", exact: true }).getAttribute("href"));
  assert.equal(gmail.searchParams.get("to"), "woosub815@gmail.com");
  assert.ok(gmail.searchParams.get("body").endsWith(sample));
  const mailto = new URL(await page.getByRole("link", { name: "Email app", exact: true }).getAttribute("href"));
  assert.equal(mailto.searchParams.get("body"), gmail.searchParams.get("body"));
  checks.push("email app and Gmail preserve every field and multilingual message");

  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new Error("Clipboard blocked for QA"); } },
    });
  });
  await page.getByRole("button", { name: "Copy message", exact: true }).click();
  await page.locator('textarea[readonly]').waitFor();
  assert.ok((await page.locator('textarea[readonly]').inputValue()).endsWith(sample));
  assert.equal(await page.getByText("Message sent.", { exact: false }).count(), 0);
  checks.push("blocked clipboard offers selectable full text, never false success");

  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
  await page.locator("form").screenshot({ path: `${output}/contact-mobile-fallback.png` });
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.locator("form").screenshot({ path: `${output}/contact-desktop-fallback.png` });
  assert.deepEqual(errors, []);
  assert.equal(posts, 0);
  await context.close();
  checks.push("mobile and desktop layout have no page errors or horizontal overflow");

  for (const mode of ["503", "non-json", "network", "success"]) {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    let captured;
    await p.route("**/api/contact/status", route => route.fulfill({ json: { configured: true } }));
    await p.route("**/api/contact", async route => {
      captured = route.request().postDataJSON();
      if (mode === "network") return route.abort("failed");
      if (mode === "non-json") return route.fulfill({ status: 502, contentType: "text/html", body: "Gateway unavailable" });
      if (mode === "503") return route.fulfill({ status: 503, json: { error: "Not configured" } });
      return route.fulfill({ json: { ok: true } });
    });
    await p.goto(`${base}/contact`);
    await p.getByRole("button", { name: "Send message", exact: true }).waitFor();
    await fill(p);
    await p.getByRole("button", { name: "Send message", exact: true }).click();
    if (mode === "success") {
      await p.getByText("Message sent. I will reply to the email address you provided.", { exact: true }).waitFor();
      assert.equal(await p.locator('textarea[name="message"]').inputValue(), "");
    } else {
      await p.getByText("Delivery could not be confirmed.", { exact: false }).waitFor();
      assert.equal(await p.locator('textarea[name="message"]').inputValue(), sample);
      const backup = new URL(await p.getByRole("link", { name: "Open Gmail", exact: true }).getAttribute("href"));
      assert.ok(backup.searchParams.get("body").endsWith(sample));
      assert.equal(await p.getByText("Message sent.", { exact: false }).count(), 0);
    }
    assert.equal(captured.message, sample);
    assert.ok(captured.formStartedAt > 0);
    if (mode === "503") await p.getByRole("button", { name: "Open email app", exact: true }).waitFor();
    await ctx.close();
    checks.push(`mocked provider ${mode}: correct status and draft retention`);
  }

  console.log(JSON.stringify({ status: "PASS", checks, realEmailsSent: 0 }, null, 2));
} finally {
  await browser.close();
}
