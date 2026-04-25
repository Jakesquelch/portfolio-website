"use client";

import { useEffect, useRef } from "react";

const SIZE = 600; // px — diameter of the glow
const HALF = SIZE / 2;

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices (no hover/cursor) and when reduced motion is preferred.
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frameRequested = false;
    let nextX = 0;
    let nextY = 0;

    const apply = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${nextX - HALF}px, ${nextY - HALF}px, 0)`;
      }
      frameRequested = false;
    };

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (!frameRequested) {
        frameRequested = true;
        // rAF throttles updates to 1 per frame — eliminates redundant work
        // when the mouse fires move events faster than the display refreshes.
        requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10"
      style={{
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, oklch(0.74 0.16 295 / 22%) 0%, oklch(0.86 0.13 220 / 8%) 35%, transparent 65%)",
        // Hide initially (offscreen) so it doesn't flash at (0,0) before the
        // first mousemove event lands.
        transform: "translate3d(-9999px, -9999px, 0)",
        willChange: "transform",
      }}
    />
  );
}
