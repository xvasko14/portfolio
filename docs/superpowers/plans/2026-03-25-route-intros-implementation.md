# Route Intros Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Dennis-style fullscreen route intros to the existing Astro portfolio: rotating greetings for direct home loads, fullscreen title transitions for the main routes, and simple fallback behavior when JavaScript is unavailable.

**Architecture:** Keep the system centralized. Main routes pass transition metadata into `BaseLayout`, which renders one shared overlay shell and serializes the route-intro config from Astro into the page for one small client controller. Internal navigation uses a tiny `sessionStorage` handoff so the next document can distinguish direct loads from intercepted main-route transitions. The first version keeps verification intentionally light: one focused route-intro test, the existing smoke/projects checks, and browser tuning.

**Tech Stack:** Astro, TypeScript-flavored Astro props, vanilla CSS, one static browser script in `public/`, Playwright

---

## File Structure

Planned files and responsibilities:

- `src/data/route-intros.ts` - source of truth for greeting strings, main-route titles, and shared transition constants
- `src/layouts/BaseLayout.astro` - shared route-intro overlay shell, route-intro props, and script loading
- `src/pages/index.astro` - home route metadata for greeting/title behavior
- `src/pages/about.astro` - about route title metadata
- `src/pages/projects/index.astro` - projects route title metadata
- `src/pages/contact.astro` - contact route title metadata
- `src/styles/global.css` - overlay, type, state, reveal, and body scroll-lock styles for route intros
- `public/route-intros.js` - client controller for direct-load intros and intercepted main-route navigation using serialized config plus `sessionStorage` handoff
- `tests/e2e/route-intros.spec.ts` - one lightweight end-to-end guard for route-intro shell and load behavior

Do not expand scope into project detail pages, menu redesign, or a large animation test matrix.

## Task 1: Add Shared Route-Intro Contract and Overlay Shell

