# V2 rendering and desktop scale

## Rendering

- Yarn previews and their alpha masks are generated before deployment by
  `npm run assets:knit` (`scripts/render-knit-assets.mjs`). The source images
  remain in `public/assets/v2-thumbs`; generated WebP files are committed under
  `public/assets/v2-knit`. Sharp is a development-only dependency.
- Previews have 780px and 1560px variants with responsive `srcset`/`sizes`.
  All nine works are present in the static HTML, with native anchor navigation
  and native document scrolling. No Canvas renderer is downloaded for TOP.
- The original photograph is revealed through the baked silhouette on hover.
  A small pointer-driven polygon updates only for the active card; it has no
  idle animation loop. Keyboard focus also reveals the photograph.
- The pastel background uses two pre-rendered fields with a slow CSS opacity
  change, disabled by `prefers-reduced-motion`. Full-page case-study blur and
  individual wordmark-stitch filters are removed in V2.
- Loading no longer waits for a yarn-rendering event. Its normal minimum is
  900ms and its asset wait limit is 2500ms. It never intercepts pointer input;
  a CSS 3-second failsafe and the no-script style prevent a persistent cover.

## Responsive sizing

`app/v2/v2-scale.css` defines `--v2-px` (1–1.75px), increasing above a 1280px
viewport, and caps the composition at 2240px. Shared CSS lengths use this unit
with a 1px fallback so non-V2 pages keep their existing sizes. Media-query
breakpoints are deliberately not scaled. The entire two-column archive is
centred after the cap; its columns no longer drift toward opposite edges.

## Verification (2026-10-05)

- TypeScript, whitespace checks, and the production static build passed.
- Static image audit: 56 generated HTML files, 190 image URLs/assets, no
  missing or non-static image references.
- Browser checks on the production export at 390px and 2560px widths: all nine
  detail routes loaded with no horizontal overflow. At 2560px, body copy was
  24.5px and the content wrapper was 2240px. At 390px, body copy stayed 14px.
- TOP: 0 canvases (previously 21); hover reveals the source photograph;
  keyboard activation reaches a detail page.
- ABOUT: initial frame is the open-hand frame; horizontal pointer movement
  changes the frame and text width. At 1920px, the width ranges from 270px to
  930px; the open state uses 27px text. At 390px, initial profile text finishes
  before the records begin, with no horizontal overflow.
- CPU throttled 6× in the browser: TOP and ABOUT navigation completed and the
  loading overlay cleared. A 3.06-second idle sample recorded 8.6ms of JS work
  and no layout passes. This is a diagnostic sample, not an Intel benchmark.
- JavaScript disabled: all nine works were present and native End navigation
  reached the final card (visible within a 900px viewport); loader was hidden.

Intel hardware and older Safari versions have not been tested directly.
