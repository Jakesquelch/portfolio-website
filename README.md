# Portfolio Website

Personal portfolio site for Jake Squelch — a single-page, dark-by-default,
glass-on-starfield site built with Next.js 16.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with shadcn-style CSS variables
- **Motion** (formerly Framer Motion) for entrance + scroll animations
- **next-themes** (currently pinned to dark; toggle planned)
- **Geist Sans + Geist Mono + Space Grotesk** via `next/font`
- Deployed on **Vercel**

## Sections

The page is composed in `app/page.tsx` as a single column:

1. **Hero** (`components/sections/hero.tsx`) — circular profile picture, name in
   gradient text, tagline, social row + Contact button (which copies the email
   to clipboard alongside the `mailto:` navigation).
2. **About** (`components/sections/about.tsx`) — bio + photo, then an embedded
   experience timeline with circular duration rings.
3. **Projects** (`components/sections/projects.tsx`) — vertical stack of wide
   horizontal glass cards with a 3D mouse-tilt on hover.

Plus three persistent UI elements rendered from `app/layout.tsx`:

- **Nav** (`components/nav.tsx`) — fixed glass pill, IntersectionObserver-driven
  active-section highlight, layout-animated indicator. Switches to a heavier
  glass variant once you scroll past the hero. Mobile collapses to a glass
  hamburger dropdown.
- **Starfield** (`components/starfield-svg.tsx`) — 300 SVG circles at fixed
  percentage coordinates, generated once at module load via a seeded PRNG.
  Server component, zero JS shipped.
- **BackToTop** (`components/back-to-top.tsx`) — glass orb that fades in once
  the user scrolls past ~60% of the viewport height.
- **Footer** (`components/footer.tsx`) — divider, socials, copyright.

## Editing content

All copy + data lives in [`lib/data.ts`](lib/data.ts):

- `socials` — LinkedIn / GitHub / email, shared by Hero and Footer.
- `about.heading` + `about.paragraphs` — bio.
- `experiences[]` — each renders as a card with a duration ring.
  `months / 12` controls how far the gradient stroke wraps.
- `projects[]` — each renders as a horizontal card. Set `image` or `github`
  to `null` to render the placeholder / "coming soon" fallbacks.

Section components don't bake copy into JSX — edit `lib/data.ts` and the
layout updates.

## Local dev

```bash
npm install
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
  layout.tsx              # fonts, ThemeProvider, persistent UI, metadata
  page.tsx                # composes Hero / About / Projects
  globals.css             # Tailwind v4 + tokens + .glass utilities
  icon.svg                # favicon (gradient sparkle on cosmic indigo)
  opengraph-image.tsx     # dynamic 1200×630 OG card via next/og
components/
  sections/               # Hero / About / Projects
  nav.tsx                 # sticky glass nav + mobile dropdown
  starfield-svg.tsx       # static SVG starfield background
  back-to-top.tsx         # fixed glass scroll-to-top button
  footer.tsx              # divider + socials + copyright
  icons.tsx               # inline LinkedIn + GitHub SVGs (lucide dropped brands)
  theme-provider.tsx      # next-themes wrapper
lib/
  data.ts                 # all site copy as typed data
  utils.ts                # cn() helper
public/
  profile-pic.png         # used in Hero
  about-pic.png           # used in About
```

## Design system

Defined in `app/globals.css`:

- Palette in oklch — deep cosmic indigo background, cyan + violet accents.
- `.glass`, `.glass-strong`, `.glass-strong-elevated` — three escalating
  frosted-glass utilities (translucent fill + backdrop-blur + inset highlight
  + drop shadow). The "elevated" variant is what the nav switches to once you
  scroll off the hero.
- `.text-gradient` — cyan → violet linear gradient clipped to text.
- A `prefers-reduced-motion: reduce` block disables all animation and smooth
  scrolling site-wide.

## Performance notes

- Starfield is a server-rendered SVG — no JS, no canvas, no WebGL.
- Animations only touch `transform` / `opacity`. No `top` / `left` / `width`.
- Project tilt mutates `style.transform` directly in a mousemove handler
  (no React re-renders, runs on the compositor).
- Scroll listeners are `{ passive: true }`.
- `next/image` with explicit `sizes` for the profile and about photos.
- `priority` on the hero photo only.

## Deploy

`git push` to a branch tracked by Vercel; the site builds and deploys on push.
Domain: <https://jakesquelch.dev>.
