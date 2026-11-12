# SEO and share previews

Everything is in `src/routes/__root.tsx`, built from `src/content.ts`. The page is server-rendered, so
scrapers that do not run JavaScript (LINE, LinkedIn, Slack, Facebook) see all of it.

## Site URL

`profile.url` in `src/content.ts` is the production origin: `https://phoon-phoon.github.io/portfolio/`
(GitHub Pages project site, trailing slash kept). The canonical link, `og:url`, `og:image` and the JSON-LD
`url`/`image` are all built from it. Moving to another domain is a one-line change there, then regenerate
`og.png` (the URL is printed on the card).

## What is in the head

- `<title>` and `description` from `profile.name`, `profile.role`, `profile.summary`.
- `link rel="canonical"`.
- Open Graph: `og:site_name`, `og:title`, `og:description`, `og:type=profile`, `og:url`, `og:image` with
  width, height and alt, and `profile:first_name`, `last_name`, `username`.
- `twitter:card=summary_large_image` (X reads the `og:*` tags for the rest).
- JSON-LD `Person`: name, handle, job title, LinkedIn and GitHub as `sameAs`, current employer
  (`experience[0].company`) and school (`education`).

## Share card

`public/og.png` is 1200x630. It is a screenshot of `scripts/og-card.html`, which reuses the hero's look:
the name in Archivo 800 inside the dashed accent box, the hollow "phoon", and the chibi from
`src/assets/portrait.webp`. The card's text is written in the HTML, not read from `content.ts`, so edit it
there when the name, role or URL changes. Regenerate (needs network for Google Fonts):

```bash
chromium --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 --allow-file-access-from-files \
  --screenshot=public/og.png "file://$PWD/scripts/og-card.html"
```

Scrapers cache previews. After changing the card, re-scrape with the LinkedIn Post Inspector or the
Facebook Sharing Debugger.

## Not added, on purpose

- **robots.txt / sitemap.xml**: crawlers only read `robots.txt` at the host root
  (`phoon-phoon.github.io/robots.txt`, the user site), never under `/portfolio/`. A one-page site needs
  no sitemap. Add both if the site moves to its own domain.

## Checking

```bash
npm run dev
curl -s http://localhost:3000/portfolio/ | grep -E 'og:|twitter:|canonical|ld\+json'
```

After deploy: Google Rich Results Test on the live URL for the `Person` data, and the LinkedIn Post
Inspector for the card.

## Deploy

See [deploy.md](deploy.md).
