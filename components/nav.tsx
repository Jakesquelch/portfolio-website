"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
] as const;

/**
 * Sticky top nav — name on the left (scrolls to top), mono section links +
 * Contact mailto + theme toggle on the right. The links are short enough
 * that the same row works on mobile, so there's no hamburger.
 */
export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [showName, setShowName] = useState(false);

  /**
   * The nav name only fades in once the hero (which opens with the same
   * name at display size) is scrolled out of view — otherwise the page
   * reads "Jake Squelch" twice in the same glance.
   */
  useEffect(() => {
    const onScroll = () => {
      setShowName(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * IntersectionObserver tracks which section is currently in the viewport.
   * The rootMargin "-40% 0px -40% 0px" means a section only counts as active
   * when it's near the middle of the viewport — feels more natural than
   * triggering at the edges. On the hero neither link is active.
   *
   * Short sections mean two can occupy that middle band at once (e.g.
   * jumping to Experience also puts the top of Projects in the band), so
   * we keep a set of everything currently intersecting and highlight the
   * topmost in document order — not whichever entry happened to fire last.
   */
  useEffect(() => {
    const inView = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inView.add(entry.target.id);
          } else {
            inView.delete(entry.target.id);
          }
        }
        const topmost = SECTIONS.find(({ id }) => inView.has(id));
        setActive(topmost ? topmost.id : null);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  /**
   * Manual scroll handler for nav links. Bypasses the browser's default hash
   * navigation, which no-ops when the URL hash already matches the target —
   * e.g. you click "About", scroll back to the hero by hand, then click
   * "About" again: the URL is still `#about`, so the browser thinks it's
   * already there and doesn't scroll. Doing it ourselves avoids that, and
   * `history.replaceState` keeps the URL in sync without polluting history
   * with a new entry per click.
   *
   * Modifier-clicks (cmd/ctrl/shift, middle-button) fall through to default
   * behaviour so the browser still handles "open in new tab" sensibly.
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6 lg:max-w-4xl">
        <button
          type="button"
          onClick={scrollToTop}
          aria-hidden={!showName}
          tabIndex={showName ? 0 : -1}
          className={cn(
            "hidden text-sm font-semibold tracking-tight text-foreground transition-opacity duration-200 sm:block",
            showName ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          Jake Squelch
        </button>

        {/* On mobile the name button above is `hidden`, which removes it from
            flex layout — `justify-between` would then strand this group at the
            left edge. Taking the full width and centring restores a balanced
            bar; from sm the group shrink-wraps and the parent pushes it right
            again, opposite the name. */}
        <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:gap-6">
          <ul className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] sm:gap-6">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={cn(
                    "transition-colors",
                    active === id
                      ? "font-semibold text-accent"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
