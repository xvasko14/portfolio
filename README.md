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
npm run build
```

## Deployment

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`

The site is static, so no backend or database setup is required. GitHub push can happen after implementation is complete.

## Notes

- Site metadata is centralized in `src/data/site.ts`.
- Contact details and the `.eu` domain remain provisional until the final real-world values are available.
