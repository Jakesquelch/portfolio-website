# Portfolio Website

Personal portfolio website built with Next.js 16. With the aim to give a bit more of a background and some information on myself.

For a full tour of how the app is put together, see
[`docs/architecture.md`](docs/architecture.md).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with a small CSS-variable token set (7 tokens per theme)
- **next-themes** (dark by default, top-right toggle to light)
- **Geist Sans + Geist Mono** via `next/font`
- Deployed on **Vercel**

No animation library — the only motion is ~200ms CSS transitions on hovers,
the theme cross-fade, and smooth scrolling.

## Design — "Violet Thread"

Quiet, data-first design: neutral ground, one violet accent, and a single
recurring motif — monospace uppercase section labels (the `SectionLabel`
component) with hairline rules. Dark and light palettes are mirrored
token-for-token in `app/globals.css`:

- **Dark (default)**: soft graphite `#161618` (not black), lighter violet
  `#a78bfa` accent.
- **Light**: white ground, near-black ink, deep violet `#6d28d9`.
- `--chip` stays light in both themes — company logos and screenshots are
  authored against light grounds.

Mono (Geist Mono) is used for: section labels, nav links, dates/locations,
skill group labels, and project tag chips. Everything else is Geist Sans.

## Sections

The page is composed in `app/page.tsx` as a single column:

1. **Hero** (`components/sections/hero.tsx`) — name + role on the left,
   circular profile picture on the right (stacks photo-first on mobile).
   Social icon buttons + a Contact button that copies the email to
   clipboard alongside the `mailto:` navigation (the site's contact
   entry point, now that the nav has no Contact link).
2. **About** (`components/sections/about.tsx`) — bio paragraphs and a
   one-line-per-group skills block.
3. **Experience** (`components/sections/experience.tsx`) — one row per
   job: company wordmark on a light chip, role + context, period/location
   in mono.
4. **Projects** (`components/sections/projects.tsx`) — wide horizontal
   cards: image left (~38%), content right, stacking on mobile.

Persistent UI rendered from `app/layout.tsx`:

- **Nav** (`components/nav.tsx`) — sticky top bar: name (left, scrolls to
  top; fades in only after scrolling past the hero so the page doesn't
  read "Jake Squelch" twice at once), mono section links (About /
  Experience / Projects) + theme toggle (right). IntersectionObserver
  drives the active-link highlight. No hamburger — the links fit on
  mobile as-is (the name hides below `sm`).
- **ThemeToggle** (`components/theme-toggle.tsx`) — bordered circle in the
  nav, sun ↔ moon.
- **BackToTop** (`components/back-to-top.tsx`) — bordered circle that fades
  in past ~60% of the viewport height, aligned to the content column's
  right edge rather than the viewport's.
- **Footer** (`components/footer.tsx`) — hairline rule, socials, copyright.

## Editing content

All copy + data lives in [`lib/data.ts`](lib/data.ts):

- `socials` — LinkedIn / GitHub / email, shared by Nav, Hero and Footer.
- `aboutParagraphs` — bio, rendered in order.
- `experiences[]` — one row each; `logo` needs the image's natural
  width/height so `next/image` knows the aspect ratio.
- `skillGroups[]` — each group renders as one labelled line.
- `projects[]` — each renders as a horizontal card. Set `image` or `github`
  to `null` for the placeholder / "coming soon" fallbacks; set `imageBg` to
  the screenshot's own background colour so its letterboxing blends in.

Section components don't bake copy into JSX — edit `lib/data.ts` and the
layout updates.

## Local dev

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build       # production build
npm run lint        # eslint
```

## File layout

```
app/
  layout.tsx              # fonts, ThemeProvider, Nav/Footer/BackToTop, metadata
  page.tsx                # composes Hero / About / Projects
  globals.css             # Tailwind v4 + the two token palettes
  icon.svg                # favicon
  opengraph-image.tsx     # dynamic 1200×630 OG card via next/og
components/
  sections/               # Hero / About / Experience / Projects
  nav.tsx                 # sticky top nav + active-section highlight
  section-label.tsx       # the mono section-heading motif
  theme-toggle.tsx        # sun/moon toggle (lives in the nav)
  back-to-top.tsx         # fixed scroll-to-top button
  footer.tsx              # rule + socials + copyright
  icons.tsx               # inline GitHub + LinkedIn SVGs (simple-icons paths)
lib/
  data.ts                 # all site copy as typed data
  utils.ts                # cn() helper
public/
  profile-pic.webp        # hero photo
  ibm.png, civico.png     # experience wordmarks
  *-project.*             # project screenshots
```

## Performance notes

- About, Projects and Footer are **server components** — zero JS shipped.
- Client JS is limited to the nav (observer + smooth scroll), theme toggle,
  hero contact button, and back-to-top.
- Scroll listeners are `{ passive: true }`.
- `next/image` with explicit `sizes`; `priority` on the hero photo only.
- `prefers-reduced-motion` collapses all transitions and smooth scrolling.

## Deploy

`git push` to a branch tracked by Vercel; the site builds and deploys on push.
Domain: <https://jake-squelch.vercel.app>.
