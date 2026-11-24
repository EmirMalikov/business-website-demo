# Business Website Demo

A responsive multi-page business website built with **Next.js (App Router)**, **React** and **TypeScript**, with a working admin panel preview for editing content.

**Live demo:** https://emirmalikov.github.io/business-website-demo/

> Corvana is a fictional company. All names and figures on the site are placeholders.

## What's inside

| Feature | How it works in the demo | In a production build |
|---|---|---|
| Pages | Home (hero, numbers, services, process), About, Services, Contact, 404 | Same, content from the CMS |
| Responsive layout | Desktop, tablet and mobile, light and dark theme | Same |
| Admin panel (`/admin/`) | Edit homepage, services and company info; changes appear on the live pages | Payload CMS: sign-in, roles, PostgreSQL, image uploads, drafts |
| Contact form | Validation, honeypot spam protection, messages land in the admin inbox | Server route stores the message and sends email notifications (Resend / SMTP), plus rate limiting |
| SEO | Per-page titles and descriptions, Open Graph, canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD | Same, editable per page in the CMS |
| Performance | Static export, self-hosted fonts via `next/font`, no images or heavy libraries on first load | Plus image optimisation and CDN caching |
| Accessibility | Semantic HTML, keyboard navigation, skip link, visible focus, reduced-motion support | Same |

## Project structure

```
app/                 Routes, metadata, sitemap and robots
components/          Header, footer, icons and content provider
components/views/    One view per page (home, about, services, contact, admin)
lib/content.ts       Typed content model and default content
lib/store.ts         Browser storage for the demo admin panel
```

All editable text lives in one typed model (`lib/content.ts`), so moving it to a CMS is a data-source swap and the page components do not change.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
```

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`). The same project deploys to Vercel with no changes; there the contact form can use a real server route for email.
