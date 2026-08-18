"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { socials } from "@/lib/data";

/**
 * Hero — first section. Name, role and social row on the left, circular
 * profile picture on the right. On mobile the picture stacks above the text
 * (flex-col-reverse keeps the photo first visually while the text stays
 * first in the DOM for screen readers).
 *
 * The picture is loaded from /profile-pic.webp with object-fit: cover.
 * `objectPosition: "center 22%"` biases the crop upward — the head sits
 * centred and the bottom of the circle lands roughly just below the
 * shoulders. Tune that percentage if a new photo needs more/less head room.
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
    <section id="hero" className="px-6 pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="mx-auto flex max-w-3xl flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12 lg:max-w-4xl">
        {/* Name + role + socials */}
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Jake Squelch
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Software Engineer & final-year Computer Science student at Aston
            University.
          </p>

          <div className="mt-2 flex items-center gap-3">
            <SocialIconLink href={socials.github} label="GitHub">
              <GitHubIcon className="h-4.5 w-4.5" />
            </SocialIconLink>
            <SocialIconLink href={socials.linkedin} label="LinkedIn">
              <LinkedInIcon className="h-4.5 w-4.5" />
            </SocialIconLink>
            <a
              href={`mailto:${socials.email}`}
              onClick={handleContactClick}
              aria-live="polite"
              className="ml-1 inline-flex h-10 items-center gap-2 rounded-full border border-accent px-5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {copied ? "Email copied!" : "Contact me"}
            </a>
          </div>
        </div>

        {/* Profile picture — right side on desktop, top on mobile */}
        <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border border-line md:h-56 md:w-56 lg:h-64 lg:w-64">
          <Image
            src="/profile-pic.webp"
            alt="Jake Squelch"
            fill
            priority
            sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 176px"
            style={{ objectFit: "cover", objectPosition: "center 22%" }}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Circular bordered icon button. Wraps an external link with target=_blank
 * and rel=noreferrer.
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {children}
    </a>
  );
}
