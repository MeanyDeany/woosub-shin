import { createHash, randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16_384;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

type ContactPayload = {
  company?: unknown;
  email?: unknown;
  formStartedAt?: unknown;
  message?: unknown;
  name?: unknown;
  phone?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character] ?? character;
  });
}

function safeGeoHeader(value: string | null, fallback = "Unknown") {
  if (!value) return fallback;

  try {
    return cleanText(decodeURIComponent(value), 100) || fallback;
  } catch {
    return cleanText(value, 100) || fallback;
  }
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const hostname = new URL(origin).hostname;
    const allowedHosts = new Set(
      [
        "meanydeany.com",
        "www.meanydeany.com",
        "localhost",
        "127.0.0.1",
        process.env.VERCEL_URL,
        process.env.VERCEL_BRANCH_URL,
        process.env.VERCEL_PROJECT_PRODUCTION_URL,
      ].filter((value): value is string => Boolean(value)),
    );
    return allowedHosts.has(hostname);
  } catch {
    return false;
  }
}

function requestRateKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("x-real-ip") || "unknown";
  const salt = process.env.CONTACT_RATE_SALT || "meanydeany-contact-rate";
  return createHash("sha256").update(`${salt}:${address}`).digest("hex");
}

function isRateLimited(request: NextRequest) {
  const now = Date.now();
  const key = requestRateKey(request);
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (bucket.count >= RATE_LIMIT) return true;
  bucket.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Message is too large." }, { status: 413 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected a JSON request." }, { status: 415 });
  }

  if (isRateLimited(request)) {
    return Response.json(
      { error: "Too many messages. Please wait before trying again." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  const company = cleanText(payload.company, 120);
  if (company) {
    return Response.json({ ok: true });
  }

  const startedAt =
    typeof payload.formStartedAt === "number" ? payload.formStartedAt : Number.NaN;
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 1_500 || elapsed > 86_400_000) {
    return Response.json({ error: "Please reload the form and try again." }, { status: 400 });
  }

  const name = cleanText(payload.name, 80);
  const email = cleanText(payload.email, 254).toLowerCase();
  const phone = cleanText(payload.phone, 40);
  const message = cleanText(payload.message, 4_000);

  if (name.length < 2) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 10) {
    return Response.json({ error: "Please enter a longer message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_FROM_EMAIL || "MeanyDeany Contact <contact@meanydeany.com>";
  const to = process.env.CONTACT_TO_EMAIL || "woosub815@gmail.com";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return Response.json(
      { error: "The contact service is not configured yet." },
      { status: 503 },
    );
  }

  const country = safeGeoHeader(request.headers.get("x-vercel-ip-country"));
  const region = safeGeoHeader(request.headers.get("x-vercel-ip-country-region"));
  const city = safeGeoHeader(request.headers.get("x-vercel-ip-city"));
  const receivedAt = new Date().toISOString();
  const safeName = name.replace(/[\r\n]+/g, " ");
  const subject = `[meanydeany.com] Message from ${safeName}`;

  const text = [
    "New contact-form message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Country: ${country}`,
    `Region: ${region}`,
    `City: ${city}`,
    `Received: ${receivedAt}`,
    "",
    "Message:",
    message,
    "",
    "The visitor location is inferred from Vercel geolocation headers. The raw IP address is not included or persisted by this endpoint.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17243d;max-width:680px;margin:auto">
      <h1 style="font-size:22px">New contact-form message</h1>
      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        <tbody>
          <tr><td style="padding:8px;border-bottom:1px solid #dbe5f2;font-weight:700">Name</td><td style="padding:8px;border-bottom:1px solid #dbe5f2">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #dbe5f2;font-weight:700">Email</td><td style="padding:8px;border-bottom:1px solid #dbe5f2">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #dbe5f2;font-weight:700">Phone</td><td style="padding:8px;border-bottom:1px solid #dbe5f2">${escapeHtml(phone || "Not provided")}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #dbe5f2;font-weight:700">Location</td><td style="padding:8px;border-bottom:1px solid #dbe5f2">${escapeHtml([city, region, country].join(" · "))}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #dbe5f2;font-weight:700">Received</td><td style="padding:8px;border-bottom:1px solid #dbe5f2">${escapeHtml(receivedAt)}</td></tr>
        </tbody>
      </table>
      <div style="padding:18px;border-radius:14px;background:#f3f7fd;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin-top:18px;font-size:12px;color:#68748a">Location is inferred from Vercel geolocation headers. The raw IP address is not included or persisted by this endpoint.</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text,
      html,
      tags: [
        { name: "source", value: "website_contact" },
        { name: "country", value: country.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "unknown" },
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend contact delivery failed:", response.status, errorText.slice(0, 500));
    return Response.json(
      { error: "Message delivery failed. Please email directly instead." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
