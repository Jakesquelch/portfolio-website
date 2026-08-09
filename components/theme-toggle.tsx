"use client";

import { useSyncExternalStore } from "react";
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
 * Theme toggle — small bordered circle that lives inside the nav row and
 * swaps between the light and dark palettes. Toggling always sets an
 * explicit theme (overriding the initial system preference).
 *
 * SSR / hydration safety: `useTheme` populates `resolvedTheme` lazily from
 * `localStorage` during the first client render, which doesn't match the
 * server's `undefined`. `useSyncExternalStore` with separate server / client
 * snapshots lets us render a same-sized placeholder during SSR + hydration
 * and only render the button on the next commit — no layout shift, no
 * `useEffect` set-state dance.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  if (!isClient) return <span aria-hidden className="h-8 w-8" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:text-foreground"
    >
      {isDark ? (
        <Sun className="h-4 w-4" strokeWidth={2} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={2} />
      )}
    </button>
  );
}
