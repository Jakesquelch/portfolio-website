"use client";

import { useEffect, useRef } from "react";

/**
 * Stardust trail — small glowing particles spawn behind the cursor as it
 * moves and fade out softly. Tuned to be subtle: low max opacity, ~30
 * particles cap, ~600 ms lifetime. No particles when the mouse is still.
 *
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
  size: number;
  hueMix: number; // 0 = cyan, 1 = violet
}

const MAX_PARTICLES = 30;
const SPAWN_INTERVAL_MS = 55;
const PARTICLE_LIFETIME_MS = 650;
const MAX_ALPHA = 0.28; // keep it subtle
// Cyan ≈ #7dd3fc, violet ≈ #a78bfa (matches the cosmic palette accents)
const CYAN: [number, number, number] = [125, 211, 252];
const VIOLET: [number, number, number] = [167, 139, 250];

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // setTransform (not scale) so resize calls don't accumulate
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: Particle[] = [];
    let lastSpawn = 0;
    let lastFrame = performance.now();
    let mouseX = -9999;
    let mouseY = -9999;
    let prevX = -9999;
    let prevY = -9999;
    let lastMoveAt = 0;

    const onMove = (e: MouseEvent) => {
      prevX = mouseX === -9999 ? e.clientX : mouseX;
      prevY = mouseY === -9999 ? e.clientY : mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveAt = performance.now();
    };

    const tick = (now: number) => {
      const dt = now - lastFrame;
      lastFrame = now;

      // Spawn — only while the mouse is actually moving
      const isMoving = now - lastMoveAt < 80;
      if (
        isMoving &&
        now - lastSpawn > SPAWN_INTERVAL_MS &&
        particles.length < MAX_PARTICLES
      ) {
        const dx = (mouseX - prevX) * 0.04;
        const dy = (mouseY - prevY) * 0.04;
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          vx: dx + (Math.random() - 0.5) * 0.04,
          vy: dy + (Math.random() - 0.5) * 0.04 + 0.01, // gentle settle downward
          life: 1,
          size: 0.9 + Math.random() * 1.2,
          hueMix: Math.random(),
        });
        lastSpawn = now;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter"; // additive — overlapping particles brighten

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt / PARTICLE_LIFETIME_MS;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Quadratic fade — ramps off softly at the end
        const alpha = p.life * p.life * MAX_ALPHA;
        const r = Math.round(CYAN[0] + (VIOLET[0] - CYAN[0]) * p.hueMix);
        const g = Math.round(CYAN[1] + (VIOLET[1] - CYAN[1]) * p.hueMix);
        const b = Math.round(CYAN[2] + (VIOLET[2] - CYAN[2]) * p.hueMix);

        const radius = p.size * 6;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    let rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
