# Homepage Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the text-based homepage hero with a full-bleed photo of Vasko Michal, his name and role overlaid in large typography, and a smooth parallax scroll effect — matching the visual style of dennissnellenberg.com.

**Architecture:** `Hero.astro` is fully rewritten to a photo-first layout. The old `.home-hero*` CSS block in `global.css` is replaced in place. A new `public/hero.js` handles the parallax via a `requestAnimationFrame` scroll listener. The source photo is cropped with ImageMagick to remove watermarks, resized for web, and placed in `public/beh.jpg`. All sections below the hero (Intro, Capabilities, Credibility, ProjectPreview, ContactBand) stay unchanged.

**Tech Stack:** Astro 6, vanilla CSS (existing design tokens), vanilla JS (requestAnimationFrame), ImageMagick CLI, Playwright (e2e smoke tests).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `public/beh.jpg` | Create | Cropped and resized hero photo |
| `public/hero.js` | Create | Scroll parallax for the hero photo |
| `src/components/home/Hero.astro` | Full rewrite | Full-bleed photo hero layout + loads hero.js |
| `src/styles/global.css` | Modify (lines 387–498 + responsive) | New `.home-hero*` CSS rules |
| `tests/e2e/smoke.spec.ts` | Modify | Add photo and name assertions for homepage |

---

### Task 1: Prepare the hero photo

**Files:**
- Create: `public/beh.jpg`

The source photo at `/home/vasko/osobne/Projekty/beh.jpg` is 6000×4000 JPEG. It has two watermarks at the bottom — "Zoner Studio" bottom-left and "saucony vokolo priglú" bottom-right. Crop the bottom 220px to remove them, then resize to 2400px wide for web use.

- [ ] **Step 1: Crop and resize with ImageMagick**

```bash
convert /home/vasko/osobne/Projekty/beh.jpg \
  -crop 6000x3780+0+0 +repage \
  -resize 2400x \
  -quality 85 \
  "/home/vasko/osobne/Projekty/My Portfolio/public/beh.jpg"
```

Explanation of flags:
- `-crop 6000x3780+0+0` — keep full width, remove bottom 220px (4000 − 220 = 3780), starting from top-left corner
- `+repage` — reset canvas so the crop doesn't leave stale metadata
- `-resize 2400x` — scale down to 2400px wide (height proportional ≈ 1512px)
- `-quality 85` — good web quality, keeps file under 600KB

- [ ] **Step 2: Verify the output**

```bash
identify "/home/vasko/osobne/Projekty/My Portfolio/public/beh.jpg"
```

Expected output contains: `JPEG 2400x1512` (approximately). File size should be under 600KB.

Also open the file visually and confirm:
- Zoner Studio and Saucony watermarks are gone
- The runner is clearly visible

- [ ] **Step 3: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add public/beh.jpg
git commit -m "feat: add cropped hero photo"
```

---

### Task 2: Write the failing smoke test

**Files:**
- Modify: `tests/e2e/smoke.spec.ts`

Add two assertions to the existing `"homepage exposes the site shell"` test to confirm the photo and name are in the DOM. These will fail until the hero is rewritten.

- [ ] **Step 1: Add hero assertions**

Open `tests/e2e/smoke.spec.ts`. The first test currently ends after the nav link checks. Extend it to:

```typescript
test("homepage exposes the site shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Vasko/i);
  await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /projects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
  // New hero assertions
  await expect(page.locator('img[src="/beh.jpg"]')).toBeVisible();
  await expect(page.locator(".home-hero__name")).toContainText("Vasko Michal");
});
```

Note: `toBeVisible()` confirms the image is rendered in the DOM and not hidden. For a hero image at the very top of the page this is reliable.

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
npx playwright test tests/e2e/smoke.spec.ts --reporter=line 2>&1 | tail -20
```

Expected: the `"homepage exposes the site shell"` test FAILS. Error should mention `.home-hero__name` or `img[src="/beh.jpg"]` not found.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/e2e/smoke.spec.ts
git commit -m "test: add failing assertions for new hero photo and name"
```

---

### Task 3: Create the parallax script

**Files:**
- Create: `public/hero.js`

A small vanilla JS module that applies a `translateY` transform to the hero photo on scroll, creating the parallax depth effect. Pattern follows `public/reveal.js` — plain JS loaded as a static file, no build step.

- [ ] **Step 1: Create `public/hero.js`**

```javascript
const photo = document.querySelector("[data-hero-photo]");

if (photo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        photo.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}
```

Key points:
- Guards on `[data-hero-photo]` — safe to include on all pages, does nothing if hero is absent
- `prefers-reduced-motion` check — no parallax for users who prefer it
- `passive: true` — does not block scroll performance
- `ticking` flag — prevents more than one `requestAnimationFrame` per frame

How the math works: `translateY(scrollY * 0.35)` moves the photo DOWN by 35% of the scroll distance. Since the hero section is itself scrolling UP as you scroll, the net effect is the photo moves UP at only 70% of the normal scroll speed — creating the impression that the photo is "behind" the page content.

- [ ] **Step 2: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add public/hero.js
git commit -m "feat: add hero parallax script"
```

---

### Task 4: Rewrite Hero.astro

**Files:**
- Modify: `src/components/home/Hero.astro` (full rewrite)

Replace the existing text+panel component with a full-bleed photo layout. The component renders the photo element (with `data-hero-photo` for the JS hook), the name, role, location badge, and scroll hint. It loads `hero.js` via a module script tag.

- [ ] **Step 1: Overwrite `src/components/home/Hero.astro`**

