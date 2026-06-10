# Seasons Weddings

Static HTML, CSS and JavaScript build for the new Seasons Weddings website.

## Project

This site is the wedding-specific branch of the Seasons restructure. It covers two customer routes:

- Wedding catering for couples who already have a venue.
- Full wedding packages at Season Quayside, including venue, catering, drinks and support.

## Structure

Each public page uses a folder-based URL with an `index.html` file.

Current pages:

- `/`
- `/catering-only/`
- `/full-wedding-package/`
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

- `assets/css/wireframe.css`
- `assets/js/components.js`
- `assets/js/site.js`
- `assets/img/`
- `assets/pdf/`

## Shared Components

The following elements are rendered globally from `assets/js/components.js`:

- Header and navigation.
- Save-date CTA form.
- Full booking/contact form.
- Footer.

When editing global elements, update `components.js` rather than changing each page manually.

## Current Design Direction

The current styling is based on the existing Seasons wedding landing page.

Key details:

- Luxury editorial wedding feel.
- Playfair Display headings and Raleway body copy.
- Soft off-white page backgrounds.
- Gold emphasis and understated micro-links.
- Solid dark-grey CTA/form sections.
- Dark translucent form fields with light text.
- Fixed glass-effect header.
- Homepage ticker beneath the hero.
- Six-image strip beneath the route options.
- Numbered "Everything included" grid.
- Linked gold wedding-ring bullets.

## Local Preview

The current preview is running at:

```text
http://localhost:8031/
```

If restarting manually from this folder, a simple static server is enough.

```bash
python3 -m http.server 8031
```

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
