import assert from "node:assert/strict";
import { chromium } from "playwright";
import fs from "node:fs/promises";

const baseUrl = "http://localhost:3000";
const testPassword = "test-admin-password-for-browser-qa";

const browser = await chromium.launch({ headless: true });
try {
  const anonymous = await browser.newContext();
  const blocked = await anonymous.request.get(`${baseUrl}/admin/traffic`);
  assert.equal(blocked.status(), 401);
  assert.match(blocked.headers()["www-authenticate"] ?? "", /^Basic /);
  await anonymous.close();

  const context = await browser.newContext({
    httpCredentials: {
      username: "meanydeany",
      password: testPassword,
    },
    viewport: { width: 1440, height: 1000 },
  });

  const apiAuthProbe = await context.request.get(
    `${baseUrl}/admin/api/traffic?period=30d`,
  );
  assert.notEqual(apiAuthProbe.status(), 401);

  const page = await context.newPage();
  await page.route("**/admin/api/traffic?period=*", async route => {
    const url = new URL(route.request().url());
    const period = url.searchParams.get("period") ?? "30d";
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        generatedAt: "2026-10-02T08:00:00Z",
        period,
        range: {
          days: period === "7d" ? 7 : period === "today" ? 1 : period === "90d" ? 90 : 30,
          since: "2026-09-03",
          until: "2026-10-02",
          previousSince: "2026-08-04",
          previousUntil: "2026-09-02",
        },
        current: { pageviews: 727, visitors: 188 },
        previous: { pageviews: 610, visitors: 170 },
        allTime: { pageviews: 727, visitors: 188 },
        series: [
          { key: "2026-09-28", pageviews: 21, visitors: 14 },
          { key: "2026-09-29", pageviews: 33, visitors: 20 },
          { key: "2026-09-30", pageviews: 29, visitors: 17 },
          { key: "2026-10-01", pageviews: 41, visitors: 25 },
          { key: "2026-10-02", pageviews: 18, visitors: 11 },
        ],
        pages: [
          { key: "/", pageviews: 180, visitors: 110 },
          { key: "/trading", pageviews: 145, visitors: 82 },
          { key: "/resume", pageviews: 90, visitors: 61 },
        ],
        referrers: [
          { key: "google.com", pageviews: 80, visitors: 55 },
          { key: "(unknown)", pageviews: 60, visitors: 42 },
        ],
        countries: [
          { key: "KR", pageviews: 240, visitors: 120 },
          { key: "US", pageviews: 80, visitors: 45 },
        ],
        devices: [
          { key: "desktop", pageviews: 410, visitors: 130 },
          { key: "mobile", pageviews: 317, visitors: 58 },
        ],
        browsers: [
          { key: "Chrome", pageviews: 500, visitors: 140 },
          { key: "Safari", pageviews: 160, visitors: 38 },
        ],
        warnings: [],
      }),
    });
  });

  await page.goto(`${baseUrl}/admin/traffic`);
  await page.getByRole("heading", { name: "Traffic", exact: true }).waitFor();
  await page.getByText("727", { exact: true }).first().waitFor();
  await page.getByText("188", { exact: true }).first().waitFor();
  await page.getByRole("heading", { name: "Top pages" }).waitFor();
  await page.getByText("/trading", { exact: true }).waitFor();
  await page.getByText("South Korea", { exact: true }).waitFor();
  await page.getByText("Direct / none", { exact: true }).waitFor();

  await page.getByRole("button", { name: "7D", exact: true }).click();
  await page.waitForTimeout(50);
  assert.equal(await page.getByRole("button", { name: "7D", exact: true }).getAttribute("aria-pressed"), "true");

  await fs.mkdir("/tmp/admin-traffic-qa", { recursive: true });
  await page.screenshot({ path: "/tmp/admin-traffic-qa/desktop.png", fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    "Admin traffic page must not overflow horizontally",
  );
  await page.screenshot({ path: "/tmp/admin-traffic-qa/mobile.png", fullPage: true });

  await context.close();
  console.log("ADMIN_TRAFFIC_QA_PASS");
} finally {
  await browser.close();
}
