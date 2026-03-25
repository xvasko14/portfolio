# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, premium personal website in Astro for a DevOps developer, with a brand-first homepage, small multi-page structure, project detail template, and deployment-ready setup for GitHub plus Cloudflare Pages.

**Architecture:** Use Astro as a static-first site generator with local content and data files, reusable layout/components, and a lightweight vanilla-JS motion layer. Keep content in the repo, use MDX only for project detail pages, and validate the user-facing routes with Playwright smoke tests as features are added.

**Tech Stack:** Astro, TypeScript, MDX, Astro sitemap integration, vanilla CSS, vanilla browser scripts, Playwright

---

## File Structure

Planned project structure and responsibilities:

- `package.json` - scripts and dependencies
- `astro.config.mjs` - Astro configuration, site URL, integrations
- `tsconfig.json` - TypeScript config from Astro scaffold
- `README.md` - local dev, build, and deploy notes
- `playwright.config.ts` - end-to-end test runner config
- `tests/e2e/smoke.spec.ts` - route availability and shared shell checks
- `tests/e2e/home.spec.ts` - homepage structure checks
- `tests/e2e/navigation.spec.ts` - navigation and menu interaction checks
- `tests/e2e/projects.spec.ts` - projects list and detail route checks
- `src/data/site.ts` - site metadata, navigation links, social links
- `src/data/home.ts` - homepage content blocks and capability data
- `src/data/about.ts` - about page content and principles
- `src/data/contact.ts` - contact copy and contact methods
- `src/content.config.ts` - Astro content collection definitions
- `src/content/projects/*.mdx` - project detail source content
- `src/layouts/BaseLayout.astro` - shared page chrome, metadata, and script loading
- `src/layouts/ProjectLayout.astro` - project detail page wrapper
- `src/components/site/Header.astro` - desktop header and brand mark
- `src/components/site/MenuOverlay.astro` - mobile/fullscreen menu
- `src/components/site/Footer.astro` - shared footer and contact links
- `src/components/ui/Section.astro` - spacing wrapper for sections
- `src/components/ui/SectionIntro.astro` - reusable section heading block
- `src/components/ui/ButtonLink.astro` - primary/secondary CTA link component
- `src/components/home/Hero.astro` - homepage hero
- `src/components/home/Intro.astro` - homepage intro and positioning
- `src/components/home/Capabilities.astro` - capability blocks
- `src/components/home/Credibility.astro` - proof/credibility strip
- `src/components/home/ProjectPreview.astro` - homepage project teaser cards
- `src/components/home/ContactBand.astro` - homepage closing CTA
- `src/components/projects/ProjectCard.astro` - project preview/list card
- `src/components/projects/ProjectMeta.astro` - project detail meta block
- `src/pages/index.astro` - homepage
- `src/pages/about.astro` - about page
- `src/pages/projects/index.astro` - projects index
- `src/pages/projects/[slug].astro` - project detail route
- `src/pages/contact.astro` - contact page
- `src/pages/404.astro` - custom 404 page
- `src/styles/global.css` - design tokens, typography, layout primitives, shared styling
- `src/scripts/menu.ts` - menu open/close behavior
- `src/scripts/reveal.ts` - intersection-observer reveal behavior
- `public/favicon.svg` - simple site icon
- `public/og-default.svg` - default OG image placeholder

Keep files small and responsibility-based. Do not add a UI framework or CMS in v1.

## Task 1: Bootstrap Astro Project and Tooling

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro`
- Create: `src/env.d.ts`
- Modify: `package.json`

- [ ] **Step 1: Scaffold the Astro project**

Run:

```bash
npm create astro@latest . -- --template minimal --install --git false --typescript strict
```

Expected: Astro scaffold completes successfully and creates the baseline files in the repository root.

- [ ] **Step 2: Add official Astro integrations**

Run:

```bash
npx astro add mdx sitemap
```

Expected: `astro.config.mjs` and `package.json` are updated to include MDX and sitemap support.

- [ ] **Step 3: Add the browser test runner**

Run:

```bash
npm install -D @playwright/test
npx playwright install
```

Expected: Playwright is added as a dev dependency and browser binaries are installed.

- [ ] **Step 4: Normalize package scripts for this repo**

Update `package.json` scripts to include:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

- [ ] **Step 5: Verify the scaffold builds**

Run:

```bash
npm run build
```

Expected: build succeeds and outputs `dist/`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src
git commit -m "chore: scaffold Astro portfolio app"
```

## Task 2: Establish Site Data, Base Layout, and Smoke Test

**Files:**
- Create: `src/data/site.ts`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `playwright.config.ts`
- Create: `tests/e2e/smoke.spec.ts`
- Modify: `src/pages/index.astro`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Write the failing smoke test**

Create `tests/e2e/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("homepage exposes the site shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Vasko/i);
  await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /projects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the smoke test to verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/smoke.spec.ts
```

