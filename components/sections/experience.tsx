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
 * One experience row — company wordmark, role + context in the middle,
 * period and location right-aligned in mono. Both logo PNGs have
 * transparent grounds and mid-tone brand ink, so they sit directly on the
 * page background and read in either theme without a chip behind them.
 * The fixed box keeps the wordmarks optically aligned down the column.
 */
function ExperienceRow({ exp }: { exp: Experience }) {
  return (
    <div className="flex items-center gap-4 py-5 sm:gap-5">
      <span className="flex h-14 w-20 shrink-0 items-center justify-center sm:w-24">
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
        {/* On a phone the logo and the nowrap meta column together eat all
            but ~80px of the row, shredding the role and context into a
            narrow ribbon. Below sm the meta drops onto its own line here
            and the column opposite is hidden. */}
        <p className="mt-1.5 font-mono text-xs text-muted-foreground sm:hidden">
          {exp.period} · {exp.location}
        </p>
      </div>
      <div className="hidden shrink-0 text-right font-mono text-xs text-muted-foreground sm:block">
        <div className="whitespace-nowrap">{exp.period}</div>
        <div className="mt-0.5 whitespace-nowrap">{exp.location}</div>
      </div>
    </div>
  );
}
