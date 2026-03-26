# Work Timeline Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/work` page with a vertical timeline of Vasko Michal's six work positions, wired into the site navigation and route-intro overlay system.

**Architecture:** A new `src/data/work.ts` holds the typed work entries. `src/pages/work.astro` renders the page using `BaseLayout` (same pattern as `about.astro`). The timeline is a two-column CSS grid (90px year + 1fr content) with a `border-right` vertical line and absolutely-positioned dots. Mobile collapses to single column below 640px.

**Tech Stack:** Astro 6, vanilla CSS (existing design tokens), TypeScript data file, Playwright e2e smoke test.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/data/work.ts` | Create | Typed `WorkEntry[]` with all six positions |
| `src/data/route-intros.ts` | Modify (add one key) | Register `/work` in `mainRouteTitles` — must happen before `work.astro` exists |
| `public/route-intros.js` | Modify (add one value) | Add `/work` to `ROUTE_PATHS` set so the overlay fires |
| `src/data/site.ts` | Modify (add one nav item) | Add Work link between About and Projects |
| `src/pages/work.astro` | Create | Renders the page using the data and timeline CSS |
| `src/styles/global.css` | Modify (append new block) | `.work-timeline*` styles + mobile breakpoint |
| `tests/e2e/smoke.spec.ts` | Modify | Add work nav link + work page assertions |

---

### Task 1: Wire navigation and add failing smoke test

**Files:**
- Modify: `src/data/route-intros.ts`
- Modify: `public/route-intros.js`
- Modify: `src/data/site.ts`
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Add `/work` to `mainRouteTitles` in `src/data/route-intros.ts`**

Open `src/data/route-intros.ts`. The current `mainRouteTitles` object looks like:

```typescript
export const mainRouteTitles = {
  "/": "Vasko Michal",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
} as const;
```

Add the `/work` key:

```typescript
export const mainRouteTitles = {
  "/": "Vasko Michal",
  "/about": "About",
  "/work": "Work",
  "/projects": "Projects",
  "/contact": "Contact",
} as const;
```

- [ ] **Step 2: Add `/work` to `ROUTE_PATHS` in `public/route-intros.js`**

Open `public/route-intros.js`. The current `ROUTE_PATHS` line looks like:

```javascript
const ROUTE_PATHS = new Set(["/", "/about", "/projects", "/contact"]);
```

Change it to:

```javascript
const ROUTE_PATHS = new Set(["/", "/about", "/work", "/projects", "/contact"]);
```

- [ ] **Step 3: Add Work to navigation in `src/data/site.ts`**

Open `src/data/site.ts`. The current `navigation` array:

```typescript
navigation: [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
],
```

Add Work between About and Projects:

```typescript
navigation: [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
],
```

- [ ] **Step 4: Add failing smoke test assertions**

Open `tests/e2e/smoke.spec.ts`. Extend the first test to check for the Work nav link:

```typescript
test("homepage exposes the site shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Vasko/i);
  await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /work/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /projects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
  // Hero assertions
  await expect(page.locator('img[src="/beh.jpg"]')).toBeVisible();
  await expect(page.locator(".home-hero__name")).toContainText("Vasko Michal");
});
```

Also add a new test block at the end of the file for the work page:

```typescript
test("work page shows timeline", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Where I have worked");
  await expect(page.getByRole("heading", { level: 2, name: /DevOps Engineer/i }).first()).toBeVisible();
});
```

- [ ] **Step 5: Run smoke tests to confirm they fail**

Make sure the dev server is running:

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio" && npm run dev &
sleep 5
```

Then run:

```bash
npx playwright test tests/e2e/smoke.spec.ts --reporter=line 2>&1 | tail -20
```

Expected: the `"work page shows timeline"` test FAILS with a 404 or heading-not-found error. The homepage nav-link test may also fail until the dev server restarts with the new nav data.

- [ ] **Step 6: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add src/data/route-intros.ts public/route-intros.js src/data/site.ts tests/e2e/smoke.spec.ts
git commit -m "feat: wire /work route into nav, route-intro system, and smoke tests"
```

---

### Task 2: Create the work data file

**Files:**
- Create: `src/data/work.ts`

- [ ] **Step 1: Create `src/data/work.ts`**

```typescript
export interface WorkEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlight: boolean;
}

export const work = {
  hero: {
    eyebrow: "Work",
    title: "Where I have worked",
    body: "Six years across gaming, fintech, and enterprise — building infrastructure, delivery pipelines, and operational tooling.",
  },
  entries: [
    {
      period: "Sep 2025 – Now",
      role: "DevOps Engineer",
      company: "Kajot",
      location: "Brno",
      description:
        "Kubernetes clusters in production, Argo CD GitOps deployments, Terraform and Ansible infrastructure provisioning, Docker workloads, Linux server administration for online game platforms and internal applications.",
      highlight: true,
    },
    {
      period: "Nov 2021 – Aug 2025",
      role: "DevOps Engineer",
      company: "Synottech",
      location: "Brno",
      description:
        "CI/CD pipelines and product releases via Azure DevOps, monitoring with Grafana and Zabbix, Docker and Nomad containerisation, environment setup and configuration for domestic and international clients.",
      highlight: true,
    },
    {
      period: "Oct 2020 – Sep 2021",
      role: "Build System Administrator",
      company: "2K Czech",
      location: "Brno",
      description:
        "Prepared and validated game builds using MS Build and Perforce. Ensured every build passed quality checks before release.",
      highlight: false,
    },
    {
      period: "Jun 2020 – Sep 2020",
      role: "QA Technician",
      company: "2K Czech",
      location: "Brno",
      description:
        "Summer position. Development assistant on an AAA title — testing and quality assurance during production.",
      highlight: false,
    },
    {
      period: "Feb 2019 – Jun 2019",
      role: "SW Support Engineer",
      company: "ABB s.r.o",
      location: "Czech Republic",
      description: "Part-time. Testing and fixing web applications and internal tools.",
      highlight: false,
    },
    {
      period: "Jul 2018 – Aug 2018",
      role: "Software Developer",
      company: "Hatch Ltd",
      location: "Canada",
      description: "Internship — developed an internal application for the company.",
      highlight: false,
    },
  ] satisfies WorkEntry[],
} as const;
```

- [ ] **Step 2: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add src/data/work.ts
git commit -m "feat: add work experience data"
```