Expected: FAIL because the scaffolded page does not yet provide the final title or navigation shell.

- [ ] **Step 3: Add site metadata and the base layout**

Create `src/data/site.ts` with a single exported config object:

```ts
export const site = {
  title: "Vasko Michal",
  role: "DevOps Developer",
  description:
    "DevOps developer building reliable infrastructure, delivery pipelines, and calmer engineering systems.",
  url: "https://example.eu",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ],
  socials: [
    { href: "https://github.com/your-handle", label: "GitHub" },
    { href: "https://linkedin.com/in/your-handle", label: "LinkedIn" },
    { href: "mailto:hello@example.com", label: "Email" },
  ],
};
```

Create `src/layouts/BaseLayout.astro` to own:

- page `<title>` and meta description
- preload of `src/styles/global.css`
- shared header/footer slots
- menu/reveal scripts loaded at the end of the body

- [ ] **Step 4: Add the first-pass global theme and homepage shell**

Implement `src/styles/global.css` with:

- CSS custom properties for background, text, muted text, border, accent
- dark technical theme
- typography scale
- container width and spacing tokens
- shared button, link, and section styles

Replace the scaffolded `src/pages/index.astro` with a minimal page using `BaseLayout` and a placeholder nav shell that satisfies the smoke test.

- [ ] **Step 5: Configure Playwright web server**

Create `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:4321",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 6: Run the smoke test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/smoke.spec.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add astro.config.mjs playwright.config.ts src/data/site.ts src/layouts/BaseLayout.astro src/pages/index.astro src/styles/global.css tests/e2e/smoke.spec.ts
git commit -m "feat: add base portfolio shell"
```

## Task 3: Build Shared Navigation, Footer, and Reusable Section Primitives

**Files:**
- Create: `src/components/site/Header.astro`
- Create: `src/components/site/MenuOverlay.astro`
- Create: `src/components/site/Footer.astro`
- Create: `src/components/ui/Section.astro`
- Create: `src/components/ui/SectionIntro.astro`
- Create: `src/components/ui/ButtonLink.astro`
- Create: `src/scripts/menu.ts`
- Create: `tests/e2e/navigation.spec.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing navigation test**

Create `tests/e2e/navigation.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("global navigation opens and closes the menu overlay", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /menu/i }).click();
  await expect(page.getByRole("dialog", { name: /site menu/i })).toBeVisible();
  await page.getByRole("button", { name: /close menu/i }).click();
  await expect(page.getByRole("dialog", { name: /site menu/i })).toBeHidden();
});
```

- [ ] **Step 2: Run the navigation test to verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: FAIL because there is no overlay menu yet.

- [ ] **Step 3: Implement shared site components**

Create:

- `Header.astro` with brand, primary nav, and mobile menu button
- `MenuOverlay.astro` with nav links, social links, and accessible dialog semantics
- `Footer.astro` with role line, socials, and contact email
- `Section.astro`, `SectionIntro.astro`, and `ButtonLink.astro` for consistent layout primitives

Use `src/data/site.ts` as the source of truth for all nav and social links.

- [ ] **Step 4: Implement menu behavior**

Create `src/scripts/menu.ts` with:

- button lookup via `data-menu-open`, `data-menu-close`
- `aria-expanded` syncing
- body scroll lock while open
- `Escape` key support

- [ ] **Step 5: Wire the layout and style the shell**

Update `BaseLayout.astro` to render `Header`, `MenuOverlay`, and `Footer`.

Update `global.css` to add:

- sticky transparent header behavior
- overlay panel styling
- button states
- footer spacing
- consistent section padding

- [ ] **Step 6: Run the navigation test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: PASS.

- [ ] **Step 7: Run the smoke test again**

Run:

```bash
npm run test:e2e -- tests/e2e/smoke.spec.ts tests/e2e/navigation.spec.ts
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/components/site src/components/ui src/layouts/BaseLayout.astro src/scripts/menu.ts src/styles/global.css tests/e2e/navigation.spec.ts
git commit -m "feat: add shared navigation and layout primitives"
```

## Task 4: Build the Homepage Sections

**Files:**
- Create: `src/data/home.ts`
- Create: `src/components/home/Hero.astro`
- Create: `src/components/home/Intro.astro`
- Create: `src/components/home/Capabilities.astro`
- Create: `src/components/home/Credibility.astro`
- Create: `src/components/home/ProjectPreview.astro`
- Create: `src/components/home/ContactBand.astro`
- Create: `tests/e2e/home.spec.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing homepage test**

