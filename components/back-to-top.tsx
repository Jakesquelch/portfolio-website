"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

/**
 * Back-to-top button — fixed glass orb in the bottom-right that fades in once
 * the user has scrolled past ~60% of the viewport height (i.e. clearly out of
 * the hero) and smooth-scrolls to the top on click.
 *
 * Mounted once at the layout level so every page gets it for free, and it
 * sits above section content with a high z-index. The threshold uses
 * `window.innerHeight` so the trigger point scales with viewport size — same
 * relative position on a phone as on a desktop monitor.
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
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong-elevated fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-foreground/80 transition-all hover:-translate-y-0.5 hover:text-foreground sm:right-7 sm:bottom-7"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
