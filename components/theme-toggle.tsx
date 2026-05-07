"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Floating theme toggle — fixed glass orb in the top-right that swaps
 * between dark and light. Mirrors the back-to-top button's bottom-right
 * position so the two corners feel balanced.
 *
 * `next-themes` sets the `class="dark"` attribute on `<html>` from a
 * pre-hydration script, so the page renders in the correct theme before
 * React mounts. `resolvedTheme` is `undefined` during SSR / the first
 * client render and becomes a string once the provider hydrates — using
 * that as our gate avoids a hydration mismatch without needing a manual
 * `mounted` flag (and dodges the `react-hooks/set-state-in-effect` lint).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass-strong-elevated fixed top-4 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-all hover:-translate-y-0.5 hover:text-foreground sm:right-7"
    >
      {/* Cross-fade + rotate between the sun and moon glyphs. */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.22 }}
          >
            <Sun className="h-5 w-5" strokeWidth={2.25} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            transition={{ duration: 0.22 }}
          >
            <Moon className="h-5 w-5" strokeWidth={2.25} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
