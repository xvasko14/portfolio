# Navigation Dennis-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current pill-style navigation with a Dennis-inspired two-state header: clean top-of-page text nav, circular menu trigger after scroll, and a fullscreen overlay navigation in the site's dark visual language.

**Architecture:** Keep the change tightly scoped to header, overlay, and shared CSS, with only a small menu-script hook for the new scroll-state behavior. Preserve the current accessibility model and menu open/close behavior while replacing the old breakpoint-led nav pattern with a top-of-page vs scrolled two-state header.

**Tech Stack:** Astro, vanilla CSS, existing menu script, light Playwright smoke coverage

---

## File Structure

Planned files and responsibilities:

- `src/components/site/Header.astro` - two-state header markup, current-route hooks, top text navigation, circular trigger shell
- `src/components/site/MenuOverlay.astro` - fullscreen navigation layout with large links, minimal socials, and current-route hooks
- `src/styles/global.css` - visual system for top header state, scrolled trigger state, fullscreen overlay, and dot-indicator active states
- `public/menu.js` - existing menu logic plus the minimal scroll-state hook for the two-state header
- `tests/e2e/navigation.spec.ts` - one light regression check for the new header state model and menu behavior

Keep the work tightly scoped. Do not change hero, route intros, or content sections.

## Task 1: Build the Two-State Header and Overlay Structure

**Files:**
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/MenuOverlay.astro`
- Modify: `tests/e2e/navigation.spec.ts`

- [ ] **Step 1: Replace the current navigation expectation with the new state model**

Update `tests/e2e/navigation.spec.ts` so it checks the actual approved behavior:

- at the top of the page, desktop shows text navigation links
- after scroll, the text navigation gives way to the circular menu trigger
- opening the menu still exposes the overlay links and preserves close/focus behavior

- [ ] **Step 2: Run the navigation spec to verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: FAIL because the current implementation is still breakpoint-led and pill-styled.

- [ ] **Step 3: Update header markup and current-route hooks**

In `src/components/site/Header.astro`:

- keep brand on the left
- render clean text navigation links for the top-of-page state
- add a circular menu trigger element for the scrolled state
- add current-route hooks/classes/attributes needed for dot indicators
- include enough classes/data hooks to let CSS switch between the two states

Do not keep the old pill-button structure.

- [ ] **Step 4: Update overlay markup**

In `src/components/site/MenuOverlay.astro`:

- remove the centered card/modal panel feeling
- keep fullscreen overlay semantics and current close hooks
- render large nav links as the primary content
- keep only small socials/contact links near the bottom
- add current-route hooks/classes/attributes needed for overlay dot indicators
- remove the larger role/meta/email-CTA block styling

- [ ] **Step 5: Run the navigation spec to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/Header.astro src/components/site/MenuOverlay.astro tests/e2e/navigation.spec.ts
git commit -m "feat: restructure navigation states"
```

## Task 2: Implement Two-State Styling and Scroll Behavior

**Files:**
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/MenuOverlay.astro`
- Modify: `src/styles/global.css`
- Modify: `public/menu.js`

- [ ] **Step 1: Keep verification light and targeted**

Do not add a second fail-pass loop to the same E2E spec. Reuse the updated navigation spec from Task 1 as the single light regression check for this redesign.

- [ ] **Step 2: Implement the two-state visual system**

In `src/styles/global.css`:

- remove pill-button nav styling for top links
- add clean top-of-page text-nav styling
- add dot-indicator active states
- add circular trigger styling for the scrolled state
- add fullscreen overlay styling without centered-card chrome
- keep socials/contact links visually secondary
- keep the site dark and aligned with the existing palette

In `public/menu.js`:

- add the minimal scroll-state hook for the top-of-page vs scrolled header behavior
- preserve the existing overlay accessibility behavior

Make sure current-route markup from Task 1 is styled so:

- `Home` is active only on `/`
- `Projects` is active on `/projects` and `/projects/[slug]`
- `About` is active on `/about`
- `Contact` is active on `/contact`

Keep this logic tied to pathname/layout context, not static site metadata.

- [ ] **Step 3: Run the navigation spec to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/Header.astro src/components/site/MenuOverlay.astro src/styles/global.css public/menu.js tests/e2e/navigation.spec.ts
git commit -m "feat: add dennis-style navigation states"
```

## Task 3: Visual Tuning and Lightweight Verification

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/site/Header.astro`
- Modify: `src/components/site/MenuOverlay.astro`

- [ ] **Step 1: Tune spacing and visual balance in the browser**

Manually verify:

- top-of-page header feels light and text-led
- scrolled state clearly switches to circular trigger
- fullscreen overlay feels open and not like a modal card
- socials stay visually secondary
- active dot indicators are readable but subtle

- [ ] **Step 2: Run the lightweight verification set**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
npm run build
```

Expected:

- navigation spec passes
- build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/site/Header.astro src/components/site/MenuOverlay.astro src/styles/global.css
git commit -m "fix: tune navigation presentation"
```
