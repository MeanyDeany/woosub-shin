import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { buildContactDraft, CONTACT_EMAIL } from "../lib/contact-draft.ts";
import { GET } from "../app/api/contact/status/route.ts";

const originalKey = process.env.RESEND_API_KEY;
const originalSalt = process.env.CONTACT_RATE_SALT;
afterEach(() => {
  for (const [key, value] of [["RESEND_API_KEY", originalKey], ["CONTACT_RATE_SALT", originalSalt]]) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

const fields = {
  name: "Contact QA 섭뿌",
  email: "qa+contact@example.com",
  phone: "+82 10 0000 0000",
  message: "Research & trading?\n한글 문의 / café 🚀 #topic = value + more",
};

test("drafts always target the established contact address", () => {
  const draft = buildContactDraft(fields);
  assert.equal(new URL(draft.mailtoUrl).pathname, CONTACT_EMAIL);
  assert.equal(new URL(draft.gmailUrl).searchParams.get("to"), CONTACT_EMAIL);
});
test("mailto safely round-trips multilingual text and reserved characters", () => {
  const draft = buildContactDraft(fields);
  const params = new URL(draft.mailtoUrl).searchParams;
  assert.equal(params.get("subject"), draft.subject);
  assert.equal(params.get("body"), draft.body);
  assert.ok(draft.body.endsWith(fields.message));
});
test("Gmail composes the same complete message as the email app", () => {
  const draft = buildContactDraft(fields);
  const url = new URL(draft.gmailUrl);
  assert.equal(url.origin, "https://mail.google.com");
  assert.equal(url.searchParams.get("view"), "cm");
  assert.equal(url.searchParams.get("su"), draft.subject);
  assert.equal(url.searchParams.get("body"), draft.body);
});
test("header fields cannot introduce extra mail headers", () => {
  const draft = buildContactDraft({ ...fields, name: "Test\r\nBcc: attacker@example.com" });
  assert.doesNotMatch(draft.subject, /[\r\n]/);
  assert.deepEqual([...new URL(draft.mailtoUrl).searchParams.keys()], ["subject", "body"]);
});
test("maximum-length multilingual messages are never silently truncated", () => {
  const message = "한".repeat(4000);
  const draft = buildContactDraft({ ...fields, message });
  assert.ok(draft.body.endsWith(message));
  assert.ok(new URL(draft.gmailUrl).searchParams.get("body").endsWith(message));
  assert.ok(draft.clipboardText.endsWith(message));
});
test("empty fields still provide a usable direct email draft", () => {
  const draft = buildContactDraft();
  assert.equal(draft.subject, "[meanydeany.com] Contact");
  assert.ok(draft.body.includes("Phone: Not provided"));
});
test("clipboard fallback includes recipient, subject and complete message", () => {
  const draft = buildContactDraft(fields);
  assert.ok(draft.clipboardText.startsWith(`To: ${CONTACT_EMAIL}\nSubject: `));
  assert.ok(draft.clipboardText.includes(fields.email));
  assert.ok(draft.clipboardText.endsWith(fields.message));
});
for (const [name, key, salt] of [
  ["both missing", undefined, undefined],
  ["missing mail key", undefined, "s".repeat(32)],
  ["missing privacy salt", "test-key-not-a-secret", undefined],
  ["short privacy salt", "test-key-not-a-secret", "s".repeat(31)],
  ["blank mail key", "   ", "s".repeat(32)],
  ["whitespace-only salt", "test-key-not-a-secret", " ".repeat(40)],
]) {
  test(`configuration reports unavailable when ${name}`, async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_RATE_SALT;
    if (key !== undefined) process.env.RESEND_API_KEY = key;
    if (salt !== undefined) process.env.CONTACT_RATE_SALT = salt;
    assert.deepEqual(await GET().json(), { configured: false });
  });
}
test("configuration checks are dynamic, uncached and never expose credentials", async () => {
  process.env.RESEND_API_KEY = "test-key-not-a-secret";
  process.env.CONTACT_RATE_SALT = "s".repeat(32);
  const response = GET();
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { configured: true });
  delete process.env.RESEND_API_KEY;
  assert.deepEqual(await GET().json(), { configured: false });
});
