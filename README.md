# My Portfolio

Static Astro portfolio for a DevOps developer. Cloudflare Pages is the documented deployment target, with content and metadata kept in the repo.

## Prerequisites

- Node.js 22.12.0 or newer
- npm

## Local setup

```bash
npm install
npm run dev
```

## Checks

```bash
npm run test:e2e
npm run test:e2e:preview
npm run build
```

`npm run test:e2e:preview` runs the same Playwright suite against a lightweight static server serving the built `dist/` output.

## Deployment

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`

The site is static, so no backend or database setup is required. GitHub push can happen after implementation is complete.

## Notes

- Site metadata is centralized in `src/data/site.ts`, and URL-dependent tags are gated in `src/layouts/BaseLayout.astro`.
- Contact details and the `.eu` domain remain provisional until the final real-world values are available.
