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

A full-width split layout:

- **Left (~65%):** Small eyebrow label `Contact` in monospace accent style, followed by the H1 statement in large display type:
  > *Reach out if you need steadier infrastructure or cleaner delivery.*
- **Right (~35%):** Portrait photo of Vasko Michal (`public/vasko.jpeg`, copied from `ja.jpeg`). The image should have a subtle dark overlay or desaturation to fit the dark palette. Slight rounded corners or natural rectangular crop — no hard circle.

On mobile: photo stacks above the statement, reduced size.

## Section 2: Contact Form

A numbered form grid inspired by the reference. Four fields arranged 2×2 on desktop, stacked on mobile.

```
01  Your name          02  Email address
03  Company            04  What do you need help with?
```

Field styling:
- Large monospace number label (muted accent color)
- Plain text label above the input
- Input with bottom border only — no box, no background
- Focus state: accent color bottom border
- Field 04 is a `<select>` dropdown with options: Infrastructure, CI/CD, Automation, Monitoring, Other

Submit button: `Send message →` — right-aligned, primary button style from the existing `ButtonLink` component.

Form backend: Formspree. The `<form>` action is `https://formspree.io/f/YOUR_FORM_ID`. The user must replace `YOUR_FORM_ID` with the real ID from their Formspree account after registering. Method is `POST`.

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

The clock is driven by a small inline `<script>` in `contact.astro`. No extra script file needed.

## Photo Asset

Source: `/home/vasko/osobne/Projekty/ja.jpeg`
Destination: `public/vasko.jpeg`

Copy as part of implementation. Reference in the page as `src="/vasko.jpeg"`.

## Visual Style Notes

- All spacing and color tokens from `global.css` — no new tokens needed
- Numbers (01–04) use the existing monospace/technical accent style
- Form inputs extend the existing `--color-border` and `--color-accent` tokens
- Photo overlay: CSS `filter` or a pseudo-element with low-opacity dark background — keep it subtle
- The section separator above contact details: `1px solid var(--color-border)`

## Files Affected

- `public/vasko.jpeg` — new asset (copy from source)
- `src/pages/contact.astro` — full restructure
- `src/data/contact.ts` — update copy, add Formspree placeholder
- `src/styles/global.css` — add contact page styles (form fields, hero split, bottom bar, photo)

## Non-Goals

- No GitHub link (not in current `site.socials`)
- No custom backend — Formspree only
- No animation on the form beyond existing reveal behavior
- No changes to other pages

## Compatibility Note

The route intros implementation plan (`2026-03-25-route-intros-implementation.md`) also modifies `contact.astro` (adds `routeIntroMode` and `routeIntroTitle` props to BaseLayout). Implement this contact redesign after the route intros feature is merged, or be prepared to resolve that one-line conflict manually.
