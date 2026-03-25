# Contact Page Redesign

Date: 2026-03-25
Status: Approved design, ready for implementation planning

## Goal

Redesign the contact page to closely follow the layout and feel of [dennissnellenberg.com/contact](https://dennissnellenberg.com/contact), while keeping the existing site's dark, technical, DevOps visual language.

The current contact page is a minimal hero + buttons. The redesigned page should feel premium, direct, and personal — with a portrait photo, a numbered contact form connected to Formspree, direct contact links, and a live local time display.

## Layout Structure

The page is divided into four sections stacked vertically:

1. Hero — split layout with statement left, portrait photo right
2. Form — numbered fields across the full width
3. Contact details — direct links to email and socials
4. Bottom bar — live local time and copyright

## Section 1: Hero

A full-width split layout with `display: grid; grid-template-columns: 65fr 35fr; gap: var(--space-7)` and `padding: var(--space-7) 0`.

- **Left:** Small eyebrow label `Contact` in monospace accent style, followed by the H1 statement in large display type:
  > *Reach out if you need steadier infrastructure or cleaner delivery.*
- **Right:** Portrait photo of Vasko Michal (`public/vasko.jpeg`, copied from `ja.jpeg`). Photo treatment: `filter: grayscale(30%)` for a subtle desaturation that fits the dark palette. Slight rounded corners (`border-radius: 4px`). No hard circle crop. `object-fit: cover`, full column width, auto height.

On mobile (below `48rem`): single-column, photo stacks above the statement at a max width of `12rem`. Form fields are already full-width so no layout change needed on mobile.

## Section 2: Contact Form

Four fields stacked vertically, each taking the full width. Each field is separated by a `1px solid var(--border)` line top and bottom. The layout mirrors the reference screenshot exactly.

Each field row:
- Small monospace number (`01`, `02`, `03`, `04`) top-left, color `var(--muted)`
- Large question text as the label (e.g., "What's your name?"), prominent size (~`1.5rem`–`2rem`)
- Input or select below the question, placeholder text in `var(--muted)`
- No box border on inputs — only the row separator lines

```
──────────────────────────────────────────────
01  What's your name?
    John Doe *
──────────────────────────────────────────────
02  What's your email?
    john@doe.com *
──────────────────────────────────────────────
03  What's the name of your company?
    Acme Corp
──────────────────────────────────────────────
04  What do you need help with?
    Infrastructure, CI/CD, Automation... ▼
──────────────────────────────────────────────
```

Field copy:
- 01: "What's your name?"
- 02: "What's your email?"
- 03: "What's the name of your company?"
- 04: "What do you need help with?" — `<select>` with options: Infrastructure, CI/CD, Automation, Monitoring, Other

Input styling:
- `font-size: 1rem`, `padding: var(--space-3) 0`, `border: none`, transparent background
- Placeholder: `var(--muted)`
- Focus state: no border change on input itself — the row separator can subtly highlight via accent color on the wrapping element if desired, otherwise no focus ring beyond browser default outline

Submit button: `Send message →` — full-width row below the last field separator, right-aligned via `display: flex; justify-content: flex-end`. Uses `<ButtonLink variant="solid">`.

Form backend: Formspree. The `<form>` action is `https://formspree.io/f/YOUR_FORM_ID`. The user must replace `YOUR_FORM_ID` with the real ID from their Formspree account after registering. Method is `POST`.

The Formspree ID is hardcoded directly in `contact.astro` as the `action` attribute value — no data file abstraction needed.

## Section 3: Contact Details

A horizontal row of direct contact links, separated from the form by a thin border. Links drawn from the existing `site.contact` and `site.socials` data — no duplication.

- Email: `vaskomichal7@gmail.com` (mailto link)
- LinkedIn
- Instagram
- Facebook

Below the links: short availability line — `Currently available for new projects` — plain text, no badge.

## Section 4: Bottom Bar

A thin full-width bar at the bottom of the page (not the shared site footer — this sits above it inside the contact page content area).

- Left: `Local time: HH:MM TZ` — live JavaScript clock, updates every minute, shows user's local timezone abbreviation
- Right: `© 2026 Vasko Michal`

The clock is driven by a small inline `<script>` in `contact.astro`. No extra script file needed. The timezone abbreviation uses the browser's `Intl.DateTimeFormat` with `timeZoneName: "short"` — output like "GMT+1" or "CET" is accepted as-is without normalization.

## Photo Asset

Source: `/home/vasko/osobne/Projekty/ja.jpeg`
Destination: `public/vasko.jpeg`

Copy as part of implementation. Reference in the page as `src="/vasko.jpeg"`.

## Visual Style Notes

- All spacing and color tokens from `global.css` — no new tokens needed
- Numbers (01–04) use the existing monospace/technical accent style
- Form field separators use `1px solid var(--border)`
- Photo treatment: `filter: grayscale(30%)` — see Section 1
- Section separator above contact details: `1px solid var(--border)`
- Bottom bar top separator: `1px solid var(--border)`, padding `var(--space-4) 0`

## Files Affected

- `public/vasko.jpeg` — new asset (copy from source)
- `src/pages/contact.astro` — full restructure
- `src/data/contact.ts` — update availability copy if needed (Formspree ID lives directly in `contact.astro`, not in this data file)
- `src/styles/global.css` — add contact page styles (form fields, hero split, bottom bar, photo)

## Non-Goals

- No GitHub link (not in current `site.socials`)
- No custom backend — Formspree only
- No animation on the form beyond existing reveal behavior
- No changes to other pages

## Compatibility Note

The route intros implementation plan (`2026-03-25-route-intros-implementation.md`) modifies both `contact.astro` (adds `routeIntroMode` and `routeIntroTitle` props to BaseLayout) and `src/styles/global.css` (adds overlay styles). This contact redesign also rewrites `contact.astro` wholesale and adds styles to `global.css`. Implement this redesign after the route intros feature is merged to avoid conflicts in both files, or resolve the conflicts manually by ensuring the `routeIntroMode="page-title" routeIntroTitle="Contact"` props are present on the BaseLayout call in the redesigned `contact.astro`.
