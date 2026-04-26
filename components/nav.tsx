"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
] as const;

export function Nav() {
  const [active, setActive] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /**
   * IntersectionObserver tracks which section is currently in the viewport.
   * The rootMargin "-40% 0px -40% 0px" means a section only counts as active
   * when it's near the middle of the viewport — feels more natural than
   * triggering at the edges.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking outside or hitting Escape.
  useEffect(() => {
    if (!mobileOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
    >
      {/* ---------- Desktop: horizontal pill (md and up) ---------- */}
      <ul className="glass-strong hidden items-center gap-1 rounded-full px-2 py-2 md:flex">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id} className="relative">
              <Link
                href={`#${id}`}
                className={cn(
                  "relative block rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ---------- Mobile: hamburger + glass dropdown (below md) ---------- */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="glass-strong flex h-11 w-11 items-center justify-center rounded-full text-foreground"
        >
          {/* Cross-fade between Menu and X icons. */}
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong absolute top-full left-1/2 mt-3 flex min-w-[180px] -translate-x-1/2 flex-col gap-1 rounded-2xl p-2"
            >
              {SECTIONS.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <Link
                      href={`#${id}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-white/10 text-foreground"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
