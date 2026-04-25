"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
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

  useEffect(() => {
    /**
     * IntersectionObserver tracks which section is currently in the viewport.
     * The rootMargin of "-40% 0px -40% 0px" means a section is only "active"
     * when it's near the middle of the viewport — feels more natural than
     * triggering at the edges.
     */
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

  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <ul className="glass-strong flex items-center gap-1 rounded-full px-2 py-2">
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
    </nav>
  );
}
