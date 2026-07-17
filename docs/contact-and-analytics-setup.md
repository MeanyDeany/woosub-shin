# Contact form and private analytics setup

## Contact email delivery

The public contact form posts to `app/api/contact/route.ts`.

The route validates input, rejects oversized requests, uses a honeypot and timing check, applies a best-effort anonymous burst limit, reads Vercel geolocation headers, and sends the message through the Resend HTTP API.

The endpoint does not write messages to a website database and does not include or persist the raw visitor IP address.

Configure these Vercel environment variables for Production and Preview:

- `RESEND_API_KEY`: Resend API key with email-sending permission.
- `CONTACT_FROM_EMAIL`: verified sender, recommended value `MeanyDeany Contact <contact@meanydeany.com>`.
- `CONTACT_TO_EMAIL`: destination inbox, currently `woosub815@gmail.com`.
- `CONTACT_RATE_SALT`: long random string used only to create short-lived in-memory rate-limit keys.

Before sending from `contact@meanydeany.com`, add `meanydeany.com` or a dedicated sending subdomain to Resend and complete its SPF and DKIM DNS verification.

After adding or changing environment variables, redeploy the site.

## Private visitor analytics

The root layout renders `Analytics` from `@vercel/analytics/next` exactly once. The
official Next.js integration records the initial page load and client-side route changes
without a second manual analytics script.

To enable analytics for the `woosub-shin` Vercel project:

1. Sign in to Vercel and select the **woosub-shin** project.
2. Open **Analytics**, choose **Web Analytics**, and select **Enable**.
3. Redeploy the Production deployment. Enabling Web Analytics provisions the project
   intake routes on the next deployment.
4. Visit a production page and follow at least one internal link so both an initial load
   and a client-side route change are observed.
5. In browser developer tools, confirm that the Network panel receives successful
   requests to Vercel's generated `/<unique-path>/view` intake endpoint. The exact path
   is deployment-generated and must not be hardcoded.
6. Return to **Analytics**, select the Production environment, and confirm events arrive.
   Use the **Visitors** and **Page Views** views and their panels to inspect countries,
   referrers, device types, browsers, and operating systems.

The authenticated, project-access-controlled Vercel dashboard is the source of truth.
The website exposes no visitor count, analytics viewer, admin route, analytics API,
credential, or project secret. An exact owner-only on-site counter would require real
authentication and a server-side analytics API, so no client-only substitute is provided.

For strictly owner-only visibility, keep the owner as the only Vercel account with access
to this project and review team and project membership periodically. Analytics access is
not automatically limited to one person when other Vercel team members can access the
project.

## Geolocation and privacy

Vercel supplies approximate country, region, and city headers to the contact endpoint on deployed requests. Local development normally has no geolocation headers.

The private form notification includes only the approximate location. The contact endpoint
uses the request address transiently to derive a salted SHA-256 key for its best-effort
in-memory burst limit; it does not log, email, return, or persist the raw IP address.

Vercel Web Analytics stores anonymous aggregate data without cookies. Analytics events are
not tied to or associated with a persisted raw IP address, and Vercel's daily visitor hash
cannot track a visitor between different days or websites. Do not send personal information
through custom analytics events.

## Current limitations

- The in-memory contact burst limit is best effort because serverless instances can restart or scale horizontally.
- For sustained spam, add a managed challenge such as Turnstile or a Vercel WAF rule.
- Delivery depends on Resend availability, a valid API key, and verified sender DNS.
- Analytics visibility depends on Vercel project membership; review access if the dashboard must remain strictly owner-only.
