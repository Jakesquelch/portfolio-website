# Portfolio Website — Plan

## Why I'm building this

I'm a software developer, and I want a personal portfolio site that genuinely
stands out — not another grid-of-cards template. The aesthetic I'm going for
is **futuristic, glassmorphic (Apple-style frosted glass), space/stars
themed, with reactive animations**, while staying **fast** (no janky 30fps
scrolling).

The site needs to showcase Hero/About, Skills, Projects, and Experience, and
deploy to Vercel. The success criterion I care about most is the
**wow-on-first-load reaction** — a visitor should think "I haven't seen one
like this before" — without sacrificing Lighthouse performance.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript** | SSR, file-based routing, `next/image`, deploys to Vercel in one click |
| Styling | **Tailwind CSS v4** | Required by shadcn; ergonomic for glassmorphism |
| Components | **shadcn/ui** | Owned components, Radix primitives, easy theming |
| Animation | **Motion** (formerly Framer Motion) | GPU-accelerated transforms, scroll triggers, layout animations |
| 3D / Background | **`@react-three/fiber` + `@react-three/drei`** | WebGL starfield via instanced points (single draw call) |
| Theme | **`next-themes`** | Default dark, with a toggle later if I want one |
| Icons | **`lucide-react`** | Bundled with shadcn |
| Fonts | **Geist Sans + Space Grotesk** | Sleek, slightly futuristic; both via `next/font` (no FOUT) |
| Deploy | **Vercel** | Zero-config |

---

## File structure

```
Portfolio-Website/
├── app/
│   ├── layout.tsx              # ThemeProvider, fonts, metadata
│   ├── page.tsx                # Single-page composition of all sections
│   ├── globals.css             # Tailwind + CSS vars (space palette)
│   └── favicon.ico
├── components/
│   ├── sections/
│   │   ├── hero.tsx            # Name, tagline, scroll cue
│   │   ├── about.tsx           # Glass panel with bio
│   │   ├── skills.tsx          # Constellation-style skill grid
│   │   ├── projects.tsx        # Glass project cards w/ 3D tilt
│   │   └── experience.tsx      # Vertical timeline
│   ├── three/
│   │   ├── starfield.tsx       # Instanced points, mouse parallax
│   │   └── nebula-mesh.tsx     # Slow color-shifting gradient mesh
│   ├── ui/                     # shadcn primitives (Card, Button, Badge…)
│   ├── glass-card.tsx          # Reusable glassmorphism wrapper
│   ├── nav.tsx                 # Sticky glass nav, active-section highlight
│   ├── cursor-glow.tsx         # Stardust trail behind the cursor
│   └── theme-provider.tsx
├── lib/
│   ├── utils.ts                # `cn()` helper (shadcn default)
│   └── data.ts                 # Skills/projects/experience as typed data
├── public/
│   ├── projects/               # Project screenshots
│   └── resume.pdf              # Optional
├── components.json             # shadcn config
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## Design system

**Palette** (CSS variables in `globals.css`, all in oklch):
- Background: deep space — near-black with a hint of cobalt
- Glass surface: translucent white at ~4% alpha
- Glass border: white at ~8% alpha
- Cyan accent: ~`#7dd3fc` — highlights, links, primary
- Violet accent: ~`#a78bfa` — secondary glow, accent
- Foreground text: cool white

**Glass recipe** (the `.glass` utility):
```
backdrop-filter: blur(20px) saturate(140%);
background: white at 4% alpha;
border: 1px solid white at 8% alpha;
inset highlight + drop shadow;
```

**Type scale**: Geist for body, Space Grotesk for `<h1>`/`<h2>`, slight
negative letter-spacing on display sizes.

---

## The "wow" layer

These are the bits most portfolios don't do. Keeping them performant is the
design constraint.

1. **WebGL starfield background** — ~2000 instanced points, single draw call.
   Stars twinkle (sin-wave alpha) and rotate slowly. Mouse position parallaxes
   the camera by a couple of degrees. Lazy-loaded with `next/dynamic({ ssr: false })`.
2. **Stardust cursor trail** — small cyan/violet glints spawn behind the
   cursor on movement and fade out. Subtle. Disabled on touch + reduced motion.
3. **Constellation skill grid** — skills are nodes; on hover, SVG lines animate
   between related skills (e.g., React ↔ TypeScript ↔ Next.js).
4. **Scroll-driven camera depth** — the starfield camera `z` is bound to
   scroll progress via `useScroll`, so scrolling feels like flying forward
   through space.
5. **Glass project cards with 3D tilt** — CSS `perspective` + `rotateX/Y`
   based on cursor offset; cheap, runs on the compositor.
6. **Aurora mesh on hero** — slow-shifting conic gradient behind the
   headline. Pure CSS, no JS.
7. **Active-section glass nav** — pill that morphs (`layoutId`) between
   active links via Motion.

---

## Performance guardrails (non-negotiable)

- **Starfield**: instanced geometry, no per-frame allocations, `frameloop="demand"`
  when off-screen via IntersectionObserver.
- **Reduced motion**: `useReducedMotion()` from Motion → skip starfield
  (replace with a static SVG noise) and disable parallax.
- **Lazy load Three.js**: `next/dynamic` on the starfield component (saves
  ~150KB on initial bundle for users who haven't scrolled past hero).
- **Animations on transform / opacity only** — never `top`/`left`/`width`.
- **`next/image`** for all project screenshots, with proper `sizes`.
- **Lighthouse target**: Performance ≥90, A11y ≥95.

---

## Build phases

1. **Scaffold** — Next.js + TypeScript + Tailwind + shadcn, install
   `motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `next-themes`.
2. **Foundation** — theme provider, fonts, `globals.css` with the palette,
   `glass-card.tsx`, `nav.tsx`, `cursor-glow.tsx`.
3. **Starfield + nebula** — `components/three/starfield.tsx` lazy-loaded into
   `layout.tsx` as a fixed full-viewport background.
4. **Hero** — name, tagline, scroll cue. Aurora gradient.
5. **About** — single glass panel, headshot or initial avatar, 2–3 paragraph
   bio.
6. **Skills** — constellation grid sourced from `lib/data.ts`.
7. **Projects** — glass cards with tilt, link to repo + live demo. Placeholder
   content first; I'll swap in real projects later.
8. **Experience** — vertical timeline, glass dots on a gradient line.
9. **Polish** — mobile responsive (starfield density ↓ on mobile),
   reduced-motion path, favicon, OG image, `<title>` and meta.
10. **Deploy** — Vercel, custom domain later if I want one.

Content (skills list, project descriptions, work history) starts as
placeholders in `lib/data.ts` so the structure is in place — I can swap real
content in without touching the components.

---

## Verification

After implementation:

1. **Visual check** — `npm run dev`, open <http://localhost:3000>, scroll
   through every section. Confirm stars render, cursor trail spawns, glass
   panels look frosted, nav highlights active section.
2. **Performance** — Chrome DevTools Performance tab, record a scroll from
   top to bottom. Confirm 60fps, no long tasks >50ms.
3. **Reduced motion** — toggle `prefers-reduced-motion: reduce` in DevTools'
   rendering panel. Confirm starfield is replaced with the static fallback
   and parallax is disabled.
4. **Mobile** — DevTools device emulation (iPhone 14, Pixel 7). Confirm
   layout stacks, starfield density is reduced, no horizontal scroll.
5. **Lighthouse** — Performance ≥90, Accessibility ≥95, Best Practices ≥95,
   SEO ≥95.
6. **Build** — `npm run build` passes with no TypeScript or ESLint errors.
7. **Deploy** — push to Vercel, verify production URL renders identically.
