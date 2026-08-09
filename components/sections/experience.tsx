import Image from "next/image";
import { experiences, type Experience } from "@/lib/data";
import { SectionLabel } from "@/components/section-label";

/**
 * Experience section — one row per job, sourced from `lib/data.ts`.
 * A sibling of About and Projects with identical section rhythm.
 *
 * Server component: nothing here is interactive, so no "use client" and no
 * JS shipped for this section.
 */
export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
        <SectionLabel>Experience</SectionLabel>
        <div className="divide-y divide-line">
          {experiences.map((exp) => (
            <ExperienceRow key={exp.company} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One experience row — company wordmark on a light chip, role + context in
 * the middle, period and location right-aligned in mono. The chip keeps a
 * light background in both themes (see `--chip` in globals.css) because the
 * logos are authored against light grounds.
 */
function ExperienceRow({ exp }: { exp: Experience }) {
  return (
    <div className="flex items-center gap-5 py-5">
      <span className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg border border-line bg-chip">
        <Image
          src={exp.logo.src}
          alt={`${exp.company} logo`}
          width={exp.logo.width}
          height={exp.logo.height}
          className="max-h-7 w-auto max-w-16 object-contain"
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{exp.role}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{exp.context}</p>
      </div>
      <div className="shrink-0 text-right font-mono text-xs text-muted-foreground">
        <div className="whitespace-nowrap">{exp.period}</div>
        <div className="mt-0.5 whitespace-nowrap">{exp.location}</div>
      </div>
    </div>
  );
}
