"use client";

import { motion } from "motion/react";
import { about } from "@/lib/data";

/**
 * About section — heading + a glass card with the bio paragraphs.
 *
 * Scroll behaviour: heading and card both fade up when 30% of the section
 * enters the viewport. They animate once (won't re-fire on re-scroll). The
 * card lags the heading by a beat so the eye reads the title first.
 *
 * Layout: max-width 3xl so paragraphs stay at a comfortable reading measure
 * (~65 chars). Generous vertical padding so the section breathes against the
 * Hero above and whatever sits below.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
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
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="glass rounded-2xl p-8 md:p-10 lg:p-14"
        >
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85 lg:space-y-6 lg:text-xl">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
