/**
 * Static SVG starfield — fixed pinpricks of light scattered across the
 * viewport. No motion, no JS animation, no canvas. Just an SVG with ~300
 * `<circle>` elements at percentage coordinates, so it scales to any
 * viewport without distortion.
 *
 * Star layout is generated once at module load with a seeded PRNG, so every
 * page load shows the same "constellation". 85% of stars are tiny pinpricks,
 * 13% medium, ~2% larger and brighter — that distribution is what stops it
 * looking like a uniform polka-dot pattern. A small fraction get a subtle
 * cool blue or warm pink tint so the field doesn't read as monochrome.
 *
 * This is a Server Component — the SVG is fully rendered at build time and
 * shipped as static HTML. Zero JS bundle cost.
 */

interface Star {
  /** % of viewport width */
  x: number;
  /** % of viewport height */
  y: number;
  /** radius in CSS pixels */
  r: number;
  /** 0–1 */
  opacity: number;
  hue: "white" | "blue" | "pink";
}

// Mulberry32 — tiny, fast, deterministic 32-bit seeded PRNG.
function mulberry32(seed: number): () => number {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function generateStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const sizeRoll = rand();
    const r =
      sizeRoll < 0.02
        ? 1.6 + rand() * 0.9 // ~2% — the bright ones
        : sizeRoll < 0.15
          ? 0.9 + rand() * 0.5 // ~13% — medium
          : 0.4 + rand() * 0.5; // ~85% — tiny pinpricks

    const hueRoll = rand();
    const hue: Star["hue"] =
      hueRoll < 0.06 ? "blue" : hueRoll < 0.12 ? "pink" : "white";

    stars.push({
      x: rand() * 100,
      y: rand() * 100,
      r,
      opacity: 0.35 + rand() * 0.55,
      hue,
    });
  }
  return stars;
}

// 300 stars, seed 0xC05M05 (a wink). Generated once at module load.
const STARS = generateStars(300, 12602757);

const HUE_COLOR: Record<Star["hue"], string> = {
  white: "oklch(0.96 0.02 250)",
  blue: "oklch(0.86 0.08 230)",
  pink: "oklch(0.9 0.06 350)",
};

export function StarfieldSVG() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.r}
          fill={HUE_COLOR[s.hue]}
          opacity={s.opacity}
        />
      ))}
    </svg>
  );
}
