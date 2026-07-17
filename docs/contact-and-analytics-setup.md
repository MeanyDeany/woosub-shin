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

The root layout loads Vercel Web Analytics from `/_vercel/insights/script.js`.

In the Vercel project dashboard:

1. Open **Analytics**.
2. Enable **Web Analytics**.
3. Redeploy the Production deployment.
4. Use the private Vercel dashboard to view visitors, page views, countries, referrers, devices, browsers, and operating systems.

No visitor count or analytics dashboard is exposed on the public website.

## Geolocation and privacy

Vercel supplies approximate country, region, and city headers to the contact endpoint on deployed requests. Local development normally has no geolocation headers.

The form notification includes only the approximate location. It does not include the raw IP address. Vercel Web Analytics uses anonymized visitor identification and is viewed only through the authenticated Vercel project dashboard.

## Current limitations

- The in-memory contact burst limit is best effort because serverless instances can restart or scale horizontally.
- For sustained spam, add a managed challenge such as Turnstile or a Vercel WAF rule.
- Delivery depends on Resend availability, a valid API key, and verified sender DNS.
