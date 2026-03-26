# Navigation Shared Dot Indicator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Dennis-like shared moving dot indicator to the desktop top navigation and fullscreen overlay navigation without changing the existing navigation structure.

**Architecture:** Keep the current route-active markup as the no-JS baseline, then layer one shared indicator per nav context on top with minimal hooks and a small client-side routine in the existing menu script. Desktop top nav and overlay nav should share the same movement model, but each keeps its own indicator element and positioning rules in CSS.

**Tech Stack:** Astro, vanilla CSS, existing `public/menu.js`, light Playwright/build verification

---

## File Structure

Planned files and responsibilities:

- `src/components/site/Header.astro` - add nav-root and indicator hooks for the desktop top navigation without changing route logic
- `src/components/site/MenuOverlay.astro` - add overlay-nav hooks and shared indicator element for the fullscreen menu
- `src/styles/global.css` - define shared-indicator layout, positioning, transitions, reduced-motion handling, and no-JS fallback visibility rules
- `public/menu.js` - extend the existing menu script with a small shared-indicator controller for hover, focus, reset, and overlay-close behavior
- `tests/e2e/navigation.spec.ts` - reuse only if a tiny assertion update is necessary; otherwise leave it alone

Keep scope tight. Do not redesign the navigation again, and do not touch route intros, hero, or content sections.

## Task 1: Add Shared Indicator Hooks to Both Navigation Contexts

**Files:**
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/MenuOverlay.astro`

- [ ] **Step 1: Add desktop nav-root hooks**

In `src/components/site/Header.astro`:

- add a root hook on the desktop top navigation container, for example `data-nav-indicator-root="header"`
- add a link hook on each top-nav link, for example `data-nav-indicator-link`
- add one shared indicator element inside the desktop nav context
- keep existing `aria-current` behavior intact for the active route baseline

- [ ] **Step 2: Add overlay nav-root hooks**

In `src/components/site/MenuOverlay.astro`:

- add a root hook on the fullscreen overlay primary-nav container, for example `data-nav-indicator-root="overlay"`
- add a link hook on each overlay primary link, for example `data-nav-indicator-link`
- add one shared indicator element inside the overlay nav context
- keep existing `aria-current` behavior intact for the active route baseline

- [ ] **Step 3: Keep the static fallback untouched**

Do not remove the current per-link active-dot markup yet. Task 1 should only add the hooks and shared indicator elements so the existing active state still works without JavaScript.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/Header.astro src/components/site/MenuOverlay.astro
git commit -m "feat: add navigation indicator hooks"
```

## Task 2: Implement Shared Indicator Styling and Movement Logic

**Files:**
- Modify: `src/styles/global.css`
- Modify: `public/menu.js`
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/MenuOverlay.astro`

- [ ] **Step 1: Add indicator styling in shared CSS**

In `src/styles/global.css`:

- position the shared desktop indicator under the top-nav text row
- position the shared overlay indicator so it reads clearly against the large overlay links
- add short smooth movement transitions
- add `prefers-reduced-motion` fallback so movement becomes immediate or near-immediate
- hide the shared indicator when JS has not initialized it
- keep the existing per-link active-dot markup as the visible no-JS fallback

- [ ] **Step 2: Add the shared indicator controller**

In `public/menu.js`:

- find each nav root that has a shared indicator
- find its active link using `aria-current="page"`
- measure the active link and place the shared indicator there on load
- move the indicator on `pointerenter` and `focusin`
- reset to the active link on `pointerleave` and `focusout`
- when the overlay closes, reset the overlay indicator back to the active route

Keep the controller small and local. Do not refactor unrelated menu behavior.

- [ ] **Step 3: Switch JS mode from static dots to shared indicator**

Use a JS-ready class or data flag so that once the controller initializes:

- the shared indicator becomes visible
- the per-link active dots can be visually suppressed in JS mode
- the no-JS fallback remains unchanged if the script never runs

- [ ] **Step 4: Run the lightweight verification**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
npm run build
```

Expected:

- navigation spec stays green
- build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/site/Header.astro src/components/site/MenuOverlay.astro src/styles/global.css public/menu.js tests/e2e/navigation.spec.ts
git commit -m "feat: add shared navigation dot indicator"
```

## Task 3: Browser Tuning and Final Verification

**Files:**
- Modify: `src/styles/global.css`
- Modify: `public/menu.js` only if tiny timing/position fixes are required

- [ ] **Step 1: Tune the desktop indicator**

Manually verify in the browser:

- the desktop dot rests under the active route
- it moves smoothly on hover
- it follows keyboard focus
- it returns to the active route when leaving the nav

- [ ] **Step 2: Tune the overlay indicator**

Manually verify in the browser:

- the overlay dot is clearly attached to the hovered/focused line
- it moves smoothly but subtly
- it resets to the active route after pointer/focus leaves
- it resets correctly after closing and reopening the overlay

- [ ] **Step 3: Re-run the lightweight verification**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
npm run build
```

Expected:

- navigation spec passes
- build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css public/menu.js
git commit -m "fix: tune shared navigation indicator"
```
