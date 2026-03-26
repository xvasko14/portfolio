# Work Timeline Page

**Status:** Approved, ready for implementation planning

## Goal

Add a new `/work` page to the portfolio that displays Vasko Michal's full work history as a vertical timeline. The page follows the existing site aesthetic (dark background, accent colour, design tokens) and matches the pattern of the existing `/about` and `/projects` pages.

## Layout

Layout B: year column on the left, vertical centre line, role details on the right.

```
[ Sep 2025  ] |  DevOps Engineer
[ Now       ] |  Kajot · Brno
               |  Description...
               |
[ Nov 2021  ] |  DevOps Engineer
[ Aug 2025  ] |  Synottech · Brno
               |  Description...
```

- Two-column CSS grid: `90px` (year) + `1fr` (content)
- Vertical line rendered via `border-right` on the year column
- Dot on the line rendered via an absolutely-positioned inline element at each row
- Recent roles use `--accent` colour for year text and dot; older roles use `--muted`
- The `highlight` flag on each data record in `work.ts` determines which colour to use (`highlight: true` → accent, `highlight: false` → muted). Kajot and Synottech are `highlight: true`; all other roles are `highlight: false`

### Mobile

Below 640px, collapse to a single column: remove the year grid column, move the date inline above the role title as a small text line. The vertical line is hidden on mobile.

## Heading hierarchy

```
h1: "Where I have worked"   ← page hero
h2: each role title         ← one per job entry
```

## Content

Work experience only — no education section. Descriptions are hardcoded in `src/data/work.ts` by the implementer based on the CV copy provided below. No placeholder copy — real descriptions from day one.

All six positions, newest first:

| Period | Role | Company | highlight |
|---|---|---|---|
| Sep 2025 – Now | DevOps Engineer | Kajot, Brno | true |
| Nov 2021 – Aug 2025 | DevOps Engineer | Synottech, Brno | true |
| Oct 2020 – Sep 2021 | Build System Administrator | 2K Czech, Brno | false |
| Jun 2020 – Sep 2020 | QA Technician | 2K Czech, Brno | false |
| Feb 2019 – Jun 2019 | SW Support Engineer | ABB s.r.o, Czech Republic | false |
| Jul 2018 – Aug 2018 | Software Developer | Hatch Ltd, Canada | false |

### Descriptions (from CV)

**Kajot:** Kubernetes clusters in production, Argo CD GitOps deployments, Terraform and Ansible infrastructure provisioning, Docker workloads, Linux server administration for online game platforms and internal applications.

**Synottech:** CI/CD pipelines and product releases via Azure DevOps, monitoring with Grafana and Zabbix, Docker and Nomad containerisation, environment setup and configuration for domestic and international clients.

**2K Czech (Build System Admin):** Prepared and validated game builds using MS Build and Perforce. Ensured every build passed quality checks before release.

**2K Czech (QA Technician):** Summer position. Development assistant on an AAA title — testing and quality assurance during production.

**ABB s.r.o:** Part-time. Testing and fixing web applications and internal tools.

**Hatch Ltd:** Internship in Canada — developed an internal application for the company.

## Navigation

- Add `{ href: "/work", label: "Work" }` to `site.navigation` in `src/data/site.ts` between About and Projects
- Add `"/work": "Work"` to `mainRouteTitles` in `src/data/route-intros.ts`
- Add `"/work"` to `ROUTE_PATHS` set in `public/route-intros.js`

## Files

Implementation order matters — `src/data/route-intros.ts` must be updated before `work.astro` is created, because the page uses `mainRouteTitles["/work"]` which is typed `as const` and will cause a build error if the key is missing.

| File | Action |
|---|---|
| `src/data/work.ts` | Create — typed work experience data with `highlight` flag |
| `src/data/route-intros.ts` | Modify first — add `"/work": "Work"` to `mainRouteTitles` |
| `public/route-intros.js` | Modify — add `"/work"` to `ROUTE_PATHS` set |
| `src/data/site.ts` | Modify — add Work to navigation |
| `src/pages/work.astro` | Create — Work page (depends on route-intros.ts update) |
| `src/styles/global.css` | Modify — add `.work-timeline*` CSS |

## CSS tokens used

- `--accent` — year text and dot for `highlight: true` roles
- `--muted` — year text and dot for `highlight: false` roles
- `--text` — role title colour
- `--border` — timeline vertical line colour
- Page background inherits from `body` via existing global styles; no explicit `--background` needed on the timeline container

## Accessibility

- Page `<h1>` is "Where I have worked" in the hero section
- Each job role title is an `<h2>`
- Company + period are `<p>` elements
- Dot spans on the timeline line are `aria-hidden="true"` (decorative)
- No custom OG image; uses site default from BaseLayout

## What is not changing

- All existing pages and components remain untouched except nav additions
- No education section on this page
- No tech tag chips — description text covers the stack context
