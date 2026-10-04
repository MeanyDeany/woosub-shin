export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Configuration presence only, not a claim that an email has been delivered. */
export function GET() {
  const configured = Boolean(
    process.env.RESEND_API_KEY?.trim() &&
    (process.env.CONTACT_RATE_SALT?.trim().length ?? 0) >= 32,
  );

  return Response.json(
    { configured },
    { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } },
  );
}
