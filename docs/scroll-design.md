# Scroll design

Built with the `scroll-craft` method (brief, grammar, feeling curve, signature move, verification). Its plain-HTML
engine is not used: the page is React, and motion comes from `react-scroll-parallax` and CSS. The full brief is
`scrollcraft/builds/portfolio/BRIEF.md`.

## Grammar: chaptered editorial

No fixed top bar. A folio in the left margin (`Folio.tsx`) lists the chapters and highlights the one under the
middle of the viewport (IntersectionObserver). On screens under 64rem only the current chapter shows, bottom-left.

| Chapter | Section id | Device |
| --- | --- | --- |
| Title | `title` | Parallax planes, far to near: hollow `phoon` (speed -22), chibi portrait with a light pool and contact shadow (speed -8), the name, layout guides with a live `h1 W × H` tag (0 at load, -160px by 900px scroll), grain |
| I Practice | `practice` | Static text, the quiet before the peak |
| II Render | `render` | Pinned stage, signature move (below) |
| III Stack | `stack` | `reveal-on-scroll` (CSS `animation-timeline: view()`) |
| IV Work | `work` | Pinned horizontal timeline, first job to today (`n × 70vh + 100vh`); repos rise with `reveal-on-scroll` after it |
| V Colophon | `contact` | Held close, CTA as a running-text link; a coffee chibi (speed -6) walks in from the right (`arrive-on-scroll`, CSS `view()` timeline), right of the copy on desktop, above it on phones |

## Signature move: Render

`Render.tsx` pins a sentence for 260vh (300vh from `sm`). `useParallax({ onProgressChange })` reports progress
across the whole section; it is remapped to the sticky span only and written to `--p` (0..1) on the stage. No
React re-render per frame.

CSS reads `--p` through two utilities in `app.css`: `window-in` / `window-out` fade a layer over the window
`[--a, --b]`. In order: margin hatch fades out, padding hatch fades out, the dashed content box with its measured
size fades out, the outline type is covered by the painted type, and the stage label moves Layout, Paint, Composite.

`--p` defaults to `1` (the finished, painted state), so SSR output, no-JS visitors and crawlers see the real sentence.

The hero clips only horizontally (`overflow-x-clip`) so the far planes settle into chapter I's top padding
instead of being cut by a hard edge. The light pool behind the portrait exists because the black suit
disappears on the off-black canvas. On phones the hero copy is top-anchored so the portrait sits below it.

Three chibis carry the arc: greeting at the title, jogging along the Work timeline, coffee at the Colophon (an
invitation to talk). The greeting and the coffee face left, toward the copy; the runners are mirrored to face
right, their direction of travel. Their light pools overflow the figure, so Work and the
Colophon clip horizontally (`overflow-x-clip`) like the hero.

### Work: the horizontal timeline (feeling: Momentum)

`src/components/Timeline.tsx` pins one stage, oldest role first (it reverses the newest-first lists in
`content.ts`). At the bottom, a track runs from the first job (Oct 2015) to today, with a tick and label per
year (`'16` on phones). The accent fill and dot mark the distance covered so far.

- **Scroll mapping.** Each of the six roles gets an equal stretch of scroll, so a ten-month role is as
  readable as a four-year one. Inside its stretch, the runner covers that role's dates. He speeds up on
  long roles and slows down on short ones.
- **Crossfade.** Role panels stack in one grid cell. A role's panel fades in when the runner reaches its
  start date: opacity only, over 15% of a role's stretch, so a company name shared by consecutive roles
  doesn't double.
- **Shirts.** There is one run cycle per company (`run-*.webp`), stacked in the runner box. The current
  role's company is at opacity 1 and the others at 0, with a 300ms transition, so he changes shirts as he
  crosses into a new company.
- **Run cycle.** Each strip holds head-aligned 1:2 frames (8, 7 and 8), shown as a background with
  `background-position-x` stepped through `--frame`.
  - **Pacing.** Frames step by scroll (one per 3.5% of the viewport height), not by time, so he stops when
    the scroll stops. Scroll pacing keeps one cadence on short and long roles; on the four-year role his
    feet slide a little, which reads better than a slow walk.
  - **Bounce.** The frames carry their own bounce; there is no synthetic bob.
  - **Adding a company.** Add an entry to `cycles` in `Timeline.tsx`. The year over his head comes from the
    same value as his position, so the two always agree.
- **Dates.** They are parsed from `period` (`'Mon YYYY – Mon YYYY'` or `'Present'`), so a new role needs only
  a new entry in `content.ts`.
- **Short phones.** A stage taller than the viewport sets its sticky `top` to `viewport − height`, so it pins
  by its bottom and the track stays in view. At 375×667 that hides about 8px.
- **Reduced motion.** The wrapper is not tall, the panels are an ordinary list, and the track is hidden.

## Reduced motion

`prefers-reduced-motion: reduce` sets `ParallaxProvider isDisabled`, so no layer moves and `--p` stays `1`.
The Render section drops its pinned height (`motion-safe:` heights) and `reveal-on-scroll` does not animate.

## Tokens

Defined in `@theme` in `src/styles/app.css`: `canvas #0e0f0c`, `surface`, `ink #ece8dd`, `ink-soft #a3a394`,
`line`, `accent #ff6a3d`, `accent-ink`. Fonts: Archivo (variable width, display and body) and Geist Mono (labels).

## Verification done

Headless Chromium screenshots at 1440×900, 390×844, and 1440×900 with reduced motion, at the hero, six points
through Render, and each later chapter. Checked: `--p` reaches 0 to 1 across the pin, no horizontal overflow,
no console errors, reduced-motion page 1800px shorter. Not checked: a real phone, Firefox/Safari, a screen reader.