Create `tests/e2e/home.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("homepage renders the brand-first sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/DevOps|reliable|infrastructure/i);
  await expect(page.getByRole("heading", { name: /what i work on/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /selected work/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /let's talk|get in touch/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the homepage test to verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected: FAIL because the homepage still uses a placeholder shell.

- [ ] **Step 3: Add structured homepage content**

Create `src/data/home.ts` with:

- hero headline
- hero supporting copy
- primary and secondary CTA labels
- capabilities array
- credibility metrics or trust signals
- one to three project preview entries

Use realistic placeholders, but keep them honest and clearly editable.

- [ ] **Step 4: Build the homepage components**

Implement:

- `Hero.astro` with strong headline, supporting copy, CTA row, and subtle system-inspired visual layer
- `Intro.astro` for positioning copy
- `Capabilities.astro` titled "What I work on"
- `Credibility.astro` for tech focus and proof signals
- `ProjectPreview.astro` titled "Selected work"
- `ContactBand.astro` with a clear closing CTA

Keep the console influence subtle: monospace accents and system cues, not a fake terminal page.

- [ ] **Step 5: Compose the homepage**

Replace `src/pages/index.astro` with the ordered section flow from the spec:

1. Hero
2. Intro / positioning
3. Selected capabilities
4. Proof / credibility
5. Project preview
6. Contact CTA band

- [ ] **Step 6: Extend homepage styling**

Update `global.css` for:

- large hero spacing
- layered gradients and grid lines
- capability card styling
- credibility strip layout
- project teaser grid
- CTA band emphasis

- [ ] **Step 7: Run the homepage test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/home.spec.ts
```

Expected: PASS.

- [ ] **Step 8: Run the full current browser test suite**

Run:

```bash
npm run test:e2e
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/home src/data/home.ts src/pages/index.astro src/styles/global.css tests/e2e/home.spec.ts
git commit -m "feat: build brand-first homepage"
```

## Task 5: Build the About and Contact Pages

**Files:**
- Create: `src/data/about.ts`
- Create: `src/data/contact.ts`
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Write the failing route assertions**

Extend `tests/e2e/smoke.spec.ts`:

```ts
test("about and contact pages expose key content", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText(/principles|how i work/i)).toBeVisible();

  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /github|linkedin|email/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the smoke test to verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/smoke.spec.ts
```

Expected: FAIL because the routes do not exist yet.

- [ ] **Step 3: Add About page content and route**

Create `src/data/about.ts` with:

- short bio
- "how I work" points
- principles list
- core stack list

Create `src/pages/about.astro` using `BaseLayout`, `Section`, and `SectionIntro`.

- [ ] **Step 4: Add Contact page content and route**

Create `src/data/contact.ts` with:

- availability copy
- email
- GitHub
- LinkedIn

Create `src/pages/contact.astro` with a direct, minimal contact layout.

- [ ] **Step 5: Style the content pages**

Update `global.css` with reusable patterns for:

- page hero spacing
- list blocks
- contact cards / inline links
- content width

