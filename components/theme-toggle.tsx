"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Constant subscribe fn for `useSyncExternalStore`. There's no real store
 * to subscribe to — we just need React to track "are we on the client yet?"
 * so it can re-render once after hydration. Returning a no-op unsubscribe
 * is the canonical way to say "I never emit changes."
 */
const subscribeNoop = () => () => {};

/**
 * Floating theme toggle — fixed glass orb in the top-right that swaps
 * between dark and light. Mirrors the back-to-top button's bottom-right
 * position so the two corners feel balanced.
 *
 * SSR / hydration safety: `useTheme` populates `resolvedTheme` lazily from
 * `localStorage` during the first client render, which doesn't match the
 * server's `undefined` — that mismatch is what produced the hydration
 * error. `useSyncExternalStore` with separate server / client snapshots
 * lets us return `null` during SSR + hydration and only render the button
 * on the next commit, with no `useEffect` set-state dance (which the
 * `react-hooks/set-state-in-effect` lint flags).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  if (!isClient) return null;

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
