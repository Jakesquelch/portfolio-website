"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check, ChevronDown, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { socials } from "@/lib/data";

/**
 * Hero — first section. Circular profile picture on the left, greeting +
 * name + tagline + social row on the right. On mobile the picture stacks
 * above the text block.
 *
 * The picture is loaded from /profile-pic.png. It's circularly cropped via
 * overflow-hidden, with object-fit: cover so it fills the circle.
 * `objectPosition: "center 22%"` biases the crop upward — the head sits
 * centred and the bottom of the circle lands roughly just below the
 * shoulders. Tune that percentage if your specific image needs more/less
 * head room.
 *
 * Behind the picture is a soft cyan→violet radial halo (cosmic glow), and
 * the picture itself has a thin white rim border + inset highlight to read
 * like a glass medallion against the starfield.
 *
 * Entrance: gentle fade-up stagger via Motion. Each piece (greeting, name,
 * tagline, accent line, social row) trails the one above it by ~150ms so
 * the eye reads top-to-bottom.
 */
export function Hero() {
  // "Email copied!" feedback — flips back to "Contact me" after ~2s. The copy
  // runs alongside the mailto: navigation so visitors without a default mail
  // client still walk away with the address on their clipboard.
  const [copied, setCopied] = useState(false);

  const handleContactClick = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(socials.email)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {});
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 py-24"
    >
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16 lg:gap-20 xl:gap-24">
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
            className="relative h-36 w-36 overflow-hidden rounded-full border border-white/15 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-80 xl:w-80"
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
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 768px) 224px, (min-width: 640px) 176px, 144px"
              style={{
                objectFit: "cover",
                objectPosition: "center 22%",
              }}
            />
          </div>
        </motion.div>

        {/* Greeting + name + tagline + socials */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg font-medium tracking-wide text-foreground/70 sm:text-xl md:text-2xl"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-gradient text-center font-heading text-5xl font-semibold tracking-tight sm:text-6xl md:text-left md:text-7xl lg:text-8xl xl:text-9xl"
          >
            Jake Squelch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg tracking-wide text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl"
          >
            Software Engineer
          </motion.p>

          {/* Thin gradient accent line under the tagline */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-2 h-px w-32 origin-left bg-gradient-to-r from-cyan/70 via-violet/50 to-transparent lg:w-40"
          />

          {/* Social row: LinkedIn + GitHub icons + Contact me button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 flex items-center gap-3 sm:gap-3.5"
          >
            <SocialIconLink href={socials.linkedin} label="LinkedIn">
              <LinkedInIcon className="h-5 w-5" />
            </SocialIconLink>
            <SocialIconLink href={socials.github} label="GitHub">
              <GitHubIcon className="h-5 w-5" />
            </SocialIconLink>
            <a
              href={`mailto:${socials.email}`}
              onClick={handleContactClick}
              aria-live="polite"
              className="glass-strong group ml-1 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-px hover:bg-white/10 sm:text-base"
            >
              {copied ? (
                <Check className="h-4 w-4 text-cyan" />
              ) : (
                <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-px" />
              )}
              {copied ? "Email copied!" : "Contact me"}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — small "Scroll" label + bouncing chevron pinned to the
          bottom-centre of the hero. Fades in after the rest of the entrance,
          and the chevron does a gentle vertical bob so it reads as live. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-foreground/45 sm:flex"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * Circular glass icon button. Wraps an external link with target=_blank and
 * rel=noreferrer. Hover lifts it a hair and brightens the rim.
 */
function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="glass-strong inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-all hover:-translate-y-px hover:bg-white/10 hover:text-foreground"
    >
      {children}
    </a>
  );
}

