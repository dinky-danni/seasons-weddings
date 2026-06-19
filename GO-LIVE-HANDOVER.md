# Seasons Weddings Go-Live Handover

Client: Seasons Weddings / Season Quayside
Repository: https://github.com/dinky-danni/seasons-weddings
Cloudflare Pages project: seasons-weddings
Staging URL: To be created in Cloudflare Pages
Production URL: To confirm
Live reference URL: https://enquiries.seasonquayside.co.uk/weddings/
Branch currently ready for review: main

## Forms Included

- Shared date-check forms submit to `/api/enquiry`.
- Full wedding enquiry forms submit to `/api/enquiry`.
- Successful submissions redirect to `/thank-you/`.
- Server-side validation, honeypot spam protection, Cloudflare Turnstile validation and Brevo transactional email are implemented in `functions/api/enquiry.js`.
- Safe public form config is implemented in `functions/api/form-config.js`.

## Notification And Sender

Notification recipient: `hub@encapsulate.group` by default.
Brevo sender email: `no-reply@seasonquayside.co.uk` by default.

The sender address must be verified in Brevo before live form testing.

## Required Cloudflare Variables

- `TURNSTILE_SITE_KEY`
- `BREVO_FROM_EMAIL`
- `ENQUIRY_NOTIFICATION_TO`
- `ENQUIRY_SITE_NAME`
- `ENQUIRY_REPLY_TO_MODE`

## Required Cloudflare Secrets

- `BREVO_API_KEY`
- `TURNSTILE_SECRET_KEY`

Do not commit real values for these secrets. Use Cloudflare Pages settings after the staging project exists.

## Included Cloudflare Files

- `public/_headers`
- `public/_redirects`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/404.html`
- `public/thank-you/`
- `functions/api/enquiry.js`
- `functions/api/form-config.js`
- `wrangler.jsonc`
- `.dev.vars.example`

## Known Issues / Deployment Notes

- Final production domain still needs confirmation. `public/sitemap.xml` and `public/robots.txt` currently use the known existing host `https://enquiries.seasonquayside.co.uk`.
- `public/_headers` includes a preview noindex rule for `https://seasons-weddings.pages.dev/*`; update this if the Cloudflare Pages project slug differs.
- Google Maps is gated behind optional cookie consent on the contact page.
- Cookie consent stores the optional cookie choice in `localStorage`.
- No strict Content Security Policy has been added. Consider CSP only after Turnstile, Google Maps and form endpoints are tested on Cloudflare preview.
- Forms cannot be tested end to end until Brevo and Turnstile secrets are configured in Cloudflare.
- Local Wrangler function compilation could not be completed in this sandbox because dependency fetching/build approval was blocked. Rerun `wrangler pages functions build functions --outdir /tmp/seasons-functions-check --compatibility-date 2026-05-25` on the deployment machine after dependencies are installed.

## Recommended Next Action

1. Create or connect the Cloudflare Pages project from GitHub.
2. Confirm production and staging domains.
3. Update sitemap, robots and preview-host header if the domains differ.
4. Add Cloudflare variables and secrets.
5. Deploy staging and test forms, cookies, redirects, 404 and noindex headers.