- [ ] **Step 6: Run the smoke test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/smoke.spec.ts
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/data/about.ts src/data/contact.ts src/pages/about.astro src/pages/contact.astro src/styles/global.css tests/e2e/smoke.spec.ts
git commit -m "feat: add about and contact pages"
```

## Task 6: Add Projects Content Collection, Listing Page, and Detail Template

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/homelab-observability.mdx`
- Create: `src/layouts/ProjectLayout.astro`
- Create: `src/components/projects/ProjectCard.astro`
- Create: `src/components/projects/ProjectMeta.astro`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[slug].astro`
- Create: `tests/e2e/projects.spec.ts`
- Modify: `src/data/home.ts`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Write the failing projects test**

Create `tests/e2e/projects.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("projects index links to a project detail page", async ({ page }) => {
  await page.goto("/projects");
  const firstCard = page.getByRole("link", { name: /observability|project/i }).first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

- [ ] **Step 2: Run the projects test to verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/projects.spec.ts
```

Expected: FAIL because the `/projects` route and collection do not exist yet.

- [ ] **Step 3: Define the project content collection**

Create `src/content.config.ts` with a `projects` collection that validates:

- title
- summary
- year
- tags
- status
- featured

Example shape:

```ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    status: z.enum(["concept", "in-progress", "shipped"]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
```

- [ ] **Step 4: Add the first project document and layouts**

Create `src/content/projects/homelab-observability.mdx` with one honest starter project entry.

Create `ProjectLayout.astro` and `ProjectMeta.astro` to render metadata, content body, and related navigation.

- [ ] **Step 5: Add the projects index and dynamic route**

Create:

- `src/pages/projects/index.astro` to list all projects from the collection
- `src/pages/projects/[slug].astro` to generate static paths and render the detail page
- `ProjectCard.astro` for teaser cards

Update `src/data/home.ts` so the homepage teaser can point to the collection-backed projects page instead of hardcoded placeholders.

- [ ] **Step 6: Style projects pages**

Update `global.css` for:

- projects grid
- detail hero
- metadata rail
- MDX content typography

- [ ] **Step 7: Run the projects test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/projects.spec.ts
```

Expected: PASS.

- [ ] **Step 8: Run the full test suite and build**

Run:

```bash
npm run test:e2e
npm run build
```

Expected: PASS and build success.

- [ ] **Step 9: Commit**

```bash
git add src/content.config.ts src/content/projects src/layouts/ProjectLayout.astro src/components/projects src/pages/projects src/data/home.ts src/styles/global.css tests/e2e/projects.spec.ts
git commit -m "feat: add projects index and detail pages"
```

## Task 7: Add Reveal Motion, 404 Page, and Final Visual Polish

**Files:**
- Create: `src/scripts/reveal.ts`
- Create: `src/pages/404.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/home/Hero.astro`
- Modify: `src/components/home/Capabilities.astro`
- Modify: `src/components/home/ProjectPreview.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/e2e/navigation.spec.ts`

- [ ] **Step 1: Write the failing interaction assertion**

Extend `tests/e2e/navigation.spec.ts`:

```ts
test("unknown routes render the branded 404 page", async ({ page }) => {
  await page.goto("/missing-route");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/not found|404/i);
  await expect(page.getByRole("link", { name: /back home|home/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the navigation test to verify it fails**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: FAIL because the custom 404 page does not exist yet.

- [ ] **Step 3: Add the reveal script and data attributes**

Create `src/scripts/reveal.ts` with an `IntersectionObserver` that adds an `is-visible` class to elements marked with `data-reveal`.

Update the homepage components to mark hero supporting elements, capability cards, and project teasers with `data-reveal`.

- [ ] **Step 4: Add the 404 page**

Create `src/pages/404.astro` with a branded fallback that matches the site's tone and links back to `/`.

- [ ] **Step 5: Polish styles and script loading**

Update `BaseLayout.astro` to load `reveal.ts`.

Update `global.css` to add:

- reveal transitions
- subtle grid/background utilities
- improved hover states
- stronger mobile spacing and menu polish
- 404 page styling

- [ ] **Step 6: Run the navigation test to verify it passes**

Run:

```bash
npm run test:e2e -- tests/e2e/navigation.spec.ts
```

Expected: PASS.

- [ ] **Step 7: Run all tests and build**

Run:

```bash
npm run test:e2e
npm run build
```

Expected: PASS and build success.

- [ ] **Step 8: Commit**

```bash
git add src/scripts/reveal.ts src/pages/404.astro src/layouts/BaseLayout.astro src/components/home src/styles/global.css tests/e2e/navigation.spec.ts
git commit -m "feat: add motion polish and 404 page"
```

## Task 8: Add Documentation and Deployment Readiness

**Files:**
- Modify: `README.md`
- Modify: `public/favicon.svg`
- Create: `public/og-default.svg`
- Modify: `src/data/site.ts`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Write the failing build-readiness check**

Run:

```bash
npm run build
```

Expected: If metadata is still placeholder-heavy or asset references are missing, fix those gaps in this task before considering the build release-ready.

- [ ] **Step 2: Finalize site metadata and static assets**

Update `src/data/site.ts`:

- replace placeholder email, GitHub, and LinkedIn values
- set the final `.eu` domain if already known, otherwise leave a clearly named temporary domain constant

Add:

- `public/favicon.svg`
- `public/og-default.svg`

Ensure the base layout references them correctly.

- [ ] **Step 3: Add deployment and local dev documentation**

Create `README.md` with:

- project purpose
- local setup commands
- test commands
- build command
- Cloudflare Pages deploy settings:
  - build command: `npm run build`
  - output directory: `dist`
- note that GitHub push can happen after implementation is complete

- [ ] **Step 4: Verify full release readiness**

Run:

```bash
npm run test:e2e
npm run build
```

Expected: PASS and a clean production build.

- [ ] **Step 5: Commit**

```bash
git add README.md public src/data/site.ts astro.config.mjs
git commit -m "docs: add deployment-ready portfolio docs"
```

## Verification Checklist

Before calling the implementation done:

- [ ] `npm run test:e2e` passes
- [ ] `npm run build` passes
- [ ] Home, About, Projects, Contact, and one project detail page all render
- [ ] Mobile menu opens/closes correctly
- [ ] 404 page renders on unknown routes
- [ ] Site remains fully static, with no database or backend dependencies
- [ ] README documents local dev and Cloudflare Pages deployment

## Notes for the Implementer

- Keep copy editable and centralized in data/content files.
- Avoid introducing React, Tailwind, or a CMS unless the user explicitly changes scope.
- Preserve the agreed direction: dark, technical, premium, balanced console influence.
- Prefer honest placeholders over inflated claims.
- Push to GitHub after the build is finished and verified, not in the middle of implementation, unless the user explicitly asks for remote backup sooner.
