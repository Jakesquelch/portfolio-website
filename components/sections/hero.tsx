"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check, Mail } from "lucide-react";

/**
 * Edit these to update the social links + contact target.
 *
 * LinkedIn defaults to "#" — replace with your actual profile URL.
 */
const LINKEDIN_URL = "https://www.linkedin.com/in/jake-squelch";
const GITHUB_URL = "https://github.com/Jakesquelch";
const CONTACT_EMAIL = "jakewsquelch@gmail.com";

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
      .writeText(CONTACT_EMAIL)
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
            <SocialIconLink href={LINKEDIN_URL} label="LinkedIn">
              <LinkedInIcon className="h-5 w-5" />
            </SocialIconLink>
            <SocialIconLink href={GITHUB_URL} label="GitHub">
              <GitHubIcon className="h-5 w-5" />
            </SocialIconLink>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
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

/* ---------- Brand logo SVGs (paths from simple-icons, MIT licensed) ---------- */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
