# Architecture

How this project is put together — the rendering model, the data flow, the
theming system, and the reasoning behind the structure. For the quick
"how do I run / edit this" guide see the [README](../README.md).

## At a glance

```
Browser ── GET / ──▶ Vercel (static prerender)
                        │
                        ▼
   app/layout.tsx  ──  fonts, metadata, ThemeProvider, Nav / Footer / BackToTop
   app/page.tsx    ──  <Hero /> <About /> <ExperienceSection /> <Projects />
                        ▲
                        │  typed data (no fetching — all content is local)
   lib/data.ts     ──  socials · aboutParagraphs · experiences ·
                       skillGroups · projects
```

- **Framework**: Next.js 16, App Router, TypeScript, React 19.
- **Rendering**: the entire site is **statically prerendered at build
  time** (`○ Static` for every route). There is no server runtime work, no
  API routes, no database — content changes ship as commits.
- **Hosting**: Vercel, deploy-on-push.

## Directory structure

```
app/                     # Next.js App Router root
  layout.tsx             # root layout: fonts, metadata, ThemeProvider,
                         #   persistent UI (Nav, Footer, BackToTop)
  page.tsx               # the single page: composes the three sections
  globals.css            # Tailwind v4 entry + the two token palettes
  icon.svg               # favicon (auto-served by App Router convention)
  opengraph-image.tsx    # dynamic OG card, rendered to PNG at build time
components/
  sections/              # one file per page section
    hero.tsx             # client — clipboard interaction
    about.tsx            # server — pure data rendering
    experience.tsx       # server — pure data rendering
    projects.tsx         # server — pure data rendering
  nav.tsx                # client — scroll + IntersectionObserver state
  section-label.tsx      # server — the mono heading motif
  theme-toggle.tsx       # client — next-themes hook
  back-to-top.tsx        # client — scroll state
  footer.tsx             # server
  icons.tsx              # inline brand SVGs (GitHub, LinkedIn)
lib/
  data.ts                # ALL site content, as typed exported constants
  utils.ts               # cn() = clsx + tailwind-merge
public/                  # images referenced by lib/data.ts (logos,
                         #   screenshots, profile photo)
docs/                    # this file + personal working notes
```

## Content model — `lib/data.ts`

The single most important architectural decision: **components render
data; they contain no copy.** Every string a visitor reads lives in
`lib/data.ts` as a typed constant — the exceptions are micro-labels like
"View on GitHub" and the section headings themselves, which name the
layout rather than being content anyone would edit:

| Export             | Type                          | Rendered by         |
| ------------------ | ----------------------------- | ------------------- |
| `socials`          | `{ linkedin, github, email }` | Hero, Footer        |
| `aboutParagraphs`  | `string[]`                    | About               |
| `experiences`      | `Experience[]`                | Experience (rows)   |
| `skillGroups`      | `{ label, items }[]`          | About (label lines) |
| `projects`         | `Project[]`                   | Projects (cards)    |

Adding a job or project is appending an object (plus dropping an image in
`public/`); the components iterate arrays, so no markup changes. The
`satisfies` operator keeps entries checked against the `Experience` /
`Project` types while preserving literal types.

## Rendering model — server by default

Only four components ship JavaScript to the browser; everything else is a
React Server Component rendered to static HTML at build time:

| Client component | Why it needs JS                                      |
| ---------------- | ---------------------------------------------------- |
| `nav.tsx`        | IntersectionObserver active-section highlight; show-name-after-hero scroll state; same-hash re-scroll fix |
| `theme-toggle.tsx` | reads/writes the theme via `next-themes`           |
| `hero.tsx`       | "Contact me" copies the email to the clipboard       |
| `back-to-top.tsx`  | visibility tracks scroll position                  |

There is **no animation library**. Motion is limited to ~200ms CSS
transitions (hover states, theme cross-fade, the two fade-in buttons) and
smooth scrolling — no keyframes, no transforms beyond an 8px slide on the
back-to-top button.

`prefers-reduced-motion` is deliberately not handled. The motion here is
small enough that gating it wasn't worth the code on a single-page personal
site; visitors with the OS setting on get the same ~200ms fades as everyone
else.

## Theming

Three cooperating layers:

