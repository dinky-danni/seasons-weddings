# Seasons Weddings

Static HTML, CSS and JavaScript build for the new Seasons Weddings website.

## Project

This site is the wedding-specific branch of the Seasons restructure. It covers two customer routes:

- Wedding catering for couples who already have a venue.
- Full wedding packages at Season Quayside, including venue, catering, drinks and support.

## Structure

Cloudflare Pages serves the site from `public/`. Each public page uses a folder-based URL with an `index.html` file.

Current pages:

- `/`
- `/catering-only/`
- `/full-wedding-package/`
- `/venue/`
- `/packages/`
- `/menus/`
- `/tastings/`
- `/venues/`
- `/planning-support/`
- `/gallery/`
- `/contact/`
- `/privacy-policy/`
- `/cookie-policy/`
- `/terms-and-conditions/`

Shared assets:

- `public/assets/css/wireframe.css`
- `public/assets/js/components.js`
- `public/assets/js/site.js`
- `public/assets/img/`
- `public/assets/img/optimized/`
- `public/assets/docs/`
- `public/responsive-preview/`

Cloudflare/go-live files:

- `functions/api/enquiry.js`
- `functions/api/form-config.js`
- `public/_headers`
- `public/_redirects`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/404.html`
- `public/thank-you/`
- `wrangler.jsonc`
- `.dev.vars.example`

## Shared Components

The following elements are rendered globally from `assets/js/components.js`:

- Header and navigation.
- Save-date CTA form.
- Full booking/contact form.
- Footer.
- Shared image strips.
- Shared ticker variants for venue, menus and packages.

When editing global elements, update `components.js` rather than changing each page manually.

## Current Design Direction

The current styling is based on the existing Seasons wedding landing page and the Season Quayside wedding brochure references.

Key details:

- Luxury editorial wedding feel.
- Playfair Display headings and Raleway body copy.
- Soft off-white page backgrounds.
- Gold emphasis and understated micro-links.
- Solid dark-grey CTA/form sections.
- Dark translucent form fields with light text.
- Solid white header with a gold strip, centred overhanging logo and split desktop navigation.
- Mobile header keeps the gold strip, left overhanging logo and a styled Menu / Close toggle.
- Hero images use a clean inset white border, no decorative SVG overlay, and a flat 22% black overlay.
- Primary buttons inside hero sections are dark grey; gold buttons remain available elsewhere.
- Homepage and selected service pages use ticker strips with double wedding-ring markers.
- Compact image strips use optimised WebP assets.
- Numbered "included" grids are now the preferred layout for service detail sections.
- Linked gold wedding-ring bullets.
- Decorative SVG pattern is used sparingly on dark CTA/form and proof sections, not over hero images.

## Page Pattern Notes

- The homepage is intentionally bespoke and should not be bulk-updated with internal page layout changes unless requested.
- Catering, Venue, Full Wedding Package, Menus, Tastings, Planning Support, Gallery, Venues and Packages use the numbered `included-section` pattern where it improves scanability.
- Tickers should be used sparingly. Current non-home ticker use is limited to Catering, Venue, Full Wedding Package and Menus.
- The Catering page is currently the strongest reference page for the internal design language.
- Keep policy pages and contact page simpler and more functional.

## Image Handling

- Source photography can remain outside the website folder, but production images in the site should be resized and saved as WebP in `assets/img/optimized/`.
- Do not use original large JPG files directly in HTML or CSS.
- Hero images should be relevant to the page subject and use the global hero treatment.
- Food-only strips should use `data-food-strip`; mixed venue / wedding strips should use `data-photo-strip`.

## Responsive Preview

The project includes a local responsive preview at:

```text
/responsive-preview/
```

Use it for desktop, laptop, tablet and mobile checks before considering a page ready.

## Local Preview

The current preview is running at:

```text
http://127.0.0.1:8031/
```

For the plain static preview, serve the `public/` folder.

```bash
cd public
python3 -m http.server 8031
```

For Cloudflare Pages Functions and form testing, use Wrangler:

```bash
npm install
npm run dev
```

## Cloudflare Pages

Recommended settings:

- Framework preset: None.
- Build command: `npm run build`.
- Build output directory: `public`.
- Production branch: `main`.
- Preview branch: `staging`.

Required safe public/non-secret values:

- `TURNSTILE_SITE_KEY`
- `BREVO_FROM_EMAIL`
- `ENQUIRY_NOTIFICATION_TO`
- `ENQUIRY_SITE_NAME`
- `ENQUIRY_REPLY_TO_MODE`

Required secrets:

- `BREVO_API_KEY`
- `TURNSTILE_SECRET_KEY`

Do not commit real secrets. Use `.dev.vars.example` for local placeholders only.

## Forms And Cookies

- Forms submit to `/api/enquiry`.
- `/api/form-config` exposes only safe public form settings.
- Brevo email delivery happens server-side only.
- Cloudflare Turnstile is validated server-side.
- Honeypot spam protection is included.
- Successful submissions redirect to `/thank-you/`.
- Optional embeds such as Google Maps are gated behind the cookie settings panel.

## Checks

Run:

```bash
npm run check
```

Additional go-live checks and deployment notes are in `GO-LIVE-HANDOVER.md`.

## Git

The intended repository root is this folder:

```text
Seasons weddings/
```

Target remote:

```text
https://github.com/dinky-danni/seasons-weddings.git
```

Do not commit the old WordPress exports from the parent workspace.
