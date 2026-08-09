"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Back-to-top button — bordered circle in the bottom-right that fades in
 * once the user has scrolled past ~60% of the viewport height and
 * smooth-scrolls to the top on click.
 *
 * Always rendered so visibility is a cheap CSS opacity transition (no
 * mount/unmount churn); `pointer-events-none` keeps the hidden button from
 * intercepting clicks.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      className={cn(
        // right offset mirrors the content column: max-w-3xl + px-6 below lg,
        // max-w-4xl + px-6 from lg — so the button sits on the content's
        // right edge instead of hugging the viewport on wide screens.
        "fixed right-[max(1.25rem,calc((100vw-48rem)/2+1.5rem))] bottom-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-background text-muted-foreground shadow-sm transition-all duration-200 hover:text-foreground sm:bottom-7 lg:right-[max(1.25rem,calc((100vw-56rem)/2+1.5rem))]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-4.5 w-4.5" strokeWidth={2.25} />
    </button>
  );
}