1. **`next-themes`** (`ThemeProvider` imported straight into
   `layout.tsx` — the package ships its own `"use client"` directive, so
   no local wrapper component is needed): dark is the
   default for everyone (`defaultTheme="dark"`, `enableSystem={false}`);
   the nav toggle switches to light and persists the choice in
   `localStorage`. The library toggles a `.dark` class on `<html>` before
   first paint (hence `suppressHydrationWarning` there).
2. **CSS variables** (`globals.css`): seven tokens per theme —
   `--background`, `--foreground`, `--muted-foreground`, `--line`,
   `--accent`, `--surface`, `--chip` — defined once under `:root` (light)
   and mirrored under `.dark`. Components never branch on theme; they
   reference tokens and the palette flips under them.
3. **Tailwind v4** (`@theme inline`): maps each variable to a utility
   namespace (`bg-background`, `text-accent`, `border-line`, …) and wires
   `dark:` to the class strategy via `@custom-variant`.

Palette ("Violet Thread"): dark = graphite `#161618` ground with violet
`#a78bfa` accent; light = white ground with deep violet `#6d28d9`. The
one asymmetric token is `--chip`, which stays light in both themes because
company wordmarks and screenshots are authored against light grounds.

The `ThemeToggle` uses `useSyncExternalStore` with different server/client
snapshots to render a placeholder until hydration — `resolvedTheme` is
unknowable on the server, and this avoids both a hydration mismatch and a
layout shift.

## Typography

Two faces, loaded through `next/font/google` (self-hosted at build time,
zero external requests, no FOUT):

- **Geist Sans** — everything by default (`--font-sans`).
- **Geist Mono** — the design's single motif: section labels, nav links,
  dates/locations, skill group labels, tag chips (`--font-mono`).

## Images

All images go through `next/image`:

- Hero photo: `fill` + explicit `sizes` + `priority` (it's the LCP
  element); `objectPosition: "center 22%"` biases the circular crop
  upward.
- Company logos: natural width/height recorded in `lib/data.ts` so the
  aspect ratio is known at build time; scaled by height in CSS.
- Project screenshots: `fill` with `object-contain`, so shots are
  letterboxed rather than cropped. The backdrop behind the letterboxing is
  `imageBg` per project, falling back to the light `--chip` token.

## SEO / sharing

- `app/layout.tsx` exports the `Metadata` object: title template,
  description, OpenGraph + Twitter card fields, `metadataBase` so relative
  image URLs resolve absolutely.
- `app/opengraph-image.tsx` renders the share card with `next/og`
  (Satori) at build time — App Router picks it up by file convention and
  injects the `og:image` tags automatically.
- `app/icon.svg` becomes the favicon the same way.

## Navigation behaviour worth knowing

- Anchor scrolling is handled manually in `nav.tsx` because native hash
  navigation no-ops when the URL hash already matches the target (click
  "About", scroll away, click "About" again). `history.replaceState`
  keeps the URL in sync without polluting history.
- `scroll-padding-top` in `globals.css` stops the sticky nav from
  covering section headings on anchor jumps.
- The nav name is hidden until the hero scrolls out of view (the hero
  already opens with the name at display size) and doubles as a
  scroll-to-top button.
- Both routes back to the top — the nav name and the `BackToTop` button —
  clear the section hash from the URL, so it doesn't still read
  `#projects` once you're sitting at the top of the page.
- `BackToTop`'s `right` offset is computed from the same `max-w-3xl` /
  `max-w-4xl` + `px-6` maths as the content column, so it aligns with the
  content edge on wide screens instead of drifting to the viewport edge.

## Build & deploy

```
npm run dev     # Turbopack dev server on :3000
npm run build   # production build — every route prerenders static
npm run lint    # eslint (next/core-web-vitals config)
```

Pushes to the tracked branch deploy via Vercel. The production domain is
<https://jake-squelch.vercel.app>. Because the whole site is static, a
deploy is effectively a CDN cache refresh — there are no runtime
environment variables, secrets, or services to configure.

## Dependency policy

Runtime dependencies are deliberately minimal: `next`, `react`,
`react-dom`, `next-themes`, `lucide-react` (utility icons), `clsx` +
`tailwind-merge` (the `cn()` helper). Brand icons that lucide doesn't
ship (GitHub, LinkedIn) are inlined as SVG paths in `components/icons.tsx`
rather than pulling in an icon-pack dependency.
