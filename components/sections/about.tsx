import { aboutParagraphs, skillGroups } from "@/lib/data";
import { SectionLabel } from "@/components/section-label";

/**
 * About section — bio paragraphs and a one-line-per-group skills block,
 * sourced from `lib/data.ts`. Experience lives in its own sibling section
 * (`components/sections/experience.tsx`).
 *
 * Server component: nothing here is interactive, so no "use client" and no
 * JS shipped for this section.
 */
export function About() {
  return (
    <section id="about" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
        <SectionLabel>About</SectionLabel>

        <div className="space-y-4 text-base/relaxed text-foreground/90 md:text-lg/relaxed">
          {aboutParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* ---------- Skills: one line per group ---------- */}
        <div className="mt-8 space-y-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="flex gap-4">
              <span className="w-28 shrink-0 pt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                {group.label}
              </span>
              <span className="text-sm text-foreground/85 md:text-base">
                {group.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
