# Contact Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current minimal contact page with a Dennis Snellenberg-style layout: split hero with portrait photo, full-width numbered Formspree form, direct contact links, and a live local time bar.

**Architecture:** Three tasks in sequence — copy the photo asset, rewrite `contact.astro` HTML (test-driven), then add the supporting CSS to `global.css` and remove the now-unused old contact styles. All data comes from the existing `site.contact` and `site.socials` objects — no new data files. The form action is hardcoded as a Formspree placeholder directly in `contact.astro`.

**Tech Stack:** Astro, vanilla CSS, vanilla JS (inline clock script), Formspree (external), Playwright

---

## File Structure

- `public/vasko.jpeg` — new photo asset, copied from `/home/vasko/osobne/Projekty/ja.jpeg`
- `src/pages/contact.astro` — full rewrite: new hero, form, contact links, bottom bar, inline clock script
- `src/styles/global.css` — remove old `.contact-card`, `.contact-card__availability`, `.contact-actions` rules; add new `.contact-hero`, `.contact-field`, `.contact-form`, `.contact-links-section`, `.contact-bar` rules
- `tests/e2e/smoke.spec.ts` — extend existing contact assertions to cover the form and photo

---

## Task 1: Copy Photo Asset

**Files:**
- Create: `public/vasko.jpeg`

- [ ] **Step 1: Copy the photo**

```bash
cp /home/vasko/osobne/Projekty/ja.jpeg "/home/vasko/osobne/Projekty/My Portfolio/public/vasko.jpeg"
```

Expected: `public/vasko.jpeg` exists.

- [ ] **Step 2: Verify**

```bash
ls -lh "/home/vasko/osobne/Projekty/My Portfolio/public/vasko.jpeg"
```

Expected: file listed, non-zero size.

- [ ] **Step 3: Commit**

```bash
git add public/vasko.jpeg
git commit -m "feat: add portrait photo asset"
```

---

## Task 2: Rewrite contact.astro (TDD)

**Files:**
- Modify: `tests/e2e/smoke.spec.ts`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Write the failing contact form assertions**

In `tests/e2e/smoke.spec.ts`, replace the contact block inside the existing `"about and contact pages expose key content"` test:

```ts
  await page.goto("/contact");
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
  // New: photo
  await expect(main.locator('img[src="/vasko.jpeg"]')).toBeVisible();
  // New: Formspree form with the four inputs
  await expect(main.locator('form[action*="formspree.io"]')).toBeVisible();
  await expect(main.locator('input[name="name"]')).toBeVisible();
  await expect(main.locator('input[name="email"]')).toBeVisible();
  await expect(main.locator('input[name="company"]')).toBeVisible();
  await expect(main.locator('select[name="services"]')).toBeVisible();
  // Existing: contact links still present
  await expect(main.getByRole("link", { name: "Email" })).toHaveAttribute("href", /^mailto:/);
  await expect(main.getByRole("link", { name: "LinkedIn" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Instagram" })).toBeVisible();
  await expect(main.getByRole("link", { name: "Facebook" })).toBeVisible();
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npm run test:e2e -- tests/e2e/smoke.spec.ts
```

Expected: FAIL — the current contact page has no form or photo.

- [ ] **Step 3: Rewrite contact.astro**

Replace the entire contents of `src/pages/contact.astro` with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import { site } from "../data/site";
---

<BaseLayout title="Contact" description="Contact Vasko Michal by email, LinkedIn, Instagram, or Facebook.">
  <main>
    <!-- Section 1: Hero -->
    <section class="contact-hero content-width">
      <div class="contact-hero__text">
        <p class="section-intro__eyebrow">Contact</p>
        <h1>Reach out if you need steadier infrastructure or cleaner delivery.</h1>
      </div>
      <div class="contact-hero__photo">
        <img src="/vasko.jpeg" alt="Vasko Michal" width="400" height="500" />
      </div>
    </section>

    <!-- Section 2: Form -->
    <section class="contact-form-section content-width">
      <form
        class="contact-form"
        action="https://formspree.io/f/YOUR_FORM_ID"
        method="POST"
      >
        <div class="contact-field">
          <span class="contact-field__number" aria-hidden="true">01</span>
          <div class="contact-field__body">
            <label class="contact-field__question" for="name">What&rsquo;s your name?</label>
            <input
              class="contact-field__input"
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div class="contact-field">
          <span class="contact-field__number" aria-hidden="true">02</span>
          <div class="contact-field__body">
            <label class="contact-field__question" for="email">What&rsquo;s your email?</label>
            <input
              class="contact-field__input"
              id="email"
              name="email"
              type="email"
              placeholder="john@doe.com"
              required
            />
          </div>
        </div>

        <div class="contact-field">
          <span class="contact-field__number" aria-hidden="true">03</span>
          <div class="contact-field__body">
            <label class="contact-field__question" for="company">What&rsquo;s the name of your company?</label>
            <input
              class="contact-field__input"
              id="company"
              name="company"
              type="text"
              placeholder="Acme Corp"
            />
          </div>
        </div>

        <div class="contact-field contact-field--last">
          <span class="contact-field__number" aria-hidden="true">04</span>
          <div class="contact-field__body">
            <label class="contact-field__question" for="services">What do you need help with?</label>
            <select
              class="contact-field__input contact-field__select"
              id="services"
              name="services"
            >
              <option value="" disabled selected>Infrastructure, CI/CD, Automation&hellip;</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="CI/CD">CI/CD</option>
              <option value="Automation">Automation</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div class="contact-form__submit">
          <button type="submit" class="button-link">Send message &rarr;</button>
        </div>
      </form>
    </section>

    <!-- Section 3: Contact links -->
    <section class="contact-links-section content-width">
      <div class="contact-links">
        <a href={site.contact.email.href}>{site.contact.email.label}</a>
        {site.socials.map((item) => (
          <a href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
        ))}
      </div>
      <p class="contact-availability">Currently available for new projects</p>
    </section>

    <!-- Section 4: Bottom bar -->
    <div class="contact-bar content-width">
      <span id="contact-local-time">Local time: &#8212;</span>
      <span>&copy; 2026 Vasko Michal</span>
    </div>
  </main>
