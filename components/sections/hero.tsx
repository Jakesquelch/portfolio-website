"use client";

import Image from "next/image";
import { motion } from "motion/react";

/**
 * Hero — first section. Circular profile picture on the left, name + tagline
 * on the right. On mobile the picture stacks above the name.
 *
 * The picture is loaded from /profile-pic.png (you need to drop a transparent
 * PNG there). It's circularly cropped via overflow-hidden, with object-fit:
 * cover so it fills the circle. `objectPosition: "center 22%"` biases the
 * crop upward — the head sits centred and the bottom of the circle lands
 * roughly just below the shoulders. Tune that percentage if your specific
 * image needs more/less head room.
 *
 * Behind the picture is a soft cyan→violet radial halo (cosmic glow), and the
 * picture itself has a thin white rim border + inset highlight to read like a
 * glass medallion against the starfield.
 *
 * Entrance: gentle fade-up stagger via Motion. Finishes within ~1 second.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center justify-center px-6 py-24"
    >
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative shrink-0"
        >
          {/* Cosmic halo behind the picture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.86 0.13 220 / 0.45) 0%, oklch(0.74 0.16 295 / 0.28) 45%, transparent 75%)",
              transform: "scale(1.35)",
            }}
          />

          {/* Circular frame: glass-rimmed, soft inset highlight, drop shadow */}
          <div
            className="relative h-44 w-44 overflow-hidden rounded-full border border-white/15 md:h-56 md:w-56"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 36px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src="/profile-pic.png"
              alt="Jake Squelch"
              fill
              priority
              sizes="(min-width: 768px) 224px, 176px"
              style={{
                objectFit: "cover",
                objectPosition: "center 22%",
              }}
            />
          </div>
        </motion.div>

        {/* Name + tagline */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-gradient text-center font-heading text-6xl font-semibold tracking-tight md:text-left md:text-8xl"
          >
            Jake Squelch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xl tracking-wide text-muted-foreground md:text-2xl"
          >
            Software Developer
          </motion.p>

          {/* Thin gradient accent line under the tagline */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-2 h-px w-32 origin-left bg-gradient-to-r from-cyan/70 via-violet/50 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