---

### Task 3: Add timeline CSS

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Append `.work-timeline*` block to `global.css`**

Find the standalone `.site-footer {` block that starts with `padding: var(--space-7)` (around line 919 — not the earlier `.site-header, .site-footer { position: relative }` rule). Insert the following CSS block immediately before it:

```css
/* ─── Work timeline ─────────────────────────────────────── */

.work-timeline {
  display: flex;
  flex-direction: column;
  max-width: 680px;
}

.work-timeline__row {
  display: grid;
  grid-template-columns: 90px 1fr;
  position: relative;
}

.work-timeline__year {
  text-align: right;
  padding-right: 1.5rem;
  padding-top: 0.25rem;
  padding-bottom: 2.5rem;
  border-right: 2px solid var(--border);
  position: relative;
}

.work-timeline__row:last-child .work-timeline__year {
  padding-bottom: 0;
}

.work-timeline__dot {
  position: absolute;
  right: -5px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
}

.work-timeline__row--highlight .work-timeline__dot {
  background: var(--accent);
}

.work-timeline__period {
  display: block;
  font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.6;
  color: var(--muted);
}

.work-timeline__row--highlight .work-timeline__period {
  color: var(--accent);
}

.work-timeline__content {
  padding-left: 1.5rem;
  padding-bottom: 2.5rem;
}

.work-timeline__row:last-child .work-timeline__content {
  padding-bottom: 0;
}

.work-timeline__role {
  font-size: 1rem;
  font-weight: 700;
  color: color-mix(in srgb, var(--text) 60%, var(--muted));
  margin: 0 0 0.35rem;
  line-height: 1.3;
}

.work-timeline__row--highlight .work-timeline__role {
  color: var(--text);
}

.work-timeline__company {
  font-size: 0.78rem;
  color: var(--muted);
  margin: 0 0 0.6rem;
}

.work-timeline__desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--muted);
  margin: 0;
}

.work-timeline__row--highlight .work-timeline__desc {
  color: color-mix(in srgb, var(--text) 55%, var(--muted));
}

@media (max-width: 640px) {
  .work-timeline__row {
    grid-template-columns: 1fr;
  }

  .work-timeline__year {
    border-right: none;
    text-align: left;
    padding-right: 0;
    padding-bottom: 0.2rem;
    padding-top: 0;
  }

  .work-timeline__dot {
    display: none;
  }

  .work-timeline__content {
    padding-left: 0;
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add src/styles/global.css
git commit -m "feat: add work timeline CSS"
```

---

### Task 4: Create the work page

**Files:**
- Create: `src/pages/work.astro`

- [ ] **Step 1: Create `src/pages/work.astro`**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Section from "../components/ui/Section.astro";
import { work } from "../data/work";
import { mainRouteTitles } from "../data/route-intros";
---

<BaseLayout
  title="Work"
  description="Work history of Vasko Michal — DevOps Engineer with experience in Kubernetes, CI/CD, and infrastructure."
  routeIntroMode="page-title"
  routeIntroTitle={mainRouteTitles["/work"]}
>
  <Section class="page-hero">
    <div class="content-width">
      <p class="section-intro__eyebrow">{work.hero.eyebrow}</p>
      <h1>{work.hero.title}</h1>
      <p class="page-hero__lead">{work.hero.body}</p>
    </div>
  </Section>

  <Section>
    {/* No content-width wrapper here — intentional. Non-hero sections in about.astro
        also omit it. The .work-timeline has its own max-width: 680px constraint. */}
    <div class="work-timeline">
      {work.entries.map((entry) => (
        <div class={`work-timeline__row${entry.highlight ? " work-timeline__row--highlight" : ""}`}>
          <div class="work-timeline__year">
            <span class="work-timeline__dot" aria-hidden="true"></span>
            <span class="work-timeline__period">{entry.period}</span>
          </div>
          <div class="work-timeline__content">
            <h2 class="work-timeline__role">{entry.role}</h2>
            <p class="work-timeline__company">{entry.company} &middot; {entry.location}</p>
            <p class="work-timeline__desc">{entry.description}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git add src/pages/work.astro
git commit -m "feat: add work timeline page"
```

---

### Task 5: Verify and close

- [ ] **Step 1: Run the full smoke test suite**

Make sure dev server is running:

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio" && npm run dev &
sleep 5
```

Run tests:

```bash
npx playwright test tests/e2e/smoke.spec.ts --reporter=line 2>&1 | tail -30
```

Expected: all tests pass including the two new work assertions.

- [ ] **Step 2: Visual check in browser**

Open http://localhost:4321/work and verify:

1. "Work" nav link is visible in the header
2. Page hero shows "Where I have worked" as `<h1>`
3. Timeline renders with years on the left, vertical line, roles on the right
4. Kajot and Synottech rows have cyan/accent year text and dots
5. Older rows (2K Czech, ABB, Hatch) are visibly more muted
6. Scrolling to bottom — last entry has no extra space below
7. Resize browser to < 640px — single column layout, no vertical line

- [ ] **Step 3: Push to GitHub**

```bash
cd "/home/vasko/osobne/Projekty/My Portfolio"
git push
```
