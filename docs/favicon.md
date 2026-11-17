# Favicon and app icons

All icons come from one image, `scripts/favicon-source.jpg`: a 900x900 3D chibi with a coffee on a white
background. They live in `public/` and are linked from `src/routes/__root.tsx` with
`import.meta.env.BASE_URL` in front, so they resolve under `/portfolio/` in both dev and production.

| File | Used by | How it is made |
| --- | --- | --- |
| `favicon.ico` (16, 32, 48) | Browser tabs, bookmarks, Windows | Face cropped (720x720 at +110+40), masked to a circle with transparent corners, so it reads on light and dark tab bars |
| `icon-192.png` | Higher-density tabs (linked as `rel=icon`), Android home screen | Whole image, square, white background |
| `apple-touch-icon.png` (180) | iOS and iPadOS home screen | Whole image, opaque square (iOS rounds the corners itself and turns transparency black) |
| `icon-512.png` | Android install and splash screens | Whole image |
| `icon-maskable-512.png` | Android adaptive icons (`purpose: maskable`) | Image at 410px on a 512 white square, so the circle and squircle masks don't cut the face |
| `manifest.webmanifest` | Android and Chromium "Add to home screen" | `start_url` and `scope` are `./`, so the installed shortcut opens `/portfolio/` |

The PNGs are reduced to 256 colours to keep them small (14 to 73 KB).

Browsers also request `/favicon.ico` from the domain root on their own. On GitHub Pages that path belongs to
the `phoon-phoon.github.io` user site, not this project, which is why the `<link rel="icon">` tags are needed.

## Regenerating

From `public/`, with ImageMagick 7:

```bash
S=../scripts/favicon-source.jpg
magick $S -crop 720x720+110+40 +repage -resize 256x256 -alpha set \( -size 256x256 xc:none -fill white -draw "circle 127.5,127.5 127.5,0.5" \) -compose DstIn -composite -define icon:auto-resize=48,32,16 favicon.ico
magick $S -resize 180x180 -colors 256 -strip apple-touch-icon.png
magick $S -resize 192x192 -colors 256 -strip icon-192.png
magick $S -resize 512x512 -colors 256 -strip icon-512.png
magick -size 512x512 xc:white \( $S -resize 410x410 \) -gravity center -composite -depth 8 -colors 256 -strip icon-maskable-512.png
```

`-alpha set` before the mask matters: without it the corners of the ICO come out black instead of transparent.

## Verified

The built `index.html` links all four, the dev server serves each file with the right content type, and
headless Chromium (`Page.getAppManifest`) parses the manifest with 3 icons and no errors. Not checked on a
real iPhone or Android home screen.
