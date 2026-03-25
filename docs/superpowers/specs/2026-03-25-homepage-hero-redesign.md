# Homepage Hero Redesign

**Status:** Approved, ready for implementation planning

## Goal

Replace the existing text-based homepage hero with a full-bleed photo hero inspired by dennissnellenberg.com. The hero should show a full-viewport photo of Vasko Michal with his name and role overlaid, and a parallax scroll effect applied to the photo via a small JavaScript module.

## Scope

Only the hero section (`src/components/home/Hero.astro`) is redesigned. All sections below the hero (Intro, Capabilities, Credibility, ProjectPreview, ContactBand) remain unchanged.

## Design

### Layout

The hero occupies 100svh (full viewport height). A cropped running photo (`/beh.jpg`) fills the entire area with `object-fit: cover`. A dark gradient overlays the bottom portion to ensure text readability.

Elements positioned over the photo:

| Element | Position | Style |
|---|---|---|
| Role text | Bottom-center, above name | Small monospace, `--accent` color, 0.2em letter-spacing, uppercase |
| Name | Bottom-center | Large display, uppercase, `font-weight: 800`, `clamp(3rem, 7vw, 6rem)` |
| Location badge | Bottom-left | Dot + "Bratislava, SK", small, muted |
| Scroll hint | Bottom-right | "Scroll ↓" or arrow, small, muted |

### Content

- **Name:** VASKO MICHAL
- **Role:** DevOps Engineer
- **Location:** Bratislava, SK

### Gradient overlay

A CSS `::after` pseudo-element applies a gradient from transparent at the top to `rgba(7,17,31, 0.85)` at the bottom, ensuring the name and role text are always readable regardless of photo content.

## Photo

### Source

`/home/vasko/osobne/Projekty/beh.jpg` — 6000×4000px, JPEG.

### Watermark crop

The photo has two watermarks at the bottom:
- Bottom-left: "Zoner Studio" text logo
- Bottom-right: "saucony vokolo priglú" logo

These must be cropped before the photo is added to the project. Crop strategy: remove the bottom ~220px from the original 6000×4000 image, resulting in approximately 6000×3780px. The exact pixel value should be verified visually to ensure no useful content is lost.

### Output path

Save the cropped photo to `public/beh.jpg`.

### Format and size

After cropping, convert and compress to a web-optimised JPEG (quality 85) at 2400px wide (height proportional). The original 6000px wide is unnecessarily large for web use. Final file should be under 600KB.

## Animation

### Parallax effect

A new public script `public/hero.js` handles the parallax:

- Listens to `scroll` events on `window`
- Reads `window.scrollY`
- Applies `transform: translateY(${scrollY * 0.35}px)` to the photo element
- Uses `requestAnimationFrame` to throttle updates for smooth performance
- Only runs when the hero section exists in the DOM (guarded by element presence check)

The photo moves at 35% of scroll speed, so it trails the scroll and creates a depth effect. The name and other overlay text scroll at normal speed with the page.

### Integration

The script is included via a `<script>` tag directly in `Hero.astro` (not BaseLayout), so it only loads on the homepage.

## Files

| File | Action |
|---|---|
| `src/components/home/Hero.astro` | Full rewrite |
| `src/styles/global.css` | Replace `.home-hero*` rules with new hero styles |
| `public/hero.js` | Create new parallax script |
| `public/beh.jpg` | Add cropped + resized photo |

## CSS tokens used

All styles use existing design tokens:
- `--background`, `--text`, `--accent`, `--muted`, `--border`
- `--space-*` for spacing
- Font families already loaded (display for name, monospace for role label)

## Accessibility

- Photo uses `role="img"` and `aria-label="Vasko Michal running"` (or wrapped in a `<figure>`)
- Overlay text elements are real DOM text (not image text), readable by screen readers
- Parallax script respects `prefers-reduced-motion`: when set, skip the `translateY` transform entirely

## What is not changing

- The rest of `src/pages/index.astro` and all sections below the hero
- `src/data/home.ts` (hero data no longer used by the new component but can stay for potential future use)
- BaseLayout, Header, Footer, navigation
- All other pages

## Testing

Manual verification:
1. Hero fills full viewport height on desktop and mobile
2. Photo covers the area without distortion
3. Name, role, and location are legible over the photo
4. Scrolling the page applies the parallax effect smoothly
5. With `prefers-reduced-motion` enabled in OS settings, photo scrolls at normal speed (no parallax)
6. On mobile (≤768px), text sizes remain readable

Playwright smoke test: update the existing home hero assertion to check for `img[src="/beh.jpg"]` and the name text "VASKO MICHAL" in the DOM.