**Files:**
- Create: `src/data/route-intros.ts`
- Create: `tests/e2e/route-intros.spec.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Write the failing route-intro shell test**

Create `tests/e2e/route-intros.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("about direct load exposes the shared route intro shell", async ({ page }) => {
  await page.goto("/about");

  const intro = page.locator("[data-route-intro-root]");
  await expect(intro).toHaveCount(1);
  await expect(intro).toBeHidden();
  await expect(intro).toHaveAttribute("data-route-intro-mode", "page-title");
  await expect(page.locator("[data-route-intro-heading]")).toHaveText("About");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test:e2e:preview -- tests/e2e/route-intros.spec.ts
```

Expected: FAIL because there is no shared route-intro shell or metadata yet.

- [ ] **Step 3: Add route-intro data and layout props**

Create `src/data/route-intros.ts` with a focused shared contract:

```ts
export const homeGreetings = [
  "Hello",
  "Ahoj",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "Hej",
];

export const mainRouteTitles = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
} as const;

export type RouteIntroMode = "none" | "home-greetings" | "home-title" | "page-title";
```

Update `src/layouts/BaseLayout.astro` to accept route-intro props:

```astro
interface Props {
  description?: string;
  title?: string;
  routeIntroMode?: "none" | "home-greetings" | "home-title" | "page-title";
  routeIntroTitle?: string;
}
```

Render one shared overlay shell near the top of `<body>`:

```astro
<div
  class="route-intro"
  data-route-intro-root
  data-route-intro-mode={routeIntroMode}
  aria-hidden="true"
>
  <div class="route-intro__inner">
    <p class="route-intro__marker" data-route-intro-marker>•</p>
    <p class="route-intro__greeting" data-route-intro-greeting></p>
    <h1 class="route-intro__title" data-route-intro-heading>{routeIntroTitle}</h1>
  </div>
</div>
```

Keep the Task 1 shell hidden by default so the shared layout does not visibly regress before the Task 2 controller owns reveal/show behavior.

Pass metadata from the main routes:

```astro
<BaseLayout routeIntroMode="home-greetings" routeIntroTitle="Home">
```

```astro
<BaseLayout title="About" routeIntroMode="page-title" routeIntroTitle="About">
```

Apply the same `page-title` shape to `Projects` and `Contact`.

Also serialize the shared route config from `src/data/route-intros.ts` into the layout so the browser script reads one source of truth instead of redefining route titles:

```astro
<script type="application/json" id="route-intro-config" set:html={JSON.stringify(routeIntroConfig)} />
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
npm run test:e2e:preview -- tests/e2e/route-intros.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/route-intros.ts src/layouts/BaseLayout.astro src/pages/index.astro src/pages/about.astro src/pages/projects/index.astro src/pages/contact.astro tests/e2e/route-intros.spec.ts
git commit -m "feat: add route intro shell"
```

## Task 2: Implement the Client Controller and Fullscreen Motion Layer

**Files:**
- Create: `public/route-intros.js`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Extend the test with one direct-load behavior check**

Add one lightweight behavior assertion to `tests/e2e/route-intros.spec.ts`:

```ts
test("home direct load initializes greeting intro mode", async ({ page }) => {
  await page.goto("/");

  const intro = page.locator("[data-route-intro-root]");
  await expect(intro).toHaveAttribute("data-route-intro-mode", "home-greetings");
  await expect(page.locator("html")).toHaveAttribute("data-route-intro-ready", "true");
});
```

This keeps the automated coverage intentionally light: it verifies the home branch initializes, but does not try to exhaustively test animation timing.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test:e2e:preview -- tests/e2e/route-intros.spec.ts
```

Expected: FAIL because the route-intro controller is not yet installed and `data-route-intro-ready` is never set.

- [ ] **Step 3: Implement the controller and styling**

Create `public/route-intros.js` with one small controller that:

- marks the document as initialized with `data-route-intro-ready="true"`
- blocks scroll while the intro is active
- on direct load:
  - plays greeting rotation on `/`
  - plays a title intro on `/about`, `/projects`, `/contact`
- intercepts internal navigation only for the main routes
- writes the next-route handoff into `sessionStorage` before navigation, for example:

```js
sessionStorage.setItem(
  "portfolio:route-intro-next",
  JSON.stringify({ pathname: href.pathname, mode: href.pathname === "/" ? "home-title" : "page-title" }),
);
```

- on the destination page, consumes that handoff once and prefers it over the direct-load mode
- uses the explicit `home-title` mode for internal navigation back to `/`
- leaves project detail pages and external links untouched
- degrades safely to plain navigation when required DOM nodes are missing

Read the config from the serialized JSON that `BaseLayout.astro` emits, for example:

```js
const configElement = document.getElementById("route-intro-config");
const ROUTE_INTRO_CONFIG = configElement ? JSON.parse(configElement.textContent ?? "{}") : null;
```

Update `BaseLayout.astro` to load the new script:

```astro
<script type="module" src="/route-intros.js"></script>
```

Add route-intro state styling to `src/styles/global.css`:

- fullscreen fixed overlay
- hidden-by-default no-JS safe baseline
- visible intro states when JS adds the ready/active attributes
- dark background, large title, greeting text, minimal marker
- body scroll lock while intro is active
- soft reveal into page content

Keep the first version visually strong but contained. Do not rewrite unrelated page styling.

- [ ] **Step 4: Run the focused test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/route-intros.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add public/route-intros.js src/layouts/BaseLayout.astro src/styles/global.css tests/e2e/route-intros.spec.ts
git commit -m "feat: add route intro transitions"
```

## Task 3: Manual Tuning and Final Verification

**Files:**
- Modify: `public/route-intros.js`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Tune timing and route behavior in the browser**

Use the local dev server and manually verify:

- direct load on `/` plays greetings then reveals home
- direct load on `/about`, `/projects`, `/contact` plays fullscreen title intro
- internal navigation between main routes shows the destination title intro
- internal navigation back to `/` uses the explicit `Home` title transition via the `home-title` mode
- project detail pages still open without the fullscreen intro
- menu still works after the new controller is loaded

- [ ] **Step 2: Run the lightweight verification set**

Run:

```bash
npm run test:e2e:preview -- tests/e2e/route-intros.spec.ts
npm run test:e2e -- tests/e2e/smoke.spec.ts
npm run test:e2e -- tests/e2e/projects.spec.ts
npm run build
```

Expected:

- route-intro test passes
- smoke test still passes
- projects test still passes
- build succeeds

- [ ] **Step 3: Commit**

```bash
git add public/route-intros.js src/styles/global.css tests/e2e/route-intros.spec.ts
git commit -m "fix: tune route intro timing"
```
