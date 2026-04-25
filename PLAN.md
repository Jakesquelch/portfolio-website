# Portfolio Website — Plan

## Context

Jake is a software developer who wants a personal portfolio site that genuinely stands out — not another grid-of-cards template. The aesthetic he wants is **futuristic, glassmorphic (Apple-style frosted glass), space/stars themed, with reactive animations**, while staying **fast** (no janky 30fps scrolling).

The site will showcase Hero/About, Skills, Projects, and Experience, deploy to Vercel, and use Next.js + shadcn/ui as the foundation. Starting from an empty `Z:/Coding/Portfolio-Website/` directory.

The primary success criterion is the **wow-on-first-load reaction** — a visitor should think "I haven't seen one like this before" — without sacrificing Lighthouse performance.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSR, file-based routing, `next/image`, deploys to Vercel in one click |
| Styling | **Tailwind CSS v4** | Required by shadcn; ergonomic for glassmorphism |
| Components | **shadcn/ui** | Owned components, Radix primitives, easy theming |
| Animation | **Framer Motion (`motion`)** | GPU-accelerated transforms, scroll triggers, layout animations |
| 3D / Background | **`@react-three/fiber` + `@react-three/drei`** | WebGL starfield via instanced points (single draw call) |
| Theme | **`next-themes`** | Default dark, with a toggle |
| Icons | **`lucide-react`** | Bundled with shadcn |
| Fonts | **Geist Sans + Space Grotesk** | Sleek, slightly futuristic; both via `next/font` (no FOUT) |
| Deploy | **Vercel** | Zero-config |

---

## File Structure

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
│   ├── cursor-glow.tsx         # Radial gradient that follows the cursor
│   └── theme-provider.tsx
├── lib/
│   ├── utils.ts                # `cn()` helper (shadcn default)
│   └── data.ts                 # Skills/projects/experience as typed data
├── public/
│   ├── projects/               # Project screenshots
│   └── resume.pdf              # Optional
├── components.json             # shadcn config
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## Design System

**Palette** (CSS variables in `globals.css`):
- `--bg`: `#05070f` (near-black with deep blue undertone)
- `--bg-elev`: `rgba(255,255,255,0.04)` (glass surface base)
- `--border-glass`: `rgba(255,255,255,0.08)`
- `--accent-cyan`: `#7dd3fc` (highlights, links)
- `--accent-violet`: `#a78bfa` (secondary glow)
- `--text`: `#e5e7ff` (slightly cool white)

**Glass recipe** (in `glass-card.tsx`):
```
backdrop-blur-xl bg-white/[0.04] border border-white/[0.08]
shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] rounded-2xl
```

**Type scale**: Geist for body, Space Grotesk for `<h1>`/`<h2>`, slight letter-spacing on display sizes.

---

## The "Wow" Layer (the differentiators)

These are the things most portfolios *don't* do — keeping them performant is the design constraint:

1. **WebGL starfield background** — `~2000` instanced points, single draw call. Stars twinkle (sin-wave alpha) and rotate slowly. Mouse position parallaxes the camera ±2°. Lazy-loaded with `next/dynamic({ ssr: false })`.
2. **Cursor-following nebula glow** — a `radial-gradient` div that tracks the cursor with `transform: translate3d()` (no layout work). Disabled on touch devices.
3. **Constellation skill grid** — skills are nodes; on hover, SVG lines animate between related skills (e.g., React ↔ TypeScript ↔ Next.js).
4. **Scroll-driven camera depth** — the starfield camera `z` is bound to scroll progress via `useScroll`, so scrolling feels like flying forward through space.
5. **Glass project cards with 3D tilt** — CSS `perspective` + `rotateX/Y` based on cursor offset; cheap, runs on compositor.
6. **Aurora mesh on hero** — slow-shifting conic gradient behind the headline. Pure CSS, no JS.
7. **Active-section glass nav** — pill that morphs (`layoutId`) between active links via Framer Motion.

---

## Performance Guardrails (non-negotiable)

- **Starfield**: instanced geometry, no per-frame allocations, frameloop="demand" when off-screen via IntersectionObserver.
- **Reduced motion**: `useReducedMotion()` from Framer Motion → skip starfield (replace with static SVG noise) and disable parallax.
- **Lazy load Three.js**: `next/dynamic` on the starfield component (saves ~150KB on initial bundle for users who haven't scrolled past hero).
- **Animations on transform/opacity only** — never `top`/`left`/`width`.
- **`next/image`** for all project screenshots, with proper `sizes`.
- **Lighthouse target**: Performance ≥90, A11y ≥95.

---

## Build Phases (execution order)

1. **Scaffold** — `npx create-next-app@latest` (TS, Tailwind, App Router, no src dir), `npx shadcn@latest init`, add deps (`framer-motion`, `@react-three/fiber`, `@react-three/drei`, `three`, `next-themes`).
2. **Foundation** — theme provider, fonts, `globals.css` with the palette, `glass-card.tsx`, `nav.tsx`.
3. **Starfield + nebula** — `components/three/starfield.tsx` lazy-loaded into `layout.tsx` as fixed full-viewport background.
4. **Hero** — name, tagline, scroll cue. Aurora gradient + cursor glow.
5. **About** — single glass panel, headshot or initial avatar, 2–3 paragraph bio.
6. **Skills** — constellation grid sourced from `lib/data.ts`.
7. **Projects** — glass cards with tilt, link to repo + live demo. Placeholder content first; Jake fills in real projects after.
8. **Experience** — vertical timeline, glass dots on a gradient line.
9. **Polish** — mobile responsive (starfield density ↓ on mobile), reduced-motion path, favicon, OG image, `<title>` and meta.
10. **Deploy** — `vercel` CLI or GitHub → Vercel. Configure custom domain later if desired.

Content (skills list, project descriptions, work history) will start as placeholders in `lib/data.ts` so structure is in place — Jake can swap real content in without touching components.

---

## Critical Files (where the work lives)

| File | Purpose |
|---|---|
| `app/layout.tsx` | Mounts `<Starfield>`, `<CursorGlow>`, `<ThemeProvider>`, `<Nav>` |
| `app/page.tsx` | Composes the five section components in order |
| `app/globals.css` | Color tokens, base typography, scrollbar styling |
| `components/three/starfield.tsx` | The headline visual; perf-critical |
| `components/glass-card.tsx` | Single source of truth for the glass aesthetic |
| `components/sections/skills.tsx` | Constellation interaction (most novel UI) |
| `lib/data.ts` | All content (typed) — Jake's editable surface |

---

## Verification

After implementation:

1. **Visual check** — `npm run dev`, open `http://localhost:3000`, scroll through every section. Confirm stars render, cursor glow tracks, glass panels look frosted, nav highlights active section.
2. **Performance** — Chrome DevTools Performance tab, record a scroll from top to bottom. Confirm 60fps, no long tasks >50ms.
3. **Reduced motion** — toggle `prefers-reduced-motion: reduce` in DevTools rendering panel. Confirm starfield is replaced with static fallback and parallax is disabled.
4. **Mobile** — DevTools device emulation (iPhone 14, Pixel 7). Confirm layout stacks, starfield density is reduced, no horizontal scroll.
5. **Lighthouse** — run audit; Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95.
6. **Build** — `npm run build` passes with no TypeScript or ESLint errors.
7. **Deploy** — push to Vercel, verify production URL renders identically.