</BaseLayout>

<script>
  function updateTime() {
    const el = document.getElementById("contact-local-time");
    if (!el) return;
    const now = new Date();
    const time = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    const tz =
      new Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
        .formatToParts(now)
        .find((p) => p.type === "timeZoneName")?.value ?? "";
    el.textContent = `Local time: ${time}${tz ? " " + tz : ""}`;
  }
  updateTime();
  setInterval(updateTime, 60_000);
</script>
```

> **After going live:** Replace `YOUR_FORM_ID` in the `action` attribute with the real ID from your Formspree dashboard.

- [ ] **Step 4: Run the smoke test to verify it passes**

```bash
npm run test:e2e -- tests/e2e/smoke.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.astro tests/e2e/smoke.spec.ts
git commit -m "feat: rewrite contact page with Dennis-style layout"
```

---

## Task 3: Add CSS and Remove Old Contact Styles

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Remove old contact CSS**

In `src/styles/global.css`, delete the following blocks (they are no longer used):

- `.contact-page { ... }` (lines ~469–472)
- `.contact-card { ... }` (lines ~474–485)
- `.contact-card__availability { ... }` (lines ~487–490)
- `.contact-actions { ... }` (lines ~492–496)

Also in the mobile `@media` block near the end of the file, remove the `.contact-actions` references from these two grouped selectors:

```css
/* Before — remove .contact-actions, lines from these two rules: */
.contact-actions,
.home-hero__actions,
.not-found-page__actions {
  width: 100%;
}

.contact-actions > *,
.home-hero__actions > *,
.not-found-page__actions > * {
  width: 100%;
}

/* After — keep only: */
.home-hero__actions,
.not-found-page__actions {
  width: 100%;
}

.home-hero__actions > *,
.not-found-page__actions > * {
  width: 100%;
}
```

- [ ] **Step 2: Add new contact page CSS**

Append the following block at the end of `src/styles/global.css`, before the closing media query for `prefers-reduced-motion` (or after it — just keep it grouped logically at the end of the file):

```css
/* ── Contact page redesign ──────────────────────────────────── */

.contact-hero {
  display: grid;
  grid-template-columns: 65fr 35fr;
  gap: var(--space-7);
  padding: var(--space-7) 0;
  align-items: start;
}

.contact-hero__photo img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  filter: grayscale(30%);
  object-fit: cover;
  display: block;
}

.contact-form-section {
  padding-bottom: var(--space-6);
}

.contact-form {
  padding: 0;
}

.contact-field {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 0 var(--space-4);
  align-items: start;
  padding: var(--space-6) 0;
  border-top: 1px solid var(--border);
}

.contact-field--last {
  border-bottom: 1px solid var(--border);
}

.contact-field__number {
  color: var(--muted);
  font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
  font-size: 0.85rem;
  padding-top: 0.4rem;
}

.contact-field__body {
  display: flex;
  flex-direction: column;
}

.contact-field__question {
  display: block;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-3);
  cursor: pointer;
}

.contact-field__input {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 1rem;
  font-family: inherit;
  padding: var(--space-3) 0;
  width: 100%;
  outline: none;
  caret-color: var(--accent);
}

.contact-field__input:focus {
  color: var(--text);
}

.contact-field__input::placeholder {
  color: var(--muted);
}

.contact-field__select {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

.contact-field__select option {
  background: var(--background);
  color: var(--text);
}

.contact-form__submit {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--space-6);
}

.contact-links-section {
  padding: var(--space-6) 0;
  border-top: 1px solid var(--border);
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-3);
}

.contact-links a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 150ms ease;
}

.contact-links a:hover {
  color: var(--accent);
}

.contact-availability {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 0;
}

.contact-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) 0;
  border-top: 1px solid var(--border);
  margin-bottom: var(--space-7);
  color: var(--muted);
  font-size: 0.85rem;
  font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
}

@media (max-width: 48rem) {
  .contact-hero {
    grid-template-columns: 1fr;
  }

  .contact-hero__photo {
    order: -1;
    max-width: 12rem;
  }
}
```

- [ ] **Step 3: Run the full test suite and build**

```bash
npm run test:e2e
npm run build
```

Expected: all tests pass, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add contact page redesign styles"
```

---

## Verification Checklist

Before calling this done:

- [ ] `npm run test:e2e` passes
- [ ] `npm run build` passes
- [ ] `/contact` renders the split hero with photo on the right
- [ ] All 4 numbered form fields are visible
- [ ] Submit button is right-aligned
- [ ] Email, LinkedIn, Instagram, Facebook links are visible below the form
- [ ] Local time updates in the bottom bar
- [ ] Mobile layout: photo stacks above statement, form fields stack cleanly
- [ ] `YOUR_FORM_ID` placeholder is noted — replace with real Formspree ID after account setup

## Notes

- The `button-link button-link--solid` classes on the `<button type="submit">` reuse the existing button CSS without modifying `ButtonLink.astro`.
- If the route intros feature has already been merged before this task runs, ensure the `<BaseLayout>` call in `contact.astro` includes the props `routeIntroMode="page-title"` and `routeIntroTitle="Contact"`.
