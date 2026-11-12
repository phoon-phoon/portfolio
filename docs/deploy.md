# Deploy (GitHub Pages)

Live URL: https://phoon-phoon.github.io/portfolio/

## How it works

- **Prerender** (`vite.config.ts`, `tanstackStart({ prerender })`): `npm run build` renders `/` to
  `dist/client/index.html` at build time, so the site is plain static files. `failOnError` fails the build
  if a page cannot render. There are no server functions or server routes, so nothing is lost.
- **Base path**: GitHub Pages serves a project site under `/portfolio/`. `base: '/portfolio/'` in
  `vite.config.ts` prefixes every asset URL, and `basepath: import.meta.env.BASE_URL` in `src/router.tsx`
  tells the router. In dev the site is at `http://localhost:3000/portfolio/`.
- **Workflow** (`.github/workflows/deploy.yml`): on every push to `main` (or a manual run from the Actions
  tab) it runs `npm ci`, `npm run typecheck`, `npm run build`, then uploads `dist/client` with the official
  Pages actions. Node 22.

## One-time setup

In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Without this the
deploy job fails with a "Pages not enabled" error. A private repo needs a paid plan for Pages.

## Moving to another domain

Change `base` in `vite.config.ts` (to `'/'` for a domain root), `profile.url` in `src/content.ts`, and
regenerate `public/og.png` (see [seo.md](seo.md)). For a custom domain also add `public/CNAME` and set it in
Settings → Pages; at a domain root a `public/robots.txt` then starts to count.

## Check a build locally

```bash
npm run build
mkdir -p /tmp/site && ln -sfn "$PWD/dist/client" /tmp/site/portfolio && python3 -m http.server 4173 -d /tmp/site
```

Then open http://localhost:4173/portfolio/.
