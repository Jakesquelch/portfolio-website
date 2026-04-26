"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { about } from "@/lib/data";

/**
 * About section — heading + a glass card with the bio paragraphs and a photo.
 *
 * Scroll behaviour: heading and card both fade up when 30% of the section
 * enters the viewport. They animate once (won't re-fire on re-scroll). The
 * card lags the heading by a beat so the eye reads the title first.
 *
 * Layout: two-column inside the card on md+ (photo left, bio right); stacks
 * vertically on mobile. max-width 5xl so the wider layout has breathing room.
 * Generous vertical padding so the section breathes against the Hero above
 * and whatever sits below.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:mb-10 lg:text-6xl"
        >
          {about.heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-8 md:p-10 lg:p-14"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10 lg:gap-14">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-44 shrink-0 sm:w-52 md:w-48 lg:w-60"
            >
              {/* Halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.86 0.13 220 / 0.35) 0%, oklch(0.74 0.16 295 / 0.2) 50%, transparent 75%)",
                  transform: "scale(1.3)",
                }}
              />
              {/* Frame */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/15"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.14), 0 10px 28px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src="/about-pic.png"
                  alt="Jake Squelch"
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 768px) 192px, 208px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </motion.div>

            {/* Bio */}
            <div className="space-y-5 text-lg leading-relaxed text-foreground/85 lg:space-y-6 lg:text-xl">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