Replace the entire file with:

```astro
---
// No props needed — content is hardcoded for the personal brand hero
---

<section class="home-hero" aria-label="Vasko Michal — hero photo">
  <div class="home-hero__photo-wrap">
    <img
      class="home-hero__photo"
      src="/beh.jpg"
      alt="Vasko Michal running"
      width="2400"
      height="1512"
      data-hero-photo
    />
  </div>

  <div class="home-hero__overlay">
    <p class="home-hero__location">
      <span class="home-hero__location-dot" aria-hidden="true"></span>
      Bratislava, SK
    </p>

    <div class="home-hero__center">
      <p class="home-hero__role">DevOps Engineer</p>
      <h1 class="home-hero__name">Vasko Michal</h1>
    </div>

    <p class="home-hero__scroll" aria-hidden="true">Scroll ↓</p>
  </div>
</section>

<script type="module" src="/hero.js"></script>
```

Notes:
- `aria-label` on section describes it for screen readers; the `<img>` alt text provides the visual description
- `data-hero-photo` is the hook for `hero.js`
- `<h1>` is the page-level heading — correct because `index.astro` uses `BaseLayout` with no other `<h1>`
- `width`/`height` attributes match the resized photo to prevent layout shift
- `<script type="module" src="/hero.js">` loads the parallax script only on this page

- [ ] **Step 2: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add src/components/home/Hero.astro
git commit -m "feat: rewrite Hero with full-bleed photo layout"
```

---

### Task 5: Replace home-hero CSS in global.css

**Files:**
- Modify: `src/styles/global.css`

Two changes are needed:
1. Replace the `.home-hero*` block (lines 387–498)
2. Remove the stale responsive overrides for those classes

- [ ] **Step 1: Replace the `.home-hero*` block**

Find the block in `global.css` that starts at `.home-hero {` (around line 387) and ends just before `.section-intro` (around line 500). Delete everything in that range and replace with:

```css
.home-hero {
  position: relative;
  height: 100svh;
  overflow: hidden;
}

.home-hero__photo-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.home-hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  will-change: transform;
}

.home-hero__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.5rem clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(
    to bottom,
    transparent 25%,
    rgba(7, 17, 31, 0.4) 60%,
    rgba(7, 17, 31, 0.88) 100%
  );
  pointer-events: none;
}

.home-hero__location {
  position: absolute;
  bottom: 2.5rem;
  left: clamp(1.5rem, 5vw, 4rem);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}

.home-hero__location-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.home-hero__center {
  text-align: center;
  margin-bottom: 3.5rem;
}

.home-hero__role {
  font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.5rem;
}

.home-hero__name {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  text-transform: uppercase;
  color: #fff;
  margin: 0;
}

.home-hero__scroll {
  position: absolute;
  bottom: 2.5rem;
  right: clamp(1.5rem, 5vw, 4rem);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
}

@media (max-width: 768px) {
  .home-hero__name {
    font-size: clamp(2.2rem, 12vw, 3.5rem);
  }

  .home-hero__center {
    margin-bottom: 5rem;
  }
}
```

- [ ] **Step 2: Remove stale responsive overrides**

In the `@media (max-width: 960px)` block (around line 1113), find this grouped selector and remove `.home-hero__grid` from it:

```css
/* Before: */
.home-hero__grid,
.capability-grid,
...

/* After: */
.capability-grid,
...
```

In the `@media (max-width: 720px)` block (around line 1132), remove these three rules entirely (the new hero has no padding or actions to override):

```css
/* Remove these: */
.home-hero {
  padding-top: clamp(4rem, 14vw, 6rem);
}

.home-hero__actions,
.not-found-page__actions {
  width: 100%;
}

.home-hero__actions > *,
.not-found-page__actions > * {
  width: 100%;
}
```

Leave all other rules in both media queries untouched.

- [ ] **Step 3: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add src/styles/global.css
git commit -m "feat: replace home-hero CSS with full-bleed photo styles"
```

---

### Task 6: Verify and close

- [ ] **Step 1: Run the full smoke test suite**

Make sure the dev server is running:

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio" && npm run dev &
```

Wait a few seconds, then run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --reporter=line 2>&1 | tail -30
```

Expected: all tests pass, including the two new hero assertions.

If the contact test fails on the link assertions (Email/LinkedIn/Instagram/Facebook in `main`), that is a pre-existing issue from before this task — do not fix it here.

- [ ] **Step 2: Visual check in browser**

Open http://localhost:4321 and verify:

1. Photo fills the full viewport height, no letterboxing
2. Runner is visible and well-framed (adjust `object-position` if needed)
3. "DevOps Engineer" appears in monospace above the name
4. "VASKO MICHAL" renders in large white uppercase
5. "Bratislava, SK" dot badge appears bottom-left
6. "Scroll ↓" hint appears bottom-right
7. Scrolling the page applies smooth parallax to the photo
8. All sections below the hero (Intro, Capabilities, etc.) still render correctly

- [ ] **Step 3: Check reduced-motion**

In Chrome DevTools → Rendering tab → "Emulate CSS media feature prefers-reduced-motion" → select `reduce`.

Reload the page and scroll. Expected: photo scrolls at normal speed (no parallax offset applied).

- [ ] **Step 4: Check mobile**

In DevTools, toggle device emulation to a phone viewport (e.g. iPhone 14, 390×844).

Expected: photo fills the full screen, name text is readable (at least 2.2rem), location badge and scroll hint don't overlap with the name.

- [ ] **Step 5: Push to GitHub**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git push
```
